// @strict: true
// @declaration: true
// @module: nodenext

// Test that subpath imports with re-exports work correctly in declaration emit

// @Filename: /packages/b/package.json
{
  "name": "package-b",
  "type": "module",
  "exports": {
    ".": "./index.js"
  }
}

// @Filename: /packages/b/index.js
export {};

// @Filename: /packages/b/index.d.ts
export interface B {
	b: "b";
}

// @Filename: /packages/a/package.json
{
  "name": "package-a",
  "type": "module",
  "imports": {
    "#re_export": "./src/re_export.ts"
  },
  "exports": {
    ".": "./dist/index.js"
  }
}


// @Filename: /packages/a/tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
  },
  "include": ["src/**/*.ts"]
}

// @Filename: /packages/a/src/re_export.ts
import type { B } from "package-b";
declare function foo(): Promise<B>
export const re = { foo };

// @Filename: /packages/a/src/index.ts
import { re } from "#re_export";
const { foo } = re;
export { foo };

// @link: /packages/b -> /packages/a/node_modules/package-b

