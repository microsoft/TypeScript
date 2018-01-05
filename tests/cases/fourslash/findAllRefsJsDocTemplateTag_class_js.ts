/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: /a.js

// TODO: https://github.com/Microsoft/TypeScript/issues/16411
// Both uses of T should be referenced.

/////** @template [|{| "isWriteAccess": true, "isDefinition": true |}T|] */
////class C {
////    constructor() {
////        /** @type {T} */
////        this.x = null;
////    }
////}

verify.singleReferenceGroup("(type parameter) T in C");
