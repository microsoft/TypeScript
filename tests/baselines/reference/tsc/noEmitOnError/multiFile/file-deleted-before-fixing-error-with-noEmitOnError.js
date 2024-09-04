currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "outDir",
    "noEmitOnError": true
  }
}

//// [/home/src/workspaces/project/file1.ts]
export const x: 30 = "hello";

//// [/home/src/workspaces/project/file2.ts]
export class D { }

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


/home/src/tslibs/TS/Lib/tsc.js -i
Output::
[96mfile1.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType '"hello"' is not assignable to type '30'.

[7m1[0m export const x: 30 = "hello";
[7m [0m [91m             ~[0m


Found 1 error in file1.ts[90m:1[0m



//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../file1.ts","../file2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-10927263693-export const x: 30 = \"hello\";","-7804761415-export class D { }"],"root":[2,3],"options":{"noEmitOnError":true,"outDir":"./"},"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type '\"hello\"' is not assignable to type '30'."}]]],"affectedFilesPendingEmit":[2,3],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../file1.ts",
    "../file2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../file1.ts": {
      "version": "-10927263693-export const x: 30 = \"hello\";",
      "signature": "-10927263693-export const x: 30 = \"hello\";"
    },
    "../file2.ts": {
      "version": "-7804761415-export class D { }",
      "signature": "-7804761415-export class D { }"
    }
  },
  "root": [
    [
      2,
      "../file1.ts"
    ],
    [
      3,
      "../file2.ts"
    ]
  ],
  "options": {
    "noEmitOnError": true,
    "outDir": "./"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../file1.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type '\"hello\"' is not assignable to type '30'."
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "../file1.ts",
      "Js"
    ],
    [
      "../file2.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 920
}


Program root files: [
  "/home/src/workspaces/project/file1.ts",
  "/home/src/workspaces/project/file2.ts"
]
Program options: {
  "outDir": "/home/src/workspaces/project/outDir",
  "noEmitOnError": true,
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/file1.ts
/home/src/workspaces/project/file2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/file1.ts
/home/src/workspaces/project/file2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/file1.ts (used version)
/home/src/workspaces/project/file2.ts (used version)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: delete file without error

Input::
//// [/home/src/workspaces/project/file2.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js -i
Output::
[96mfile1.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType '"hello"' is not assignable to type '30'.

[7m1[0m export const x: 30 = "hello";
[7m [0m [91m             ~[0m


Found 1 error in file1.ts[90m:1[0m



//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../file1.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-10927263693-export const x: 30 = \"hello\";"],"root":[2],"options":{"noEmitOnError":true,"outDir":"./"},"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type '\"hello\"' is not assignable to type '30'."}]]],"affectedFilesPendingEmit":[2],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../file1.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../file1.ts": {
      "version": "-10927263693-export const x: 30 = \"hello\";",
      "signature": "-10927263693-export const x: 30 = \"hello\";"
    }
  },
  "root": [
    [
      2,
      "../file1.ts"
    ]
  ],
  "options": {
    "noEmitOnError": true,
    "outDir": "./"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../file1.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type '\"hello\"' is not assignable to type '30'."
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "../file1.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 869
}


Program root files: [
  "/home/src/workspaces/project/file1.ts"
]
Program options: {
  "outDir": "/home/src/workspaces/project/outDir",
  "noEmitOnError": true,
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/file1.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
