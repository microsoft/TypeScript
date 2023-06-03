// @moduleResolution: nodenext
// @traceResolution: true

// @filename: /a/node_modules/foo/index.d.ts
export declare let x: number
// @filename: /a/node_modules/foo/package.json
{
    "name": "foo",
    "type": "module",
    "exports": {
        ".": "./index.d.ts"
    }
}

// @filename: /a/b/c/d/e/app.mts
import {x} from "foo";
