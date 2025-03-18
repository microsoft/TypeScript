//// [tests/cases/conformance/externalModules/exportAssignmentTopLevelFundule.ts] ////

//// [foo_0.ts]
function foo() {
	return "test";
}
module foo {
	export var answer = 42;
}
export = foo;

//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.answer === 42){
	var x = foo();
}


//// [foo_0.js]
"use strict";
function foo() {
    return "test";
}
(function (foo) {
    foo.answer = 42;
})(foo || (foo = {}));
module.exports = foo;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("./foo_0");
if (foo.answer === 42) {
    var x = foo();
}
