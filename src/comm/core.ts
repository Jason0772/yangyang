import { fastList, randomList, randomSort, timesList } from "./tooler";

const Row = 5;
const Col = 6;
const TotalType = 15;
const TotalCar = Row * Col;

export function getCarTypes() {
  let ary = fastList(1, TotalType);
  console.log("创建数组", ary);
  ary = randomList(ary, TotalCar / 3);
  console.log("随机获取元素", ary);
  ary = timesList(ary, 3);
  console.log("数组×3倍数", ary);
  ary = randomSort(ary);
  console.log("随机排序", ary);
  return ary;
}
