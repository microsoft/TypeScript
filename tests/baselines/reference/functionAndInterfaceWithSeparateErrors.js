//// [functionAndInterfaceWithSeparateErrors.ts]
function Foo(s: string);
function Foo(n: number) { }

interface Foo {
    [s: string]: string;
    prop: number;
}

//// [functionAndInterfaceWithSeparateErrors.js]
function Foo(n) { }
