//// [tests/cases/conformance/moduleResolution/bundler/bundlerConditionsExcludesNode.ts] ////

//// [package.json]
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
  
//// [index.node.js]
export const node = 0;

//// [index.node.d.ts]
export const node: number;

//// [index.web.js]
export const web = 0;

//// [index.web.d.ts]
export const web: number;

//// [main.ts]
import { web } from "conditions";


//// [main.js]
export {};
