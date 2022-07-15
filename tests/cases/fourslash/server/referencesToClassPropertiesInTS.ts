/// <reference path="../fourslash.ts"/>

////class Foo {
////  constructor() {
////    this.bar = false;
////    this./*1*/bar = true;
////  }
////
////  get bar() {
////    return true;
////  }
////
////  set bar(value) {
////    // Do something with value
////  }
////}
////
////const items: Foo[] = [];
////
////for (const item of items) {
////  item.bar = true;
////}

verify.baselineFindAllReferences('1')