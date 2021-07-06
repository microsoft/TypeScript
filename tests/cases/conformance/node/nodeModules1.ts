// @module: node12,nodenext
// @declaration: true
// @filename: subfolder/index.ts
// cjs format file
const x = 1;
export {x};
// @filename: subfolder/index.cts
// cjs format file
const x = 1;
export {x};
// @filename: subfolder/index.mts
// esm format file
const x = 1;
export {x};
// @filename: subfolder2/index.ts
// cjs format file
const x = 1;
export {x};
// @filename: subfolder2/index.cts
// cjs format file
const x = 1;
export {x};
// @filename: subfolder2/index.mts
// esm format file
const x = 1;
export {x};
// @filename: subfolder2/another/index.ts
// esm format file
const x = 1;
export {x};
// @filename: subfolder2/another/index.mts
// esm format file
const x = 1;
export {x};
// @filename: subfolder2/another/index.cts
// cjs format file
const x = 1;
export {x};
// @filename: index.mts
import * as m1 from "./index.js";
import * as m2 from "./index.mjs";
import * as m3 from "./index.cjs";
import * as m4 from "./subfolder/index.js";
import * as m5 from "./subfolder/index.mjs";
import * as m6 from "./subfolder/index.cjs";
import * as m7 from "./subfolder2/index.js";
import * as m8 from "./subfolder2/index.mjs";
import * as m9 from "./subfolder2/index.cjs";
import * as m10 from "./subfolder2/another/index.js";
import * as m11 from "./subfolder2/another/index.mjs";
import * as m12 from "./subfolder2/another/index.cjs";
void m1;
void m2;
void m3;
void m4;
void m5;
void m6;
void m7;
void m8;
void m9;
void m10;
void m11;
void m12;
// esm format file
const x = 1;
export {x};
// @filename: index.cts
// ESM-format imports below should issue errors
import * as m1 from "./index.js";
import * as m2 from "./index.mjs";
import * as m3 from "./index.cjs";
import * as m4 from "./subfolder/index.js";
import * as m5 from "./subfolder/index.mjs";
import * as m6 from "./subfolder/index.cjs";
import * as m7 from "./subfolder2/index.js";
import * as m8 from "./subfolder2/index.mjs";
import * as m9 from "./subfolder2/index.cjs";
import * as m10 from "./subfolder2/another/index.js";
import * as m11 from "./subfolder2/another/index.mjs";
import * as m12 from "./subfolder2/another/index.cjs";
void m1;
void m2;
void m3;
void m4;
void m5;
void m6;
void m7;
void m8;
void m9;
void m10;
void m11;
void m12;
// cjs format file
const x = 1;
export {x};
// @filename: index.ts
import * as m1 from "./index.js";
import * as m2 from "./index.mjs";
import * as m3 from "./index.cjs";
import * as m4 from "./subfolder/index.js";
import * as m5 from "./subfolder/index.mjs";
import * as m6 from "./subfolder/index.cjs";
import * as m7 from "./subfolder2/index.js";
import * as m8 from "./subfolder2/index.mjs";
import * as m9 from "./subfolder2/index.cjs";
import * as m10 from "./subfolder2/another/index.js";
import * as m11 from "./subfolder2/another/index.mjs";
import * as m12 from "./subfolder2/another/index.cjs";
void m1;
void m2;
void m3;
void m4;
void m5;
void m6;
void m7;
void m8;
void m9;
void m10;
void m11;
void m12;
// esm format file
const x = 1;
export {x};
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module"
}
// @filename: subfolder/package.json
{
    "type": "commonjs"
}
// @filename: subfolder2/package.json
{
}
// @filename: subfolder2/another/package.json
{
    "type": "module"
}