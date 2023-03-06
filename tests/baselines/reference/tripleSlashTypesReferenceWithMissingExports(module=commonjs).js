//// [tests/cases/compiler/tripleSlashTypesReferenceWithMissingExports.ts] ////

//// [index.d.ts]
interface GlobalThing { a: number }
//// [package.json]
{
    "name": "pkg",
    "types": "index.d.ts",
    "exports": "some-other-thing.js"
}
//// [usage.ts]
/// <reference types="pkg" />

const a: GlobalThing = { a: 0 };

//// [usage.js]
/// <reference types="pkg" />
var a = { a: 0 };
