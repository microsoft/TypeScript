// @target: es5,es2016,es2020,esnext
// @module: nodenext
// @filename: package.json
{
    "type": "module"
}
// @filename: mod.d.ts
declare module "foo";
// @filename: index.ts
/// <reference path="./mod.d.ts" />
// This should emit a call to createRequire(import.meta.url)
import foo = require("foo");
foo;