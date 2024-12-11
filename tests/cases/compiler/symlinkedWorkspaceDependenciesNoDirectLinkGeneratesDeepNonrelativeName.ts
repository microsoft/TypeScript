// @declaration: true
// @module: nodenext
// @filename: workspace/packageA/foo.d.ts
export declare class Foo {
    private f: any;
}
// @filename: workspace/packageA/index.d.ts
import { Foo } from "./foo.js";
export function create(): Foo;
// @filename: workspace/packageA/package.json
{
    "name": "package-a",
    "version": "0.0.1",
    "exports": {
        ".": "./index.js",
        "./cls": "./foo.js"
    }
}
// @filename: workspace/packageB/package.json
{
    "private": true,
    "dependencies": {
        "package-a": "file:../packageA"
    }
}
// @filename: workspace/packageB/index.d.ts
import { create } from "package-a";
export declare function invoke(): ReturnType<typeof create>;
// @filename: workspace/packageC/package.json
{
    "private": true,
    "dependencies": {
        "package-b": "file:../packageB",
        "package-a": "file:../packageA"
    }
}
// @filename: workspace/packageC/index.ts
import * as pkg from "package-b";

export const a = pkg.invoke();
// @link: workspace/packageA -> workspace/packageC/node_modules/package-a
// @link: workspace/packageA -> workspace/packageB/node_modules/package-a
// @link: workspace/packageB -> workspace/packageC/node_modules/package-b