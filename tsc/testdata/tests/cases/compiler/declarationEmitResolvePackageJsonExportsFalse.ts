// @target: es2015
// @module: esnext
// @moduleResolution: bundler
// @declaration: true
// @emitDeclarationOnly: true
// @noTypesAndSymbols: true
// @resolvePackageJsonExports: false

// Test that resolvePackageJsonExports: false prevents package.json exports from blocking
// module specifier generation in declaration emit. When resolvePackageJsonExports is false,
// a file that is NOT in the package's exports should still be referenceable via the package name
// (using the main/index fallback), not be "blocked by exports".
// See: https://github.com/microsoft/typescript-go/issues/2445

// @Filename: /node_modules/pkg/package.json
{
  "name": "pkg",
  "type": "module",
  "exports": {
    ".": "./dist/index.js"
  }
}

// @Filename: /node_modules/pkg/index.d.ts
export declare class C {
  private p;
}

// @Filename: /node_modules/pkg/dist/index.d.ts
export declare class C {
  private p;
}

// @Filename: /makeC.ts
import { C } from "pkg";
export function makeC() {
  return new C();
}

// @Filename: /index.ts
import { makeC } from "./makeC";
export const c = makeC();
