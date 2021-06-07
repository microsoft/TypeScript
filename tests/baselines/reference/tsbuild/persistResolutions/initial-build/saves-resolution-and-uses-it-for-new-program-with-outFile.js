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

//// [/src/project/node_modules/@types/someType/index.d.ts]
export function someType(): number;

//// [/src/project/src/anotherFileReusingResolution.ts]
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";

//// [/src/project/src/externalThing.d.ts]
export function externalThing1(): number;

//// [/src/project/src/filePresent.ts]
export function something() { return 10; }

//// [/src/project/src/fileWithRef.ts]
/// <reference path="./types.ts"/>

//// [/src/project/src/globalAnotherFileWithSameReferenes.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


//// [/src/project/src/globalFilePresent.ts]
function globalSomething() { return 10; }

//// [/src/project/src/globalMain.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }


//// [/src/project/src/main.ts]
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";

//// [/src/project/src/types.ts]
interface SomeType {}

//// [/src/project/tsconfig.json]
{"compilerOptions":{"module":"amd","composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"outFile.js"},"include":["src/**/*.ts"]}



Output::
/lib/tsc --b src/project
======== Resolving module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/filePresent.ts' exist - use it as a name resolution result.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThing.ts' does not exist.
File '/src/project/src/externalThing.tsx' does not exist.
File '/src/project/src/externalThing.d.ts' exist - use it as a name resolution result.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving module './filePresent' from '/src/project/src/main.ts'. ========
Resolution for module './filePresent' was found in cache from location '/src/project/src'.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThing' was found in cache from location '/src/project/src'.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalMain.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 6 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[13,14,15,16,17]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"failedLookupLocations":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[10,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/globalfilenotfound.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 4844
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalMain.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 6 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo] file written with same contents
//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: Modify globalMain file
Input::
//// [/src/project/src/globalMain.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalMain.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 6 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[13,14,15,16,17]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"failedLookupLocations":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[10,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/globalfilenotfound.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 4861
}



Change:: Add new globalFile and update globalMain file
Input::
//// [/src/project/src/globalMain.ts]
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();globalFoo();

//// [/src/project/src/globalNewFile.ts]
function globalFoo() { return 20; }



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/globalMain.ts[0m:[93m3[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/globalFileNotFound.ts' not found.

[7m3[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 6 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,13],[7,9,13]],"referencedMap":[[4,1],[6,2],[8,3],[10,4],[11,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[11,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/globalfilenotfound.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalnewfile.ts",
        "./src/globalfilenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalnewfile.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5059
}



Change:: Write file that could not be resolved by referenced path
Input::
//// [/src/project/src/globalFileNotFound.ts]
function globalSomething2() { return 20; }



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5171
}



Change:: Clean resolutions
Input::


Output::
/lib/tsc --b src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[]},"version":"FakeTSVersion"}



Change:: Clean resolutions again
Input::


Output::
/lib/tsc --b src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success




Change:: no-change-run
Input::


Output::
/lib/tsc --b src/project
======== Resolving module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/filePresent.ts' exist - use it as a name resolution result.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThing.ts' does not exist.
File '/src/project/src/externalThing.tsx' does not exist.
File '/src/project/src/externalThing.d.ts' exist - use it as a name resolution result.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving module './filePresent' from '/src/project/src/main.ts'. ========
Resolution for module './filePresent' was found in cache from location '/src/project/src'.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThing' was found in cache from location '/src/project/src'.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: Modify globalMain file
Input::
//// [/src/project/src/globalMain.ts]
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();globalFoo();globalSomething();



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5189
}



Change:: Modify main file
Input::
//// [/src/project/src/main.ts]
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";something();



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5201
}



Change:: Add new module and update main file
Input::
//// [/src/project/src/main.ts]
import { foo } from "./newFile";import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";something();

