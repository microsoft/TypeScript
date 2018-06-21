/// <reference path='fourslash.ts' />

////class A {
/////*a*/    /*b*/p = 0;
////}

goTo.select("a", "b");
verify.refactorsAvailable([]);
