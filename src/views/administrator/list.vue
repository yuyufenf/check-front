<script setup>
  import '@/assets/css/tableView.css'
  import { ElMessage } from "element-plus";
  import axiosEx from "@/utils/axios.js";
  import formDialog from '@/components/main/DialogComponents.vue'
  import {useRouter} from "vue-router";
  import { ref, reactive, onMounted } from 'vue'

  //页面元素加载完成后执行方法
  onMounted(() => {
    selectList();
  })

  //列表初始化数据
  const data = reactive({
    list:[]
  })

  //列表初始化数据
  const input = ref('')
  const select = ref('')

  //弹窗初始化状态
  const dialogFormVisible = ref(false)

  const router = useRouter();

  //根据条件去后台查询相关列表数据
  const selectList = () => {
    let params = {
      select: select.value,
      input: input.value
    }
    axiosEx.get('/admin/adminList', params).then(response => {
      data.list = response.data;

    }).catch(err => {
      console.err(err)
    })
  }

  //新增按钮
  const add = () => {
    dialogFormVisible.value = true
  }

  //获取当前条信息并弹出修改弹窗
  const edit = (row) => {
    // ElMessage.info("修改")
    router.push({
      path: '/administrator/add',
      query: {
        id: row.id
      }
    })
  }

  //删除当前条目信息
  const drop = async (row) => {
    console.log(row.id)
    ElMessage.error("删除")
  }

  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })


  //dialog方法块
  //消息确认提交
  const submit = () => {
    let params = {
      name: form.name,
      password: "password",
      role: "role"
    }

    axiosEx.post('/admin/adminAdd', params).then(response => {
      data.list = response.data;
      dialogFormVisible.value = false;
    }).catch(err => {
      console.err(err)
    })
  }

  //取消提交内容
  const cancel = () => {

    dialogFormVisible.value = false;
  }

  const closeDialog = () => {
    console.log("close");
    dialogFormVisible.value = false;
  }
</script>

<template>
  <view class="list-title">
    <view class="title-text">
      <span>系统管理员</span>
    </view>
    <view class="list-select">
      <el-input
          v-model="input"
          placeholder="请输入需要查询的值"
          class="list-select-with-input"
      >
        <template #prepend>
          <el-select
              class="select-with-input"
              popper-class="select-with-input-dropdown"
              v-model="select" placeholder="请选择">
            <el-option label="id" value="1" />
            <el-option label="名称" value="2" />
            <el-option label="邮箱" value="3" />
          </el-select>
        </template>
        <template #append>
          <el-button class="select-with-input-button" @click="selectList">
            <el-icon><Search /></el-icon>
          </el-button>
        </template>
      </el-input>
    </view>
  </view>
  <view class="list-button">
    <el-button class="table-primary-button" @click="add">新增管理员</el-button>
  </view>
  <el-table border :data="data.list">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="userName" label="名称" />
    <el-table-column prop="email" label="邮件" />
    <el-table-column prop="createDate" label="创建时间"/>
    <el-table-column prop="remark" label="备注"/>
    <el-table-column label="操作" >
      <template #default="scope">
        <el-button class="table-primary-button" size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button class="table-nominal-button" size="small" @click="drop(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <formDialog title="新增" :modelValue="dialogFormVisible" confirmText="确认" @dialogConfirm="submit" @dialogCancel="cancel" @close="closeDialog">
    <el-form :model="form">
      <el-form-item label="Promotion name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
  </formDialog>
</template>

<style scoped>

</style>