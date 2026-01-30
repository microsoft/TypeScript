//// [tests/cases/compiler/contextualSignature_objectLiteralMethodMayReturnNever.ts] ////

//// [contextualSignature_objectLiteralMethodMayReturnNever.ts]
interface I { m(): number; }
const o: I = { m() { throw new Error("not implemented"); } };


//// [contextualSignature_objectLiteralMethodMayReturnNever.js]
"use strict";
var o = { m: function () { throw new Error("not implemented"); } };
