currentDirectory:: /user/username/projects/myproject/projects useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/projects/project1/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "composite": true
  },
  "exclude": [
    "temp"
  ]
}

//// [/user/username/projects/myproject/projects/project1/class1.ts]
class class1 {}

//// [/user/username/projects/myproject/projects/project1/class1.d.ts]
declare class class1 {}

//// [/user/username/projects/myproject/projects/project2/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "composite": true
  },
  "references": [
    {
      "path": "../project1"
    }
  ]
}

//// [/user/username/projects/myproject/projects/project2/class2.ts]
class class2 {}

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


/home/src/tslibs/TS/Lib/tsc.js --w -p /user/username/projects/myproject/projects/project2/tsconfig.json --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject/projects CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/projects/project2/class2.ts"]
  options: {"module":0,"composite":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/projects/project2/tsconfig.json"}
  projectReferences: [{"path":"/user/username/projects/myproject/projects/project1","originalPath":"../project1"}]
Loading config file: /user/username/projects/myproject/projects/project1/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class1.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/class2.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Wild card directory
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/tsconfig.json 2000 undefined Config file of referened project
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project


//// [/user/username/projects/myproject/projects/project2/class2.js]
var class2 = /** @class */ (function () {
    function class2() {
    }
    return class2;
}());


//// [/user/username/projects/myproject/projects/project2/class2.d.ts]
declare class class2 {
}


//// [/user/username/projects/myproject/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../project1/class1.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"777933178-class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[3],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../project1/class1.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.ts": {
      "original": {
        "version": "777933178-class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "777933178-class class1 {}",
      "signature": "777933178-class class1 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
  "size": 900
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/projects/project1/class1.ts: *new*
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/projects/project2/class2.ts: *new*
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1: *new*
  {}
/user/username/projects/myproject/projects/project2: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/projects/project2/class2.ts"
]
Program options: {
  "module": 0,
  "composite": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/projects/project2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/projects/project1/class1.ts
/user/username/projects/myproject/projects/project2/class2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/projects/project1/class1.ts
/user/username/projects/myproject/projects/project2/class2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/projects/project1/class1.ts (used version)
/user/username/projects/myproject/projects/project2/class2.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Add class3 to project1

Input::
//// [/user/username/projects/myproject/projects/project1/class3.ts]
class class3 {}


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
Loading config file: /user/username/projects/myproject/projects/project1/tsconfig.json
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/projects/project2/class2.ts"]
  options: {"module":0,"composite":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/projects/project2/tsconfig.json"}
  projectReferences: [{"path":"/user/username/projects/myproject/projects/project1","originalPath":"../project1"}]
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.ts 250 undefined Source file
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/projects/project2/class2.js] file written with same contents
//// [/user/username/projects/myproject/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../project1/class1.ts","../project1/class3.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"777933178-class class1 {}","signature":"-2723220098-declare class class1 {\n}\n","affectsGlobalScope":true},{"version":"778005052-class class3 {}","signature":"-2644949312-declare class class3 {\n}\n","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[4],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../project1/class1.ts",
    "../project1/class3.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.ts": {
      "original": {
        "version": "777933178-class class1 {}",
        "signature": "-2723220098-declare class class1 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777933178-class class1 {}",
      "signature": "-2723220098-declare class class1 {\n}\n",
      "affectsGlobalScope": true
    },
    "../project1/class3.ts": {
      "original": {
        "version": "778005052-class class3 {}",
        "signature": "-2644949312-declare class class3 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "778005052-class class3 {}",
      "signature": "-2644949312-declare class class3 {\n}\n",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      4,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
  "size": 1098
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class1.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts: *new*
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project2/class2.ts:
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1:
  {}
/user/username/projects/myproject/projects/project2:
  {}


Program root files: [
  "/user/username/projects/myproject/projects/project2/class2.ts"
]
Program options: {
  "module": 0,
  "composite": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/projects/project2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/projects/project1/class1.ts
/user/username/projects/myproject/projects/project1/class3.ts
/user/username/projects/myproject/projects/project2/class2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/projects/project1/class1.ts
/user/username/projects/myproject/projects/project1/class3.ts
/user/username/projects/myproject/projects/project2/class2.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/projects/project1/class3.ts (computed .d.ts)
/user/username/projects/myproject/projects/project1/class1.ts (computed .d.ts)
/user/username/projects/myproject/projects/project2/class2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Add excluded file to project1

Input::
//// [/user/username/projects/myproject/projects/project1/temp/file.d.ts]
declare class file {}


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project
Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project
Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp/file.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project



exitCode:: ExitStatus.undefined

Change:: Add output of class3

Input::
//// [/user/username/projects/myproject/projects/project1/class3.d.ts]
declare class class3 {}


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project
Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Wild card directory of referenced project



exitCode:: ExitStatus.undefined
