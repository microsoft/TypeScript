//// [typeofAnExportedType.ts]
export var x = 1;
export var r1: typeof x;
export var y = { foo: '' };
export var r2: typeof y;
export class C {
    foo: string;
}
export var c: C;
var c2: C;

export var r3: typeof C;
export var r4: typeof c;
export var r4b: typeof c2;

export interface I {
    foo: string;
}
export var i: I;
var i2: I;
export var r5: typeof i;
export var r5: typeof i2;

export module M {
    export var foo = '';
    export class C {
        foo: string;
    }
}
export var r6: typeof M;
export var r7: typeof M.foo;

export import Z = M;
export var r8: typeof Z;
export var r9: typeof Z.foo;

export enum E {
    A
}
export var r10: typeof E;
export var r11: typeof E.A;

export var r12: typeof r12;

export function foo() { }
export module foo {
    export var y = 1;
    export class C {
        foo: string;
    }
}
export var r13: typeof foo;

//// [typeofAnExportedType.js]
"use strict";
exports.__esModule = true;
exports.x = 1;
exports.r1 = undefined;
exports.y = { foo: '' };
exports.r2 = undefined;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
exports.c = undefined;
var c2;
exports.r3 = undefined;
exports.r4 = undefined;
exports.r4b = undefined;
exports.i = undefined;
var i2;
exports.r5 = undefined;
exports.r5 = undefined;
var M;
exports.M = undefined;
(function (M) {
    M.foo = '';
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
})(M = exports.M || (exports.M = {}));
exports.r6 = undefined;
exports.r7 = undefined;
exports.Z = M;
exports.r8 = undefined;
exports.r9 = undefined;
var E;
exports.E = undefined;
(function (E) {
    E[E["A"] = 0] = "A";
})(E = exports.E || (exports.E = {}));
exports.r10 = undefined;
exports.r11 = undefined;
exports.r12 = undefined;
function foo() { }
exports.foo = foo;
(function (foo) {
    foo.y = 1;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    foo.C = C;
})(foo = exports.foo || (exports.foo = {}));
exports.r13 = undefined;
