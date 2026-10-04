//// [tests/cases/compiler/simpleArrowFunctionParameterReferencedInObjectLiteral1.ts] ////

//// [simpleArrowFunctionParameterReferencedInObjectLiteral1.ts]
[].map(() => [].map(p => ({ X: p })));


//// [simpleArrowFunctionParameterReferencedInObjectLiteral1.js]
"use strict";
[].map(() => [].map(p => ({ X: p })));
