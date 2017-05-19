/// <reference path="fourslash.ts" />

// @Filename: file1.ts
/////*1*/class Greeter {
////    public hello(name: string) { }
////}
////var x = new Greeter();
// @Filename: file2.ts
/////*2*/class MyGreeter {
////    public hello(name: string) { }
////}
////class MyOtherGreeter {
////    public hello(name: string) { }
////}

verify.navigationItemsListCount(3, "hello");
verify.navigationItemsListCount(1, "hello", undefined, test.marker("1").fileName);
verify.navigationItemsListContains("hello", "method", "hello", "exact", test.marker("1").fileName);
verify.navigationItemsListCount(2, "hello", undefined, test.marker("2").fileName);
