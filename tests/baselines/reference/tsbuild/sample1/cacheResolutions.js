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
        "cacheResolutions": true
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
        "cacheResolutions": true
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
        "cacheResolutions": true
    }
}

//// [/src/ui/index.ts]
import * as logic from '../logic';

export function run() {
    console.log(logic.getSecondsInDay());
}


//// [/src/ui/tsconfig.json]
{
    "compilerOptions": {
        "skipDefaultLibCheck": true
    },
    "references": [
        { "path": "../logic/index" }
    ]
}




Output::
/lib/tsc --b /src/tests
exitCode:: ExitStatus.Success
Program root files: ["/src/core/anotherModule.ts","/src/core/index.ts","/src/core/some_decl.d.ts"]
Program options: {"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"cacheResolutions":true,"configFilePath":"/src/core/tsconfig.json"}
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

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/core/anothermodule.ts (computed .d.ts during emit)
/src/core/index.ts (computed .d.ts during emit)
/src/core/some_decl.d.ts (used version)

Program root files: ["/src/logic/index.ts"]
Program options: {"composite":true,"declaration":true,"sourceMap":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"cacheResolutions":true,"configFilePath":"/src/logic/tsconfig.json"}
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

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/core/index.d.ts (used version)
/src/core/anothermodule.d.ts (used version)
/src/logic/index.ts (computed .d.ts during emit)

Program root files: ["/src/tests/index.ts"]
Program options: {"composite":true,"declaration":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"cacheResolutions":true,"configFilePath":"/src/tests/tsconfig.json"}
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

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/core/index.d.ts (used version)
/src/core/anothermodule.d.ts (used version)
/src/logic/index.d.ts (used version)
/src/tests/index.ts (computed .d.ts during emit)


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
{"program":{"fileNames":["../../lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-2676574883-export const World = \"hello\";\r\n","signature":"-8396256275-export declare const World = \"hello\";\r\n"},{"version":"-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n","signature":"1874987148-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n"},{"version":"-9253692965-declare const dts: any;\r\n","affectsGlobalScope":true}],"options":{"cacheResolutions":true,"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-8396256275-export declare const World = \"hello\";\r\n"
      },
      "./index.ts": {
        "version": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n",
        "signature": "1874987148-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n"
      },
      "./some_decl.d.ts": {
        "version": "-9253692965-declare const dts: any;\r\n",
        "signature": "-9253692965-declare const dts: any;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "declaration": true,
      "declarationMap": true,
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
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1493
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
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","./index.ts","./","../core/index.ts","../core/anotherModule.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",{"version":"-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"declaration":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"sourceMap":true},"fileIdsList":[[2,3],[3]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,2]],"semanticDiagnosticsPerFile":[1,3,2,4],"latestChangedDtsFile":"./index.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":6}},{"resolvedModule":{"resolvedFileName":7}}],"names":["../core/index","../core/anotherModule"],"resolutionEntries":[[1,1],[2,2]],"modules":[[5,[1,2]]]}},"version":"FakeTSVersion"}

