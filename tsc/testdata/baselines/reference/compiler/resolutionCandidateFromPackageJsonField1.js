//// [tests/cases/compiler/resolutionCandidateFromPackageJsonField1.ts] ////

//// [package.json]
{
    "name": "@angular/core",
    "typings": "index.d.ts"
}

//// [index.ts]
export {};

//// [test.ts]
import "@angular/core";


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@angular/core");
