//// [tests/cases/conformance/types/specifyingTypes/typeQueries/typeofANonExportedType.ts] ////

//// [typeofANonExportedType.ts]
var x = 1;
export var r1: typeof x;
var y = { foo: '' };
export var r2: typeof y;
class C {
    foo: string;
}
export var c: C;
var c2: C;

export var r3: typeof C;
export var r4: typeof c;
export var r4b: typeof c2;

interface I {
    foo: string;
}
export var i: I;
var i2: I;
export var r5: typeof i;
export var r5: typeof i2;

module M {
    export var foo = '';
    export class C {
        foo: string;
    }
}
export var r6: typeof M;
export var r7: typeof M.foo;

import Z = M;
export var r8: typeof Z;
export var r9: typeof Z.foo;

enum E {
    A
}
export var r10: typeof E;
export var r11: typeof E.A;

export var r12: typeof r12;

function foo() { }
module foo {
    export var y = 1;
    export class C {
        foo: string;
    }
}
export var r13: typeof foo;

//// [typeofANonExportedType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.r13 = exports.r12 = exports.r11 = exports.r10 = exports.r9 = exports.r8 = exports.r7 = exports.r6 = exports.r5 = exports.i = exports.r4b = exports.r4 = exports.r3 = exports.c = exports.r2 = exports.r1 = void 0;
var x = 1;
var y = { foo: '' };
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c2;
var i2;
var M;
(function (M) {
    M.foo = '';
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
function foo() { }
(function (foo) {
    foo.y = 1;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    foo.C = C;
})(foo || (foo = {}));
