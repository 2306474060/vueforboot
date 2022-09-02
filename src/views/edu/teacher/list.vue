<template>
  <div class="teacherList">

    <el-form :inline="true" :model="teacherQueryVO" class="demo-form-inline" style="margin-top: 25px;margin-left: 25px">
      <el-form-item label="审批人">
        <el-input v-model="teacherQueryVO.name" placeholder="审批人"/>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="teacherQueryVO.level" placeholder="活动区域">
          <el-option label="普通教师" value="1"/>
          <el-option label="高级教师" value="2"/>
        </el-select>
      </el-form-item>
      <!--
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker v-model="teacherQueryVO.gmtCreate" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="teacherQueryVO.gmtModified" placeholder="选择时间" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      -->
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      style="width: 100%">
      <div style="display: none">
        <el-table-column
          label="id"
          width="230">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
      </div>
      <el-table-column
        label="日期"
        width="230">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.career }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="资历"
        width="230">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.career }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="头衔"
        width="230">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.level === 1 ? '普通教师' : '高级教师' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini">编辑</el-button>
          <el-button
            size="mini"
            type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        layout="total, prev, pager, next, jumper"
        style="padding: 30px 0;text-align: center"
        @current-change="getList"
      />
    </div>

</div></template>

<script>
import teacher from '@/api/teacher/teacher'

export default {
  name: 'List',
  data() {
    return {
      list: null,
      page: 1,
      limit: 4,
      total: 0,
      teacherQueryVO: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {

    getList(page = 1) {
      this.page = page
      teacher.getTeacherList(this.page, this.limit, this.teacherQueryVO)
        .then(reponse => {
          this.list = reponse.data.items.records
          this.total = reponse.data.items.total
          console.log(reponse)
        })
        .catch(error => { console.log(error) }
        )
    },

    resetData() {
      this.teacherQueryVO = {}
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
