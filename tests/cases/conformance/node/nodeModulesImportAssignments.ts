// @module: node16,node18,nodenext
// @declaration: true
// @filename: subfolder/index.ts
// cjs format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
// @filename: index.ts
// esm format file
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
// @filename: file.ts
// esm format file
const __require = null;
const _createRequire = null;
import fs = require("fs");
fs.readFile;
export import fs2 = require("fs");
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
// @filename: types.d.ts
declare module "fs";