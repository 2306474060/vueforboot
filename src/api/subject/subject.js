import request from '@/utils/request'
const api_name = '/edu/subject/getAll'
export default {
  getNestedTreeList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  }
}
