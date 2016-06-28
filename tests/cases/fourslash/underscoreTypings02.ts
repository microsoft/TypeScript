/// <reference path="fourslash.ts" />

// @module: CommonJS

//// interface Dictionary<T> {
////     [x: string]: T;
//// }
//// export interface ChainedObject<T> {
////     functions: ChainedArray<string>;
////     omit(): ChainedObject<T>;
////     clone(): ChainedObject<T>;
//// }
//// interface ChainedDictionary<T> extends ChainedObject<Dictionary<>> {
////     foldl(): ChainedObject<T>;
////     clone(): ChainedDictionary<T>;
//// }
//// export interface ChainedArray<T> extends ChainedObject<Array<T>> {
////     groupBy(): ChainedDictionary<any[]>;
////     groupBy(propertyName): ChainedDictionary<any[]>;
//// }

goTo.position(0);
verify.numberOfErrorsInCurrentFile(2);
