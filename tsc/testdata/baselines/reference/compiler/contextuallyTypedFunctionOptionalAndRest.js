//// [tests/cases/compiler/contextuallyTypedFunctionOptionalAndRest.ts] ////

//// [contextuallyTypedFunctionOptionalAndRest.ts]
const f: () => void = (a?, ...b) => {};


//// [contextuallyTypedFunctionOptionalAndRest.js]
"use strict";
const f = (a, ...b) => { };
