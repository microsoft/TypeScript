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

//// [/src/project/aFileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
export { x } from "./aRandomFileForImport";
export { x as x2 } from "./aRandomFileForImport2";
export const y = 10;


//// [/src/project/aRandomFileForImport.ts]
export const x = 10;

//// [/src/project/aRandomFileForImport2.ts]
export const x = 10;

//// [/src/project/bFileWithImports.ts]
export { y } from "./aFileWithImports";
export { x } from "./bRandomFileForImport";
import type { ImportInterface0 } from "pkg0";


//// [/src/project/bRandomFileForImport.ts]
export const x = 10;

//// [/src/project/bRandomFileForImport2.ts]
export const x = 10;

//// [/src/project/cFileWithImports.ts]
import { y } from "./bFileWithImports";
import type { ImportInterface0 } from "pkg0";


//// [/src/project/cRandomFileForImport.ts]
export const x = 10;

//// [/src/project/cRandomFileForImport2.ts]
export const x = 10;

//// [/src/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/src/project/pkg0.d.ts]
export interface ImportInterface0 {}

//// [/src/project/tsconfig.a.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["aFileWithImports.ts","aRandomFileForImport.ts","aRandomFileForImport2.ts"]}

//// [/src/project/tsconfig.b.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["bFileWithImports.ts","bRandomFileForImport.ts","bRandomFileForImport2.ts"],"references":[{"path":"./tsconfig.a.json"}]}

//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true,"module":"amd"},"files":["cFileWithImports.ts","cRandomFileForImport.ts","cRandomFileForImport2.ts"],"references":[{"path":"./tsconfig.a.json"},{"path":"./tsconfig.b.json"}]}



