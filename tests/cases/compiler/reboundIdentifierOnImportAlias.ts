module Foo {
    export var x = "hello";
}
module Bar {
    var Foo = 1;
    import F = Foo;
}