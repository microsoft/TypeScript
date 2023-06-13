// @moduleResolution: nodenext
// @traceResolution: true

// @filename: /a/node_modules/foo.d.ts
export declare let x: number

// @filename: /a/b/c/d/e/package.json
{
    "name": "e",
    "version": "1.0.0",
    "type": "module"
}
// @filename: /a/b/c/d/e/app.ts
import {x} from "foo";

