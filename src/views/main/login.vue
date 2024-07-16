<script setup>
  import '@/assets/css/main/login.css'
  import '@/assets/js/main/login.js'
  import {reactive, ref} from "vue";
  import { ElMessageBox } from 'element-plus'
  import {User, Lock} from '@element-plus/icons-vue'
  import axiosEx from "@/utils/axios.js";
  import { useAdminStore } from "@/store/storeAdmin.js";
  import { useRouter } from 'vue-router';

  const store = useAdminStore();
  const router = useRouter();

  const rules = {
    userName: [
      {required: true, message:'请填写用户名', trigger:'blur'},
      {min:2, max:10, message: '用户名长度限制[2 - 10]个字符', trigger:'blur'},
    ],
    password: [
      {required: true, message:'请填写密码', trigger:'blur'},
    ]
  }

  const data = reactive({
    userName: "",
    password: ''
  })

  const elRef = ref();

  const loginSub = () => {
    //校验以及弹窗说明
    elRef.value.validate((valid, fields) => {
      if(!valid){
        ElMessageBox.alert(Object.values(fields)[0][0].message, '提示', {
          confirmButtonText: 'OK'
        })
      }
    })

    axiosEx.post('/basis/login', data).then(response => {

      if(!response.status){
        ElMessageBox.alert(response.msg, '提示', {
          confirmButtonText: 'OK'
        })
      }

      let token = response.data;
      let [headerBase64, payloadBase64, signBase64] = token.split('.');
      let payload = JSON.parse(atob(payloadBase64));

      store.save(payload.userName, token, payload.exp)

      router.push('/home')
    }).catch(err => {
      console.log("err:", err);
    })
  }
</script>

<template>
  <view class="login">
    <view class="login-deep-shadow">
      <view class="login-glass"></view>
      <view class="login-form">
        <view class="login-form-title"><span>后管系统</span></view>
        <el-form class="login-form-area" :model="data" :rules="rules" ref="elRef">
          <view class="login-form-item">
            <el-form-item prop="userName">
              <el-input :prefix-icon="User" v-model="data.userName"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input :prefix-icon="Lock" v-model="data.password" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSub">登陆</el-button>
            </el-form-item>
          </view>
        </el-form>
      </view>
    </view>
  </view>
</template>

<style scoped>

</style>