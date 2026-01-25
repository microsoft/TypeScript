/// <reference path='fourslash.ts'/>

// Test type hierarchy with conditional types

// @Filename: /conditionalTypes.ts
////interface Animal {
////    name: string;
////}
////
////interface Dog extends Animal {
////    bark(): void;
////}
////
////interface Cat extends Animal {
////    meow(): void;
////}
////
////interface Fish extends Animal {
////    swim(): void;
////}
////
////// Basic conditional type
////type /*isDog*/IsDog<T> = T extends Dog ? true : false;
////
////// Conditional type with different results
////type /*animalSound*/AnimalSound<T> = T extends Dog ? "bark" : T extends Cat ? "meow" : "unknown";
////
////// Extract utility type pattern
////type /*extractDog*/ExtractDog<T> = T extends Dog ? T : never;
////
////// Exclude utility type pattern  
////type /*excludeDog*/ExcludeDog<T> = T extends Dog ? never : T;
////
////// Inferring in conditional types
////type /*returnType*/ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;
////
////// Conditional type with union
////type /*pets*/Pets = Dog | Cat;
////type /*walkingPets*/WalkingPets = ExtractDog<Pets>; // Should be Dog
////
////// Distributed conditional type
////type /*anyAnimal*/AllAnimals = Dog | Cat | Fish;
////type /*excludeFish*/NonFish = ExcludeDog<AllAnimals>; // Should be Cat | Fish (exclude Dog)
////
////// Nested conditional
////type /*nested*/NestedConditional<T> = T extends Animal 
////    ? T extends Dog 
////        ? "dog" 
////        : "other-animal"
////    : "not-animal";
////
////// Conditional with mapped type result
////type /*keys*/PropertyKeys<T> = T extends { [key: string]: any } ? keyof T : never;
////
////interface Person {
////    name: string;
////    age: number;
////}
////
////type /*personKeys*/PersonKeys = PropertyKeys<Person>; // Should be "name" | "age"

// Test 1: Basic conditional type
goTo.marker("isDog");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Conditional with multiple branches
goTo.marker("animalSound");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Extract pattern
goTo.marker("extractDog");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Conditional with infer
goTo.marker("returnType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Applied conditional on union
goTo.marker("walkingPets");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Distributed conditional
goTo.marker("excludeFish");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Nested conditional
goTo.marker("nested");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
