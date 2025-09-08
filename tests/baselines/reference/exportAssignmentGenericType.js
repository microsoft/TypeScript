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
class Foo {
    test;
}
module.exports = Foo;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("./foo_0");
var x = new foo();
var y = x.test;
