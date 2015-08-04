//// [tests/cases/compiler/declarationOut.ts] ////

//// [fileA.ts]

export default class A {
}

//// [fileB.ts]
import A from "fileA";
export default class B {
    getA() {
        return new A();
    }
}

//// [fileC.ts]
import B from "./fileB";
export default class C {
    getB() {
        return new B();
    }
}

//// [global.ts]
var global = {};

//// [fileA.js]
var A = (function () {
    function A() {
    }
    return A;
})();
exports.__esModule = true;
exports["default"] = A;
//// [fileB.js]
var fileA_1 = require("fileA");
var B = (function () {
    function B() {
    }
    B.prototype.getA = function () {
        return new fileA_1["default"]();
    };
    return B;
})();
exports.__esModule = true;
exports["default"] = B;
//// [fileC.js]
var fileB_1 = require("./fileB");
var C = (function () {
    function C() {
    }
    C.prototype.getB = function () {
        return new fileB_1["default"]();
    };
    return C;
})();
exports.__esModule = true;
exports["default"] = C;
//// [global.js]
var global = {};


//// [declaration.out.d.ts]
declare module "fileA" {
    export default class A {
    }
}
declare module "fileB" {
    import A from "fileA";
    export default class B {
        getA(): A;
    }
}
declare module "fileC" {
    import B from "fileB";
    export default class C {
        getB(): B;
    }
}
declare var global: {};
