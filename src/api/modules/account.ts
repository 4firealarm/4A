import request from '../request'

export default {
  getCurrentUser(params:object) {
    return request({
      name:'测试',
      method:'get',
      url:'api/users/',
      params
    })
  },
}