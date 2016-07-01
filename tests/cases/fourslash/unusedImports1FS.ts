/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
////    import {/*0*/Calculator/*1*/} from "./file1"

// @Filename: file1.ts
////    export class Calculator {
////
////    }

verify.codeFixAtPosition(`
import {} from "./file1"
`);
