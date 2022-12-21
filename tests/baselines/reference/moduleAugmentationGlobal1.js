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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = [1];
var y = x.getA().x;


//// [f1.d.ts]
export declare class A {
    x: number;
}
//// [f2.d.ts]
import { A } from "./f1";
declare global {
    interface Array<T> {
        getA(): A;
    }
}
