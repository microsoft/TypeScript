//// [tests/cases/conformance/types/specifyingTypes/typeQueries/typeofAnExportedType.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.r13 = exports.r12 = exports.r11 = exports.r10 = exports.E = exports.r9 = exports.r8 = exports.Z = exports.r7 = exports.r6 = exports.M = exports.r5 = exports.i = exports.r4b = exports.r4 = exports.r3 = exports.c = exports.C = exports.r2 = exports.y = exports.r1 = exports.x = void 0;
exports.foo = foo;
exports.x = 1;
exports.y = { foo: '' };
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
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
})(M || (exports.M = M = {}));
exports.Z = M;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (exports.E = E = {}));
function foo() { }
(function (foo) {
    foo.y = 1;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    foo.C = C;
})(foo || (exports.foo = foo = {}));
