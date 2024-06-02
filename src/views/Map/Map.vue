<template>
  <div class="map" @mousedown="onMouseDown">
    <div class="box" v-for="item in list" :key="item.id" :style="getStyle(item)" :data-id="item.id">{{ item.id }}</div>
  </div>
  <div class="line">
    <div class="rows">
      <div class="row" v-for="i in rows" :style="{ top: i + 'px' }"></div>
    </div>
    <div class="cols">
      <div class="col" v-for="i in cols" :style="{ left: i + 'px' }"></div>
    </div>
  </div>
  <div class="param">
    <input type="text" class="txt" v-model="z" @change="onZIndex" />
    <div class="btn" @click="saveMap">保存</div>
    <div class="btn" @click="readMap">读取</div>
    <div class="btn" @click="moveUp">上移</div>
    <div class="btn" @click="moveDown">下移</div>
  </div>
</template>

<script setup lang="ts">
import { BlockItem } from "@/components/Block/BlockItem";
import { onMounted, reactive, ref } from "vue";
import { Cache } from "@/comm/Cache";

const list = reactive<BlockItem[]>([]);
const rows = reactive<number[]>([]);
const cols = reactive<number[]>([]);
const z = ref(Cache.getNumberData("z"));

const getStyle = (item: BlockItem) => {
  return {
    width: BlockItem.BLOCK_WIDTH + "px",
    height: BlockItem.BLOCK_HEIGHT + "px",
    zIndex: item.z,
    left: BlockItem.HALF_STAGE_WIDTH + item.x * BlockItem.SPLIT_SIZE + "px",
    top: BlockItem.HALF_STAGE_HEIGHT - item.y * BlockItem.SPLIT_SIZE + "px",
  };
};

const onMouseDown = (e: MouseEvent) => {
  console.log((e.target as any).classList);

  if ((e.target as any).classList.contains("box")) {
    var id = (e.target as any).getAttribute("data-id");
    var obj = list.find((i) => i.id == id);
    if (obj) {
      var n = list.findIndex((i) => i == obj);
      list.splice(n, 1);
      var other = list.findIndex((i) => {
        if (i.y == obj!.y) {
          if (obj!.x * -1 - 2 == i.x) {
            return true;
          }
        }
        return false;
      });
      if (other != -1) {
        list.splice(other, 1);
      }
    }
    return;
  }
  var len = BlockItem.SPLIT_SIZE;
  var x = Math.floor((e.clientX - BlockItem.HALF_STAGE_WIDTH) / len);
  var y = Math.ceil((BlockItem.HALF_STAGE_HEIGHT - e.clientY) / len);
  var item = new BlockItem();
  item.x = x;
  item.y = y;
  list.push(item);
  console.log(x, y);

  if (x == -1) {
    console.log("同一个位置");
  } else {
    var copy = item.clone();
    copy.x = -x - 2;
    list.push(copy);
  }
};

const saveMap = () => {
  var obj: any = localStorage.getItem("map");
  obj = obj ? JSON.parse(obj) : {};
  obj[z.value] = list.map((i) => i.dumps());
  console.log(obj[z.value]);
  localStorage.setItem("map", JSON.stringify(obj));
};

const readMap = () => {
  list.splice(0);
  var obj: any = localStorage.getItem("map");
  obj = obj ? JSON.parse(obj) : {};
  if (obj[z.value]) {
    console.log(obj[z.value]);
    obj[z.value].forEach((i: any) => {
      var item = new BlockItem();
      item.loads(i);
      list.push(item);
    });
  }
};

const resize = () => {
  BlockItem.reset();
  cols.splice(0);
  rows.splice(0);
  var n = 0;
  while (n < window.innerWidth) {
    n += BlockItem.SPLIT_SIZE;
    cols.push(n);
  }
  cols.push(BlockItem.HALF_STAGE_WIDTH);
  n = 0;
  while (n < window.innerHeight) {
    n += BlockItem.SPLIT_SIZE;
    rows.push(n);
  }
  rows.push(BlockItem.HALF_STAGE_HEIGHT);
};

const onZIndex = () => {
  Cache.setNumberData("z", z.value);
};

const moveUp = () => {
  list.forEach((i) => {
    i.y += 1;
  });
};

const moveDown = () => {
  list.forEach((i) => {
    i.y -= 1;
  });
};

onMounted(() => {
  resize();
  window.addEventListener("resize", (e) => {
    resize();
  });
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
