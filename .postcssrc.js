module.exports = {
    plugins: {
        // autoprefixer: {
        //     browsers: ['Android >= 4.0', 'iOS >= 8'],
        // },
        // 把px 转为rem
        'postcss-pxtorem': {
            // lib-flexible 适配方案 一行分为十份
            // 设计稿宽度10分之一
            // 750/10 vant 建议设置为37.5，设计稿都必须除以2
            // 数字 和 函数

            // rootValue: 37.5,
            // CSS处理每个文件都会调用这个函数
            rootValue ({ file }) {
                // console.log(file)
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // 配置转换css属性
            propList: ['*']
        }
    }
}