Output::
/lib/tsc -b /src/project --explainFiles --v
[[90m12:00:23 AM[0m] Projects in this build: 
    * src/project/tsconfig.a.json
    * src/project/tsconfig.b.json
    * src/project/tsconfig.json

[[90m12:00:24 AM[0m] Project 'src/project/tsconfig.a.json' is out of date because output file 'src/project/tsconfig.a.tsbuildinfo' does not exist

[[90m12:00:25 AM[0m] Building project '/src/project/tsconfig.a.json'...

======== Resolving module 'pkg0' from '/src/project/aFileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg0/package.json' does not exist.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module './aRandomFileForImport' from '/src/project/aFileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport', target file type 'TypeScript'.
File '/src/project/aRandomFileForImport.ts' exist - use it as a name resolution result.
======== Module name './aRandomFileForImport' was successfully resolved to '/src/project/aRandomFileForImport.ts'. ========
======== Resolving module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport2', target file type 'TypeScript'.
File '/src/project/aRandomFileForImport2.ts' exist - use it as a name resolution result.
======== Module name './aRandomFileForImport2' was successfully resolved to '/src/project/aRandomFileForImport2.ts'. ========
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aFileWithImports.ts'
src/project/aRandomFileForImport.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.ts'
  Part of 'files' list in tsconfig.json
src/project/aRandomFileForImport2.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.ts'
  Part of 'files' list in tsconfig.json
src/project/aFileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90m12:00:35 AM[0m] Project 'src/project/tsconfig.b.json' is out of date because output file 'src/project/tsconfig.b.tsbuildinfo' does not exist

[[90m12:00:36 AM[0m] Building project '/src/project/tsconfig.b.json'...

======== Resolving module './aFileWithImports' from '/src/project/bFileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/src/project/aFileWithImports', target file type 'TypeScript'.
File '/src/project/aFileWithImports.ts' exist - use it as a name resolution result.
======== Module name './aFileWithImports' was successfully resolved to '/src/project/aFileWithImports.ts'. ========
======== Resolving module './bRandomFileForImport' from '/src/project/bFileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/src/project/bRandomFileForImport', target file type 'TypeScript'.
File '/src/project/bRandomFileForImport.ts' exist - use it as a name resolution result.
======== Module name './bRandomFileForImport' was successfully resolved to '/src/project/bRandomFileForImport.ts'. ========
======== Resolving module 'pkg0' from '/src/project/bFileWithImports.ts'. ========
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module './aRandomFileForImport' from '/src/project/aFileWithImports.ts'. ========
Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Resolution for module './aRandomFileForImport' was found in cache from location '/src/project'.
======== Module name './aRandomFileForImport' was successfully resolved to '/src/project/aRandomFileForImport.ts'. ========
======== Resolving module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts'. ========
Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Resolution for module './aRandomFileForImport2' was found in cache from location '/src/project'.
======== Module name './aRandomFileForImport2' was successfully resolved to '/src/project/aRandomFileForImport2.ts'. ========
lib/lib.d.ts
  Default library for target 'es3'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.ts'
  Part of 'files' list in tsconfig.json
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/bFileWithImports.ts'
src/project/bFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/bRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
[[90m12:00:46 AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/project/tsconfig.tsbuildinfo' does not exist

[[90m12:00:47 AM[0m] Building project '/src/project/tsconfig.json'...

======== Resolving module './bFileWithImports' from '/src/project/cFileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/bFileWithImports.ts' exist - use it as a name resolution result.
======== Module name './bFileWithImports' was successfully resolved to '/src/project/bFileWithImports.ts'. ========
======== Resolving module 'pkg0' from '/src/project/cFileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving module './aFileWithImports' from '/src/project/bFileWithImports.ts'. ========
Using compiler options of project reference redirect '/src/project/tsconfig.b.json'.
Resolution for module './aFileWithImports' was found in cache from location '/src/project'.
======== Module name './aFileWithImports' was successfully resolved to '/src/project/aFileWithImports.ts'. ========
======== Resolving module './bRandomFileForImport' from '/src/project/bFileWithImports.ts'. ========
Using compiler options of project reference redirect '/src/project/tsconfig.b.json'.
Resolution for module './bRandomFileForImport' was found in cache from location '/src/project'.
======== Module name './bRandomFileForImport' was successfully resolved to '/src/project/bRandomFileForImport.ts'. ========
======== Resolving module './aRandomFileForImport' from '/src/project/aFileWithImports.ts'. ========
Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Resolution for module './aRandomFileForImport' was found in cache from location '/src/project'.
======== Module name './aRandomFileForImport' was successfully resolved to '/src/project/aRandomFileForImport.ts'. ========
======== Resolving module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts'. ========
Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Resolution for module './aRandomFileForImport2' was found in cache from location '/src/project'.
======== Module name './aRandomFileForImport2' was successfully resolved to '/src/project/aRandomFileForImport2.ts'. ========
lib/lib.d.ts
  Default library for target 'es3'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.d.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/bRandomFileForImport.ts'
src/project/bFileWithImports.d.ts
  Imported via "./bFileWithImports" from file 'src/project/cFileWithImports.ts'
  File is output of project reference source 'src/project/bFileWithImports.ts'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/cFileWithImports.ts'
src/project/cFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/project/aFileWithImports.d.ts]
export { x } from "./aRandomFileForImport";
export { x as x2 } from "./aRandomFileForImport2";
export declare const y = 10;


//// [/src/project/aFileWithImports.js]
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
exports.__esModule = true;
exports.y = exports.x2 = exports.x = void 0;
var aRandomFileForImport_1 = require("./aRandomFileForImport");
__createBinding(exports, aRandomFileForImport_1, "x");
var aRandomFileForImport2_1 = require("./aRandomFileForImport2");
__createBinding(exports, aRandomFileForImport2_1, "x", "x2");
exports.y = 10;


//// [/src/project/aRandomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/aRandomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/aRandomFileForImport2.d.ts]
export declare const x = 10;


//// [/src/project/aRandomFileForImport2.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/bFileWithImports.d.ts]
export { y } from "./aFileWithImports";
export { x } from "./bRandomFileForImport";


//// [/src/project/bFileWithImports.js]
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
exports.__esModule = true;
exports.x = exports.y = void 0;
var aFileWithImports_1 = require("./aFileWithImports");
__createBinding(exports, aFileWithImports_1, "y");
var bRandomFileForImport_1 = require("./bRandomFileForImport");
__createBinding(exports, bRandomFileForImport_1, "x");


//// [/src/project/bRandomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/bRandomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/bRandomFileForImport2.d.ts]
export declare const x = 10;


//// [/src/project/bRandomFileForImport2.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/cFileWithImports.d.ts]
export {};


//// [/src/project/cFileWithImports.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [/src/project/cRandomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/cRandomFileForImport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});


//// [/src/project/cRandomFileForImport2.d.ts]
export declare const x = 10;


//// [/src/project/cRandomFileForImport2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});


//// [/src/project/tsconfig.a.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.ts","./arandomfileforimport2.ts","./afilewithimports.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n","signature":"-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3,4],[3,4]],"referencedMap":[[5,1]],"exportedModulesMap":[[5,2]],"semanticDiagnosticsPerFile":[1,5,3,4,2],"latestChangedDtsFile":"./aFileWithImports.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":7}},{"resolvedModule":{"resolvedFileName":8}}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[6,[1,2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.ts",
      "./arandomfileforimport2.ts",
      "./afilewithimports.ts",
      "./",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts",
        "./arandomfileforimport.ts",
        "./arandomfileforimport2.ts"
      ],
      [
        "./arandomfileforimport.ts",
        "./arandomfileforimport2.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./arandomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.ts": {
        "version": "25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./afilewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./arandomfileforimport.ts",
        "./arandomfileforimport2.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.ts": [
        "./arandomfileforimport.ts",
        "./arandomfileforimport2.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.ts",
      "./arandomfileforimport.ts",
      "./arandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "./aFileWithImports.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        }
      ],
      "names": [
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "./aRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            ],
            [
              "./aRandomFileForImport2",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1921
}

//// [/src/project/tsconfig.b.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.ts","./node_modules/pkg0/index.d.ts","./bfilewithimports.ts","./brandomfileforimport2.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-6057683066-export declare const x = 10;\r\n","-6057683066-export declare const x = 10;\r\n","-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"769951468-export interface ImportInterface0 {}",{"version":"-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3],[4,5,6],[4,5]],"referencedMap":[[4,1],[7,2]],"exportedModulesMap":[[4,1],[7,3]],"semanticDiagnosticsPerFile":[1,4,2,3,7,5,8,6],"latestChangedDtsFile":"./bRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":10}},{"resolvedModule":{"resolvedFileName":11}},{"resolvedModule":{"resolvedFileName":12}},{"resolvedModule":{"resolvedFileName":13}},{"resolvedModule":{"resolvedFileName":6,"isExternalLibraryImport":true}}],"names":["./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport","pkg0"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[9,[1,2,3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./afilewithimports.d.ts",
      "./brandomfileforimport.ts",
      "./node_modules/pkg0/index.d.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport2.ts",
      "./",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts",
      "./aFileWithImports.ts",
      "./bRandomFileForImport.ts"
    ],
    "fileNamesList": [
      [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts",
        "./node_modules/pkg0/index.d.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./arandomfileforimport.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./bfilewithimports.ts": {
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./brandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts",
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport.ts",
      "./brandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "./bRandomFileForImport2.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport",
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "./aRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            ],
            [
              "./aRandomFileForImport2",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            ],
            [
              "./aFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aFileWithImports.ts"
                }
              }
            ],
            [
              "./bRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bRandomFileForImport.ts"
                }
              }
            ],
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2409
}

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-6057683066-export declare const x = 10;\r\n","-6057683066-export declare const x = 10;\r\n","-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n","-6057683066-export declare const x = 10;\r\n","5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-4882119183-export {};\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[2,3],[4,5],[6,7]],"referencedMap":[[4,1],[6,2],[8,3]],"exportedModulesMap":[[4,1],[6,2]],"semanticDiagnosticsPerFile":[1,4,2,3,6,5,8,9,10,7],"latestChangedDtsFile":"./cRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":12}},{"resolvedModule":{"resolvedFileName":7}},{"resolvedModule":{"resolvedFileName":13}},{"resolvedModule":{"resolvedFileName":14}},{"resolvedModule":{"resolvedFileName":15}},{"resolvedModule":{"resolvedFileName":16}}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]],"modules":{"own":[[11,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[11,[3,4,5,6]]]}]}}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./afilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./bfilewithimports.d.ts",
      "./pkg0.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./",
      "./bFileWithImports.ts",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts",
      "./aFileWithImports.ts",
      "./bRandomFileForImport.ts"
    ],
    "fileNamesList": [
      [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./arandomfileforimport.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n",
        "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./crandomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./crandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./cfilewithimports.ts": [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./pkg0.d.ts"
    ],
    "latestChangedDtsFile": "./cRandomFileForImport2.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "./bFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
          }
        ]
      ],
      "modules": {
        "own": [
          [
            "./",
            [
              [
                "./bFileWithImports",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./bFileWithImports.ts"
                  }
                }
              ],
              [
                "pkg0",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./pkg0.d.ts"
                  }
                }
              ]
            ]
          ]
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              [
                "./",
                [
                  [
                    "./aRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport.ts"
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport2",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport2.ts"
                      }
                    }
                  ],
                  [
                    "./aFileWithImports",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aFileWithImports.ts"
                      }
                    }
                  ],
                  [
                    "./bRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./bRandomFileForImport.ts"
                      }
                    }
                  ]
                ]
              ]
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 2637
}



