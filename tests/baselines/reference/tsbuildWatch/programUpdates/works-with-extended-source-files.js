currentDirectory:: /user/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/project/alpha.tsconfig.json]
{}

//// [/user/username/projects/project/project1.tsconfig.json]
{
  "extends": "./alpha.tsconfig.json",
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "/user/username/projects/project/commonFile1.ts",
    "/user/username/projects/project/commonFile2.ts"
  ]
}

//// [/user/username/projects/project/commonFile1.ts]
let x = 1

//// [/user/username/projects/project/commonFile2.ts]
let y = 1

//// [/user/username/projects/project/bravo.tsconfig.json]
{
  "extends": "./alpha.tsconfig.json"
}

//// [/user/username/projects/project/project2.tsconfig.json]
{
  "extends": "./bravo.tsconfig.json",
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "/user/username/projects/project/other.ts"
  ]
}

//// [/user/username/projects/project/other.ts]
let z = 0;

//// [/user/username/projects/project/other2.ts]
let k = 0;

//// [/user/username/projects/project/extendsConfig1.tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/user/username/projects/project/extendsConfig2.tsconfig.json]
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}

//// [/user/username/projects/project/extendsConfig3.tsconfig.json]
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}

//// [/user/username/projects/project/project3.tsconfig.json]
{
  "extends": [
    "./extendsConfig1.tsconfig.json",
    "./extendsConfig2.tsconfig.json",
    "./extendsConfig3.tsconfig.json"
  ],
  "compilerOptions": {
    "composite": false
  },
  "files": [
    "/user/username/projects/project/other2.ts"
  ]
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


/home/src/tslibs/TS/Lib/tsc.js -b -w -v project1.tsconfig.json project2.tsconfig.json project3.tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1.tsconfig.json' is out of date because output file 'project1.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project1.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output file 'project2.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project3.tsconfig.json' is out of date because output file 'project3.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project3.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/commonFile1.js]
var x = 1;


//// [/user/username/projects/project/commonFile1.d.ts]
declare let x: number;


//// [/user/username/projects/project/commonFile2.js]
var y = 1;


//// [/user/username/projects/project/commonFile2.d.ts]
declare let y: number;


//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./commonfile1.ts","./commonfile2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2167136208-let x = 1","signature":"2842409786-declare let x: number;\n","affectsGlobalScope":true},{"version":"2168322129-let y = 1","signature":"784887931-declare let y: number;\n","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true},"latestChangedDtsFile":"./commonFile2.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./commonfile1.ts",
    "./commonfile2.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./commonfile1.ts": {
      "original": {
        "version": "2167136208-let x = 1",
        "signature": "2842409786-declare let x: number;\n",
        "affectsGlobalScope": true
      },
      "version": "2167136208-let x = 1",
      "signature": "2842409786-declare let x: number;\n",
      "affectsGlobalScope": true
    },
    "./commonfile2.ts": {
      "original": {
        "version": "2168322129-let y = 1",
        "signature": "784887931-declare let y: number;\n",
        "affectsGlobalScope": true
      },
      "version": "2168322129-let y = 1",
      "signature": "784887931-declare let y: number;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./commonfile1.ts"
    ],
    [
      3,
      "./commonfile2.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./commonFile2.d.ts",
  "version": "FakeTSVersion",
  "size": 925
}

//// [/user/username/projects/project/other.js]
var z = 0;


//// [/user/username/projects/project/other.d.ts]
declare let z: number;


//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2874288940-let z = 0;","signature":"-1272633924-declare let z: number;\n","affectsGlobalScope":true}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./other.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./other.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./other.ts": {
      "original": {
        "version": "2874288940-let z = 0;",
        "signature": "-1272633924-declare let z: number;\n",
        "affectsGlobalScope": true
      },
      "version": "2874288940-let z = 0;",
      "signature": "-1272633924-declare let z: number;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./other.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./other.d.ts",
  "version": "FakeTSVersion",
  "size": 784
}

//// [/user/username/projects/project/other2.js]
var k = 0;


