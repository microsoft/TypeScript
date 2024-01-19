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
const a: number = "hello"

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "noEmit": true
  }
}



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:08 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:09 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90m12:00:10 AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts"
]
Program options: {
  "noEmit": true,
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
/src/a.ts (used version)


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1311033573-const a: number = \"hello\"","affectsGlobalScope":true}],"root":[2],"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[2,[{"file":"./a.ts","start":6,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"affectedFilesPendingEmit":[2]},"version":"FakeTSVersion"}

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
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "original": {
          "version": "1311033573-const a: number = \"hello\"",
          "affectsGlobalScope": true
        },
        "version": "1311033573-const a: number = \"hello\"",
        "signature": "1311033573-const a: number = \"hello\"",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./a.ts"
      ]
    ],
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      [
        "./a.ts",
        [
          {
            "file": "./a.ts",
            "start": 6,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type 'string' is not assignable to type 'number'."
          }
        ]
      ]
    ],
    "affectedFilesPendingEmit": [
      [
        "./a.ts",
        "Js"
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 906
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:14 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:15 AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that some of the changes were not emitted

[[90m12:00:16 AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts"
]
Program options: {
  "noEmit": true,
  "incremental": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Fix error
Input::
//// [/src/a.ts]
const a = "hello"



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:18 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:19 AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that some of the changes were not emitted

[[90m12:00:20 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts"
]
Program options: {
  "noEmit": true,
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
/src/a.ts (computed .d.ts)


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"4011451714-const a = \"hello\"","signature":"-5460434953-declare const a = \"hello\";\n","affectsGlobalScope":true}],"root":[2],"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"affectedFilesPendingEmit":[2]},"version":"FakeTSVersion"}

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
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "original": {
          "version": "4011451714-const a = \"hello\"",
          "signature": "-5460434953-declare const a = \"hello\";\n",
          "affectsGlobalScope": true
        },
        "version": "4011451714-const a = \"hello\"",
        "signature": "-5460434953-declare const a = \"hello\";\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./a.ts"
      ]
    ],
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./a.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./a.ts",
        "Js"
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 821
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:24 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:25 AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success


