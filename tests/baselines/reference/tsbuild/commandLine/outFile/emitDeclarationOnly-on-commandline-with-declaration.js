currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project1/src/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true,
    "outFile": "../outFile.js",
    "module": "amd"
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
    "declaration": true,
    "outFile": "../outFile.js",
    "module": "amd"
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
import { a } from "a"; export const f = a;

//// [/home/src/workspaces/solution/project2/src/g.ts]
import { b } from "b"; export const g = b;

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

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output file 'project1/outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because output file 'project2/outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/outFile.d.ts]
declare module "a" {
    export const a = 10;
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c = 10;
}
declare module "d" {
    export const d = 10;
}


//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo]
{"root":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts",
    "./src/d.ts"
  ],
  "version": "FakeTSVersion",
  "size": 88
}

//// [/home/src/workspaces/solution/project2/outFile.d.ts]
declare module "e" {
    export const e = 10;
}
declare module "f" {
    export const f = 10;
}
declare module "g" {
    export const g = 10;
}


//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo]
{"root":["./src/e.ts","./src/f.ts","./src/g.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/e.ts",
    "./src/f.ts",
    "./src/g.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 89
}


Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project1/outFile.js",
  "module": 2,
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

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/d.ts' is older than output 'project1/outFile.d.ts'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project2/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

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

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/outFile.tsbuildinfo' is older than input 'project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project1/outFile.js",
  "module": 2,
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

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

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

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/outFile.tsbuildinfo' is older than input 'project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/outFile.d.ts]
declare module "a" {
    export const a = 10;
    export const aaa = 10;
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c = 10;
}
declare module "d" {
    export const d = 10;
}


//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project1/outFile.js",
  "module": 2,
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

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: emit js files

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output file 'project1/outFile.js' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.aaa = exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
    var aa = 10;
    exports.aaa = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
    var bLocal = 10;
});
define("c", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    exports.c = a_1.a;
});
define("d", ["require", "exports", "b"], function (require, exports, b_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.d = void 0;
    exports.d = b_1.b;
});


//// [/home/src/workspaces/solution/project2/outFile.js]
define("e", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.e = void 0;
    exports.e = 10;
});
define("f", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.f = void 0;
    exports.f = a_1.a;
});
define("g", ["require", "exports", "b"], function (require, exports, b_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.g = void 0;
    exports.g = b_1.b;
});



Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project1/outFile.js",
  "module": 2,
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

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/a.ts' is older than output 'project1/outFile.d.ts'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project2/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

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

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/outFile.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.aaa = exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
    var aa = 10;
    exports.aaa = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
    var bLocal = 10;
    var alocal = 10;
});
define("c", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    exports.c = a_1.a;
});
define("d", ["require", "exports", "b"], function (require, exports, b_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.d = void 0;
    exports.d = b_1.b;
});


//// [/home/src/workspaces/solution/project2/outFile.js] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project1/outFile.js",
  "module": 2,
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

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

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

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/outFile.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project1/outFile.js",
  "module": 2,
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

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

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

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/outFile.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/outFile.d.ts]
declare module "a" {
    export const a = 10;
    export const aaa = 10;
}
declare module "b" {
    export const b = 10;
    export const aaaaa = 10;
}
declare module "c" {
    export const c = 10;
}
declare module "d" {
    export const d = 10;
}


//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project1/outFile.js",
  "module": 2,
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

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

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

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/outFile.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m 8[0m     {
[7m  [0m [91m    ~[0m
[7m 9[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m10[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/solution/project1/outFile.d.ts]
declare module "a" {
    export const a = 10;
    export const aaa = 10;
}
declare module "b" {
    export const b = 10;
    export const aaaaa = 10;
    export const a2 = 10;
}
declare module "c" {
    export const c = 10;
}
declare module "d" {
    export const d = 10;
}


//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.d.ts] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/home/src/workspaces/solution/project1/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.aaa = exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
    var aa = 10;
    exports.aaa = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a2 = exports.aaaaa = exports.b = void 0;
    exports.b = 10;
    var bLocal = 10;
    var alocal = 10;
    var aaaa = 10;
    exports.aaaaa = 10;
    exports.a2 = 10;
});
define("c", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    exports.c = a_1.a;
});
define("d", ["require", "exports", "b"], function (require, exports, b_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.d = void 0;
    exports.d = b_1.b;
});


//// [/home/src/workspaces/solution/project2/outFile.js] file written with same contents

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project1/outFile.js",
  "module": 2,
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

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "declaration": true,
  "outFile": "/home/src/workspaces/solution/project2/outFile.js",
  "module": 2,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/outFile.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
