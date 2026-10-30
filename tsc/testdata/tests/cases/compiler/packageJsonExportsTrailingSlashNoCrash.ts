// @module: nodenext
// @moduleResolution: nodenext
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: /node_modules/pkg/package.json
{
    "name": "pkg",
    "exports": {
        "./": "./"
    }
}

// @filename: /node_modules/pkg/subpath.d.ts
export declare const value: number;

// @filename: /src/a.ts
import { value } from "pkg/subpath.js";
value;

// @filename: /src/b.ts
import { value } from "pkg/subpath.js";
value;
