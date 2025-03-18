//// [tests/cases/conformance/externalModules/exportAssignmentConstrainedGenericType.ts] ////

//// [foo_0.ts]
class Foo<T extends {a: string; b:number;}>{
	test: T;
	constructor(x: T){}
}

export = Foo;

//// [foo_1.ts]
import foo = require("./foo_0");
var x = new foo(true); // Should error
var y = new foo({a: "test", b: 42}); // Should be OK
var z: number = y.test.b;

//// [foo_0.js]
"use strict";
class Foo {
    test;
    constructor(x) { }
}
module.exports = Foo;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("./foo_0");
var x = new foo(true);
var y = new foo({ a: "test", b: 42 });
var z = y.test.b;
