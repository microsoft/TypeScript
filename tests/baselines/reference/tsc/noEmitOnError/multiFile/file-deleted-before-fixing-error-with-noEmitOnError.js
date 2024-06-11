currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/src/project/file1.ts]
export const x: 30 = "hello";

//// [/src/project/file2.ts]
export class D { }

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "outDir",
    "noEmitOnError": true
  }
}



Output::
/lib/tsc --p /src/project -i
[96msrc/project/file1.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType '"hello"' is not assignable to type '30'.

[7m1[0m export const x: 30 = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/project/file1.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/project/file1.ts",
  "/src/project/file2.ts"
]
Program options: {
  "outDir": "/src/project/outDir",
  "noEmitOnError": true,
  "project": "/src/project",
  "incremental": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/file1.ts
/src/project/file2.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project/file1.ts
/src/project/file2.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/project/file1.ts (used version)
/src/project/file2.ts (used version)


//// [/src/project/outDir/tsconfig.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","../file1.ts","../file2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10927263693-export const x: 30 = \"hello\";","impliedFormat":1},{"version":"-7804761415-export class D { }","impliedFormat":1}],"root":[2,3],"options":{"noEmitOnError":true,"outDir":"./"},"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type '\"hello\"' is not assignable to type '30'."}]]],"affectedFilesPendingEmit":[2,3],"version":"FakeTSVersion"}

//// [/src/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "../file1.ts",
    "../file2.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../file1.ts": {
      "original": {
        "version": "-10927263693-export const x: 30 = \"hello\";",
        "impliedFormat": 1
      },
      "version": "-10927263693-export const x: 30 = \"hello\";",
      "signature": "-10927263693-export const x: 30 = \"hello\";",
      "impliedFormat": "commonjs"
    },
    "../file2.ts": {
      "original": {
        "version": "-7804761415-export class D { }",
        "impliedFormat": 1
      },
      "version": "-7804761415-export class D { }",
      "signature": "-7804761415-export class D { }",
      "impliedFormat": "commonjs"
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
  "size": 988
}



Change:: delete file without error
Input::
//// [/src/project/file2.ts] unlink


Output::
/lib/tsc --p /src/project -i
[96msrc/project/file1.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType '"hello"' is not assignable to type '30'.

[7m1[0m export const x: 30 = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/project/file1.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/project/file1.ts"
]
Program options: {
  "outDir": "/src/project/outDir",
  "noEmitOnError": true,
  "project": "/src/project",
  "incremental": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/file1.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/src/project/outDir/tsconfig.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","../file1.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10927263693-export const x: 30 = \"hello\";","impliedFormat":1}],"root":[2],"options":{"noEmitOnError":true,"outDir":"./"},"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type '\"hello\"' is not assignable to type '30'."}]]],"affectedFilesPendingEmit":[2],"version":"FakeTSVersion"}

//// [/src/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "../file1.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../file1.ts": {
      "original": {
        "version": "-10927263693-export const x: 30 = \"hello\";",
        "impliedFormat": 1
      },
      "version": "-10927263693-export const x: 30 = \"hello\";",
      "signature": "-10927263693-export const x: 30 = \"hello\";",
      "impliedFormat": "commonjs"
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
  "size": 907
}

