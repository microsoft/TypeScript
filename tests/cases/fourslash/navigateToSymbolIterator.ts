/// <reference path="fourslash.ts" />

////class C {
////    [Symbol.iterator]() {}
////}

verify.navigationItemsListContains("iterator", "method", "iterator", "exact", undefined, "C");
