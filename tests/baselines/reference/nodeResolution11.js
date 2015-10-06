//// [tests/cases/compiler/nodeResolution11.ts] ////

//// [ref.d.ts]

interface Foo {
	staticMember: string;
}

declare module "internal" {
	export var foo: number;
}

//// [index.d.ts]
/// <reference path="ref.d.ts"/>
export var dummy: Foo;
export var dummyMember: typeof dummy.staticMember;
export var dummyMember2: typeof dummy.otherMember; // global foo merged in, should be here
export * from "internal";

//// [ref.d.ts]
interface Foo {
	otherMember: number;
}

//// [b.ts]
/// <reference path="ref.d.ts"/>
import y = require("a");

let foo: number = y.foo;
let bigFoo = y.dummy;
let n = bigFoo.otherMember; // global foo merged into package Foo, should be here

let foo2: Foo;
let t: number = foo2.otherMember;
let e: string = foo2.staticMember; // should error, is global Foo


//// [b.js]
/// <reference path="ref.d.ts"/>
var y = require("a");
var foo = y.foo;
var bigFoo = y.dummy;
var n = bigFoo.otherMember; // global foo merged into package Foo, should be here
var foo2;
var t = foo2.otherMember;
var e = foo2.staticMember; // should error, is global Foo
