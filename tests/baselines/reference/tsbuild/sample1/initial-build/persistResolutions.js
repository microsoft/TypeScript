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

//// [/src/core/anotherModule.ts]
export const World = "hello";


//// [/src/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


//// [/src/core/some_decl.d.ts]
declare const dts: any;


//// [/src/core/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "skipDefaultLibCheck": true,
        "persistResolutions": true
    }
}

//// [/src/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;


//// [/src/logic/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "sourceMap": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true,
        "persistResolutions": true
    },
    "references": [
        {
            "path": "../core"
        }
    ]
}

//// [/src/tests/index.ts]
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;


//// [/src/tests/tsconfig.json]
{
    "references": [
        {
            "path": "../core"
        },
        {
            "path": "../logic"
        }
    ],
    "files": [
        "index.ts"
    ],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true,
        "persistResolutions": true
    }
}

//// [/src/ui/index.ts]


//// [/src/ui/tsconfig.json]




Output::
/lib/tsc --b /src/tests
exitCode:: ExitStatus.Success
Program root files: ["/src/core/anotherModule.ts","/src/core/index.ts","/src/core/some_decl.d.ts"]
Program options: {"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/core/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/core/anotherModule.ts
/src/core/index.ts
/src/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/core/anotherModule.ts
/src/core/index.ts
/src/core/some_decl.d.ts

Program root files: ["/src/logic/index.ts"]
Program options: {"composite":true,"declaration":true,"sourceMap":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/logic/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.ts

Program root files: ["/src/tests/index.ts"]
Program options: {"composite":true,"declaration":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/tests/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.d.ts
/src/tests/index.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.d.ts
/src/tests/index.ts


//// [/src/core/anotherModule.d.ts]
export declare const World = "hello";
//# sourceMappingURL=anotherModule.d.ts.map

//// [/src/core/anotherModule.d.ts.map]
{"version":3,"file":"anotherModule.d.ts","sourceRoot":"","sources":["anotherModule.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,KAAK,UAAU,CAAC"}

//// [/src/core/anotherModule.js]
"use strict";
exports.__esModule = true;
exports.World = void 0;
exports.World = "hello";


//// [/src/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
//# sourceMappingURL=index.d.ts.map

//// [/src/core/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB"}

//// [/src/core/index.js]
"use strict";
exports.__esModule = true;
exports.multiply = exports.leftPad = exports.someString = void 0;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;


//// [/src/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts","./anotherModule.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2676574883-export const World = \"hello\";\r\n","-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n",{"version":"-9253692965-declare const dts: any;\r\n","affectsGlobalScope":true}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":5,"originalFileName":5,"path":2,"resolvedPath":2,"version":"-2676574883-export const World = \"hello\";\r\n","flags":0,"includeReasons":[{"kind":0,"index":0}]},{"fileName":3,"originalFileName":3,"path":3,"resolvedPath":3,"version":"-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n","flags":0,"includeReasons":[{"kind":0,"index":1}]},{"fileName":4,"originalFileName":4,"path":4,"resolvedPath":4,"version":"-9253692965-declare const dts: any;\r\n","flags":0,"includeReasons":[{"kind":0,"index":2}]}],"rootFileNames":["./anotherModule.ts","./index.ts","./some_decl.d.ts"]}},"version":"FakeTSVersion"}

//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts",
      "./anotherModule.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-2676574883-export const World = \"hello\";\r\n"
      },
      "./index.ts": {
        "version": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n",
        "signature": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
      },
      "./some_decl.d.ts": {
        "version": "-9253692965-declare const dts: any;\r\n",
        "signature": "-9253692965-declare const dts: any;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "declarationMap": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "./anotherModule.ts",
          "originalFileName": "./anotherModule.ts",
          "path": "./anothermodule.ts",
          "resolvedPath": "./anothermodule.ts",
          "version": "-2676574883-export const World = \"hello\";\r\n",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 1
            }
          ]
        },
        {
          "fileName": "./some_decl.d.ts",
          "originalFileName": "./some_decl.d.ts",
          "path": "./some_decl.d.ts",
          "resolvedPath": "./some_decl.d.ts",
          "version": "-9253692965-declare const dts: any;\r\n",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 2
            }
          ]
        }
      ],
      "rootFileNames": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2556
}

//// [/src/logic/index.d.ts]
export declare function getSecondsInDay(): number;
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/src/logic/index.js]
"use strict";
exports.__esModule = true;
exports.m = exports.getSecondsInDay = void 0;
var c = require("../core/index");
function getSecondsInDay() {
    return c.multiply(10, 15);
}
exports.getSecondsInDay = getSecondsInDay;
var mod = require("../core/anotherModule");
exports.m = mod;
//# sourceMappingURL=index.js.map

//// [/src/logic/index.js.map]
{"version":3,"file":"index.js","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":";;;AAAA,iCAAmC;AACnC,SAAgB,eAAe;IAC3B,OAAO,CAAC,CAAC,QAAQ,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC9B,CAAC;AAFD,0CAEC;AACD,2CAA6C;AAChC,QAAA,CAAC,GAAG,GAAG,CAAC"}

