/// <reference path='fourslash.ts'/>

// Test type hierarchy edge cases

// @Filename: /edgeCases.ts
////// Isolated class with no hierarchy
////class /*isolated*/IsolatedClass {
////    value: number = 0;
////}
////
////// Isolated interface with no hierarchy
////interface /*isolatedInterface*/IsolatedInterface {
////    value: string;
////}
////
////// Empty interface
////interface /*emptyInterface*/EmptyInterface {}
////
////// Interface extending empty interface
////interface /*extendsEmpty*/ExtendsEmpty extends EmptyInterface {
////    something: string;
////}
////
////// Class expression (anonymous class)
////const /*classExpr*/ClassExpression = class {
////    method(): void {}
////};
////
////// Named class expression
////const /*namedClassExpr*/NamedClassExpression = class MyClass {
////    method(): void {}
////};
////
////// Class expression extending a class
////class BaseForExpr {
////    base(): void {}
////}
////
////const /*derivedExpr*/DerivedExpression = class extends BaseForExpr {
////    derived(): void {}
////};
////
////// Self-referential interface (for linked list, tree, etc.)
////interface /*treeNode*/TreeNode<T> {
////    value: T;
////    children: TreeNode<T>[];
////    parent?: TreeNode<T>;
////}
////
////// Mutually recursive types
////interface /*nodeA*/NodeA {
////    value: string;
////    next?: NodeB;
////}
////
////interface NodeB {
////    value: number;
////    next?: NodeA;
////}
////
////// Interface extending itself via intermediate
////interface ChainA {
////    a: string;
////}
////
////interface ChainB extends ChainA {
////    b: string;
////}
////
////interface /*chainC*/ChainC extends ChainB {
////    c: string;
////}
////
////// Deeply nested inheritance
////class Level1 {}
////class Level2 extends Level1 {}
////class Level3 extends Level2 {}
////class Level4 extends Level3 {}
////class /*level5*/Level5 extends Level4 {}
////
////// Multiple inheritance paths to same base
////interface /*shared*/SharedBase {
////    shared: string;
////}
////
////interface PathA extends SharedBase {
////    pathA: string;
////}
////
////interface PathB extends SharedBase {
////    pathB: string;
////}
////
////interface /*diamond*/DiamondBottom extends PathA, PathB {
////    bottom: string;
////}
////
////// Type alias to itself (recursive)
////type /*jsonValue*/JsonValue = 
////    | string 
////    | number 
////    | boolean 
////    | null 
////    | JsonValue[] 
////    | { [key: string]: JsonValue };
////
////// Recursive type with object
////type /*nested*/NestedObject = {
////    value: string;
////    nested?: NestedObject;
////}

// Test 1: Isolated class
goTo.marker("isolated");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Isolated interface
goTo.marker("isolatedInterface");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Empty interface
goTo.marker("emptyInterface");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Extends empty interface
goTo.marker("extendsEmpty");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Class expression
goTo.marker("classExpr");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Named class expression
goTo.marker("namedClassExpr");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Derived class expression
goTo.marker("derivedExpr");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Self-referential generic interface
goTo.marker("treeNode");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Mutually recursive interfaces
goTo.marker("nodeA");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Chain of inheritance
goTo.marker("chainC");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: Deep inheritance
goTo.marker("level5");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 12: Diamond inheritance pattern
goTo.marker("shared");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 13: Diamond bottom
goTo.marker("diamond");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 14: Recursive JSON-like type
goTo.marker("jsonValue");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
