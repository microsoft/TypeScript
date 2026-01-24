/// <reference path="fourslash.ts" />

// Test type hierarchy for an interface with multiple implementers

// @Filename: /a.ts
////interface /**/Animal {
////    speak(): void;
////}
////
////class Dog implements Animal {
////    speak(): void { console.log("bark"); }
////}
////
////class Cat implements Animal {
////    speak(): void { console.log("meow"); }
////}
////
////class Bird implements Animal {
////    speak(): void { console.log("tweet"); }
////}

goTo.marker();
verify.baselineTypeHierarchy();
