//// [reboundIdentifierOnImportAlias.ts]
module Foo {
    export var x = "hello";
}
module Bar {
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