//// [/src/logic/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "./index.ts",
      "./",
      "../core/index.ts",
      "../core/anotherModule.ts"
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
        "version": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map"
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
      "cacheResolutions": true,
      "composite": true,
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
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
    "latestChangedDtsFile": "./index.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts"
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts"
          }
        }
      ],
      "names": [
        "../core/index",
        "../core/anotherModule"
      ],
      "resolutionEntries": [
        [
          "../core/index",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../core/index.ts"
            }
          }
        ],
        [
          "../core/anotherModule",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "../core/anotherModule.ts"
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "../core/index",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../core/index.ts"
                }
              }
            ],
            [
              "../core/anotherModule",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "../core/anotherModule.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1935
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
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","../logic/index.d.ts","./index.ts","../logic","./","../core/anotherModule.ts","../core/index.ts","../logic/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",{"version":"12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"declaration":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true},"fileIdsList":[[3],[2,3,4]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1],[5,1]],"semanticDiagnosticsPerFile":[1,3,2,4,5],"latestChangedDtsFile":"./index.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":8}},{"resolvedModule":{"resolvedFileName":9}},{"resolvedModule":{"resolvedFileName":10}},{"resolvedModule":{"resolvedFileName":8}}],"names":["../core/anotherModule","../core/index","../logic/index"],"resolutionEntries":[[1,1],[2,2],[3,3],[1,4]],"modules":[[6,[1]],[7,[2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/tests/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "../logic/index.d.ts",
      "./index.ts",
      "../logic",
      "./",
      "../core/anotherModule.ts",
      "../core/index.ts",
      "../logic/index.ts"
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
        "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
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
    "latestChangedDtsFile": "./index.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts"
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts"
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "../logic/index.ts"
          }
        },
        {
          "id": 4,
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts"
          }
        }
      ],
      "names": [
        "../core/anotherModule",
        "../core/index",
        "../logic/index"
      ],
      "resolutionEntries": [
        [
          "../core/anotherModule",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../core/anotherModule.ts"
            }
          }
        ],
        [
          "../core/index",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "../core/index.ts"
            }
          }
        ],
        [
          "../logic/index",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "../logic/index.ts"
            }
          }
        ],
        [
          "../core/anotherModule",
          {
            "id": 4,
            "resolvedModule": {
              "resolvedFileName": "../core/anotherModule.ts"
            }
          }
        ]
      ],
      "modules": [
        [
          "../logic",
          [
            [
              "../core/anotherModule",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../core/anotherModule.ts"
                }
              }
            ]
          ]
        ],
        [
          "./",
          [
            [
              "../core/index",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "../core/index.ts"
                }
              }
            ],
            [
              "../logic/index",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "../logic/index.ts"
                }
              }
            ],
            [
              "../core/anotherModule",
              {
                "id": 4,
                "resolvedModule": {
                  "resolvedFileName": "../core/anotherModule.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2237
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
Program options: {"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"cacheResolutions":true,"configFilePath":"/src/core/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/core/anotherModule.ts
/src/core/index.ts
/src/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.ts

Shape signatures in builder refreshed for::
/src/core/index.ts (computed .d.ts)

Program root files: ["/src/logic/index.ts"]
Program options: {"composite":true,"declaration":true,"sourceMap":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"cacheResolutions":true,"configFilePath":"/src/logic/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.d.ts
/src/logic/index.ts

Shape signatures in builder refreshed for::
/src/core/index.d.ts (used version)
/src/logic/index.ts (computed .d.ts)

Program root files: ["/src/tests/index.ts"]
Program options: {"composite":true,"declaration":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"cacheResolutions":true,"configFilePath":"/src/tests/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/lib/lib.d.ts
/src/core/index.d.ts
/src/core/anotherModule.d.ts
/src/logic/index.d.ts
/src/tests/index.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.d.ts
/src/tests/index.ts

Shape signatures in builder refreshed for::
/src/core/index.d.ts (used version)
/src/tests/index.ts (computed .d.ts)


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
{"program":{"fileNames":["../../lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-2676574883-export const World = \"hello\";\r\n","signature":"-8396256275-export declare const World = \"hello\";\r\n"},{"version":"-13387000654-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }","signature":"-14636110300-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n"},{"version":"-9253692965-declare const dts: any;\r\n","affectsGlobalScope":true}],"options":{"cacheResolutions":true,"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-8396256275-export declare const World = \"hello\";\r\n"
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
      "cacheResolutions": true,
      "composite": true,
      "declaration": true,
      "declarationMap": true,
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
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1564
}

//// [/src/logic/index.js] file written with same contents
//// [/src/logic/index.js.map] file written with same contents
//// [/src/logic/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","./index.ts","./","../core/index.ts","../core/anotherModule.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",{"version":"-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"declaration":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true,"sourceMap":true},"fileIdsList":[[2,3],[3]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,2]],"semanticDiagnosticsPerFile":[1,3,2,4],"latestChangedDtsFile":"./index.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":6}},{"resolvedModule":{"resolvedFileName":7}}],"names":["../core/index","../core/anotherModule"],"resolutionEntries":[[1,1],[2,2]],"modules":[[5,[1,2]]]}},"version":"FakeTSVersion"}

//// [/src/logic/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "./index.ts",
      "./",
      "../core/index.ts",
      "../core/anotherModule.ts"
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
      "cacheResolutions": true,
      "composite": true,
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
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
    "latestChangedDtsFile": "./index.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts"
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts"
          }
        }
      ],
      "names": [
        "../core/index",
        "../core/anotherModule"
      ],
      "resolutionEntries": [
        [
          "../core/index",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../core/index.ts"
            }
          }
        ],
        [
          "../core/anotherModule",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "../core/anotherModule.ts"
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "../core/index",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../core/index.ts"
                }
              }
            ],
            [
              "../core/anotherModule",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "../core/anotherModule.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1975
}

//// [/src/tests/index.js] file written with same contents
//// [/src/tests/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","../logic/index.d.ts","./index.ts","../logic","./","../core/anotherModule.ts","../core/index.ts","../logic/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map","7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map","-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",{"version":"12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n","signature":"-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n"}],"options":{"cacheResolutions":true,"composite":true,"declaration":true,"forceConsistentCasingInFileNames":true,"skipDefaultLibCheck":true},"fileIdsList":[[3],[2,3,4]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1],[5,1]],"semanticDiagnosticsPerFile":[1,3,2,4,5],"latestChangedDtsFile":"./index.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":8}},{"resolvedModule":{"resolvedFileName":9}},{"resolvedModule":{"resolvedFileName":10}},{"resolvedModule":{"resolvedFileName":8}}],"names":["../core/anotherModule","../core/index","../logic/index"],"resolutionEntries":[[1,1],[2,2],[3,3],[1,4]],"modules":[[6,[1]],[7,[2,3,4]]]}},"version":"FakeTSVersion"}

//// [/src/tests/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "../logic/index.d.ts",
      "./index.ts",
      "../logic",
      "./",
      "../core/anotherModule.ts",
      "../core/index.ts",
      "../logic/index.ts"
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
      "cacheResolutions": true,
      "composite": true,
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
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
    "latestChangedDtsFile": "./index.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts"
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "../core/index.ts"
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "../logic/index.ts"
          }
        },
        {
          "id": 4,
          "resolvedModule": {
            "resolvedFileName": "../core/anotherModule.ts"
          }
        }
      ],
      "names": [
        "../core/anotherModule",
        "../core/index",
        "../logic/index"
      ],
      "resolutionEntries": [
        [
          "../core/anotherModule",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../core/anotherModule.ts"
            }
          }
        ],
        [
          "../core/index",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "../core/index.ts"
            }
          }
        ],
        [
          "../logic/index",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "../logic/index.ts"
            }
          }
        ],
        [
          "../core/anotherModule",
          {
            "id": 4,
            "resolvedModule": {
              "resolvedFileName": "../core/anotherModule.ts"
            }
          }
        ]
      ],
      "modules": [
        [
          "../logic",
          [
            [
              "../core/anotherModule",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../core/anotherModule.ts"
                }
              }
            ]
          ]
        ],
        [
          "./",
          [
            [
              "../core/index",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "../core/index.ts"
                }
              }
            ],
            [
              "../logic/index",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "../logic/index.ts"
                }
              }
            ],
            [
              "../core/anotherModule",
              {
                "id": 4,
                "resolvedModule": {
                  "resolvedFileName": "../core/anotherModule.ts"
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 2277
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
Program options: {"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"cacheResolutions":true,"configFilePath":"/src/core/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/core/anotherModule.ts
/src/core/index.ts
/src/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/src/core/index.ts

Shape signatures in builder refreshed for::
/src/core/index.ts (computed .d.ts)


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
{"program":{"fileNames":["../../lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-2676574883-export const World = \"hello\";\r\n","signature":"-8396256275-export declare const World = \"hello\";\r\n"},{"version":"-11293323834-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }\nclass someClass2 { }","signature":"-14636110300-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n"},{"version":"-9253692965-declare const dts: any;\r\n","affectsGlobalScope":true}],"options":{"cacheResolutions":true,"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-8396256275-export declare const World = \"hello\";\r\n"
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
      "cacheResolutions": true,
      "composite": true,
      "declaration": true,
      "declarationMap": true,
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
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1586
}

//// [/src/logic/tsconfig.tsbuildinfo] file changed its modified time
//// [/src/tests/tsconfig.tsbuildinfo] file changed its modified time


Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tests
exitCode:: ExitStatus.Success


