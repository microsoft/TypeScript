//// [tests/cases/compiler/symlinkedWorkspaceDependenciesNoDirectLinkGeneratesDeepNonrelativeName.ts] ////

//// [foo.d.ts]
export declare class Foo {
    private f: any;
}
//// [index.d.ts]
import { Foo } from "./foo.js";
export function create(): Foo;
//// [package.json]
{
    "name": "package-a",
    "version": "0.0.1",
    "exports": {
        ".": "./index.js",
        "./cls": "./foo.js"
    }
}
//// [package.json]
{
    "private": true,
    "dependencies": {
        "package-a": "file:../packageA"
    }
}
//// [index.d.ts]
import { create } from "package-a";
export declare function invoke(): ReturnType<typeof create>;
//// [package.json]
{
    "private": true,
    "dependencies": {
        "package-b": "file:../packageB",
        "package-a": "file:../packageA"
    }
}
//// [index.ts]
import * as pkg from "package-b";

export const a = pkg.invoke();

//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const pkg = __importStar(require("package-b"));
exports.a = pkg.invoke();


//// [index.d.ts]
export declare const a: import("package-a/cls").Foo;
