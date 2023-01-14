// @noUnnecessaryTypeAssertions: true
// @strict: true
// @lib: es6
const a = {};
let b: {};
b = a as {};
interface Foo {
    x?: string;
}
const foo1: Foo = { x: "ok" } as Foo; // cast technically erases type information, not a no-op
const foo2: Foo = foo1 as Foo;
class A {
    item: any;
}
class B {
    item: any;
}
const aCls = new A();
const bCls = new B();
const aCls2: A = bCls as A;
const bCls2: B = aCls as A;
function foo(x: number): number {
    return x!;
}
const a1 = 2;
a1?.toString!.call(2);
function testRequired() {
    let resolve: (value: unknown) => void
    new Promise(resolve0 => {
        resolve = resolve0
    })
    return resolve! // this non-null assertion is required, removing it causes compiler to hard fail
}
let x: unknown;
x! = 2;
x! = undefined;
let y: number;
y! = 2;

function generic<T extends object | null, U extends object>(x: T, y: U) {
    const a: object = x!;
    const b: object = y!;
}
