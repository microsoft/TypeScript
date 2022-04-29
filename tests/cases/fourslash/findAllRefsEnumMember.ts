/// <reference path="fourslash.ts"/>

////enum E { /*1*/A, B }
////const e: E./*2*/A = E./*3*/A;

verify.baselineFindAllReferences('1', '2', '3');
