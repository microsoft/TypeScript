// @module: amd

// paths\rootDirs is defined in tsconfig.json
// baseUrl is inferred from tsconfig.json

// @filename: c:/root/tsconfig.json
{
    "compilerOptions": {
        "paths": {
            "*": [
                "*",
                "generated/*"
            ]
        },
        "rootDirs": [
            ".",
            "./generated"
        ]
    }
}

// @filename: c:/root/generated/folder1/file2.ts
export {x} from "folder1/file3" // should be resolved to 'folder1/file3.ts' 

// @filename: c:/root/folder1/file3.ts
export var x = 1;

// @filename: c:/root/generated/folder2/file3.ts
import {z as y} from "../folder1/file1" // should be resolved to 'folder1/file1.ts'
let z = y.toLowerCase();

// @filename: c:/root/folder1/file1.ts
import {x} from "./file2" // should be resolved to 'generated/folder1/file2.ts' 

export var z = x.toExponential();
