// @module: commonjs
// @declaration: true

// @filename: f1.ts
export class A {};
// @filename: f2.ts

// change the shape of Array<T>
import {A} from "./f1";

declare global {
    interface Array<T> {
        getCountAsString(): string;
    }
}

let x = [1];
let y = x.getCountAsString().toLowerCase();
