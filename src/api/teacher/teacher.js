import request from '@/utils/request'
import qs from 'qs'

export default {
  getPageList(page, limit, teacherQuery) {
    return request({
      url: `/edu-teacher/getCondition/${page}/${limit}`,
      method: 'get',
      params: teacherQuery
    })
  }
}
