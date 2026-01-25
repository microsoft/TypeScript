/// <reference path='fourslash.ts'/>

// Test cases where types should NOT appear as subtypes

// @Filename: /negativeCases.ts
//// // Base types
//// interface /*animal*/Animal {
////     name: string;
//// }
//// 
//// interface Dog extends Animal {
////     bark(): void;
//// }
//// 
//// interface Cat extends Animal {
////     meow(): void;
//// }
//// 
//// // NEGATIVE CASE 1: Union types are NOT subtypes
//// // type Pet = Dog | Cat means Pet is a SUPERTYPE of Dog and Cat
//// // (every Dog is a Pet, but not every Pet is a Dog)
//// type Pet = Dog | Cat;
//// 
//// // NEGATIVE CASE 2: keyof T is NOT a subtype of T
//// type AnimalKeys = keyof Animal;
//// 
//// // NEGATIVE CASE 3: Indexed access types are NOT subtypes
//// type AnimalName = Animal['name'];
//// 
//// // POSITIVE CASE: Intersection types ARE subtypes
//// type AnimalWithId = Animal & { id: number };

// Test Animal - should show Dog, Cat, AnimalWithId as subtypes
// but NOT Pet (union type is a supertype), AnimalKeys (keyof), AnimalName (indexed access)
goTo.marker("animal");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
