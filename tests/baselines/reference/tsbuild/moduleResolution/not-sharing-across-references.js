currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/users/username/projects/app/appA.ts]
import { x } from "moduleX";
export const y = x;


//// [/users/username/projects/app/appB.ts]
import { b } from "../common/moduleB";
export const y = b;


//// [/users/username/projects/app/tsconfig.json]
{"compilerOptions":{"composite":true,"traceResolution":true,"typeRoots":[]},"references":[{"path":"../common"}]}

//// [/users/username/projects/common/moduleA.ts]
export const a = 10;

//// [/users/username/projects/common/moduleB.ts]
import { x } from "moduleX";
export const b = x;


//// [/users/username/projects/common/tsconfig.json]
{"compilerOptions":{"composite":true,"traceResolution":true}}

//// [/users/username/projects/node_modules/moduleX/index.d.ts]
export const x = 10;



Output::
/lib/tsc -b /users/username/projects/app --verbose --traceResolution
[[90m12:00:19 AM[0m] Projects in this build: 
    * users/username/projects/common/tsconfig.json
    * users/username/projects/app/tsconfig.json

[[90m12:00:20 AM[0m] Project 'users/username/projects/common/tsconfig.json' is out of date because output file 'users/username/projects/common/tsconfig.tsbuildinfo' does not exist

[[90m12:00:21 AM[0m] Building project '/users/username/projects/common/tsconfig.json'...

======== Resolving module 'moduleX' from '/users/username/projects/common/moduleB.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/users/username/projects/common/node_modules' does not exist, skipping all lookups in it.
File '/users/username/projects/node_modules/moduleX/package.json' does not exist.
File '/users/username/projects/node_modules/moduleX.ts' does not exist.
File '/users/username/projects/node_modules/moduleX.tsx' does not exist.
File '/users/username/projects/node_modules/moduleX.d.ts' does not exist.
File '/users/username/projects/node_modules/moduleX/index.ts' does not exist.
File '/users/username/projects/node_modules/moduleX/index.tsx' does not exist.
File '/users/username/projects/node_modules/moduleX/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/node_modules/moduleX/index.d.ts', result '/users/username/projects/node_modules/moduleX/index.d.ts'.
======== Module name 'moduleX' was successfully resolved to '/users/username/projects/node_modules/moduleX/index.d.ts'. ========
[[90m12:00:29 AM[0m] Project 'users/username/projects/app/tsconfig.json' is out of date because output file 'users/username/projects/app/tsconfig.tsbuildinfo' does not exist

[[90m12:00:30 AM[0m] Building project '/users/username/projects/app/tsconfig.json'...

======== Resolving module 'moduleX' from '/users/username/projects/app/appA.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/users/username/projects/app/node_modules' does not exist, skipping all lookups in it.
File '/users/username/projects/node_modules/moduleX/package.json' does not exist according to earlier cached lookups.
File '/users/username/projects/node_modules/moduleX.ts' does not exist.
File '/users/username/projects/node_modules/moduleX.tsx' does not exist.
File '/users/username/projects/node_modules/moduleX.d.ts' does not exist.
File '/users/username/projects/node_modules/moduleX/index.ts' does not exist.
File '/users/username/projects/node_modules/moduleX/index.tsx' does not exist.
File '/users/username/projects/node_modules/moduleX/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/users/username/projects/node_modules/moduleX/index.d.ts', result '/users/username/projects/node_modules/moduleX/index.d.ts'.
======== Module name 'moduleX' was successfully resolved to '/users/username/projects/node_modules/moduleX/index.d.ts'. ========
======== Resolving module '../common/moduleB' from '/users/username/projects/app/appB.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/users/username/projects/common/moduleB', target file types: TypeScript, Declaration.
File '/users/username/projects/common/moduleB.ts' exists - use it as a name resolution result.
======== Module name '../common/moduleB' was successfully resolved to '/users/username/projects/common/moduleB.ts'. ========
exitCode:: ExitStatus.Success


//// [/users/username/projects/app/appA.d.ts]
export declare const y = 10;


//// [/users/username/projects/app/appA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
var moduleX_1 = require("moduleX");
exports.y = moduleX_1.x;


//// [/users/username/projects/app/appB.d.ts]
export declare const y = 10;


//// [/users/username/projects/app/appB.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
var moduleB_1 = require("../common/moduleB");
exports.y = moduleB_1.b;


//// [/users/username/projects/app/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.d.ts","../node_modules/modulex/index.d.ts","./appa.ts","../common/moduleb.d.ts","./appb.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-10726455937-export const x = 10;",{"version":"-13036876665-import { x } from \"moduleX\";\nexport const y = x;\n","signature":"-7152472870-export declare const y = 10;\n"},"-3829150557-export declare const b = 10;\n",{"version":"-12006545880-import { b } from \"../common/moduleB\";\nexport const y = b;\n","signature":"-7152472870-export declare const y = 10;\n"}],"root":[3,5],"options":{"composite":true},"fileIdsList":[[2],[4]],"referencedMap":[[3,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,5,4,2],"latestChangedDtsFile":"./appB.d.ts"},"version":"FakeTSVersion"}

//// [/users/username/projects/app/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.d.ts",
      "../node_modules/modulex/index.d.ts",
      "./appa.ts",
      "../common/moduleb.d.ts",
      "./appb.ts"
    ],
    "fileNamesList": [
      [
        "../node_modules/modulex/index.d.ts"
      ],
      [
        "../common/moduleb.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../node_modules/modulex/index.d.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.d.ts",
      "./appa.ts",
      "./appb.ts",
      "../common/moduleb.d.ts",
      "../node_modules/modulex/index.d.ts"
    ],
    "latestChangedDtsFile": "./appB.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1224
}

//// [/users/username/projects/common/moduleA.d.ts]
export declare const a = 10;


//// [/users/username/projects/common/moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;


//// [/users/username/projects/common/moduleB.d.ts]
export declare const b = 10;


//// [/users/username/projects/common/moduleB.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
var moduleX_1 = require("moduleX");
exports.b = moduleX_1.x;


//// [/users/username/projects/common/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.d.ts","./modulea.ts","../node_modules/modulex/index.d.ts","./moduleb.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14660415448-export const a = 10;","signature":"-3497920574-export declare const a = 10;\n"},"-10726455937-export const x = 10;",{"version":"-12675868880-import { x } from \"moduleX\";\nexport const b = x;\n","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2,4],"options":{"composite":true},"fileIdsList":[[3]],"referencedMap":[[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,4,3],"latestChangedDtsFile":"./moduleB.d.ts"},"version":"FakeTSVersion"}

//// [/users/username/projects/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.d.ts",
      "./modulea.ts",
      "../node_modules/modulex/index.d.ts",
      "./moduleb.ts"
    ],
    "fileNamesList": [
      [
        "../node_modules/modulex/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
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
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.d.ts",
      "./modulea.ts",
      "./moduleb.ts",
      "../node_modules/modulex/index.d.ts"
    ],
    "latestChangedDtsFile": "./moduleB.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1108
}