//// [/src/project/src/newFile.ts]
export function foo() { return 20; }



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' does not exist.
File '/src/project/src/fileNotFound.tsx' does not exist.
File '/src/project/src/fileNotFound.d.ts' does not exist.
File '/src/project/src/fileNotFound.js' does not exist.
File '/src/project/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './newFile' from '/src/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/newFile.ts' exist - use it as a name resolution result.
======== Module name './newFile' was successfully resolved to '/src/project/src/newFile.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[15,16,17,18,19]},{"resolvedModule":{"resolvedFileName":20,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":21,"extension":".d.ts"},"failedLookupLocations":[22,23]},{"failedLookupLocations":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]},{"resolvedModule":{"resolvedFileName":56,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[4,[1,2,3,4]],[13,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5441
}



Change:: Write file that could not be resolved
Input::
//// [/src/project/src/fileNotFound.ts]
export function something2() { return 20; }



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' exist - use it as a name resolution result.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]},{"resolvedModule":{"resolvedFileName":53,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5475
}



Change:: Clean resolutions
Input::


Output::
/lib/tsc --b src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[]},"version":"FakeTSVersion"}



Change:: Clean resolutions again
Input::


Output::
/lib/tsc --b src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success




Change:: no-change-run
Input::


Output::
/lib/tsc --b src/project
======== Resolving module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/filePresent.ts' exist - use it as a name resolution result.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' exist - use it as a name resolution result.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThing.ts' does not exist.
File '/src/project/src/externalThing.tsx' does not exist.
File '/src/project/src/externalThing.d.ts' exist - use it as a name resolution result.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving module './newFile' from '/src/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/newFile.ts' exist - use it as a name resolution result.
======== Module name './newFile' was successfully resolved to '/src/project/src/newFile.ts'. ========
======== Resolving module './filePresent' from '/src/project/src/main.ts'. ========
Resolution for module './filePresent' was found in cache from location '/src/project/src'.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThing' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThing' was found in cache from location '/src/project/src'.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]},{"resolvedModule":{"resolvedFileName":53,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: Modify main file
Input::
//// [/src/project/src/main.ts]
import { foo } from "./newFile";import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";something();something();



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]},{"resolvedModule":{"resolvedFileName":53,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5487
}



Change:: Delete file that could not be resolved
Input::
//// [/src/project/src/fileNotFound.ts] unlink


Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":15,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".d.ts"},"failedLookupLocations":[18,19]},{"failedLookupLocations":[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]},{"resolvedModule":{"resolvedFileName":52,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[4,[1,2,3,4]],[13,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5371
}



Change:: Write file that could not be resolved
Input::
//// [/src/project/src/fileNotFound.ts]
export function something2() { return 20; }



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' does not exist.
File '/src/project/src/externalThingNotPresent.tsx' does not exist.
File '/src/project/src/externalThingNotPresent.d.ts' does not exist.
File '/src/project/externalThingNotPresent.ts' does not exist.
File '/src/project/externalThingNotPresent.tsx' does not exist.
File '/src/project/externalThingNotPresent.d.ts' does not exist.
File '/src/externalThingNotPresent.ts' does not exist.
File '/src/externalThingNotPresent.tsx' does not exist.
File '/src/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/src/project/src/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/src/externalThingNotPresent.js' does not exist.
File '/src/project/src/externalThingNotPresent.jsx' does not exist.
File '/src/project/externalThingNotPresent.js' does not exist.
File '/src/project/externalThingNotPresent.jsx' does not exist.
File '/src/externalThingNotPresent.js' does not exist.
File '/src/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/project/src/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.d.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]},{"resolvedModule":{"resolvedFileName":53,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "failedLookupLocations": [
              "./src/externalThingNotPresent.ts",
              "./src/externalThingNotPresent.tsx",
              "./src/externalThingNotPresent.d.ts",
              "./externalThingNotPresent.ts",
              "./externalThingNotPresent.tsx",
              "./externalThingNotPresent.d.ts",
              "../externalThingNotPresent.ts",
              "../externalThingNotPresent.tsx",
              "../externalThingNotPresent.d.ts",
              "../../externalThingNotPresent.ts",
              "../../externalThingNotPresent.tsx",
              "../../externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/package.json",
              "./src/node_modules/@types/externalThingNotPresent.d.ts",
              "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
              "./node_modules/@types/externalThingNotPresent/package.json",
              "./node_modules/@types/externalThingNotPresent.d.ts",
              "./node_modules/@types/externalThingNotPresent/index.d.ts",
              "../node_modules/@types/externalThingNotPresent/package.json",
              "../node_modules/@types/externalThingNotPresent.d.ts",
              "../node_modules/@types/externalThingNotPresent/index.d.ts",
              "../../node_modules/@types/externalThingNotPresent/package.json",
              "../../node_modules/@types/externalThingNotPresent.d.ts",
              "../../node_modules/@types/externalThingNotPresent/index.d.ts",
              "./src/externalThingNotPresent.js",
              "./src/externalThingNotPresent.jsx",
              "./externalThingNotPresent.js",
              "./externalThingNotPresent.jsx",
              "../externalThingNotPresent.js",
              "../externalThingNotPresent.jsx",
              "../../externalThingNotPresent.js",
              "../../externalThingNotPresent.jsx"
            ]
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5487
}



