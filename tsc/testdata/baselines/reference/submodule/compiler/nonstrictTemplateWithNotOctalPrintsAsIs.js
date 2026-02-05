//// [tests/cases/compiler/nonstrictTemplateWithNotOctalPrintsAsIs.ts] ////

//// [nonstrictTemplateWithNotOctalPrintsAsIs.ts]
// https://github.com/Microsoft/TypeScript/issues/21828
const d2 = `\\0041`;


//// [nonstrictTemplateWithNotOctalPrintsAsIs.js]
"use strict";
// https://github.com/Microsoft/TypeScript/issues/21828
const d2 = `\\0041`;
