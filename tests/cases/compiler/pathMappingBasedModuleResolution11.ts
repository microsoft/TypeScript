// @module: amd

// paths\rootDirs is defined in tsconfig.json
// baseUrl is inferred from tsconfig.json

// @filename: root/tsconfig.json
{
    "compilerOptions": {
        "paths": {
            "*": [
                "*",
                "generated/*/file"
            ]
        },
        "rootDirs": [
            ".",
            "./generated"
        ]
    }
}
// @filename: root/folder1/file1.ts
import {x} from "./file2" // should be resolved to 'generated/folder1/file2/file.ts' 

export var z = x.toExponential();

// @filename: root/generated/folder1/file2/file.ts
export {x} from "folder1/file3" // should be resolved to 'folder1/file3.ts' 

// @filename: root/folder1/file3.ts
export var x = 1;

// @filename: root/generated/folder2/file3.ts
import {z as y} from "../folder1/file1" // should be resolved to 'folder1/file1.ts'
let z = y.toLowerCase();
