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

//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;

//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;

//// [/src/project1/src/c.ts]
import { a } from "./a";export const c = a;

//// [/src/project1/src/d.ts]
import { b } from "./b";export const d = b;

//// [/src/project1/src/tsconfig.json]
{"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"}}

//// [/src/project2/src/e.ts]
export const e = 10;

//// [/src/project2/src/f.ts]
import { a } from "a"; export const f = a;

//// [/src/project2/src/g.ts]
import { b } from "b"; export const g = b;

//// [/src/project2/src/tsconfig.json]
{"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:19 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:20 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output file 'src/project1/outFile.tsbuildinfo' does not exist

[[90m12:00:21 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:27 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:28 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project1/src/a.ts","/src/project1/src/b.ts","/src/project1/src/c.ts","/src/project1/src/d.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project1/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project1/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.d.ts]
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


//// [/src/project1/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"dts":{"sections":[{"pos":0,"end":204,"kind":"text"}],"hash":"-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-204)
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

======================================================================

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 1327
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:29 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:30 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/d.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:00:31 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:32 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::




Change:: local change
Input::
//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:34 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:35 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/a.ts'

[[90m12:00:36 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:42 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:43 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project1/src/a.ts","/src/project1/src/b.ts","/src/project1/src/c.ts","/src/project1/src/d.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project1/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project1/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.d.ts] file written with same contents
//// [/src/project1/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"dts":{"sections":[{"pos":0,"end":204,"kind":"text"}],"hash":"-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
      "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 1341
}



Change:: non local change
Input::
//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:45 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:46 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/a.ts'

[[90m12:00:47 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:53 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:54 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project1/src/a.ts","/src/project1/src/b.ts","/src/project1/src/c.ts","/src/project1/src/d.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project1/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project1/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.d.ts]
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


//// [/src/project1/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"dts":{"sections":[{"pos":0,"end":232,"kind":"text"}],"hash":"18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-232)
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

======================================================================

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 232,
          "kind": "text"
        }
      ],
      "hash": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 1391
}



Change:: emit js files
Input::


Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:00:55 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:56 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because buildinfo file 'src/project1/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:00:57 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:03 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:01:04 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project1/src/a.ts","/src/project1/src/b.ts","/src/project1/src/c.ts","/src/project1/src/d.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project1/outFile.js","module":2,"configFilePath":"/src/project1/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.js]
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


//// [/src/project1/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"js":{"sections":[{"pos":0,"end":945,"kind":"text"}],"hash":"18337089228-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.aaa = exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n    var aa = 10;\r\n    exports.aaa = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":232,"kind":"text"}],"hash":"18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.js
----------------------------------------------------------------------
text: (0-945)
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

======================================================================
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-232)
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

======================================================================

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 945,
          "kind": "text"
        }
      ],
      "hash": "18337089228-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.aaa = exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n    var aa = 10;\r\n    exports.aaa = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 232,
          "kind": "text"
        }
      ],
      "hash": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "declaration": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2485
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:01:05 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:06 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/a.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:01:07 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:01:08 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::




Change:: js emit with change without emitDeclarationOnly
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;



Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:01:10 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:11 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:12 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:19 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:01:20 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project1/src/a.ts","/src/project1/src/b.ts","/src/project1/src/c.ts","/src/project1/src/d.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project1/outFile.js","module":2,"configFilePath":"/src/project1/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.d.ts] file written with same contents
//// [/src/project1/outFile.js]
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


//// [/src/project1/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"js":{"sections":[{"pos":0,"end":967,"kind":"text"}],"hash":"-6605412751-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.aaa = exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n    var aa = 10;\r\n    exports.aaa = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n    var alocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":232,"kind":"text"}],"hash":"18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.js
----------------------------------------------------------------------
text: (0-967)
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

======================================================================
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-232)
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

======================================================================

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 967,
          "kind": "text"
        }
      ],
      "hash": "-6605412751-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.aaa = exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n    var aa = 10;\r\n    exports.aaa = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n    var alocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 232,
          "kind": "text"
        }
      ],
      "hash": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "./src/b.ts": "-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "declaration": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2527
}



Change:: local change
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:01:22 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:23 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:24 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:30 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:01:31 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project1/src/a.ts","/src/project1/src/b.ts","/src/project1/src/c.ts","/src/project1/src/d.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project1/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project1/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.d.ts] file written with same contents
//// [/src/project1/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"dts":{"sections":[{"pos":0,"end":232,"kind":"text"}],"hash":"18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-232)
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

======================================================================

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 232,
          "kind": "text"
        }
      ],
      "hash": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "./src/b.ts": "-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 1425
}



Change:: non local change
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:01:33 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:34 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:35 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:41 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:01:42 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project1/src/a.ts","/src/project1/src/b.ts","/src/project1/src/c.ts","/src/project1/src/d.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project1/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project1/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"emitDeclarationOnly":true,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.d.ts]
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


//// [/src/project1/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"dts":{"sections":[{"pos":0,"end":262,"kind":"text"}],"hash":"-2431696425-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n    export const aaaaa = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-262)
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

======================================================================

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 262,
          "kind": "text"
        }
      ],
      "hash": "-2431696425-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n    export const aaaaa = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "./src/b.ts": "-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 1481
}



Change:: js emit with change without emitDeclarationOnly
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;



Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:01:44 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:45 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because buildinfo file 'src/project1/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:46 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:53 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:01:54 AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m1[0m:[93m115[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m1[0m {"compilerOptions":{"incremental":true,"declaration":true,"outFile":"../outFile.js","module":"amd"},"references":[{"path":"../../project1/src"}]}
[7m [0m [91m                                                                                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project1/src/a.ts","/src/project1/src/b.ts","/src/project1/src/c.ts","/src/project1/src/d.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project1/outFile.js","module":2,"configFilePath":"/src/project1/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: ["/src/project2/src/e.ts","/src/project2/src/f.ts","/src/project2/src/g.ts"]
Program options: {"incremental":true,"declaration":true,"outFile":"/src/project2/outFile.js","module":2,"configFilePath":"/src/project2/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/outFile.d.ts
/src/project2/src/e.ts
/src/project2/src/f.ts
/src/project2/src/g.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.d.ts]
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


//// [/src/project1/outFile.js]
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


//// [/src/project1/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"js":{"sections":[{"pos":0,"end":1063,"kind":"text"}],"hash":"-36573474364-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.aaa = exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n    var aa = 10;\r\n    exports.aaa = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.a2 = exports.aaaaa = exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n    var alocal = 10;\r\n    var aaaa = 10;\r\n    exports.aaaaa = 10;\r\n    exports.a2 = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"},"dts":{"sections":[{"pos":0,"end":289,"kind":"text"}],"hash":"1359716995-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n    export const aaaaa = 10;\r\n    export const a2 = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.js
----------------------------------------------------------------------
text: (0-1063)
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

======================================================================
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-289)
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

======================================================================

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1063,
          "kind": "text"
        }
      ],
      "hash": "-36573474364-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.aaa = exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n    var aa = 10;\r\n    exports.aaa = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.a2 = exports.aaaaa = exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n    var alocal = 10;\r\n    var aaaa = 10;\r\n    exports.aaaaa = 10;\r\n    exports.a2 = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 289,
          "kind": "text"
        }
      ],
      "hash": "1359716995-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n    export const aaaaa = 10;\r\n    export const a2 = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "./src/b.ts": "-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "declaration": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2753
}