Change:: modify aRandomFileForImport by adding import
Input::
//// [/src/project/aRandomFileForImport.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles --v
[[90m12:00:58 AM[0m] Projects in this build: 
    * src/project/tsconfig.a.json
    * src/project/tsconfig.b.json
    * src/project/tsconfig.json

[[90m12:00:59 AM[0m] Project 'src/project/tsconfig.a.json' is out of date because output 'src/project/tsconfig.a.tsbuildinfo' is older than input 'src/project/aRandomFileForImport.ts'

[[90m12:01:00 AM[0m] Building project '/src/project/tsconfig.a.json'...

Reusing resolution of module 'pkg0' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aFileWithImports.ts'
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.ts'
  Part of 'files' list in tsconfig.json
src/project/aRandomFileForImport2.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.ts'
  Part of 'files' list in tsconfig.json
src/project/aFileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90m12:01:07 AM[0m] Project 'src/project/tsconfig.b.json' is out of date because output 'src/project/tsconfig.b.tsbuildinfo' is older than input 'src/project/tsconfig.a.json'

[[90m12:01:08 AM[0m] Building project '/src/project/tsconfig.b.json'...

Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'src/project/bFileWithImports.ts'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.ts'
  Part of 'files' list in tsconfig.json
src/project/bFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/bRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
[[90m12:01:12 AM[0m] Project 'src/project/tsconfig.json' is out of date because output 'src/project/tsconfig.tsbuildinfo' is older than input 'src/project/tsconfig.a.json'

[[90m12:01:13 AM[0m] Building project '/src/project/tsconfig.json'...

Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bFileWithImports.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.d.ts'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.d.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/bRandomFileForImport.ts'
src/project/bFileWithImports.d.ts
  Imported via "./bFileWithImports" from file 'src/project/cFileWithImports.ts'
  File is output of project reference source 'src/project/bFileWithImports.ts'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/cFileWithImports.ts'
src/project/cFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/project/aFileWithImports.js] file written with same contents
//// [/src/project/aRandomFileForImport.d.ts]
export type { ImportInterface0 } from "pkg0";
export declare const x = 10;


//// [/src/project/aRandomFileForImport.js] file written with same contents
//// [/src/project/tsconfig.a.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.ts","./arandomfileforimport2.ts","./afilewithimports.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n","signature":"-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3,4],[2],[3,4]],"referencedMap":[[5,1],[3,2]],"exportedModulesMap":[[5,3],[3,2]],"semanticDiagnosticsPerFile":[1,5,3,4,2],"latestChangedDtsFile":"./aRandomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":7}},{"resolvedModule":{"resolvedFileName":8}}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[6,[1,2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.ts",
      "./arandomfileforimport2.ts",
      "./afilewithimports.ts",
      "./",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts",
        "./arandomfileforimport.ts",
        "./arandomfileforimport2.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts"
      ],
      [
        "./arandomfileforimport.ts",
        "./arandomfileforimport2.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./arandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.ts": {
        "version": "25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./afilewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./arandomfileforimport.ts",
        "./arandomfileforimport2.ts"
      ],
      "./arandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.ts": [
        "./arandomfileforimport.ts",
        "./arandomfileforimport2.ts"
      ],
      "./arandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.ts",
      "./arandomfileforimport.ts",
      "./arandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "./aRandomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        }
      ],
      "names": [
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "./aRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            ],
            [
              "./aRandomFileForImport2",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2042
}

//// [/src/project/tsconfig.b.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.ts","./bfilewithimports.ts","./brandomfileforimport2.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","-6057683066-export declare const x = 10;\r\n","-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[3,4],[2],[2,5,6],[5,6]],"referencedMap":[[5,1],[3,2],[7,3]],"exportedModulesMap":[[5,1],[3,2],[7,4]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,8,2],"latestChangedDtsFile":"./bRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":10}},{"resolvedModule":{"resolvedFileName":11}},{"resolvedModule":{"resolvedFileName":12}},{"resolvedModule":{"resolvedFileName":13}}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[9,[1,2,3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./afilewithimports.d.ts",
      "./brandomfileforimport.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport2.ts",
      "./",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts",
      "./aFileWithImports.ts",
      "./bRandomFileForImport.ts"
    ],
    "fileNamesList": [
      [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./bfilewithimports.ts": {
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./brandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport.ts",
      "./brandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "./bRandomFileForImport2.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "./aRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            ],
            [
              "./aRandomFileForImport2",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            ],
            [
              "./aFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aFileWithImports.ts"
                }
              }
            ],
            [
              "./bRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bRandomFileForImport.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2477
}

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","-6057683066-export declare const x = 10;\r\n","-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n","-6057683066-export declare const x = 10;\r\n","5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-4882119183-export {};\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[3,4],[2],[5,6],[7,8]],"referencedMap":[[5,1],[3,2],[7,3],[9,4]],"exportedModulesMap":[[5,1],[3,2],[7,3]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,9,10,11,2,8],"latestChangedDtsFile":"./cRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":13}},{"resolvedModule":{"resolvedFileName":8}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":14}},{"resolvedModule":{"resolvedFileName":15}},{"resolvedModule":{"resolvedFileName":16}},{"resolvedModule":{"resolvedFileName":17}}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[2,3],[3,4],[4,5],[5,6],[6,7]],"modules":{"own":[[12,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[12,[3,4,5,6,7]]]}]}}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./afilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./bfilewithimports.d.ts",
      "./pkg0.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./",
      "./bFileWithImports.ts",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts",
      "./aFileWithImports.ts",
      "./bRandomFileForImport.ts"
    ],
    "fileNamesList": [
      [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n",
        "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./crandomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./crandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./cfilewithimports.ts": [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts",
      "./pkg0.d.ts"
    ],
    "latestChangedDtsFile": "./cRandomFileForImport2.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "./bFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
          }
        ]
      ],
      "modules": {
        "own": [
          [
            "./",
            [
              [
                "./bFileWithImports",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./bFileWithImports.ts"
                  }
                }
              ],
              [
                "pkg0",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./pkg0.d.ts"
                  }
                }
              ]
            ]
          ]
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              [
                "./",
                [
                  [
                    "pkg0",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                        "isExternalLibraryImport": true
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport.ts"
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport2",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport2.ts"
                      }
                    }
                  ],
                  [
                    "./aFileWithImports",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aFileWithImports.ts"
                      }
                    }
                  ],
                  [
                    "./bRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./bRandomFileForImport.ts"
                      }
                    }
                  ]
                ]
              ]
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 2871
}



