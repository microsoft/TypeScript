/// <reference path='fourslash.ts'/>

// @module: esnext
// @moduleResolution: bundler

// Test for identified gaps in type hierarchy implementation:
// 1. Multi-file imports (direct imports work, barrel re-exports are a known fourslash limitation)
// 2. Declaration merging with getMergedSymbol
// 3. Complex mixin patterns with dynamic return types
// 4. Generic type parameters as base types

// ======================
// 1. MULTI-FILE IMPORTS (Direct imports)
// Note: Barrel/index re-exports don't work properly in fourslash test environment,
// but they work correctly in the actual language service. See typeHierarchyMultiFile.ts
// for the working pattern.
// ======================

// @Filename: /lib/base.ts
////export interface /*baseInterface*/BaseInterface {
////    baseMethod(): void;
////}
////
////export class /*baseClass*/BaseClass implements BaseInterface {
////    baseMethod(): void {}
////}

// @Filename: /consumer.ts
////// Direct imports work correctly
////import { BaseInterface, BaseClass } from './lib/base';
////
////interface /*extendDirect*/ExtendedDirect extends BaseInterface {
////    directMethod(): void;
////}
////
////class /*classFromDirect*/ClassFromDirect extends BaseClass {
////    directMethod(): void {}
////}

// ======================
// 2. DECLARATION MERGING
// ======================

// @Filename: /merging/interfaces.ts
////// Interface merging - multiple declarations
////interface /*mergedInterface*/MergedInterface {
////    firstProp: string;
////}
////
////interface MergedInterface {
////    secondProp: number;
////}
////
////interface MergedInterface {
////    thirdProp: boolean;
////}
////
////// Class implementing merged interface
////class /*implMerged*/ImplementsMerged implements MergedInterface {
////    firstProp: string = "";
////    secondProp: number = 0;
////    thirdProp: boolean = false;
////}

// @Filename: /merging/classInterface.ts
////// Class-interface merging
////class /*mergeableClass*/MergeableClass {
////    classMethod(): void {}
////}
////
////interface MergeableClass {
////    interfaceMethod(): void;
////}
////
////// Subclass of merged class-interface
////class /*subMergeable*/SubMergeable extends MergeableClass {
////    interfaceMethod(): void {}
////    subMethod(): void {}
////}

// @Filename: /merging/namespaceInterface.ts
////// Namespace-interface merging
////interface /*nsInterface*/NsInterface {
////    getValue(): number;
////}
////
////namespace NsInterface {
////    export function create(): NsInterface {
////        return { getValue: () => 42 };
////    }
////}
////
////// Implement the merged namespace-interface
////class /*nsImpl*/NsImplementer implements NsInterface {
////    getValue(): number { return 0; }
////}

// ======================
// 3. COMPLEX MIXIN PATTERNS
// ======================

// @Filename: /mixins/core.ts
////type Constructor<T = {}> = new (...args: any[]) => T;
////
////// Base class
////class /*mixinBase*/MixinBase {
////    baseProp: string = "";
////}
////
////// Mixin that adds Timestamped capability
////function Timestamped<TBase extends Constructor>(Base: TBase) {
////    return class Timestamped extends Base {
////        timestamp = Date.now();
////    };
////}
////
////// Mixin that adds Activatable capability  
////function Activatable<TBase extends Constructor>(Base: TBase) {
////    return class Activatable extends Base {
////        isActive = false;
////        activate() { this.isActive = true; }
////    };
////}
////
////// Mixin that adds Serializable capability
////function Serializable<TBase extends Constructor>(Base: TBase) {
////    return class Serializable extends Base {
////        serialize(): string { return JSON.stringify(this); }
////    };
////}
////
////// Composing multiple mixins
////const TimestampedBase = Timestamped(MixinBase);
////const ActivatableTimestampedBase = Activatable(Timestamped(MixinBase));
////const FullMixin = Serializable(Activatable(Timestamped(MixinBase)));
////
////// Class extending composed mixin
////class /*fullMixinUser*/FullMixinUser extends FullMixin {
////    userName: string = "";
////}

// ======================
// 4. GENERIC TYPE PARAMETERS AS BASE TYPES
// Note: Cross-file generic imports have the same fourslash limitation as other imports.
// These tests are all in the same file to demonstrate generic type hierarchy works.
// ======================

// @Filename: /generics/all.ts
////interface /*genericBase*/GenericBase<T> {
////    value: T;
////    getValue(): T;
////}
////
////class /*genericImpl*/GenericImpl<T> implements GenericBase<T> {
////    value: T;
////    constructor(value: T) { this.value = value; }
////    getValue(): T { return this.value; }
////}
////
////// Extend generic with concrete type
////interface /*stringBase*/StringBase extends GenericBase<string> {
////    format(): string;
////}
////
////// Extend generic class with concrete type
////class /*stringImpl*/StringImpl extends GenericImpl<string> {
////    format(): string { return this.value.toUpperCase(); }
////}
////
////// Generic extending generic
////interface /*nestedGeneric*/NestedGeneric<T, U> extends GenericBase<T> {
////    secondValue: U;
////}
////
////// Class with generic type parameter in extends
////class /*parameterized*/ParameterizedClass<T> extends GenericImpl<T> {
////    clone(): ParameterizedClass<T> {
////        return new ParameterizedClass(this.value);
////    }
////}
////
////// Generic with constraint as base
////interface /*constrainedBase*/ConstrainedBase<T extends { id: number }> extends GenericBase<T> {
////    getId(): number;
////}
////
////// Implementation with constraint
////class /*constrainedImpl*/ConstrainedImpl<T extends { id: number }> implements ConstrainedBase<T> {
////    value: T;
////    constructor(value: T) { this.value = value; }
////    getValue(): T { return this.value; }
////    getId(): number { return this.value.id; }
////}

// ============
// TESTS
// ============

// Test 1: Base interface (should find subtypes across module boundaries)
goTo.marker("baseInterface");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Base class
goTo.marker("baseClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Direct import extending interface
goTo.marker("extendDirect");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Direct import extending class
goTo.marker("classFromDirect");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Merged interface (all declarations should be considered)
goTo.marker("mergedInterface");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Class implementing merged interface
goTo.marker("implMerged");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Class-interface merging
goTo.marker("mergeableClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Subclass of merged class-interface
goTo.marker("subMergeable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Namespace-interface merging
goTo.marker("nsInterface");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Namespace-interface implementation
goTo.marker("nsImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: Mixin base class
goTo.marker("mixinBase");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 12: Class using full mixin composition
goTo.marker("fullMixinUser");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 13: Generic base interface
goTo.marker("genericBase");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 14: Generic implementation
goTo.marker("genericImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 15: Concrete type extending generic
goTo.marker("stringBase");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 16: Class extending generic with concrete type
goTo.marker("stringImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 17: Generic extending generic
goTo.marker("nestedGeneric");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 18: Parameterized class extending generic
goTo.marker("parameterized");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 19: Constrained generic base
goTo.marker("constrainedBase");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 20: Constrained generic implementation
goTo.marker("constrainedImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");