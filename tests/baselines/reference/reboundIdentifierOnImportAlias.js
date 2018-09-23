//// [reboundIdentifierOnImportAlias.ts]
module Foo {
    export var x = "hello";
}
module Bar {
    var Foo = 1;
    import F = Foo;
}

//// [reboundIdentifierOnImportAlias.js]
var Foo = Foo || (Foo = {});
(function (Foo) {
    Foo.x = "hello";
})(Foo);
var Bar = Bar || (Bar = {});
(function (Bar) {
    var Foo = 1;
})(Bar);
