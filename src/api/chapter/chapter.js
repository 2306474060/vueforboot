import request from '@/utils/request'

export default {
  getVideos(courseId) {
    return request({
      url: `/edu/chapter/getChapterVideo/` + courseId,
      method: 'get'
    })
  }
}
