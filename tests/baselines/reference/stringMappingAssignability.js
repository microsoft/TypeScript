//// [tests/cases/compiler/stringMappingAssignability.ts] ////

//// [stringMappingAssignability.ts]
const x: Uppercase<string> = 42;
const y: Uppercase<string> = { foo: "bar" };


//// [stringMappingAssignability.js]
"use strict";
const x = 42;
const y = { foo: "bar" };