//// [/src/logic/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","./index.ts","../core/index.ts","../core/anotherModule.d.ts","../core/anotherModule.ts","../core/anothermodule.ts","../core/tsconfig.json","../core","../core/some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true,"sourceMap":true},"fileIdsList":[[2,3]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,1]],"semanticDiagnosticsPerFile":[1,3,2,4],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":2,"originalFileName":5,"path":5,"resolvedPath":2,"version":"-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0}]},{"fileName":6,"originalFileName":7,"path":8,"resolvedPath":3,"version":"7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":4,"index":1}]},{"fileName":4,"originalFileName":4,"path":4,"resolvedPath":4,"version":"-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","flags":0,"imports":[{"kind":10,"text":"../core/index"},{"kind":10,"text":"../core/anotherModule"}],"resolvedModules":{"../core/index":0,"../core/anotherModule":1},"includeReasons":[{"kind":0,"index":0}]}],"rootFileNames":["./index.ts"],"filesByName":[9],"projectReferences":[{"path":10,"originalPath":"../core"}],"resolvedProjectReferences":[{"commandLine":{"fileNames":[7,5,11],"options":{"composite":true,"configFilePath":"../core/tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true}},"sourceFile":{"path":9}}],"resolutions":[{"resolvedModule":{"resolvedFileName":"../core/index.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../core/anotherModule.ts","extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/logic/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "./index.ts",
      "../core/index.ts",
      "../core/anotherModule.d.ts",
      "../core/anotherModule.ts",
      "../core/anothermodule.ts",
      "../core/tsconfig.json",
      "../core",
      "../core/some_decl.d.ts"
    ],
    "fileNamesList": [
      [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map"
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map"
      },
      "./index.ts": {
        "version": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true
    },
    "referencedMap": {
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "./index.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "../core/index.d.ts",
          "originalFileName": "../core/index.ts",
          "path": "../core/index.ts",
          "resolvedPath": "../core/index.d.ts",
          "version": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 0
            }
          ]
        },
        {
          "fileName": "../core/anotherModule.d.ts",
          "originalFileName": "../core/anotherModule.ts",
          "path": "../core/anothermodule.ts",
          "resolvedPath": "../core/anothermodule.d.ts",
          "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "../core/index"
            },
            {
              "kind": 10,
              "text": "../core/anotherModule"
            }
          ],
          "resolvedModules": {
            "../core/index": 0,
            "../core/anotherModule": 1
          },
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        }
      ],
      "rootFileNames": [
        "./index.ts"
      ],
      "filesByName": {
        "../core/tsconfig.json": "../core/tsconfig.json"
      },
      "projectReferences": [
        {
          "path": "../core",
          "originalPath": "../core"
        }
      ],
      "resolvedProjectReferences": [
        {
          "commandLine": {
            "fileNames": [
              "../core/anotherModule.ts",
              "../core/index.ts",
              "../core/some_decl.d.ts"
            ],
            "options": {
              "composite": true,
              "configFilePath": "../core/tsconfig.json",
              "declaration": true,
              "declarationMap": true,
              "persistResolutions": true,
              "skipDefaultLibCheck": true
            }
          },
          "sourceFile": {
            "path": "../core/tsconfig.json"
          }
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3853
}

//// [/src/tests/index.d.ts]
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/src/tests/index.js]
"use strict";
exports.__esModule = true;
exports.m = void 0;
var c = require("../core/index");
var logic = require("../logic/index");
c.leftPad("", 10);
logic.getSecondsInDay();
var mod = require("../core/anotherModule");
exports.m = mod;


