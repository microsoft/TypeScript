/// <reference path='fourslash.ts' />

//// export declare const despite: { the: any };
////
//// [|despite.the|]

verify.rangeAfterCodeFix(`despite.the`);
