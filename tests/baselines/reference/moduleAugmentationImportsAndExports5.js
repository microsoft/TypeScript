//// [tests/cases/compiler/moduleAugmentationImportsAndExports5.ts] ////

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


//// [f1.d.ts]
export declare class A {
}
//// [f2.d.ts]
export declare class B {
    n: number;
}
//// [f3.d.ts]
import { B } from "./f2";
declare namespace N {
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
export {};
//// [f4.d.ts]
import "./f3";


//// [DtsFileErrors]


f3.d.ts(4,14): error TS2694: Namespace 'N' has no exported member 'Ifc'.
f3.d.ts(5,14): error TS2694: Namespace 'N' has no exported member 'Cls'.


==== f1.d.ts (0 errors) ====
    export declare class A {
    }
    
==== f2.d.ts (0 errors) ====
    export declare class B {
        n: number;
    }
    
==== f3.d.ts (2 errors) ====
    import { B } from "./f2";
    declare namespace N {
    }
    import I = N.Ifc;
                 ~~~
!!! error TS2694: Namespace 'N' has no exported member 'Ifc'.
    import C = N.Cls;
                 ~~~
!!! error TS2694: Namespace 'N' has no exported member 'Cls'.
    declare module "./f1" {
        interface A {
            foo(): B;
            bar(): I;
            baz(): C;
        }
    }
    export {};
    
==== f4.d.ts (0 errors) ====
    import "./f3";
    