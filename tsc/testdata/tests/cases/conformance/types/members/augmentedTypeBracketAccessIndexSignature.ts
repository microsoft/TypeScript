// @target: es2015
// @strict: false
interface Foo { a }
interface Bar { b }

interface Object {
    [n: number]: Foo;
}

interface Function {
    [n: number]: Bar;
}

var a = {}[0]; // Should be Foo
var b = (() => { })[0]; // Should be Bar