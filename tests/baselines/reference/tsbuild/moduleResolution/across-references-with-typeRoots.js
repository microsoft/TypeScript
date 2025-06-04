currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/node_modules/moduleX/index.d.ts]
export const x = 10;

//// [/home/src/workspaces/project/common/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "traceResolution": true,
    "typeRoots": []
  }
}

//// [/home/src/workspaces/project/common/moduleA.ts]
export const a = 10;

//// [/home/src/workspaces/project/common/moduleB.ts]
import { x } from "moduleX";
export const b = x;


//// [/home/src/workspaces/project/app/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "traceResolution": true,
    "typeRoots": []
  },
  "references": [
    {
      "path": "../common"
    }
  ]
}

//// [/home/src/workspaces/project/app/appA.ts]
import { x } from "moduleX";
export const y = x;


//// [/home/src/workspaces/project/app/appB.ts]
import { b } from "../common/moduleB";
export const y = b;


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


/home/src/tslibs/TS/Lib/tsc.js -b app --verbose --traceResolution
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * common/tsconfig.json
    * app/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'common/tsconfig.json' is out of date because output file 'common/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/common/tsconfig.json'...

======== Resolving module 'moduleX' from '/home/src/workspaces/project/common/moduleB.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/common/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/node_modules/moduleX/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/moduleX.ts' does not exist.
File '/home/src/workspaces/project/node_modules/moduleX.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/moduleX.d.ts' does not exist.
File '/home/src/workspaces/project/node_modules/moduleX/index.ts' does not exist.
File '/home/src/workspaces/project/node_modules/moduleX/index.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/moduleX/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/moduleX/index.d.ts', result '/home/src/workspaces/project/node_modules/moduleX/index.d.ts'.
======== Module name 'moduleX' was successfully resolved to '/home/src/workspaces/project/node_modules/moduleX/index.d.ts'. ========
File '/home/src/workspaces/project/node_modules/moduleX/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[[90mHH:MM:SS AM[0m] Project 'app/tsconfig.json' is out of date because output file 'app/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/app/tsconfig.json'...

======== Resolving module 'moduleX' from '/home/src/workspaces/project/app/appA.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/app/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'moduleX' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'moduleX' was successfully resolved to '/home/src/workspaces/project/node_modules/moduleX/index.d.ts'. ========
File '/home/src/workspaces/project/node_modules/moduleX/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module '../common/moduleB' from '/home/src/workspaces/project/app/appB.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/common/moduleB', target file types: TypeScript, Declaration.
File '/home/src/workspaces/project/common/moduleB.ts' exists - use it as a name resolution result.
======== Module name '../common/moduleB' was successfully resolved to '/home/src/workspaces/project/common/moduleB.ts'. ========


//// [/home/src/workspaces/project/common/moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;


//// [/home/src/workspaces/project/common/moduleA.d.ts]
export declare const a = 10;


//// [/home/src/workspaces/project/common/moduleB.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
var moduleX_1 = require("moduleX");
exports.b = moduleX_1.x;


//// [/home/src/workspaces/project/common/moduleB.d.ts]
export declare const b = 10;


//// [/home/src/workspaces/project/common/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./modulea.ts","../node_modules/modulex/index.d.ts","./moduleb.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14660415448-export const a = 10;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-12675868880-import { x } from \"moduleX\";\nexport const b = x;\n","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2,4],"options":{"composite":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./moduleB.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./modulea.ts",
    "../node_modules/modulex/index.d.ts",
    "./moduleb.ts"
  ],
  "fileIdsList": [
    [
      "../node_modules/modulex/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./modulea.ts": {
      "original": {
        "version": "-14660415448-export const a = 10;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-14660415448-export const a = 10;",
      "signature": "-3497920574-export declare const a = 10;\n"
    },
    "../node_modules/modulex/index.d.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-10726455937-export const x = 10;",
      "impliedFormat": "commonjs"
    },
    "./moduleb.ts": {
      "original": {
        "version": "-12675868880-import { x } from \"moduleX\";\nexport const b = x;\n",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-12675868880-import { x } from \"moduleX\";\nexport const b = x;\n",
      "signature": "-3829150557-export declare const b = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./modulea.ts"
    ],
    [
      4,
      "./moduleb.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./moduleb.ts": [
      "../node_modules/modulex/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./moduleB.d.ts",
  "version": "FakeTSVersion",
  "size": 1070
}

//// [/home/src/workspaces/project/app/appA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
var moduleX_1 = require("moduleX");
exports.y = moduleX_1.x;


//// [/home/src/workspaces/project/app/appA.d.ts]
export declare const y = 10;


//// [/home/src/workspaces/project/app/appB.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
var moduleB_1 = require("../common/moduleB");
exports.y = moduleB_1.b;


//// [/home/src/workspaces/project/app/appB.d.ts]
export declare const y = 10;


//// [/home/src/workspaces/project/app/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../node_modules/modulex/index.d.ts","./appa.ts","../common/moduleb.d.ts","./appb.ts"],"fileIdsList":[[2],[4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-13036876665-import { x } from \"moduleX\";\nexport const y = x;\n","signature":"-7152472870-export declare const y = 10;\n"},"-3829150557-export declare const b = 10;\n",{"version":"-12006545880-import { b } from \"../common/moduleB\";\nexport const y = b;\n","signature":"-7152472870-export declare const y = 10;\n"}],"root":[3,5],"options":{"composite":true},"referencedMap":[[3,1],[5,2]],"latestChangedDtsFile":"./appB.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/app/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../node_modules/modulex/index.d.ts",
    "./appa.ts",
    "../common/moduleb.d.ts",
    "./appb.ts"
  ],
  "fileIdsList": [
    [
      "../node_modules/modulex/index.d.ts"
    ],
    [
      "../common/moduleb.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../node_modules/modulex/index.d.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-10726455937-export const x = 10;",
      "impliedFormat": "commonjs"
    },
    "./appa.ts": {
      "original": {
        "version": "-13036876665-import { x } from \"moduleX\";\nexport const y = x;\n",
        "signature": "-7152472870-export declare const y = 10;\n"
      },
      "version": "-13036876665-import { x } from \"moduleX\";\nexport const y = x;\n",
      "signature": "-7152472870-export declare const y = 10;\n"
    },
    "../common/moduleb.d.ts": {
      "version": "-3829150557-export declare const b = 10;\n",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./appb.ts": {
      "original": {
        "version": "-12006545880-import { b } from \"../common/moduleB\";\nexport const y = b;\n",
        "signature": "-7152472870-export declare const y = 10;\n"
      },
      "version": "-12006545880-import { b } from \"../common/moduleB\";\nexport const y = b;\n",
      "signature": "-7152472870-export declare const y = 10;\n"
    }
  },
  "root": [
    [
      3,
      "./appa.ts"
    ],
    [
      5,
      "./appb.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./appa.ts": [
      "../node_modules/modulex/index.d.ts"
    ],
    "./appb.ts": [
      "../common/moduleb.d.ts"
    ]
  },
  "latestChangedDtsFile": "./appB.d.ts",
  "version": "FakeTSVersion",
  "size": 1184
}


exitCode:: ExitStatus.Success
