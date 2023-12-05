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
Object.defineProperty(exports, "__esModule", { value: true });
var a = require("a");
var o = a.o;
