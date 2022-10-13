<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="eduTeacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="eduTeacher.sort" :min="0" controls-position="right"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="eduTeacher.level" clearable placeholder="请选择">
          <!--
13
            数据类型一定要和取出的json中的一致，否则没法回填
14
            因此，这里value使用动态绑定的值，保证其数据类型是number
15
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="eduTeacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="eduTeacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="eduTeacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
    11
    v-show：是否显示上传组件
    12
    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
    13
    :url：后台上传的url地址
    14
    @close：关闭上传组件
    15
    @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate(eduTeacher)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/teacher/teacher'
import process from 'shelljs'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  name: 'Save',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      eduTeacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() {
    // 判断路由是否有传参数有传就调用该方法
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      } else {
        this.eduTeacher = {}
      }
    },

    saveOrUpdate(eduTeacher) {
      this.saveBtnDisabled = true
      teacher.saveOrUpdate(eduTeacher).then(response => {
        alert('success')
        this.$router.push({ path: '/table' })
      }).catch(err => {
        this.$message.error(err.message)
        console.log(err)
      })
    },

    getInfo(id) {
      teacher.getTeacher(id).then(response => {
        console.log(response)
        this.eduTeacher = response.data.items
      }).catch(err => {
        this.$message.error(err.message)
        console.log(err)
      })
    },
    save(eduTeacher) {
      teacher.save(eduTeacher).then(response => {
        alert('success')
      }).catch(err => {
        this.$message.error(err.message)
        console.log(err)
      })
    },
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      console.log(data)
      this.imagecropperKey = this.imagecropperKey + 1
      this.eduTeacher.avatar = data.items
      this.imagecropperShow = false
    }

  }
}
</script>

<style scoped>

</style>
