Input::
//// [/lib/lib.d.ts]
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

//// [/src/project/lib/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/src/project/main.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"paths":{"*":["./lib/*"]},"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["main.ts","randomFileForImport.ts"]}



Output::
/lib/tsc -p /src/project --explainFiles
======== Resolving module 'pkg0' from '/src/project/main.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
'paths' option is specified, looking for a pattern to match module name 'pkg0'.
Module name 'pkg0', matched pattern '*'.
Trying substitution './lib/*', candidate module location: './lib/pkg0'.
Loading module as file / folder, candidate module location '/src/project/lib/pkg0', target file type 'TypeScript'.
File '/src/project/lib/pkg0.ts' does not exist.
File '/src/project/lib/pkg0.tsx' does not exist.
File '/src/project/lib/pkg0.d.ts' does not exist.
File '/src/project/lib/pkg0/package.json' does not exist.
File '/src/project/lib/pkg0/index.ts' does not exist.
File '/src/project/lib/pkg0/index.tsx' does not exist.
File '/src/project/lib/pkg0/index.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/lib/pkg0/index.d.ts'. ========
lib/lib.d.ts
  Default library for target 'es3'
src/project/lib/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/main.ts'
src/project/main.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/project/main.d.ts]
export {};


//// [/src/project/main.js]
"use strict";
exports.__esModule = true;


//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./lib/pkg0/index.d.ts","./main.ts","./randomfileforimport.ts","./"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-4882119183-export {};\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"paths":{"*":["./lib/*"]},"pathsBasePath":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[5,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./lib/pkg0/index.d.ts",
      "./main.ts",
      "./randomfileforimport.ts",
      "./"
    ],
    "fileNamesList": [
      [
        "./lib/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./lib/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./main.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "paths": {
        "*": [
          "./lib/*"
        ]
      },
      "pathsBasePath": "./"
    },
    "referencedMap": {
      "./main.ts": [
        "./lib/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./lib/pkg0/index.d.ts",
      "./main.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./lib/pkg0/index.d.ts"
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./lib/pkg0/index.d.ts"
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./lib/pkg0/index.d.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1310
}



Change:: modify randomFileForImport by adding import
Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/main.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/lib/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/lib/pkg0/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/lib/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/main.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
src/project/main.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/project/randomFileForImport.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./lib/pkg0/index.d.ts","./main.ts","./randomfileforimport.ts","./"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-4882119183-export {};\r\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"paths":{"*":["./lib/*"]},"pathsBasePath":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[5,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./lib/pkg0/index.d.ts",
      "./main.ts",
      "./randomfileforimport.ts",
      "./"
    ],
    "fileNamesList": [
      [
        "./lib/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./lib/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./main.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "paths": {
        "*": [
          "./lib/*"
        ]
      },
      "pathsBasePath": "./"
    },
    "referencedMap": {
      "./main.ts": [
        "./lib/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./lib/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./lib/pkg0/index.d.ts",
      "./main.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./lib/pkg0/index.d.ts"
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./lib/pkg0/index.d.ts"
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./lib/pkg0/index.d.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1364
}

