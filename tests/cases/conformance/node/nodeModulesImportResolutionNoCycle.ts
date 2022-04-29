// @module: node12,nodenext
// @declaration: true
// @filename: index.ts
// esm format file
import * as type from "#type";
type;
// @filename: index.mts
// esm format file
import * as type from "#type";
type;
// @filename: index.cts
// esm format file
import * as type from "#type";
type;
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "package",
    "imports": {
        "#type": "package"
    }
}