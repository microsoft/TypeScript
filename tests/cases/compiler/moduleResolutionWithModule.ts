// @moduleResolution: node,node12,nodenext
// @module: commonjs,node12,nodenext
// @filename: node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": "./entrypoint.js"
}
// @filename: node_modules/pkg/entrypoint.d.ts
export declare function thing(): void;
// @filename: index.ts
import * as p from "pkg";
p.thing();