// @module: node16,node18,nodenext
// @declaration: true
// @filename: index.ts
// @traceResolution: true
// esm format file
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
// @filename: index.mts
// esm format file
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
// @filename: index.cts
// esm format file
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
cjs;
mjs;
type;
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.js",
    "imports": {
        "#cjs": "./index.cjs",
        "#mjs": "./index.mjs",
        "#type": "./index.js"
    }
}