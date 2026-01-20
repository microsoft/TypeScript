currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project1/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
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
    "composite": true,
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

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because output file 'project2/outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.



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
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts",
    "./src/d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
    "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
    "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ],
    [
      "./src/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1200
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
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","-13789510868-export const e = 10;","-4849089835-import { a } from \"a\"; export const f = a;","-18341999015-import { b } from \"b\"; export const g = b;"],"root":[[3,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/outfile.d.ts",
    "./src/e.ts",
    "./src/f.ts",
    "./src/g.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../project1/outfile.d.ts": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "./src/e.ts": "-13789510868-export const e = 10;",
    "./src/f.ts": "-4849089835-import { a } from \"a\"; export const f = a;",
    "./src/g.ts": "-18341999015-import { b } from \"b\"; export const g = b;"
  },
  "root": [
    [
      [
        3,
        5
      ],
      [
        "./src/e.ts",
        "./src/f.ts",
        "./src/g.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/outfile.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/e.ts",
      "not cached or not changed"
    ],
    [
      "./src/f.ts",
      "not cached or not changed"
    ],
    [
      "./src/g.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1317
}


Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.




Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.



//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts",
    "./src/d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
    "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
    "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ],
    [
      "./src/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1214
}


Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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

Change:: non local change

Input::
//// [/home/src/workspaces/solution/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.



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


//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts",
    "./src/d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
    "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
    "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ],
    [
      "./src/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1260
}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","-13789510868-export const e = 10;","-4849089835-import { a } from \"a\"; export const f = a;","-18341999015-import { b } from \"b\"; export const g = b;"],"root":[[3,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/outfile.d.ts",
    "./src/e.ts",
    "./src/f.ts",
    "./src/g.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../project1/outfile.d.ts": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "./src/e.ts": "-13789510868-export const e = 10;",
    "./src/f.ts": "-4849089835-import { a } from \"a\"; export const f = a;",
    "./src/g.ts": "-18341999015-import { b } from \"b\"; export const g = b;"
  },
  "root": [
    [
      [
        3,
        5
      ],
      [
        "./src/e.ts",
        "./src/f.ts",
        "./src/g.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/outfile.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/e.ts",
      "not cached or not changed"
    ],
    [
      "./src/f.ts",
      "not cached or not changed"
    ],
    [
      "./src/g.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1342
}


Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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

Change:: emit js files

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.



//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts",
    "./src/d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
    "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
    "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ],
    [
      "./src/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1233
}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","-13789510868-export const e = 10;","-4849089835-import { a } from \"a\"; export const f = a;","-18341999015-import { b } from \"b\"; export const g = b;"],"root":[[3,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/outfile.d.ts",
    "./src/e.ts",
    "./src/f.ts",
    "./src/g.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../project1/outfile.d.ts": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "./src/e.ts": "-13789510868-export const e = 10;",
    "./src/f.ts": "-4849089835-import { a } from \"a\"; export const f = a;",
    "./src/g.ts": "-18341999015-import { b } from \"b\"; export const g = b;"
  },
  "root": [
    [
      [
        3,
        5
      ],
      [
        "./src/e.ts",
        "./src/f.ts",
        "./src/g.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/outfile.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/e.ts",
      "not cached or not changed"
    ],
    [
      "./src/f.ts",
      "not cached or not changed"
    ],
    [
      "./src/g.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1315
}

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
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.




Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.



//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts",
    "./src/d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
    "./src/b.ts": "-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;",
    "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ],
    [
      "./src/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1251
}

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



Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: local change

Input::
//// [/home/src/workspaces/solution/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.



//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts",
    "./src/d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
    "./src/b.ts": "-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;",
    "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ],
    [
      "./src/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1294
}


Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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

Change:: non local change

Input::
//// [/home/src/workspaces/solution/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.



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


//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-3908737535-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts",
    "./src/d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
    "./src/b.ts": "-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;",
    "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ],
    [
      "./src/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-3908737535-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1350
}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-3908737535-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","-13789510868-export const e = 10;","-4849089835-import { a } from \"a\"; export const f = a;","-18341999015-import { b } from \"b\"; export const g = b;"],"root":[[3,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/outfile.d.ts",
    "./src/e.ts",
    "./src/f.ts",
    "./src/g.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../project1/outfile.d.ts": "-3908737535-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "./src/e.ts": "-13789510868-export const e = 10;",
    "./src/f.ts": "-4849089835-import { a } from \"a\"; export const f = a;",
    "./src/g.ts": "-18341999015-import { b } from \"b\"; export const g = b;"
  },
  "root": [
    [
      [
        3,
        5
      ],
      [
        "./src/e.ts",
        "./src/f.ts",
        "./src/g.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/outfile.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/e.ts",
      "not cached or not changed"
    ],
    [
      "./src/f.ts",
      "not cached or not changed"
    ],
    [
      "./src/g.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1374
}


Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[96mproject1/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject1/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mproject2/src/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 4 errors.



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


//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"1646858368-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n    export const a2 = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts",
    "./src/d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
    "./src/b.ts": "-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;",
    "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ],
    [
      "./src/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "1646858368-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n    export const a2 = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1371
}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","1646858368-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n    export const a2 = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","-13789510868-export const e = 10;","-4849089835-import { a } from \"a\"; export const f = a;","-18341999015-import { b } from \"b\"; export const g = b;"],"root":[[3,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/outfile.d.ts",
    "./src/e.ts",
    "./src/f.ts",
    "./src/g.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../project1/outfile.d.ts": "1646858368-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n    export const a2 = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "./src/e.ts": "-13789510868-export const e = 10;",
    "./src/f.ts": "-4849089835-import { a } from \"a\"; export const f = a;",
    "./src/g.ts": "-18341999015-import { b } from \"b\"; export const g = b;"
  },
  "root": [
    [
      [
        3,
        5
      ],
      [
        "./src/e.ts",
        "./src/f.ts",
        "./src/g.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/outfile.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/e.ts",
      "not cached or not changed"
    ],
    [
      "./src/f.ts",
      "not cached or not changed"
    ],
    [
      "./src/g.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1373
}

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
  "composite": true,
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

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
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

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
