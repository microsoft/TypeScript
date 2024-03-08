//// [tests/cases/compiler/moduleAugmentationGlobal3.ts] ////

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

//// [f3.ts]
import "./f2";

let x = [1];
let y = x.getCountAsString().toLowerCase();


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
;
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./f2");
var x = [1];
var y = x.getCountAsString().toLowerCase();


//// [f1.d.ts]
export declare class A {
}
//// [f2.d.ts]
declare global {
    interface Array<T> {
        getCountAsString(): string;
    }
}
export {};
//// [f3.d.ts]
import "./f2";
