//// [tests/cases/conformance/externalModules/exportAssignmentTopLevelIdentifier.ts] ////

//// [foo_0.ts]
module Foo {
	export var answer = 42;
}
export = Foo;

//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.answer === 42){

}


//// [foo_0.js]
"use strict";
var Foo;
(function (Foo) {
    Foo.answer = 42;
})(Foo || (Foo = {}));
module.exports = Foo;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("./foo_0");
if (foo.answer === 42) {
}
