//// [tests/cases/compiler/enumNamespaceConstant.ts] ////

//// [enumNamespaceConstant.ts]
enum Foo {
  bar
}
namespace Foo {
  export const baz = Foo.bar;
}


//// [enumNamespaceConstant.js]
var Foo;
(function (Foo) {
    Foo[Foo["bar"] = 0] = "bar";
})(Foo || (Foo = {}));
(function (Foo) {
    Foo.baz = Foo.bar;
})(Foo || (Foo = {}));
