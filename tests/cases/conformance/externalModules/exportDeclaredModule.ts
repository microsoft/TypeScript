// @Filename: foo1.ts

declare module M1 {
	export var a: string; 
	export function b(): number;
}
export = M1;

// @Filename: foo2.ts
import foo1 = require('./foo1');
var x: number = foo1.b();