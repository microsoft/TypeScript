//// [tests/cases/compiler/typeReferenceDirectiveRelativeNameFromTypeRoot.ts] ////

//// [README.md]
The type root.

//// [package.json]
{ "name": "pkg", "version": "1.0.0", "types": "index.d.ts" }

//// [index.d.ts]
declare const pkg: number;

//// [a.ts]
/// <reference types="../pkg" />
export const a: number = pkg;


//// [a.js]
/// <reference types="../pkg" />
export const a = pkg;
