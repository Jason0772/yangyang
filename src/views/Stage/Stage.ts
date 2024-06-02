import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import TWEEN from "@tweenjs/tween.js";
import { Car } from "./view/Car";
import { Bar } from "./view/Bar";

console.log(TWEEN);

export class Stage {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  controls: OrbitControls;
  stats: Stats = null as any;
  raycaster: THREE.Raycaster;
  INTERSECTED: any;
  bar: Bar = null as any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    // this.renderer.setClearColor(0x00ff33, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 900);
    // this.camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 900);
    this.camera.position.set(0, 0, 12);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x29a92f);
    this.scene.fog = new THREE.FogExp2(0x0, 0.0325);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    // this.addView();
    this.addBar();
    this.addLight();
    this.loadObj();
    this.addEvent();
    this.addFun();

    this.update();
  }

  addBar() {
    this.bar = new Bar();
    this.scene.add(this.bar);
    this.bar.position.set(0, -6, 2);
  }

  addFun() {
    var obj: any = localStorage.getItem("map");
    obj = obj ? JSON.parse(obj) : {};
    (window as any).cmove = function (i: number, num: number) {
      var list = obj[i];
      if (list) {
        list.forEach((item: any) => {
          item.y += num;
        });
      }
      localStorage.setItem("map", JSON.stringify(obj));
    };

    (window as any).cbar = function () {
      var num = 600;
      for (let i in obj) {
        if (Number(i) > 1) {
          (obj[i] as any[]).push({ x: 2, y: -6, z: 0, id: ++num });
          (obj[i] as any[]).push({ x: -4, y: -6, z: 0, id: ++num });
        }
      }
      localStorage.setItem("map", JSON.stringify(obj));
    };
  }

  addEvent() {
    document.addEventListener("click", (event) => {
      var x = (event.clientX / window.innerWidth) * 2 - 1;
      var y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

      const intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length > 0) {
        console.log(intersects[0].object);
        var obj = this.getCar(intersects[0].object);
        console.log(obj);
        if (obj) {
          console.log((obj as Car).level);
          // (obj as Car).moveTo(-5, -6, 2);
          this.bar.addCar(obj as Car);
        }
      } else {
        console.log("click none");
      }
    });
  }

  getCar(obj: any) {
    while (obj) {
      if (obj instanceof Car) {
        return obj;
      }
      obj = obj.parent;
    }
    return null;
  }

  loadObj() {
    const loader = new GLTFLoader().setPath("./obj/");
    // loader.setDRACOLoader(new DRACOLoader().setDecoderPath("./obj/"));
    loader.load("frame.glb", (gltf) => {
      var obj = gltf.scene.children[0] as THREE.Mesh;
      // obj.receiveShadow = true;
      // obj.castShadow = true;
      // obj.rotateX(Math.PI / 2);
      // obj.position.z = 1;
      // this.scene.add(obj);

      Car.frameGeo = obj.geometry;
      Car.frameMesh = new THREE.Mesh(Car.frameGeo, new THREE.MeshStandardMaterial({ color: 0x339900 }));
      this.addView();
    });

    // const loader = new FBXLoader();
    // loader.load("./obj/frame.fbx", (object) => {
    //   object.traverse((child: any) => {
    //     if (child.isMesh) {
    //       child.castShadow = true;
    //       child.receiveShadow = true;
    //     }
    //   });
    //   this.scene.add(object);
    // });
  }

  addLight() {
    var g1 = new THREE.AmbientLight(0xffffff, 0.48);
    this.scene.add(g1);

    const spotLight = new THREE.SpotLight(0xffffff, 0.68);
    spotLight.angle = Math.PI / 9;
    spotLight.penumbra = 0.1;
    spotLight.position.set(0, 0, 30);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 90;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    this.scene.add(spotLight);
    // this.scene.add(new THREE.SpotLightHelper(spotLight));

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.64);
    dirLight.position.set(7, 3, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 90;

    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);
    // this.scene.add(new THREE.DirectionalLightHelper(dirLight));
  }

  addView() {
    // var box = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial());
    // this.scene.add(box);
    // this.scene.add(new THREE.AxesHelper(4));

    var obj: any = localStorage.getItem("map");
    obj = obj ? JSON.parse(obj) : {};
    for (let i in obj) {
      console.log(`第${i}层`);
      console.log(obj[i]);
      obj[i].forEach((item: any) => {
        var car = new Car();
        car.position.set(item.x + 1, item.y + 2, -Number(i));
        // car.position.set(item.x, item.y, -Number(i));
        car.setType((item.id % 16) + 1);
        car.level = Number(i);
        this.scene.add(car);
      });
    }
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
    TWEEN.update();
  }
}
