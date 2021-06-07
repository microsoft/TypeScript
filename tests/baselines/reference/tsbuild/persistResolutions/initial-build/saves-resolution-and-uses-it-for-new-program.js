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
{"compilerOptions":{"module":"amd","composite":true,"persistResolutions":true,"traceResolution":true},"include":["src/**/*.ts"]}



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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
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


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"11598859296-export function something() { return 10; }","5686005290-export function externalThing1(): number;","-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",{"version":"-12575322908-interface SomeType {}","affectsGlobalScope":true},"-6085631553-/// <reference path=\"./types.ts\"/>",{"version":"-5627034801-function globalSomething() { return 10; }","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","affectsGlobalScope":true},{"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","affectsGlobalScope":true},"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"semanticDiagnosticsPerFile":[1,11,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,9,[10,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[11,1],[4,1],[3,1],[2,1],[6,1],[8,1],[7,1],[9,1],[10,1],[5,1]],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[13,14,15,16,17]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"failedLookupLocations":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[10,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n",
        "signature": "-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 5714
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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::


//// [/src/project/tsconfig.tsbuildinfo] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents


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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
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


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18812905712-/// <reference path=\"globalFilePresent.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();","signature":"-19927227517-/// <reference path=\"globalFilePresent.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,11,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,9,[10,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[11,1],[4,1],[3,1],[2,1],[6,1],[8,1],[7,1],[9,1],[10,1],[5,1]],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[13,14,15,16,17]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"failedLookupLocations":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[10,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18812905712-/// <reference path=\"globalFilePresent.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();",
        "signature": "-19927227517-/// <reference path=\"globalFilePresent.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 6372
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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
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


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18812905712-/// <reference path=\"globalFilePresent.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"604791887-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,13],[7,9,13]],"referencedMap":[[4,1],[6,2],[8,3],[10,4],[11,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,12,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,10,9,[11,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[12,1],[4,1],[3,1],[2,1],[6,1],[8,1],[7,1],[10,1],[9,1],[11,1],[5,1]],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[11,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18812905712-/// <reference path=\"globalFilePresent.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "signature": "604791887-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 6675
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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
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


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,13,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[12,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[13,1],[4,1],[3,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[12,1],[5,1]],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-7753781454-declare function globalSomething2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "signature": "3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 6963
}



Change:: Clean resolutions
Input::


