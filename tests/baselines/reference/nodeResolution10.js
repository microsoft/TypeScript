//// [tests/cases/compiler/nodeResolution10.ts] ////

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
export var dummyMember2: typeof dummy.otherMember; // should error
export * from "internal";

//// [b.ts]
import y = require("a");

interface Foo {
	otherMember: number;
}

let foo: number = y.foo;
let bigFoo = y.dummy;
let n = bigFoo.otherMember; // should error

let foo2: Foo;
let t: number = foo2.otherMember;
let e: string = foo2.staticMember; // should error


//// [b.js]
"use strict";
var y = require("a");
var foo = y.foo;
var bigFoo = y.dummy;
var n = bigFoo.otherMember; // should error
var foo2;
var t = foo2.otherMember;
var e = foo2.staticMember; // should error
