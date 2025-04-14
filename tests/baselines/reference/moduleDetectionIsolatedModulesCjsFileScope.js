//// [tests/cases/compiler/moduleDetectionIsolatedModulesCjsFileScope.ts] ////

//// [filename.cts]
const a = 2;
//// [filename.mts]
const a = 2;

//// [filename.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = 2;
//// [filename.mjs]
const a = 2;
export {};


//// [filename.d.cts]
export {};
//// [filename.d.mts]
export {};
