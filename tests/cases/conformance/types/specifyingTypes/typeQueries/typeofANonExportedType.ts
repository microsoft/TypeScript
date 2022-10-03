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