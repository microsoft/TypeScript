/// <reference path='fourslash.ts'/>

// Tests that the scope of @typedef is not just the node immediately below it.

// @allowJs: true

// @Filename: /a.js
/////** @typedef {number} [|{| "isWriteAccess": true, "isDefinition": true |}T|] */
////
/////**
//// * @return {[|T|]}
//// */
////function f(obj) { return 0; }
////
/////**
//// * @return {[|T|]}
//// */
////function f2(obj) { return 0; }

verify.singleReferenceGroup("type T = number");
