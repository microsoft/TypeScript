/// <reference path='fourslash.ts'/>

// Test type hierarchy for class expressions assigned to variables

// @Filename: /classExpressions.ts
////// Anonymous class expression assigned to const
////const /*anonymousClass*/AnonymousClass = class {
////    method(): void {}
////};
////
////// Named class expression assigned to const
////const VarWithNamedClass = class /*namedClass*/MyNamedClass {
////    method(): void {}
////};
////
////// Click on variable name should resolve to named class
////const /*varForNamedClass*/VarForNamedClass = class InnerClass {
////    value: number = 0;
////};
////
////// Anonymous class extending another class
////class BaseClass {
////    base(): void {}
////}
////
////const /*derivedAnonymous*/DerivedAnonymous = class extends BaseClass {
////    derived(): void {}
////};
////
////// Named class extending another class
////const /*derivedNamed*/DerivedNamedVar = class DerivedNamed extends BaseClass {
////    derived(): void {}
////};
////
////// Anonymous class implementing interface
////interface IFace {
////    doSomething(): void;
////}
////
////const /*implementer*/ImplementingClass = class implements IFace {
////    doSomething(): void {}
////};
////
////// Deep inheritance with class expressions
////const /*level1*/Level1 = class {
////    level1(): void {}
////};
////
////// Named class expression with generic
////const /*generic*/GenericClass = class MyGeneric<T> {
////    value: T | undefined;
////};
////
////// Class expression assigned to non-const (should not work)
////let /*nonConstClass*/NonConstClass = class {
////    method(): void {}
////};

// Test 1: Anonymous class expression - should use variable name
goTo.marker("anonymousClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Named class expression - cursor on class name
goTo.marker("namedClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Named class expression - cursor on variable name
goTo.marker("varForNamedClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Anonymous class extending base class
goTo.marker("derivedAnonymous");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Named class extending base class (cursor on variable)
goTo.marker("derivedNamed");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Anonymous class implementing interface
goTo.marker("implementer");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Simple anonymous class
goTo.marker("level1");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Generic named class expression
goTo.marker("generic");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Non-const class expression - should NOT work (TypeScript doesn't guarantee constness)
goTo.marker("nonConstClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