Change:: Create external module file that could not be resolved
Input::
//// [/src/project/src/externalThingNotPresent.ts]
export function externalThing2() { return 20; }



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' exist - use it as a name resolution result.
======== Module name 'externalThingNotPresent' was successfully resolved to '/src/project/src/externalThingNotPresent.ts'. ========
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was successfully resolved to '/src/project/src/externalThingNotPresent.ts'. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
exitCode:: ExitStatus.Success
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.d.ts","/src/project/src/externalThingNotPresent.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.d.ts
/src/project/src/externalThingNotPresent.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1909,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":674,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"5318862050-export function externalThing2() { return 20; }","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4,5],[7],[9,10],[9,10,12],[2,3,4,5,14]],"referencedMap":[[6,1],[8,2],[11,3],[13,4],[15,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"resolvedModule":{"resolvedFileName":22,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":23,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[15,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-1909)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-674)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1909,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 674,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThingNotPresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 4706
}



Change:: Write .ts file that takes preference over resolved .d.ts file
Input::
//// [/src/project/src/externalThing.ts]
export function externalThing1() { return 10; }



Output::
/lib/tsc --b src/project
Reusing resolution of module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/src/project/src/externalThingNotPresent.ts'.
Reusing resolution of module './newFile' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/src/project/src/main.ts' of old program, it was successfully resolved to '/src/project/src/externalThingNotPresent.ts'.
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
exitCode:: ExitStatus.Success
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.ts","/src/project/src/externalThingNotPresent.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.d.ts
/src/project/src/externalThingNotPresent.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/externalThing.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
declare module "src/externalThing" {
    export function externalThing1(): number;
}
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("src/externalThing", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/externalThing.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":2178,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":762,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/externalthing.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"5318862050-export function externalThing2() { return 20; }","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"5618215488-export function externalThing1() { return 10; }","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4,5],[8],[10,11],[10,11,13],[2,3,4,5,15]],"referencedMap":[[6,1],[9,2],[12,3],[14,4],[16,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"resolvedModule":{"resolvedFileName":23,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":24,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[16,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-2178)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("src/externalThing", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-762)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
declare module "src/externalThing" {
    export function externalThing1(): number;
}
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/externalThing.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 2178,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 762,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/externalthing.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/externalthing.ts": {
        "version": "5618215488-export function externalThing1() { return 10; }"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThingNotPresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          }
        ],
        [
          "externalThingNotPresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 4849
}



Change:: Delete tsbuildinfo file and do clean build
Input::
//// [/src/project/outFile.tsbuildinfo] unlink


Output::
/lib/tsc --b src/project
======== Resolving module './filePresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/filePresent.ts' exist - use it as a name resolution result.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/fileNotFound.ts' exist - use it as a name resolution result.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThing' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThing.ts' exist - use it as a name resolution result.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/externalThingNotPresent.ts' exist - use it as a name resolution result.
======== Module name 'externalThingNotPresent' was successfully resolved to '/src/project/src/externalThingNotPresent.ts'. ========
======== Resolving module './newFile' from '/src/project/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/src/newFile.ts' exist - use it as a name resolution result.
======== Module name './newFile' was successfully resolved to '/src/project/src/newFile.ts'. ========
======== Resolving module './filePresent' from '/src/project/src/main.ts'. ========
Resolution for module './filePresent' was found in cache from location '/src/project/src'.
======== Module name './filePresent' was successfully resolved to '/src/project/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/src/project/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/src/project/src'.
======== Module name './fileNotFound' was successfully resolved to '/src/project/src/fileNotFound.ts'. ========
======== Resolving module 'externalThing' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThing' was found in cache from location '/src/project/src'.
======== Module name 'externalThing' was successfully resolved to '/src/project/src/externalThing.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/src/project/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/src/project/src'.
======== Module name 'externalThingNotPresent' was successfully resolved to '/src/project/src/externalThingNotPresent.ts'. ========
======== Resolving type reference directive 'someType', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/someType/package.json' does not exist.
File '/src/project/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/someType/index.d.ts', result '/src/project/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/src/project/node_modules/@types/someType/index.d.ts', primary: true. ========
exitCode:: ExitStatus.Success
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.ts","/src/project/src/externalThingNotPresent.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/src/project/outFile.js","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/externalThing.ts
/src/project/src/externalThingNotPresent.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/types.ts
/src/project/src/fileWithRef.ts
/src/project/src/globalFilePresent.ts
/src/project/src/globalFileNotFound.ts
/src/project/src/globalAnotherFileWithSameReferenes.ts
/src/project/src/globalNewFile.ts
/src/project/src/globalMain.ts
/src/project/src/newFile.ts
/src/project/src/main.ts
/src/project/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::


//// [/src/project/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThing" {
    export function externalThing1(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/src/project/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThing", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});


//// [/src/project/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThing.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":2178,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":762,"kind":"text"}]}},"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.ts","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5618215488-export function externalThing1() { return 10; }","signature":false},{"version":"5318862050-export function externalThing2() { return 20; }","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4,5],[7],[9,10],[9,10,12],[2,3,4,5,14]],"referencedMap":[[6,1],[8,2],[11,3],[13,4],[15,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":21,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[15,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project/outFile.js
----------------------------------------------------------------------
text: (0-2178)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThing", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /src/project/outFile.d.ts
----------------------------------------------------------------------
text: (0-762)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThing" {
    export function externalThing1(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/externalThing.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 2178,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 762,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.ts",
      "./src/externalThingNotPresent.ts",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.ts",
        "./src/externalthingnotpresent.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.ts": {
        "version": "5618215488-export function externalThing1() { return 10; }"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.ts",
        "./src/externalthingnotpresent.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThingNotPresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
        [
          "./fileNotFound",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThing",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "externalThingNotPresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.ts",
              "extension": ".ts"
            }
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.ts",
              "extension": ".ts"
            }
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 4648
}



Change:: Install another type and program is not created because its not listed file in tsconfig
Input::
//// [/src/project/node_modules/@types/someType2/index.d.ts]
export function someType2(): number;



Output::
/lib/tsc --b src/project
exitCode:: ExitStatus.Success




Change:: Delete existing type and program is not created because its not listed file in tsconfig
Input::
//// [/src/project/node_modules/@types/someType] unlink


Output::
/lib/tsc --b src/project
exitCode:: ExitStatus.Success


