/// <reference path='fourslash.ts'/>

// Test type hierarchy with intersection types

// @Filename: /intersections.ts
////interface /*printable*/Printable {
////    print(): void;
////}
////
////interface Loggable {
////    log(): void;
////}
////
////interface Serializable {
////    toJSON(): string;
////}
////
////// Simple intersection
////type /*printableLoggable*/PrintableLoggable = Printable & Loggable;
////
////// Intersection with three types
////type /*fullEntity*/FullEntity = Printable & Loggable & Serializable;
////
////// Class implementing intersection-like pattern
////class /*printer*/Printer implements Printable, Loggable {
////    print(): void {}
////    log(): void {}
////}
////
////// Intersection with interfaces
////interface Base {
////    id: string;
////}
////
////interface Timestamped {
////    createdAt: Date;
////}
////
////interface Metadata {
////    tags: string[];
////}
////
////type /*record*/Record = Base & Timestamped & Metadata;
////
////// Nested intersection
////type PartialRecord = Base & Timestamped;
////type /*extendedRecord*/ExtendedRecord = PartialRecord & Metadata;
////
////// Intersection with type parameter
////type /*withId*/WithId<T> = T & { id: string };
////
////interface Person {
////    name: string;
////}
////
////type /*identifiedPerson*/IdentifiedPerson = WithId<Person>;
////
////// Intersection of union types
////type A = string | number;
////type B = number | boolean;
////type /*intersection*/IntersectionOfUnions = A & B; // This should be `number`

// Test 1: Simple two-type intersection
goTo.marker("printableLoggable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Three-type intersection
goTo.marker("fullEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Class implementing multiple interfaces
goTo.marker("printer");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Record intersection
goTo.marker("record");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Nested intersection
goTo.marker("extendedRecord");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Generic intersection
goTo.marker("withId");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Applied generic intersection
goTo.marker("identifiedPerson");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Interface should show intersection types as subtypes
goTo.marker("printable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
