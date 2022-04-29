//// [tests/cases/compiler/moduleAugmentationsImports4.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export class B {x: number;}

//// [c.d.ts]
declare module "C" {
    class Cls {y: string; }
}

//// [d.d.ts]
declare module "D" {
    import {A} from "a";
    import {B} from "b";
    module "a" {
        interface A {
            getB(): B;
        }
    }
}

//// [e.d.ts]
/// <reference path="c.d.ts"/>
declare module "E" {
    import {A} from "a";
    import {Cls} from "C";

    module "a" {
        interface A {
            getCls(): Cls;
        }
    }
}

//// [main.ts]
/// <reference path="d.d.ts"/>
/// <reference path="e.d.ts"/>
import {A} from "./a";
import "D";
import "E";

let a: A;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();

//// [f.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.A = void 0;
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    exports.A = A;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.B = void 0;
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
    exports.B = B;
});
define("main", ["require", "exports", "D", "E"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var a;
    var b = a.getB().x.toFixed();
    var c = a.getCls().y.toLowerCase();
});


//// [f.d.ts]
/// <reference path="tests/cases/compiler/d.d.ts" />
/// <reference path="tests/cases/compiler/e.d.ts" />
declare module "a" {
    export class A {
    }
}
declare module "b" {
    export class B {
        x: number;
    }
}
declare module "main" {
    import "D";
    import "E";
}
