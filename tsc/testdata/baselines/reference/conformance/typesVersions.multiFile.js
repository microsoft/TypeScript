//// [tests/cases/conformance/moduleResolution/typesVersions.multiFile.ts] ////

//// [package.json]
{
    "name": "ext",
    "version": "1.0.0",
    "types": "index",
    "typesVersions": {
        ">=3.1.0-0": { "*" : ["ts3.1/*"] }
    }
}

//// [index.d.ts]
export const a = "default a";

//// [other.d.ts]
export const b = "default b";

//// [index.d.ts]
export const a = "ts3.1 a";

//// [other.d.ts]
export const b = "ts3.1 b";

//// [main.ts]
import { a } from "ext";
import { b } from "ext/other";

const aa: "ts3.1 a" = a;
const bb: "ts3.1 b" = b;


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ext_1 = require("ext");
const other_1 = require("ext/other");
const aa = ext_1.a;
const bb = other_1.b;
