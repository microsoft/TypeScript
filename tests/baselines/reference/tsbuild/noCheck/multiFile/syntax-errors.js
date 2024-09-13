currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello

//// [/home/src/workspaces/project/b.ts]
export const b = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
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


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error.



//// [/home/src/workspaces/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;


//// [/home/src/workspaces/project/a.d.ts]
export declare const a = "hello";


//// [/home/src/workspaces/project/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;


//// [/home/src/workspaces/project/b.d.ts]
export declare const b = 10;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"errors":true,"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "errors": true,
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 88
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'b.ts' is older than output 'a.js'




exitCode:: ExitStatus.Success

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 74
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "version": "FakeTSVersion",
  "size": 54
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




exitCode:: ExitStatus.Success

Change:: Introduce error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error.



//// [/home/src/workspaces/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;


//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"errors":true,"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "errors": true,
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 88
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error.



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 68
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 74
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "version": "FakeTSVersion",
  "size": 54
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)

exitCode:: ExitStatus.Success

Change:: Add file with error

Input::
//// [/home/src/workspaces/project/c.ts]
export const c: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'c.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts","./c.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts",
    "./c.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 77
}

//// [/home/src/workspaces/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = "hello";


//// [/home/src/workspaces/project/c.d.ts]
export declare const c: number;



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)
/home/src/workspaces/project/c.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Introduce error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error.



//// [/home/src/workspaces/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;


//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts","./c.ts"],"errors":true,"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts",
    "./c.ts"
  ],
  "errors": true,
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 97
}

//// [/home/src/workspaces/project/c.js] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)
/home/src/workspaces/project/c.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts","./c.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts",
    "./c.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 83
}

//// [/home/src/workspaces/project/c.js] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)
/home/src/workspaces/project/c.ts (computed .d.ts during emit)

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts","./c.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts",
    "./c.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 77
}

//// [/home/src/workspaces/project/c.js] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)
/home/src/workspaces/project/c.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/project/c.js] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)
/home/src/workspaces/project/c.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