Change:: modify bRandomFileForImport by adding import
Input::
//// [/src/project/bRandomFileForImport.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles --v
[[90m12:01:18 AM[0m] Projects in this build: 
    * src/project/tsconfig.a.json
    * src/project/tsconfig.b.json
    * src/project/tsconfig.json

[[90m12:01:19 AM[0m] Project 'src/project/tsconfig.a.json' is up to date because newest input 'src/project/aRandomFileForImport.ts' is older than output 'src/project/tsconfig.a.tsbuildinfo'

[[90m12:01:20 AM[0m] Project 'src/project/tsconfig.b.json' is out of date because output 'src/project/tsconfig.b.tsbuildinfo' is older than input 'src/project/bRandomFileForImport.ts'

[[90m12:01:21 AM[0m] Building project '/src/project/tsconfig.b.json'...

Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'src/project/bRandomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/bFileWithImports.ts'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.ts'
  Part of 'files' list in tsconfig.json
src/project/bFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/bRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
[[90m12:01:28 AM[0m] Project 'src/project/tsconfig.json' is out of date because output 'src/project/tsconfig.tsbuildinfo' is older than input 'src/project/tsconfig.b.json'

[[90m12:01:29 AM[0m] Building project '/src/project/tsconfig.json'...

Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bFileWithImports.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'src/project/bRandomFileForImport.d.ts'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.d.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/bRandomFileForImport.ts'
src/project/bFileWithImports.d.ts
  Imported via "./bFileWithImports" from file 'src/project/cFileWithImports.ts'
  File is output of project reference source 'src/project/bFileWithImports.ts'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/cFileWithImports.ts'
src/project/cFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/project/bFileWithImports.js] file written with same contents
//// [/src/project/bRandomFileForImport.d.ts]
export type { ImportInterface0 } from "pkg0";
export declare const x = 10;


//// [/src/project/bRandomFileForImport.js] file written with same contents
//// [/src/project/tsconfig.b.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.ts","./bfilewithimports.ts","./brandomfileforimport2.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","-6057683066-export declare const x = 10;\r\n","-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"},{"version":"-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[3,4],[2],[2,5,6],[5,6]],"referencedMap":[[5,1],[3,2],[7,3],[6,2]],"exportedModulesMap":[[5,1],[3,2],[7,4],[6,2]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,8,2],"latestChangedDtsFile":"./bRandomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":10}},{"resolvedModule":{"resolvedFileName":11}},{"resolvedModule":{"resolvedFileName":12}},{"resolvedModule":{"resolvedFileName":13}}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[9,[1,2,3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./afilewithimports.d.ts",
      "./brandomfileforimport.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport2.ts",
      "./",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts",
      "./aFileWithImports.ts",
      "./bRandomFileForImport.ts"
    ],
    "fileNamesList": [
      [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./bfilewithimports.ts": {
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./brandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ],
      "./brandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ],
      "./brandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport.ts",
      "./brandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "./bRandomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "./aRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            ],
            [
              "./aRandomFileForImport2",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            ],
            [
              "./aFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aFileWithImports.ts"
                }
              }
            ],
            [
              "./bRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bRandomFileForImport.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2589
}

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","-6057683066-export declare const x = 10;\r\n","-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-4882119183-export {};\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[3,4],[2],[5,6],[7,8]],"referencedMap":[[5,1],[3,2],[7,3],[6,2],[9,4]],"exportedModulesMap":[[5,1],[3,2],[7,3],[6,2]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,9,10,11,2,8],"latestChangedDtsFile":"./cRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":13}},{"resolvedModule":{"resolvedFileName":8}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":14}},{"resolvedModule":{"resolvedFileName":15}},{"resolvedModule":{"resolvedFileName":16}},{"resolvedModule":{"resolvedFileName":17}}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[2,3],[3,4],[4,5],[5,6],[6,7]],"modules":{"own":[[12,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[12,[3,4,5,6,7]]]}]}}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./afilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./bfilewithimports.d.ts",
      "./pkg0.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./",
      "./bFileWithImports.ts",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts",
      "./aFileWithImports.ts",
      "./bRandomFileForImport.ts"
    ],
    "fileNamesList": [
      [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n",
        "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./crandomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./crandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./brandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./cfilewithimports.ts": [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./brandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts",
      "./pkg0.d.ts"
    ],
    "latestChangedDtsFile": "./cRandomFileForImport2.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "./bFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
          }
        ]
      ],
      "modules": {
        "own": [
          [
            "./",
            [
              [
                "./bFileWithImports",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./bFileWithImports.ts"
                  }
                }
              ],
              [
                "pkg0",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./pkg0.d.ts"
                  }
                }
              ]
            ]
          ]
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              [
                "./",
                [
                  [
                    "pkg0",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                        "isExternalLibraryImport": true
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport.ts"
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport2",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport2.ts"
                      }
                    }
                  ],
                  [
                    "./aFileWithImports",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aFileWithImports.ts"
                      }
                    }
                  ],
                  [
                    "./bRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./bRandomFileForImport.ts"
                      }
                    }
                  ]
                ]
              ]
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 2935
}



