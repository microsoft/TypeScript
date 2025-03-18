//// [tests/cases/compiler/moduleAugmentationGlobal2.ts] ////

//// [f1.ts]
export class A {};
//// [f2.ts]
// change the shape of Array<T>
import {A} from "./f1";

declare global {
    interface Array<T> {
        getCountAsString(): string;
    }
}

let x = [1];
let y = x.getCountAsString().toLowerCase();


//// [f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
}
exports.A = A;
;
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let x = [1];
let y = x.getCountAsString().toLowerCase();
