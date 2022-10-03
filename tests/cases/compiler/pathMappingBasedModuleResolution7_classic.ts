// @module: amd
// @traceResolution: true

// @filename: c:/root/src/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "../",
        "paths": {
            "*": [
                "*",
                "c:/shared/*"
            ],
            "templates/*": [
                "generated/src/templates/*"
            ]
        },
        "rootDirs": [
            ".",
            "../generated/src"
        ]
    }
}

// @filename: c:/root/src/file1.ts
import {x} from "./project/file2";
import {y} from "module3";

declare function use(x: string);
use(x.toFixed());
use(y.toFixed());

// @filename: c:/root/generated/src/project/file2.ts
import {a} from "module1";
import {b} from "templates/module2";
import {x as c} from "../file3";
export let x = a + b + c;

// @filename: c:/shared/module1.d.ts
export let a: number

// @filename: c:/root/generated/src/templates/module2.ts
export let b: number;

// @filename: c:/root/src/file3.d.ts
export let x: number;

// @filename: c:/module3.d.ts
export let y: number;

