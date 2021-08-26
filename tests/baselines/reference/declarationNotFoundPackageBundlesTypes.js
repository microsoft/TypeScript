//// [tests/cases/conformance/moduleResolution/declarationNotFoundPackageBundlesTypes.ts] ////

//// [package.json]
{   
    "name": "foo",
    "version": "1.0.0"
}

//// [index.js]
var foo = 0;
module.exports = foo;

//// [index.d.ts]
declare const foo: any;
export = foo;

//// [other.js]
module.exports = {};

//// [index.ts]
import * as Foo from "foo";
import * as Other from "foo/other"/*1*/;

//// [index.js]
"use strict";
exports.__esModule = true;
