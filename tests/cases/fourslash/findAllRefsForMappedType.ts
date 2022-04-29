/// <reference path='fourslash.ts'/>

////interface T { /*1*/a: number };
////type U = { [K in keyof T]: string };
////type V = { [K in keyof U]: boolean };
////const u: U = { a: "" }
////const v: V = { a: true }

verify.baselineFindAllReferences('1')
