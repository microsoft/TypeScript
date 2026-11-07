//// [tests/cases/compiler/circularIndexedPropertyInstantiation.ts] ////

//// [circularIndexedPropertyInstantiation.ts]
// Repro from #14837

type Foo<T extends "true", B> = { "true": Foo<T, Foo<T, B>> }[T];
let f1: Foo<"true", {}>;
let f2: Foo<"false", {}>;

//// [circularIndexedPropertyInstantiation.js]
"use strict";
// Repro from #14837
let f1;
let f2;
