// @moduleResolution: bundler
// @module: esnext
// @allowJs: true
// @noEmit: true
// @traceResolution: true

// @Filename: /node_modules/acorn-walk/package.json
{
  "name": "acorn-walk",
  "version": "8.2.0",
  "main": "dist/walk.js",
  "types": "dist/walk.d.ts",
  "exports": {
    ".": [
      {
          "import": "./dist/walk.mjs",
          "require": "./dist/walk.js",
          "default": "./dist/walk.js"
      },
      "./dist/walk.js"
    ],
    "./package.json": "./package.json"
  }
}

// The correct behavior for this test would be for both the module augmentation
// and the import to resolve to `walk.mjs` (triggering at least one implicit any
// error, I think?). However, https://github.com/microsoft/TypeScript/issues/50762
// causes the import to resolve through the `default` condition, replacing `.js`
// with `.d.ts` to find `walk.d.ts`. While this is incorrect, it's important that
// the module augmentation, which resolves through self-name resolution, resolves
// to the same module as the external import.

// @Filename: /node_modules/acorn-walk/dist/walk.d.ts
export {};
declare module 'acorn-walk' {
  export function simple(node: any, visitors: any, base?: any, state?: any): any;
}

// @Filename: /node_modules/acorn-walk/dist/walk.mjs
export {};

// @Filename: /index.ts
import { simple } from 'acorn-walk';
