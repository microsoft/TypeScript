//// [tests/cases/compiler/typeCheckTypeArgument.ts] ////

//// [typeCheckTypeArgument.ts]
var f: <T extends UNKNOWN>() => void;

interface IFoo<T extends UNKNOWN> { }

class Foo<T extends UNKNOWN> { }

function bar<T extends UNKNOWN>() { }

class Foo2 {
    method<T extends UNKNOWN>() { }
}

(<T extends UNKNOWN>(a) => { });

//// [typeCheckTypeArgument.js]
var f;
class Foo {
}
function bar() { }
class Foo2 {
    method() { }
}
((a) => { });
