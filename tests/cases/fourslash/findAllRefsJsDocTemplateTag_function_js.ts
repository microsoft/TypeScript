/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: /a.js

/////**
//// * @template [|{| "isWriteAccess": true, "isDefinition": true |}T|]
//// * @return {[|T|]}
//// */
////function f() {}

verify.singleReferenceGroup("(type parameter) T"); // TODO:GH#??? should be "(type parameter) T in f<T>(): void"