//// [/src/tests/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","../logic/index.d.ts","./index.ts","../core/index.ts","../core/anotherModule.d.ts","../core/anotherModule.ts","../core/anothermodule.ts","../logic/index.ts","../core/tsconfig.json","../logic/tsconfig.json","../core","../logic","../core/some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n","12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true},"fileIdsList":[[3],[2,3,4]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1],[5,2]],"semanticDiagnosticsPerFile":[1,3,2,4,5],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":2,"originalFileName":6,"path":6,"resolvedPath":2,"version":"-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0}]},{"fileName":7,"originalFileName":8,"path":9,"resolvedPath":3,"version":"7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":10,"index":0},{"kind":3,"file":5,"index":2}]},{"fileName":4,"originalFileName":10,"path":10,"resolvedPath":4,"version":"-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n","flags":0,"imports":[{"kind":10,"text":"../core/anotherModule"}],"resolvedModules":{"../core/anotherModule":0},"includeReasons":[{"kind":3,"file":5,"index":1}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","flags":0,"imports":[{"kind":10,"text":"../core/index"},{"kind":10,"text":"../logic/index"},{"kind":10,"text":"../core/anotherModule"}],"resolvedModules":{"../core/index":1,"../logic/index":2,"../core/anotherModule":3},"includeReasons":[{"kind":0,"index":0}]}],"rootFileNames":["./index.ts"],"filesByName":[11,12],"projectReferences":[{"path":13,"originalPath":"../core"},{"path":14,"originalPath":"../logic"}],"resolvedProjectReferences":[{"commandLine":{"fileNames":[8,6,15],"options":{"composite":true,"configFilePath":"../core/tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true}},"sourceFile":{"path":11}},{"commandLine":{"fileNames":[10],"options":{"composite":true,"configFilePath":"../logic/tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true,"sourceMap":true},"projectReferences":[{"path":13,"originalPath":"../core"}]},"sourceFile":{"path":12},"references":[{"commandLine":{"fileNames":[8,6,15],"options":{"composite":true,"configFilePath":"../core/tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true}},"sourceFile":{"path":11}}]}],"resolutions":[{"resolvedModule":{"resolvedFileName":"../core/anotherModule.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../core/index.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../logic/index.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../core/anotherModule.ts","extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/tests/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "../logic/index.d.ts",
      "./index.ts",
      "../core/index.ts",
      "../core/anotherModule.d.ts",
      "../core/anotherModule.ts",
      "../core/anothermodule.ts",
      "../logic/index.ts",
      "../core/tsconfig.json",
      "../logic/tsconfig.json",
      "../core",
      "../logic",
      "../core/some_decl.d.ts"
    ],
    "fileNamesList": [
      [
        "../core/anothermodule.d.ts"
      ],
      [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map"
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map"
      },
      "../logic/index.d.ts": {
        "version": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"
      },
      "./index.ts": {
        "version": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true
    },
    "referencedMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "../logic/index.d.ts",
      "./index.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "../core/index.d.ts",
          "originalFileName": "../core/index.ts",
          "path": "../core/index.ts",
          "resolvedPath": "../core/index.d.ts",
          "version": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 0
            }
          ]
        },
        {
          "fileName": "../core/anotherModule.d.ts",
          "originalFileName": "../core/anotherModule.ts",
          "path": "../core/anothermodule.ts",
          "resolvedPath": "../core/anothermodule.d.ts",
          "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "../logic/index.ts",
              "index": 0
            },
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "../logic/index.d.ts",
          "originalFileName": "../logic/index.ts",
          "path": "../logic/index.ts",
          "resolvedPath": "../logic/index.d.ts",
          "version": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "../core/anotherModule"
            }
          ],
          "resolvedModules": {
            "../core/anotherModule": 0
          },
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "../core/index"
            },
            {
              "kind": 10,
              "text": "../logic/index"
            },
            {
              "kind": 10,
              "text": "../core/anotherModule"
            }
          ],
          "resolvedModules": {
            "../core/index": 1,
            "../logic/index": 2,
            "../core/anotherModule": 3
          },
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        }
      ],
      "rootFileNames": [
        "./index.ts"
      ],
      "filesByName": {
        "../core/tsconfig.json": "../core/tsconfig.json",
        "../logic/tsconfig.json": "../logic/tsconfig.json"
      },
      "projectReferences": [
        {
          "path": "../core",
          "originalPath": "../core"
        },
        {
          "path": "../logic",
          "originalPath": "../logic"
        }
      ],
      "resolvedProjectReferences": [
        {
          "commandLine": {
            "fileNames": [
              "../core/anotherModule.ts",
              "../core/index.ts",
              "../core/some_decl.d.ts"
            ],
            "options": {
              "composite": true,
              "configFilePath": "../core/tsconfig.json",
              "declaration": true,
              "declarationMap": true,
              "persistResolutions": true,
              "skipDefaultLibCheck": true
            }
          },
          "sourceFile": {
            "path": "../core/tsconfig.json"
          }
        },
        {
          "commandLine": {
            "fileNames": [
              "../logic/index.ts"
            ],
            "options": {
              "composite": true,
              "configFilePath": "../logic/tsconfig.json",
              "declaration": true,
              "forceConsistentCasingInFileNames": true,
              "persistResolutions": true,
              "skipDefaultLibCheck": true,
              "sourceMap": true
            },
            "projectReferences": [
              {
                "path": "../core",
                "originalPath": "../core"
              }
            ]
          },
          "sourceFile": {
            "path": "../logic/tsconfig.json"
          },
          "references": [
            {
              "commandLine": {
                "fileNames": [
                  "../core/anotherModule.ts",
                  "../core/index.ts",
                  "../core/some_decl.d.ts"
                ],
                "options": {
                  "composite": true,
                  "configFilePath": "../core/tsconfig.json",
                  "declaration": true,
                  "declarationMap": true,
                  "persistResolutions": true,
                  "skipDefaultLibCheck": true
                }
              },
              "sourceFile": {
                "path": "../core/tsconfig.json"
              }
            }
          ]
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../logic/index.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5388
}



Change:: incremental-declaration-changes
Input::
//// [/src/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }

export class someClass { }



Output::
/lib/tsc --b /src/tests
exitCode:: ExitStatus.Success
Program root files: ["/src/core/anotherModule.ts","/src/core/index.ts","/src/core/some_decl.d.ts"]
Program options: {"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/core/tsconfig.json"}
Program structureReused: Completely
Program files::
/lib/lib.d.ts
/src/core/anotherModule.ts
/src/core/index.ts
/src/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.ts

Program root files: ["/src/logic/index.ts"]
Program options: {"composite":true,"declaration":true,"sourceMap":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/logic/tsconfig.json"}
Program structureReused: Completely
Program files::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.d.ts
/src/logic/index.ts

Program root files: ["/src/tests/index.ts"]
Program options: {"composite":true,"declaration":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/tests/tsconfig.json"}
Program structureReused: Completely
Program files::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.d.ts
/src/tests/index.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.d.ts
/src/tests/index.ts


//// [/src/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
export declare class someClass {
}
//# sourceMappingURL=index.d.ts.map

//// [/src/core/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAEhE,qBAAa,SAAS;CAAI"}

//// [/src/core/index.js]
"use strict";
exports.__esModule = true;
exports.someClass = exports.multiply = exports.leftPad = exports.someString = void 0;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;
var someClass = /** @class */ (function () {
    function someClass() {
    }
    return someClass;
}());
exports.someClass = someClass;


//// [/src/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts","./anotherModule.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2676574883-export const World = \"hello\";\r\n",{"version":"-13387000654-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }","signature":"-14636110300-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n"},{"version":"-9253692965-declare const dts: any;\r\n","affectsGlobalScope":true}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":5,"originalFileName":5,"path":2,"resolvedPath":2,"version":"-2676574883-export const World = \"hello\";\r\n","flags":0,"includeReasons":[{"kind":0,"index":0}]},{"fileName":3,"originalFileName":3,"path":3,"resolvedPath":3,"version":"-13387000654-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }","flags":0,"includeReasons":[{"kind":0,"index":1}]},{"fileName":4,"originalFileName":4,"path":4,"resolvedPath":4,"version":"-9253692965-declare const dts: any;\r\n","flags":0,"includeReasons":[{"kind":0,"index":2}]}],"rootFileNames":["./anotherModule.ts","./index.ts","./some_decl.d.ts"]}},"version":"FakeTSVersion"}

//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts",
      "./anotherModule.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-2676574883-export const World = \"hello\";\r\n"
      },
      "./index.ts": {
        "version": "-13387000654-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }",
        "signature": "-14636110300-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n"
      },
      "./some_decl.d.ts": {
        "version": "-9253692965-declare const dts: any;\r\n",
        "signature": "-9253692965-declare const dts: any;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "declarationMap": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "./anotherModule.ts",
          "originalFileName": "./anotherModule.ts",
          "path": "./anothermodule.ts",
          "resolvedPath": "./anothermodule.ts",
          "version": "-2676574883-export const World = \"hello\";\r\n",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "-13387000654-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 1
            }
          ]
        },
        {
          "fileName": "./some_decl.d.ts",
          "originalFileName": "./some_decl.d.ts",
          "path": "./some_decl.d.ts",
          "resolvedPath": "./some_decl.d.ts",
          "version": "-9253692965-declare const dts: any;\r\n",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 2
            }
          ]
        }
      ],
      "rootFileNames": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2870
}

