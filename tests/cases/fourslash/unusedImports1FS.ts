/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
////   [|import { Calculator } from "./file1" |]

// @Filename: file1.ts
////    export class Calculator {
////
////    }

verify.rangeAfterCodeFix('');
