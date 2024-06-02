export class BlockItem {
  x = 0;
  y = 0;
  z = 0;
  width = 100;
  height = 100;
  id = BlockItem.createId();

  //切分单元格个数
  static SPLIT_COUNT = 20;
  //每个单元格尺寸
  static SPLIT_SIZE = 1;
  //物体宽度
  static BLOCK_WIDTH = 1;
  //物体高度
  static BLOCK_HEIGHT = 1;
  //舞台宽度
  static STAGE_WIDTH = 1;
  //舞台高度
  static STAGE_HEIGHT = 1;
  //舞台宽度
  static HALF_STAGE_WIDTH = 1;
  //舞台高度
  static HALF_STAGE_HEIGHT = 1;

  static count = 0;

  constructor() {
    this.id = BlockItem.createId();
  }

  clone() {
    let item = new BlockItem();
    item.x = this.x;
    item.y = this.y;
    item.z = this.z;
    return item;
  }

  //序列化，转为json
  dumps() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      id: this.id,
    };
  }

  //反序列化，还原为对象
  loads(obj: any) {
    this.x = obj.x;
    this.y = obj.y;
    this.z = obj.z;
    this.id = obj.id;
  }

  static createId() {
    return ++BlockItem.count;
  }

  static reset() {
    BlockItem.STAGE_WIDTH = window.innerWidth;
    BlockItem.STAGE_HEIGHT = window.innerHeight;
    BlockItem.SPLIT_SIZE = BlockItem.STAGE_WIDTH / BlockItem.SPLIT_COUNT;
    BlockItem.BLOCK_WIDTH = BlockItem.SPLIT_SIZE * 2;
    BlockItem.BLOCK_HEIGHT = BlockItem.SPLIT_SIZE * 2;
    BlockItem.HALF_STAGE_WIDTH = Math.floor(BlockItem.STAGE_WIDTH / 2 / BlockItem.SPLIT_SIZE) * BlockItem.SPLIT_SIZE;
    BlockItem.HALF_STAGE_HEIGHT = Math.floor(BlockItem.STAGE_HEIGHT / 2 / BlockItem.SPLIT_SIZE) * BlockItem.SPLIT_SIZE;
  }
}
