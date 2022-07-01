Input::
//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true,"preserveSymlinks":false},"files":["main.ts","randomFileForImport.ts"]}

//// [/src/project/main.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/lib/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/src/project/node_modules/pkg0/index.d.ts] symlink(/src/project/lib/pkg0/index.d.ts)
//// [/a/lib/lib.d.ts]
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


/a/lib/tsc.js -p /src/project --explainFiles
Output::
======== Resolving module 'pkg0' from '/src/project/main.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
File '/src/project/node_modules/pkg0/package.json' does not exist.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/lib/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/lib/pkg0/index.d.ts'. ========
a/lib/lib.d.ts
  Default library for target 'es5'
src/project/lib/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/main.ts'
src/project/main.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json


Program root files: ["/src/project/main.ts","/src/project/randomFileForImport.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"preserveSymlinks":false,"project":"/src/project","explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/lib/pkg0/index.d.ts
/src/project/main.ts
/src/project/randomFileForImport.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/src/project/lib/pkg0/index.d.ts
/src/project/main.ts
/src/project/randomFileForImport.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/src/project/lib/pkg0/index.d.ts (used version)
/src/project/main.ts (computed .d.ts during emit)
/src/project/randomfileforimport.ts (computed .d.ts during emit)

File: /src/project/main.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/lib/pkg0/index.d.ts",
    "originalPath": "/src/project/node_modules/pkg0/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true
  },
  "failedLookupLocations": [
    "/src/project/node_modules/pkg0/package.json",
    "/src/project/node_modules/pkg0.ts",
    "/src/project/node_modules/pkg0.tsx",
    "/src/project/node_modules/pkg0.d.ts",
    "/src/project/node_modules/pkg0/index.ts",
    "/src/project/node_modules/pkg0/index.tsx"
  ]
}

PolledWatches::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success

//// [/src/project/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/main.d.ts]
export {};


//// [/src/project/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./lib/pkg0/index.d.ts","./main.ts","./randomfileforimport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./randomFileForImport.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./lib/pkg0/index.d.ts",
      "./main.ts",
      "./randomfileforimport.ts"
    ],
    "fileNamesList": [
      [
        "./lib/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./lib/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./main.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./main.ts": [
        "./lib/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      "./lib/pkg0/index.d.ts",
      "./main.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1032
}

