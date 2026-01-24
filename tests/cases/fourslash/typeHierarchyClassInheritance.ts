/// <reference path="fourslash.ts" />

// Test type hierarchy for a class with multiple levels of inheritance

// @Filename: /a.ts
////class GrandParent {
////    grandMethod(): void {}
////}
////
////class /**/Parent extends GrandParent {
////    parentMethod(): void {}
////}
////
////class Child1 extends Parent {
////    child1Method(): void {}
////}
////
////class Child2 extends Parent {
////    child2Method(): void {}
////}
////
////class GrandChild extends Child1 {
////    grandChildMethod(): void {}
////}

goTo.marker();
verify.baselineTypeHierarchy();
