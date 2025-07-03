// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
  },
  "include": ["src/*.ts"]
}

// @Filename: /package.json
{
  "name": "pkg",
  "type": "module",
  "imports": {
    "#subpath": "./dist/subpath.js"
  }
}

// @Filename: /src/subpath.ts
export const foo = "foo";

// @Filename: /src/index.ts
import { foo } from "#subpath";
foo;
