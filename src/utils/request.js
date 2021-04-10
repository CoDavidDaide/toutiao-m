// 请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// const jsonStr = '{"art_id": 1245953273786007552}'
// console.log(JSON.parse(jsonStr)) // 1245953273786007600
// // console.log(JSONBig.parse(jsonStr))
// console.log(JSONBig.parse(jsonStr).art_id.toString()) // 1245953273786007552

// console.log(JSON.stringify(JSONBig.parse(jsonStr)))

// JSONBig.parse()  JSON -> JS
// JSONBig.stringify() JS -> JSON字符串

const request = axios.create({
    // baseURL: 'http://ttapi.research.itcast.cn/' // 接口基准路径
    // baseURL: 'http://toutiao-app.itheima.net/'
    baseURL: 'http://toutiao-app.itheima.net/',
    // data: 后端返回的原始数据， JSON 格式的字符串
    transformResponse: [function (data) {
        try {
            return JSONBig.parse(data)
        } catch (err) {
            return data
        }
    }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // config 配置对象
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    // console.log(config)
    return config
}, function (error) {
    return Promise.reject(error)
})
// 响应拦截器

export default request
