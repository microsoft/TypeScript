//// [tests/cases/compiler/moduleAugmentationGlobal1.ts] ////

//// [f1.ts]
export class A {x: number;}

//// [f2.ts]
import {A} from "./f1";

// change the shape of Array<T>
declare global {
    interface Array<T> {
        getA(): A;
    }
}

let x = [1];
let y = x.getA().x;


//// [f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
    x;
}
exports.A = A;
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let x = [1];
let y = x.getA().x;