Output::
/lib/tsc --b src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,13,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[12,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[13,1],[4,1],[3,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[12,1],[5,1]]},"version":"FakeTSVersion"}



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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,13,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[12,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[13,1],[4,1],[3,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[12,1],[5,1]],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents


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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/src/project/src/globalMain.ts


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,13,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[12,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[13,1],[4,1],[3,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[12,1],[5,1]],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-7753781454-declare function globalSomething2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "signature": "3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 6981
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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/src/project/src/main.ts


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,13,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[12,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[13,1],[4,1],[3,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[12,1],[5,1]],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-7753781454-declare function globalSomething2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "signature": "3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 6993
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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/src/project/src/newFile.ts
/src/project/src/main.ts


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-3405156953-export declare function foo(): number;\r\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,14,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[13,[{"file":"./src/main.ts","start":159,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],12,5],"affectedFilesPendingEmit":[[14,1],[4,1],[3,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[13,1],[12,1],[5,1]],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[15,16,17,18,19]},{"resolvedModule":{"resolvedFileName":20,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":21,"extension":".d.ts"},"failedLookupLocations":[22,23]},{"failedLookupLocations":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]},{"resolvedModule":{"resolvedFileName":56,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[4,[1,2,3,4]],[13,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-7753781454-declare function globalSomething2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "signature": "3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-3405156953-export declare function foo(): number;\r\n"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 159,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 256,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/newfile.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 7294
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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/src/project/src/fileNotFound.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/main.ts


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-13705775197-export declare function something2(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-3405156953-export declare function foo(): number;\r\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,15,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],4,3,2,7,10,9,8,12,11,[14,[{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],13,6],"affectedFilesPendingEmit":[[15,1],[5,1],[4,1],[3,1],[2,1],[7,1],[10,1],[9,1],[8,1],[12,1],[11,1],[14,1],[13,1],[6,1]],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]},{"resolvedModule":{"resolvedFileName":53,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-13705775197-export declare function something2(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-7753781454-declare function globalSomething2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "signature": "3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-3405156953-export declare function foo(): number;\r\n"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filenotfound.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 256,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filenotfound.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/newfile.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 6916
}



Change:: Clean resolutions
Input::


Output::
/lib/tsc --b src/project --cleanPersistedProgram
exitCode:: ExitStatus.Success


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-13705775197-export declare function something2(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-3405156953-export declare function foo(): number;\r\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,15,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],4,3,2,7,10,9,8,12,11,[14,[{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],13,6],"affectedFilesPendingEmit":[[15,1],[5,1],[4,1],[3,1],[2,1],[7,1],[10,1],[9,1],[8,1],[12,1],[11,1],[14,1],[13,1],[6,1]]},"version":"FakeTSVersion"}



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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-13705775197-export declare function something2(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-3405156953-export declare function foo(): number;\r\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,15,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],4,3,2,7,10,9,8,12,11,[14,[{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],13,6],"affectedFilesPendingEmit":[[15,1],[5,1],[4,1],[3,1],[2,1],[7,1],[10,1],[9,1],[8,1],[12,1],[11,1],[14,1],[13,1],[6,1]],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]},{"resolvedModule":{"resolvedFileName":53,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents


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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/src/project/src/main.ts


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-13705775197-export declare function something2(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-3405156953-export declare function foo(): number;\r\n"},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,15,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],4,3,2,7,10,9,8,12,11,[14,[{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],13,6],"affectedFilesPendingEmit":[[15,1],[5,1],[4,1],[3,1],[2,1],[7,1],[10,1],[9,1],[8,1],[12,1],[11,1],[14,1],[13,1],[6,1]],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]},{"resolvedModule":{"resolvedFileName":53,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-13705775197-export declare function something2(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-7753781454-declare function globalSomething2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "signature": "3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-3405156953-export declare function foo(): number;\r\n"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filenotfound.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 256,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filenotfound.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/newfile.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 6928
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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/main.ts


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/filenotfound.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-3405156953-export declare function foo(): number;\r\n"},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,14,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[13,[{"file":"./src/main.ts","start":159,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],12,5],"affectedFilesPendingEmit":[[14,1],[4,1],[3,1],[15,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[13,1],[12,1],[5,1]],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]},{"resolvedModule":{"resolvedFileName":53,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[4,[1,2,3,4]],[13,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
      "./src/filenotfound.ts",
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-7753781454-declare function globalSomething2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "signature": "3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-3405156953-export declare function foo(): number;\r\n"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 159,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 256,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filenotfound.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/newfile.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 7255
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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/src/project/src/fileNotFound.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/main.ts


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-13705775197-export declare function something2(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-3405156953-export declare function foo(): number;\r\n"},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,15,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],4,3,2,7,10,9,8,12,11,[14,[{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],13,6],"affectedFilesPendingEmit":[[15,1],[5,1],[4,1],[3,1],[2,1],[7,1],[10,1],[9,1],[8,1],[12,1],[11,1],[14,1],[13,1],[6,1]],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]},{"resolvedModule":{"resolvedFileName":53,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-13705775197-export declare function something2(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-7753781454-declare function globalSomething2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "signature": "3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-3405156953-export declare function foo(): number;\r\n"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filenotfound.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 256,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./node_modules/@types/sometype/index.d.ts",
        "Full"
      ],
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filenotfound.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/newfile.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
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
  "size": 6928
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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/src/project/src/externalThingNotPresent.ts
/src/project/src/anotherFileReusingResolution.ts
/src/project/src/main.ts


//// [/src/project/src/anotherFileReusingResolution.d.ts]
export {};


//// [/src/project/src/anotherFileReusingResolution.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [/src/project/src/externalThingNotPresent.d.ts]
export declare function externalThing2(): number;


//// [/src/project/src/externalThingNotPresent.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});


//// [/src/project/src/fileNotFound.d.ts]
export declare function something2(): number;


//// [/src/project/src/fileNotFound.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});


//// [/src/project/src/filePresent.d.ts]
export declare function something(): number;


//// [/src/project/src/filePresent.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});


//// [/src/project/src/fileWithRef.d.ts]
/// <reference path="types.d.ts" />


//// [/src/project/src/fileWithRef.js]
/// <reference path="./types.ts"/>


//// [/src/project/src/globalAnotherFileWithSameReferenes.d.ts]
/// <reference path="globalFilePresent.d.ts" />
/// <reference path="globalFileNotFound.d.ts" />
declare function globalAnotherFileWithSameReferenes(): void;


//// [/src/project/src/globalAnotherFileWithSameReferenes.js]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


//// [/src/project/src/globalFileNotFound.d.ts]
declare function globalSomething2(): number;


//// [/src/project/src/globalFileNotFound.js]
function globalSomething2() { return 20; }


//// [/src/project/src/globalFilePresent.d.ts]
declare function globalSomething(): number;


//// [/src/project/src/globalFilePresent.js]
function globalSomething() { return 10; }


//// [/src/project/src/globalMain.d.ts]
/// <reference path="globalNewFile.d.ts" />
/// <reference path="globalFilePresent.d.ts" />
/// <reference path="globalFileNotFound.d.ts" />
declare function globalMain(): void;


//// [/src/project/src/globalMain.js]
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
globalSomething();


//// [/src/project/src/globalNewFile.d.ts]
declare function globalFoo(): number;


//// [/src/project/src/globalNewFile.js]
function globalFoo() { return 20; }


//// [/src/project/src/main.d.ts]
export {};


//// [/src/project/src/main.js]
define(["require", "exports", "./filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
    filePresent_1.something();
});


//// [/src/project/src/newFile.d.ts]
export declare function foo(): number;


//// [/src/project/src/newFile.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});


//// [/src/project/src/types.d.ts]
interface SomeType {
}


//// [/src/project/src/types.js]


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-15062742831-export declare function something(): number;\r\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-13705775197-export declare function something2(): number;\r\n"},"5686005290-export function externalThing1(): number;",{"version":"5318862050-export function externalThing2() { return 20; }","signature":"-16426931566-export declare function externalThing2(): number;\r\n"},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-4882119183-export {};\r\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10608150606-interface SomeType {\r\n}\r\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-3515861877-/// <reference path=\"types.d.ts\" />\r\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-6032143744-declare function globalSomething(): number;\r\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-7753781454-declare function globalSomething2(): number;\r\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4157970454-declare function globalFoo(): number;\r\n","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","signature":"3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-3405156953-export declare function foo(): number;\r\n"},{"version":"2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","signature":"-4882119183-export {};\r\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4,5],[7],[9,10],[9,10,12],[2,3,4,5,14]],"referencedMap":[[6,1],[8,2],[11,3],[13,4],[15,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,16,6,4,5,3,2,8,11,10,9,13,12,15,14,7],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"resolvedModule":{"resolvedFileName":22,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":23,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[15,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-15062742831-export declare function something(): number;\r\n"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-13705775197-export declare function something2(): number;\r\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }",
        "signature": "-16426931566-export declare function externalThing2(): number;\r\n"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-4882119183-export {};\r\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10608150606-interface SomeType {\r\n}\r\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-3515861877-/// <reference path=\"types.d.ts\" />\r\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-6032143744-declare function globalSomething(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-7753781454-declare function globalSomething2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-18570932929-/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalAnotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4157970454-declare function globalFoo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "signature": "3235645566-/// <reference path=\"globalNewFile.d.ts\" />\r\n/// <reference path=\"globalFilePresent.d.ts\" />\r\n/// <reference path=\"globalFileNotFound.d.ts\" />\r\ndeclare function globalMain(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-3405156953-export declare function foo(): number;\r\n"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();",
        "signature": "-4882119183-export {};\r\n"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/filenotfound.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      "./src/main.ts",
      "./src/newfile.ts",
      "./src/types.ts"
    ],
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
  "size": 5071
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
[91merror[0m[90m TS5055: [0mCannot write file '/src/project/src/externalThing.d.ts' because it would overwrite input file.


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project/src/anotherFileReusingResolution.ts","/src/project/src/externalThing.ts","/src/project/src/externalThingNotPresent.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/fileWithRef.ts","/src/project/src/globalAnotherFileWithSameReferenes.ts","/src/project/src/globalFileNotFound.ts","/src/project/src/globalFilePresent.ts","/src/project/src/globalMain.ts","/src/project/src/globalNewFile.ts","/src/project/src/main.ts","/src/project/src/newFile.ts","/src/project/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/src/project/src/externalThing.ts




Change:: Delete tsbuildinfo file and do clean build
Input::
//// [/src/project/tsconfig.tsbuildinfo] unlink


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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"configFilePath":"/src/project/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
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


//// [/src/project/src/anotherFileReusingResolution.d.ts] file written with same contents
//// [/src/project/src/anotherFileReusingResolution.js] file written with same contents
//// [/src/project/src/externalThing.d.ts]
export declare function externalThing1(): number;


//// [/src/project/src/externalThing.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});


//// [/src/project/src/externalThingNotPresent.d.ts] file written with same contents
//// [/src/project/src/externalThingNotPresent.js] file written with same contents
//// [/src/project/src/fileNotFound.d.ts] file written with same contents
//// [/src/project/src/fileNotFound.js] file written with same contents
//// [/src/project/src/filePresent.d.ts] file written with same contents
//// [/src/project/src/filePresent.js] file written with same contents
//// [/src/project/src/fileWithRef.d.ts] file written with same contents
//// [/src/project/src/fileWithRef.js] file written with same contents
//// [/src/project/src/globalAnotherFileWithSameReferenes.d.ts] file written with same contents
//// [/src/project/src/globalAnotherFileWithSameReferenes.js] file written with same contents
//// [/src/project/src/globalFileNotFound.d.ts] file written with same contents
//// [/src/project/src/globalFileNotFound.js] file written with same contents
//// [/src/project/src/globalFilePresent.d.ts] file written with same contents
//// [/src/project/src/globalFilePresent.js] file written with same contents
//// [/src/project/src/globalMain.d.ts] file written with same contents
//// [/src/project/src/globalMain.js] file written with same contents
//// [/src/project/src/globalNewFile.d.ts] file written with same contents
//// [/src/project/src/globalNewFile.js] file written with same contents
//// [/src/project/src/main.d.ts] file written with same contents
//// [/src/project/src/main.js] file written with same contents
//// [/src/project/src/newFile.d.ts] file written with same contents
//// [/src/project/src/newFile.js] file written with same contents
//// [/src/project/src/types.d.ts] file written with same contents
//// [/src/project/src/types.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.ts","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"11598859296-export function something() { return 10; }","-497034637-export function something2() { return 20; }","5618215488-export function externalThing1() { return 10; }","5318862050-export function externalThing2() { return 20; }","-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",{"version":"-12575322908-interface SomeType {}","affectsGlobalScope":true},"-6085631553-/// <reference path=\"./types.ts\"/>",{"version":"-5627034801-function globalSomething() { return 10; }","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","affectsGlobalScope":true},{"version":"-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();","affectsGlobalScope":true},"4428918903-export function foo() { return 20; }","2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();","7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3,4,5],[7],[9,10],[9,10,12],[2,3,4,5,14]],"referencedMap":[[6,1],[8,2],[11,3],[13,4],[15,5]],"exportedModulesMap":[[6,1],[8,2],[11,3],[13,4],[15,5]],"semanticDiagnosticsPerFile":[1,16,6,4,5,3,2,8,11,10,9,13,12,15,14,7],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":21,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[15,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.ts": {
        "version": "5618215488-export function externalThing1() { return 10; }",
        "signature": "5618215488-export function externalThing1() { return 10; }"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }",
        "signature": "5318862050-export function externalThing2() { return 20; }"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "signature": "-5021007197-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();globalSomething();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();",
        "signature": "2165247406-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "module": 2,
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/externalthing.ts",
      "./src/externalthingnotpresent.ts",
      "./src/filenotfound.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      "./src/main.ts",
      "./src/newfile.ts",
      "./src/types.ts"
    ],
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
  "size": 3789
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


