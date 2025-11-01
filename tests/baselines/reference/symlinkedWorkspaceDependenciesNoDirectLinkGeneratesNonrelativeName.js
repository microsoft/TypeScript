//// [tests/cases/compiler/symlinkedWorkspaceDependenciesNoDirectLinkGeneratesNonrelativeName.ts] ////

//// [index.d.ts]
export declare class Foo {
    private f: any;
}
//// [package.json]
{
    "private": true,
    "dependencies": {
        "package-a": "file:../packageA"
    }
}
//// [index.d.ts]
import { Foo } from "package-a";
export declare function invoke(): Foo;
//// [package.json]
{
    "private": true,
    "dependencies": {
        "package-b": "file:../packageB",
        "package-a": "file:../packageA"
    }
}
//// [index.ts]
import * as pkg from "package-b";

export const a = pkg.invoke();

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var pkg = require("package-b");
exports.a = pkg.invoke();


//// [index.d.ts]
export declare const a: import("package-a").Foo;
