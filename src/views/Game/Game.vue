<template>
  <div class="game">
    <Car :item="item" v-for="item in pickes" :key="item.id" @choose="onChoose"></Car>
    <GameOver v-if="gameOver" @start="onStart"></GameOver>
    <GameWin v-if="gameWin" @start="onStart"></GameWin>
    <div class="bar" :style="style"></div>
    <Star v-if="starVisible" :x="starX" :y="bottom" :width="WIDTH * 3" :height="HEIGHT"></Star>
    <div class="title">麻了个将</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import Car from "@/components/Car/Car.vue";
import { CarItem } from "@/components/Car/CarItem";
import GameOver from "@/components/GameOver/GameOver.vue";
import GameWin from "@/components/GameWin/GameWin.vue";
import Star from "@/components/Star/Star.vue";
import { getCarTypes } from "@/comm/core";

let col = 6;
let row = 5;
let space = 10;
let WIDTH = 60;
let HEIGHT = 80;
const gameOver = ref(false);
const gameWin = ref(false);
const starVisible = ref(false);
const bars = reactive<CarItem[]>([]);
const pickes = reactive<CarItem[]>([]);
const bottom = ref(window.innerHeight - HEIGHT);
const starX = ref(0);
const style = computed(() => {
  return {
    width: WIDTH * 7 + "px",
    height: HEIGHT + "px",
    transform: `translate(0px, ${bottom.value}px)`,
  };
});
const onChoose = (item: CarItem) => {
  var num = bars.length;
  //获取插入位置
  bars.forEach((val, id) => {
    if (val.word == item.word) {
      num = id + 1;
      console.log("插入" + num);
    }
  });

  //排队后移
  bars.forEach((val, id) => {
    if (id >= num) {
      console.log(id + "后移");
      val.x += item.width;
    }
  });

  item.x = num * item.width;
  item.y = window.innerHeight - item.height;
  item.z = 2;
  bars.push(item);

  setTimeout(() => {
    //重新排序
    sortItem();
    //检测结果
    checkState();
  }, 200);
};

const checkState = () => {
  let timers = 1;
  let word = "";
  let delId = -1;
  bars.forEach((item, id) => {
    if (item.word == word) {
      if (++timers == 3) {
        delId = id - 2;
      }
    } else {
      word = item.word;
      timers = 1;
    }
  });

  if (delId != -1) {
    let delList = bars.splice(delId, 3);
    playStar(delId * WIDTH);
    while (delList.length) {
      let delItem = delList.pop();
      let id = pickes.findIndex((i) => i == delItem);
      pickes.splice(id, 1);
    }
    console.log(bars);
    if (pickes.length == 0) {
      gameWin.value = true;
    }
    bars.forEach((item, id) => {
      item.x = id * item.width;
    });
  }

  if (bars.length == 7) {
    gameOver.value = true;
  }
};

const playStar = (n: number) => {
  starX.value = n;
  starVisible.value = false;
  setTimeout(() => {
    starVisible.value = true;
    setTimeout(() => {
      starVisible.value = false;
    }, 400);
  }, 30);
};

const sortItem = () => {
  var temp = bars.splice(0).sort((a, b) => {
    return a.x > b.x ? 1 : -1;
  });
  temp.forEach((i) => {
    bars.push(i);
  });
  console.log(bars.map((i) => i.word));
};

const onStart = () => {
  gameOver.value = false;
  gameWin.value = false;
  init();
};

const init = () => {
  bars.splice(0);
  pickes.splice(0);
  let total = col * row;
  let ary = getCarTypes();
  for (let i = 0; i < ary.length; i++) {
    let item = new CarItem();
    item.width = 60;
    item.height = 80;
    item.x = (i % col) * (item.width + space);
    item.y = Math.floor(i / col) * (item.height + space);
    item.word = ary[i] + "";
    item.z = 1;
    pickes.push(item);
  }
};

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
