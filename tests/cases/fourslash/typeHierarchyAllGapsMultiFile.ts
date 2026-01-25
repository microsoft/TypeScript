/// <reference path='fourslash.ts'/>

// @module: esnext
// @moduleResolution: bundler

// =============================================================================
// COMPREHENSIVE MULTI-FILE TEST FOR ALL TYPE HIERARCHY GAPS
// =============================================================================
// This test validates that ALL identified gaps work correctly with multi-file imports:
// - Gap 1: Re-exports and Module Aliases
// - Gap 2: Declaration Merging
// - Gap 3: Generic Type Parameters as Base Types
// - Gap 4: Conditional Types as Subtypes
// - Gap 5: Mixin Patterns
// =============================================================================

// =============================================================================
// GAP 1: RE-EXPORTS AND MODULE ALIASES
// =============================================================================

// @Filename: /reexports/module-a.ts
////export interface /*baseReexport*/BaseReexport {
////    id: string;
////}
////
////export class /*baseClassReexport*/BaseClassReexport implements BaseReexport {
////    id: string = "";
////}

// @Filename: /reexports/module-b.ts
////// Re-export from module-a
////export { BaseReexport, BaseClassReexport } from './module-a';
////
////// Also add a new type that extends the re-exported one
////import { BaseReexport } from './module-a';
////export interface /*extendedReexport*/ExtendedReexport extends BaseReexport {
////    name: string;
////}

// @Filename: /reexports/module-c.ts
////// Import through the re-export chain
////import { BaseReexport, ExtendedReexport } from './module-b';
////
////export interface /*derivedFromReexport*/DerivedFromReexport extends ExtendedReexport {
////    email: string;
////}
////
////export class /*implReexport*/ImplReexport implements BaseReexport {
////    id: string = "";
////}

// @Filename: /reexports/index.ts
////// Barrel re-export
////export * from './module-a';
////export * from './module-b';
////export * from './module-c';

// @Filename: /reexports/consumer.ts
////// Import via barrel
////import { BaseReexport, ExtendedReexport, DerivedFromReexport } from './index';
////
////export interface /*consumerInterface*/ConsumerInterface extends DerivedFromReexport {
////    role: string;
////}
////
////export class /*consumerClass*/ConsumerClass implements BaseReexport {
////    id: string = "";
////}

// =============================================================================
// GAP 2: DECLARATION MERGING
// =============================================================================

// @Filename: /merging/logger-base.ts
////export interface /*loggerBase*/Logger {
////    log(msg: string): void;
////}

// @Filename: /merging/logger-extension.ts
////// Module augmentation - extends the Logger interface
////import { Logger } from './logger-base';
////
////declare module './logger-base' {
////    interface Logger {
////        debug(msg: string): void;
////        warn(msg: string): void;
////    }
////}
////
////export { Logger };

// @Filename: /merging/logger-impl.ts
////import { Logger } from './logger-extension';
////
////// Class implementing the merged interface
////export class /*consoleLogger*/ConsoleLogger implements Logger {
////    log(msg: string): void { console.log(msg); }
////    debug(msg: string): void { console.debug(msg); }
////    warn(msg: string): void { console.warn(msg); }
////}
////
////// Another implementation
////export class /*fileLogger*/FileLogger implements Logger {
////    log(msg: string): void {}
////    debug(msg: string): void {}
////    warn(msg: string): void {}
////}

// @Filename: /merging/namespace-merge.ts
////export interface /*withStatic*/WithStatic {
////    instanceMethod(): void;
////}
////
////// Namespace merging with interface
////export namespace WithStatic {
////    export function create(): WithStatic {
////        return { instanceMethod: () => {} };
////    }
////}

// @Filename: /merging/namespace-impl.ts
////import { WithStatic } from './namespace-merge';
////
////export class /*staticImpl*/StaticImpl implements WithStatic {
////    instanceMethod(): void {}
////}

// =============================================================================
// GAP 3: GENERIC TYPE PARAMETERS AS BASE TYPES
// =============================================================================

// @Filename: /generics-multi/base.ts
////export interface /*genericEntity*/GenericEntity<T> {
////    value: T;
////    getValue(): T;
////}
////
////export class /*genericEntityImpl*/GenericEntityImpl<T> implements GenericEntity<T> {
////    constructor(public value: T) {}
////    getValue(): T { return this.value; }
////}

