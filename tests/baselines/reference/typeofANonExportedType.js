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

namespace M {
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
namespace foo {
    export var y = 1;
    export class C {
        foo: string;
    }
}
export var r13: typeof foo;

//// [typeofANonExportedType.js]
var x = 1;
export var r1;
var y = { foo: '' };
export var r2;
class C {
}
export var c;
var c2;
export var r3;
export var r4;
export var r4b;
export var i;
var i2;
export var r5;
export var r5;
var M;
(function (M) {
    M.foo = '';
    class C {
    }
    M.C = C;
})(M || (M = {}));
export var r6;
export var r7;
export var r8;
export var r9;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
export var r10;
export var r11;
export var r12;
function foo() { }
(function (foo) {
    foo.y = 1;
    class C {
    }
    foo.C = C;
})(foo || (foo = {}));
export var r13;
