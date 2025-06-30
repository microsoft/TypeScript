currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/a.ts]
export const a: number = "hello";

//// [/home/src/workspaces/project/b.ts]
export const b = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true,
    "incremental": true,
    "module": "amd",
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


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file '../outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/outFile.js]
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


//// [/home/src/workspaces/outFile.d.ts]
declare module "a" {
    export const a: number;
}
declare module "b" {
    export const b = 10;
}


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-11705693502-export const a: number = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-11705693502-export const a: number = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/a.ts",
      "not cached or not changed"
    ],
    [
      "./project/b.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 782
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'b.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../outFile.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/outFile.js] file written with same contents
//// [/home/src/workspaces/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-16641552193-export const a = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/a.ts",
      "not cached or not changed"
    ],
    [
      "./project/b.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 774
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-16641552193-export const a = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 717
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: Introduce error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../outFile.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/outFile.js] file written with same contents
//// [/home/src/workspaces/outFile.d.ts]
declare module "a" {
    export const a: number;
}
declare module "b" {
    export const b = 10;
}


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-11705693502-export const a: number = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-11705693502-export const a: number = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/a.ts",
      "not cached or not changed"
    ],
    [
      "./project/b.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 782
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const a: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-11705693502-export const a: number = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-11705693502-export const a: number = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 877
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../outFile.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/outFile.js] file written with same contents
//// [/home/src/workspaces/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-16641552193-export const a = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/a.ts",
      "not cached or not changed"
    ],
    [
      "./project/b.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 774
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-16641552193-export const a = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 717
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Add file with error

Input::
//// [/home/src/workspaces/project/c.ts]
export const c: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../outFile.tsbuildinfo' is older than input 'c.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.js]
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


//// [/home/src/workspaces/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c: number;
}


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;","-9150421116-export const c: number = \"hello\";"],"root":[[2,4]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[4,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-16641552193-export const a = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 938
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Introduce error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../outFile.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/outFile.js] file written with same contents
//// [/home/src/workspaces/outFile.d.ts]
declare module "a" {
    export const a: number;
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c: number;
}


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-11705693502-export const a: number = \"hello\";","-13368947479-export const b = 10;","-9150421116-export const c: number = \"hello\";"],"root":[[2,4]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-11705693502-export const a: number = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/a.ts",
      "not cached or not changed"
    ],
    [
      "./project/b.ts",
      "not cached or not changed"
    ],
    [
      "./project/c.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 853
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../outFile.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/outFile.js] file written with same contents
//// [/home/src/workspaces/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c: number;
}


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;","-9150421116-export const c: number = \"hello\";"],"root":[[2,4]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-16641552193-export const a = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/a.ts",
      "not cached or not changed"
    ],
    [
      "./project/b.ts",
      "not cached or not changed"
    ],
    [
      "./project/c.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 845
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;","-9150421116-export const c: number = \"hello\";"],"root":[[2,4]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[4,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-16641552193-export const a = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 938
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v --noCheck
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output '../outFile.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error.




Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/home/src/workspaces/outFile.js",
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

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
