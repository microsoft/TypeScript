//// [tests/cases/compiler/reboundIdentifierOnImportAlias.ts] ////

//// [reboundIdentifierOnImportAlias.ts]
namespace Foo {
    export var x = "hello";
}
namespace Bar {
    var Foo = 1;
    import F = Foo;
}

//// [reboundIdentifierOnImportAlias.js]
var Foo;
(function (Foo) {
    Foo.x = "hello";
})(Foo || (Foo = {}));
var Bar;
(function (Bar) {
    var Foo = 1;
})(Bar || (Bar = {}));
