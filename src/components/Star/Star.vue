<template>
  <div class="stars" :style="style">
    <Item v-for="item in list" :x="item.x" :y="item.y" :width="item.width" :height="item.height"></Item>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import Item from "./Item/Item.vue";
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
    width: props.width + "px",
    height: props.height + "px",
    transform: `translate(${props.x}px, ${props.y}px)`,
  };
});

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    list.push({
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
    });
  }
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
