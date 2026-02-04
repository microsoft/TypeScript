//// [tests/cases/compiler/literalIntersectionYieldsLiteral.ts] ////

//// [literalIntersectionYieldsLiteral.ts]
const x: { type: string } & { type: "string" } = { type: "string" };


//// [literalIntersectionYieldsLiteral.js]
"use strict";
const x = { type: "string" };
