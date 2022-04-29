// @target: es5

interface X {
    readonly a: number;
    readonly b?: number;
}
var x: X = { a: 0 };
x.a = 1;  // Error
x.b = 1;  // Error

class C {
    readonly a: number;
    readonly b = 1;
    get c() { return 1 }
    constructor() {
        this.a = 1;  // Ok
        this.b = 1;  // Ok
        this.c = 1;  // Error
        const f = () => {
            this.a = 1;  // Error
            this.b = 1;  // Error
            this.c = 1;  // Error
        }
    }
    foo() {
        this.a = 1;  // Error
        this.b = 1;  // Error
        this.c = 1;  // Error
    }
}

var o = {
    get a() { return 1 },
    get b() { return 1 },
    set b(value) { }
};
o.a = 1;  // Error
o.b = 1;

var p: { readonly a: number, b: number } = { a: 1, b: 1 };
p.a = 1;  // Error
p.b = 1;
var q: { a: number, b: number } = p;
q.a = 1;
q.b = 1;

enum E {
    A, B, C
}
E.A = 1;  // Error

namespace N {
    export const a = 1;
    export let b = 1;
    export var c = 1;
}
N.a = 1;  // Error
N.b = 1;
N.c = 1;

let xx: { readonly [x: string]: string };
let s = xx["foo"];
xx["foo"] = "abc";  // Error

let yy: { readonly [x: number]: string, [x: string]: string };
yy[1] = "abc";  // Error
yy["foo"] = "abc";