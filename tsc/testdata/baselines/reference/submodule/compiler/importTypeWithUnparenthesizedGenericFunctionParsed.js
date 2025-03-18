//// [tests/cases/compiler/importTypeWithUnparenthesizedGenericFunctionParsed.ts] ////

//// [importTypeWithUnparenthesizedGenericFunctionParsed.ts]
export declare const fail1: import("module").Modifier<<T>(x: T) => T>; // shouldn't be a parse error

//// [importTypeWithUnparenthesizedGenericFunctionParsed.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
