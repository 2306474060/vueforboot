import request from '@/utils/request'

export default {
  getTeacherList(page, limit, teacherQueryVO) {
    return request({
      url: `/edu-teacher/getCondition/${page}/${limit}`,
      //      url: '/edu-teacher/getCondition/' + current + '/' + limit,
      method: 'post',
      data: teacherQueryVO // qs.stringify(teacherQueryVO),

    })
  }
}
