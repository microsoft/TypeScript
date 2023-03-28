//// [tests/cases/compiler/moduleAugmentationImportsAndExports4.ts] ////

//// [f1.ts]
export class A {}

//// [f2.ts]
export class B {
    n: number;
}

//// [f3.ts]
import {A} from "./f1";
import {B} from "./f2";

A.prototype.foo = function () { return undefined; }

namespace N {
    export interface Ifc { a: number; }
    export interface Cls { b: number; }
}
import I = N.Ifc;
import C = N.Cls;

declare module "./f1" {
    interface A {
        foo(): B;
        bar(): I;
        baz(): C;
    }
}

//// [f4.ts]
import {A} from "./f1";
import "./f3";

let a: A;
let b = a.foo().n;
let c = a.bar().a;
let d = a.baz().b;

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
exports.B = void 0;
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
exports.B = B;
//// [f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var f1_1 = require("./f1");
f1_1.A.prototype.foo = function () { return undefined; };
//// [f4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./f3");
var a;
var b = a.foo().n;
var c = a.bar().a;
var d = a.baz().b;
