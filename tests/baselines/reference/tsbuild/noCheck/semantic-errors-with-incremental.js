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

//// [/src/a.ts]
const err: number = "error";
const a: number = "hello"

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "noCheck": true,
    "emitDeclarationOnly": true,
    "declaration": true
  }
}



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts"
]
Program options: {
  "noCheck": true,
  "emitDeclarationOnly": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)


//// [/src/a.d.ts]
declare const err: number;
declare const a: number;


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"9312413704-const err: number = \"error\";\nconst a: number = \"hello\"","signature":"-22763377875-declare const err: number;\ndeclare const a: number;\n","affectsGlobalScope":true,"impliedFormat":1}],"root":[2],"options":{"declaration":true,"emitDeclarationOnly":true,"noCheck":true}},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./a.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
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
      "./a.ts": {
        "original": {
          "version": "9312413704-const err: number = \"error\";\nconst a: number = \"hello\"",
          "signature": "-22763377875-declare const err: number;\ndeclare const a: number;\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "9312413704-const err: number = \"error\";\nconst a: number = \"hello\"",
        "signature": "-22763377875-declare const err: number;\ndeclare const a: number;\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./a.ts"
      ]
    ],
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "noCheck": true
    }
  },
  "version": "FakeTSVersion",
  "size": 886
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: Fix `a` error
Input::
//// [/src/a.ts]
const err: number = "error";
const a = "hello"



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts"
]
Program options: {
  "noCheck": true,
  "emitDeclarationOnly": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/src/a.ts

Shape signatures in builder refreshed for::
/src/a.ts (computed .d.ts)


//// [/src/a.d.ts]
declare const err: number;
declare const a = "hello";


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"6909448549-const err: number = \"error\";\nconst a = \"hello\"","signature":"-22441876417-declare const err: number;\ndeclare const a = \"hello\";\n","affectsGlobalScope":true,"impliedFormat":1}],"root":[2],"options":{"declaration":true,"emitDeclarationOnly":true,"noCheck":true}},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./a.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
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
      "./a.ts": {
        "original": {
          "version": "6909448549-const err: number = \"error\";\nconst a = \"hello\"",
          "signature": "-22441876417-declare const err: number;\ndeclare const a = \"hello\";\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "6909448549-const err: number = \"error\";\nconst a = \"hello\"",
        "signature": "-22441876417-declare const err: number;\ndeclare const a = \"hello\";\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./a.ts"
      ]
    ],
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "noCheck": true
    }
  },
  "version": "FakeTSVersion",
  "size": 882
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: Disable noCheck
Input::
//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "emitDeclarationOnly": true,
    "declaration": true
  }
}



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const err: number = "error";
[7m [0m [91m      ~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts"
]
Program options: {
  "emitDeclarationOnly": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

No shapes updated in the builder::




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const err: number = "error";
[7m [0m [91m      ~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts"
]
Program options: {
  "emitDeclarationOnly": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

No shapes updated in the builder::


