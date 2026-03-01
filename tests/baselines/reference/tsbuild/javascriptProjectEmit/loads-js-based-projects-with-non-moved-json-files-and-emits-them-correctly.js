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
[96mcommon/index.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS1202: [0mImport assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from "mod"', 'import {a} from "mod"', 'import d from "mod"', or another module format instead.

[7m1[0m import x = require("./obj.json");
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mcommon/index.ts[0m:[93m2[0m:[93m1[0m - [91merror[0m[90m TS1203: [0mExport assignment cannot be used when targeting ECMAScript modules. Consider using 'export default' or another module format instead.

[7m2[0m export = x;
[7m [0m [91m~~~~~~~~~~~[0m

[96msub-project/index.js[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m TS1192: [0mModule '"/home/src/workspaces/solution/common/index"' has no default export.

[7m1[0m import mod from '../common';
[7m [0m [91m       ~~~[0m


Found 3 errors.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/home/src/workspaces/solution/common/index.js]
export {};


//// [/home/src/workspaces/solution/common/index.d.ts]
import x = require("./obj.json");
export = x;


//// [/home/src/workspaces/solution/common/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2025.full.d.ts","./obj.json","./index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"2353615672-{\n  \"val\": 42\n}","-5032674136-import x = require(\"./obj.json\");\nexport = x;\n"],"root":[2,3],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"esModuleInterop":true,"outDir":"..","rootDir":"..","skipLibCheck":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"start":0,"length":33,"messageText":"Import assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from \"mod\"', 'import {a} from \"mod\"', 'import d from \"mod\"', or another module format instead.","category":1,"code":1202},{"start":34,"length":11,"messageText":"Export assignment cannot be used when targeting ECMAScript modules. Consider using 'export default' or another module format instead.","category":1,"code":1203}]]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "./obj.json",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "./obj.json"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "semanticDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "start": 0,
          "length": 33,
          "messageText": "Import assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from \"mod\"', 'import {a} from \"mod\"', 'import d from \"mod\"', or another module format instead.",
          "category": 1,
          "code": 1202
        },
        {
          "start": 34,
          "length": 11,
          "messageText": "Export assignment cannot be used when targeting ECMAScript modules. Consider using 'export default' or another module format instead.",
          "category": 1,
          "code": 1203
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1411
}

//// [/home/src/workspaces/out/sub-project/index.js]
import mod from '../common';
export const m = mod;


//// [/home/src/workspaces/out/sub-project/index.d.ts]
export const m: any;


//// [/home/src/workspaces/out/sub-project/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2025.full.d.ts","../../solution/common/obj.json","../../solution/common/index.d.ts","../../solution/sub-project/index.js"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"2353615672-{\n  \"val\": 42\n}","-5032674136-import x = require(\"./obj.json\");\nexport = x;\n",{"version":"-14684157955-import mod from '../common';\n\nexport const m = mod;\n","signature":"-12864240766-export const m: any;\n"}],"root":[4],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"esModuleInterop":true,"outDir":"..","rootDir":"../../solution","skipLibCheck":true},"referencedMap":[[3,1],[4,2]],"semanticDiagnosticsPerFile":[[4,[{"start":7,"length":3,"messageText":"Module '\"/home/src/workspaces/solution/common/index\"' has no default export.","category":1,"code":1192}]]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/out/sub-project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
        "signature": "-12864240766-export const m: any;\n"
      },
      "version": "-14684157955-import mod from '../common';\n\nexport const m = mod;\n",
      "signature": "-12864240766-export const m: any;\n"
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
  "semanticDiagnosticsPerFile": [
    [
      "../../solution/sub-project/index.js",
      [
        {
          "start": 7,
          "length": 3,
          "messageText": "Module '\"/home/src/workspaces/solution/common/index\"' has no default export.",
          "category": 1,
          "code": 1192
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1322
}

//// [/home/src/workspaces/out/sub-project-2/index.js]
import { m } from '../sub-project/index';
const variable = {
    key: m,
};
export function getVar() {
    return variable;
}


//// [/home/src/workspaces/out/sub-project-2/index.d.ts]
export function getVar(): {
    key: any;
};


//// [/home/src/workspaces/out/sub-project-2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2025.full.d.ts","../sub-project/index.d.ts","../../solution/sub-project-2/index.js"],"fileIdsList":[[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-12864240766-export const m: any;\n",{"version":"13545386800-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}\n","signature":"4971200248-export function getVar(): {\n    key: any;\n};\n"}],"root":[3],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"esModuleInterop":true,"outDir":"..","rootDir":"../../solution","skipLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/out/sub-project-2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "../sub-project/index.d.ts",
    "../../solution/sub-project-2/index.js"
  ],
  "fileIdsList": [
    [
      "../sub-project/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../sub-project/index.d.ts": {
      "version": "-12864240766-export const m: any;\n",
      "signature": "-12864240766-export const m: any;\n"
    },
    "../../solution/sub-project-2/index.js": {
      "original": {
        "version": "13545386800-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}\n",
        "signature": "4971200248-export function getVar(): {\n    key: any;\n};\n"
      },
      "version": "13545386800-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}\n",
      "signature": "4971200248-export function getVar(): {\n    key: any;\n};\n"
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
  "size": 1139
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
