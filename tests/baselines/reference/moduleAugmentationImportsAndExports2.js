//// [tests/cases/compiler/moduleAugmentationImportsAndExports2.ts] ////

//// [f1.ts]
export class A {}

//// [f2.ts]
export class B {
    n: number;
}

//// [f3.ts]
import {A} from "./f1";

A.prototype.foo = function () { return undefined; }

namespace N {
    export interface Ifc { a }
    export interface Cls { a }
}

declare module "./f1" {
    import {B} from "./f2";
    export {B} from "./f2";
    import I = N.Ifc;
    import C = N.Cls;
    // should have explicit export
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


//// [f1.d.ts]
export declare class A {
}
//// [f2.d.ts]
export declare class B {
    n: number;
}
//// [f3.d.ts]
declare namespace N {
    interface Ifc {
        a: any;
    }
    interface Cls {
        a: any;
    }
}
declare module "./f1" {
    import { B } from "./f2";
    export { B } from "./f2";
    import I = N.Ifc;
    import C = N.Cls;
    interface A {
        foo(): B;
        bar(): I;
        baz(): C;
    }
}
export {};
//// [f4.d.ts]
import "./f3";
