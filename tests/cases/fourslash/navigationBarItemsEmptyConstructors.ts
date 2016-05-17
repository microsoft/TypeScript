/// <reference path="fourslash.ts"/>

////class Test {
////    constructor() {
////    }
////}

verify.navigationBarContains("Test", "class");
verify.navigationBarContains("constructor", "constructor");

// no other items
verify.navigationBarCount(2);