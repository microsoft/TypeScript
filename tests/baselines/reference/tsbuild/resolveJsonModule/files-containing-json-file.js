currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project/src/hello.json]
{
  "hello": "world"
}

//// [/home/src/workspaces/solution/project/src/index.ts]
import hello from "./hello.json"
export default hello.hello


//// [/home/src/workspaces/solution/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "moduleResolution": "node",
    "module": "commonjs",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "outDir": "dist",
    "skipDefaultLibCheck": true
  },
  "files": [
    "src/index.ts",
    "src/hello.json"
  ]
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


/home/src/tslibs/TS/Lib/tsc.js --b project --v --explainFiles --listEmittedFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is out of date because output file 'project/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project/tsconfig.json'...

TSFILE: /home/src/workspaces/solution/project/dist/src/hello.json
TSFILE: /home/src/workspaces/solution/project/dist/src/index.js
TSFILE: /home/src/workspaces/solution/project/dist/src/index.d.ts
TSFILE: /home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project/src/hello.json
  Imported via "./hello.json" from file 'project/src/index.ts'
  Part of 'files' list in tsconfig.json
project/src/index.ts
  Part of 'files' list in tsconfig.json


//// [/home/src/workspaces/solution/project/dist/src/hello.json]
{
    "hello": "world"
}


//// [/home/src/workspaces/solution/project/dist/src/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hello_json_1 = __importDefault(require("./hello.json"));
exports.default = hello_json_1.default.hello;


//// [/home/src/workspaces/solution/project/dist/src/index.d.ts]
declare const _default: string;
export default _default;


//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../src/hello.json","../src/index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"6651571919-{\n  \"hello\": \"world\"\n}",{"version":"-6443385642-import hello from \"./hello.json\"\nexport default hello.hello\n","signature":"6785192742-declare const _default: string;\nexport default _default;\n"}],"root":[2,3],"options":{"allowSyntheticDefaultImports":true,"composite":true,"esModuleInterop":true,"module":1,"outDir":"./","skipDefaultLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./src/index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../src/hello.json",
    "../src/index.ts"
  ],
  "fileIdsList": [
    [
      "../src/hello.json"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/hello.json": {
      "version": "6651571919-{\n  \"hello\": \"world\"\n}",
      "signature": "6651571919-{\n  \"hello\": \"world\"\n}"
    },
    "../src/index.ts": {
      "original": {
        "version": "-6443385642-import hello from \"./hello.json\"\nexport default hello.hello\n",
        "signature": "6785192742-declare const _default: string;\nexport default _default;\n"
      },
      "version": "-6443385642-import hello from \"./hello.json\"\nexport default hello.hello\n",
      "signature": "6785192742-declare const _default: string;\nexport default _default;\n"
    }
  },
  "root": [
    [
      2,
      "../src/hello.json"
    ],
    [
      3,
      "../src/index.ts"
    ]
  ],
  "options": {
    "allowSyntheticDefaultImports": true,
    "composite": true,
    "esModuleInterop": true,
    "module": 1,
    "outDir": "./",
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "../src/index.ts": [
      "../src/hello.json"
    ]
  },
  "latestChangedDtsFile": "./src/index.d.ts",
  "version": "FakeTSVersion",
  "size": 1066
}


exitCode:: ExitStatus.Success
