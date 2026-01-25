/// <reference path='fourslash.ts'/>

// Test type hierarchy with built-in/library types
// @lib: esnext

// NOTE: When supertypes include lib.d.ts types (Promise, Array, etc.):
// - In real IDE usage: The Type Hierarchy correctly returns lib.es5.d.ts paths
//   and proper span positions, allowing navigation to lib source files.
// - In test baselines: The fourslash harness only has access to test-defined files,
//   so lib.d.ts files show as "(lib file)" with "<source not available>" placeholder.
//   This is a test infrastructure limitation, not a feature limitation.

// @Filename: /builtinLibTypes.ts
////// Promise types
////interface /*customPromise*/CustomPromise<T> extends Promise<T> {
////    finally(onfinally?: () => void): Promise<T>;
////}
////
////class /*asyncResult*/AsyncResult<T> implements PromiseLike<T> {
////    then<TResult1 = T, TResult2 = never>(
////        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
////        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
////    ): PromiseLike<TResult1 | TResult2> {
////        return this as any;
////    }
////}
////
////// Array types with lib
////interface /*searchableArray*/SearchableArray<T> extends Array<T> {
////    search(predicate: (item: T) => boolean): T | undefined;
////}
////
////class /*sortedArray*/SortedArray<T> extends Array<T> {
////    binarySearch(item: T): number {
////        return -1;
////    }
////}
////
////// Error hierarchy
////class /*appError*/ApplicationError extends Error {
////    constructor(message: string, public code: number) {
////        super(message);
////        this.name = 'ApplicationError';
////    }
////}
////
////class /*validationError*/ValidationError extends ApplicationError {
////    constructor(message: string, public field: string) {
////        super(message, 400);
////    }
////}
////
////// Map/Set extensions
////interface /*orderedMap*/OrderedMap<K, V> extends Map<K, V> {
////    first(): V | undefined;
////    last(): V | undefined;
////}
////
////interface /*uniqueSet*/UniqueSet<T> extends Set<T> {
////    addUnique(value: T): boolean;
////}
////
////// Iterator extensions
////interface /*pageIterator*/PageIterator<T> extends Iterator<T[]> {
////    currentPage: number;
////    totalPages: number;
////}
////
////// RegExp extension
////interface /*namedRegExp*/NamedRegExp extends RegExp {
////    namedGroups: Record<string, string>;
////}
////
////// ReadonlyArray usage
////type /*immutableList*/ImmutableList<T> = readonly T[] & {
////    readonly length: number;
////};
////
////// Utility types with built-in types
////type /*promiseReturnType*/PromiseReturnType<T extends (...args: any) => Promise<any>> = 
////    T extends (...args: any) => Promise<infer R> ? R : never;
////
////async function fetchUser(): Promise<{ name: string }> {
////    return { name: 'test' };
////}
////
////type /*userType*/UserType = PromiseReturnType<typeof fetchUser>;
////
////// Awaited utility
////type /*awaitedExample*/AwaitedExample = Awaited<Promise<Promise<string>>>;
////
////// Record with built-in types
////type /*eventHandlers*/EventHandlers = Record<keyof HTMLElementEventMap, EventListener>;
////
////// Parameters of built-in
////type /*mapParams*/MapParams = Parameters<typeof Map.prototype.set>;

// Test 1: Interface extending Promise
goTo.marker("customPromise");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Class implementing PromiseLike
goTo.marker("asyncResult");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Interface extending Array
goTo.marker("searchableArray");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Class extending Array
goTo.marker("sortedArray");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Class extending Error
goTo.marker("appError");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Deep inheritance from Error
goTo.marker("validationError");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Interface extending Map
goTo.marker("orderedMap");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Interface extending Set
goTo.marker("uniqueSet");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Interface extending Iterator
goTo.marker("pageIterator");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: ReadonlyArray based type
goTo.marker("immutableList");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: Custom utility extracting Promise return type
goTo.marker("promiseReturnType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 12: Applied promise return type
goTo.marker("userType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 13: Awaited utility type
goTo.marker("awaitedExample");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
