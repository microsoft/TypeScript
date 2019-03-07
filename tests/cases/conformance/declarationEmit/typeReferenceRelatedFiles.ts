// @declaration: true
// @filename: node_modules/@types/node/index.d.ts
/// <reference path="fs.d.ts" />
// @filename: node_modules/@types/node/fs.d.ts
declare module "fs" {
    interface FSWatcher {}
}
// @filename: node_modules/@types/node/package.json
{
    "name": "@types/node",
    "version": "1.0.0"
}
// @filename: main.ts
/// <reference types="node" />
import { FSWatcher } from "fs";
export function f() {
    return {} as FSWatcher;
}
