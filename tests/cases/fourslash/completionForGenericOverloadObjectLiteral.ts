/// <reference path="fourslash.ts" />

// @Filename: /test.ts
////declare function task<T>(make: () => T): void
////declare function task<T>(arg: {make: () => T}): void
////
////task({
////    /*1*/
////});
////
////declare function task2<T>(arg: {make: () => T}): void
////declare function task2<T>(make: () => T): void
////
////task2({
////    /*2*/
////});
////
////declare function task3(make: () => void): void
////declare function task3(arg: {make: () => void}): void
////
////task3({
////    /*3*/
////});
////
////// More rigorous test with multiple properties and multiple type parameters
////declare function process<T, U>(fn: (x: T) => U): void
////declare function process<T, U>(opts: {transform: (x: T) => U, validate?: (x: T) => boolean}): void
////
////process({
////    /*4*/
////});

// Test 1: Generic overload with function parameter first should show object properties, not function properties
verify.completions({
    marker: "1",
    includes: { name: "make", kind: "property", kindModifiers: "declare" },
    excludes: ["bind", "call", "apply"],
    isNewIdentifierLocation: false
});

// Test 2: Generic overload with object parameter first should show object properties (control test)
verify.completions({
    marker: "2",
    includes: { name: "make", kind: "property", kindModifiers: "declare" },
    excludes: ["bind", "call", "apply"],
    isNewIdentifierLocation: false
});

// Test 3: Non-generic overload should show object properties regardless of order (control test)
verify.completions({
    marker: "3",
    includes: { name: "make", kind: "property", kindModifiers: "declare" },
    excludes: ["bind", "call", "apply"],
    isNewIdentifierLocation: false
});

// Test 4: Multiple type parameters with multiple properties (rigorous test)
verify.completions({
    marker: "4",
    includes: [
        { name: "transform", kind: "property", kindModifiers: "declare", sortText: completion.SortText.LocationPriority },
        { name: "validate", kind: "property", kindModifiers: "declare,optional", sortText: completion.SortText.OptionalMember }
    ],
    excludes: ["bind", "call", "apply"],
    isNewIdentifierLocation: false
});
