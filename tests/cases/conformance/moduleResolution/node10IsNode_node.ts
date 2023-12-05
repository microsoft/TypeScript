// @moduleResolution: node
// @module: commonjs
// @noEmit: true
// @traceResolution: true

// @Filename: /node_modules/fancy-lib/package.json
{
    "name": "fancy-lib",
    "version": "1.0.0",
    "main": "index.js",
    "exports": {
        ".": "./definitely-not-index.js"
    }
}

// @Filename: /node_modules/fancy-lib/index.d.ts
export declare const fancy: "feast";

// @Filename: /node_modules/fancy-lib/definitely-not-index.d.ts
export declare const fancy: "ketchup";

// @Filename: /main.ts
import { fancy } from "fancy-lib";
fancy;
