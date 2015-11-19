// @module: amd

// paths is defined in tsconfig.json
// baseUrl is specified in tsconfig.json

// @filename: root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "*": [
                "*",
                "generated/*"
            ],
            "components/*": [
                "shared/components/*"
            ]
        }
    }
}
// @filename: root/folder1/file1.ts
import {x} from "folder2/file1"
import {y} from "folder3/file2"
import {z} from "components/file3"

declare function use(a: any): void;

use(x.toExponential());
use(y.toExponential());
use(z.toExponential());

// @filename: root/src/folder2/file1.ts
export var x = 1;

// @filename: root/src/generated/folder3/file2.ts
export var y = 1;

// @filename: root/src/shared/components/file3.ts
export {z} from "./file4"

// @filename: root/src/shared/components/file4.ts
export var z = 1;