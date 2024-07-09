// @strictNullChecks: true
// @declaration: true

interface Foo {
    a: number;
    b?: number;
    f(): number;
    g?(): number;
}

function test1(x: Foo) {
    x.a;
    x.b;
    x.f;
    x.g;
    let f1 = x.f();
    let g1 = x.g && x.g();
    let g2 = x.g ? x.g() : 0;
}

class Bar {
    a: number;
    b?: number;
    c? = 2;
    constructor(public d?: number, public e = 10) {}
    f() {
        return 1;
    }
    g?(): number;  // Body of optional method can be omitted
    h?() {
        return 2;
    }
}

function test2(x: Bar) {
    x.a;
    x.b;
    x.c;
    x.d;
    x.e;
    x.f;
    x.g;
    let f1 = x.f();
    let g1 = x.g && x.g();
    let g2 = x.g ? x.g() : 0;
    let h1 = x.h && x.h();
    let h2 = x.h ? x.h() : 0;
}

class Base {
    a?: number;
    f?(): number;
}

class Derived extends Base {
    a = 1;
    f(): number { return 1; }
}
