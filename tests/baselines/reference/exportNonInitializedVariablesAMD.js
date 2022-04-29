//// [exportNonInitializedVariablesAMD.ts]
var;
let;
const;

export var a;
export let b;
export var c: string;
export let d: number;
class A {}
export var e: A;
export let f: A;

namespace B {
    export let a = 1, b, c = 2;
    export let x, y, z;
}

module C {
    export var a = 1, b, c = 2;
    export var x, y, z;
}

// Shouldn't be filtered
export var a1 = 1;
export let b1 = 1;
export var c1: string = 'a';
export let d1: number = 1;
class D {}
export var e1 = new D;
export let f1 = new D;
export var g1: D = new D;
export let h1: D = new D;


//// [exportNonInitializedVariablesAMD.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.h1 = exports.g1 = exports.f1 = exports.e1 = exports.d1 = exports.c1 = exports.b1 = exports.a1 = exports.f = exports.e = exports.d = exports.c = exports.b = exports.a = void 0;
    var ;
    let;
    var ;
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    var B;
    (function (B) {
        B.a = 1, B.c = 2;
    })(B || (B = {}));
    var C;
    (function (C) {
        C.a = 1, C.c = 2;
    })(C || (C = {}));
    // Shouldn't be filtered
    exports.a1 = 1;
    exports.b1 = 1;
    exports.c1 = 'a';
    exports.d1 = 1;
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
    exports.e1 = new D;
    exports.f1 = new D;
    exports.g1 = new D;
    exports.h1 = new D;
});
