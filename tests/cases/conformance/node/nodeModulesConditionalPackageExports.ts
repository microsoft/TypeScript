// @module: node12,nodenext
// @declaration: true
// @outDir: out
// @filename: index.ts
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/a";
import * as mjsi from "inner/b";
import * as typei from "inner";
import * as ts from "inner/types";
cjsi.mjsSource;
mjsi.mjsSource;
typei.mjsSource;
ts.mjsSource;
// @filename: index.mts
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/a";
import * as mjsi from "inner/b";
import * as typei from "inner";
import * as ts from "inner/types";
cjsi.mjsSource;
mjsi.mjsSource;
typei.mjsSource;
ts.mjsSource;
// @filename: index.cts
// cjs format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/a";
import * as mjsi from "inner/b";
import * as typei from "inner";
import * as ts from "inner/types";
cjsi.cjsSource;
mjsi.cjsSource;
typei.implicitCjsSource;
ts.cjsSource;
// @filename: node_modules/inner/index.d.ts
// cjs format file
import * as cjs from "inner/a";
import * as mjs from "inner/b";
import * as type from "inner";
import * as ts from "inner/types";
export { cjs };
export { mjs };
export { type };
export { ts };
export const implicitCjsSource = true;
// @filename: node_modules/inner/index.d.mts
// esm format file
import * as cjs from "inner/a";
import * as mjs from "inner/b";
import * as type from "inner";
import * as ts from "inner/types";
export { cjs };
export { mjs };
export { type };
export { ts };
export const mjsSource = true;
// @filename: node_modules/inner/index.d.cts
// cjs format file
import * as cjs from "inner/a";
import * as mjs from "inner/b";
import * as type from "inner";
import * as ts from "inner/types";
export { cjs };
export { mjs };
export { type };
export { ts };
export const cjsSource = true;
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}
// @filename: node_modules/inner/package.json
{
    "name": "inner",
    "private": true,
    "exports": {
        "./a": {
            "require": "./index.cjs",
            "node": "./index.mjs"
        },
        "./b": {
            "import": "./index.mjs",
            "node": "./index.cjs"
        },
        ".": {
            "import": "./index.mjs",
            "node": "./index.js"
        },
        "./types": {
            "types": {
                "import": "./index.d.mts",
                "require": "./index.d.cts",
            },
            "node": {
                "import": "./index.mjs",
                "require": "./index.cjs"
            }
        }
    }
}