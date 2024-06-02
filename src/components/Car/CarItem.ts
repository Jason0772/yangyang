export class CarItem {
  x = 0;
  y = 0;
  z = 1;
  word = "";
  width = 100;
  height = 100;
  id = CarItem.createId();

  static count = 0;

  constructor() {}

  static createId() {
    return ++CarItem.count;
  }
}
