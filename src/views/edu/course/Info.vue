<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfoVo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfoVo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <el-form-item label="选择讲师">
        <el-select v-model="courseInfoVo.teacherId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.id"
            :label="subject.name"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="分类">
        <el-select v-model="courseInfoVo.subjectParentId" placeholder="请选择" @change="subjectChanged">
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
        <el-select v-model="courseInfoVo.subjectId" placeholder="请选择二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfoVo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/upload'"
          class="avatar-uploader">
          <img :src="courseInfoVo.cover" style="height: 30%;width: 30%;float: left">
        </el-upload>
      </el-form-item>

      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfoVo.description"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdateCourse(courseInfoVo)">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const courseInfoVo = {
  title: '',
  subjectId: '',
  subjectParentId: '',
  teacherId: '',
  lessonNum: 0,
  description: '',
  cover: 'https://edu-1095.oss-cn-fuzhou.aliyuncs.com/2022/10/1966ae7bafa96e4b76968c68f7ac2d1a09zero.jpg\n',
  price: 0
}
import info from '@/api/course/info'
import subject from '@/api/subject/subject'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'Info',
  components: { Tinymce },
  data() {
    return {
      courseInfoVo: courseInfoVo,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      subSubjectList: [],
      subjectTwoList: [],
      subjectOneList: [],
      BASE_API: process.env.BASE_API
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getCourseInfo(this.courseId)
      this.getAllTeacher()
    } else {
      this.getOneSubject()
      this.getAllTeacher()
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res.data.items)

      this.courseInfoVo.cover = res.data.items
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    save(courseInfoVo) {
      info.save(courseInfoVo).then(response => {
        this.$router.push({ path: '/edu/course/chapter/' + response.data.courseId })
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getAllTeacher() {
      info.initSubjectsList().then(response => {
        this.subSubjectList = response.data.items
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getOneSubject() {
      subject.getNestedTreeList().then(response => {
        this.subjectOneList = response.data.items
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    subjectChanged(value) {
      courseInfoVo.subjectParentId = value
      for (let i = 0; i < this.subjectOneList.length; i++) {
        if (this.subjectOneList[i].id === value) {
          this.subjectTwoList = this.subjectOneList[i].children
          this.courseInfoVo.subjectId = ''
        }
      }
    },

    getCourseInfo() {
      info.getCourse(this.courseId).then(response => {
        this.courseInfoVo = response.data.items
        subject.getNestedTreeList().then(resp => {
          this.subjectOneList = resp.data.items
          for (let i = 0; i < this.subjectOneList.length; i++) {
            const oneSubject = this.subjectOneList[i]
            if (this.courseInfoVo.subjectParentId === oneSubject.id) {
              this.subjectTwoList = oneSubject.children
            }
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    saveOrUpdateCourse() {
      if (!this.courseInfoVo.id) {
        info.save(courseInfoVo).then(response => {
          this.$router.push({ path: '/edu/course/chapter/' + response.data.courseId })
        }).catch(err => {
          this.$message.error(err.message)
        })
      } else {
        info.updateCourse(this.courseInfoVo).then(response => {
          this.courseInfoVo = response.data.items
          this.$router.push({ path: '/edu/course/chapter/' + this.courseId })
        }).catch(err => {
          this.$message.error(err.message)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
