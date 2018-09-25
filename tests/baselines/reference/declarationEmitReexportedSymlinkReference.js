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
var pkg2_1 = require("@raymondfeng/pkg2");
exports.ADMIN = pkg2_1.MetadataAccessor.create('1');
//// [index.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./keys"));


//// [keys.d.ts]
import { MetadataAccessor } from "@raymondfeng/pkg2";
export declare const ADMIN: MetadataAccessor<boolean, import("@raymondfeng/pkg2").IdType>;
//// [index.d.ts]
export * from './keys';
