// @moduleResolution: node
// @traceResolution: true

// @filename: /a/b/node_modules/foo.d.ts
export declare let x: number

// @filename: /a/b/c/d/e/app.ts
import {x} from "foo";

// @filename: /a/b/lib.ts
import {x} from "foo";
