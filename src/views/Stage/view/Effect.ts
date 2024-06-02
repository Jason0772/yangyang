import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { Car } from "./Car";

export class Effect extends THREE.Object3D {
    cars: Car[];
    size = new THREE.Vector3(2, 2, 2);
    total = 7;

    constructor() {
        super();
        this.cars = [];
        this.init();
    }

    init() {
        
    }
}