//// [/src/logic/index.d.ts] file written with same contents
//// [/src/logic/index.js] file written with same contents
//// [/src/logic/index.js.map] file written with same contents
//// [/src/logic/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","./index.ts","../core/index.ts","../core/anotherModule.d.ts","../core/anotherModule.ts","../core/anothermodule.ts","../core/tsconfig.json","../core","../core/some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",{"version":"-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true,"sourceMap":true},"fileIdsList":[[2,3],[3]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,2]],"semanticDiagnosticsPerFile":[1,3,2,4],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":2,"originalFileName":5,"path":5,"resolvedPath":2,"version":"-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0}]},{"fileName":6,"originalFileName":7,"path":8,"resolvedPath":3,"version":"7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":4,"index":1}]},{"fileName":4,"originalFileName":4,"path":4,"resolvedPath":4,"version":"-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","flags":0,"imports":[{"kind":10,"text":"../core/index"},{"kind":10,"text":"../core/anotherModule"}],"resolvedModules":{"../core/index":0,"../core/anotherModule":1},"includeReasons":[{"kind":0,"index":0}]}],"rootFileNames":["./index.ts"],"filesByName":[9],"projectReferences":[{"path":10,"originalPath":"../core"}],"resolvedProjectReferences":[{"commandLine":{"fileNames":[7,5,11],"options":{"composite":true,"configFilePath":"../core/tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true}},"sourceFile":{"path":9}}],"resolutions":[{"resolvedModule":{"resolvedFileName":"../core/index.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../core/anotherModule.ts","extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/logic/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "./index.ts",
      "../core/index.ts",
      "../core/anotherModule.d.ts",
      "../core/anotherModule.ts",
      "../core/anothermodule.ts",
      "../core/tsconfig.json",
      "../core",
      "../core/some_decl.d.ts"
    ],
    "fileNamesList": [
      [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ],
      [
        "../core/anothermodule.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map"
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map"
      },
      "./index.ts": {
        "version": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true
    },
    "referencedMap": {
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "./index.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "../core/index.d.ts",
          "originalFileName": "../core/index.ts",
          "path": "../core/index.ts",
          "resolvedPath": "../core/index.d.ts",
          "version": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 0
            }
          ]
        },
        {
          "fileName": "../core/anotherModule.d.ts",
          "originalFileName": "../core/anotherModule.ts",
          "path": "../core/anothermodule.ts",
          "resolvedPath": "../core/anothermodule.d.ts",
          "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "../core/index"
            },
            {
              "kind": 10,
              "text": "../core/anotherModule"
            }
          ],
          "resolvedModules": {
            "../core/index": 0,
            "../core/anotherModule": 1
          },
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        }
      ],
      "rootFileNames": [
        "./index.ts"
      ],
      "filesByName": {
        "../core/tsconfig.json": "../core/tsconfig.json"
      },
      "projectReferences": [
        {
          "path": "../core",
          "originalPath": "../core"
        }
      ],
      "resolvedProjectReferences": [
        {
          "commandLine": {
            "fileNames": [
              "../core/anotherModule.ts",
              "../core/index.ts",
              "../core/some_decl.d.ts"
            ],
            "options": {
              "composite": true,
              "configFilePath": "../core/tsconfig.json",
              "declaration": true,
              "declarationMap": true,
              "persistResolutions": true,
              "skipDefaultLibCheck": true
            }
          },
          "sourceFile": {
            "path": "../core/tsconfig.json"
          }
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4118
}

//// [/src/tests/index.d.ts] file written with same contents
//// [/src/tests/index.js] file written with same contents
//// [/src/tests/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","../logic/index.d.ts","./index.ts","../core/index.ts","../core/anotherModule.d.ts","../core/anotherModule.ts","../core/anothermodule.ts","../logic/index.ts","../core/tsconfig.json","../logic/tsconfig.json","../core","../logic","../core/some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",{"version":"12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true},"fileIdsList":[[3],[2,3,4]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1],[5,1]],"semanticDiagnosticsPerFile":[1,3,2,4,5],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":2,"originalFileName":6,"path":6,"resolvedPath":2,"version":"-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0}]},{"fileName":7,"originalFileName":8,"path":9,"resolvedPath":3,"version":"7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":10,"index":0},{"kind":3,"file":5,"index":2}]},{"fileName":4,"originalFileName":10,"path":10,"resolvedPath":4,"version":"-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n","flags":0,"imports":[{"kind":10,"text":"../core/anotherModule"}],"resolvedModules":{"../core/anotherModule":0},"includeReasons":[{"kind":3,"file":5,"index":1}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","flags":0,"imports":[{"kind":10,"text":"../core/index"},{"kind":10,"text":"../logic/index"},{"kind":10,"text":"../core/anotherModule"}],"resolvedModules":{"../core/index":1,"../logic/index":2,"../core/anotherModule":3},"includeReasons":[{"kind":0,"index":0}]}],"rootFileNames":["./index.ts"],"filesByName":[11,12],"projectReferences":[{"path":13,"originalPath":"../core"},{"path":14,"originalPath":"../logic"}],"resolvedProjectReferences":[{"commandLine":{"fileNames":[8,6,15],"options":{"composite":true,"configFilePath":"../core/tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true}},"sourceFile":{"path":11}},{"commandLine":{"fileNames":[10],"options":{"composite":true,"configFilePath":"../logic/tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true,"sourceMap":true},"projectReferences":[{"path":13,"originalPath":"../core"}]},"sourceFile":{"path":12},"references":[{"commandLine":{"fileNames":[8,6,15],"options":{"composite":true,"configFilePath":"../core/tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true}},"sourceFile":{"path":11}}]}],"resolutions":[{"resolvedModule":{"resolvedFileName":"../core/anotherModule.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../core/index.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../logic/index.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../core/anotherModule.ts","extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/tests/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "../logic/index.d.ts",
      "./index.ts",
      "../core/index.ts",
      "../core/anotherModule.d.ts",
      "../core/anotherModule.ts",
      "../core/anothermodule.ts",
      "../logic/index.ts",
      "../core/tsconfig.json",
      "../logic/tsconfig.json",
      "../core",
      "../logic",
      "../core/some_decl.d.ts"
    ],
    "fileNamesList": [
      [
        "../core/anothermodule.d.ts"
      ],
      [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map"
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map"
      },
      "../logic/index.d.ts": {
        "version": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"
      },
      "./index.ts": {
        "version": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true
    },
    "referencedMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "../logic/index.d.ts",
      "./index.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "../core/index.d.ts",
          "originalFileName": "../core/index.ts",
          "path": "../core/index.ts",
          "resolvedPath": "../core/index.d.ts",
          "version": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 0
            }
          ]
        },
        {
          "fileName": "../core/anotherModule.d.ts",
          "originalFileName": "../core/anotherModule.ts",
          "path": "../core/anothermodule.ts",
          "resolvedPath": "../core/anothermodule.d.ts",
          "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "../logic/index.ts",
              "index": 0
            },
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "../logic/index.d.ts",
          "originalFileName": "../logic/index.ts",
          "path": "../logic/index.ts",
          "resolvedPath": "../logic/index.d.ts",
          "version": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "../core/anotherModule"
            }
          ],
          "resolvedModules": {
            "../core/anotherModule": 0
          },
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "../core/index"
            },
            {
              "kind": 10,
              "text": "../logic/index"
            },
            {
              "kind": 10,
              "text": "../core/anotherModule"
            }
          ],
          "resolvedModules": {
            "../core/index": 1,
            "../logic/index": 2,
            "../core/anotherModule": 3
          },
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        }
      ],
      "rootFileNames": [
        "./index.ts"
      ],
      "filesByName": {
        "../core/tsconfig.json": "../core/tsconfig.json",
        "../logic/tsconfig.json": "../logic/tsconfig.json"
      },
      "projectReferences": [
        {
          "path": "../core",
          "originalPath": "../core"
        },
        {
          "path": "../logic",
          "originalPath": "../logic"
        }
      ],
      "resolvedProjectReferences": [
        {
          "commandLine": {
            "fileNames": [
              "../core/anotherModule.ts",
              "../core/index.ts",
              "../core/some_decl.d.ts"
            ],
            "options": {
              "composite": true,
              "configFilePath": "../core/tsconfig.json",
              "declaration": true,
              "declarationMap": true,
              "persistResolutions": true,
              "skipDefaultLibCheck": true
            }
          },
          "sourceFile": {
            "path": "../core/tsconfig.json"
          }
        },
        {
          "commandLine": {
            "fileNames": [
              "../logic/index.ts"
            ],
            "options": {
              "composite": true,
              "configFilePath": "../logic/tsconfig.json",
              "declaration": true,
              "forceConsistentCasingInFileNames": true,
              "persistResolutions": true,
              "skipDefaultLibCheck": true,
              "sourceMap": true
            },
            "projectReferences": [
              {
                "path": "../core",
                "originalPath": "../core"
              }
            ]
          },
          "sourceFile": {
            "path": "../logic/tsconfig.json"
          },
          "references": [
            {
              "commandLine": {
                "fileNames": [
                  "../core/anotherModule.ts",
                  "../core/index.ts",
                  "../core/some_decl.d.ts"
                ],
                "options": {
                  "composite": true,
                  "configFilePath": "../core/tsconfig.json",
                  "declaration": true,
                  "declarationMap": true,
                  "persistResolutions": true,
                  "skipDefaultLibCheck": true
                }
              },
              "sourceFile": {
                "path": "../core/tsconfig.json"
              }
            }
          ]
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../logic/index.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5592
}



Change:: incremental-declaration-doesnt-change
Input::
//// [/src/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }

export class someClass { }
class someClass2 { }



Output::
/lib/tsc --b /src/tests
exitCode:: ExitStatus.Success
Program root files: ["/src/core/anotherModule.ts","/src/core/index.ts","/src/core/some_decl.d.ts"]
Program options: {"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/core/tsconfig.json"}
Program structureReused: Completely
Program files::
/lib/lib.d.ts
/src/core/anotherModule.ts
/src/core/index.ts
/src/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.ts


//// [/src/core/index.d.ts] file written with same contents
//// [/src/core/index.d.ts.map] file written with same contents
//// [/src/core/index.js]
"use strict";
exports.__esModule = true;
exports.someClass = exports.multiply = exports.leftPad = exports.someString = void 0;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;
var someClass = /** @class */ (function () {
    function someClass() {
    }
    return someClass;
}());
exports.someClass = someClass;
var someClass2 = /** @class */ (function () {
    function someClass2() {
    }
    return someClass2;
}());


//// [/src/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts","./anotherModule.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2676574883-export const World = \"hello\";\r\n",{"version":"-11293323834-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }\nclass someClass2 { }","signature":"-14636110300-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n"},{"version":"-9253692965-declare const dts: any;\r\n","affectsGlobalScope":true}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":5,"originalFileName":5,"path":2,"resolvedPath":2,"version":"-2676574883-export const World = \"hello\";\r\n","flags":0,"includeReasons":[{"kind":0,"index":0}]},{"fileName":3,"originalFileName":3,"path":3,"resolvedPath":3,"version":"-11293323834-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }\nclass someClass2 { }","flags":0,"includeReasons":[{"kind":0,"index":1}]},{"fileName":4,"originalFileName":4,"path":4,"resolvedPath":4,"version":"-9253692965-declare const dts: any;\r\n","flags":0,"includeReasons":[{"kind":0,"index":2}]}],"rootFileNames":["./anotherModule.ts","./index.ts","./some_decl.d.ts"]}},"version":"FakeTSVersion"}

//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts",
      "./anotherModule.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-2676574883-export const World = \"hello\";\r\n"
      },
      "./index.ts": {
        "version": "-11293323834-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }\nclass someClass2 { }",
        "signature": "-14636110300-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n"
      },
      "./some_decl.d.ts": {
        "version": "-9253692965-declare const dts: any;\r\n",
        "signature": "-9253692965-declare const dts: any;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "declarationMap": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "./anotherModule.ts",
          "originalFileName": "./anotherModule.ts",
          "path": "./anothermodule.ts",
          "resolvedPath": "./anothermodule.ts",
          "version": "-2676574883-export const World = \"hello\";\r\n",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "-11293323834-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }\nclass someClass2 { }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 1
            }
          ]
        },
        {
          "fileName": "./some_decl.d.ts",
          "originalFileName": "./some_decl.d.ts",
          "path": "./some_decl.d.ts",
          "resolvedPath": "./some_decl.d.ts",
          "version": "-9253692965-declare const dts: any;\r\n",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 2
            }
          ]
        }
      ],
      "rootFileNames": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2914
}



