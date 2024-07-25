// @moduleResolution: bundler
// @module: esnext, preserve
// @traceResolution: true

// @Filename: /node_modules/conditions/package.json
{
    "name": "conditions",
    "version": "1.0.0",
    "type": "module",
    "main": "index.cjs",
    "types": "index.d.cts",
    "exports": {
      ".": {
        "node": "./index.node.js",
        "default": "./index.web.js"
      }
    }
  }
  
// @Filename: /node_modules/conditions/index.node.js
export const node = 0;

// @Filename: /node_modules/conditions/index.node.d.ts
export const node: number;

// @Filename: /node_modules/conditions/index.web.js
export const web = 0;

// @Filename: /node_modules/conditions/index.web.d.ts
export const web: number;

// @Filename: /main.ts
import { web } from "conditions";
