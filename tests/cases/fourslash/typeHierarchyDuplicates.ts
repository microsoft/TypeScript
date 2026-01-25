/// <reference path='fourslash.ts'/>

// Test type hierarchy duplicate detection
// Verify that subtypes are not added multiple times when they reference the same type multiple times

// @Filename: /duplicates.ts
////// Test interface that extends the same generic interface with different type args
////interface /*baseGeneric*/BaseGeneric<T> {
////    value: T;
////}
////
////// This extends BaseGeneric twice with different type arguments
////interface /*multiExtends*/MultiExtends extends BaseGeneric<string>, BaseGeneric<number> {
////    extra: boolean;
////}
////
////// Type alias union with same type
////interface /*unionTarget*/UnionTarget {
////    id: string;
////}
////
////type /*unionType*/UnionWithDuplicates = UnionTarget | UnionTarget | string;
////
////// Test class implementing same interface multiple times indirectly
////interface /*implTarget*/ImplTarget {
////    doIt(): void;
////}
////
////interface ExtendedTarget extends ImplTarget {
////    doMore(): void;
////}
////
////class /*multiImpl*/MultiImplementer implements ImplTarget, ExtendedTarget {
////    doIt(): void {}
////    doMore(): void {}
////}

// Test 1: Check subtypes of BaseGeneric - MultiExtends should appear only once
goTo.marker("baseGeneric");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: MultiExtends supertypes - BaseGeneric should appear twice (once for each type arg)
goTo.marker("multiExtends");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: UnionTarget - subtypes should not include duplicates
goTo.marker("unionTarget");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: UnionWithDuplicates - supertypes should not include duplicates
goTo.marker("unionType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: ImplTarget subtypes - MultiImplementer should appear only once
goTo.marker("implTarget");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: MultiImplementer supertypes
goTo.marker("multiImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