Change:: modify cRandomFileForImport by adding import
Input::
//// [/src/project/cRandomFileForImport.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles --v
[[90m12:01:34 AM[0m] Projects in this build: 
    * src/project/tsconfig.a.json
    * src/project/tsconfig.b.json
    * src/project/tsconfig.json

[[90m12:01:35 AM[0m] Project 'src/project/tsconfig.a.json' is up to date because newest input 'src/project/aRandomFileForImport.ts' is older than output 'src/project/tsconfig.a.tsbuildinfo'

[[90m12:01:36 AM[0m] Project 'src/project/tsconfig.b.json' is up to date because newest input 'src/project/bRandomFileForImport.ts' is older than output 'src/project/tsconfig.b.tsbuildinfo'

[[90m12:01:37 AM[0m] Project 'src/project/tsconfig.json' is out of date because output 'src/project/tsconfig.tsbuildinfo' is older than input 'src/project/cRandomFileForImport.ts'

[[90m12:01:38 AM[0m] Building project '/src/project/tsconfig.json'...

Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bFileWithImports.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'src/project/bRandomFileForImport.d.ts'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.d.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/bRandomFileForImport.ts'
src/project/bFileWithImports.d.ts
  Imported via "./bFileWithImports" from file 'src/project/cFileWithImports.ts'
  File is output of project reference source 'src/project/bFileWithImports.ts'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/cFileWithImports.ts'
  Imported via "pkg0" from file 'src/project/cRandomFileForImport.ts'
src/project/cFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/project/cRandomFileForImport.d.ts]
export type { ImportInterface0 } from "pkg0";
export declare const x = 10;


//// [/src/project/cRandomFileForImport.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","-6057683066-export declare const x = 10;\r\n","-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-4882119183-export {};\r\n"},{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"},{"version":"-10726455937-export const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[3,4],[2],[5,6],[7,8],[8]],"referencedMap":[[5,1],[3,2],[7,3],[6,2],[9,4],[10,5]],"exportedModulesMap":[[5,1],[3,2],[7,3],[6,2],[10,5]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,9,10,11,2,8],"latestChangedDtsFile":"./cRandomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":13}},{"resolvedModule":{"resolvedFileName":8}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":14}},{"resolvedModule":{"resolvedFileName":15}},{"resolvedModule":{"resolvedFileName":16}},{"resolvedModule":{"resolvedFileName":17}}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[2,3],[3,4],[4,5],[5,6],[6,7]],"modules":{"own":[[12,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[12,[3,4,5,6,7]]]}]}}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./afilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./bfilewithimports.d.ts",
      "./pkg0.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./",
      "./bFileWithImports.ts",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts",
      "./aFileWithImports.ts",
      "./bRandomFileForImport.ts"
    ],
    "fileNamesList": [
      [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ],
      [
        "./pkg0.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n",
        "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./crandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./crandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./brandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./cfilewithimports.ts": [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport.ts": [
        "./pkg0.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./brandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./crandomfileforimport.ts": [
        "./pkg0.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts",
      "./pkg0.d.ts"
    ],
    "latestChangedDtsFile": "./cRandomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "./bFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
          }
        ]
      ],
      "modules": {
        "own": [
          [
            "./",
            [
              [
                "./bFileWithImports",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./bFileWithImports.ts"
                  }
                }
              ],
              [
                "pkg0",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./pkg0.d.ts"
                  }
                }
              ]
            ]
          ]
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              [
                "./",
                [
                  [
                    "pkg0",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                        "isExternalLibraryImport": true
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport.ts"
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport2",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport2.ts"
                      }
                    }
                  ],
                  [
                    "./aFileWithImports",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aFileWithImports.ts"
                      }
                    }
                  ],
                  [
                    "./bRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./bRandomFileForImport.ts"
                      }
                    }
                  ]
                ]
              ]
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 3053
}



