/// <reference path='fourslash.ts'/>

// @lib: es5

////interface SymbolConstructor {
////    readonly species: symbol;
////}
////var Symbol: SymbolConstructor;
////interface PromiseConstructor {
////  [Symbol.species]: PromiseConstructor;
////}
////var Promise: PromiseConstructor;
////Promise["/*1*/"];

verify.completions({ marker: "1", exact: [] });
