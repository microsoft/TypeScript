//// [tests/cases/compiler/declarationEmitReexportedSymlinkReference.ts] ////

//// [index.d.ts]
export * from './types';
//// [types.d.ts]
export declare type A = {
    id: string;
};
export declare type B = {
    id: number;
};
export declare type IdType = A | B;
export declare class MetadataAccessor<T, D extends IdType = IdType> {
    readonly key: string;
    private constructor();
    toString(): string;
    static create<T, D extends IdType = IdType>(key: string): MetadataAccessor<T, D>;
}
//// [package.json]
{
    "name": "@raymondfeng/pkg1",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}
//// [index.d.ts]
export * from './types';
//// [types.d.ts]
export * from '@raymondfeng/pkg1';
//// [package.json]
{
    "name": "@raymondfeng/pkg2",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}
//// [index.ts]
export * from './keys';
//// [keys.ts]
import {MetadataAccessor} from "@raymondfeng/pkg2";

export const ADMIN = MetadataAccessor.create<boolean>('1');

//// [keys.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN = void 0;
var pkg2_1 = require("@raymondfeng/pkg2");
exports.ADMIN = pkg2_1.MetadataAccessor.create('1');
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./keys"), exports);


//// [keys.d.ts]
import { MetadataAccessor } from "@raymondfeng/pkg2";
export declare const ADMIN: MetadataAccessor<boolean, import("@raymondfeng/pkg2").IdType>;
//// [index.d.ts]
export * from './keys';
