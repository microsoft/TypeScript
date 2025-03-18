//// [tests/cases/conformance/externalModules/exportAssignmentTopLevelClodule.ts] ////

//// [foo_0.ts]
class Foo {
	test = "test";
}
module Foo {
	export var answer = 42;
}
export = Foo;

//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.answer === 42){
	var x = new foo();
}


//// [foo_0.js]
"use strict";
class Foo {
    test = "test";
}
(function (Foo) {
    Foo.answer = 42;
})(Foo || (Foo = {}));
module.exports = Foo;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("./foo_0");
if (foo.answer === 42) {
    var x = new foo();
}
