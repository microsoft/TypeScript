Input::
//// [/src/project/tsconfig.a.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["aFileWithImports.ts","aRandomFileForImport.ts","aRandomFileForImport2.ts"]}

//// [/src/project/aFileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
export { x } from "./aRandomFileForImport";
export { x as x2 } from "./aRandomFileForImport2";
export const y = 10;


//// [/src/project/aRandomFileForImport.ts]
export const x = 10;

//// [/src/project/aRandomFileForImport2.ts]
export const x = 10;

//// [/src/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/src/project/tsconfig.b.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["bFileWithImports.ts","bRandomFileForImport.ts","bRandomFileForImport2.ts"],"references":[{"path":"./tsconfig.a.json"}]}

//// [/src/project/bFileWithImports.ts]
export { y } from "./aFileWithImports";
export { x } from "./bRandomFileForImport";
import type { ImportInterface0 } from "pkg0";


//// [/src/project/bRandomFileForImport.ts]
export const x = 10;

//// [/src/project/bRandomFileForImport2.ts]
export const x = 10;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true,"module":"amd"},"files":["cFileWithImports.ts","cRandomFileForImport.ts","cRandomFileForImport2.ts"],"references":[{"path":"./tsconfig.a.json"},{"path":"./tsconfig.b.json"}]}

//// [/src/project/cFileWithImports.ts]
import { y } from "./bFileWithImports";
import type { ImportInterface0 } from "pkg0";


//// [/src/project/cRandomFileForImport.ts]
export const x = 10;

//// [/src/project/cRandomFileForImport2.ts]
export const x = 10;

//// [/src/project/pkg0.d.ts]
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

//// [/src/project/aRandomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/aRandomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/aRandomFileForImport2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/aRandomFileForImport2.d.ts]
export declare const x = 10;


//// [/src/project/aFileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x2 = exports.x = void 0;
var aRandomFileForImport_1 = require("./aRandomFileForImport");
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return aRandomFileForImport_1.x; } });
var aRandomFileForImport2_1 = require("./aRandomFileForImport2");
Object.defineProperty(exports, "x2", { enumerable: true, get: function () { return aRandomFileForImport2_1.x; } });
exports.y = 10;


//// [/src/project/aFileWithImports.d.ts]
export { x } from "./aRandomFileForImport";
export { x as x2 } from "./aRandomFileForImport2";
export declare const y = 10;


//// [/src/project/tsconfig.a.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.ts","./arandomfileforimport2.ts","./afilewithimports.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n","signature":"-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3,4],[3,4]],"referencedMap":[[5,1]],"exportedModulesMap":[[5,2]],"semanticDiagnosticsPerFile":[1,5,3,4,2],"latestChangedDtsFile":"./aFileWithImports.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedModule":7},{"resolvedModule":8}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[6,[1,2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
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
      "./arandomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./arandomfileforimport2.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./afilewithimports.ts": {
        "original": {
          "version": "25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n",
          "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
        },
        "version": "25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n",
        "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
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
      "../../a/lib/lib.d.ts",
      "./afilewithimports.ts",
      "./arandomfileforimport.ts",
      "./arandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "./aFileWithImports.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 7
          },
          "resolutionId": 2,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 3,
          "resolvedModule": "./aRandomFileForImport2.ts"
        }
      ],
      "names": [
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2"
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
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aRandomFileForImport",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./aRandomFileForImport.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./aRandomFileForImport2",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "./aRandomFileForImport2.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1740
}

//// [/src/project/bRandomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/bRandomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/bFileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.y = void 0;
var aFileWithImports_1 = require("./aFileWithImports");
Object.defineProperty(exports, "y", { enumerable: true, get: function () { return aFileWithImports_1.y; } });
var bRandomFileForImport_1 = require("./bRandomFileForImport");
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return bRandomFileForImport_1.x; } });


//// [/src/project/bFileWithImports.d.ts]
export { y } from "./aFileWithImports";
export { x } from "./bRandomFileForImport";


//// [/src/project/bRandomFileForImport2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/bRandomFileForImport2.d.ts]
export declare const x = 10;


