currentDirectory:: / useCaseSensitiveFileNames: false
Input::
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

//// [/src/a.ts]
export const a = class { private p = 10; };

//// [/src/b.ts]
export const b = 10;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
  }
}



Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/src/tsconfig.json'...


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (used version)
/src/b.ts (computed .d.ts during emit)


//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());


//// [/src/b.d.ts]
export declare const b = 10;


//// [/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;


//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"errors":true,"checkPending":true,"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
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



Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/a.d.ts' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/src/tsconfig.json'...


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (used version)
/src/b.ts (computed .d.ts during emit)


//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo] file written with same contents
//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents


Change:: Fix `a` error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello";



Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)
/src/b.ts (computed .d.ts during emit)


//// [/src/a.d.ts]
export declare const a = "hello";


//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 74
}



Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/a.js'

exitCode:: ExitStatus.Success




Change:: No Change run with checking
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)
/src/b.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "version": "FakeTSVersion",
  "size": 54
}



Change:: No Change run with checking
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/a.js'

exitCode:: ExitStatus.Success




Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/a.js'

exitCode:: ExitStatus.Success




Change:: Introduce error with noCheck
Input::
//// [/src/a.ts]
export const a = class { private p = 10; };



Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/src/tsconfig.json'...


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (used version)
/src/b.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file changed its modified time
//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"errors":true,"checkPending":true,"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
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



Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/a.js'

exitCode:: ExitStatus.Success




Change:: No Change run with checking
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/src/tsconfig.json'...


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (used version)
/src/b.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file changed its modified time
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 68
}



Change:: Fix `a` error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello";



Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)
/src/b.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 74
}



Change:: No Change run with checking
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)
/src/b.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts"],"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "version": "FakeTSVersion",
  "size": 54
}



Change:: Add file with error
Input::
//// [/src/c.ts]
export const c: number = "hello";



Output::
/lib/tsc -b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/c.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)
/src/b.ts (computed .d.ts during emit)
/src/c.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts]
export declare const c: number;


//// [/src/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = "hello";


//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts","./c.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
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



Change:: Introduce error with noCheck
Input::
//// [/src/a.ts]
export const a = class { private p = 10; };



Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/src/tsconfig.json'...


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (used version)
/src/b.ts (computed .d.ts during emit)
/src/c.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file changed its modified time
//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts] file written with same contents
//// [/src/c.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts","./c.ts"],"errors":true,"checkPending":true,"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
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



Change:: Fix `a` error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello";



Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)
/src/b.ts (computed .d.ts during emit)
/src/c.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts] file written with same contents
//// [/src/c.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts","./c.ts"],"checkPending":true,"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
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



Change:: No Change run with checking
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)
/src/b.ts (computed .d.ts during emit)
/src/c.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts] file written with same contents
//// [/src/c.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"root":["./a.ts","./b.ts","./c.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
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



Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v --noCheck
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/a.js'

exitCode:: ExitStatus.Success




Change:: No Change run with checking
Input::


Output::
/lib/tsc -b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)
/src/b.ts (computed .d.ts during emit)
/src/c.ts (computed .d.ts during emit)


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts] file written with same contents
//// [/src/c.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo] file written with same contents
//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
