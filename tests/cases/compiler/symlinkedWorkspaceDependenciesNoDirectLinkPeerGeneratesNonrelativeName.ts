// @declaration: true
// @filename: workspace/packageA/index.d.ts
export declare class Foo {
    private f: any;
}
// @filename: workspace/packageB/package.json
{
    "private": true,
    "dependencies": {
        "package-a": "file:../packageA"
    }
}
// @filename: workspace/packageB/index.d.ts
import { Foo } from "package-a";
export declare function invoke(): Foo;
// @filename: workspace/packageC/package.json
{
    "private": true,
    "dependencies": {
        "package-b": "file:../packageB"
    },
    "peerDependencies": {
        "package-a": "file:../packageA"
    }
}
// @filename: workspace/packageC/index.ts
import * as pkg from "package-b";

export const a = pkg.invoke();
// @link: workspace/packageA -> workspace/packageC/node_modules/package-a
// @link: workspace/packageA -> workspace/packageB/node_modules/package-a
// @link: workspace/packageB -> workspace/packageC/node_modules/package-b