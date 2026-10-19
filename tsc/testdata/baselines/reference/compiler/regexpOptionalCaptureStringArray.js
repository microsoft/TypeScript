//// [tests/cases/compiler/regexpOptionalCaptureStringArray.ts] ////

//// [regexpOptionalCaptureStringArray.ts]
const result: string[] | null = /^(a)?$/.exec("");


//// [regexpOptionalCaptureStringArray.js]
"use strict";
const result = /^(a)?$/.exec("");
