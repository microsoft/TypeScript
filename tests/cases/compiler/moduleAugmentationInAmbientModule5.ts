// @module: commonjs
// @declaration: true

// @filename: array.d.ts
declare module "A" {
    class A { x: number; }
}

declare module "array" {
    import {A} from "A";
    global {
        interface Array<T> {
            getA(): A;
        }
    }
}

// @filename: f.ts
/// <reference path="array.d.ts"/>
import "array";

let x = [1];
let y = x.getA().x;
