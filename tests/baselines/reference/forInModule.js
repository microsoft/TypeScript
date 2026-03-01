//// [tests/cases/compiler/forInModule.ts] ////

//// [forInModule.ts]
namespace Foo {
	for (var i = 0; i < 1; i++) {
		i+i;
	}
}

//// [forInModule.js]
"use strict";
var Foo;
(function (Foo) {
    for (var i = 0; i < 1; i++) {
        i + i;
    }
})(Foo || (Foo = {}));
