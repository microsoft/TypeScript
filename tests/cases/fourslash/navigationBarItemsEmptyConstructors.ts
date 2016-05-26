/// <reference path="fourslash.ts"/>

////class Test {
////    constructor() {
////    }
////}

verify.navigationBarContains("Test", "class");
verify.navigationBarContains("constructor", "constructor");

// no other items
verify.navigationBarCount(4); // global + 1 child, Test + 1 child