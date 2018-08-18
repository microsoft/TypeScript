// @traceResolution: true
// @target: esnext
// @module: commonjs
// @noImplicitReferences: true
// @filename: node_modules/ext/package.json
{
    "name": "ext",
    "version": "1.0.0",
    "types": "index",
    "typesVersions": {
        "3.0": "ts3.0"
    }
}

// @filename: node_modules/ext/index.d.ts
declare module "ext" {
    export const a = "default a";
}
declare module "ext/other" {
    export const b = "default b";
}

// @filename: node_modules/ext/ts3.0/index.d.ts
declare module "ext" {
    export const a = "ts3.0 a";
}
declare module "ext/other" {
    export const b = "ts3.0 b";
}

// @filename: main.ts
import { a } from "ext";
import { b } from "ext/other";

const aa: "ts3.0 a" = a;
const bb: "ts3.0 b" = b;

// @filename: tsconfig.json
{}