Change:: Project build on B
Input::


Output::
/lib/tsc -p /src/project/tsconfig.b.json --explainFiles
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'src/project/bRandomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/bFileWithImports.ts'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.ts'
  Part of 'files' list in tsconfig.json
src/project/bFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/bRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success




Change:: modify bRandomFileForImport2 by adding import and project build
Input::
//// [/src/project/bRandomFileForImport2.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -p /src/project/tsconfig.b.json --explainFiles
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport2.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'src/project/bRandomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/bFileWithImports.ts'
  Imported via "pkg0" from file 'src/project/bRandomFileForImport2.ts'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.ts'
  Part of 'files' list in tsconfig.json
src/project/bFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/bRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/project/bRandomFileForImport2.d.ts]
export type { ImportInterface0 } from "pkg0";
export declare const x = 10;


//// [/src/project/bRandomFileForImport2.js] file written with same contents
//// [/src/project/tsconfig.b.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.ts","./bfilewithimports.ts","./brandomfileforimport2.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","-6057683066-export declare const x = 10;\r\n","-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"},{"version":"-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"},{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[3,4],[2],[2,5,6],[5,6]],"referencedMap":[[5,1],[3,2],[7,3],[6,2],[8,2]],"exportedModulesMap":[[5,1],[3,2],[7,4],[6,2],[8,2]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,8,2],"latestChangedDtsFile":"./bRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":10}},{"resolvedModule":{"resolvedFileName":11}},{"resolvedModule":{"resolvedFileName":12}},{"resolvedModule":{"resolvedFileName":13}}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[9,[1,2,3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./afilewithimports.d.ts",
      "./brandomfileforimport.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport2.ts",
      "./",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts",
      "./aFileWithImports.ts",
      "./bRandomFileForImport.ts"
    ],
    "fileNamesList": [
      [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./bfilewithimports.ts": {
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./brandomfileforimport2.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ],
      "./brandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./brandomfileforimport2.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ],
      "./brandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./brandomfileforimport2.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport.ts",
      "./brandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "./bRandomFileForImport2.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "./aRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            ],
            [
              "./aRandomFileForImport2",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            ],
            [
              "./aFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aFileWithImports.ts"
                }
              }
            ],
            [
              "./bRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bRandomFileForImport.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2703
}



