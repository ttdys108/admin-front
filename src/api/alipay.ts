import request from "./request";

export function alipay() {
    return request({
        url: '/alipay/test',
        method: 'post'
    })
}