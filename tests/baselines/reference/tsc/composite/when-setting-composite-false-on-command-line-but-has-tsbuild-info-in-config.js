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


/home/src/tslibs/TS/Lib/tsc.js --composite false
Output::
[96mtsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS5111: [0mOption 'tsBuildInfoFile' cannot be specified without specifying option 'incremental' or 'composite' or if not running 'tsc -b'.

[7m6[0m     "tsBuildInfoFile": "tsconfig.json.tsbuildinfo"
[7m [0m [91m    ~~~~~~~~~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:6[0m



//// [/home/src/workspaces/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
