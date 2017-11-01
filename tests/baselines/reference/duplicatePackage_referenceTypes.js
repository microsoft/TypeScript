//// [tests/cases/compiler/duplicatePackage_referenceTypes.ts] ////

//// [index.d.ts]
/// <reference types="foo" />
import { Foo } from "foo";
export const foo: Foo;

//// [index.d.ts]
export class Foo { private x; }

//// [package.json]
{ "name": "foo", "version": "1.2.3" }

//// [index.d.ts]
export class Foo { private x; }

//// [package.json]
{ "name": "foo", "version": "1.2.3" }

//// [index.ts]
import * as a from "a";
import { Foo } from "foo";

let foo: Foo = a.foo;


//// [index.js]
"use strict";
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var a = __importStar(require("a"));
var foo = a.foo;
