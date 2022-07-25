Info 0    [00:02:53.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:02:54.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["fileWithImports.ts","randomFileForImport.ts","a/fileWithImports.ts","b/ba/fileWithImports.ts","b/randomFileForImport.ts","c/ca/fileWithImports.ts","c/ca/caa/randomFileForImport.ts","c/ca/caa/caaa/fileWithImports.ts","c/cb/fileWithImports.ts","d/da/daa/daaa/x/y/z/randomFileForImport.ts","d/da/daa/daaa/fileWithImports.ts","d/da/daa/fileWithImports.ts","d/da/fileWithImports.ts","e/ea/fileWithImports.ts","e/ea/eaa/fileWithImports.ts","e/ea/eaa/eaaa/fileWithImports.ts","e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts"]}

//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/a/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/b/ba/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/b/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/c/ca/caa/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/caa/caaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/c/cb/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/src/project/d/da/daa/daaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/d/da/daa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/d/da/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/eaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/src/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

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

//// [/src/project/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/fileWithImports.d.ts]
export {};


//// [/src/project/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/a/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/a/fileWithImports.d.ts]
export {};


//// [/src/project/b/ba/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/b/ba/fileWithImports.d.ts]
export {};


//// [/src/project/b/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/b/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/c/ca/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/c/ca/fileWithImports.d.ts]
export {};


//// [/src/project/c/ca/caa/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/c/ca/caa/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/c/ca/caa/caaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/c/ca/caa/caaa/fileWithImports.d.ts]
export {};


