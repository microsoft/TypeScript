// @module: commonjs

// location of tsconfig.json as baseurl

// @filename: root/tsconfig.json
{
    "compilerOptions": {
        "moduleResolution": "baseUrl"
    }
}
// @filename: root/folder1/file1.ts
import {x} from "folder2/file2"

declare function use(a: any): void;

use(x.toExponential());

// @filename: root/folder2/file2.ts
export {x} from "./file3"

// @filename: root/folder2/file3.ts
export var x = 1;