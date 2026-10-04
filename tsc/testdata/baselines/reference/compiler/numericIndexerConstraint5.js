//// [tests/cases/compiler/numericIndexerConstraint5.ts] ////

//// [numericIndexerConstraint5.ts]
var x = { name: "x", 0: new Date() };
var z: { [name: number]: string } = x;

//// [numericIndexerConstraint5.js]
"use strict";
var x = { name: "x", 0: new Date() };
var z = x;
