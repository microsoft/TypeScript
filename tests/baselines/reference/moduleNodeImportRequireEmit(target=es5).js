//// [tests/cases/compiler/moduleNodeImportRequireEmit.ts] ////

//// [package.json]
{
    "type": "module"
}
//// [mod.d.ts]
declare module "foo";
//// [index.ts]
/// <reference path="./mod.d.ts" />
// This should emit a call to createRequire(import.meta.url)
import foo = require("foo");
foo;

//// [index.js]
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
/// <reference path="./mod.d.ts" />
// This should emit a call to createRequire(import.meta.url)
const foo = __require("foo");
foo;
