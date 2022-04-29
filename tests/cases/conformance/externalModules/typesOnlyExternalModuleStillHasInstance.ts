// @module: commonjs
// @Filename: foo_0.ts
export interface Person {
	name: string;
	age: number;
}

export module M2 {
	export interface I2 {
		x: Person;
	}
}

// @Filename: foo_1.ts
import foo0 = require('./foo_0');
// Per 11.2.3, foo_0 should still be "instantiated", albeit with no members

var x: typeof foo0 = {};
var y: {M2: Object} = foo0;
