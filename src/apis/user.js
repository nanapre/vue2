import request from '@/utils/request.js'


export const doLogin = (user) => {
    return request.post("/user/login", {
        //这里是后端需要account字符，也就是用户名
        account: user.username,
        password: user.pass
    })
}

export const logout = () => {
    return request.post("/user/logout")
}

export const createUSer = (data) => {
    //调用时传入flag，改变调用的是通过或者是失败的接口
    return request({
        url: '/permission/createUser',
        method: 'post',
        data: {
            account: data.username,
            password: data.password,
            role_id: data.permission
        }
    })
}

export const getUSerList = () => {
    //调用时传入flag，改变调用的是通过或者是失败的接口
    return request({
        url: '/user/list',
        method: 'get',
    })
}

export const userInfo = () => {
    return request.get("/user/info")
}