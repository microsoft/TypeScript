//// [tests/cases/conformance/moduleResolution/typesVersions.justIndex.ts] ////

//// [package.json]
{
    "typesVersions": {
        ">=3.1.0-0": { "*" : ["ts3.1/*"] }
    }
}

//// [index.d.ts]
export const a = 0;

//// [user.ts]
import { a } from "a";


//// [user.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