Change:: Project build on c
Input::


Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bFileWithImports.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'src/project/bRandomFileForImport.d.ts'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.d.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/bRandomFileForImport.ts'
src/project/bFileWithImports.d.ts
  Imported via "./bFileWithImports" from file 'src/project/cFileWithImports.ts'
  File is output of project reference source 'src/project/bFileWithImports.ts'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/cFileWithImports.ts'
  Imported via "pkg0" from file 'src/project/cRandomFileForImport.ts'
src/project/cFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success




Change:: modify cRandomFileForImport2 by adding import and project build
Input::
//// [/src/project/cRandomFileForImport2.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -p /src/project --explainFiles
Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bFileWithImports.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cRandomFileForImport2.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'src/project/bRandomFileForImport.d.ts'
src/project/aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport.ts'
src/project/aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'src/project/aFileWithImports.d.ts'
  File is output of project reference source 'src/project/aRandomFileForImport2.ts'
src/project/aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/aFileWithImports.ts'
src/project/bRandomFileForImport.d.ts
  Imported via "./bRandomFileForImport" from file 'src/project/bFileWithImports.d.ts'
  File is output of project reference source 'src/project/bRandomFileForImport.ts'
src/project/bFileWithImports.d.ts
  Imported via "./bFileWithImports" from file 'src/project/cFileWithImports.ts'
  File is output of project reference source 'src/project/bFileWithImports.ts'
