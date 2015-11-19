// @module: amd

// paths is defined in tsconfig.json
// baseUrl is specified in tsconfig.json and it is absolute

// @filename: c:/root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "c:/base",
        "paths": {
            "*": [
                "*",
                "generated/*",
                "c:/sharedrepo/*"
            ],
            "components/*": [
                "shared/components/*"
            ]
        }
    }
}
// @filename: c:/root/folder1/file1.ts
import {x} from "folder2/file1"
import {y} from "folder3/file2"
import {z} from "components/file3"
import {z1} from "my/file4"

declare function use(a: any): void;

use(x.toExponential());
use(y.toExponential());
use(z.toExponential());
use(z1.toExponential());

// @filename: c:/base/folder2/file1.ts
export var x = 1;

// @filename: c:/base/generated/folder3/file2.ts
export var y = 1;

// @filename: c:/base/shared/components/file3.ts
export {z} from "./file4"

// @filename: c:/base/shared/components/file4.ts
export var z = 1;

// @filename: c:/sharedrepo/my/file4.ts
export var z1 = 1;