Change:: Clean resolutions
Input::


Output::
/lib/tsc --b /src/tests --cleanPersistedProgram
exitCode:: ExitStatus.Success


//// [/src/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts","./anotherModule.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2676574883-export const World = \"hello\";\r\n",{"version":"-11293323834-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }\nclass someClass2 { }","signature":"-14636110300-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n"},{"version":"-9253692965-declare const dts: any;\r\n","affectsGlobalScope":true}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/src/logic/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","./index.ts","../core/index.ts","../core/anotherModule.d.ts","../core/anotherModule.ts","../core/anothermodule.ts","../core/tsconfig.json","../core","../core/some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",{"version":"-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true,"sourceMap":true},"fileIdsList":[[2,3],[3]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,2]],"semanticDiagnosticsPerFile":[1,3,2,4]},"version":"FakeTSVersion"}

//// [/src/tests/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","../logic/index.d.ts","./index.ts","../core/index.ts","../core/anotherModule.d.ts","../core/anotherModule.ts","../core/anothermodule.ts","../logic/index.ts","../core/tsconfig.json","../logic/tsconfig.json","../core","../logic","../core/some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",{"version":"12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true},"fileIdsList":[[3],[2,3,4]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1],[5,1]],"semanticDiagnosticsPerFile":[1,3,2,4,5]},"version":"FakeTSVersion"}



