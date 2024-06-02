import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { Car } from "./Car";

export class Bar extends THREE.Object3D {
    cars: Car[];
    size = new THREE.Vector3(2, 2, 2);
    total = 7;

    constructor() {
        super();
        this.cars = [];
        this.init();
    }

    init() {
        var mat = new THREE.MeshStandardMaterial({ color: 0xff8800, side: THREE.BackSide, metalness: 0.1, roughness: 0.9 });
        var box = new THREE.Mesh(new THREE.BoxGeometry(this.size.x * this.total, this.size.y, this.size.z), mat);
        this.add(box);
    }

    addCar(car: Car) {
        var { x, y, z } = this.position;
        var id = this.cars.length;
        this.cars.forEach((item, index) => {
            if (item.carType == car.carType) {
                id = index + 1;
            }
        })
        x = this.getCarPosition(id);
        car.moveTo(x, y, z);
        // this.cars.push(car);

        this.cars.forEach((item, index) => {
            if (index >= id) {
                var { x, y, z } = item.position;
                item.moveTo(x + this.size.x, y, z);
            }
        });
        this.cars.splice(id, 0, car);
        setTimeout(() => {
            this.checkDel();
        }, 400);
    }

    getCarPosition(id:number) {
        return (id - this.total / 2) * this.size.x + this.size.x / 2;
    }

    checkDel() {
        let timers = 1;
        let delId = -1;
        let carType = 0;
        this.cars.forEach((item, index) => {
            if (item.carType == carType) {
                if (++timers == 3) {
                    delId = index - 2;
                }
            } else {
                carType = item.carType;
                timers = 1;
            }
        });

        if (delId != -1) {
            //播放动画
            // playStar(delId * WIDTH);
           
            this.cars.forEach((item, index)=>{
                if(index >= delId){
                    if(index < delId + 3){
                        item.parent!.remove(item);
                    }
                    else{ 
                        var { y, z } = item.position;
                        item.moveTo(this.getCarPosition(index - 3), y, z);
                    }
                }
            })
            this.cars.splice(delId, 3);

        }


    }
}
