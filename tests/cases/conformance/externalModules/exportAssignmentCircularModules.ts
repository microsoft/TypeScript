// @module: amd
// @Filename: foo_0.ts
import foo1 = require('./foo_1');
module Foo {
	export var x = foo1.x;
}
export = Foo;

// @Filename: foo_1.ts
import foo2 = require("./foo_2");
module Foo {
	export var x = foo2.x;
}
export = Foo;

// @Filename: foo_2.ts
import foo0 = require("./foo_0");
module Foo {
	export var x = foo0.x;
}
export = Foo;
