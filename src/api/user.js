import request from '@/utils/request'

// 登录
export const login = data => {
    return request({
        method: 'POST',
        // url: '/app/v1_0/authorizations',
        url: '/v1_0/authorizations',
        data
    })
}

// 发送验证码
export const sendSms = mobile => {
    return request({
        method: 'GET',
        // url: `/app/v1_0/sms/codes/${mobile}`
        url: `/v1_0/sms/codes/${mobile}`
    })
}

// 获取用户自己的信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        // url: '/app/v1_0/user'
        url: '/v1_0/user'
    })
}

// 获取频道列表
export const getUserCannels = () => {
    return request({
        method: 'GET',
        // url: '/app/v1_0/user/channels'
        url: '/v1_0/user/channels'
    })
}

// 关注用户
export const addFollow = (target) => {
    return request({
        method: 'POST',
        // url: '/app/v1_0/user/channels'
        url: 'v1_0/user/followings',
        data: {
            target
        }
    })
}

// 取消关注用户
export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        // url: '/app/v1_0/user/channels'
        url: `v1_0/user/followings/${target}`
    })
}
