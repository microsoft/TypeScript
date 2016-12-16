/// <reference path="fourslash.ts" />

// @Filename: file1.ts
/////*1*/(function () {
////    "use strict";
////    function onResume() {
////    };
////} )();
// @Filename: file2.ts
/////*2*/class EventManager {
////    public onResume(name: string) { }
////}
////class MyOtherEventManager {
////    public onResume(name: string) { }
////}
verify.navigationItemsListCount(3, "onResume");
verify.navigationItemsListCount(1, "onResume", undefined, test.marker("1").fileName);
verify.navigationItemsListContains("onResume", "function", "onResume", "exact", test.marker("1").fileName);
verify.navigationItemsListCount(2, "onResume", undefined, test.marker("2").fileName);
