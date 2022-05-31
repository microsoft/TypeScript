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
"use strict";
/// <reference types="pkg" />
Object.defineProperty(exports, "__esModule", { value: true });
const a = { a: 0 };
