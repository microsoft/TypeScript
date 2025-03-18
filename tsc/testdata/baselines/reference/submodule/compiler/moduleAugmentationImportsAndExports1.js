//// [tests/cases/compiler/moduleAugmentationImportsAndExports1.ts] ////

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
declare module "./f1" {
    interface A {
        foo(): B;
    }
}

//// [f4.ts]
import {A} from "./f1";
import "./f3";

let a: A;
let b = a.foo().n;

//// [f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
}
exports.A = A;
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
class B {
    n;
}
exports.B = B;
//// [f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const f1_1 = require("./f1");
f1_1.A.prototype.foo = function () { return undefined; };
//// [f4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./f3");
let a;
let b = a.foo().n;
