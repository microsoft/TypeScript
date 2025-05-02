currentDirectory:: /Users/name/projects/web useCaseSensitiveFileNames:: false
Input::
//// [/Users/name/projects/web/package.json]
{
  "name": "@this/package",
  "type": "module",
  "exports": {
    ".": "./dist/index.js"
  }
}

//// [/Users/name/projects/web/index.ts]
import * as me from "@this/package";
me.thing();
export function thing(): void {}


//// [/Users/name/projects/web/tsconfig.json]
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./dist",
    "declarationDir": "./types",
    "composite": true,
    "forceConsistentCasingInFileNames": true,
    "traceResolution": true
  }
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


/home/src/tslibs/TS/Lib/tsc.js -w --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Found 'package.json' at '/Users/name/projects/web/package.json'.
======== Resolving module '@this/package' from '/Users/name/projects/web/index.ts'. ========
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/Users/name/projects/web/package.json' exists according to earlier cached lookups.
Using 'exports' subpath '.' with target './dist/index.js'.
File '/Users/name/projects/web/index.ts' exists - use it as a name resolution result.
======== Module name '@this/package' was successfully resolved to '/Users/name/projects/web/index.ts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
index.ts
  Matched by default include pattern '**/*'
  Imported via "@this/package" from file 'index.ts'
  File is ECMAScript module because 'package.json' has field "type" with value "module"
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*

//// [/Users/name/projects/web/dist/index.js]
import * as me from "@this/package";
me.thing();
export function thing() { }


//// [/Users/name/projects/web/types/index.d.ts]
export declare function thing(): void;


//// [/Users/name/projects/web/dist/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.esnext.full.d.ts","../index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"14361483761-import * as me from \"@this/package\";\nme.thing();\nexport function thing(): void {}\n","signature":"-2724770439-export declare function thing(): void;\n","impliedFormat":99}],"root":[2],"options":{"composite":true,"declarationDir":"../types","module":199,"outDir":"./"},"referencedMap":[[2,1]],"latestChangedDtsFile":"../types/index.d.ts","version":"FakeTSVersion"}

//// [/Users/name/projects/web/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.esnext.full.d.ts",
    "../index.ts"
  ],
  "fileIdsList": [
    [
      "../index.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.esnext.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../index.ts": {
      "original": {
        "version": "14361483761-import * as me from \"@this/package\";\nme.thing();\nexport function thing(): void {}\n",
        "signature": "-2724770439-export declare function thing(): void;\n",
        "impliedFormat": 99
      },
      "version": "14361483761-import * as me from \"@this/package\";\nme.thing();\nexport function thing(): void {}\n",
      "signature": "-2724770439-export declare function thing(): void;\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      2,
      "../index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declarationDir": "../types",
    "module": 199,
    "outDir": "./"
  },
  "referencedMap": {
    "../index.ts": [
      "../index.ts"
    ]
  },
  "latestChangedDtsFile": "../types/index.d.ts",
  "version": "FakeTSVersion",
  "size": 1011
}


PolledWatches::
/Users/name/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/Users/name/projects/web/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/Users/name/projects/web/index.ts: *new*
  {}
/Users/name/projects/web/package.json: *new*
  {}
/Users/name/projects/web/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts: *new*
  {}

FsWatchesRecursive::
/Users/name/projects/web: *new*
  {}

Program root files: [
  "/Users/name/projects/web/index.ts"
]
Program options: {
  "module": 199,
  "outDir": "/Users/name/projects/web/dist",
  "declarationDir": "/Users/name/projects/web/types",
  "composite": true,
  "forceConsistentCasingInFileNames": true,
  "traceResolution": true,
  "watch": true,
  "explainFiles": true,
  "configFilePath": "/Users/name/projects/web/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
/Users/name/projects/web/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
/Users/name/projects/web/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.esnext.full.d.ts (used version)
/users/name/projects/web/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined
