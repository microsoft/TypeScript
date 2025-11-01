/// <reference path='fourslash.ts'/>

// @strict: true

// @Filename: /test.ts
////type Scalars = {
////  Number: number;
////};
////
////type Maybe<T> = T | null;
////
////type TypeA = {
////  a: Scalars["Number"] | null;
////  b: Maybe<number>;
////  c: Scalars["Number"] | null;
////};
////
////type TypeB = {
////  a: Scalars["Number"] | null;
////  b: number | null;
////  c: Scalars["Number"] | null;
////};
////
////const testA: Type/*typeA*/A = null!;
////const testB: Type/*typeB*/B = null!;

// Both types should show fully resolved types (number | null) for all fields
goTo.marker("typeA");
verify.quickInfoIs(`type TypeA = {
    a: number | null;
    b: number | null;
    c: number | null;
}`);

goTo.marker("typeB");
verify.quickInfoIs(`type TypeB = {
    a: number | null;
    b: number | null;
    c: number | null;
}`);
