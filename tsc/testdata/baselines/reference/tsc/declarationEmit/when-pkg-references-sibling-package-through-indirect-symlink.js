currentDirectory::/user/username/projects/myproject
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/myproject/pkg1/dist/index.d.ts] *new* 
export * from './types';
//// [/user/username/projects/myproject/pkg1/dist/types.d.ts] *new* 
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
//// [/user/username/projects/myproject/pkg1/package.json] *new* 
{
    "name": "@raymondfeng/pkg1",
    "version": "1.0.0",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}
//// [/user/username/projects/myproject/pkg2/dist/index.d.ts] *new* 
export * from './types';
//// [/user/username/projects/myproject/pkg2/dist/types.d.ts] *new* 
export {MetadataAccessor} from '@raymondfeng/pkg1';
//// [/user/username/projects/myproject/pkg2/node_modules/@raymondfeng/pkg1] -> /user/username/projects/myproject/pkg1 *new*
//// [/user/username/projects/myproject/pkg2/package.json] *new* 
{
    "name": "@raymondfeng/pkg2",
    "version": "1.0.0",
    "main": "dist/index.js",
    "typings": "dist/index.d.ts"
}
//// [/user/username/projects/myproject/pkg3/node_modules/@raymondfeng/pkg2] -> /user/username/projects/myproject/pkg2 *new*
//// [/user/username/projects/myproject/pkg3/src/index.ts] *new* 
export * from './keys';
//// [/user/username/projects/myproject/pkg3/src/keys.ts] *new* 
import {MetadataAccessor} from "@raymondfeng/pkg2";
export const ADMIN = MetadataAccessor.create<boolean>('1');
//// [/user/username/projects/myproject/pkg3/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "dist",
        "rootDir": "src",
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "declaration": true,
    },
}

tsgo -p pkg3 --explainFiles
ExitStatus:: Success
Output::
../../../../home/src/tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
pkg1/dist/types.d.ts
   Imported via './types' from file 'pkg1/dist/index.d.ts'
pkg1/dist/index.d.ts
   Imported via '@raymondfeng/pkg1' from file 'pkg2/dist/types.d.ts' with packageId '@raymondfeng/pkg1@1.0.0'
pkg2/dist/types.d.ts
   Imported via './types' from file 'pkg2/dist/index.d.ts'
pkg2/dist/index.d.ts
   Imported via "@raymondfeng/pkg2" from file 'pkg3/src/keys.ts' with packageId '@raymondfeng/pkg2@1.0.0'
pkg3/src/keys.ts
   Imported via './keys' from file 'pkg3/src/index.ts'
   Matched by default include pattern '**/*'
pkg3/src/index.ts
   Matched by default include pattern '**/*'
//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/user/username/projects/myproject/pkg2/node_modules/@raymondfeng/pkg1] *deleted*
//// [/user/username/projects/myproject/pkg3/dist/index.d.ts] *new* 
export * from './keys';

//// [/user/username/projects/myproject/pkg3/dist/index.js] *new* 
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./keys"), exports);

//// [/user/username/projects/myproject/pkg3/dist/keys.d.ts] *new* 
import { MetadataAccessor } from "@raymondfeng/pkg2";
export declare const ADMIN: MetadataAccessor<boolean, import("../../pkg1/dist").IdType>;

//// [/user/username/projects/myproject/pkg3/dist/keys.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN = void 0;
const pkg2_1 = require("@raymondfeng/pkg2");
exports.ADMIN = pkg2_1.MetadataAccessor.create('1');

//// [/user/username/projects/myproject/pkg3/node_modules/@raymondfeng/pkg2] *deleted*