//// [/src/project/c/cb/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/c/cb/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/d/da/daa/daaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/d/da/daa/daaa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/d/da/daa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/d/da/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/e/ea/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/e/ea/eaa/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,3,2,4],"latestChangedDtsFile":"./e/ea/eaa/eaaa/x/y/z/randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
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
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
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
      },
      "./a/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
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
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./e/ea/eaa/eaaa/x/y/z/randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "isExternalLibraryImport": true
            }
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        }
      ],
      "modules": [
        {
          "dir": "./a",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            }
          ]
        },
        {
          "dir": "./b/ba",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            }
          ]
        },
        {
          "dir": "./c/ca/caa/caaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            }
          ]
        },
        {
          "dir": "./c/cb",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            }
          ]
        },
        {
          "dir": "./d/da/daa/daaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            }
          ]
        },
        {
          "dir": "./e/ea/eaa/eaaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3658
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:02:55.000] Search path: /src/project
Info 3    [00:02:56.000] For info: /src/project/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 4    [00:02:57.000] Creating configuration project /src/project/tsconfig.json
Info 5    [00:02:58.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 6    [00:02:59.000] Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/fileWithImports.ts",
  "/src/project/randomFileForImport.ts",
  "/src/project/a/fileWithImports.ts",
  "/src/project/b/ba/fileWithImports.ts",
  "/src/project/b/randomFileForImport.ts",
  "/src/project/c/ca/fileWithImports.ts",
  "/src/project/c/ca/caa/randomFileForImport.ts",
  "/src/project/c/ca/caa/caaa/fileWithImports.ts",
  "/src/project/c/cb/fileWithImports.ts",
  "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/src/project/d/da/daa/daaa/fileWithImports.ts",
  "/src/project/d/da/daa/fileWithImports.ts",
  "/src/project/d/da/fileWithImports.ts",
  "/src/project/e/ea/fileWithImports.ts",
  "/src/project/e/ea/eaa/fileWithImports.ts",
  "/src/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.json"
 }
}
Info 7    [00:03:00.000] FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 8    [00:03:01.000] FileWatcher:: Added:: WatchInfo: /src/project/a/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 9    [00:03:02.000] FileWatcher:: Added:: WatchInfo: /src/project/b/ba/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 10   [00:03:03.000] FileWatcher:: Added:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 11   [00:03:04.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 12   [00:03:05.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 13   [00:03:06.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/caaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 14   [00:03:07.000] FileWatcher:: Added:: WatchInfo: /src/project/c/cb/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 15   [00:03:08.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 16   [00:03:09.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 17   [00:03:10.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 18   [00:03:11.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 19   [00:03:12.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 20   [00:03:13.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 21   [00:03:14.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 22   [00:03:15.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 23   [00:03:16.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 24   [00:03:17.000] ======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Info 25   [00:03:18.000] Module resolution kind is not specified, using 'NodeJs'.
Info 26   [00:03:19.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 27   [00:03:20.000] File '/src/project/node_modules/pkg0/package.json' does not exist.
Info 28   [00:03:21.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 29   [00:03:22.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 30   [00:03:23.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 31   [00:03:24.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 32   [00:03:25.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 33   [00:03:26.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 34   [00:03:27.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 35   [00:03:28.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 36   [00:03:29.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 37   [00:03:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 38   [00:03:31.000] ======== Resolving module 'pkg0' from '/src/project/a/fileWithImports.ts'. ========
Info 39   [00:03:32.000] Module resolution kind is not specified, using 'NodeJs'.
Info 40   [00:03:33.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 41   [00:03:34.000] Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Info 42   [00:03:35.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 43   [00:03:36.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 44   [00:03:37.000] ======== Resolving module 'pkg0' from '/src/project/b/ba/fileWithImports.ts'. ========
Info 45   [00:03:38.000] Module resolution kind is not specified, using 'NodeJs'.
Info 46   [00:03:39.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 47   [00:03:40.000] Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Info 48   [00:03:41.000] Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Info 49   [00:03:42.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 50   [00:03:43.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 51   [00:03:44.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/fileWithImports.ts'. ========
Info 52   [00:03:45.000] Module resolution kind is not specified, using 'NodeJs'.
Info 53   [00:03:46.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 54   [00:03:47.000] Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info 55   [00:03:48.000] Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Info 56   [00:03:49.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 57   [00:03:50.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 58   [00:03:51.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Info 59   [00:03:52.000] Module resolution kind is not specified, using 'NodeJs'.
Info 60   [00:03:53.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 61   [00:03:54.000] Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Info 62   [00:03:55.000] Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info 63   [00:03:56.000] Resolution for module 'pkg0' was found in cache from location '/src/project/c/ca'.
Info 64   [00:03:57.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 65   [00:03:58.000] ======== Resolving module 'pkg0' from '/src/project/c/cb/fileWithImports.ts'. ========
Info 66   [00:03:59.000] Module resolution kind is not specified, using 'NodeJs'.
Info 67   [00:04:00.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 68   [00:04:01.000] Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Info 69   [00:04:02.000] Resolution for module 'pkg0' was found in cache from location '/src/project/c'.
Info 70   [00:04:03.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 71   [00:04:04.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Info 72   [00:04:05.000] Module resolution kind is not specified, using 'NodeJs'.
Info 73   [00:04:06.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 74   [00:04:07.000] Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info 75   [00:04:08.000] Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info 76   [00:04:09.000] Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info 77   [00:04:10.000] Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Info 78   [00:04:11.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 79   [00:04:12.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 80   [00:04:13.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Info 81   [00:04:14.000] Module resolution kind is not specified, using 'NodeJs'.
Info 82   [00:04:15.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 83   [00:04:16.000] Resolution for module 'pkg0' was found in cache from location '/src/project/d/da/daa'.
Info 84   [00:04:17.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 85   [00:04:18.000] ======== Resolving module 'pkg0' from '/src/project/d/da/fileWithImports.ts'. ========
Info 86   [00:04:19.000] Module resolution kind is not specified, using 'NodeJs'.
Info 87   [00:04:20.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 88   [00:04:21.000] Resolution for module 'pkg0' was found in cache from location '/src/project/d/da'.
Info 89   [00:04:22.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 90   [00:04:23.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/fileWithImports.ts'. ========
Info 91   [00:04:24.000] Module resolution kind is not specified, using 'NodeJs'.
Info 92   [00:04:25.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 93   [00:04:26.000] Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info 94   [00:04:27.000] Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Info 95   [00:04:28.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 96   [00:04:29.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 97   [00:04:30.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Info 98   [00:04:31.000] Module resolution kind is not specified, using 'NodeJs'.
Info 99   [00:04:32.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 100  [00:04:33.000] Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info 101  [00:04:34.000] Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea'.
Info 102  [00:04:35.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 103  [00:04:36.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Info 104  [00:04:37.000] Module resolution kind is not specified, using 'NodeJs'.
Info 105  [00:04:38.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 106  [00:04:39.000] Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info 107  [00:04:40.000] Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea/eaa'.
Info 108  [00:04:41.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 109  [00:04:42.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 110  [00:04:43.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 111  [00:04:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 112  [00:04:45.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 113  [00:04:46.000] Project '/src/project/tsconfig.json' (Configured)
Info 114  [00:04:47.000] 	Files (19)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/index.d.ts
	/src/project/fileWithImports.ts
	/src/project/randomFileForImport.ts
	/src/project/a/fileWithImports.ts
	/src/project/b/ba/fileWithImports.ts
	/src/project/b/randomFileForImport.ts
	/src/project/c/ca/fileWithImports.ts
	/src/project/c/ca/caa/randomFileForImport.ts
	/src/project/c/ca/caa/caaa/fileWithImports.ts
	/src/project/c/cb/fileWithImports.ts
	/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
	/src/project/d/da/daa/daaa/fileWithImports.ts
	/src/project/d/da/daa/fileWithImports.ts
	/src/project/d/da/fileWithImports.ts
	/src/project/e/ea/fileWithImports.ts
	/src/project/e/ea/eaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'a/fileWithImports.ts'
	  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
	fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	a/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/ba/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/caaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/cb/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json

Info 115  [00:04:48.000] -----------------------------------------------
Info 116  [00:04:49.000] Search path: /src/project
Info 117  [00:04:50.000] For info: /src/project/tsconfig.json :: No config files found.
Info 118  [00:04:51.000] Project '/src/project/tsconfig.json' (Configured)
Info 118  [00:04:52.000] 	Files (19)

Info 118  [00:04:53.000] -----------------------------------------------
Info 118  [00:04:54.000] Open files: 
Info 118  [00:04:55.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 118  [00:04:56.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/b/randomfileforimport.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 118  [00:04:57.000] response:
    {
      "responseRequired": false
    }
Info 119  [00:04:58.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/b/randomFileForImport.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/b/randomfileforimport.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 120  [00:04:59.000] FileWatcher:: Close:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 121  [00:05:00.000] Search path: /src/project/b
Info 122  [00:05:01.000] For info: /src/project/b/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 123  [00:05:02.000] Search path: /src/project
Info 124  [00:05:03.000] For info: /src/project/tsconfig.json :: No config files found.
Info 125  [00:05:04.000] Project '/src/project/tsconfig.json' (Configured)
Info 125  [00:05:05.000] 	Files (19)

Info 125  [00:05:06.000] -----------------------------------------------
Info 125  [00:05:07.000] Open files: 
Info 125  [00:05:08.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 125  [00:05:09.000] 		Projects: /src/project/tsconfig.json
Info 125  [00:05:10.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 125  [00:05:11.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 125  [00:05:12.000] response:
    {
      "responseRequired": false
    }
Info 126  [00:05:13.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/c/ca/caa/randomFileForImport.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 127  [00:05:14.000] FileWatcher:: Close:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 128  [00:05:15.000] Search path: /src/project/c/ca/caa
Info 129  [00:05:16.000] For info: /src/project/c/ca/caa/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 130  [00:05:17.000] Search path: /src/project
Info 131  [00:05:18.000] For info: /src/project/tsconfig.json :: No config files found.
Info 132  [00:05:19.000] Project '/src/project/tsconfig.json' (Configured)
Info 132  [00:05:20.000] 	Files (19)

Info 132  [00:05:21.000] -----------------------------------------------
Info 132  [00:05:22.000] Open files: 
Info 132  [00:05:23.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 132  [00:05:24.000] 		Projects: /src/project/tsconfig.json
Info 132  [00:05:25.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 132  [00:05:26.000] 		Projects: /src/project/tsconfig.json
Info 132  [00:05:27.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 132  [00:05:28.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 132  [00:05:29.000] response:
    {
      "responseRequired": false
    }
Info 133  [00:05:30.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 134  [00:05:31.000] FileWatcher:: Close:: WatchInfo: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 135  [00:05:32.000] Search path: /src/project/d/da/daa/daaa/x/y/z
Info 136  [00:05:33.000] For info: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 137  [00:05:34.000] Search path: /src/project
Info 138  [00:05:35.000] For info: /src/project/tsconfig.json :: No config files found.
Info 139  [00:05:36.000] Project '/src/project/tsconfig.json' (Configured)
Info 139  [00:05:37.000] 	Files (19)

Info 139  [00:05:38.000] -----------------------------------------------
Info 139  [00:05:39.000] Open files: 
Info 139  [00:05:40.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 139  [00:05:41.000] 		Projects: /src/project/tsconfig.json
Info 139  [00:05:42.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 139  [00:05:43.000] 		Projects: /src/project/tsconfig.json
Info 139  [00:05:44.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 139  [00:05:45.000] 		Projects: /src/project/tsconfig.json
Info 139  [00:05:46.000] 	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 139  [00:05:47.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 139  [00:05:48.000] response:
    {
      "responseRequired": false
    }
Info 140  [00:05:49.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts"
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 141  [00:05:50.000] FileWatcher:: Close:: WatchInfo: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 142  [00:05:51.000] Search path: /src/project/e/ea/eaa/eaaa/x/y/z
Info 143  [00:05:52.000] For info: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 144  [00:05:53.000] Search path: /src/project
Info 145  [00:05:54.000] For info: /src/project/tsconfig.json :: No config files found.
Info 146  [00:05:55.000] Project '/src/project/tsconfig.json' (Configured)
Info 146  [00:05:56.000] 	Files (19)

Info 146  [00:05:57.000] -----------------------------------------------
Info 146  [00:05:58.000] Open files: 
Info 146  [00:05:59.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:06:00.000] 		Projects: /src/project/tsconfig.json
Info 146  [00:06:01.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:06:02.000] 		Projects: /src/project/tsconfig.json
Info 146  [00:06:03.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:06:04.000] 		Projects: /src/project/tsconfig.json
Info 146  [00:06:05.000] 	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:06:06.000] 		Projects: /src/project/tsconfig.json
Info 146  [00:06:07.000] 	FileName: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:06:08.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 146  [00:06:09.000] response:
    {
      "responseRequired": false
    }
Info 147  [00:06:10.000] modify randomFileForImport by adding import
Info 148  [00:06:11.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 6,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 149  [00:06:12.000] response:
    {
      "responseRequired": false
    }
Info 150  [00:06:13.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 151  [00:06:14.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 152  [00:06:15.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 153  [00:06:16.000] Module resolution kind is not specified, using 'NodeJs'.
Info 154  [00:06:17.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 155  [00:06:18.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 156  [00:06:19.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 157  [00:06:20.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 158  [00:06:21.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 159  [00:06:22.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 160  [00:06:23.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 161  [00:06:24.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 162  [00:06:25.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 163  [00:06:26.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 164  [00:06:27.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 165  [00:06:28.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 166  [00:06:29.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 167  [00:06:30.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 168  [00:06:31.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 169  [00:06:32.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 170  [00:06:33.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 171  [00:06:34.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 172  [00:06:35.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 173  [00:06:36.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 174  [00:06:37.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 175  [00:06:38.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 176  [00:06:39.000] Different program with same set of files
Info 177  [00:06:40.000] modify b/randomFileForImport by adding import
Info 178  [00:06:41.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/b/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 7,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 179  [00:06:42.000] response:
    {
      "responseRequired": false
    }
Info 180  [00:06:43.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 181  [00:06:44.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 182  [00:06:45.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 183  [00:06:46.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 184  [00:06:47.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 185  [00:06:48.000] ======== Resolving module 'pkg0' from '/src/project/b/randomFileForImport.ts'. ========
Info 186  [00:06:49.000] Module resolution kind is not specified, using 'NodeJs'.
Info 187  [00:06:50.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 188  [00:06:51.000] Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Info 189  [00:06:52.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 190  [00:06:53.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 191  [00:06:54.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 192  [00:06:55.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 193  [00:06:56.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 194  [00:06:57.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 195  [00:06:58.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 196  [00:06:59.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 197  [00:07:00.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 198  [00:07:01.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 199  [00:07:02.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 200  [00:07:03.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 201  [00:07:04.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 202  [00:07:05.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 203  [00:07:06.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 204  [00:07:07.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 205  [00:07:08.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 206  [00:07:09.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 207  [00:07:10.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 208  [00:07:11.000] Different program with same set of files
Info 209  [00:07:12.000] modify c/ca/caa/randomFileForImport by adding import
Info 210  [00:07:13.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/c/ca/caa/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 8,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 211  [00:07:14.000] response:
    {
      "responseRequired": false
    }
Info 212  [00:07:15.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 213  [00:07:16.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 214  [00:07:17.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 215  [00:07:18.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 216  [00:07:19.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 217  [00:07:20.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 218  [00:07:21.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 219  [00:07:22.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Info 220  [00:07:23.000] Module resolution kind is not specified, using 'NodeJs'.
Info 221  [00:07:24.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 222  [00:07:25.000] Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info 223  [00:07:26.000] Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info 224  [00:07:27.000] Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Info 225  [00:07:28.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 226  [00:07:29.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 227  [00:07:30.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 228  [00:07:31.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 229  [00:07:32.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 230  [00:07:33.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 231  [00:07:34.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 232  [00:07:35.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 233  [00:07:36.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 234  [00:07:37.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 235  [00:07:38.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 236  [00:07:39.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 237  [00:07:40.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 238  [00:07:41.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 239  [00:07:42.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 240  [00:07:43.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 241  [00:07:44.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 242  [00:07:45.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 243  [00:07:46.000] Different program with same set of files
Info 244  [00:07:47.000] modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import
Info 245  [00:07:48.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 9,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 246  [00:07:49.000] response:
    {
      "responseRequired": false
    }
Info 247  [00:07:50.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 248  [00:07:51.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 249  [00:07:52.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 250  [00:07:53.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 251  [00:07:54.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 252  [00:07:55.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 253  [00:07:56.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 254  [00:07:57.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 255  [00:07:58.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 256  [00:07:59.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 257  [00:08:00.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Info 258  [00:08:01.000] Module resolution kind is not specified, using 'NodeJs'.
Info 259  [00:08:02.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 260  [00:08:03.000] Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 261  [00:08:04.000] Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 262  [00:08:05.000] Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Info 263  [00:08:06.000] Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info 264  [00:08:07.000] Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info 265  [00:08:08.000] Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info 266  [00:08:09.000] Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Info 267  [00:08:10.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 268  [00:08:11.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 269  [00:08:12.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 270  [00:08:13.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 271  [00:08:14.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 272  [00:08:15.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 273  [00:08:16.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 274  [00:08:17.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 275  [00:08:18.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 276  [00:08:19.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 277  [00:08:20.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 278  [00:08:21.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 279  [00:08:22.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 280  [00:08:23.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 281  [00:08:24.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 282  [00:08:25.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 283  [00:08:26.000] Different program with same set of files
Info 284  [00:08:27.000] modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import
Info 285  [00:08:28.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 10,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 286  [00:08:29.000] response:
    {
      "responseRequired": false
    }
Info 287  [00:08:30.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 288  [00:08:31.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 289  [00:08:32.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 290  [00:08:33.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 291  [00:08:34.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 292  [00:08:35.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 293  [00:08:36.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 294  [00:08:37.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 295  [00:08:38.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 296  [00:08:39.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 297  [00:08:40.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 298  [00:08:41.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 299  [00:08:42.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 300  [00:08:43.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 301  [00:08:44.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 302  [00:08:45.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 303  [00:08:46.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 304  [00:08:47.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Info 305  [00:08:48.000] Module resolution kind is not specified, using 'NodeJs'.
Info 306  [00:08:49.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 307  [00:08:50.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 308  [00:08:51.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 309  [00:08:52.000] Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Info 310  [00:08:53.000] Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info 311  [00:08:54.000] Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info 312  [00:08:55.000] Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info 313  [00:08:56.000] Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Info 314  [00:08:57.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 315  [00:08:58.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 316  [00:08:59.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 317  [00:09:00.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 318  [00:09:01.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 319  [00:09:02.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 320  [00:09:03.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 321  [00:09:04.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 322  [00:09:05.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 323  [00:09:06.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 324  [00:09:07.000] Different program with same set of files