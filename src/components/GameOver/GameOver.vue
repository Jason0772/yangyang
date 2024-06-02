<template>
  <div class="mask">
    <div class="over">
      <div class="tip">游戏结束</div>
      <div class="btn" @click="onStart">重新开始</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["start"]);
const onStart = () => {
  emit("start");
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
