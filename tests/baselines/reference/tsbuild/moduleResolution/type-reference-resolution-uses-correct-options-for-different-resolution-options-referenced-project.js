currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/packages/pkg1_index.ts]
export const theNum: TheNum = "type1";

//// [/home/src/workspaces/project/packages/pkg1.tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "typeRoots": [
      "./typeroot1"
    ]
  },
  "files": [
    "./pkg1_index.ts"
  ]
}

//// [/home/src/workspaces/project/packages/typeroot1/sometype/index.d.ts]
declare type TheNum = "type1";

//// [/home/src/workspaces/project/packages/pkg2_index.ts]
export const theNum: TheNum2 = "type2";

//// [/home/src/workspaces/project/packages/pkg2.tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "typeRoots": [
      "./typeroot2"
    ]
  },
  "files": [
    "./pkg2_index.ts"
  ]
}

//// [/home/src/workspaces/project/packages/typeroot2/sometype/index.d.ts]
declare type TheNum2 = "type2";

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


/home/src/tslibs/TS/Lib/tsc.js -b packages/pkg1.tsconfig.json packages/pkg2.tsconfig.json --verbose --traceResolution
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg1.tsconfig.json
    * packages/pkg2.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1.tsconfig.json' is out of date because output file 'packages/pkg1.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/packages/pkg1.tsconfig.json'...

[96mpackages/pkg1_index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS2304: [0mCannot find name 'TheNum'.

[7m1[0m export const theNum: TheNum = "type1";
[7m [0m [91m                     ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2.tsconfig.json' is out of date because output file 'packages/pkg2.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/packages/pkg2.tsconfig.json'...

[96mpackages/pkg2_index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS2304: [0mCannot find name 'TheNum2'.

[7m1[0m export const theNum: TheNum2 = "type2";
[7m [0m [91m                     ~~~~~~~[0m


Found 2 errors.



//// [/home/src/workspaces/project/packages/pkg1_index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = "type1";


//// [/home/src/workspaces/project/packages/pkg1_index.d.ts]
export declare const theNum: TheNum;


//// [/home/src/workspaces/project/packages/pkg1.tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./pkg1_index.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9601687719-export const theNum: TheNum = \"type1\";","signature":"-11475605505-export declare const theNum: TheNum;\n"}],"root":[2],"options":{"composite":true},"semanticDiagnosticsPerFile":[[2,[{"start":21,"length":6,"messageText":"Cannot find name 'TheNum'.","category":1,"code":2304}]]],"latestChangedDtsFile":"./pkg1_index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/packages/pkg1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./pkg1_index.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./pkg1_index.ts": {
      "original": {
        "version": "-9601687719-export const theNum: TheNum = \"type1\";",
        "signature": "-11475605505-export declare const theNum: TheNum;\n"
      },
      "version": "-9601687719-export const theNum: TheNum = \"type1\";",
      "signature": "-11475605505-export declare const theNum: TheNum;\n"
    }
  },
  "root": [
    [
      2,
      "./pkg1_index.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./pkg1_index.ts",
      [
        {
          "start": 21,
          "length": 6,
          "messageText": "Cannot find name 'TheNum'.",
          "category": 1,
          "code": 2304
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./pkg1_index.d.ts",
  "version": "FakeTSVersion",
  "size": 891
}

//// [/home/src/workspaces/project/packages/pkg2_index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = "type2";


//// [/home/src/workspaces/project/packages/pkg2_index.d.ts]
export declare const theNum: TheNum2;


//// [/home/src/workspaces/project/packages/pkg2.tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./pkg2_index.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12823281204-export const theNum: TheNum2 = \"type2\";","signature":"-13622769679-export declare const theNum: TheNum2;\n"}],"root":[2],"options":{"composite":true},"semanticDiagnosticsPerFile":[[2,[{"start":21,"length":7,"messageText":"Cannot find name 'TheNum2'.","category":1,"code":2304}]]],"latestChangedDtsFile":"./pkg2_index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/packages/pkg2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./pkg2_index.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./pkg2_index.ts": {
      "original": {
        "version": "-12823281204-export const theNum: TheNum2 = \"type2\";",
        "signature": "-13622769679-export declare const theNum: TheNum2;\n"
      },
      "version": "-12823281204-export const theNum: TheNum2 = \"type2\";",
      "signature": "-13622769679-export declare const theNum: TheNum2;\n"
    }
  },
  "root": [
    [
      2,
      "./pkg2_index.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./pkg2_index.ts",
      [
        {
          "start": 21,
          "length": 7,
          "messageText": "Cannot find name 'TheNum2'.",
          "category": 1,
          "code": 2304
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./pkg2_index.d.ts",
  "version": "FakeTSVersion",
  "size": 895
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
