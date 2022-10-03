var I: { a: string};

interface I {
    I: number;
    foo: typeof I;
}

var k: I;
var j: typeof k.foo = { a: "hello" };