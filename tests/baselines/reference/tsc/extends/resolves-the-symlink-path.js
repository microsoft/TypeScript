currentDirectory:: /users/user/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/users/user/projects/myconfigs/node_modules/@something/tsconfig-node/tsconfig.json]
{
  "extends": "@something/tsconfig-base/tsconfig.json",
  "compilerOptions": {
    "removeComments": true
  }
}

//// [/users/user/projects/myconfigs/node_modules/@something/tsconfig-base/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/users/user/projects/myproject/src/index.ts]
// some comment
export const x = 10;


//// [/users/user/projects/myproject/src/tsconfig.json]
{
  "extends": "@something/tsconfig-node/tsconfig.json"
}

//// [/users/user/projects/myproject/node_modules/@something/tsconfig-node] symlink(/users/user/projects/myconfigs/node_modules/@something/tsconfig-node)

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


/home/src/tslibs/TS/Lib/tsc.js -p src --extendedDiagnostics
Output::


//// [/users/user/projects/myproject/src/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/users/user/projects/myproject/src/index.d.ts]
export declare const x = 10;


//// [/users/user/projects/myproject/src/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"6873164248-// some comment\nexport const x = 10;\n","signature":"-6821242887-export declare const x = 10;\n"}],"root":[2],"options":{"composite":true,"removeComments":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/users/user/projects/myproject/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "6873164248-// some comment\nexport const x = 10;\n",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "version": "6873164248-// some comment\nexport const x = 10;\n",
      "signature": "-6821242887-export declare const x = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "removeComments": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 818
}


exitCode:: ExitStatus.Success
