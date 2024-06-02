export class Cache {
  constructor() {}

  static getNumberData(key: string, val = 0) {
    var str = localStorage.getItem(key);
    if (str) {
      return Number(str);
    }
    return val;
  }

  static setNumberData(key: string, val: number) {
    localStorage.setItem(key, val + "");
  }
}
