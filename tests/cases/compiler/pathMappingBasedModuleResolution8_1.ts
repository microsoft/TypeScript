// @module: amd

// paths is defined in tsconfig.json
// baseUrl is specified in tsconfig.json

// @filename: c:/root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./src",
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
import {z1} from "file4"

declare function use(a: any): void;

use(x.toExponential());
use(y.toExponential());
use(z.toExponential());
use(z1.toExponential());

// @filename: c:/root/src/folder2/file1.ts
export var x = 1;

// @filename: c:/root/src/generated/folder3/file2.ts
export var y = 1;

// @filename: c:/root/src/shared/components/file3.ts
export var z = 1;

// @filename: c:/sharedrepo/file4.ts
export var z1 = 1;