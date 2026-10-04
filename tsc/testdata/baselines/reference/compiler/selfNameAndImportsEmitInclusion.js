//// [tests/cases/compiler/selfNameAndImportsEmitInclusion.ts] ////

//// [package.json]
{
  "name": "pkg",
  "type": "module",
  "imports": {
    "#indirect1": "./src/indirect1.ts"
  },
  "exports": {
    "./*": "./dist/*"
  }
}

//// [indirect1.ts]
export const indirect1 = 0;

//// [indirect2.ts]
export const indirect2 = 0;

//// [main.ts]
import { indirect1 } from "#indirect1";
import { indirect2 } from "pkg/indirect2.js";
console.log(indirect1, indirect2);


//// [indirect1.js]
export const indirect1 = 0;
//// [indirect2.js]
export const indirect2 = 0;
//// [main.js]
import { indirect1 } from "#indirect1";
import { indirect2 } from "pkg/indirect2.js";
console.log(indirect1, indirect2);
