import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

export class Car extends THREE.Object3D {
  view: THREE.Mesh;
  pic: THREE.Mesh = null as any;
  level: number = 0;
  carType = 0;
  carId = 0;

  static size = new THREE.Vector3(2, 2, 0.32);
  static boxGeo = new THREE.BoxBufferGeometry(Car.size.x, Car.size.y, Car.size.z);
  static boxMesh = new THREE.Mesh(Car.boxGeo, new THREE.MeshStandardMaterial({ color: 0x33ee22 }));
  static planeGeo = new THREE.PlaneGeometry(Car.size.x, Car.size.y, 1, 1);
  // static planeGeo = new THREE.BoxBufferGeometry(Car.size.x, Car.size.y, Car.size.z * 0.5);

  static frameGeo = new THREE.BufferGeometry();
  static frameMesh = new THREE.Mesh();

  static materialMap = new Map<number, THREE.MeshStandardMaterial>();
  static picMap = new Map<number, THREE.Mesh>();

  static count = 0;

  constructor() {
    super();
    this.carId = Car.createId();
    // this.view = Car.boxMesh.clone() as THREE.Mesh;
    this.view = Car.frameMesh.clone() as THREE.Mesh;
    this.add(this.view);
    this.view.rotateX(Math.PI / 2);
    this.view.scale.set(1, 0.2, 1);
    // this.receiveShadow = true;
    // this.castShadow = true;
    this.view.receiveShadow = true;
    this.view.castShadow = true;
    this.scale.setScalar(0.96);
  }

  setType(n: number) {
    if (this.pic) {
      this.remove(this.pic);
    }
    this.carType = n;
    this.pic = Car.getPicMap(n) as THREE.Mesh;
    this.add(this.pic);
    // this.pic.position.z = Car.size.z / 2 + 0.01;
    this.pic.position.z = 0.172;
    this.pic.scale.multiplyScalar(0.96);
    this.pic.receiveShadow = true;
    this.pic.castShadow = true;
  }

  moveTo(x: number, y: number, z: number = 0) {
    new TWEEN.Tween(this.position).to({ x, y, z }, 400).start();
  }

  static getPicMap(n: number) {
    var pic = Car.picMap.get(n);
    if (!pic) {
      var mat = Car.getPicMaterial(n);
      pic = new THREE.Mesh(Car.planeGeo, mat);

      Car.picMap.set(n, pic);
    }
    return pic.clone();
  }

  static getPicMaterial(n: number) {
    var mat = Car.materialMap.get(n);
    if (!mat) {
      mat = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(`./imgs/p${n}.png`),
        metalness: 0.4,
        transparent: false,
        color: 0xffffff,
        opacity: 1,
      });
      Car.materialMap.set(n, mat);
    }
    return mat.clone();
  }

  static createId() {
    return ++Car.count;
  }
}
