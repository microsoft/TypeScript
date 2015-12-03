// @module: commonjs
// @moduleResolution: node

// @filename: node_modules/a/ref.d.ts
interface Foo {
	staticMember: string;
}

declare module "internal" {
	export var foo: number;
}

// @filename: node_modules/a/index.d.ts
/// <reference path="ref.d.ts"/>
export var dummy: Foo;
export var dummyMember: typeof dummy.staticMember;
export var dummyMember2: typeof dummy.otherMember; // global foo merged in, should be here
export * from "internal";

// @filename: ref.d.ts
interface Foo {
	otherMember: number;
}

// @filename: b.ts
/// <reference path="ref.d.ts"/>
import y = require("a");

let foo: number = y.foo;
let bigFoo = y.dummy;
let n = bigFoo.otherMember; // global foo merged into package Foo, should be here

let foo2: Foo;
let t: number = foo2.otherMember;
let e: string = foo2.staticMember; // should error, is global Foo
