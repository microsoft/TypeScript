currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myProject/pkg1/dist/index.d.ts]
export * from './types';

//// [/user/username/projects/myProject/pkg1/dist/types.d.ts]
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

//// [/user/username/projects/myProject/pkg1/package.json]
{
  "name": "@raymondfeng/pkg1",
  "version": "1.0.0",
  "main": "dist/index.js",
  "typings": "dist/index.d.ts"
}

//// [/user/username/projects/myproject/pkg2/dist/index.d.ts]
export * from './types';

//// [/user/username/projects/myproject/pkg2/dist/types.d.ts]
export {MetadataAccessor} from '@raymondfeng/pkg1';

//// [/user/username/projects/myproject/pkg2/package.json]
{
  "name": "@raymondfeng/pkg2",
  "version": "1.0.0",
  "main": "dist/index.js",
  "typings": "dist/index.d.ts"
}

//// [/user/username/projects/myproject/pkg3/src/index.ts]
export * from './keys';

//// [/user/username/projects/myproject/pkg3/src/keys.ts]
import {MetadataAccessor} from "@raymondfeng/pkg2";
export const ADMIN = MetadataAccessor.create<boolean>('1');

//// [/user/username/projects/myproject/pkg3/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "declaration": true
  }
}

//// [/user/username/projects/myProject/pkg2/node_modules/@raymondfeng/pkg1] symlink(/user/username/projects/myProject/pkg1)

//// [/user/username/projects/myproject/pkg3/node_modules/@raymondfeng/pkg2] symlink(/user/username/projects/myproject/pkg2)

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -p pkg3 --explainFiles
Output::
[96mpkg3/src/keys.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2742: [0mThe inferred type of 'ADMIN' cannot be named without a reference to '../../pkg2/node_modules/@raymondfeng/pkg1/dist'. This is likely not portable. A type annotation is necessary.

[7m2[0m export const ADMIN = MetadataAccessor.create<boolean>('1');
[7m [0m [91m             ~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
pkg1/dist/types.d.ts
  Imported via './types' from file 'pkg1/dist/index.d.ts'
pkg1/dist/index.d.ts
  Imported via '@raymondfeng/pkg1' from file 'pkg2/dist/types.d.ts' with packageId '@raymondfeng/pkg1/dist/index.d.ts@1.0.0'
pkg2/dist/types.d.ts
  Imported via './types' from file 'pkg2/dist/index.d.ts'
pkg2/dist/index.d.ts
  Imported via "@raymondfeng/pkg2" from file 'pkg3/src/keys.ts' with packageId '@raymondfeng/pkg2/dist/index.d.ts@1.0.0'
pkg3/src/keys.ts
  Imported via './keys' from file 'pkg3/src/index.ts'
  Matched by default include pattern '**/*'
pkg3/src/index.ts
  Matched by default include pattern '**/*'

Found 1 error in pkg3/src/keys.ts[90m:2[0m



//// [/user/username/projects/myproject/pkg3/dist/keys.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN = void 0;
var pkg2_1 = require("@raymondfeng/pkg2");
exports.ADMIN = pkg2_1.MetadataAccessor.create('1');


//// [/user/username/projects/myproject/pkg3/dist/index.js]
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


//// [/user/username/projects/myproject/pkg3/dist/index.d.ts]
export * from './keys';



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
