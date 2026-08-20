//// [tests/cases/conformance/externalModules/umd-errors.ts] ////

//// [err1.d.ts]
// Illegal, can't be in script file
export as namespace Foo;

//// [err2.d.ts]
// Illegal, can't be in external ambient module
declare module "Foo" {
	export as namespace Bar;
}

//// [err3.d.ts]
// Illegal, can't have modifiers
export var p;
static export as namespace oo1;
declare export as namespace oo2;
public export as namespace oo3;
const export as namespace oo4;

//// [err4.d.ts]
// Illegal, must be at top-level
export namespace B {
	export as namespace C1;
}

//// [err5.ts]
// Illegal, may not appear in implementation files
export var v;
export as namespace C2;



//// [err5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v = void 0;
