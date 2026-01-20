namespace Foo {
    export var x = "hello";
}
namespace Bar {
    var Foo = 1;
    import F = Foo;
}