//// [/src/project/tsconfig.b.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.ts","./node_modules/pkg0/index.d.ts","./bfilewithimports.ts","./brandomfileforimport2.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-6821242887-export declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},"769951468-export interface ImportInterface0 {}",{"version":"-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3],[4,5,6],[4,5]],"referencedMap":[[4,1],[7,2]],"exportedModulesMap":[[4,1],[7,3]],"semanticDiagnosticsPerFile":[1,4,2,3,7,5,8,6],"latestChangedDtsFile":"./bRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":10},{"resolvedModule":11},{"resolvedModule":12},{"resolvedModule":13},{"resolvedModule":6}],"names":["./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport","pkg0"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[9,[1,2,3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
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
      "../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./arandomfileforimport.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",
        "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
      },
      "./brandomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./bfilewithimports.ts": {
        "original": {
          "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
        },
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
      },
      "./brandomfileforimport2.ts": {
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
      "../../a/lib/lib.d.ts",
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
          "original": {
            "resolvedModule": 10
          },
          "resolutionId": 1,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 11
          },
          "resolutionId": 2,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 12
          },
          "resolutionId": 3,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 4,
          "resolvedModule": "./bRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 6
          },
          "resolutionId": 5,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./bRandomFileForImport.ts"
          }
        },
        {
          "original": [
            5,
            5
          ],
          "resolutionEntryId": 5,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./aRandomFileForImport",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./aRandomFileForImport.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aRandomFileForImport2",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./aRandomFileForImport2.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./aFileWithImports",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "./aFileWithImports.ts"
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "./bRandomFileForImport",
              "resolution": {
                "resolutionId": 4,
                "resolvedModule": "./bRandomFileForImport.ts"
              }
            },
            {
              "resolutionEntryId": 5,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 5,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2179
}

//// [/src/project/cFileWithImports.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});


//// [/src/project/cFileWithImports.d.ts]
export {};


//// [/src/project/cRandomFileForImport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});


//// [/src/project/cRandomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/cRandomFileForImport2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});


