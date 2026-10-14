// @module: esnext
// @moduleResolution: bundler
// @strict: true
// @traceResolution: true
// @noEmit: true

// @filename: node_modules/font/package.json
{
    "exports": {
        "./sans": {
            "types": "./missing.d.ts",
            "default": "./sans.js"
        }
    }
}

// @filename: node_modules/font/sans.d.ts
export const font: { className: string };

// @filename: main.ts
import { font } from "font/sans";
font.className;
