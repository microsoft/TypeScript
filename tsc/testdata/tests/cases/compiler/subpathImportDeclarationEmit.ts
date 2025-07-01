// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
  },
  "files": ["src/main.ts"]
}

// @Filename: /package.json
{
  "name": "pkg",
  "type": "module",
  "imports": {
    "#subpath": "./src/subpath.ts"
  },
  "exports": {
    "./*": "./dist/*"
  }
}

// @Filename: /src/subpath.ts
async function bar(): Promise<string> {
  return "bar";
}
export const barrel = { bar };

// @Filename: /src/indirect.ts
import { barrel } from "#subpath";
const { bar } = barrel;
export { bar };

// @Filename: /src/main.ts
import { bar } from "./indirect.js";
console.log(await bar());
