//// [tests/cases/compiler/missingSymbolLibraryDiagnostic.ts] ////

//// [missingSymbolLibraryDiagnostic.ts]
interface Array<T> {}
interface Boolean {}
interface Function {}
interface CallableFunction extends Function {}
interface NewableFunction extends Function {}
interface IArguments {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}

Symbol("value");
const shorthand = { Symbol };
type MissingSymbol = Symbol;


//// [missingSymbolLibraryDiagnostic.js]
"use strict";
Symbol("value");
const shorthand = { Symbol };
