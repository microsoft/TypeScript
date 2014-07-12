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
exports.x = 1;
exports.r1;
exports.y = { foo: '' };
exports.r2;
var C = (function () {
    function C() {
    }
    return C;
})();
exports.C = C;
exports.c;
var c2;

exports.r3;
exports.r4;
exports.r4b;

exports.i;
var i2;
exports.r5;
exports.r5;

(function (M) {
    M.foo = '';
    var C = (function () {
        function C() {
        }
        return C;
    })();
    M.C = C;
})(exports.M || (exports.M = {}));
var M = exports.M;
exports.r6;
exports.r7;

var Z = M;
exports.Z = Z;
exports.r8;
exports.r9;

(function (E) {
    E[E["A"] = 0] = "A";
})(exports.E || (exports.E = {}));
var E = exports.E;
exports.r10;
exports.r11;

exports.r12;

function foo() {
}
exports.foo = foo;
(function (foo) {
    foo.y = 1;
    var C = (function () {
        function C() {
        }
        return C;
    })();
    foo.C = C;
})(exports.foo || (exports.foo = {}));
var foo = exports.foo;
exports.r13;
