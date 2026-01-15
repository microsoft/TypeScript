interface Foo { a }
interface Bar { b }

interface Object {
    [n: number]: Foo;
}

interface Function {
    [n: number]: Bar;
}

var o = {};
var f = () => { };

var v1: {
    [n: number]: Foo
} = o; // Should be allowed

var v2: {
    [n: number]: Bar
} = f; // Should be allowed