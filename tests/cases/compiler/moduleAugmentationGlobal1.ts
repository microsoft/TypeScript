// @module: commonjs
// @declaration: true

// @filename: f1.ts
export class A {x: number;}

// @filename: f2.ts
import {A} from "./f1";

// change the shape of Array<T>
declare global {
    interface Array<T> {
        getA(): A;
    }
}

let x = [1];
let y = x.getA().x;
