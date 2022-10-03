// @module: commonjs

// @filename: err1.d.ts
// Illegal, can't be in script file
export as namespace Foo;

// @filename: err2.d.ts
// Illegal, can't be in external ambient module
declare module "Foo" {
	export as namespace Bar;
}

// @filename: err3.d.ts
// Illegal, can't have modifiers
export var p;
static export as namespace oo1;
declare export as namespace oo2;
public export as namespace oo3;
const export as namespace oo4;

// @filename: err4.d.ts
// Illegal, must be at top-level
export namespace B {
	export as namespace C1;
}

// @filename: err5.ts
// Illegal, may not appear in implementation files
export var v;
export as namespace C2;

