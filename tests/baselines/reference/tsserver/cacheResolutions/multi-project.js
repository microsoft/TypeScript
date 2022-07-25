Info 0    [00:01:37.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:38.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/bRandomFileForImport.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
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
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.ts","./arandomfileforimport2.ts","./afilewithimports.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n","signature":"-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3,4],[3,4]],"referencedMap":[[5,1]],"exportedModulesMap":[[5,2]],"semanticDiagnosticsPerFile":[1,5,3,4,2],"latestChangedDtsFile":"./aFileWithImports.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":7}},{"resolvedModule":{"resolvedFileName":8}}],"names":["pkg0","./aRandomFileForImport","./aRandomFileForImport2"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[6,[1,2,3]]]}},"version":"FakeTSVersion"}

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
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 7
            }
          },
          "resolutionId": 2,
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 8
            }
          },
          "resolutionId": 3,
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
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aRandomFileForImport",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./aRandomFileForImport2",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1834
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
{"program":{"fileNames":["../../a/lib/lib.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.ts","./node_modules/pkg0/index.d.ts","./bfilewithimports.ts","./brandomfileforimport2.ts","./","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-6821242887-export declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},"769951468-export interface ImportInterface0 {}",{"version":"-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3],[4,5,6],[4,5]],"referencedMap":[[4,1],[7,2]],"exportedModulesMap":[[4,1],[7,3]],"semanticDiagnosticsPerFile":[1,4,2,3,7,5,8,6],"latestChangedDtsFile":"./bRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":10}},{"resolvedModule":{"resolvedFileName":11}},{"resolvedModule":{"resolvedFileName":12}},{"resolvedModule":{"resolvedFileName":13}},{"resolvedModule":{"resolvedFileName":6,"isExternalLibraryImport":true}}],"names":["./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport","pkg0"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"modules":[[9,[1,2,3,4,5]]]}},"version":"FakeTSVersion"}

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
            "resolvedModule": {
              "resolvedFileName": 10
            }
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 11
            }
          },
          "resolutionId": 2,
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 12
            }
          },
          "resolutionId": 3,
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 13
            }
          },
          "resolutionId": 4,
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 6,
              "isExternalLibraryImport": true
            }
          },
          "resolutionId": 5,
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aRandomFileForImport2",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./aFileWithImports",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": {
                  "resolvedFileName": "./aFileWithImports.ts"
                }
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "./bRandomFileForImport",
              "resolution": {
                "resolutionId": 4,
                "resolvedModule": {
                  "resolvedFileName": "./bRandomFileForImport.ts"
                }
              }
            },
            {
              "resolutionEntryId": 5,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 5,
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
  "size": 2315
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
{"program":{"fileNames":["../../a/lib/lib.d.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts","./","./bFileWithImports.ts","./aRandomFileForImport.ts","./aRandomFileForImport2.ts","./aFileWithImports.ts","./bRandomFileForImport.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-6821242887-export declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n","-6821242887-export declare const x = 10;\n","-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"options":{"cacheResolutions":true,"composite":true,"module":2},"fileIdsList":[[2,3],[4,5],[6,7]],"referencedMap":[[4,1],[6,2],[8,3]],"exportedModulesMap":[[4,1],[6,2]],"semanticDiagnosticsPerFile":[1,4,2,3,6,5,8,9,10,7],"latestChangedDtsFile":"./cRandomFileForImport2.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":12}},{"resolvedModule":{"resolvedFileName":7}},{"resolvedModule":{"resolvedFileName":13}},{"resolvedModule":{"resolvedFileName":14}},{"resolvedModule":{"resolvedFileName":15}},{"resolvedModule":{"resolvedFileName":16}}],"names":["./bFileWithImports","pkg0","./aRandomFileForImport","./aRandomFileForImport2","./aFileWithImports","./bRandomFileForImport"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]],"modules":{"own":[[11,[1,2]]],"redirects":[{"options":{"cacheResolutions":true},"cache":[[11,[3,4,5,6]]]}]}}},"version":"FakeTSVersion"}

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
            "resolvedModule": {
              "resolvedFileName": 12
            }
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 7
            }
          },
          "resolutionId": 2,
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 13
            }
          },
          "resolutionId": 3,
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 14
            }
          },
          "resolutionId": 4,
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 15
            }
          },
          "resolutionId": 5,
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 16
            }
          },
          "resolutionId": 6,
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./bFileWithImports",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
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
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
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
                  "resolvedModule": {
                    "resolvedFileName": "./bFileWithImports.ts"
                  }
                }
              },
              {
                "resolutionEntryId": 2,
                "name": "pkg0",
                "resolution": {
                  "resolutionId": 2,
                  "resolvedModule": {
                    "resolvedFileName": "./pkg0.d.ts"
                  }
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
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport.ts"
                      }
                    }
                  },
                  {
                    "resolutionEntryId": 4,
                    "name": "./aRandomFileForImport2",
                    "resolution": {
                      "resolutionId": 4,
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport2.ts"
                      }
                    }
                  },
                  {
                    "resolutionEntryId": 5,
                    "name": "./aFileWithImports",
                    "resolution": {
                      "resolutionId": 5,
                      "resolvedModule": {
                        "resolvedFileName": "./aFileWithImports.ts"
                      }
                    }
                  },
                  {
                    "resolutionEntryId": 6,
                    "name": "./bRandomFileForImport",
                    "resolution": {
                      "resolutionId": 6,
                      "resolvedModule": {
                        "resolvedFileName": "./bRandomFileForImport.ts"
                      }
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
  "size": 2539
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:39.000] Search path: /src/project
Info 3    [00:01:40.000] For info: /src/project/bRandomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 4    [00:01:41.000] Creating configuration project /src/project/tsconfig.json
Info 5    [00:01:42.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 6    [00:01:43.000] Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/cFileWithImports.ts",
  "/src/project/cRandomFileForImport.ts",
  "/src/project/cRandomFileForImport2.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "module": 2,
  "configFilePath": "/src/project/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/src/project/tsconfig.a.json",
   "originalPath": "./tsconfig.a.json"
  },
  {
   "path": "/src/project/tsconfig.b.json",
   "originalPath": "./tsconfig.b.json"
  }
 ]
}
Info 7    [00:01:44.000] FileWatcher:: Added:: WatchInfo: /src/project/cFileWithImports.ts 500 undefined WatchType: Closed Script info
Info 8    [00:01:45.000] FileWatcher:: Added:: WatchInfo: /src/project/cRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 9    [00:01:46.000] FileWatcher:: Added:: WatchInfo: /src/project/cRandomFileForImport2.ts 500 undefined WatchType: Closed Script info
Info 10   [00:01:47.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 11   [00:01:48.000] Config: /src/project/tsconfig.a.json : {
 "rootNames": [
  "/src/project/aFileWithImports.ts",
  "/src/project/aRandomFileForImport.ts",
  "/src/project/aRandomFileForImport2.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.a.json"
 }
}
Info 12   [00:01:49.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.a.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 13   [00:01:50.000] Config: /src/project/tsconfig.b.json : {
 "rootNames": [
  "/src/project/bFileWithImports.ts",
  "/src/project/bRandomFileForImport.ts",
  "/src/project/bRandomFileForImport2.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.b.json"
 },
 "projectReferences": [
  {
   "path": "/src/project/tsconfig.a.json",
   "originalPath": "./tsconfig.a.json"
  }
 ]
}
Info 14   [00:01:51.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.b.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 15   [00:01:52.000] ======== Resolving module './bFileWithImports' from '/src/project/cFileWithImports.ts'. ========
Info 16   [00:01:53.000] Module resolution kind is not specified, using 'Classic'.
Info 17   [00:01:54.000] File '/src/project/bFileWithImports.ts' exist - use it as a name resolution result.
Info 18   [00:01:55.000] ======== Module name './bFileWithImports' was successfully resolved to '/src/project/bFileWithImports.ts'. ========
Info 19   [00:01:56.000] ======== Resolving module 'pkg0' from '/src/project/cFileWithImports.ts'. ========
Info 20   [00:01:57.000] Module resolution kind is not specified, using 'Classic'.
Info 21   [00:01:58.000] File '/src/project/pkg0.ts' does not exist.
Info 22   [00:01:59.000] File '/src/project/pkg0.tsx' does not exist.
Info 23   [00:02:00.000] File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
Info 24   [00:02:01.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
Info 25   [00:02:02.000] FileWatcher:: Added:: WatchInfo: /src/project/bFileWithImports.ts 500 undefined WatchType: Closed Script info
Info 26   [00:02:03.000] ======== Resolving module './aFileWithImports' from '/src/project/bFileWithImports.ts'. ========
Info 27   [00:02:04.000] Using compiler options of project reference redirect '/src/project/tsconfig.b.json'.
Info 28   [00:02:05.000] Module resolution kind is not specified, using 'NodeJs'.
Info 29   [00:02:06.000] Loading module as file / folder, candidate module location '/src/project/aFileWithImports', target file types: TypeScript, Declaration.
Info 30   [00:02:07.000] File '/src/project/aFileWithImports.ts' exist - use it as a name resolution result.
Info 31   [00:02:08.000] ======== Module name './aFileWithImports' was successfully resolved to '/src/project/aFileWithImports.ts'. ========
Info 32   [00:02:09.000] ======== Resolving module './bRandomFileForImport' from '/src/project/bFileWithImports.ts'. ========
Info 33   [00:02:10.000] Using compiler options of project reference redirect '/src/project/tsconfig.b.json'.
Info 34   [00:02:11.000] Module resolution kind is not specified, using 'NodeJs'.
Info 35   [00:02:12.000] Loading module as file / folder, candidate module location '/src/project/bRandomFileForImport', target file types: TypeScript, Declaration.
Info 36   [00:02:13.000] File '/src/project/bRandomFileForImport.ts' exist - use it as a name resolution result.
Info 37   [00:02:14.000] ======== Module name './bRandomFileForImport' was successfully resolved to '/src/project/bRandomFileForImport.ts'. ========
Info 38   [00:02:15.000] ======== Resolving module 'pkg0' from '/src/project/bFileWithImports.ts'. ========
Info 39   [00:02:16.000] Using compiler options of project reference redirect '/src/project/tsconfig.b.json'.
Info 40   [00:02:17.000] Module resolution kind is not specified, using 'NodeJs'.
Info 41   [00:02:18.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 42   [00:02:19.000] File '/src/project/node_modules/pkg0/package.json' does not exist.
Info 43   [00:02:20.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 44   [00:02:21.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 45   [00:02:22.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 46   [00:02:23.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 47   [00:02:24.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 48   [00:02:25.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 49   [00:02:26.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 50   [00:02:27.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 51   [00:02:28.000] FileWatcher:: Added:: WatchInfo: /src/project/aFileWithImports.ts 500 undefined WatchType: Closed Script info
Info 52   [00:02:29.000] ======== Resolving module 'pkg0' from '/src/project/aFileWithImports.ts'. ========
Info 53   [00:02:30.000] Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Info 54   [00:02:31.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 55   [00:02:32.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 56   [00:02:33.000] ======== Resolving module './aRandomFileForImport' from '/src/project/aFileWithImports.ts'. ========
Info 57   [00:02:34.000] Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Info 58   [00:02:35.000] Module resolution kind is not specified, using 'NodeJs'.
Info 59   [00:02:36.000] Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport', target file types: TypeScript, Declaration.
Info 60   [00:02:37.000] File '/src/project/aRandomFileForImport.ts' exist - use it as a name resolution result.
Info 61   [00:02:38.000] ======== Module name './aRandomFileForImport' was successfully resolved to '/src/project/aRandomFileForImport.ts'. ========
Info 62   [00:02:39.000] ======== Resolving module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts'. ========
Info 63   [00:02:40.000] Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Info 64   [00:02:41.000] Module resolution kind is not specified, using 'NodeJs'.
Info 65   [00:02:42.000] Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport2', target file types: TypeScript, Declaration.
Info 66   [00:02:43.000] File '/src/project/aRandomFileForImport2.ts' exist - use it as a name resolution result.
Info 67   [00:02:44.000] ======== Module name './aRandomFileForImport2' was successfully resolved to '/src/project/aRandomFileForImport2.ts'. ========
Info 68   [00:02:45.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 69   [00:02:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 70   [00:02:47.000] FileWatcher:: Added:: WatchInfo: /src/project/aRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 71   [00:02:48.000] FileWatcher:: Added:: WatchInfo: /src/project/aRandomFileForImport2.ts 500 undefined WatchType: Closed Script info
Info 72   [00:02:49.000] FileWatcher:: Added:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
Info 73   [00:02:50.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 74   [00:02:51.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 75   [00:02:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 76   [00:02:53.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 77   [00:02:54.000] Project '/src/project/tsconfig.json' (Configured)
Info 78   [00:02:55.000] 	Files (11)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/index.d.ts
	/src/project/aRandomFileForImport.ts
	/src/project/aRandomFileForImport2.ts
	/src/project/aFileWithImports.ts
	/src/project/bRandomFileForImport.ts
	/src/project/bFileWithImports.ts
	/src/project/pkg0.d.ts
	/src/project/cFileWithImports.ts
	/src/project/cRandomFileForImport.ts
	/src/project/cRandomFileForImport2.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'aFileWithImports.ts'
	  Imported via "pkg0" from file 'bFileWithImports.ts'
	aRandomFileForImport.ts
	  Imported via "./aRandomFileForImport" from file 'aFileWithImports.ts'
	aRandomFileForImport2.ts
	  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.ts'
	aFileWithImports.ts
	  Imported via "./aFileWithImports" from file 'bFileWithImports.ts'
	bRandomFileForImport.ts
	  Imported via "./bRandomFileForImport" from file 'bFileWithImports.ts'
	bFileWithImports.ts
	  Imported via "./bFileWithImports" from file 'cFileWithImports.ts'
	pkg0.d.ts
	  Imported via "pkg0" from file 'cFileWithImports.ts'
	cFileWithImports.ts
	  Part of 'files' list in tsconfig.json
	cRandomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	cRandomFileForImport2.ts
	  Part of 'files' list in tsconfig.json

Info 79   [00:02:56.000] -----------------------------------------------
Info 80   [00:02:57.000] Creating configuration project /src/project/tsconfig.b.json
Info 81   [00:02:58.000] FileWatcher:: Added:: WatchInfo: /src/project/bRandomFileForImport2.ts 500 undefined WatchType: Closed Script info
Info 82   [00:02:59.000] Starting updateGraphWorker: Project: /src/project/tsconfig.b.json
Info 83   [00:03:00.000] ======== Resolving module './aFileWithImports' from '/src/project/bFileWithImports.ts'. ========
Info 84   [00:03:01.000] Module resolution kind is not specified, using 'NodeJs'.
Info 85   [00:03:02.000] Loading module as file / folder, candidate module location '/src/project/aFileWithImports', target file types: TypeScript, Declaration.
Info 86   [00:03:03.000] File '/src/project/aFileWithImports.ts' exist - use it as a name resolution result.
Info 87   [00:03:04.000] ======== Module name './aFileWithImports' was successfully resolved to '/src/project/aFileWithImports.ts'. ========
Info 88   [00:03:05.000] ======== Resolving module './bRandomFileForImport' from '/src/project/bFileWithImports.ts'. ========
Info 89   [00:03:06.000] Module resolution kind is not specified, using 'NodeJs'.
Info 90   [00:03:07.000] Loading module as file / folder, candidate module location '/src/project/bRandomFileForImport', target file types: TypeScript, Declaration.
Info 91   [00:03:08.000] File '/src/project/bRandomFileForImport.ts' exist - use it as a name resolution result.
Info 92   [00:03:09.000] ======== Module name './bRandomFileForImport' was successfully resolved to '/src/project/bRandomFileForImport.ts'. ========
Info 93   [00:03:10.000] ======== Resolving module 'pkg0' from '/src/project/bFileWithImports.ts'. ========
Info 94   [00:03:11.000] Module resolution kind is not specified, using 'NodeJs'.
Info 95   [00:03:12.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 96   [00:03:13.000] File '/src/project/node_modules/pkg0/package.json' does not exist.
Info 97   [00:03:14.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 98   [00:03:15.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 99   [00:03:16.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 100  [00:03:17.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 101  [00:03:18.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 102  [00:03:19.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 103  [00:03:20.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 104  [00:03:21.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 105  [00:03:22.000] ======== Resolving module 'pkg0' from '/src/project/aFileWithImports.ts'. ========
Info 106  [00:03:23.000] Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Info 107  [00:03:24.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 108  [00:03:25.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 109  [00:03:26.000] ======== Resolving module './aRandomFileForImport' from '/src/project/aFileWithImports.ts'. ========
Info 110  [00:03:27.000] Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Info 111  [00:03:28.000] Module resolution kind is not specified, using 'NodeJs'.
Info 112  [00:03:29.000] Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport', target file types: TypeScript, Declaration.
Info 113  [00:03:30.000] File '/src/project/aRandomFileForImport.ts' exist - use it as a name resolution result.
Info 114  [00:03:31.000] ======== Module name './aRandomFileForImport' was successfully resolved to '/src/project/aRandomFileForImport.ts'. ========
Info 115  [00:03:32.000] ======== Resolving module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts'. ========
Info 116  [00:03:33.000] Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Info 117  [00:03:34.000] Module resolution kind is not specified, using 'NodeJs'.
Info 118  [00:03:35.000] Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport2', target file types: TypeScript, Declaration.
Info 119  [00:03:36.000] File '/src/project/aRandomFileForImport2.ts' exist - use it as a name resolution result.
Info 120  [00:03:37.000] ======== Module name './aRandomFileForImport2' was successfully resolved to '/src/project/aRandomFileForImport2.ts'. ========
Info 121  [00:03:38.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.b.json WatchType: Type roots
Info 122  [00:03:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.b.json WatchType: Type roots
Info 123  [00:03:40.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.b.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 124  [00:03:41.000] Project '/src/project/tsconfig.b.json' (Configured)
Info 125  [00:03:42.000] 	Files (8)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/index.d.ts
	/src/project/aRandomFileForImport.ts
	/src/project/aRandomFileForImport2.ts
	/src/project/aFileWithImports.ts
	/src/project/bRandomFileForImport.ts
	/src/project/bFileWithImports.ts
	/src/project/bRandomFileForImport2.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'aFileWithImports.ts'
	  Imported via "pkg0" from file 'bFileWithImports.ts'
	aRandomFileForImport.ts
	  Imported via "./aRandomFileForImport" from file 'aFileWithImports.ts'
	aRandomFileForImport2.ts
	  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.ts'
	aFileWithImports.ts
	  Imported via "./aFileWithImports" from file 'bFileWithImports.ts'
	bRandomFileForImport.ts
	  Imported via "./bRandomFileForImport" from file 'bFileWithImports.ts'
	  Part of 'files' list in tsconfig.json
	bFileWithImports.ts
	  Part of 'files' list in tsconfig.json
	bRandomFileForImport2.ts
	  Part of 'files' list in tsconfig.json

Info 126  [00:03:43.000] -----------------------------------------------
Info 127  [00:03:44.000] Search path: /src/project
Info 128  [00:03:45.000] For info: /src/project/tsconfig.json :: No config files found.
Info 129  [00:03:46.000] Project '/src/project/tsconfig.json' (Configured)
Info 129  [00:03:47.000] 	Files (11)

Info 129  [00:03:48.000] -----------------------------------------------
Info 129  [00:03:49.000] Project '/src/project/tsconfig.b.json' (Configured)
Info 129  [00:03:50.000] 	Files (8)

Info 129  [00:03:51.000] -----------------------------------------------
Info 129  [00:03:52.000] Open files: 
Info 129  [00:03:53.000] 	FileName: /src/project/bRandomFileForImport.ts ProjectRootPath: undefined
Info 129  [00:03:54.000] 		Projects: /src/project/tsconfig.json,/src/project/tsconfig.b.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}
/src/project/tsconfig.a.json:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/brandomfileforimport2.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 129  [00:03:55.000] response:
    {
      "responseRequired": false
    }
Info 130  [00:03:56.000] modify bRandomFileForImport by adding import
Info 131  [00:03:57.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/bRandomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "export type { ImportInterface0 } from \"pkg0\";\n"
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
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}
/src/project/tsconfig.a.json:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/brandomfileforimport2.ts:
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
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}
/src/project/tsconfig.a.json:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/brandomfileforimport2.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 132  [00:03:58.000] response:
    {
      "responseRequired": false
    }
Info 133  [00:03:59.000] Starting updateGraphWorker: Project: /src/project/tsconfig.b.json
Info 134  [00:04:00.000] Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' of old program, it was successfully resolved to '/src/project/aFileWithImports.ts'.
Info 135  [00:04:01.000] Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' of old program, it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Info 136  [00:04:02.000] Reusing resolution of module 'pkg0' from '/src/project/bFileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 137  [00:04:03.000] Reusing resolution of module 'pkg0' from '/src/project/aFileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 138  [00:04:04.000] Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' of old program, it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Info 139  [00:04:05.000] Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' of old program, it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Info 140  [00:04:06.000] ======== Resolving module 'pkg0' from '/src/project/bRandomFileForImport.ts'. ========
Info 141  [00:04:07.000] Module resolution kind is not specified, using 'NodeJs'.
Info 142  [00:04:08.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 143  [00:04:09.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 144  [00:04:10.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 145  [00:04:11.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 146  [00:04:12.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 147  [00:04:13.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 148  [00:04:14.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 149  [00:04:15.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 150  [00:04:16.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 151  [00:04:17.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 152  [00:04:18.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.b.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 153  [00:04:19.000] Different program with same set of files
Info 154  [00:04:20.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 155  [00:04:21.000] Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' of old program, it was successfully resolved to '/src/project/bFileWithImports.ts'.
Info 156  [00:04:22.000] Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 157  [00:04:23.000] Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' of old program, it was successfully resolved to '/src/project/aFileWithImports.ts'.
Info 158  [00:04:24.000] Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' of old program, it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Info 159  [00:04:25.000] Reusing resolution of module 'pkg0' from '/src/project/bFileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 160  [00:04:26.000] Reusing resolution of module 'pkg0' from '/src/project/aFileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 161  [00:04:27.000] Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' of old program, it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Info 162  [00:04:28.000] Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' of old program, it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Info 163  [00:04:29.000] ======== Resolving module 'pkg0' from '/src/project/bRandomFileForImport.ts'. ========
Info 164  [00:04:30.000] Using compiler options of project reference redirect '/src/project/tsconfig.b.json'.
Info 165  [00:04:31.000] Module resolution kind is not specified, using 'NodeJs'.
Info 166  [00:04:32.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 167  [00:04:33.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 168  [00:04:34.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 169  [00:04:35.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 170  [00:04:36.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 171  [00:04:37.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 172  [00:04:38.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 173  [00:04:39.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 174  [00:04:40.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 175  [00:04:41.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 176  [00:04:42.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 177  [00:04:43.000] Different program with same set of files