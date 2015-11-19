// @module: amd

// baseurl is defined in tsconfig.json
// module resolution kind is inferred from settings (baseurl is specified)

// @filename: c:/root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./src"
    }
}
// @filename: c:/root/src/folder1/file1.ts
import {x} from "folder2/file2"

declare function use(a: any): void;

use(x.toExponential());

// @filename: c:/root/src/folder2/file2.ts
export {x} from "./file3"

// @filename: c:/root/src/folder2/file3.ts
export var x = 1;