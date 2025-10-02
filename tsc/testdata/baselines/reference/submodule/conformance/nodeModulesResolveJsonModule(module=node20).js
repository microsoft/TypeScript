//// [tests/cases/conformance/node/nodeModulesResolveJsonModule.ts] ////

//// [index.ts]
import pkg from "./package.json" with { type: "json" };
export const name = pkg.name;
import * as ns from "./package.json" with { type: "json" };
export const thing = ns;
export const name2 = ns.default.name;
//// [index.cts]
import pkg from "./package.json";
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
//// [index.mts]
import pkg from "./package.json" with { type: "json" };
export const name = pkg.name;
import * as ns from "./package.json" with { type: "json" };
export const thing = ns;
export const name2 = ns.default.name;
//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "type": "module",
    "default": "misedirection"
}

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "type": "module",
    "default": "misedirection"
}
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name2 = exports.thing = exports.name = void 0;
const package_json_1 = require("./package.json");
exports.name = package_json_1.default.name;
const ns = require("./package.json");
exports.thing = ns;
exports.name2 = ns.default.name;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name2 = exports.thing = exports.name = void 0;
const package_json_1 = require("./package.json");
exports.name = package_json_1.default.name;
const ns = require("./package.json");
exports.thing = ns;
exports.name2 = ns.default.name;
//// [index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name2 = exports.thing = exports.name = void 0;
const package_json_1 = require("./package.json");
exports.name = package_json_1.default.name;
const ns = require("./package.json");
exports.thing = ns;
exports.name2 = ns.default.name;


//// [index.d.ts]
export declare const name: string;
export declare const thing: {
    name: string;
    version: string;
    type: string;
    default: string;
};
export declare const name2: any;
//// [index.d.cts]
export declare const name: string;
export declare const thing: {
    name: string;
    version: string;
    type: string;
    default: string;
};
export declare const name2: any;
//// [index.d.mts]
export declare const name: string;
export declare const thing: {
    default: {
        name: string;
        version: string;
        type: string;
        default: string;
    };
};
export declare const name2: string;
