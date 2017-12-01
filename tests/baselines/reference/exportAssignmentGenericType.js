//// [tests/cases/conformance/externalModules/exportAssignmentGenericType.ts] ////

//// [foo_0.ts]
class Foo<T>{
	test: T;
}
export = Foo;

//// [foo_1.ts]
import foo = require("./foo_0");
var x = new foo<number>();
var y:number = x.test;


//// [foo_0.js]
"use strict";
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
module.exports = Foo;
//// [foo_1.js]
"use strict";
exports.__esModule = true;
var foo = require("./foo_0");
var x = new foo();
var y = x.test;
