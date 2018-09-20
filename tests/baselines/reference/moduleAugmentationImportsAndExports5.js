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
exports.__esModule = true;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [f2.js]
"use strict";
exports.__esModule = true;
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
exports.B = B;
//// [f3.js]
"use strict";
exports.__esModule = true;
var f1_1 = require("./f1");
f1_1.A.prototype.foo = function () { return undefined; };
//// [f4.js]
"use strict";
exports.__esModule = true;
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
namespace N {
    interface Ifc {
        a: number;
    }
    interface Cls {
        b: number;
    }
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


tests/cases/compiler/f3.d.ts(2,1): error TS1046: A 'declare' modifier is required for a top level declaration in a .d.ts file.


==== tests/cases/compiler/f1.d.ts (0 errors) ====
    export declare class A {
    }
    
==== tests/cases/compiler/f2.d.ts (0 errors) ====
    export declare class B {
        n: number;
    }
    
==== tests/cases/compiler/f3.d.ts (1 errors) ====
    import { B } from "./f2";
    namespace N {
    ~~~~~~~~~
!!! error TS1046: A 'declare' modifier is required for a top level declaration in a .d.ts file.
        interface Ifc {
            a: number;
        }
        interface Cls {
            b: number;
        }
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
    
==== tests/cases/compiler/f4.d.ts (0 errors) ====
    import "./f3";
    