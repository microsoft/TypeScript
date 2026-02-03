currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/a.ts]
const a: number = "hello"

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../outFile.js"
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


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in a.ts[90m:1[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in a.ts[90m:1[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Fix error

Input::
//// [/home/src/projects/project/a.ts]
const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.Success

Change:: Emit after fixing error

Input::

/home/src/tslibs/TS/Lib/tsc.js -p .
Output::


//// [/home/src/projects/outFile.js]
var a = "hello";



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.Success

Change:: Introduce error

Input::
//// [/home/src/projects/project/a.ts]
const a: number = "hello"


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in a.ts[90m:1[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Emit when error

Input::

/home/src/tslibs/TS/Lib/tsc.js -p .
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in a.ts[90m:1[0m



//// [/home/src/projects/outFile.js] file written with same contents

Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in a.ts[90m:1[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
