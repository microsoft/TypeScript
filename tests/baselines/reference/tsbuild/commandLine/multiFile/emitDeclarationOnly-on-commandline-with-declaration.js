currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project1/src/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
  }
}

//// [/home/src/workspaces/solution/project1/src/a.ts]
export const a = 10;const aLocal = 10;

//// [/home/src/workspaces/solution/project1/src/b.ts]
export const b = 10;const bLocal = 10;

//// [/home/src/workspaces/solution/project1/src/c.ts]
import { a } from "./a";export const c = a;

//// [/home/src/workspaces/solution/project1/src/d.ts]
import { b } from "./b";export const d = b;

//// [/home/src/workspaces/solution/project2/src/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
  },
  "references": [
    {
      "path": "../../project1/src"
    }
  ]
}

//// [/home/src/workspaces/solution/project2/src/e.ts]
export const e = 10;

//// [/home/src/workspaces/solution/project2/src/f.ts]
import { a } from "../../project1/src/a"; export const f = a;

//// [/home/src/workspaces/solution/project2/src/g.ts]
import { b } from "../../project1/src/b"; export const g = b;

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


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output file 'project1/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because output file 'project2/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/src/a.d.ts]
export declare const a = 10;


//// [/home/src/workspaces/solution/project1/src/b.d.ts]
export declare const b = 10;


//// [/home/src/workspaces/solution/project1/src/c.d.ts]
export declare const c = 10;


//// [/home/src/workspaces/solution/project1/src/d.d.ts]
export declare const d = 10;


//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts","./c.ts","./d.ts"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "version": "FakeTSVersion",
  "size": 72
}

//// [/home/src/workspaces/solution/project2/src/e.d.ts]
export declare const e = 10;


//// [/home/src/workspaces/solution/project2/src/f.d.ts]
export declare const f = 10;


//// [/home/src/workspaces/solution/project2/src/g.d.ts]
export declare const g = 10;


//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo]
{"root":["./e.ts","./f.ts","./g.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./e.ts",
    "./f.ts",
    "./g.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 77
}


Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/c.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/d.ts' is older than output 'project1/src/a.d.ts'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project2/src/e.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: local change

Input::
//// [/home/src/workspaces/solution/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/src/a.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/b.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/c.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/d.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/src/e.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/c.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: non local change

Input::
//// [/home/src/workspaces/solution/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/src/a.d.ts]
export declare const a = 10;
export declare const aaa = 10;


//// [/home/src/workspaces/solution/project1/src/b.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/c.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/d.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/src/e.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/c.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: emit js files

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output file 'project1/src/a.js' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/src/a.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/b.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/c.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/d.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/src/e.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project1/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aaa = exports.a = void 0;
exports.a = 10;
var aLocal = 10;
var aa = 10;
exports.aaa = 10;


//// [/home/src/workspaces/solution/project1/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
var bLocal = 10;


//// [/home/src/workspaces/solution/project1/src/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;


//// [/home/src/workspaces/solution/project1/src/d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;


//// [/home/src/workspaces/solution/project2/src/e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = void 0;
exports.e = 10;


//// [/home/src/workspaces/solution/project2/src/f.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
var a_1 = require("../../project1/src/a");
exports.f = a_1.a;


//// [/home/src/workspaces/solution/project2/src/g.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = void 0;
var b_1 = require("../../project1/src/b");
exports.g = b_1.b;



Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/c.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/a.ts' is older than output 'project1/src/a.d.ts'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project2/src/e.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: js emit with change without emitDeclarationOnly

Input::
//// [/home/src/workspaces/solution/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/src/a.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/b.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/c.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/d.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/src/e.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project1/src/a.js] file written with same contents
//// [/home/src/workspaces/solution/project1/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
var bLocal = 10;
var alocal = 10;


//// [/home/src/workspaces/solution/project1/src/c.js] file written with same contents
//// [/home/src/workspaces/solution/project1/src/d.js] file written with same contents
//// [/home/src/workspaces/solution/project2/src/e.js] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.js] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.js] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/c.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: local change

Input::
//// [/home/src/workspaces/solution/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/src/a.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/b.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/c.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/d.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/src/e.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/c.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: non local change

Input::
//// [/home/src/workspaces/solution/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/src/a.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/b.d.ts]
export declare const b = 10;
export declare const aaaaa = 10;


//// [/home/src/workspaces/solution/project1/src/c.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/d.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/src/e.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/c.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: js emit with change without emitDeclarationOnly

Input::
//// [/home/src/workspaces/solution/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m6[0m     {
[7m [0m [91m    ~[0m
[7m7[0m       "path": "../../project1/src"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m8[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/src/a.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/b.d.ts]
export declare const b = 10;
export declare const aaaaa = 10;
export declare const a2 = 10;


//// [/home/src/workspaces/solution/project1/src/c.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/d.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/src/e.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project1/src/a.js] file written with same contents
//// [/home/src/workspaces/solution/project1/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a2 = exports.aaaaa = exports.b = void 0;
exports.b = 10;
var bLocal = 10;
var alocal = 10;
var aaaa = 10;
exports.aaaaa = 10;
exports.a2 = 10;


//// [/home/src/workspaces/solution/project1/src/c.js] file written with same contents
//// [/home/src/workspaces/solution/project1/src/d.js] file written with same contents
//// [/home/src/workspaces/solution/project2/src/e.js] file written with same contents
//// [/home/src/workspaces/solution/project2/src/f.js] file written with same contents
//// [/home/src/workspaces/solution/project2/src/g.js] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/c.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
