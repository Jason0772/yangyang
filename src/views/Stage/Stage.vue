<template>
  <div class="stage">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Stage } from "./Stage";

const canvas = ref<HTMLCanvasElement>();
onMounted(() => {
  new Stage(canvas.value!);
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
