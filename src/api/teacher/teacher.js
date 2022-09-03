import request from '@/utils/request'

export default {
  getPageList(page, limit, teacherQuery) {
    return request({
      url: `/edu-teacher/getCondition/${page}/${limit}`,
      method: 'get',
      params: teacherQuery
    })
  },
  deleteById(id) {
    return request({
      url: `/edu-teacher/delete/${id}`,
      method: 'delete'
    })
  },
  save(eduTeacher) {
    return request({
      url: `/edu-teacher/add`,
      method: 'post',
      data: eduTeacher
    })
  },
  saveOrUpdate(eduTeacher) {
    return request({
      url: `/edu-teacher/saveOrUpdate`,
      method: 'post',
      data: eduTeacher
    })
  },

  getTeacher(id) {
    return request({
      url: `/edu-teacher/get/${id}`,
      method: 'get'
    })
  }
}
