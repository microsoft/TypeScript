currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/home/src/projects/project/a.ts]
const a = class { private p = 10; };

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../outFile.js"
  }
}

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



Output::
/lib/tsc -b --v /home/src/projects/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * home/src/projects/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'home/src/projects/project/tsconfig.json' is out of date because output file 'home/src/projects/outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"root":["./project/a.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./project/a.ts"
  ],
  "version": "FakeTSVersion",
  "size": 53
}



Change:: no-change-run
Input::


Output::
/lib/tsc -b --v /home/src/projects/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * home/src/projects/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'home/src/projects/project/tsconfig.json' is out of date because output file 'home/src/projects/outFile.js' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo] file written with same contents
//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: With declaration enabled noEmit - Should report errors
Input::


Output::
/lib/tsc -b --v /home/src/projects/project --noEmit --declaration
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * home/src/projects/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'home/src/projects/project/tsconfig.json' is out of date because output file 'home/src/projects/outFile.js' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m const a = class { private p = 10; };
[7m [0m [91m      ~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "declaration": true,
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"root":["./project/a.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./project/a.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 67
}



Change:: With declaration and declarationMap noEmit - Should report errors
Input::


Output::
/lib/tsc -b --v /home/src/projects/project --noEmit --declaration --declarationMap
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * home/src/projects/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'home/src/projects/project/tsconfig.json' is out of date because buildinfo file 'home/src/projects/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m const a = class { private p = 10; };
[7m [0m [91m      ~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "declaration": true,
  "declarationMap": true,
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo] file written with same contents
//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: no-change-run
Input::


Output::
/lib/tsc -b --v /home/src/projects/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * home/src/projects/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'home/src/projects/project/tsconfig.json' is out of date because buildinfo file 'home/src/projects/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"root":["./project/a.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./project/a.ts"
  ],
  "version": "FakeTSVersion",
  "size": 53
}



Change:: Dts Emit with error
Input::


Output::
/lib/tsc -b --v /home/src/projects/project --declaration
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * home/src/projects/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'home/src/projects/project/tsconfig.json' is out of date because output file 'home/src/projects/outFile.js' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m const a = class { private p = 10; };
[7m [0m [91m      ~[0m

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/home/src/projects/project/tsconfig.json'...


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.js]
var a = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());


//// [/home/src/projects/outFile.tsbuildinfo]
{"root":["./project/a.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./project/a.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 67
}



Change:: Fix the error
Input::
//// [/home/src/projects/project/a.ts]
const a = class { public p = 10; };



Output::
/lib/tsc -b --v /home/src/projects/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * home/src/projects/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'home/src/projects/project/tsconfig.json' is out of date because buildinfo file 'home/src/projects/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"root":["./project/a.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./project/a.ts"
  ],
  "version": "FakeTSVersion",
  "size": 53
}



Change:: With declaration enabled noEmit
Input::


Output::
/lib/tsc -b --v /home/src/projects/project --noEmit --declaration
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * home/src/projects/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'home/src/projects/project/tsconfig.json' is out of date because output 'home/src/projects/outFile.js' is older than input 'home/src/projects/project/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "declaration": true,
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo] file written with same contents
//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: With declaration and declarationMap noEmit
Input::


Output::
/lib/tsc -b --v /home/src/projects/project --noEmit --declaration --declarationMap
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * home/src/projects/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'home/src/projects/project/tsconfig.json' is out of date because output 'home/src/projects/outFile.js' is older than input 'home/src/projects/project/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "declaration": true,
  "declarationMap": true,
  "noEmit": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo] file written with same contents
//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