Change:: Modify core
Input::
//// [/src/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }

export class someClassNew { }
class someClass2 { }



Output::
/lib/tsc --b /src/tests
exitCode:: ExitStatus.Success
Program root files: ["/src/core/anotherModule.ts","/src/core/index.ts","/src/core/some_decl.d.ts"]
Program options: {"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/core/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/core/anotherModule.ts
/src/core/index.ts
/src/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.ts

Program root files: ["/src/logic/index.ts"]
Program options: {"composite":true,"declaration":true,"sourceMap":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/logic/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.d.ts
/src/logic/index.ts

Program root files: ["/src/tests/index.ts"]
Program options: {"composite":true,"declaration":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"persistResolutions":true,"configFilePath":"/src/tests/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.d.ts
/src/tests/index.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.d.ts
/src/tests/index.ts


//// [/src/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
export declare class someClassNew {
}
//# sourceMappingURL=index.d.ts.map

//// [/src/core/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAEhE,qBAAa,YAAY;CAAI"}

//// [/src/core/index.js]
"use strict";
exports.__esModule = true;
exports.someClassNew = exports.multiply = exports.leftPad = exports.someString = void 0;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;
var someClassNew = /** @class */ (function () {
    function someClassNew() {
    }
    return someClassNew;
}());
exports.someClassNew = someClassNew;
var someClass2 = /** @class */ (function () {
    function someClass2() {
    }
    return someClass2;
}());


//// [/src/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts","./anotherModule.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2676574883-export const World = \"hello\";\r\n",{"version":"-22243974128-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClassNew { }\nclass someClass2 { }","signature":"-11313403026-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n"},{"version":"-9253692965-declare const dts: any;\r\n","affectsGlobalScope":true}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":5,"originalFileName":5,"path":2,"resolvedPath":2,"version":"-2676574883-export const World = \"hello\";\r\n","flags":0,"includeReasons":[{"kind":0,"index":0}]},{"fileName":3,"originalFileName":3,"path":3,"resolvedPath":3,"version":"-22243974128-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClassNew { }\nclass someClass2 { }","flags":0,"includeReasons":[{"kind":0,"index":1}]},{"fileName":4,"originalFileName":4,"path":4,"resolvedPath":4,"version":"-9253692965-declare const dts: any;\r\n","flags":0,"includeReasons":[{"kind":0,"index":2}]}],"rootFileNames":["./anotherModule.ts","./index.ts","./some_decl.d.ts"]}},"version":"FakeTSVersion"}

//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts",
      "./anotherModule.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-2676574883-export const World = \"hello\";\r\n"
      },
      "./index.ts": {
        "version": "-22243974128-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClassNew { }\nclass someClass2 { }",
        "signature": "-11313403026-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n"
      },
      "./some_decl.d.ts": {
        "version": "-9253692965-declare const dts: any;\r\n",
        "signature": "-9253692965-declare const dts: any;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "declarationMap": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "./anotherModule.ts",
          "originalFileName": "./anotherModule.ts",
          "path": "./anothermodule.ts",
          "resolvedPath": "./anothermodule.ts",
          "version": "-2676574883-export const World = \"hello\";\r\n",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "-22243974128-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClassNew { }\nclass someClass2 { }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 1
            }
          ]
        },
        {
          "fileName": "./some_decl.d.ts",
          "originalFileName": "./some_decl.d.ts",
          "path": "./some_decl.d.ts",
          "resolvedPath": "./some_decl.d.ts",
          "version": "-9253692965-declare const dts: any;\r\n",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 0,
              "index": 2
            }
          ]
        }
      ],
      "rootFileNames": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2923
}