src/project/pkg0.d.ts
  Imported via "pkg0" from file 'src/project/cFileWithImports.ts'
  Imported via "pkg0" from file 'src/project/cRandomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/cRandomFileForImport2.ts'
src/project/cFileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/cRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/project/cRandomFileForImport2.d.ts]
export type { ImportInterface0 } from "pkg0";
export declare const x = 10;


//// [/src/project/cRandomFileForImport2.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","-6057683066-export declare const x = 10;\r\n","-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n","-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n","5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-4882119183-export {};\r\n"},{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"},{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[3,4],[2],[5,6],[7,8],[8]],"referencedMap":[[5,1],[3,2],[7,3],[6,2],[9,4],[10,5],[11,5]],"exportedModulesMap":[[5,1],[3,2],[7,3],[6,2],[10,5],[11,5]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,9,10,11,2,8],"latestChangedDtsFile":"./cRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":13}},{"resolvedModule":{"resolvedFileName":8}},{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":14}},{"resolvedModule":{"resolvedFileName":15}},{"resolvedModule":{"resolvedFileName":16}},{"resolvedModule":{"resolvedFileName":17}}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[2,3],[3,4],[4,5],[5,6],[6,7]],"modules":{"own":[[12,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[12,[3,4,5,6,7]]]}]}}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./afilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./bfilewithimports.d.ts",
      "./pkg0.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./",
      "./bFileWithImports.ts",
      "./aRandomFileForImport.ts",
      "./aRandomFileForImport2.ts",
      "./aFileWithImports.ts",
      "./bRandomFileForImport.ts"
    ],
    "fileNamesList": [
      [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      [
        "./node_modules/pkg0/index.d.ts"
      ],
      [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ],
      [
        "./pkg0.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
        "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n",
        "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./crandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./crandomfileforimport2.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./brandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./cfilewithimports.ts": [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport.ts": [
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport2.ts": [
        "./pkg0.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./brandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./crandomfileforimport.ts": [
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport2.ts": [
        "./pkg0.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts",
      "./pkg0.d.ts"
    ],
    "latestChangedDtsFile": "./cRandomFileForImport2.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "./bFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
          }
        ]
      ],
      "modules": {
        "own": [
          [
            "./",
            [
              [
                "./bFileWithImports",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./bFileWithImports.ts"
                  }
                }
              ],
              [
                "pkg0",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./pkg0.d.ts"
                  }
                }
              ]
            ]
          ]
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              [
                "./",
                [
                  [
                    "pkg0",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                        "isExternalLibraryImport": true
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport.ts"
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport2",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport2.ts"
                      }
                    }
                  ],
                  [
                    "./aFileWithImports",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aFileWithImports.ts"
                      }
                    }
                  ],
                  [
                    "./bRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./bRandomFileForImport.ts"
                      }
                    }
                  ]
                ]
              ]
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 3169
}

