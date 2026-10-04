// @module: nodenext
// @declaration: true
// @declarationDir: /dist
// @rootDir: /
// @filename: /dist/main.d.cts
export {};
// @filename: /main.cts
import * as s from "self";
s;
// @filename: /package.json
{
  "name": "self",
  "exports": {
    ".": "./dist"
  }
}