//// [/src/logic/index.d.ts] file written with same contents
//// [/src/logic/index.js] file written with same contents
//// [/src/logic/index.js.map] file written with same contents
//// [/src/logic/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","./index.ts","../core/index.ts","../core/anotherModule.d.ts","../core/anotherModule.ts","../core/anothermodule.ts","../core/tsconfig.json","../core","../core/some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",{"version":"-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true,"sourceMap":true},"fileIdsList":[[2,3],[3]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,2]],"semanticDiagnosticsPerFile":[1,3,2,4],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":2,"originalFileName":5,"path":5,"resolvedPath":2,"version":"-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0}]},{"fileName":6,"originalFileName":7,"path":8,"resolvedPath":3,"version":"7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":4,"index":1}]},{"fileName":4,"originalFileName":4,"path":4,"resolvedPath":4,"version":"-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","flags":0,"imports":[{"kind":10,"text":"../core/index"},{"kind":10,"text":"../core/anotherModule"}],"resolvedModules":{"../core/index":0,"../core/anotherModule":1},"includeReasons":[{"kind":0,"index":0}]}],"rootFileNames":["./index.ts"],"filesByName":[9],"projectReferences":[{"path":10,"originalPath":"../core"}],"resolvedProjectReferences":[{"commandLine":{"fileNames":[7,5,11],"options":{"composite":true,"configFilePath":"../core/tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true}},"sourceFile":{"path":9}}],"resolutions":[{"resolvedModule":{"resolvedFileName":"../core/index.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../core/anotherModule.ts","extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/logic/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "./index.ts",
      "../core/index.ts",
      "../core/anotherModule.d.ts",
      "../core/anotherModule.ts",
      "../core/anothermodule.ts",
      "../core/tsconfig.json",
      "../core",
      "../core/some_decl.d.ts"
    ],
    "fileNamesList": [
      [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ],
      [
        "../core/anothermodule.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map"
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map"
      },
      "./index.ts": {
        "version": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true
    },
    "referencedMap": {
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "./index.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "../core/index.d.ts",
          "originalFileName": "../core/index.ts",
          "path": "../core/index.ts",
          "resolvedPath": "../core/index.d.ts",
          "version": "-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 0
            }
          ]
        },
        {
          "fileName": "../core/anotherModule.d.ts",
          "originalFileName": "../core/anotherModule.ts",
          "path": "../core/anothermodule.ts",
          "resolvedPath": "../core/anothermodule.d.ts",
          "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "../core/index"
            },
            {
              "kind": 10,
              "text": "../core/anotherModule"
            }
          ],
          "resolvedModules": {
            "../core/index": 0,
            "../core/anotherModule": 1
          },
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        }
      ],
      "rootFileNames": [
        "./index.ts"
      ],
      "filesByName": {
        "../core/tsconfig.json": "../core/tsconfig.json"
      },
      "projectReferences": [
        {
          "path": "../core",
          "originalPath": "../core"
        }
      ],
      "resolvedProjectReferences": [
        {
          "commandLine": {
            "fileNames": [
              "../core/anotherModule.ts",
              "../core/index.ts",
              "../core/some_decl.d.ts"
            ],
            "options": {
              "composite": true,
              "configFilePath": "../core/tsconfig.json",
              "declaration": true,
              "declarationMap": true,
              "persistResolutions": true,
              "skipDefaultLibCheck": true
            }
          },
          "sourceFile": {
            "path": "../core/tsconfig.json"
          }
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4124
}

//// [/src/tests/index.d.ts] file written with same contents
//// [/src/tests/index.js] file written with same contents
//// [/src/tests/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","../logic/index.d.ts","./index.ts","../core/index.ts","../core/anotherModule.d.ts","../core/anotherModule.ts","../core/anothermodule.ts","../logic/index.ts","../core/tsconfig.json","../logic/tsconfig.json","../core","../logic","../core/some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",{"version":"12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true},"fileIdsList":[[3],[2,3,4]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1],[5,1]],"semanticDiagnosticsPerFile":[1,3,2,4,5],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":2,"originalFileName":6,"path":6,"resolvedPath":2,"version":"-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0}]},{"fileName":7,"originalFileName":8,"path":9,"resolvedPath":3,"version":"7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","flags":0,"includeReasons":[{"kind":3,"file":10,"index":0},{"kind":3,"file":5,"index":2}]},{"fileName":4,"originalFileName":10,"path":10,"resolvedPath":4,"version":"-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n","flags":0,"imports":[{"kind":10,"text":"../core/anotherModule"}],"resolvedModules":{"../core/anotherModule":0},"includeReasons":[{"kind":3,"file":5,"index":1}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","flags":0,"imports":[{"kind":10,"text":"../core/index"},{"kind":10,"text":"../logic/index"},{"kind":10,"text":"../core/anotherModule"}],"resolvedModules":{"../core/index":1,"../logic/index":2,"../core/anotherModule":3},"includeReasons":[{"kind":0,"index":0}]}],"rootFileNames":["./index.ts"],"filesByName":[11,12],"projectReferences":[{"path":13,"originalPath":"../core"},{"path":14,"originalPath":"../logic"}],"resolvedProjectReferences":[{"commandLine":{"fileNames":[8,6,15],"options":{"composite":true,"configFilePath":"../core/tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true}},"sourceFile":{"path":11}},{"commandLine":{"fileNames":[10],"options":{"composite":true,"configFilePath":"../logic/tsconfig.json","declaration":true,"forceConsistentCasingInFileNames":true,"persistResolutions":true,"skipDefaultLibCheck":true,"sourceMap":true},"projectReferences":[{"path":13,"originalPath":"../core"}]},"sourceFile":{"path":12},"references":[{"commandLine":{"fileNames":[8,6,15],"options":{"composite":true,"configFilePath":"../core/tsconfig.json","declaration":true,"declarationMap":true,"persistResolutions":true,"skipDefaultLibCheck":true}},"sourceFile":{"path":11}}]}],"resolutions":[{"resolvedModule":{"resolvedFileName":"../core/anotherModule.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../core/index.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../logic/index.ts","extension":".ts"}},{"resolvedModule":{"resolvedFileName":"../core/anotherModule.ts","extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/src/tests/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "../logic/index.d.ts",
      "./index.ts",
      "../core/index.ts",
      "../core/anotherModule.d.ts",
      "../core/anotherModule.ts",
      "../core/anothermodule.ts",
      "../logic/index.ts",
      "../core/tsconfig.json",
      "../logic/tsconfig.json",
      "../core",
      "../logic",
      "../core/some_decl.d.ts"
    ],
    "fileNamesList": [
      [
        "../core/anothermodule.d.ts"
      ],
      [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map"
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map"
      },
      "../logic/index.d.ts": {
        "version": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"
      },
      "./index.ts": {
        "version": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
      "persistResolutions": true,
      "skipDefaultLibCheck": true
    },
    "referencedMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/index.d.ts",
        "../core/anothermodule.d.ts",
        "../logic/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "../logic/index.d.ts",
      "./index.ts"
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../lib/lib.d.ts",
          "originalFileName": "../../lib/lib.d.ts",
          "path": "../../lib/lib.d.ts",
          "resolvedPath": "../../lib/lib.d.ts",
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": 6
            }
          ]
        },
        {
          "fileName": "../core/index.d.ts",
          "originalFileName": "../core/index.ts",
          "path": "../core/index.ts",
          "resolvedPath": "../core/index.d.ts",
          "version": "-9469451737-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClassNew {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 0
            }
          ]
        },
        {
          "fileName": "../core/anotherModule.d.ts",
          "originalFileName": "../core/anotherModule.ts",
          "path": "../core/anothermodule.ts",
          "resolvedPath": "../core/anothermodule.d.ts",
          "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
          "flags": 0,
          "includeReasons": [
            {
              "kind": 3,
              "file": "../logic/index.ts",
              "index": 0
            },
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "../logic/index.d.ts",
          "originalFileName": "../logic/index.ts",
          "path": "../logic/index.ts",
          "resolvedPath": "../logic/index.d.ts",
          "version": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "../core/anotherModule"
            }
          ],
          "resolvedModules": {
            "../core/anotherModule": 0
          },
          "includeReasons": [
            {
              "kind": 3,
              "file": "./index.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./index.ts",
          "originalFileName": "./index.ts",
          "path": "./index.ts",
          "resolvedPath": "./index.ts",
          "version": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "../core/index"
            },
            {
              "kind": 10,
              "text": "../logic/index"
            },
            {
              "kind": 10,
              "text": "../core/anotherModule"
            }
          ],
          "resolvedModules": {
            "../core/index": 1,
            "../logic/index": 2,
            "../core/anotherModule": 3
          },
          "includeReasons": [
            {
              "kind": 0,
              "index": 0
            }
          ]
        }
      ],
      "rootFileNames": [
        "./index.ts"
      ],
      "filesByName": {
        "../core/tsconfig.json": "../core/tsconfig.json",
        "../logic/tsconfig.json": "../logic/tsconfig.json"
      },
      "projectReferences": [
        {
          "path": "../core",
          "originalPath": "../core"
        },
        {
          "path": "../logic",
          "originalPath": "../logic"
        }
      ],
      "resolvedProjectReferences": [
        {
          "commandLine": {
            "fileNames": [
              "../core/anotherModule.ts",
              "../core/index.ts",
              "../core/some_decl.d.ts"
            ],
            "options": {
              "composite": true,
              "configFilePath": "../core/tsconfig.json",
              "declaration": true,
              "declarationMap": true,
              "persistResolutions": true,
              "skipDefaultLibCheck": true
            }
          },
          "sourceFile": {
            "path": "../core/tsconfig.json"
          }
        },
        {
          "commandLine": {
            "fileNames": [
              "../logic/index.ts"
            ],
            "options": {
              "composite": true,
              "configFilePath": "../logic/tsconfig.json",
              "declaration": true,
              "forceConsistentCasingInFileNames": true,
              "persistResolutions": true,
              "skipDefaultLibCheck": true,
              "sourceMap": true
            },
            "projectReferences": [
              {
                "path": "../core",
                "originalPath": "../core"
              }
            ]
          },
          "sourceFile": {
            "path": "../logic/tsconfig.json"
          },
          "references": [
            {
              "commandLine": {
                "fileNames": [
                  "../core/anotherModule.ts",
                  "../core/index.ts",
                  "../core/some_decl.d.ts"
                ],
                "options": {
                  "composite": true,
                  "configFilePath": "../core/tsconfig.json",
                  "declaration": true,
                  "declarationMap": true,
                  "persistResolutions": true,
                  "skipDefaultLibCheck": true
                }
              },
              "sourceFile": {
                "path": "../core/tsconfig.json"
              }
            }
          ]
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../logic/index.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5598
}

