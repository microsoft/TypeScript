/// <reference path='fourslash.ts'/>

// Test type hierarchy with type aliases, union types, and interface implementations

// @Filename: /typeAliasHierarchy.ts
////interface Animal {
////    name: string;
////}
////
////interface /*dog*/Dog extends Animal {
////    bark(): void;
////}
////
////interface Cat extends Animal {
////    meow(): void;
////}
////
////type /*pet*/Pet = Dog | Cat;
////
////type DogOrString = Dog | string;
////
////class /*labrador*/Labrador implements Dog {
////    name: string = "";
////    bark() {}
////}
////
////class Poodle implements Dog {
////    name: string = "";
////    bark() {}
////}

// Test 1: Union type shows both members as supertypes
goTo.marker("pet");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Interface shows implementing classes as subtypes
goTo.marker("dog");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Implementing class shows interface as supertype
goTo.marker("labrador");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
