currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/typings/xterm.d.ts]
export const typing = 10;

//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;

//// [/user/username/projects/myproject/pkg0/tsconfig.json]
{
  "complerOptions": {
    "composite": true
  },
  "include": [
    "**/*.ts",
    "../typings/xterm.d.ts"
  ]
}

//// [/user/username/projects/myproject/pkg1/index.ts]
export const pkg1 = 1;

//// [/user/username/projects/myproject/pkg1/tsconfig.json]
{
  "complerOptions": {
    "composite": true
  },
  "include": [
    "**/*.ts",
    "../typings/xterm.d.ts"
  ]
}

//// [/user/username/projects/myproject/pkg2/index.ts]
export const pkg2 = 2;

//// [/user/username/projects/myproject/pkg2/tsconfig.json]
{
  "complerOptions": {
    "composite": true
  },
  "include": [
    "**/*.ts",
    "../typings/xterm.d.ts"
  ]
}

//// [/user/username/projects/myproject/pkg3/index.ts]
export const pkg3 = 3;

//// [/user/username/projects/myproject/pkg3/tsconfig.json]
{
  "complerOptions": {
    "composite": true
  },
  "include": [
    "**/*.ts",
    "../typings/xterm.d.ts"
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

//// [/user/username/projects/myproject/tsconfig.json]
{
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./pkg0"
    },
    {
      "path": "./pkg1"
    },
    {
      "path": "./pkg2"
    },
    {
      "path": "./pkg3"
    }
  ]
}


/home/src/tslibs/TS/Lib/tsc.js --b --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * pkg3/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output file 'pkg0/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is out of date because output file 'pkg1/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is out of date because output file 'pkg2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg3/tsconfig.json' is out of date because output file 'pkg3/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg0 = void 0;
exports.pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"root":["./index.ts","../typings/xterm.d.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts",
    "../typings/xterm.d.ts"
  ],
  "version": "FakeTSVersion",
  "size": 73
}

//// [/user/username/projects/myproject/pkg1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg1 = void 0;
exports.pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo]
{"root":["./index.ts","../typings/xterm.d.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts",
    "../typings/xterm.d.ts"
  ],
  "version": "FakeTSVersion",
  "size": 73
}

//// [/user/username/projects/myproject/pkg2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg2 = void 0;
exports.pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo]
{"root":["./index.ts","../typings/xterm.d.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts",
    "../typings/xterm.d.ts"
  ],
  "version": "FakeTSVersion",
  "size": 73
}

//// [/user/username/projects/myproject/pkg3/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg3 = void 0;
exports.pkg3 = 3;


//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo]
{"root":["./index.ts","../typings/xterm.d.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts",
    "../typings/xterm.d.ts"
  ],
  "version": "FakeTSVersion",
  "size": 73
}


FsWatches::
/user/username/projects/myproject/pkg0/index.ts: *new*
  {}
/user/username/projects/myproject/pkg0/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg1/index.ts: *new*
  {}
/user/username/projects/myproject/pkg1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg2/index.ts: *new*
  {}
/user/username/projects/myproject/pkg2/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg3/index.ts: *new*
  {}
/user/username/projects/myproject/pkg3/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/typings/xterm.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/pkg0: *new*
  {}
/user/username/projects/myproject/pkg1: *new*
  {}
/user/username/projects/myproject/pkg2: *new*
  {}
/user/username/projects/myproject/pkg3: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg0/index.ts (used version)
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg1/index.ts (used version)
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg2/index.ts (used version)
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: [
  "/user/username/projects/myproject/pkg3/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg3/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg3/index.ts (used version)
/user/username/projects/myproject/typings/xterm.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: modify typing file

Input::
//// [/user/username/projects/myproject/typings/xterm.d.ts]
export const typing = 10;export const typing1 = 10;


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'typings/xterm.d.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg0/tsconfig.json'...



//// [/user/username/projects/myproject/pkg0/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Timeout callback:: count: 1
5: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
5: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is out of date because output 'pkg1/tsconfig.tsbuildinfo' is older than input 'typings/xterm.d.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is out of date because output 'pkg2/tsconfig.tsbuildinfo' is older than input 'typings/xterm.d.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg3/tsconfig.json' is out of date because output 'pkg3/tsconfig.tsbuildinfo' is older than input 'typings/xterm.d.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: [
  "/user/username/projects/myproject/pkg3/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg3/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change pkg references

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./pkg0"
    },
    {
      "path": "./pkg1"
    },
    {
      "path": "./pkg2"
    }
  ]
}


Timeout callback:: count: 1
6: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
6: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




FsWatches::
/user/username/projects/myproject/pkg0/index.ts:
  {}
/user/username/projects/myproject/pkg0/tsconfig.json:
  {}
/user/username/projects/myproject/pkg1/index.ts:
  {}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {}
/user/username/projects/myproject/pkg2/index.ts:
  {}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/typings/xterm.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/pkg3/index.ts:
  {}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {}
/user/username/projects/myproject/pkg1:
  {}
/user/username/projects/myproject/pkg2:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/pkg3:
  {}


exitCode:: ExitStatus.undefined

Change:: modify typing file

Input::
//// [/user/username/projects/myproject/typings/xterm.d.ts]
export const typing = 10;


Timeout callback:: count: 1
9: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
9: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'typings/xterm.d.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg0/tsconfig.json'...



//// [/user/username/projects/myproject/pkg0/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Timeout callback:: count: 1
10: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
10: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is out of date because output 'pkg1/tsconfig.tsbuildinfo' is older than input 'typings/xterm.d.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is out of date because output 'pkg2/tsconfig.tsbuildinfo' is older than input 'typings/xterm.d.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts",
  "/user/username/projects/myproject/typings/xterm.d.ts"
]
Program options: {
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change pkg references to remove all watches

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "files": [],
  "include": [],
  "references": []
}


Timeout callback:: count: 1
11: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
11: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m2[0m:[93m12[0m - [91merror[0m[90m TS18002: [0mThe 'files' list in config file '/user/username/projects/myproject/tsconfig.json' is empty.

[7m2[0m   "files": [],
[7m [0m [91m           ~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.




FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/pkg0/index.ts:
  {}
/user/username/projects/myproject/pkg0/tsconfig.json:
  {}
/user/username/projects/myproject/pkg1/index.ts:
  {}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {}
/user/username/projects/myproject/pkg2/index.ts:
  {}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {}
/user/username/projects/myproject/typings/xterm.d.ts:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/pkg0:
  {}
/user/username/projects/myproject/pkg1:
  {}
/user/username/projects/myproject/pkg2:
  {}


exitCode:: ExitStatus.undefined

Change:: modify typing file

Input::
//// [/user/username/projects/myproject/typings/xterm.d.ts]
export const typing = 10;export const typing1 = 10;



exitCode:: ExitStatus.undefined
