<template>
  <div class="car" :style="style" @click="onClick"></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CarItem } from "./CarItem";
const emit = defineEmits(["choose"]);

const props = defineProps({
  item: {
    type: CarItem,
    required: true,
  },
});

const style = computed(() => {
  return {
    transform: `translate(${props.item.x}px, ${props.item.y}px)`,
    width: `${props.item.width}px`,
    height: `${props.item.height}px`,
    zIndex: props.item.z,
    backgroundImage: `url("./imgs/p (${props.item.word}).png")`,
    left: "1px",
  };
});

const onClick = () => {
  emit("choose", props.item);
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
