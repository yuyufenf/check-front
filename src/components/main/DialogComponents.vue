<script setup>
  import '@/assets/css/components/formDialog.css'
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: false,
    title: "",
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    loading: false,
    contentBody: null
  });

  const emits = defineEmits(["update:modelValue", "dialogCancel", "close"]);

  const visible = computed({
    get () {
      return props.modelValue;
    },
    set (val) {
      emits("update:modelValue", val);
    }
  });

  const handleCancel = () => {
    emits("dialogCancel");
    visible.value = false;
  }

  const handleConfirm = () => {
    emits('dialogConfirm')
    visible.value = false;
  }

  const handleDialogClose = () => {
    emits("close");
    visible.value = false;
  }

</script>

<template>
  <el-dialog class="form-dialog"
    :title="title"
    v-model="visible"
    :before-close="handleDialogClose"
    >
    <view class="form-dialog-fromArea">
      <slot>
      </slot>
    </view>

    <template #footer>
      <view class="form-dialog-footer">
        <el-button class="table-nominal-button" @click="handleCancel">{{cancelText}}</el-button>
        <el-button class="table-primary-button" @click="handleConfirm">{{ confirmText }}</el-button>
      </view>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>