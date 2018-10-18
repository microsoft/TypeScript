//// [sourceMap-StringLiteralWithNewLine.ts]
interface Document {
}
interface Window {
    document: Document;
}
declare var window: Window;

module Foo {
    var x = "test1";
    var y = "test 2\
isn't this a lot of fun";
    var z = window.document;
}

//// [sourceMap-StringLiteralWithNewLine.js]
var Foo;
(function (Foo) {
    var x = "test1";
    var y = "test 2\
isn't this a lot of fun";
    var z = window.document;
})(Foo || (Foo = {}));
//# sourceMappingURL=sourceMap-StringLiteralWithNewLine.js.map