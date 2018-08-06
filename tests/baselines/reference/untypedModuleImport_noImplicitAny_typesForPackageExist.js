//// [tests/cases/conformance/moduleResolution/untypedModuleImport_noImplicitAny_typesForPackageExist.ts] ////

//// [index.d.ts]
export const foo: number;

//// [package.json]
{ "name": "@types/foo", "version": "1.2.3" }

//// [sub.js]
const x = 0;

//// [package.json]
{ "name": "foo", "version": "1.2.3" }

//// [sub.js]
const x = 0;

//// [package.json]
{ "name": "bar", "version": "1.2.3" }

//// [index.d.ts]
export const foo: number;

//// [package.json]
{ "name": "@types/scope__foo", "version": "1.2.3" }

//// [sub.js]
const x = 0;

//// [package.json]
{ "name": "@scope/foo", "version": "1.2.3" }

//// [sub.js]
const x = 0;

//// [package.json]
{ "name": "@scope/bar", "version": "1.2.3" }

//// [a.ts]
import * as foo from "foo";
import * as fooSub from "foo/sub";
import * as barSub from "bar/sub";
import * as scopeFoo from "@scope/foo";
import * as scopeFooSub from "@scope/foo/sub";
import * as scopeBarSub from "@scope/bar/sub";


//// [a.js]
"use strict";
exports.__esModule = true;
