<script setup>

</script>

<template>
  <el-aside class="con-aside">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        router >

      <el-sub-menu index="admin">
        <template #title>
          <el-icon><UserFilled /></el-icon>管理员
        </template>
        <el-menu-item-group>
          <el-menu-item index="/administrator/add">添加管理员</el-menu-item>
          <el-menu-item index="/administrator/list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item index="/category/list">
        <el-icon><Files /></el-icon>类别管理
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>

</style>