// @module: amd

// paths is defined in tsconfig.json
// module resolution kind is inferred from the presence of 'paths'

// @filename: root/tsconfig.json
{
    "compilerOptions": {
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

// @filename: root/folder2/file1.ts
export var x = 1;

// @filename: root/generated/folder3/file2.ts
export var y = 1;

// @filename: root/shared/components/file3.ts
export var z = 1;