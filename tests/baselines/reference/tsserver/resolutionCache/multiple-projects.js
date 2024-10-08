Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/workspaces/project/tsconfig.a.json]
{
  "compilerOptions": {
    "composite": true,
    "traceResolution": true
  },
  "files": [
    "aMain.ts",
    "aFileWithImports.ts",
    "aRandomFileForImport.ts",
    "aRandomFileForImport2.ts"
  ]
}

//// [/home/src/workspaces/project/aMain.ts]
export const x = 10;

//// [/home/src/workspaces/project/aFileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
export { x } from "./aRandomFileForImport";
export { x as x2 } from "./aRandomFileForImport2";
export const y = 10;


//// [/home/src/workspaces/project/aRandomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/aRandomFileForImport2.ts]
export const x = 10;

//// [/home/src/workspaces/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/home/src/workspaces/project/tsconfig.b.json]
{
  "compilerOptions": {
    "composite": true,
    "traceResolution": true
  },
  "files": [
    "bMain.ts",
    "bFileWithImports.ts",
    "bRandomFileForImport.ts",
    "bRandomFileForImport2.ts"
  ],
  "references": [
    {
      "path": "./tsconfig.a.json"
    }
  ]
}

//// [/home/src/workspaces/project/bMain.ts]
export const x = 10;

//// [/home/src/workspaces/project/bFileWithImports.ts]
export { y } from "./aFileWithImports";
export { x } from "./bRandomFileForImport";
import type { ImportInterface0 } from "pkg0";


//// [/home/src/workspaces/project/bRandomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/bRandomFileForImport2.ts]
export const x = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "traceResolution": true,
    "module": "amd"
  },
  "files": [
    "cMain.ts",
    "cFileWithImports.ts",
    "cRandomFileForImport.ts",
    "cRandomFileForImport2.ts"
  ],
  "references": [
    {
      "path": "./tsconfig.a.json"
    },
    {
      "path": "./tsconfig.b.json"
    }
  ]
}

//// [/home/src/workspaces/project/cMain.ts]
export const x = 10;

//// [/home/src/workspaces/project/cFileWithImports.ts]
import { y } from "./bFileWithImports";
import type { ImportInterface0 } from "pkg0";


//// [/home/src/workspaces/project/cRandomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/cRandomFileForImport2.ts]
export const x = 10;

//// [/home/src/workspaces/project/pkg0.d.ts]
export interface ImportInterface0 {}

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

//// [/home/src/workspaces/project/aMain.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/aMain.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/aRandomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/aRandomFileForImport.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/aRandomFileForImport2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/aRandomFileForImport2.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/aFileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x2 = exports.x = void 0;
var aRandomFileForImport_1 = require("./aRandomFileForImport");
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return aRandomFileForImport_1.x; } });
var aRandomFileForImport2_1 = require("./aRandomFileForImport2");
Object.defineProperty(exports, "x2", { enumerable: true, get: function () { return aRandomFileForImport2_1.x; } });
exports.y = 10;


//// [/home/src/workspaces/project/aFileWithImports.d.ts]
export { x } from "./aRandomFileForImport";
export { x as x2 } from "./aRandomFileForImport2";
export declare const y = 10;


