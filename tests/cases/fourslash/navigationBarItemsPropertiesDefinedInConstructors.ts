/// <reference path="fourslash.ts"/>

////class List<T> {
////    constructor(public a: boolean, public b: T, c: number) {
////        var local = 0;
////    }
////}

verify.navigationBarContains("List", "class");
verify.navigationBarContains("constructor", "constructor");
verify.navigationBarContains("a", "property");
verify.navigationBarContains("b", "property");

// no other items
verify.navigationBarCount(4);