// @Filename: /generics-multi/string-entity.ts
////import { GenericEntity, GenericEntityImpl } from './base';
////
////// Concrete instantiation
////export interface /*stringEntity*/StringEntity extends GenericEntity<string> {
////    format(): string;
////}
////
////export class /*stringEntityImpl*/StringEntityImpl extends GenericEntityImpl<string> implements StringEntity {
////    format(): string { return this.value.toUpperCase(); }
////}

// @Filename: /generics-multi/number-entity.ts
////import { GenericEntity, GenericEntityImpl } from './base';
////
////export interface /*numberEntity*/NumberEntity extends GenericEntity<number> {
////    isPositive(): boolean;
////}
////
////export class /*numberEntityImpl*/NumberEntityImpl extends GenericEntityImpl<number> {
////    isPositive(): boolean { return this.value > 0; }
////}

// @Filename: /generics-multi/constrained.ts
////import { GenericEntity } from './base';
////
////// Generic with constraint extending another generic
////export interface /*constrainedEntity*/ConstrainedEntity<T extends { id: string }> extends GenericEntity<T> {
////    getId(): string;
////}
////
////export class /*constrainedImpl*/ConstrainedImpl<T extends { id: string }> implements ConstrainedEntity<T> {
////    constructor(public value: T) {}
////    getValue(): T { return this.value; }
////    getId(): string { return this.value.id; }
////}

// @Filename: /generics-multi/nested-generics.ts
////import { GenericEntity } from './base';
////
////// Nested generic inheritance
////export interface /*nestedGeneric*/NestedGeneric<T, U> extends GenericEntity<T> {
////    secondValue: U;
////    getSecond(): U;
////}
////
////// Parameterized class extending generic class
////export class /*parameterizedClass*/ParameterizedClass<T> implements GenericEntity<T> {
////    constructor(public value: T) {}
////    getValue(): T { return this.value; }
////}

// =============================================================================
// GAP 4: CONDITIONAL TYPES AS SUBTYPES
// =============================================================================

// @Filename: /conditional-multi/base-types.ts
////export interface /*animalCond*/AnimalCond {
////    name: string;
////}
////
////export interface /*dogCond*/DogCond extends AnimalCond {
////    bark(): void;
////}
////
////export interface /*catCond*/CatCond extends AnimalCond {
////    meow(): void;
////}

// @Filename: /conditional-multi/conditional-types.ts
////import { AnimalCond, DogCond, CatCond } from './base-types';
////
////// Conditional type that extracts
////export type /*extractAnimal*/ExtractAnimal<T> = T extends AnimalCond ? T : never;
////
////// Applied conditional types - these should resolve to the concrete types
////export type /*dogOnly*/DogOnly = ExtractAnimal<DogCond>;
////export type /*catOnly*/CatOnly = ExtractAnimal<CatCond>;
////
////// Distributed conditional over union
////export type /*petsCond*/PetsCond = DogCond | CatCond;
////export type /*extractedPets*/ExtractedPets = ExtractAnimal<PetsCond>;
////
////// Conditional with infer
////export type /*inferName*/InferName<T> = T extends { name: infer N } ? N : never;
////export type /*dogName*/DogNameType = InferName<DogCond>;

// @Filename: /conditional-multi/conditional-impl.ts
////import { AnimalCond, DogCond, CatCond } from './base-types';
////import { ExtractAnimal, DogOnly } from './conditional-types';
////
////// Classes implementing the base types
////export class /*dogImpl*/DogImpl implements DogCond {
////    name: string = "";
////    bark(): void {}
////}
////
////export class /*catImpl*/CatImpl implements CatCond {
////    name: string = "";
////    meow(): void {}
////}
////
////// Function using conditional types
////export function processAnimal<T extends AnimalCond>(animal: ExtractAnimal<T>): void {
////    console.log(animal.name);
////}

// =============================================================================
// GAP 5: MIXIN PATTERNS
// =============================================================================

// @Filename: /mixins-multi/base.ts
////export type Constructor<T = {}> = new (...args: any[]) => T;
////
////export class /*mixinBase*/MixinBase {
////    baseProp: string = "base";
////}

