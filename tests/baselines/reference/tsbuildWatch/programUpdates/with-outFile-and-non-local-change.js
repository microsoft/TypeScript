currentDirectory:: /user/username/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspaces/solution/sample1/core/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outFile": "index.js"
  }
}

//// [/user/username/workspaces/solution/sample1/core/index.ts]
function foo() { return 10; }

//// [/user/username/workspaces/solution/sample1/logic/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outFile": "index.js"
  },
  "references": [
    {
      "path": "../core"
    }
  ]
}

//// [/user/username/workspaces/solution/sample1/logic/index.ts]
function bar() { return foo() + 1 };

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


/home/src/tslibs/TS/Lib/tsc.js -b -w sample1/logic
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspaces/solution/sample1/core/index.js]
function foo() { return 10; }


//// [/user/username/workspaces/solution/sample1/core/index.d.ts]
declare function foo(): number;


//// [/user/username/workspaces/solution/sample1/core/index.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5450201652-function foo() { return 10; }"],"root":[2],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"517738360-declare function foo(): number;\n","latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/workspaces/solution/sample1/core/index.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./index.ts": "5450201652-function foo() { return 10; }"
  },
  "root": [
    [
      2,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "outFile": "./index.js"
  },
  "outSignature": "517738360-declare function foo(): number;\n",
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 785
}

//// [/user/username/workspaces/solution/sample1/logic/index.js]
function bar() { return foo() + 1; }
;


//// [/user/username/workspaces/solution/sample1/logic/index.d.ts]
declare function bar(): number;


//// [/user/username/workspaces/solution/sample1/logic/index.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../core/index.d.ts","./index.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","517738360-declare function foo(): number;\n","5542925109-function bar() { return foo() + 1 };"],"root":[3],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"1113083433-declare function bar(): number;\n","latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/workspaces/solution/sample1/logic/index.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../core/index.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../core/index.d.ts": "517738360-declare function foo(): number;\n",
    "./index.ts": "5542925109-function bar() { return foo() + 1 };"
  },
  "root": [
    [
      3,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "outFile": "./index.js"
  },
  "outSignature": "1113083433-declare function bar(): number;\n",
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 860
}


FsWatches::
/user/username/workspaces/solution/sample1/core/index.ts: *new*
  {}
/user/username/workspaces/solution/sample1/core/tsconfig.json: *new*
  {}
/user/username/workspaces/solution/sample1/logic/index.ts: *new*
  {}
/user/username/workspaces/solution/sample1/logic/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspaces/solution/sample1/core: *new*
  {}
/user/username/workspaces/solution/sample1/logic: *new*
  {}

Program root files: [
  "/user/username/workspaces/solution/sample1/core/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/workspaces/solution/sample1/core/index.js",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/workspaces/solution/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.ts

No shapes updated in the builder::

Program root files: [
  "/user/username/workspaces/solution/sample1/logic/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/workspaces/solution/sample1/logic/index.js",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/workspaces/solution/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.d.ts
/user/username/workspaces/solution/sample1/logic/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.d.ts
/user/username/workspaces/solution/sample1/logic/index.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Make non local change and build core

Input::
//// [/user/username/workspaces/solution/sample1/core/index.ts]
function foo() { return 10; }
function myFunc() { return 10; }


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...



//// [/user/username/workspaces/solution/sample1/core/index.js]
function foo() { return 10; }
function myFunc() { return 10; }


//// [/user/username/workspaces/solution/sample1/core/index.d.ts]
declare function foo(): number;
declare function myFunc(): number;


//// [/user/username/workspaces/solution/sample1/core/index.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-3957203077-function foo() { return 10; }\nfunction myFunc() { return 10; }"],"root":[2],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n","latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/workspaces/solution/sample1/core/index.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./index.ts": "-3957203077-function foo() { return 10; }\nfunction myFunc() { return 10; }"
  },
  "root": [
    [
      2,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "outFile": "./index.js"
  },
  "outSignature": "2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n",
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 857
}


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/workspaces/solution/sample1/core/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/workspaces/solution/sample1/core/index.js",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/workspaces/solution/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Build logic

Input::

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspaces/solution/sample1/logic/index.js] file written with same contents
//// [/user/username/workspaces/solution/sample1/logic/index.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../core/index.d.ts","./index.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n","5542925109-function bar() { return foo() + 1 };"],"root":[3],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"1113083433-declare function bar(): number;\n","latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/workspaces/solution/sample1/logic/index.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../core/index.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../core/index.d.ts": "2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n",
    "./index.ts": "5542925109-function bar() { return foo() + 1 };"
  },
  "root": [
    [
      3,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "outFile": "./index.js"
  },
  "outSignature": "1113083433-declare function bar(): number;\n",
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 897
}



Program root files: [
  "/user/username/workspaces/solution/sample1/logic/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/workspaces/solution/sample1/logic/index.js",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/workspaces/solution/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.d.ts
/user/username/workspaces/solution/sample1/logic/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.d.ts
/user/username/workspaces/solution/sample1/logic/index.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Make local change and build core

Input::
//// [/user/username/workspaces/solution/sample1/core/index.ts]
function foo() { return 10; }
function myFunc() { return 100; }


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspaces/solution/sample1/core/index.js]
function foo() { return 10; }
function myFunc() { return 100; }


//// [/user/username/workspaces/solution/sample1/core/index.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6034018805-function foo() { return 10; }\nfunction myFunc() { return 100; }"],"root":[2],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n","latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/workspaces/solution/sample1/core/index.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./index.ts": "-6034018805-function foo() { return 10; }\nfunction myFunc() { return 100; }"
  },
  "root": [
    [
      2,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "outFile": "./index.js"
  },
  "outSignature": "2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n",
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 858
}

//// [/user/username/workspaces/solution/sample1/logic/index.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/workspaces/solution/sample1/core/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/workspaces/solution/sample1/core/index.js",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/workspaces/solution/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspaces/solution/sample1/core/index.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Build logic

Input::

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined
