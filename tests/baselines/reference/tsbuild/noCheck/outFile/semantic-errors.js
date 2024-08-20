currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/src/a.ts]
export const a: number = "hello";

//// [/src/b.ts]
export const b = 10;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true,
    "module": "amd",
    "outFile": "../outFile.js"
  }
}

//// [/home/src/tslibs/ts/lib/lib.d.ts]
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


/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...



//// [/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = "hello";
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
});


//// [/outFile.d.ts]
declare module "a" {
    export const a: number;
}
declare module "b" {
    export const b = 10;
}


//// [/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 82
}


Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/b.ts' is older than output 'outFile.js'




exitCode:: ExitStatus.Success

Change:: Fix `a` error with noCheck

Input::
//// [/src/a.ts]
export const a = "hello";


/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'outFile.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}


//// [/outFile.tsbuildinfo] file written with same contents
//// [/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'outFile.js'




exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents
//// [/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts"],"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts"
  ],
  "version": "FakeTSVersion",
  "size": 62
}


Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'outFile.js'




exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'outFile.js'




exitCode:: ExitStatus.Success

Change:: Introduce error with noCheck

Input::
//// [/src/a.ts]
export const a: number = "hello";


/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'outFile.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts]
declare module "a" {
    export const a: number;
}
declare module "b" {
    export const b = 10;
}


//// [/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 82
}


Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'outFile.js'




exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const a: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents
//// [/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 76
}


Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix `a` error with noCheck

Input::
//// [/src/a.ts]
export const a = "hello";


/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'outFile.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}


//// [/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 82
}


Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents
//// [/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts"],"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts"
  ],
  "version": "FakeTSVersion",
  "size": 62
}


Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Add file with error

Input::
//// [/src/c.ts]
export const c: number = "hello";


/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'outFile.tsbuildinfo' is older than input 'src/c.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = "hello";
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
});
define("c", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    exports.c = "hello";
});


//// [/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c: number;
}


//// [/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts","./src/c.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 89
}


Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Introduce error with noCheck

Input::
//// [/src/a.ts]
export const a: number = "hello";


/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'outFile.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts]
declare module "a" {
    export const a: number;
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c: number;
}


//// [/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts","./src/c.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 95
}


Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Fix `a` error with noCheck

Input::
//// [/src/a.ts]
export const a = "hello";


/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'outFile.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c: number;
}


//// [/outFile.tsbuildinfo] file written with same contents
//// [/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents
//// [/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts","./src/c.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 89
}


Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'outFile.js'




exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -b /src/tsconfig.json -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents
//// [/outFile.tsbuildinfo] file written with same contents
//// [/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