//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo]
{"root":["./other2.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./other2.ts"
  ],
  "version": "FakeTSVersion",
  "size": 50
}


FsWatches::
/user/username/projects/project/alpha.tsconfig.json: *new*
  {}
/user/username/projects/project/bravo.tsconfig.json: *new*
  {}
/user/username/projects/project/commonFile1.ts: *new*
  {}
/user/username/projects/project/commonFile2.ts: *new*
  {}
/user/username/projects/project/extendsConfig1.tsconfig.json: *new*
  {}
/user/username/projects/project/extendsConfig2.tsconfig.json: *new*
  {}
/user/username/projects/project/extendsConfig3.tsconfig.json: *new*
  {}
/user/username/projects/project/other.ts: *new*
  {}
/user/username/projects/project/other2.ts: *new*
  {}
/user/username/projects/project/project1.tsconfig.json: *new*
  {}
/user/username/projects/project/project2.tsconfig.json: *new*
  {}
/user/username/projects/project/project3.tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/projects/project/commonFile1.ts",
  "/user/username/projects/project/commonFile2.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project1.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/project/commonfile1.ts (computed .d.ts during emit)
/user/username/projects/project/commonfile2.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/project/other.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/project/other.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/project/other2.ts"
]
Program options: {
  "composite": false,
  "strictNullChecks": false,
  "noImplicitAny": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project3.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/project/other2.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify alpha config

Input::
//// [/user/username/projects/project/alpha.tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'project1.tsconfig.json' is out of date because output 'project1.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project1.tsconfig.json'...



//// [/user/username/projects/project/commonFile1.js]
"use strict";
var x = 1;


//// [/user/username/projects/project/commonFile2.js]
"use strict";
var y = 1;


//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./commonfile1.ts","./commonfile2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2167136208-let x = 1","signature":"2842409786-declare let x: number;\n","affectsGlobalScope":true},{"version":"2168322129-let y = 1","signature":"784887931-declare let y: number;\n","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true,"strict":true},"latestChangedDtsFile":"./commonFile2.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./commonfile1.ts",
    "./commonfile2.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./commonfile1.ts": {
      "original": {
        "version": "2167136208-let x = 1",
        "signature": "2842409786-declare let x: number;\n",
        "affectsGlobalScope": true
      },
      "version": "2167136208-let x = 1",
      "signature": "2842409786-declare let x: number;\n",
      "affectsGlobalScope": true
    },
    "./commonfile2.ts": {
      "original": {
        "version": "2168322129-let y = 1",
        "signature": "784887931-declare let y: number;\n",
        "affectsGlobalScope": true
      },
      "version": "2168322129-let y = 1",
      "signature": "784887931-declare let y: number;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./commonfile1.ts"
    ],
    [
      3,
      "./commonfile2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "strict": true
  },
  "latestChangedDtsFile": "./commonFile2.d.ts",
  "version": "FakeTSVersion",
  "size": 939
}


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/project/commonFile1.ts",
  "/user/username/projects/project/commonFile2.ts"
]
Program options: {
  "strict": true,
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project1.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Build project 2

Input::

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output 'project2.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/other.js]
"use strict";
var z = 0;


//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2874288940-let z = 0;","signature":"-1272633924-declare let z: number;\n","affectsGlobalScope":true}],"root":[2],"options":{"composite":true,"strict":true},"latestChangedDtsFile":"./other.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./other.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./other.ts": {
      "original": {
        "version": "2874288940-let z = 0;",
        "signature": "-1272633924-declare let z: number;\n",
        "affectsGlobalScope": true
      },
      "version": "2874288940-let z = 0;",
      "signature": "-1272633924-declare let z: number;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "strict": true
  },
  "latestChangedDtsFile": "./other.d.ts",
  "version": "FakeTSVersion",
  "size": 798
}



