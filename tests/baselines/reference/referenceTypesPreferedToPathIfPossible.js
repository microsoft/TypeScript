//// [tests/cases/compiler/referenceTypesPreferedToPathIfPossible.ts] ////

//// [index.d.ts]
declare module "url" {
    export class Url {}
    export function parse(): Url; 
}
//// [usage.ts]
import { parse } from "url";
export const thing = () => parse();


//// [usage.js]
"use strict";
exports.__esModule = true;
var url_1 = require("url");
exports.thing = function () { return url_1.parse(); };


//// [usage.d.ts]
/// <reference types="node" />
export declare const thing: () => import("url").Url;
