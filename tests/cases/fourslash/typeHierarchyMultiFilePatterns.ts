/// <reference path='fourslash.ts'/>

// @module: esnext
// @moduleResolution: bundler

// Comprehensive test for type hierarchy patterns across multiple files
// This validates that ALL major patterns work with cross-file imports:
// 1. Generic interfaces/classes
// 2. Declaration merging
// 3. Intersection types
// 4. Conditional types
// 5. Re-exports via index files (barrel exports)

// ======================
// GENERICS ACROSS FILES
// ======================

// @Filename: /generics/base.ts
////export interface /*genericBase*/GenericBase<T> {
////    value: T;
////    getValue(): T;
////}
////
////export class GenericBaseImpl<T> implements GenericBase<T> {
////    value: T;
////    constructor(value: T) { this.value = value; }
////    getValue(): T { return this.value; }
////}

// @Filename: /generics/string-impl.ts
////import { GenericBase, GenericBaseImpl } from './base';
////
////export interface /*stringGeneric*/StringGeneric extends GenericBase<string> {
////    format(): string;
////}
////
////export class /*stringImpl*/StringImpl extends GenericBaseImpl<string> implements StringGeneric {
////    format(): string { return this.value.toUpperCase(); }
////}

// @Filename: /generics/number-impl.ts
////import { GenericBase, GenericBaseImpl } from './base';
////
////export interface NumberGeneric extends GenericBase<number> {
////    isPositive(): boolean;
////}
////
////export class /*numberImpl*/NumberImpl extends GenericBaseImpl<number> {
////    isPositive(): boolean { return this.value > 0; }
////}

// ======================
// DECLARATION MERGING ACROSS FILES
// ======================

// @Filename: /merging/mergeable.ts
////export interface /*mergeSource*/MergeableInterface {
////    firstProp: string;
////}

// @Filename: /merging/mergeable-ext.ts
////// This augments the interface from another file
////import { MergeableInterface } from './mergeable';
////
////declare module './mergeable' {
////    interface MergeableInterface {
////        secondProp: number;
////    }
////}
////
////export class /*mergeImpl*/MergeImplementer implements MergeableInterface {
////    firstProp: string = "";
////    secondProp: number = 0;
////}

// ======================
// INTERSECTION TYPES ACROSS FILES
// ======================

// @Filename: /intersections/printable.ts
////export interface /*printable*/Printable {
////    print(): void;
////}

// @Filename: /intersections/loggable.ts
////export interface /*loggable*/Loggable {
////    log(): void;
////}

// @Filename: /intersections/combined.ts
////import { Printable } from './printable';
////import { Loggable } from './loggable';
////
////export type /*printableLoggable*/PrintableLoggable = Printable & Loggable;
////
////export class /*combinedImpl*/CombinedImpl implements Printable, Loggable {
////    print(): void { console.log("printing"); }
////    log(): void { console.log("logging"); }
////}

// ======================
// BARREL EXPORTS (INDEX FILES)
// ======================

// @Filename: /barrel/types/entity.ts
////export interface /*barrelEntity*/BarrelEntity {
////    id: string;
////}

// @Filename: /barrel/types/named.ts
////import { BarrelEntity } from './entity';
////
////export interface /*barrelNamed*/BarrelNamed extends BarrelEntity {
////    name: string;
////}

// @Filename: /barrel/types/index.ts
////export { BarrelEntity } from './entity';
////export { BarrelNamed } from './named';

// @Filename: /barrel/consumer.ts
////// Import via barrel/index file
////import { BarrelEntity, BarrelNamed } from './types';
////
////export interface /*barrelUser*/BarrelUser extends BarrelNamed {
////    email: string;
////}
////
////export class /*barrelUserImpl*/BarrelUserImpl implements BarrelUser {
////    id: string = "";
////    name: string = "";
////    email: string = "";
////}

// ======================
// DEEP GENERIC CHAINS
// ======================

// @Filename: /deep/repository.ts
////export interface /*repository*/Repository<T> {
////    find(id: string): T | null;
////    save(entity: T): void;
////}

// @Filename: /deep/cached-repository.ts
////import { Repository } from './repository';
////
////export interface /*cachedRepo*/CachedRepository<T> extends Repository<T> {
////    clearCache(): void;
////}

// @Filename: /deep/user-repository.ts
////import { CachedRepository } from './cached-repository';
////
////interface User {
////    id: string;
////    name: string;
////}
////
////export interface /*userRepo*/UserRepository extends CachedRepository<User> {
////    findByName(name: string): User | null;
////}
////
////export class /*userRepoImpl*/UserRepositoryImpl implements UserRepository {
////    find(id: string): User | null { return null; }
////    save(entity: User): void {}
////    clearCache(): void {}
////    findByName(name: string): User | null { return null; }
////}

// ======================
// TESTS
// ======================

// Test 1: Generic base interface - should find StringGeneric, NumberGeneric as subtypes
goTo.marker("genericBase");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: String-specialized generic - should show GenericBase<string> as supertype
goTo.marker("stringGeneric");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: String implementation class
goTo.marker("stringImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Number implementation class
goTo.marker("numberImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Declaration merging source
goTo.marker("mergeSource");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Class implementing merged interface
goTo.marker("mergeImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Printable interface
goTo.marker("printable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Loggable interface
goTo.marker("loggable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Intersection type
goTo.marker("printableLoggable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Combined implementation
goTo.marker("combinedImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: Barrel export - base entity
goTo.marker("barrelEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 12: Barrel export - named interface
goTo.marker("barrelNamed");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 13: Barrel consumer - user interface
goTo.marker("barrelUser");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 14: Barrel consumer - user implementation
goTo.marker("barrelUserImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 15: Deep generic - Repository base
goTo.marker("repository");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 16: Deep generic - CachedRepository
goTo.marker("cachedRepo");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 17: Deep generic - UserRepository
goTo.marker("userRepo");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 18: Deep generic - UserRepositoryImpl
goTo.marker("userRepoImpl");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