Program root files: [
  "/user/username/projects/project/other.ts"
]
Program options: {
  "strict": true,
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: change bravo config

Input::
//// [/user/username/projects/project/bravo.tsconfig.json]
{
  "extends": "./alpha.tsconfig.json",
  "compilerOptions": {
    "strict": false
  }
}


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output 'project2.tsconfig.tsbuildinfo' is older than input 'bravo.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/other.js]
var z = 0;


//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2874288940-let z = 0;","signature":"-1272633924-declare let z: number;\n","affectsGlobalScope":true}],"root":[2],"options":{"composite":true,"strict":false},"latestChangedDtsFile":"./other.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./other.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./other.ts": {
      "original": {
        "version": "2874288940-let z = 0;",
        "signature": "-1272633924-declare let z: number;\n",
        "affectsGlobalScope": true
      },
      "version": "2874288940-let z = 0;",
      "signature": "-1272633924-declare let z: number;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "strict": false
  },
  "latestChangedDtsFile": "./other.d.ts",
  "version": "FakeTSVersion",
  "size": 799
}



Program root files: [
  "/user/username/projects/project/other.ts"
]
Program options: {
  "strict": false,
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: project 2 extends alpha

Input::
//// [/user/username/projects/project/project2.tsconfig.json]
{
  "extends": "./alpha.tsconfig.json"
}


Timeout callback:: count: 1
5: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
5: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output 'other2.js' is older than input 'project2.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/commonFile1.js] file written with same contents
//// [/user/username/projects/project/commonFile2.js] file written with same contents
//// [/user/username/projects/project/other.js]
"use strict";
var z = 0;


//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo]
{"root":["./commonfile1.ts","./commonfile2.ts","./other.ts","./other2.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./commonfile1.ts",
    "./commonfile2.ts",
    "./other.ts",
    "./other2.ts"
  ],
  "version": "FakeTSVersion",
  "size": 101
}

//// [/user/username/projects/project/other2.js]
"use strict";
var k = 0;



FsWatches::
/user/username/projects/project/alpha.tsconfig.json:
  {}
/user/username/projects/project/commonFile1.ts:
  {}
/user/username/projects/project/commonFile2.ts:
  {}
/user/username/projects/project/extendsConfig1.tsconfig.json:
  {}
/user/username/projects/project/extendsConfig2.tsconfig.json:
  {}
/user/username/projects/project/extendsConfig3.tsconfig.json:
  {}
/user/username/projects/project/other.ts:
  {}
/user/username/projects/project/other2.ts:
  {}
/user/username/projects/project/project1.tsconfig.json:
  {}
/user/username/projects/project/project2.tsconfig.json:
  {}
/user/username/projects/project/project3.tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/project/bravo.tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project: *new*
  {}


Program root files: [
  "/user/username/projects/project/commonFile1.ts",
  "/user/username/projects/project/commonFile2.ts",
  "/user/username/projects/project/other.ts",
  "/user/username/projects/project/other2.ts"
]
Program options: {
  "strict": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts
/user/username/projects/project/other.ts
/user/username/projects/project/other2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts
/user/username/projects/project/other.ts
/user/username/projects/project/other2.ts

Shape signatures in builder refreshed for::
/user/username/projects/project/commonfile1.ts (computed .d.ts)
/user/username/projects/project/commonfile2.ts (computed .d.ts)
/user/username/projects/project/other.ts (computed .d.ts)
/user/username/projects/project/other2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: update aplha config

Input::
//// [/user/username/projects/project/alpha.tsconfig.json]
{}


Timeout callback:: count: 1
7: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
7: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'project1.tsconfig.json' is out of date because output 'project1.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project1.tsconfig.json'...



//// [/user/username/projects/project/commonFile1.js]
var x = 1;


//// [/user/username/projects/project/commonFile2.js]
var y = 1;


//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./commonfile1.ts","./commonfile2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2167136208-let x = 1","signature":"2842409786-declare let x: number;\n","affectsGlobalScope":true},{"version":"2168322129-let y = 1","signature":"784887931-declare let y: number;\n","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true},"latestChangedDtsFile":"./commonFile2.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./commonfile1.ts",
    "./commonfile2.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./commonfile1.ts": {
      "original": {
        "version": "2167136208-let x = 1",
        "signature": "2842409786-declare let x: number;\n",
        "affectsGlobalScope": true
      },
      "version": "2167136208-let x = 1",
      "signature": "2842409786-declare let x: number;\n",
      "affectsGlobalScope": true
    },
    "./commonfile2.ts": {
      "original": {
        "version": "2168322129-let y = 1",
        "signature": "784887931-declare let y: number;\n",
        "affectsGlobalScope": true
      },
      "version": "2168322129-let y = 1",
      "signature": "784887931-declare let y: number;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./commonfile1.ts"
    ],
    [
      3,
      "./commonfile2.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./commonFile2.d.ts",
  "version": "FakeTSVersion",
  "size": 925
}


Timeout callback:: count: 1
8: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/project/commonFile1.ts",
  "/user/username/projects/project/commonFile2.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project1.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Build project 2

Input::

Before running Timeout callback:: count: 1
8: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output 'project2.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/commonFile1.js] file written with same contents
//// [/user/username/projects/project/commonFile2.js] file written with same contents
//// [/user/username/projects/project/other.js]
var z = 0;


//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/user/username/projects/project/other2.js]
var k = 0;




Program root files: [
  "/user/username/projects/project/commonFile1.ts",
  "/user/username/projects/project/commonFile2.ts",
  "/user/username/projects/project/other.ts",
  "/user/username/projects/project/other2.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts
/user/username/projects/project/other.ts
/user/username/projects/project/other2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts
/user/username/projects/project/other.ts
/user/username/projects/project/other2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Modify extendsConfigFile2

Input::
//// [/user/username/projects/project/extendsConfig2.tsconfig.json]
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}


Timeout callback:: count: 1
9: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
9: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'project3.tsconfig.json' is out of date because output 'project3.tsconfig.tsbuildinfo' is older than input 'extendsConfig2.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project3.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/project/project3.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/other2.js] file changed its modified time
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents


Program root files: [
  "/user/username/projects/project/other2.ts"
]
Program options: {
  "composite": false,
  "strictNullChecks": true,
  "noImplicitAny": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project3.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Modify project 3

Input::
//// [/user/username/projects/project/project3.tsconfig.json]
{
  "extends": [
    "./extendsConfig1.tsconfig.json",
    "./extendsConfig2.tsconfig.json"
  ],
  "compilerOptions": {
    "composite": false
  },
  "files": [
    "/user/username/projects/project/other2.ts"
  ]
}


Timeout callback:: count: 1
10: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
10: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'project3.tsconfig.json' is out of date because output 'project3.tsconfig.tsbuildinfo' is older than input 'project3.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/project/project3.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/project/project3.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/other2.js] file changed its modified time
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

FsWatches::
/user/username/projects/project/alpha.tsconfig.json:
  {}
/user/username/projects/project/commonFile1.ts:
  {}
/user/username/projects/project/commonFile2.ts:
  {}
/user/username/projects/project/extendsConfig1.tsconfig.json:
  {}
/user/username/projects/project/extendsConfig2.tsconfig.json:
  {}
/user/username/projects/project/other.ts:
  {}
/user/username/projects/project/other2.ts:
  {}
/user/username/projects/project/project1.tsconfig.json:
  {}
/user/username/projects/project/project2.tsconfig.json:
  {}
/user/username/projects/project/project3.tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/project/extendsConfig3.tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project:
  {}


Program root files: [
  "/user/username/projects/project/other2.ts"
]
Program options: {
  "composite": false,
  "strictNullChecks": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/project/project3.tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/other2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Delete extendedConfigFile2 and report error

Input::
//// [/user/username/projects/project/extendsConfig2.tsconfig.json] deleted

Timeout callback:: count: 1
11: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
11: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'project3.tsconfig.json' is up to date because newest input 'other2.ts' is older than output 'project3.tsconfig.tsbuildinfo'

[91merror[0m[90m TS5083: [0mCannot read file '/user/username/projects/project/extendsConfig2.tsconfig.json'.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





exitCode:: ExitStatus.undefined
