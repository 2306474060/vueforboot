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
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="save(eduTeacher)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/teacher/teacher'
export default {
  name: 'Save',
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
        this.$router.push({ path: '/teacher/table' })
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

  }
}
</script>

<style scoped>

</style>