//// [/src/project/cRandomFileForImport2.d.ts]
export declare const x = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-6821242887-export declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n","-6821242887-export declare const x = 10;\n","-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[2,3],[4,5],[6,7]],"referencedMap":[[4,1],[6,2],[8,3]],"exportedModulesMap":[[4,1],[6,2]],"semanticDiagnosticsPerFile":[1,4,2,3,6,5,8,9,10,7],"latestChangedDtsFile":"./cRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":12},{"resolvedModule":7},{"resolvedModule":13},{"resolvedModule":14},{"resolvedModule":15},{"resolvedModule":16}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]],"modules":{"own":[[11,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[11,[3,4,5,6]]]}]}}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
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
      "../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./arandomfileforimport.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",
        "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n",
        "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "original": {
          "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./crandomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./crandomfileforimport2.ts": {
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
      "../../a/lib/lib.d.ts",
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
          "original": {
            "resolvedModule": 12
          },
          "resolutionId": 1,
          "resolvedModule": "./bFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 7
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 3,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 14
          },
          "resolutionId": 4,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 15
          },
          "resolutionId": 5,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 16
          },
          "resolutionId": 6,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./bFileWithImports",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./bFileWithImports.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            5,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            6,
            6
          ],
          "resolutionEntryId": 6,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 6,
            "resolvedModule": "./bRandomFileForImport.ts"
          }
        }
      ],
      "modules": {
        "own": [
          {
            "dir": "./",
            "resolutions": [
              {
                "resolutionEntryId": 1,
                "name": "./bFileWithImports",
                "resolution": {
                  "resolutionId": 1,
                  "resolvedModule": "./bFileWithImports.ts"
                }
              },
              {
                "resolutionEntryId": 2,
                "name": "pkg0",
                "resolution": {
                  "resolutionId": 2,
                  "resolvedModule": "./pkg0.d.ts"
                }
              }
            ]
          }
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              {
                "dir": "./",
                "resolutions": [
                  {
                    "resolutionEntryId": 3,
                    "name": "./aRandomFileForImport",
                    "resolution": {
                      "resolutionId": 3,
                      "resolvedModule": "./aRandomFileForImport.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 4,
                    "name": "./aRandomFileForImport2",
                    "resolution": {
                      "resolutionId": 4,
                      "resolvedModule": "./aRandomFileForImport2.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 5,
                    "name": "./aFileWithImports",
                    "resolution": {
                      "resolutionId": 5,
                      "resolvedModule": "./aFileWithImports.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 6,
                    "name": "./bRandomFileForImport",
                    "resolution": {
                      "resolutionId": 6,
                      "resolvedModule": "./bRandomFileForImport.ts"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 2413
}


/a/lib/tsc.js -b -w --explainFiles -v
Output::
======== Resolving module 'pkg0' from '/src/project/aFileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
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
Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport', target file types: TypeScript, Declaration.
File '/src/project/aRandomFileForImport.ts' exist - use it as a name resolution result.
======== Module name './aRandomFileForImport' was successfully resolved to '/src/project/aRandomFileForImport.ts'. ========
======== Resolving module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport2', target file types: TypeScript, Declaration.
File '/src/project/aRandomFileForImport2.ts' exist - use it as a name resolution result.
======== Module name './aRandomFileForImport2' was successfully resolved to '/src/project/aRandomFileForImport2.ts'. ========
======== Resolving module './aFileWithImports' from '/src/project/bFileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/src/project/aFileWithImports', target file types: TypeScript, Declaration.
File '/src/project/aFileWithImports.ts' exist - use it as a name resolution result.
======== Module name './aFileWithImports' was successfully resolved to '/src/project/aFileWithImports.ts'. ========
======== Resolving module './bRandomFileForImport' from '/src/project/bFileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/src/project/bRandomFileForImport', target file types: TypeScript, Declaration.
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

>> Screen clear
[[90m12:01:36 AM[0m] Starting compilation in watch mode...

[[90m12:01:37 AM[0m] Projects in this build: 
    * tsconfig.a.json
    * tsconfig.b.json
    * tsconfig.json

[[90m12:01:38 AM[0m] Project 'tsconfig.a.json' is up to date because newest input 'aRandomFileForImport2.ts' is older than output 'tsconfig.a.tsbuildinfo'

[[90m12:01:39 AM[0m] Project 'tsconfig.b.json' is up to date because newest input 'bRandomFileForImport2.ts' is older than output 'tsconfig.b.tsbuildinfo'

[[90m12:01:40 AM[0m] Project 'tsconfig.json' is up to date because newest input 'cRandomFileForImport2.ts' is older than output 'tsconfig.tsbuildinfo'

[[90m12:01:41 AM[0m] Found 0 errors. Watching for file changes.



PolledWatches::

FsWatches::
/src/project/tsconfig.a.json:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/brandomfileforimport.ts:
  {}
/src/project/brandomfileforimport2.ts:
  {}
/src/project/tsconfig.json:
  {}
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: modify aRandomFileForImport by adding import

Input::
//// [/src/project/aRandomFileForImport.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:01:44 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:45 AM[0m] Project 'tsconfig.a.json' is out of date because output 'tsconfig.a.tsbuildinfo' is older than input 'aRandomFileForImport.ts'

[[90m12:01:46 AM[0m] Building project '/src/project/tsconfig.a.json'...

Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'aFileWithImports.ts'
  Imported via "pkg0" from file 'aRandomFileForImport.ts'
aRandomFileForImport.ts
  Imported via "./aRandomFileForImport" from file 'aFileWithImports.ts'
  Part of 'files' list in tsconfig.json
aRandomFileForImport2.ts
  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.ts'
  Part of 'files' list in tsconfig.json
aFileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90m12:02:03 AM[0m] Project 'tsconfig.b.json' is out of date because output 'tsconfig.b.tsbuildinfo' is older than input 'tsconfig.a.json'

[[90m12:02:04 AM[0m] Building project '/src/project/tsconfig.b.json'...

Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'bFileWithImports.ts'
aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport.ts'
aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport2.ts'
aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'bFileWithImports.ts'
  File is output of project reference source 'aFileWithImports.ts'
bRandomFileForImport.ts
  Imported via "./bRandomFileForImport" from file 'bFileWithImports.ts'
  Part of 'files' list in tsconfig.json
bFileWithImports.ts
  Part of 'files' list in tsconfig.json
bRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
[[90m12:02:12 AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'tsconfig.a.json'

[[90m12:02:13 AM[0m] Building project '/src/project/tsconfig.json'...

Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bFileWithImports.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'aRandomFileForImport.d.ts'
aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport.ts'
aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport2.ts'
aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'bFileWithImports.d.ts'
  File is output of project reference source 'aFileWithImports.ts'
bRandomFileForImport.d.ts
  Imported via "./bRandomFileForImport" from file 'bFileWithImports.d.ts'
  File is output of project reference source 'bRandomFileForImport.ts'
bFileWithImports.d.ts
  Imported via "./bFileWithImports" from file 'cFileWithImports.ts'
  File is output of project reference source 'bFileWithImports.ts'
pkg0.d.ts
  Imported via "pkg0" from file 'cFileWithImports.ts'
cFileWithImports.ts
  Part of 'files' list in tsconfig.json
cRandomFileForImport.ts
  Part of 'files' list in tsconfig.json
cRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
[[90m12:02:21 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/aFileWithImports.ts","/src/project/aRandomFileForImport.ts","/src/project/aRandomFileForImport2.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.a.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/aRandomFileForImport.ts
/src/project/aRandomFileForImport2.ts
/src/project/aFileWithImports.ts

Semantic diagnostics in builder refreshed for::
/src/project/aRandomFileForImport.ts
/src/project/aFileWithImports.ts

Shape signatures in builder refreshed for::
/src/project/arandomfileforimport.ts (computed .d.ts)
/src/project/afilewithimports.ts (computed .d.ts)

Program root files: ["/src/project/bFileWithImports.ts","/src/project/bRandomFileForImport.ts","/src/project/bRandomFileForImport2.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.b.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/aRandomFileForImport.d.ts
/src/project/aRandomFileForImport2.d.ts
/src/project/aFileWithImports.d.ts
/src/project/bRandomFileForImport.ts
/src/project/bFileWithImports.ts
/src/project/bRandomFileForImport2.ts

Semantic diagnostics in builder refreshed for::
/src/project/aRandomFileForImport.d.ts
/src/project/aFileWithImports.d.ts
/src/project/bFileWithImports.ts

Shape signatures in builder refreshed for::
/src/project/arandomfileforimport.d.ts (used version)
/src/project/afilewithimports.d.ts (used version)
/src/project/bfilewithimports.ts (computed .d.ts during emit)

Program root files: ["/src/project/cFileWithImports.ts","/src/project/cRandomFileForImport.ts","/src/project/cRandomFileForImport2.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"module":2,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/aRandomFileForImport.d.ts
/src/project/aRandomFileForImport2.d.ts
/src/project/aFileWithImports.d.ts
/src/project/bRandomFileForImport.d.ts
/src/project/bFileWithImports.d.ts
/src/project/pkg0.d.ts
/src/project/cFileWithImports.ts
/src/project/cRandomFileForImport.ts
/src/project/cRandomFileForImport2.ts

Semantic diagnostics in builder refreshed for::
/src/project/node_modules/pkg0/index.d.ts
/src/project/aRandomFileForImport.d.ts
/src/project/aFileWithImports.d.ts
/src/project/bFileWithImports.d.ts
/src/project/cFileWithImports.ts

Shape signatures in builder refreshed for::
/src/project/node_modules/pkg0/index.d.ts (used version)
/src/project/arandomfileforimport.d.ts (used version)
/src/project/afilewithimports.d.ts (used version)
/src/project/bfilewithimports.d.ts (used version)
/src/project/cfilewithimports.ts (computed .d.ts during emit)

File: /src/project/aRandomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/aFileWithImports.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}
./aRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./aRandomFileForImport2: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport2.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}

File: /src/project/aRandomFileForImport.d.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/aFileWithImports.d.ts
resolvedModules:
./aRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./aRandomFileForImport2: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport2.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}

File: /src/project/bFileWithImports.ts
resolvedModules:
./aFileWithImports: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aFileWithImports.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./bRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/bRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/aRandomFileForImport.d.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/aFileWithImports.d.ts
resolvedModules:
./aRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./aRandomFileForImport2: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport2.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}

File: /src/project/bFileWithImports.d.ts
resolvedModules:
./aFileWithImports: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aFileWithImports.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./bRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/bRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}

File: /src/project/cFileWithImports.ts
resolvedModules:
./bFileWithImports: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/bFileWithImports.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "isExternalLibraryImport": false,
    "extension": ".d.ts"
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.a.json:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/brandomfileforimport.ts:
  {}
/src/project/brandomfileforimport2.ts:
  {}
/src/project/tsconfig.json:
  {}
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/aRandomFileForImport.js] file written with same contents
//// [/src/project/aRandomFileForImport.d.ts]
export type { ImportInterface0 } from "pkg0";
export declare const x = 10;


//// [/src/project/aFileWithImports.js] file written with same contents
//// [/src/project/tsconfig.a.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.ts","./arandomfileforimport2.ts","./afilewithimports.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n","signature":"-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3,4],[2],[3,4]],"referencedMap":[[5,1],[3,2]],"exportedModulesMap":[[5,3],[3,2]],"semanticDiagnosticsPerFile":[1,5,3,4,2],"latestChangedDtsFile":"./aRandomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedModule":7},{"resolvedModule":8}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[6,[1,2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
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
      "./arandomfileforimport.ts": {
        "original": {
          "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
          "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
        },
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./arandomfileforimport2.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./afilewithimports.ts": {
        "original": {
          "version": "25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n",
          "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
        },
        "version": "25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n",
        "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
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
      "../../a/lib/lib.d.ts",
      "./afilewithimports.ts",
      "./arandomfileforimport.ts",
      "./arandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "./aRandomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 7
          },
          "resolutionId": 2,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 3,
          "resolvedModule": "./aRandomFileForImport2.ts"
        }
      ],
      "names": [
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2"
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
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aRandomFileForImport",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./aRandomFileForImport.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./aRandomFileForImport2",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "./aRandomFileForImport2.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1859
}

//// [/src/project/tsconfig.b.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.ts","./bfilewithimports.ts","./brandomfileforimport2.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[3,4],[2],[2,5,6],[5,6]],"referencedMap":[[5,1],[3,2],[7,3]],"exportedModulesMap":[[5,1],[3,2],[7,4]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,8,2],"latestChangedDtsFile":"./bRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedModule":10},{"resolvedModule":11},{"resolvedModule":12},{"resolvedModule":13}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[9,[1,2,3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
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
      "./arandomfileforimport.d.ts": {
        "version": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",
        "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
      },
      "./brandomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./bfilewithimports.ts": {
        "original": {
          "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
        },
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
      },
      "./brandomfileforimport2.ts": {
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
      "../../a/lib/lib.d.ts",
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
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 10
          },
          "resolutionId": 2,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 11
          },
          "resolutionId": 3,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 12
          },
          "resolutionId": 4,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 5,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            5,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./bRandomFileForImport.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aRandomFileForImport",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./aRandomFileForImport.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./aRandomFileForImport2",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "./aRandomFileForImport2.ts"
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "./aFileWithImports",
              "resolution": {
                "resolutionId": 4,
                "resolvedModule": "./aFileWithImports.ts"
              }
            },
            {
              "resolutionEntryId": 5,
              "name": "./bRandomFileForImport",
              "resolution": {
                "resolutionId": 5,
                "resolvedModule": "./bRandomFileForImport.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2245
}

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n","-6821242887-export declare const x = 10;\n","-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[3,4],[2],[5,6],[7,8]],"referencedMap":[[5,1],[3,2],[7,3],[9,4]],"exportedModulesMap":[[5,1],[3,2],[7,3]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,9,10,11,2,8],"latestChangedDtsFile":"./cRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":13},{"resolvedModule":8},{"resolvedModule":2},{"resolvedModule":14},{"resolvedModule":15},{"resolvedModule":16},{"resolvedModule":17}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[2,3],[3,4],[4,5],[5,6],[6,7]],"modules":{"own":[[12,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[12,[3,4,5,6,7]]]}]}}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
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
      "./arandomfileforimport.d.ts": {
        "version": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",
        "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n",
        "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "original": {
          "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./crandomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./crandomfileforimport2.ts": {
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
      "../../a/lib/lib.d.ts",
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
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 1,
          "resolvedModule": "./bFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 3,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 14
          },
          "resolutionId": 4,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 15
          },
          "resolutionId": 5,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 16
          },
          "resolutionId": 6,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 17
          },
          "resolutionId": 7,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./bFileWithImports",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./bFileWithImports.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            3,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            4,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            5,
            6
          ],
          "resolutionEntryId": 6,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 6,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            6,
            7
          ],
          "resolutionEntryId": 7,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 7,
            "resolvedModule": "./bRandomFileForImport.ts"
          }
        }
      ],
      "modules": {
        "own": [
          {
            "dir": "./",
            "resolutions": [
              {
                "resolutionEntryId": 1,
                "name": "./bFileWithImports",
                "resolution": {
                  "resolutionId": 1,
                  "resolvedModule": "./bFileWithImports.ts"
                }
              },
              {
                "resolutionEntryId": 2,
                "name": "pkg0",
                "resolution": {
                  "resolutionId": 2,
                  "resolvedModule": "./pkg0.d.ts"
                }
              }
            ]
          }
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              {
                "dir": "./",
                "resolutions": [
                  {
                    "resolutionEntryId": 3,
                    "name": "pkg0",
                    "resolution": {
                      "resolutionId": 3,
                      "resolvedModule": "./node_modules/pkg0/index.d.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 4,
                    "name": "./aRandomFileForImport",
                    "resolution": {
                      "resolutionId": 4,
                      "resolvedModule": "./aRandomFileForImport.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 5,
                    "name": "./aRandomFileForImport2",
                    "resolution": {
                      "resolutionId": 5,
                      "resolvedModule": "./aRandomFileForImport2.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 6,
                    "name": "./aFileWithImports",
                    "resolution": {
                      "resolutionId": 6,
                      "resolvedModule": "./aFileWithImports.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 7,
                    "name": "./bRandomFileForImport",
                    "resolution": {
                      "resolutionId": 7,
                      "resolvedModule": "./bRandomFileForImport.ts"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 2593
}


Change:: modify bRandomFileForImport by adding import

Input::
//// [/src/project/bRandomFileForImport.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:02:24 AM[0m] File change detected. Starting incremental compilation...

[[90m12:02:25 AM[0m] Project 'tsconfig.b.json' is out of date because output 'tsconfig.b.tsbuildinfo' is older than input 'bRandomFileForImport.ts'

[[90m12:02:26 AM[0m] Building project '/src/project/tsconfig.b.json'...

Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'bRandomFileForImport.ts'
  Imported via "pkg0" from file 'bFileWithImports.ts'
aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport.ts'
aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport2.ts'
aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'bFileWithImports.ts'
  File is output of project reference source 'aFileWithImports.ts'
bRandomFileForImport.ts
  Imported via "./bRandomFileForImport" from file 'bFileWithImports.ts'
  Part of 'files' list in tsconfig.json
bFileWithImports.ts
  Part of 'files' list in tsconfig.json
bRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
[[90m12:02:43 AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'tsconfig.b.json'

[[90m12:02:44 AM[0m] Building project '/src/project/tsconfig.json'...

Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bFileWithImports.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'bRandomFileForImport.d.ts'
aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport.ts'
aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport2.ts'
aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'bFileWithImports.d.ts'
  File is output of project reference source 'aFileWithImports.ts'
bRandomFileForImport.d.ts
  Imported via "./bRandomFileForImport" from file 'bFileWithImports.d.ts'
  File is output of project reference source 'bRandomFileForImport.ts'
bFileWithImports.d.ts
  Imported via "./bFileWithImports" from file 'cFileWithImports.ts'
  File is output of project reference source 'bFileWithImports.ts'
pkg0.d.ts
  Imported via "pkg0" from file 'cFileWithImports.ts'
cFileWithImports.ts
  Part of 'files' list in tsconfig.json
cRandomFileForImport.ts
  Part of 'files' list in tsconfig.json
cRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
[[90m12:02:52 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/bFileWithImports.ts","/src/project/bRandomFileForImport.ts","/src/project/bRandomFileForImport2.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.b.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/aRandomFileForImport.d.ts
/src/project/aRandomFileForImport2.d.ts
/src/project/aFileWithImports.d.ts
/src/project/bRandomFileForImport.ts
/src/project/bFileWithImports.ts
/src/project/bRandomFileForImport2.ts

Semantic diagnostics in builder refreshed for::
/src/project/bRandomFileForImport.ts
/src/project/bFileWithImports.ts

Shape signatures in builder refreshed for::
/src/project/brandomfileforimport.ts (computed .d.ts)
/src/project/bfilewithimports.ts (computed .d.ts)

Program root files: ["/src/project/cFileWithImports.ts","/src/project/cRandomFileForImport.ts","/src/project/cRandomFileForImport2.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"module":2,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/aRandomFileForImport.d.ts
/src/project/aRandomFileForImport2.d.ts
/src/project/aFileWithImports.d.ts
/src/project/bRandomFileForImport.d.ts
/src/project/bFileWithImports.d.ts
/src/project/pkg0.d.ts
/src/project/cFileWithImports.ts
/src/project/cRandomFileForImport.ts
/src/project/cRandomFileForImport2.ts

Semantic diagnostics in builder refreshed for::
/src/project/bRandomFileForImport.d.ts
/src/project/bFileWithImports.d.ts
/src/project/cFileWithImports.ts

Shape signatures in builder refreshed for::
/src/project/brandomfileforimport.d.ts (used version)
/src/project/bfilewithimports.d.ts (used version)
/src/project/cfilewithimports.ts (computed .d.ts during emit)

File: /src/project/aRandomFileForImport.d.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/aFileWithImports.d.ts
resolvedModules:
./aRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./aRandomFileForImport2: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport2.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}

File: /src/project/bRandomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/bFileWithImports.ts
resolvedModules:
./aFileWithImports: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aFileWithImports.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./bRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/bRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/aRandomFileForImport.d.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/aFileWithImports.d.ts
resolvedModules:
./aRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./aRandomFileForImport2: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport2.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}

File: /src/project/bRandomFileForImport.d.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/bFileWithImports.d.ts
resolvedModules:
./aFileWithImports: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aFileWithImports.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./bRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/bRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}

File: /src/project/cFileWithImports.ts
resolvedModules:
./bFileWithImports: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/bFileWithImports.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "isExternalLibraryImport": false,
    "extension": ".d.ts"
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.a.json:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/brandomfileforimport.ts:
  {}
/src/project/brandomfileforimport2.ts:
  {}
/src/project/tsconfig.json:
  {}
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/bRandomFileForImport.js] file written with same contents
//// [/src/project/bRandomFileForImport.d.ts]
export type { ImportInterface0 } from "pkg0";
export declare const x = 10;


//// [/src/project/bFileWithImports.js] file written with same contents
//// [/src/project/tsconfig.b.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.ts","./bfilewithimports.ts","./brandomfileforimport2.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"},{"version":"-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[3,4],[2],[2,5,6],[5,6]],"referencedMap":[[5,1],[3,2],[7,3],[6,2]],"exportedModulesMap":[[5,1],[3,2],[7,4],[6,2]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,8,2],"latestChangedDtsFile":"./bRandomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":2},{"resolvedModule":10},{"resolvedModule":11},{"resolvedModule":12},{"resolvedModule":13}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[9,[1,2,3,4,5]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
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
      "./arandomfileforimport.d.ts": {
        "version": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",
        "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
      },
      "./brandomfileforimport.ts": {
        "original": {
          "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
          "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
        },
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./bfilewithimports.ts": {
        "original": {
          "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
        },
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
      },
      "./brandomfileforimport2.ts": {
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
      "../../a/lib/lib.d.ts",
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
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 10
          },
          "resolutionId": 2,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 11
          },
          "resolutionId": 3,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 12
          },
          "resolutionId": 4,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 5,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            5,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./bRandomFileForImport.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aRandomFileForImport",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./aRandomFileForImport.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./aRandomFileForImport2",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "./aRandomFileForImport2.ts"
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "./aFileWithImports",
              "resolution": {
                "resolutionId": 4,
                "resolvedModule": "./aFileWithImports.ts"
              }
            },
            {
              "resolutionEntryId": 5,
              "name": "./bRandomFileForImport",
              "resolution": {
                "resolutionId": 5,
                "resolvedModule": "./bRandomFileForImport.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2355
}

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n","-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n","-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[3,4],[2],[5,6],[7,8]],"referencedMap":[[5,1],[3,2],[7,3],[6,2],[9,4]],"exportedModulesMap":[[5,1],[3,2],[7,3],[6,2]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,9,10,11,2,8],"latestChangedDtsFile":"./cRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":13},{"resolvedModule":8},{"resolvedModule":2},{"resolvedModule":14},{"resolvedModule":15},{"resolvedModule":16},{"resolvedModule":17}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[2,3],[3,4],[4,5],[5,6],[6,7]],"modules":{"own":[[12,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[12,[3,4,5,6,7]]]}]}}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
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
      "./arandomfileforimport.d.ts": {
        "version": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",
        "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n",
        "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "original": {
          "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./crandomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./crandomfileforimport2.ts": {
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
      "../../a/lib/lib.d.ts",
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
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 1,
          "resolvedModule": "./bFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 3,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 14
          },
          "resolutionId": 4,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 15
          },
          "resolutionId": 5,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 16
          },
          "resolutionId": 6,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 17
          },
          "resolutionId": 7,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./bFileWithImports",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./bFileWithImports.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            3,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            4,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            5,
            6
          ],
          "resolutionEntryId": 6,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 6,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            6,
            7
          ],
          "resolutionEntryId": 7,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 7,
            "resolvedModule": "./bRandomFileForImport.ts"
          }
        }
      ],
      "modules": {
        "own": [
          {
            "dir": "./",
            "resolutions": [
              {
                "resolutionEntryId": 1,
                "name": "./bFileWithImports",
                "resolution": {
                  "resolutionId": 1,
                  "resolvedModule": "./bFileWithImports.ts"
                }
              },
              {
                "resolutionEntryId": 2,
                "name": "pkg0",
                "resolution": {
                  "resolutionId": 2,
                  "resolvedModule": "./pkg0.d.ts"
                }
              }
            ]
          }
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              {
                "dir": "./",
                "resolutions": [
                  {
                    "resolutionEntryId": 3,
                    "name": "pkg0",
                    "resolution": {
                      "resolutionId": 3,
                      "resolvedModule": "./node_modules/pkg0/index.d.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 4,
                    "name": "./aRandomFileForImport",
                    "resolution": {
                      "resolutionId": 4,
                      "resolvedModule": "./aRandomFileForImport.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 5,
                    "name": "./aRandomFileForImport2",
                    "resolution": {
                      "resolutionId": 5,
                      "resolvedModule": "./aRandomFileForImport2.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 6,
                    "name": "./aFileWithImports",
                    "resolution": {
                      "resolutionId": 6,
                      "resolvedModule": "./aFileWithImports.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 7,
                    "name": "./bRandomFileForImport",
                    "resolution": {
                      "resolutionId": 7,
                      "resolvedModule": "./bRandomFileForImport.ts"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 2655
}


Change:: modify cRandomFileForImport by adding import

Input::
//// [/src/project/cRandomFileForImport.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:02:55 AM[0m] File change detected. Starting incremental compilation...

[[90m12:02:56 AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'cRandomFileForImport.ts'

[[90m12:02:57 AM[0m] Building project '/src/project/tsconfig.json'...

Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bFileWithImports.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aFileWithImports.ts'.
Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Reusing resolution of module 'pkg0' from '/src/project/aRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/bRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/cRandomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/pkg0.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'aRandomFileForImport.d.ts'
  Imported via "pkg0" from file 'bRandomFileForImport.d.ts'
aRandomFileForImport.d.ts
  Imported via "./aRandomFileForImport" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport.ts'
aRandomFileForImport2.d.ts
  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.d.ts'
  File is output of project reference source 'aRandomFileForImport2.ts'
aFileWithImports.d.ts
  Imported via "./aFileWithImports" from file 'bFileWithImports.d.ts'
  File is output of project reference source 'aFileWithImports.ts'
bRandomFileForImport.d.ts
  Imported via "./bRandomFileForImport" from file 'bFileWithImports.d.ts'
  File is output of project reference source 'bRandomFileForImport.ts'
bFileWithImports.d.ts
  Imported via "./bFileWithImports" from file 'cFileWithImports.ts'
  File is output of project reference source 'bFileWithImports.ts'
pkg0.d.ts
  Imported via "pkg0" from file 'cFileWithImports.ts'
  Imported via "pkg0" from file 'cRandomFileForImport.ts'
cFileWithImports.ts
  Part of 'files' list in tsconfig.json
cRandomFileForImport.ts
  Part of 'files' list in tsconfig.json
cRandomFileForImport2.ts
  Part of 'files' list in tsconfig.json
[[90m12:03:11 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/cFileWithImports.ts","/src/project/cRandomFileForImport.ts","/src/project/cRandomFileForImport2.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"module":2,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/aRandomFileForImport.d.ts
/src/project/aRandomFileForImport2.d.ts
/src/project/aFileWithImports.d.ts
/src/project/bRandomFileForImport.d.ts
/src/project/bFileWithImports.d.ts
/src/project/pkg0.d.ts
/src/project/cFileWithImports.ts
/src/project/cRandomFileForImport.ts
/src/project/cRandomFileForImport2.ts

Semantic diagnostics in builder refreshed for::
/src/project/cRandomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/crandomfileforimport.ts (computed .d.ts)

File: /src/project/aRandomFileForImport.d.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/aFileWithImports.d.ts
resolvedModules:
./aRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./aRandomFileForImport2: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aRandomFileForImport2.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}

File: /src/project/bRandomFileForImport.d.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/node_modules/pkg0/index.d.ts",
    "isExternalLibraryImport": true,
    "extension": ".d.ts"
  }
}

File: /src/project/bFileWithImports.d.ts
resolvedModules:
./aFileWithImports: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/aFileWithImports.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
./bRandomFileForImport: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/bRandomFileForImport.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}

File: /src/project/cFileWithImports.ts
resolvedModules:
./bFileWithImports: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/bFileWithImports.ts",
    "isExternalLibraryImport": false,
    "extension": ".ts"
  }
}
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "isExternalLibraryImport": false,
    "extension": ".d.ts"
  }
}

File: /src/project/cRandomFileForImport.ts
resolvedModules:
pkg0: {
  "resolvedModule": {
    "resolvedFileName": "/src/project/pkg0.d.ts",
    "isExternalLibraryImport": false,
    "extension": ".d.ts"
  }
}

PolledWatches::

FsWatches::
/src/project/tsconfig.a.json:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/brandomfileforimport.ts:
  {}
/src/project/brandomfileforimport2.ts:
  {}
/src/project/tsconfig.json:
  {}
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/cRandomFileForImport.js] file written with same contents
//// [/src/project/cRandomFileForImport.d.ts]
export type { ImportInterface0 } from "pkg0";
export declare const x = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n","-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n","-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[3,4],[2],[5,6],[7,8],[8]],"referencedMap":[[5,1],[3,2],[7,3],[6,2],[9,4],[10,5]],"exportedModulesMap":[[5,1],[3,2],[7,3],[6,2],[10,5]],"semanticDiagnosticsPerFile":[1,5,3,4,7,6,9,10,11,2,8],"latestChangedDtsFile":"./cRandomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":13},{"resolvedModule":8},{"resolvedModule":2},{"resolvedModule":14},{"resolvedModule":15},{"resolvedModule":16},{"resolvedModule":17}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[2,3],[3,4],[4,5],[5,6],[6,7]],"modules":{"own":[[12,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[12,[3,4,5,6,7]]]}]}}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
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
      "./arandomfileforimport.d.ts": {
        "version": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6821242887-export declare const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",
        "signature": "-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n",
        "signature": "-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "original": {
          "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./crandomfileforimport.ts": {
        "original": {
          "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
          "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
        },
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-21151159744-export type { ImportInterface0 } from \"pkg0\";\nexport declare const x = 10;\n"
      },
      "./crandomfileforimport2.ts": {
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
      "../../a/lib/lib.d.ts",
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
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 1,
          "resolvedModule": "./bFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 3,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 14
          },
          "resolutionId": 4,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 15
          },
          "resolutionId": 5,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 16
          },
          "resolutionId": 6,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 17
          },
          "resolutionId": 7,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./bFileWithImports",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./bFileWithImports.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            3,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            4,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            5,
            6
          ],
          "resolutionEntryId": 6,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 6,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            6,
            7
          ],
          "resolutionEntryId": 7,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 7,
            "resolvedModule": "./bRandomFileForImport.ts"
          }
        }
      ],
      "modules": {
        "own": [
          {
            "dir": "./",
            "resolutions": [
              {
                "resolutionEntryId": 1,
                "name": "./bFileWithImports",
                "resolution": {
                  "resolutionId": 1,
                  "resolvedModule": "./bFileWithImports.ts"
                }
              },
              {
                "resolutionEntryId": 2,
                "name": "pkg0",
                "resolution": {
                  "resolutionId": 2,
                  "resolvedModule": "./pkg0.d.ts"
                }
              }
            ]
          }
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              {
                "dir": "./",
                "resolutions": [
                  {
                    "resolutionEntryId": 3,
                    "name": "pkg0",
                    "resolution": {
                      "resolutionId": 3,
                      "resolvedModule": "./node_modules/pkg0/index.d.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 4,
                    "name": "./aRandomFileForImport",
                    "resolution": {
                      "resolutionId": 4,
                      "resolvedModule": "./aRandomFileForImport.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 5,
                    "name": "./aRandomFileForImport2",
                    "resolution": {
                      "resolutionId": 5,
                      "resolvedModule": "./aRandomFileForImport2.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 6,
                    "name": "./aFileWithImports",
                    "resolution": {
                      "resolutionId": 6,
                      "resolvedModule": "./aFileWithImports.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 7,
                    "name": "./bRandomFileForImport",
                    "resolution": {
                      "resolutionId": 7,
                      "resolvedModule": "./bRandomFileForImport.ts"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 2771
}

