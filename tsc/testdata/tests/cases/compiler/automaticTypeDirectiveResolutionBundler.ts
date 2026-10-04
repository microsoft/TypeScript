// @noImplicitReferences: true
// @module: esnext
// @moduleResolution: bundler
// @types: pkg
// @traceResolution: true
// @noEmit: true
// @strict: true

// @filename: /node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "1.0.0",
    "exports": {
        ".": {
            "import": {
                "types": "./esm.d.mts"
            },
            "default": {
                "types": "./cjs.d.ts"
            }
        }
    }
}

// @filename: /node_modules/pkg/esm.d.mts
// This file should be resolved when using bundler resolution with "import" condition
export interface PkgType {
    esm: true;
}
declare global {
    var expectedCondition: "import";
}

// @filename: /node_modules/pkg/cjs.d.ts
// This file should NOT be resolved - it's the "default" condition fallback
export interface PkgType {
    cjs: true;  // Different shape - will cause error if wrong file is used
}
declare global {
    var expectedCondition: "default";  // Conflicts with esm.d.mts if both are loaded
}

// @filename: /index.ts
// The automatic type directive "pkg" from @types should resolve to esm.d.mts
// because bundler resolution uses the "import" condition.
// If the wrong file is resolved, we'll get a type error due to conflicting declarations.
import type { PkgType } from "pkg";

// This should work if esm.d.mts is correctly resolved
const x: PkgType = { esm: true };