//// [/home/src/workspaces/project/tsconfig.a.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./amain.ts","./node_modules/pkg0/index.d.ts","./arandomfileforimport.ts","./arandomfileforimport2.ts","./afilewithimports.ts"],"fileIdsList":[[3,4,5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"25172849050-import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n","signature":"-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n"}],"root":[2,[4,6]],"options":{"composite":true},"referencedMap":[[6,1]],"latestChangedDtsFile":"./aFileWithImports.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.a.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./amain.ts",
    "./node_modules/pkg0/index.d.ts",
    "./arandomfileforimport.ts",
    "./arandomfileforimport2.ts",
    "./afilewithimports.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.ts",
      "./arandomfileforimport2.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./amain.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n"
    },
    "./node_modules/pkg0/index.d.ts": {
      "original": {
        "version": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": 1
      },
      "version": "769951468-export interface ImportInterface0 {}",
      "signature": "769951468-export interface ImportInterface0 {}",
      "impliedFormat": "commonjs"
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
  "root": [
    [
      2,
      "./amain.ts"
    ],
    [
      [
        4,
        6
      ],
      [
        "./arandomfileforimport.ts",
        "./arandomfileforimport2.ts",
        "./afilewithimports.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./afilewithimports.ts": [
      "./node_modules/pkg0/index.d.ts",
      "./arandomfileforimport.ts",
      "./arandomfileforimport2.ts"
    ]
  },
  "latestChangedDtsFile": "./aFileWithImports.d.ts",
  "version": "FakeTSVersion",
  "size": 1587
}

//// [/home/src/workspaces/project/bMain.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/bMain.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/bRandomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/bRandomFileForImport.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/bFileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.y = void 0;
var aFileWithImports_1 = require("./aFileWithImports");
Object.defineProperty(exports, "y", { enumerable: true, get: function () { return aFileWithImports_1.y; } });
var bRandomFileForImport_1 = require("./bRandomFileForImport");
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return bRandomFileForImport_1.x; } });


//// [/home/src/workspaces/project/bFileWithImports.d.ts]
export { y } from "./aFileWithImports";
export { x } from "./bRandomFileForImport";


