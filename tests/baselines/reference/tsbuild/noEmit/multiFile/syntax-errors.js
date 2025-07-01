currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/a.ts]
const a = "hello

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {}
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

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                [0m


Found 1 error.



//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"root":["./a.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 59
}


Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                [0m


Found 1 error.



//// [/home/src/projects/project/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix error

Input::
//// [/home/src/projects/project/a.ts]
const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...



//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"root":["./a.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts"
  ],
  "version": "FakeTSVersion",
  "size": 45
}


Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
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

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/project/a.ts (used version)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'a.js' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...



//// [/home/src/projects/project/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
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

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/project/a.ts (used version)

exitCode:: ExitStatus.Success

Change:: Emit after fixing error

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'a.js' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...



//// [/home/src/projects/project/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/projects/project/a.js]
var a = "hello";



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
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

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/project/a.ts (used version)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




exitCode:: ExitStatus.Success

Change:: Introduce error

Input::
//// [/home/src/projects/project/a.ts]
const a = "hello


/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                [0m


Found 1 error.



//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"root":["./a.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 59
}


Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Emit when error

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                [0m


Found 1 error.



//// [/home/src/projects/project/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/projects/project/a.js]
var a = "hello;



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/project/a.ts (used version)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                [0m


Found 1 error.



//// [/home/src/projects/project/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
