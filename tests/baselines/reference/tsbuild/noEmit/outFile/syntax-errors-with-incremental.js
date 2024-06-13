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
const a = "hello

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../outFile.js",
    "noEmit": true
  }
}



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                [0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts"
]
Program options: {
  "outFile": "/outFile.js",
  "noEmit": true,
  "incremental": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","2464268576-const a = \"hello"],"root":[2],"options":{"outFile":"./outFile.js"},"changeFileSet":[1,2],"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "2464268576-const a = \"hello"
  },
  "root": [
    [
      2,
      "./src/a.ts"
    ]
  ],
  "options": {
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "./lib/lib.d.ts",
    "./src/a.ts"
  ],
  "version": "FakeTSVersion",
  "size": 627
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'outFile.tsbuildinfo' indicates that some of the changes were not emitted

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                [0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts"
]
Program options: {
  "outFile": "/outFile.js",
  "noEmit": true,
  "incremental": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::




Change:: Fix error
Input::
//// [/src/a.ts]
const a = "hello"



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'outFile.tsbuildinfo' indicates that some of the changes were not emitted

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts"
]
Program options: {
  "outFile": "/outFile.js",
  "noEmit": true,
  "incremental": true,
  "tscBuild": true,
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


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","4011451714-const a = \"hello\""],"root":[2],"options":{"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "4011451714-const a = \"hello\""
  },
  "root": [
    [
      2,
      "./src/a.ts"
    ]
  ],
  "options": {
    "outFile": "./outFile.js"
  },
  "pendingEmit": [
    "Js",
    false
  ],
  "version": "FakeTSVersion",
  "size": 627
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'outFile.tsbuildinfo'

exitCode:: ExitStatus.Success


