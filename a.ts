interface Foo {
    x;
}
interface Bar { }

function foo(p: Foo) { }
var bar: Bar;

foo(bar);
foo(bar);