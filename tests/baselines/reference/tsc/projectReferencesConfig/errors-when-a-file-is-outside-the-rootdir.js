currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/alpha/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "bin"
  },
  "references": []
}

//// [/home/src/workspaces/project/alpha/src/a.ts]
import * as b from '../../beta/b'

//// [/home/src/workspaces/project/beta/b.ts]
export { }

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


/home/src/tslibs/TS/Lib/tsc.js --p alpha/tsconfig.json
Output::
[96malpha/src/a.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/beta/b.ts' is not under 'rootDir' '/home/src/workspaces/project/alpha'. 'rootDir' is expected to contain all source files.

[7m1[0m import * as b from '../../beta/b'
[7m [0m [91m                   ~~~~~~~~~~~~~~[0m

[96malpha/src/a.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/beta/b.ts' is not listed within the file list of project '/home/src/workspaces/project/alpha/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import * as b from '../../beta/b'
[7m [0m [91m                   ~~~~~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: alpha/src/a.ts[90m:1[0m



//// [/home/src/workspaces/project/beta/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/beta/b.d.ts]
export {};


//// [/home/src/workspaces/project/alpha/bin/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/alpha/bin/src/a.d.ts]
export {};


//// [/home/src/workspaces/project/alpha/bin/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../../beta/b.ts","../src/a.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3360792065-export { }","signature":"-3531856636-export {};\n"},{"version":"-5654511483-import * as b from '../../beta/b'","signature":"-3531856636-export {};\n"}],"root":[3],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./src/a.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/alpha/bin/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../../beta/b.ts",
    "../src/a.ts"
  ],
  "fileIdsList": [
    [
      "../../beta/b.ts"
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
    "../../beta/b.ts": {
      "original": {
        "version": "-3360792065-export { }",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-3360792065-export { }",
      "signature": "-3531856636-export {};\n"
    },
    "../src/a.ts": {
      "original": {
        "version": "-5654511483-import * as b from '../../beta/b'",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-5654511483-import * as b from '../../beta/b'",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      3,
      "../src/a.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../src/a.ts": [
      "../../beta/b.ts"
    ]
  },
  "latestChangedDtsFile": "./src/a.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 928
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
