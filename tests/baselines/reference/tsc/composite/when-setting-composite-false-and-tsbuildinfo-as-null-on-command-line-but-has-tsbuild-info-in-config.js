currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/main.ts]
export const x = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "composite": true,
    "tsBuildInfoFile": "tsconfig.json.tsbuildinfo"
  },
  "include": [
    "src/**/*.ts"
  ]
}

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


/home/src/tslibs/TS/Lib/tsc.js --composite false --tsBuildInfoFile null
Output::


//// [/home/src/workspaces/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;



exitCode:: ExitStatus.Success
