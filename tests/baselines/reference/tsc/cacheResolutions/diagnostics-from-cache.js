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

//// [/src/project/index.ts]
import * as me from "@this/package";
me.thing()
export function thing(): void {}


//// [/src/project/index2.ts]
export function thing(): void {}


//// [/src/project/package.json]
{"name":"@this/package","type":"module","exports":{".":{"default":"./dist/index.js","types":"./types/index.d.ts"}}}

//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"moduleResolution":"nodenext","outDir":"./dist","declaration":true,"declarationDir":"./types","cacheResolutions":true,"traceResolution":true}}



Output::
/lib/tsc -p /src/project --incremental --explainFiles
Found 'package.json' at '/src/project/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module '@this/package' from '/src/project/index.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
File '/src/project/package.json' exists according to earlier cached lookups.
File '/src/project/index.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/index.ts', result '/src/project/index.ts'.
======== Module name '@this/package' was successfully resolved to '/src/project/index.ts'. ========
File '/src/project/package.json' exists according to earlier cached lookups.
File '/src/project/package.json' exists according to earlier cached lookups.
File '/lib/package.json' does not exist.
File '/package.json' does not exist.
[91merror[0m[90m TS2209: [0mThe project root is ambiguous, but is required to resolve export map entry '.' in file '/src/project/package.json'. Supply the `rootDir` compiler option to disambiguate.

lib/lib.d.ts
  Default library for target 'es3'
src/project/index.ts
  Matched by default include pattern '**/*'
  Imported via "@this/package" from file 'src/project/index.ts'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"
src/project/index2.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"
src/project/randomFileForImport.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/dist/index.js]
"use strict";
exports.__esModule = true;
exports.thing = void 0;
var me = require("@this/package");
me.thing();
function thing() { }
exports.thing = thing;


//// [/src/project/dist/index2.js]
"use strict";
exports.__esModule = true;
exports.thing = void 0;
function thing() { }
exports.thing = thing;


//// [/src/project/dist/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../index.ts","../index2.ts","../randomfileforimport.ts","..","../package.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"5618920854-import * as me from \"@this/package\";\nme.thing()\nexport function thing(): void {}\n","signature":"-4018078458-export declare function thing(): void;\r\n","impliedFormat":99},{"version":"5871974342-export function thing(): void {}\n","signature":"-4018078458-export declare function thing(): void;\r\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99}],"options":{"cacheResolutions":true,"declaration":true,"declarationDir":"../types","moduleResolution":99,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[2,1]],"exportedModulesMap":[],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true},"affectingLocations":[6],"resolutionDiagnostics":[{"packagePath":6}]}],"names":["@this/package"],"resolutionEntries":[[1,1,99]],"modules":[[5,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../index.ts",
      "../index2.ts",
      "../randomfileforimport.ts",
      "..",
      "../package.json"
    ],
    "fileNamesList": [
      [
        "../index.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../index.ts": {
        "version": "5618920854-import * as me from \"@this/package\";\nme.thing()\nexport function thing(): void {}\n",
        "signature": "-4018078458-export declare function thing(): void;\r\n",
        "impliedFormat": "esnext"
      },
      "../index2.ts": {
        "version": "5871974342-export function thing(): void {}\n",
        "signature": "-4018078458-export declare function thing(): void;\r\n",
        "impliedFormat": "esnext"
      },
      "../randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      }
    },
    "options": {
      "cacheResolutions": true,
      "declaration": true,
      "declarationDir": "../types",
      "moduleResolution": 99,
      "outDir": "./"
    },
    "referencedMap": {
      "../index.ts": [
        "../index.ts"
      ]
    },
    "exportedModulesMap": {},
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "../index.ts",
            "isExternalLibraryImport": true
          },
          "affectingLocations": [
            "../package.json"
          ],
          "resolutionDiagnostics": [
            {
              "packagePath": "../package.json"
            }
          ]
        }
      ],
      "names": [
        "@this/package"
      ],
      "resolutionEntries": [
        [
          "@this/package",
          {
            "resolvedModule": {
              "resolvedFileName": "../index.ts",
              "isExternalLibraryImport": true
            },
            "affectingLocations": [
              "../package.json"
            ],
            "resolutionDiagnostics": [
              {
                "packagePath": "../package.json"
              }
            ]
          },
          "esnext"
        ]
      ],
      "modules": [
        [
          "..",
          [
            [
              "@this/package",
              {
                "resolvedModule": {
                  "resolvedFileName": "../index.ts",
                  "isExternalLibraryImport": true
                },
                "affectingLocations": [
                  "../package.json"
                ],
                "resolutionDiagnostics": [
                  {
                    "packagePath": "../package.json"
                  }
                ]
              },
              "esnext"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1585
}

//// [/src/project/types/index.d.ts]
export declare function thing(): void;


//// [/src/project/types/index2.d.ts]
export declare function thing(): void;


//// [/src/project/types/randomFileForImport.d.ts]
export declare const x = 10;




Change:: modify randomFileForImport by adding import
Input::
//// [/src/project/randomFileForImport.ts]
import * as me from "@this/package";
export const x = 10;



Output::
/lib/tsc -p /src/project --incremental --explainFiles
Found 'package.json' at '/src/project/package.json'.
'package.json' does not have a 'typesVersions' field.
Reusing resolution of module '@this/package' from '/src/project/index.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/index.ts'.
File '/src/project/package.json' exists according to earlier cached lookups.
File '/src/project/package.json' exists according to earlier cached lookups.
Reusing resolution of module '@this/package' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/index.ts'.
File '/lib/package.json' does not exist.
File '/package.json' does not exist.
[91merror[0m[90m TS2209: [0mThe project root is ambiguous, but is required to resolve export map entry '.' in file '/src/project/package.json'. Supply the `rootDir` compiler option to disambiguate.

lib/lib.d.ts
  Default library for target 'es3'
src/project/index.ts
  Matched by default include pattern '**/*'
  Imported via "@this/package" from file 'src/project/index.ts'
  Imported via "@this/package" from file 'src/project/randomFileForImport.ts'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"
src/project/index2.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"
src/project/randomFileForImport.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/dist/randomFileForImport.js] file written with same contents
//// [/src/project/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../index.ts","../index2.ts","../randomfileforimport.ts","..","../package.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"5618920854-import * as me from \"@this/package\";\nme.thing()\nexport function thing(): void {}\n","signature":"-4018078458-export declare function thing(): void;\r\n","impliedFormat":99},{"version":"5871974342-export function thing(): void {}\n","signature":"-4018078458-export declare function thing(): void;\r\n","impliedFormat":99},{"version":"4314805146-import * as me from \"@this/package\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n","impliedFormat":99}],"options":{"cacheResolutions":true,"declaration":true,"declarationDir":"../types","moduleResolution":99,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[2,1],[4,1]],"exportedModulesMap":[],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true},"affectingLocations":[6],"resolutionDiagnostics":[{"packagePath":6}]}],"names":["@this/package"],"resolutionEntries":[[1,1,99]],"modules":[[5,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../index.ts",
      "../index2.ts",
      "../randomfileforimport.ts",
      "..",
      "../package.json"
    ],
    "fileNamesList": [
      [
        "../index.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../index.ts": {
        "version": "5618920854-import * as me from \"@this/package\";\nme.thing()\nexport function thing(): void {}\n",
        "signature": "-4018078458-export declare function thing(): void;\r\n",
        "impliedFormat": "esnext"
      },
      "../index2.ts": {
        "version": "5871974342-export function thing(): void {}\n",
        "signature": "-4018078458-export declare function thing(): void;\r\n",
        "impliedFormat": "esnext"
      },
      "../randomfileforimport.ts": {
        "version": "4314805146-import * as me from \"@this/package\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n",
        "impliedFormat": "esnext"
      }
    },
    "options": {
      "cacheResolutions": true,
      "declaration": true,
      "declarationDir": "../types",
      "moduleResolution": 99,
      "outDir": "./"
    },
    "referencedMap": {
      "../index.ts": [
        "../index.ts"
      ],
      "../randomfileforimport.ts": [
        "../index.ts"
      ]
    },
    "exportedModulesMap": {},
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "../index.ts",
            "isExternalLibraryImport": true
          },
          "affectingLocations": [
            "../package.json"
          ],
          "resolutionDiagnostics": [
            {
              "packagePath": "../package.json"
            }
          ]
        }
      ],
      "names": [
        "@this/package"
      ],
      "resolutionEntries": [
        [
          "@this/package",
          {
            "resolvedModule": {
              "resolvedFileName": "../index.ts",
              "isExternalLibraryImport": true
            },
            "affectingLocations": [
              "../package.json"
            ],
            "resolutionDiagnostics": [
              {
                "packagePath": "../package.json"
              }
            ]
          },
          "esnext"
        ]
      ],
      "modules": [
        [
          "..",
          [
            [
              "@this/package",
              {
                "resolvedModule": {
                  "resolvedFileName": "../index.ts",
                  "isExternalLibraryImport": true
                },
                "affectingLocations": [
                  "../package.json"
                ],
                "resolutionDiagnostics": [
                  {
                    "packagePath": "../package.json"
                  }
                ]
              },
              "esnext"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1629
}

//// [/src/project/types/randomFileForImport.d.ts] file written with same contents
