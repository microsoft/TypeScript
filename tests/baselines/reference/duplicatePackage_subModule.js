//// [tests/cases/compiler/duplicatePackage_subModule.ts] ////

//// [index.d.ts]
import Foo from "foo/Foo";
export const o: Foo;

//// [Foo.d.ts]
export default class Foo {
    protected source: boolean;
}

//// [package.json]
{ "name": "foo", "version": "1.2.3" }

//// [Foo.d.ts]
export default class Foo {
    protected source: boolean;
}

//// [package.json]
{ "name": "foo", "version": "1.2.3" }

//// [index.ts]
import Foo from "foo/Foo";
import * as a from "a";

const o: Foo = a.o;


//// [index.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var a = __importStar(require("a"));
var o = a.o;
