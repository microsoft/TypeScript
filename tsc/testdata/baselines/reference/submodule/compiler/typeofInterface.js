//// [tests/cases/compiler/typeofInterface.ts] ////

//// [typeofInterface.ts]
var I: { a: string};

interface I {
    I: number;
    foo: typeof I;
}

var k: I;
var j: typeof k.foo = { a: "hello" };

//// [typeofInterface.js]
var I;
var k;
var j = { a: "hello" };
