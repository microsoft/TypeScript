currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project/src/index.ts]
import hello from "../../hello.json"
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
  "include": [
    "src/**/*"
  ]
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

//// [/home/src/workspaces/solution/hello.json]
{
  "hello": "world"
}


/home/src/tslibs/TS/Lib/tsc.js --b project --v --explainFiles --listEmittedFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is out of date because output file 'project/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project/tsconfig.json'...

[96mproject/tsconfig.json[0m:[93m4[0m:[93m25[0m - [91merror[0m[90m TS5107: [0mOption 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m4[0m     "moduleResolution": "node",
[7m [0m [91m                        ~~~~~~[0m

TSFILE: /home/src/workspaces/solution/project/dist/src/index.js
TSFILE: /home/src/workspaces/solution/project/dist/src/index.d.ts
TSFILE: /home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
hello.json
  Imported via "../../hello.json" from file 'project/src/index.ts'
project/src/index.ts
  Matched by include pattern 'src/**/*' in 'project/tsconfig.json'

Found 1 error.



//// [/home/src/workspaces/solution/project/dist/src/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hello_json_1 = __importDefault(require("../../hello.json"));
exports.default = hello_json_1.default.hello;


//// [/home/src/workspaces/solution/project/dist/src/index.d.ts]
declare const _default: string;
export default _default;


//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../../hello.json","../src/index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"6651571919-{\n  \"hello\": \"world\"\n}",{"version":"-19695506097-import hello from \"../../hello.json\"\nexport default hello.hello\n","signature":"6785192742-declare const _default: string;\nexport default _default;\n"}],"root":[3],"options":{"allowSyntheticDefaultImports":true,"composite":true,"esModuleInterop":true,"module":1,"outDir":"./","skipDefaultLibCheck":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./src/index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../../hello.json",
    "../src/index.ts"
  ],
  "fileIdsList": [
    [
      "../../hello.json"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../hello.json": {
      "version": "6651571919-{\n  \"hello\": \"world\"\n}",
      "signature": "6651571919-{\n  \"hello\": \"world\"\n}"
    },
    "../src/index.ts": {
      "original": {
        "version": "-19695506097-import hello from \"../../hello.json\"\nexport default hello.hello\n",
        "signature": "6785192742-declare const _default: string;\nexport default _default;\n"
      },
      "version": "-19695506097-import hello from \"../../hello.json\"\nexport default hello.hello\n",
      "signature": "6785192742-declare const _default: string;\nexport default _default;\n"
    }
  },
  "root": [
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
      "../../hello.json"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../../hello.json",
      "not cached or not changed"
    ],
    [
      "../src/index.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./src/index.d.ts",
  "version": "FakeTSVersion",
  "size": 1065
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
