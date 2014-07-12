//// [moduleNoEmit.ts]
module Foo {
	1+1;
}

//// [moduleNoEmit.js]
var Foo;
(function (Foo) {
    1 + 1;
})(Foo || (Foo = {}));
