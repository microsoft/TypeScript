//// [tests/cases/conformance/externalModules/importNonExternalModule.ts] ////

//// [foo_0.ts]
module foo {
	export var answer = 42;
}

//// [foo_1.ts]
import foo = require("./foo_0");
// Import should fail.  foo_0 not an external module
if(foo.answer === 42){

}


//// [foo_0.js]
var foo;
(function (foo) {
    foo.answer = 42;
})(foo || (foo = {}));
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("./foo_0");
// Import should fail.  foo_0 not an external module
if (foo.answer === 42) {
}
