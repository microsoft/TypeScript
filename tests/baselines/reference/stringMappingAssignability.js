//// [tests/cases/compiler/stringMappingAssignability.ts] ////

//// [stringMappingAssignability.ts]
const x: Uppercase<string> = 42;
const y: Uppercase<string> = { foo: "bar" };


//// [stringMappingAssignability.js]
"use strict";
var x = 42;
var y = { foo: "bar" };