//// [/home/src/workspaces/project/bRandomFileForImport2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/bRandomFileForImport2.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/tsconfig.b.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./bmain.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.ts","./node_modules/pkg0/index.d.ts","./bfilewithimports.ts","./brandomfileforimport2.ts"],"fileIdsList":[[3,4],[5,6,7]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},"-6821242887-export declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n",{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"root":[2,6,8,9],"options":{"composite":true},"referencedMap":[[5,1],[8,2]],"latestChangedDtsFile":"./bRandomFileForImport2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./bmain.ts",
    "./arandomfileforimport.d.ts",
    "./arandomfileforimport2.d.ts",
    "./afilewithimports.d.ts",
    "./brandomfileforimport.ts",
    "./node_modules/pkg0/index.d.ts",
    "./bfilewithimports.ts",
    "./brandomfileforimport2.ts"
  ],
  "fileIdsList": [
    [
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts"
    ],
    [
      "./afilewithimports.d.ts",
      "./brandomfileforimport.ts",
      "./node_modules/pkg0/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./bmain.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n"
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
      "original": {
        "version": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": 1
      },
      "version": "769951468-export interface ImportInterface0 {}",
      "signature": "769951468-export interface ImportInterface0 {}",
      "impliedFormat": "commonjs"
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
  "root": [
    [
      2,
      "./bmain.ts"
    ],
    [
      6,
      "./brandomfileforimport.ts"
    ],
    [
      8,
      "./bfilewithimports.ts"
    ],
    [
      9,
      "./brandomfileforimport2.ts"
    ]
  ],
  "options": {
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
  "latestChangedDtsFile": "./bRandomFileForImport2.d.ts",
  "version": "FakeTSVersion",
  "size": 1854
}

//// [/home/src/workspaces/project/cMain.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});


//// [/home/src/workspaces/project/cMain.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/cFileWithImports.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});


//// [/home/src/workspaces/project/cFileWithImports.d.ts]
export {};


//// [/home/src/workspaces/project/cRandomFileForImport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});


//// [/home/src/workspaces/project/cRandomFileForImport.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/cRandomFileForImport2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});


//// [/home/src/workspaces/project/cRandomFileForImport2.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./cmain.ts","./arandomfileforimport.d.ts","./arandomfileforimport2.d.ts","./afilewithimports.d.ts","./brandomfileforimport.d.ts","./bfilewithimports.d.ts","./pkg0.d.ts","./cfilewithimports.ts","./crandomfileforimport.ts","./crandomfileforimport2.ts"],"fileIdsList":[[3,4],[5,6],[7,8]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},"-6821242887-export declare const x = 10;\n","-6821242887-export declare const x = 10;\n","-19407286966-export { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport declare const y = 10;\n","-6821242887-export declare const x = 10;\n","-7362913554-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\n","769951468-export interface ImportInterface0 {}",{"version":"-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"}],"root":[2,[9,11]],"options":{"composite":true,"module":2},"referencedMap":[[5,1],[7,2],[9,3]],"latestChangedDtsFile":"./cRandomFileForImport2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./cmain.ts",
    "./arandomfileforimport.d.ts",
    "./arandomfileforimport2.d.ts",
    "./afilewithimports.d.ts",
    "./brandomfileforimport.d.ts",
    "./bfilewithimports.d.ts",
    "./pkg0.d.ts",
    "./cfilewithimports.ts",
    "./crandomfileforimport.ts",
    "./crandomfileforimport2.ts"
  ],
  "fileIdsList": [
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
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./cmain.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n"
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
  "root": [
    [
      2,
      "./cmain.ts"
    ],
    [
      [
        9,
        11
      ],
      [
        "./cfilewithimports.ts",
        "./crandomfileforimport.ts",
        "./crandomfileforimport2.ts"
      ]
    ]
  ],
  "options": {
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
  "latestChangedDtsFile": "./cRandomFileForImport2.d.ts",
  "version": "FakeTSVersion",
  "size": 1907
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspaces/project/bMain.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/cMain.ts",
  "/home/src/workspaces/project/cFileWithImports.ts",
  "/home/src/workspaces/project/cRandomFileForImport.ts",
  "/home/src/workspaces/project/cRandomFileForImport2.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "module": 2,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/tsconfig.a.json",
   "originalPath": "./tsconfig.a.json"
  },
  {
   "path": "/home/src/workspaces/project/tsconfig.b.json",
   "originalPath": "./tsconfig.b.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.a.json : {
 "rootNames": [
  "/home/src/workspaces/project/aMain.ts",
  "/home/src/workspaces/project/aFileWithImports.ts",
  "/home/src/workspaces/project/aRandomFileForImport.ts",
  "/home/src/workspaces/project/aRandomFileForImport2.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.a.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.a.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.b.json : {
 "rootNames": [
  "/home/src/workspaces/project/bMain.ts",
  "/home/src/workspaces/project/bFileWithImports.ts",
  "/home/src/workspaces/project/bRandomFileForImport.ts",
  "/home/src/workspaces/project/bRandomFileForImport2.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.b.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/tsconfig.a.json",
   "originalPath": "./tsconfig.a.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.b.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.b.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.b.json",
        "reason": "Creating project referenced in solution /home/src/workspaces/project/tsconfig.json to find possible configured project for /home/src/workspaces/project/bMain.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/bFileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/bRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/bRandomFileForImport2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] ======== Resolving module './aFileWithImports' from '/home/src/workspaces/project/bFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/aFileWithImports', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/aFileWithImports.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './aFileWithImports' was successfully resolved to '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module './bRandomFileForImport' from '/home/src/workspaces/project/bFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/bRandomFileForImport', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/bRandomFileForImport.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './bRandomFileForImport' was successfully resolved to '/home/src/workspaces/project/bRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/bFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/pkg0/index.d.ts', result '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/aFileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.a.json'.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module './aRandomFileForImport' from '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.a.json'.
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/aRandomFileForImport', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/aRandomFileForImport.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './aRandomFileForImport' was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module './aRandomFileForImport2' from '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.a.json'.
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/aRandomFileForImport2', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/aRandomFileForImport2.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './aRandomFileForImport2' was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport2.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/aRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/aRandomFileForImport2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.b.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.b.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/bMain.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/aRandomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aRandomFileForImport2.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aFileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n"
	/home/src/workspaces/project/bRandomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/bFileWithImports.ts Text-1 "export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
	/home/src/workspaces/project/bRandomFileForImport2.ts Text-1 "export const x = 10;"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	bMain.ts
	  Part of 'files' list in tsconfig.json
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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.b.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "73c540e802376e55b9fbc269476ae9d94f06444273cd1059a823c9dc01856649",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 7,
            "tsSize": 392,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 449,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "traceResolution": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "other",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/bMain.ts",
        "configFile": "/home/src/workspaces/project/tsconfig.b.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/pkg0/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspaces/project/aFileWithImports.ts: *new*
  {}
/home/src/workspaces/project/aRandomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/aRandomFileForImport2.ts: *new*
  {}
/home/src/workspaces/project/bFileWithImports.ts: *new*
  {}
/home/src/workspaces/project/bRandomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/bRandomFileForImport2.ts: *new*
  {}
/home/src/workspaces/project/tsconfig.a.json: *new*
  {}
/home/src/workspaces/project/tsconfig.b.json: *new*
  {}
/home/src/workspaces/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules: *new*
  {}

Projects::
/home/src/workspaces/project/tsconfig.b.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
    initialLoadPending: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/aFileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/aRandomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/aRandomFileForImport2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/bFileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/bMain.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json *default*
/home/src/workspaces/project/bRandomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/bRandomFileForImport2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/node_modules/pkg0/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json

modify bRandomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/bRandomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/bRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/bRandomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/bRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /home/src/workspaces/project/tsconfig.b.json
2: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/bRandomFileForImport.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
1: /home/src/workspaces/project/tsconfig.b.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.b.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
    initialLoadPending: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/aFileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/aRandomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/aRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/bFileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/bMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json *default*
/home/src/workspaces/project/bRandomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/bRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aFileWithImports' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aFileWithImports.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './bRandomFileForImport' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/bRandomFileForImport.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport2' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport2.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/bRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.b.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/bMain.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/aRandomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aRandomFileForImport2.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aFileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n"
	/home/src/workspaces/project/bRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/bFileWithImports.ts Text-1 "export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
	/home/src/workspaces/project/bRandomFileForImport2.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/bMain.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/bMain.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.b.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
    initialLoadPending: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/aFileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/aRandomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/aRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/bFileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/bMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json *default*
/home/src/workspaces/project/bRandomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/bRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspaces/project/cMain.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/cMain.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/bMain.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/cFileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/cRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/cRandomFileForImport2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module './bFileWithImports' from '/home/src/workspaces/project/cFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Classic'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/bFileWithImports.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './bFileWithImports' was successfully resolved to '/home/src/workspaces/project/bFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/cFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Classic'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/pkg0.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/pkg0.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/pkg0.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/pkg0.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module './aFileWithImports' from '/home/src/workspaces/project/bFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.b.json'.
Info seq  [hh:mm:ss:mss] Resolution for module './aFileWithImports' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name './aFileWithImports' was successfully resolved to '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module './bRandomFileForImport' from '/home/src/workspaces/project/bFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.b.json'.
Info seq  [hh:mm:ss:mss] Resolution for module './bRandomFileForImport' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name './bRandomFileForImport' was successfully resolved to '/home/src/workspaces/project/bRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/bFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.b.json'.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.a.json'.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module './aRandomFileForImport' from '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.a.json'.
Info seq  [hh:mm:ss:mss] Resolution for module './aRandomFileForImport' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name './aRandomFileForImport' was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module './aRandomFileForImport2' from '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.a.json'.
Info seq  [hh:mm:ss:mss] Resolution for module './aRandomFileForImport2' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name './aRandomFileForImport2' was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport2.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/bRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.b.json'.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (12)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/cMain.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/aRandomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aRandomFileForImport2.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aFileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n"
	/home/src/workspaces/project/bRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/bFileWithImports.ts Text-1 "export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
	/home/src/workspaces/project/pkg0.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/cFileWithImports.ts Text-1 "import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
	/home/src/workspaces/project/cRandomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/cRandomFileForImport2.ts Text-1 "export const x = 10;"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	cMain.ts
	  Part of 'files' list in tsconfig.json
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'aFileWithImports.ts'
	  Imported via "pkg0" from file 'bRandomFileForImport.ts'
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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "c508fd683797f5f4c77b8519182a36985021d6361b6a0aa9c8b69f7e25d6e876",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 9,
            "tsSize": 544,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 3,
            "dtsSize": 485,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "traceResolution": true,
            "module": "amd"
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/cMain.ts",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (12)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/cMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces/project: *new*
  {}
/home/src/workspaces/project/aFileWithImports.ts:
  {}
/home/src/workspaces/project/aRandomFileForImport.ts:
  {}
/home/src/workspaces/project/aRandomFileForImport2.ts:
  {}
/home/src/workspaces/project/bFileWithImports.ts:
  {}
/home/src/workspaces/project/bRandomFileForImport.ts:
  {}
/home/src/workspaces/project/bRandomFileForImport2.ts:
  {}
/home/src/workspaces/project/cFileWithImports.ts: *new*
  {}
/home/src/workspaces/project/cRandomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/cRandomFileForImport2.ts: *new*
  {}
/home/src/workspaces/project/pkg0.d.ts: *new*
  {}
/home/src/workspaces/project/tsconfig.a.json:
  {}
/home/src/workspaces/project/tsconfig.b.json:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}

Projects::
/home/src/workspaces/project/tsconfig.b.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 2
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    dirty: false *changed*
    initialLoadPending: false *changed*
    autoImportProviderHost: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/workspaces/project/aFileWithImports.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/workspaces/project/aRandomFileForImport.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/workspaces/project/aRandomFileForImport2.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/workspaces/project/bFileWithImports.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/workspaces/project/bMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json *default*
/home/src/workspaces/project/bRandomFileForImport.ts *changed*
    version: Text-2
    containingProjects: 2 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/workspaces/project/bRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/cFileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cMain.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/cRandomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cRandomFileForImport2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/index.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/workspaces/project/pkg0.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] modify cRandomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/cRandomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/cRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/cRandomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/cRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
3: /home/src/workspaces/project/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/cRandomFileForImport.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
3: /home/src/workspaces/project/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.b.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 2
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/aFileWithImports.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/aRandomFileForImport.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/aRandomFileForImport2.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bFileWithImports.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json *default*
/home/src/workspaces/project/bRandomFileForImport.ts
    version: Text-2
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/cFileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/cRandomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/pkg0.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './bFileWithImports' from '/home/src/workspaces/project/cFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/bFileWithImports.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/cFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/pkg0.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aFileWithImports' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aFileWithImports.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './bRandomFileForImport' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/bRandomFileForImport.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport2' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport2.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/bRandomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/cRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/pkg0.d.ts'. ========
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (12)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/cMain.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/aRandomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aRandomFileForImport2.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aFileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n"
	/home/src/workspaces/project/bRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/bFileWithImports.ts Text-1 "export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
	/home/src/workspaces/project/pkg0.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/cFileWithImports.ts Text-1 "import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
	/home/src/workspaces/project/cRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/cRandomFileForImport2.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (12)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/cMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (12)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/cMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/bMain.ts,/home/src/workspaces/project/cMain.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/bMain.ts",
          "/home/src/workspaces/project/cMain.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.b.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 2
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/aFileWithImports.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/aRandomFileForImport.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/aRandomFileForImport2.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bFileWithImports.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json *default*
/home/src/workspaces/project/bRandomFileForImport.ts
    version: Text-2
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/cFileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/cRandomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/pkg0.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspaces/project/aMain.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/aMain.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.a.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.a.json",
        "reason": "Creating project referenced in solution /home/src/workspaces/project/tsconfig.json to find possible configured project for /home/src/workspaces/project/aMain.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.a.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module './aRandomFileForImport' from '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module './aRandomFileForImport' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name './aRandomFileForImport' was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module './aRandomFileForImport2' from '/home/src/workspaces/project/aFileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module './aRandomFileForImport2' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name './aRandomFileForImport2' was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport2.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.a.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.a.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/aMain.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/aRandomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aRandomFileForImport2.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aFileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	aMain.ts
	  Part of 'files' list in tsconfig.json
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'aFileWithImports.ts'
	aRandomFileForImport.ts
	  Imported via "./aRandomFileForImport" from file 'aFileWithImports.ts'
	  Part of 'files' list in tsconfig.json
	aRandomFileForImport2.ts
	  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.ts'
	  Part of 'files' list in tsconfig.json
	aFileWithImports.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.a.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "5c3604817af33290066ae1a9079dd39814f1ebd45b5625f71913cd67682ee3c2",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 4,
            "tsSize": 222,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 449,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "traceResolution": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "other",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/aMain.ts",
        "configFile": "/home/src/workspaces/project/tsconfig.a.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (12)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.a.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/cMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/aMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.a.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/home/src/workspaces/project/tsconfig.a.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.b.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 2
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 2
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json *new*
/home/src/workspaces/project/aFileWithImports.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json *new*
/home/src/workspaces/project/aMain.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.a.json *default*
/home/src/workspaces/project/aRandomFileForImport.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json *new*
/home/src/workspaces/project/aRandomFileForImport2.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json *new*
/home/src/workspaces/project/bFileWithImports.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json *default*
/home/src/workspaces/project/bRandomFileForImport.ts
    version: Text-2
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/cFileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/cRandomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/index.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json *new*
/home/src/workspaces/project/pkg0.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] modify aRandomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/aRandomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/aRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.a.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/aRandomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/aRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 4
5: /home/src/workspaces/project/tsconfig.b.json
6: /home/src/workspaces/project/tsconfig.json
7: /home/src/workspaces/project/tsconfig.a.json
8: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/aRandomFileForImport.ts]
export type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 4
5: /home/src/workspaces/project/tsconfig.b.json *new*
6: /home/src/workspaces/project/tsconfig.json *new*
7: /home/src/workspaces/project/tsconfig.a.json *new*
8: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.a.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.b.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/aFileWithImports.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/aMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.a.json *default*
/home/src/workspaces/project/aRandomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/aRandomFileForImport2.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/bFileWithImports.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json *default*
/home/src/workspaces/project/bRandomFileForImport.ts
    version: Text-2
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/cFileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/cRandomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/pkg0.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aFileWithImports' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aFileWithImports.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './bRandomFileForImport' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/bRandomFileForImport.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport2' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport2.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/aRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.a.json'.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/bRandomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.b.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/bMain.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/aRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/aRandomFileForImport2.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aFileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n"
	/home/src/workspaces/project/bRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/bFileWithImports.ts Text-1 "export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
	/home/src/workspaces/project/bRandomFileForImport2.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './bFileWithImports' from '/home/src/workspaces/project/cFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/bFileWithImports.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/cFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/pkg0.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aFileWithImports' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aFileWithImports.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './bRandomFileForImport' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/bRandomFileForImport.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/bFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport2' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport2.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/aRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/tsconfig.a.json'.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/bRandomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/cRandomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/pkg0.d.ts'.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (12)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/cMain.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/aRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/aRandomFileForImport2.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aFileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n"
	/home/src/workspaces/project/bRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/bFileWithImports.ts Text-1 "export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
	/home/src/workspaces/project/pkg0.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/cFileWithImports.ts Text-1 "import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
	/home/src/workspaces/project/cRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/cRandomFileForImport2.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.a.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.a.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './aRandomFileForImport2' from '/home/src/workspaces/project/aFileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/aRandomFileForImport2.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/aRandomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.a.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.a.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/aMain.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/aRandomFileForImport.ts Text-2 "export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/aRandomFileForImport2.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/aFileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nexport { x } from \"./aRandomFileForImport\";\nexport { x as x2 } from \"./aRandomFileForImport2\";\nexport const y = 10;\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (12)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.a.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/cMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/aMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.a.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (12)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.b.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.a.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/bMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.b.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/cMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/aMain.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.a.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/bMain.ts,/home/src/workspaces/project/cMain.ts,/home/src/workspaces/project/aMain.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/bMain.ts",
          "/home/src/workspaces/project/cMain.ts",
          "/home/src/workspaces/project/aMain.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.a.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.b.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/aFileWithImports.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/aMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.a.json *default*
/home/src/workspaces/project/aRandomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/aRandomFileForImport2.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/bFileWithImports.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json *default*
/home/src/workspaces/project/bRandomFileForImport.ts
    version: Text-2
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/bRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.b.json
/home/src/workspaces/project/cFileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cMain.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/cRandomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/cRandomFileForImport2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/tsconfig.b.json
        /home/src/workspaces/project/tsconfig.json
        /home/src/workspaces/project/tsconfig.a.json
/home/src/workspaces/project/pkg0.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
