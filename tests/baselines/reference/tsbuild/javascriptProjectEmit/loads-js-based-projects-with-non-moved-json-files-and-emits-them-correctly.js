currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/common/obj.json]
{
  "val": 42
}

//// [/home/src/workspaces/solution/common/index.ts]
import x = require("./obj.json");
export = x;


//// [/home/src/workspaces/solution/common/tsconfig.json]
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": null,
    "composite": true
  },
  "include": [
    "index.ts",
    "obj.json"
  ]
}

//// [/home/src/workspaces/solution/sub-project/index.js]
import mod from '../common';

export const m = mod;


//// [/home/src/workspaces/solution/sub-project/tsconfig.json]
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../common"
    }
  ],
  "include": [
    "./index.js"
  ]
}

//// [/home/src/workspaces/solution/sub-project-2/index.js]
import { m } from '../sub-project/index';

const variable = {
    key: m,
};

export function getVar() {
    return variable;
}


//// [/home/src/workspaces/solution/sub-project-2/tsconfig.json]
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../sub-project"
    }
  ],
  "include": [
    "./index.js"
  ]
}

//// [/home/src/workspaces/solution/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "./sub-project"
    },
    {
      "path": "./sub-project-2"
    }
  ],
  "include": []
}

//// [/home/src/workspaces/solution/tsconfig.base.json]
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
interface SymbolConstructor {
    readonly species: symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}



/home/src/tslibs/TS/Lib/tsc.js -b
Output::


//// [/home/src/workspaces/solution/common/index.js]
"use strict";
var x = require("./obj.json");
module.exports = x;


//// [/home/src/workspaces/solution/common/index.d.ts]
import x = require("./obj.json");
export = x;


//// [/home/src/workspaces/solution/common/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./obj.json","./index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"2353615672-{\n  \"val\": 42\n}","-5032674136-import x = require(\"./obj.json\");\nexport = x;\n"],"root":[2,3],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"esModuleInterop":true,"outDir":"..","rootDir":"..","skipLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./obj.json",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "./obj.json"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "affectsGlobalScope": true
    },
    "./obj.json": {
      "version": "2353615672-{\n  \"val\": 42\n}",
      "signature": "2353615672-{\n  \"val\": 42\n}"
    },
    "./index.ts": {
      "version": "-5032674136-import x = require(\"./obj.json\");\nexport = x;\n",
      "signature": "-5032674136-import x = require(\"./obj.json\");\nexport = x;\n"
    }
  },
  "root": [
    [
      2,
      "./obj.json"
    ],
    [
      3,
      "./index.ts"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "esModuleInterop": true,
    "outDir": "..",
    "rootDir": "..",
    "skipLibCheck": true
  },
  "referencedMap": {
    "./index.ts": [
      "./obj.json"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1148
}

//// [/home/src/workspaces/out/sub-project/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
var common_1 = __importDefault(require("../common"));
exports.m = common_1.default;


//// [/home/src/workspaces/out/sub-project/index.d.ts]
export const m: {
    val: number;
};


//// [/home/src/workspaces/out/sub-project/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../../solution/common/obj.json","../../solution/common/index.d.ts","../../solution/sub-project/index.js"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"2353615672-{\n  \"val\": 42\n}","-5032674136-import x = require(\"./obj.json\");\nexport = x;\n",{"version":"-14684157955-import mod from '../common';\n\nexport const m = mod;\n","signature":"-12566182521-export const m: {\n    val: number;\n};\n"}],"root":[4],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"esModuleInterop":true,"outDir":"..","rootDir":"../../solution","skipLibCheck":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/out/sub-project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../../solution/common/obj.json",
    "../../solution/common/index.d.ts",
    "../../solution/sub-project/index.js"
  ],
  "fileIdsList": [
    [
      "../../solution/common/obj.json"
    ],
    [
      "../../solution/common/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "affectsGlobalScope": true
    },
    "../../solution/common/obj.json": {
      "version": "2353615672-{\n  \"val\": 42\n}",
      "signature": "2353615672-{\n  \"val\": 42\n}"
    },
    "../../solution/common/index.d.ts": {
      "version": "-5032674136-import x = require(\"./obj.json\");\nexport = x;\n",
      "signature": "-5032674136-import x = require(\"./obj.json\");\nexport = x;\n"
    },
    "../../solution/sub-project/index.js": {
      "original": {
        "version": "-14684157955-import mod from '../common';\n\nexport const m = mod;\n",
        "signature": "-12566182521-export const m: {\n    val: number;\n};\n"
      },
      "version": "-14684157955-import mod from '../common';\n\nexport const m = mod;\n",
      "signature": "-12566182521-export const m: {\n    val: number;\n};\n"
    }
  },
  "root": [
    [
      4,
      "../../solution/sub-project/index.js"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "esModuleInterop": true,
    "outDir": "..",
    "rootDir": "../../solution",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../../solution/common/index.d.ts": [
      "../../solution/common/obj.json"
    ],
    "../../solution/sub-project/index.js": [
      "../../solution/common/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1400
}

//// [/home/src/workspaces/out/sub-project-2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVar = getVar;
var index_1 = require("../sub-project/index");
var variable = {
    key: index_1.m,
};
function getVar() {
    return variable;
}


//// [/home/src/workspaces/out/sub-project-2/index.d.ts]
export function getVar(): {
    key: {
        val: number;
    };
};


//// [/home/src/workspaces/out/sub-project-2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../sub-project/index.d.ts","../../solution/sub-project-2/index.js"],"fileIdsList":[[2]],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-12566182521-export const m: {\n    val: number;\n};\n",{"version":"13545386800-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}\n","signature":"2403991005-export function getVar(): {\n    key: {\n        val: number;\n    };\n};\n"}],"root":[3],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"esModuleInterop":true,"outDir":"..","rootDir":"../../solution","skipLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/out/sub-project-2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../sub-project/index.d.ts",
    "../../solution/sub-project-2/index.js"
  ],
  "fileIdsList": [
    [
      "../sub-project/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "affectsGlobalScope": true
    },
    "../sub-project/index.d.ts": {
      "version": "-12566182521-export const m: {\n    val: number;\n};\n",
      "signature": "-12566182521-export const m: {\n    val: number;\n};\n"
    },
    "../../solution/sub-project-2/index.js": {
      "original": {
        "version": "13545386800-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}\n",
        "signature": "2403991005-export function getVar(): {\n    key: {\n        val: number;\n    };\n};\n"
      },
      "version": "13545386800-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}\n",
      "signature": "2403991005-export function getVar(): {\n    key: {\n        val: number;\n    };\n};\n"
    }
  },
  "root": [
    [
      3,
      "../../solution/sub-project-2/index.js"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "esModuleInterop": true,
    "outDir": "..",
    "rootDir": "../../solution",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../../solution/sub-project-2/index.js": [
      "../sub-project/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1424
}


exitCode:: ExitStatus.Success
