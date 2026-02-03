currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/a.ts]
const a = class { private p = 10; };

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../outFile.js",
    "incremental": true
  }
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


/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file '../outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...



//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","7752727223-const a = class { private p = 10; };"],"root":[2],"options":{"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "7752727223-const a = class { private p = 10; };"
  },
  "root": [
    [
      2,
      "./project/a.ts"
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
  "size": 659
}


Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "incremental": true,
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: Fix error

Input::
//// [/home/src/projects/project/a.ts]
const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../outFile.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...



//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","3528887741-const a = \"hello\";"],"root":[2],"options":{"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "3528887741-const a = \"hello\";"
  },
  "root": [
    [
      2,
      "./project/a.ts"
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
  "size": 643
}


Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "incremental": true,
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: Emit after fixing error

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that some of the changes were not emitted

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...



//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","3528887741-const a = \"hello\";"],"root":[2],"options":{"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "3528887741-const a = \"hello\";"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ]
  ],
  "options": {
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 623
}

//// [/home/src/projects/outFile.js]
var a = "hello";



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "incremental": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: Introduce error

Input::
//// [/home/src/projects/project/a.ts]
const a = class { private p = 10; };


/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../outFile.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...



//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","7752727223-const a = class { private p = 10; };"],"root":[2],"options":{"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "7752727223-const a = class { private p = 10; };"
  },
  "root": [
    [
      2,
      "./project/a.ts"
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
  "size": 659
}


Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "incremental": true,
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Emit when error

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that some of the changes were not emitted

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...



//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","7752727223-const a = class { private p = 10; };"],"root":[2],"options":{"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "7752727223-const a = class { private p = 10; };"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ]
  ],
  "options": {
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 639
}

//// [/home/src/projects/outFile.js]
var a = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "incremental": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success
