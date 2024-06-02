<template>
  <div class="items" :style="style">
    <div class="item" :class="'s' + i" v-for="(item, i) in list" :key="i"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});
const list = reactive<any[]>([]);
const style = computed(() => {
  return {
    // width: props.width + "px",
    height: props.height + "px",
    // transform: `translate(${props.x}px, ${props.y}px)`,
  };
});
onMounted(() => {
  for (let i = 0; i < 4; i++) {
    list.push(i);
  }
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
