//// [tests/cases/compiler/moduleResolution_relativeImportJsFile_noImplicitAny.ts] ////

//// [b.js]
export const x = 0;

//// [a.ts]
import * as b from "./b";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
