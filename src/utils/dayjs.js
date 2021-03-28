import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from '_vue@2.6.12@vue'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})

// 获取最新时间
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs().to(dayjs('2015')))
 // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()
