// @module: amd
// @Filename: foo_0.ts
export class C1 {
	m1 = 42;
	static s1 = true;
}

export interface I1 {
	name: string;
	age: number;
}

export module M1 {
	export interface I2 {
		foo: string;
	}
}

export enum E1 {
	A,B,C
}

// @Filename: foo_1.ts
import foo = require("./foo_0");
// None of the below should cause a runtime dependency on foo_0
import f = foo.M1;
var i: f.I2;
var x: foo.C1 = <{m1: number}>{};
var y: typeof foo.C1.s1 = false;
var z: foo.M1.I2;
var e: number = <foo.E1>0;