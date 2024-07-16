<script setup>
  import '@/assets/css/main/home.css'
  import HomeHeader from '@/components/main/home/header.vue'
  import HomeSide from '@/components/main/home/side.vue'
  import HomeFooter from '@/components/main/home/footer.vue'
</script>

<template>
  <view class="common-layout">
    <el-container direction="vertical">
      <HomeHeader/>
      <el-container>
        <HomeSide />
        <el-container direction="vertical">
          <el-main class="con-main">
            <router-view />
          </el-main>
          <HomeFooter/>
        </el-container>
      </el-container>
    </el-container>
  </view>
</template>

<style scoped>

</style>