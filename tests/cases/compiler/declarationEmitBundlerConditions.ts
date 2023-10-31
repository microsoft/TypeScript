// @module: esnext
// @moduleResolution: bundler
// @declaration: true
// @emitDeclarationOnly: true
// @noTypesAndSymbols: true

// @Filename: /node_modules/pkg/package.json
{
  "name": "pkg",
  "type": "module",
  "exports": {
    ".": {
      "import": "./index.js",
      "require": "./index.cjs"
    }
  }
}

// @Filename: /node_modules/pkg/index.d.ts
export declare class C {
  private p;
}

// @Filename: /node_modules/pkg/index.d.cts
export {};

// @Filename: /makeC.ts
import { C } from "pkg";
export function makeC() {
  return new C();
}

// @Filename: /index.ts
import { makeC } from "./makeC";
export const c = makeC();
