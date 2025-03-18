//// [tests/cases/compiler/pathMappingInheritedBaseUrl.ts] ////

//// [tsconfig.base.json]
{
  "compilerOptions": {
    "baseUrl": "."
  }
}

//// [index.ts]
export const p1 = 0;

//// [index.ts]
import { p1 } from "p1";


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
