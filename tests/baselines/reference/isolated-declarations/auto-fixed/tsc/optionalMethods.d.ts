//// [tests/cases/conformance/types/namedTypes/optionalMethods.ts] ////

//// [optionalMethods.ts]
interface Foo {
    a: number;
    b?: number;
    f(): number;
    g?(): number;
}

function test1(x: Foo): void {
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
    f(): number {
        return 1;
    }
    g?(): number;  // Body of optional method can be omitted
    h?(): number {
        return 2;
    }
}

function test2(x: Bar): void {
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


/// [Declarations] ////



//// [optionalMethods.d.ts]
interface Foo {
    a: number;
    b?: number;
    f(): number;
    g?(): number;
}
declare function test1(x: Foo): void;
declare class Bar {
    d?: number | undefined;
    e: number;
    a: number;
    b?: number;
    c?: number | undefined;
    constructor(d?: number | undefined, e?: number);
    f(): number;
    g?(): number;
    h?(): number;
}
declare function test2(x: Bar): void;
declare class Base {
    a?: number;
    f?(): number;
}
declare class Derived extends Base {
    a: number;
    f(): number;
}
//# sourceMappingURL=optionalMethods.d.ts.map