// @Filename: /mixins-multi/timestamped.ts
////import { Constructor } from './base';
////
////export function Timestamped<TBase extends Constructor>(Base: TBase) {
////    return class Timestamped extends Base {
////        timestamp = Date.now();
////        getTimestamp(): number { return this.timestamp; }
////    };
////}

// @Filename: /mixins-multi/activatable.ts
////import { Constructor } from './base';
////
////export function Activatable<TBase extends Constructor>(Base: TBase) {
////    return class Activatable extends Base {
////        isActive = false;
////        activate(): void { this.isActive = true; }
////        deactivate(): void { this.isActive = false; }
////    };
////}

// @Filename: /mixins-multi/serializable.ts
////import { Constructor } from './base';
////
////export function Serializable<TBase extends Constructor>(Base: TBase) {
////    return class Serializable extends Base {
////        serialize(): string { return JSON.stringify(this); }
////    };
////}

// @Filename: /mixins-multi/composed.ts
////import { MixinBase } from './base';
////import { Timestamped } from './timestamped';
////import { Activatable } from './activatable';
////import { Serializable } from './serializable';
////
////// Single mixin
////export const TimestampedBase = Timestamped(MixinBase);
////
////// Composed mixins
////export const ActivatableTimestamped = Activatable(Timestamped(MixinBase));
////
////// Full composition
////export const /*fullMixin*/FullMixin = Serializable(Activatable(Timestamped(MixinBase)));

// @Filename: /mixins-multi/user.ts
////import { FullMixin } from './composed';
////
////// Class extending the fully composed mixin
////export class /*mixinUser*/MixinUser extends FullMixin {
////    userName: string = "";
////    
////    greet(): string {
////        return `Hello, ${this.userName}! Created at ${this.getTimestamp()}`;
////    }
////}
////
////// Another class extending the same mixin
////export class /*mixinAdmin*/MixinAdmin extends FullMixin {
////    permissions: string[] = [];
////    
////    hasPermission(perm: string): boolean {
////        return this.permissions.includes(perm);
////    }
////}

// =============================================================================
// TESTS
// =============================================================================

// --- GAP 1: Re-exports ---
// Test 1: Base interface through re-export chain
goTo.marker("baseReexport");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Extended interface in re-export module
goTo.marker("extendedReexport");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Derived through re-export chain
goTo.marker("derivedFromReexport");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Implementation through re-export
goTo.marker("implReexport");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Consumer through barrel export
goTo.marker("consumerInterface");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Consumer class through barrel
goTo.marker("consumerClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// --- GAP 2: Declaration Merging ---
// Test 7: Logger base (merged interface)
goTo.marker("loggerBase");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: ConsoleLogger implementing merged interface
goTo.marker("consoleLogger");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: FileLogger implementing merged interface
goTo.marker("fileLogger");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Interface with namespace merge
goTo.marker("withStatic");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: Class implementing namespace-merged interface
goTo.marker("staticImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// --- GAP 3: Generic Type Parameters ---
// Test 12: Generic entity base
goTo.marker("genericEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 13: Generic entity implementation
goTo.marker("genericEntityImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 14: String entity (concrete generic)
goTo.marker("stringEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 15: String entity implementation
goTo.marker("stringEntityImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 16: Number entity (another concrete)
goTo.marker("numberEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 17: Constrained entity
goTo.marker("constrainedEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 18: Constrained implementation
goTo.marker("constrainedImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 19: Nested generic
goTo.marker("nestedGeneric");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 20: Parameterized class
goTo.marker("parameterizedClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// --- GAP 4: Conditional Types ---
// Test 21: Animal base for conditionals
goTo.marker("animalCond");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 22: Dog interface
goTo.marker("dogCond");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 23: Cat interface
goTo.marker("catCond");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 24: ExtractAnimal conditional type
goTo.marker("extractAnimal");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 25: DogOnly applied conditional
goTo.marker("dogOnly");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 26: Dog implementation
goTo.marker("dogImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 27: Cat implementation
goTo.marker("catImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// --- GAP 5: Mixin Patterns ---
// Test 28: Mixin base class
goTo.marker("mixinBase");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 29: Full mixin composition
goTo.marker("fullMixin");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 30: User class extending mixin
goTo.marker("mixinUser");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 31: Admin class extending mixin
goTo.marker("mixinAdmin");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
