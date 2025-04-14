// @module: node16,node18,nodenext
// @declaration: true
// @allowJs: true
// @checkJs: true
// @outDir: out
// @filename: subfolder/index.js
// cjs format file
const a = {};
export = a;
// @filename: subfolder/file.js
// cjs format file
const a = {};
module.exports = a;
// @filename: index.js
// esm format file
const a = {};
export = a;
// @filename: file.js
// esm format file
import "fs";
const a = {};
module.exports = a;
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