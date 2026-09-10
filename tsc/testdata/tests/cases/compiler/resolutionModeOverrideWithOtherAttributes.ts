// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /node_modules/pkg/package.json
{
    "name": "pkg",
    "exports": {
        ".": {
            "import": "./index.d.mts",
            "require": "./index.d.cts"
        }
    }
}

// @filename: /node_modules/pkg/index.d.mts
export declare const value: "import";

// @filename: /node_modules/pkg/index.d.cts
export declare const value: "require";

// @filename: /app.ts
import type { value } from "pkg" with { type: "typescript", "resolution-mode": "require" };

declare const expected: "require";
const actual: typeof value = expected;