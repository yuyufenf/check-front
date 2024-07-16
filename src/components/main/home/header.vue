<script setup>
  import { useAdminStore } from "@/store/storeAdmin.js";
  import { useRouter } from "vue-router";
  import storage from "@/utils/localStorage.js"

  const store = useAdminStore();
  const router = useRouter();

  const logout = () => {
    storage.remove("admin");

    router.push("/login")
  }
</script>

<template>
  <el-header class="con-header">
    <view class="title">
      <view class="logo">
        <el-icon class="icon"><MostlyCloudy/></el-icon>
      </view>
      <view class="title-text">
        <span>后台管理</span>
      </view>
    </view>

    <view class="user-info">
      <view class="admin">
        <view class="info">
          <span>{{ store.data.name }}</span><el-icon class="icon"><Bell/></el-icon>
        </view>
        <view class="exit" @click="logout">
          退出
        </view>
      </view>
    </view>
  </el-header>
</template>

<style scoped>

</style>