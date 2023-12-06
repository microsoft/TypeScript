// @module: commonjs
// @traceResolution: true

// paths is defined in tsconfig.json
// @filename: c:/root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
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

// @filename: c:/root/folder2/file1.ts
export var x = 1;

// @filename: c:/root/generated/folder3/file2.ts
export var y = 1;

// @filename: c:/root/shared/components/file3/index.d.ts
export var z: number;

// @filename: c:/node_modules/file4.ts
export var z1 = 1;
