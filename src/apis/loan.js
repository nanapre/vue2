import request from '@/utils/request'

export const createLoan = (data) => {
    return request({
        //贷款申请提交接口
        url: '/loan/create',
        method: 'post',
        data,
    })
}

export const getLoanList = (params) => {
    return request({
        url: '/loan/list',
        method: 'get',
        params,
    })
}

export const updateLoan = (data) => {
    return request({
        url: '/loan/update',
        method: 'put',
        data,
    })
}

export const deleteLoan = (id) => {
    return request({
        url: '/loan/delete/' + id,
        method: 'delete',
    })
}

export const submitLoan = (id) => {
    return request({
        url: '/loan/submitToApprove',
        method: 'post',
        data: {
            id
        },
    })
}
//初审列表//初审查询
export const queryList = (params) => {
    return request({
        url: '/approve/first/list',
        method: 'get',
        params
    })
}

//初审通过或拒绝
export const approveFirst = (id, flag) => {
    //调用时传入flag，改变调用的是通过或者是失败的接口
    return request({
        url: '/approve/first/' + flag,
        method: 'post',
        data: {
            loanId: id,
            appId: id
        }
    })
}

//终审列表//初审查询
export const queryEndList = (params) => {
    return request({
        url: '/approve/end/list',
        method: 'get',
        params
    })
}

//终审通过或拒绝
export const approveEnd = (id, flag) => {
    //调用时传入flag，改变调用的是通过或者是失败的接口
    return request({
        url: '/approve/end/' + flag,
        method: 'post',
        data: {
            loanId: id,
            appId: id
        }
    })
}

//查询合同
export const queryContract = (params) => {
    return request({
        url: '/contract/list',
        method: 'get',
        params
    })
}
//生成合同
export const generateContract = (id) => {
    //调用时传入flag，改变调用的是通过或者是失败的接口
    return request({
        url: '/contract/createFile',
        method: 'post',
        data: {
            id: id
        }
    })
}
//下载合同
export const downloadContract = (id) => {
    return request({
        url: '/contract/download',
        method: 'get',
        params: {
            id
        }
    })
}


