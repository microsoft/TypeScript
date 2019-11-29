//// [/lib/initial-buildOutput.txt]
/lib/tsc -b /src
exitCode:: ExitStatus.Success


//// [/out/sub-project/index.d.ts]
export const m: typeof mod;
import mod from "../common";


//// [/out/sub-project/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var common_1 = __importDefault(require("../common"));
exports.m = common_1["default"];


//// [/out/sub-project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n"
      },
      "../../src/common/obj.json": {
        "version": "-6323167306-export declare const val: number;\r\n",
        "signature": "-6323167306-export declare const val: number;\r\n"
      },
      "../../src/common/index.ts": {
        "version": "-4085459678-import x = require(\"./obj.json\");\r\nexport = x;\r\n",
        "signature": "-4085459678-import x = require(\"./obj.json\");\r\nexport = x;\r\n"
      },
      "../../src/sub-project/index.js": {
        "version": "-14684157955-import mod from '../common';\n\nexport const m = mod;\n",
        "signature": "-229957289-export const m: typeof mod;\r\nimport mod from \"../common\";\r\n"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../src",
      "outDir": "..",
      "allowJs": true,
      "checkJs": true,
      "resolveJsonModule": true,
      "esModuleInterop": true,
      "declaration": true,
      "composite": true,
      "configFilePath": "../../src/sub-project/tsconfig.json"
    },
    "referencedMap": {
      "../../src/common/index.ts": [
        "../../src/common/obj.d.ts"
      ],
      "../../src/sub-project/index.js": [
        "../../src/common/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/common/index.ts": [
        "../../src/common/obj.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../../src/common/index.ts",
      "../../src/common/obj.json",
      "../../src/sub-project/index.js"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/out/sub-project-2/index.d.ts]
export function getVar(): {
    key: typeof import("../common/obj.json");
};


//// [/out/sub-project-2/index.js]
"use strict";
exports.__esModule = true;
var index_1 = require("../sub-project/index");
var variable = {
    key: index_1.m
};
function getVar() {
    return variable;
}
exports.getVar = getVar;


//// [/out/sub-project-2/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n"
      },
      "../../src/common/obj.json": {
        "version": "-6323167306-export declare const val: number;\r\n",
        "signature": "-6323167306-export declare const val: number;\r\n"
      },
      "../../src/common/index.ts": {
        "version": "-4085459678-import x = require(\"./obj.json\");\r\nexport = x;\r\n",
        "signature": "-4085459678-import x = require(\"./obj.json\");\r\nexport = x;\r\n"
      },
      "../../src/sub-project/index.js": {
        "version": "-229957289-export const m: typeof mod;\r\nimport mod from \"../common\";\r\n",
        "signature": "-229957289-export const m: typeof mod;\r\nimport mod from \"../common\";\r\n"
      },
      "../../src/sub-project-2/index.js": {
        "version": "13545386800-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}\n",
        "signature": "-9206156860-export function getVar(): {\r\n    key: typeof import(\"../common/obj.json\");\r\n};\r\n"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../src",
      "outDir": "..",
      "allowJs": true,
      "checkJs": true,
      "resolveJsonModule": true,
      "esModuleInterop": true,
      "declaration": true,
      "composite": true,
      "configFilePath": "../../src/sub-project-2/tsconfig.json"
    },
    "referencedMap": {
      "../../src/common/index.ts": [
        "../../src/common/obj.d.ts"
      ],
      "../../src/sub-project-2/index.js": [
        "../sub-project/index.d.ts"
      ],
      "../../src/sub-project/index.js": [
        "../../src/common/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/common/index.ts": [
        "../../src/common/obj.d.ts"
      ],
      "../../src/sub-project-2/index.js": [
        "../../src/common/obj.d.ts"
      ],
      "../../src/sub-project/index.js": [
        "../../src/common/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../../src/common/index.ts",
      "../../src/common/obj.json",
      "../../src/sub-project-2/index.js",
      "../../src/sub-project/index.js"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/common/index.d.ts]
import x = require("./obj.json");
export = x;


//// [/src/common/index.js]
"use strict";
var x = require("./obj.json");
module.exports = x;


//// [/src/common/obj.d.ts]
export declare const val: number;


//// [/src/common/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n"
      },
      "./obj.json": {
        "version": "2151907832-{\n    \"val\": 42\n}",
        "signature": "-6323167306-export declare const val: number;\r\n"
      },
      "./index.ts": {
        "version": "-5032674136-import x = require(\"./obj.json\");\nexport = x;\n",
        "signature": "-4085459678-import x = require(\"./obj.json\");\r\nexport = x;\r\n"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "..",
      "outDir": "../..",
      "allowJs": true,
      "checkJs": true,
      "resolveJsonModule": true,
      "esModuleInterop": true,
      "declaration": true,
      "composite": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./index.ts": [
        "./obj.json"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "./obj.json"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./index.ts",
      "./obj.json"
    ]
  },
  "version": "FakeTSVersion"
}

