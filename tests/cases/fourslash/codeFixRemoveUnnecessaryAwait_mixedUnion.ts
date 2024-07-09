/// <reference path="fourslash.ts" />

// @target: esnext
//// async function fn1(a: Promise<void> | void) {
////   await a;
//// }
////
//// async function fn2<T extends Promise<void> | void>(a: T) {
////   await a;
//// }

verify.getSuggestionDiagnostics([]);
