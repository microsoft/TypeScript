//// [tests/cases/compiler/duplicatePackage_packageIdIncludesSubModule.ts] ////

//// [Foo.d.ts]
export default class Foo {
    protected source: boolean;
}

//// [Bar.d.ts]
// This is *not* the same!
export const x: number;

//// [package.json]
{ "name": "foo", "version": "1.2.3" }

//// [index.ts]
import Foo from "foo/Foo";
import { x } from "foo/Bar";


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
