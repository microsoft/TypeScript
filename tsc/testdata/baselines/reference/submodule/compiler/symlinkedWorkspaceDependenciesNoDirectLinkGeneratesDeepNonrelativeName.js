//// [tests/cases/compiler/symlinkedWorkspaceDependenciesNoDirectLinkGeneratesDeepNonrelativeName.ts] ////

//// [foo.d.ts]
export declare class Foo {
    private f: any;
}
//// [index.d.ts]
import { Foo } from "./foo.js";
export function create(): Foo;
//// [package.json]
{
    "name": "package-a",
    "version": "0.0.1",
    "exports": {
        ".": "./index.js",
        "./cls": "./foo.js"
    }
}
//// [package.json]
{
    "private": true,
    "dependencies": {
        "package-a": "file:../packageA"
    }
}
//// [index.d.ts]
import { create } from "package-a";
export declare function invoke(): ReturnType<typeof create>;
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
import * as pkg from "package-b";
export const a = pkg.invoke();
