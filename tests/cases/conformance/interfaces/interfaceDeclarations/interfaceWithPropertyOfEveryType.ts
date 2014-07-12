class C { foo: string; }
function f1() { }
module M {
    export var y = 1;
}
enum E { A }

interface Foo {
    a: number;
    b: string;
    c: boolean;
    d: any;
    e: void;
    f: number[];
    g: Object;
    h: (x: number) => number;
    i: <T>(x: T) => T;
    j: Foo;
    k: C;
    l: typeof f1;
    m: typeof M;
    n: {};
    o: E;
}

var a: Foo = {
    a: 1,
    b: '',
    c: true,
    d: {},
    e: null ,
    f: [1],
    g: {},
    h: (x: number) => 1,
    i: <T>(x: T) => x,
    j: <Foo>null,
    k: new C(),
    l: f1,
    m: M,
    n: {},
    o: E.A
}