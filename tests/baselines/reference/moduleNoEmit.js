//// [tests/cases/compiler/moduleNoEmit.ts] ////

//// [moduleNoEmit.ts]
namespace Foo {
	1+1;
}

//// [moduleNoEmit.js]
"use strict";
var Foo;
(function (Foo) {
    1 + 1;
})(Foo || (Foo = {}));
