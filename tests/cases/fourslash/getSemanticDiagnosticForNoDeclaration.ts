/// <reference path="fourslash.ts" />

// @module: CommonJS

//// interface privateInterface {}
//// export class Bar implements /*1*/privateInterface/*2*/{ }

verify.noErrors();


