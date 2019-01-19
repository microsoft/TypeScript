/// <reference path='fourslash.ts'/>

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
