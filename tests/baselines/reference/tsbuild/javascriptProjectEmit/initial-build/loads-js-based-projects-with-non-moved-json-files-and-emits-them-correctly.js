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
interface SymbolConstructor {
    readonly species: symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}


//// [/src/common/index.ts]
import x = require("./obj.json");
export = x;


//// [/src/common/obj.json]
{
    "val": 42
}

//// [/src/common/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "outDir": null,
        "composite": true
    },
    "include": ["index.ts", "obj.json"]
}

//// [/src/sub-project/index.js]
import mod from '../common';

export const m = mod;


//// [/src/sub-project/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../common" }
    ],
    "include": ["./index.js"]
}

//// [/src/sub-project-2/index.js]
import { m } from '../sub-project/index';

const variable = {
    key: m,
};

export function getVar() {
    return variable;
}


//// [/src/sub-project-2/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../sub-project" }
    ],
    "include": ["./index.js"]
}

//// [/src/tsconfig.base.json]
{
    "compilerOptions": {
        "skipLibCheck": true,
        "rootDir": "./",
        "outDir": "../out",
        "allowJs": true,
        "checkJs": true,
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "declaration": true
    }
}

//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "./sub-project" },
        { "path": "./sub-project-2" }
    ],
    "include": []
}



Output::
/lib/tsc -b /src
exitCode:: ExitStatus.Success


//// [/out/sub-project/index.d.ts]
export const m: {
    val: number;
};


//// [/out/sub-project/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.m = void 0;
var common_1 = __importDefault(require("../common"));
exports.m = common_1["default"];


//// [/out/sub-project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "../../src/common/obj.json": {
        "version": "2151907832-{\n    \"val\": 42\n}",
        "affectsGlobalScope": true
      },
      "../../src/common/index.d.ts": {
        "version": "-4085459678-import x = require(\"./obj.json\");\r\nexport = x;\r\n",
        "signature": "-4085459678-import x = require(\"./obj.json\");\r\nexport = x;\r\n",
        "affectsGlobalScope": false
      },
      "../../src/sub-project/index.js": {
        "version": "-14684157955-import mod from '../common';\n\nexport const m = mod;\n",
        "signature": "-15768184370-export const m: {\r\n    val: number;\r\n};\r\n",
        "affectsGlobalScope": false
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
      "../../src/common/index.d.ts": [
        "../../src/common/obj.json"
      ],
      "../../src/sub-project/index.js": [
        "../../src/common/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/common/index.d.ts": [
        "../../src/common/obj.json"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../../src/common/index.d.ts",
      "../../src/common/obj.json",
      "../../src/sub-project/index.js"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/out/sub-project-2/index.d.ts]
export function getVar(): {
    key: {
        val: number;
    };
};


//// [/out/sub-project-2/index.js]
"use strict";
exports.__esModule = true;
exports.getVar = void 0;
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
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "../sub-project/index.d.ts": {
        "version": "-15768184370-export const m: {\r\n    val: number;\r\n};\r\n",
        "signature": "-15768184370-export const m: {\r\n    val: number;\r\n};\r\n",
        "affectsGlobalScope": false
      },
      "../../src/sub-project-2/index.js": {
        "version": "13545386800-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}\n",
        "signature": "-2686589794-export function getVar(): {\r\n    key: {\r\n        val: number;\r\n    };\r\n};\r\n",
        "affectsGlobalScope": false
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
      "../../src/sub-project-2/index.js": [
        "../sub-project/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../sub-project/index.d.ts",
      "../../src/sub-project-2/index.js"
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


//// [/src/common/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "./obj.json": {
        "version": "2151907832-{\n    \"val\": 42\n}",
        "signature": "-6323167306-export declare const val: number;\r\n",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-5032674136-import x = require(\"./obj.json\");\nexport = x;\n",
        "signature": "-4085459678-import x = require(\"./obj.json\");\r\nexport = x;\r\n",
        "affectsGlobalScope": false
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

