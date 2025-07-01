// @module: node16,node18,node20,nodenext
// @declaration: true
// @outDir: out
// @filename: index.ts
// esm format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
// @filename: index.mts
// esm format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
// @filename: index.cts
// cjs format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
// @filename: node_modules/inner/index.d.ts
// cjs format file
import * as cjs from "inner/cjs/index";
import * as mjs from "inner/mjs/index";
import * as type from "inner/js/index";
export { cjs };
export { mjs };
export { type };
// @filename: node_modules/inner/index.d.mts
// esm format file
import * as cjs from "inner/cjs/index";
import * as mjs from "inner/mjs/index";
import * as type from "inner/js/index";
export { cjs };
export { mjs };
export { type };
// @filename: node_modules/inner/index.d.cts
// cjs format file
import * as cjs from "inner/cjs/index";
import * as mjs from "inner/mjs/index";
import * as type from "inner/js/index";
export { cjs };
export { mjs };
export { type };
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module"
}
// @filename: node_modules/inner/package.json
{
    "name": "inner",
    "private": true,
    "exports": {
        "./cjs/*": "./*.cjs",
        "./mjs/*": "./*.mjs",
        "./js/*": "./*.js"
    }
}
