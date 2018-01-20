/// <reference path='fourslash.ts' />

//// export declare const despite: { the: any };
////
//// [|dispite.the|]

verify.rangeAfterCodeFix(`despite.the`);
