import request from '@/utils/request'

export default {
  save(courseInfoVo) {
    return request({
      url: `/edu/course/add`,
      method: 'post',
      data: courseInfoVo
    })
  },
  initSubjectsList() {
    return request({
      url: `/edu/edu-teacher/gelAll`,
      method: 'get'
    })
  },
  getCourse(courseId) {
    return request({
      url: `/edu/course/getCourse/` + courseId,
      method: 'get'
    })
  },
  updateCourse(courseInfoVo) {
    return request({
      url: `/edu/course/updateCourse`,
      method: 'post',
      data: courseInfoVo
    })
  }
}
