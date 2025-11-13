// @noTypesAndSymbols: true

// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "dist",
    "rootDir": "src",
  },
  "files": ["src/main.ts"]
}

// @Filename: /package.json
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

// @Filename: /src/indirect1.ts
export const indirect1 = 0;

// @Filename: /src/indirect2.ts
export const indirect2 = 0;

// @Filename: /src/main.ts
import { indirect1 } from "#indirect1";
import { indirect2 } from "pkg/indirect2.js";
console.log(indirect1, indirect2);
