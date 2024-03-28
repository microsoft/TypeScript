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

//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;

//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;

//// [/src/project1/src/c.ts]
import { a } from "./a";export const c = a;

//// [/src/project1/src/d.ts]
import { b } from "./b";export const d = b;

//// [/src/project1/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outFile": "../outFile.js",
    "module": "amd"
  }
}

//// [/src/project2/src/e.ts]
export const e = 10;

//// [/src/project2/src/f.ts]
import { a } from "a"; export const f = a;

//// [/src/project2/src/g.ts]
import { b } from "b"; export const g = b;

//// [/src/project2/src/tsconfig.json]
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



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:19 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:20 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output file 'src/project1/outFile.tsbuildinfo' does not exist

[[90m12:00:21 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:26 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:27 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
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
{"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-18487752940-export const a = 10;const aLocal = 10;","impliedFormat":1},{"version":"-6189287562-export const b = 10;const bLocal = 10;","impliedFormat":1},{"version":"3248317647-import { a } from \"./a\";export const c = a;","impliedFormat":1},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "original": {
          "version": "-18487752940-export const a = 10;const aLocal = 10;",
          "impliedFormat": 1
        },
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "original": {
          "version": "-6189287562-export const b = 10;const bLocal = 10;",
          "impliedFormat": 1
        },
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "original": {
          "version": "3248317647-import { a } from \"./a\";export const c = a;",
          "impliedFormat": 1
        },
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "impliedFormat": 1
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1348
}

//// [/src/project2/outFile.d.ts]
declare module "e" {
    export const e = 10;
}
declare module "f" {
    export const f = 10;
}
declare module "g" {
    export const g = 10;
}


//// [/src/project2/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","impliedFormat":1},{"version":"-13789510868-export const e = 10;","impliedFormat":1},{"version":"-4849089835-import { a } from \"a\"; export const f = a;","impliedFormat":1},{"version":"-18341999015-import { b } from \"b\"; export const g = b;","impliedFormat":1}],"root":[[3,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../project1/outfile.d.ts",
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "../project1/outfile.d.ts": {
        "original": {
          "version": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
          "impliedFormat": 1
        },
        "version": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
        "impliedFormat": "commonjs"
      },
      "./src/e.ts": {
        "original": {
          "version": "-13789510868-export const e = 10;",
          "impliedFormat": 1
        },
        "version": "-13789510868-export const e = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/f.ts": {
        "original": {
          "version": "-4849089835-import { a } from \"a\"; export const f = a;",
          "impliedFormat": 1
        },
        "version": "-4849089835-import { a } from \"a\"; export const f = a;",
        "impliedFormat": "commonjs"
      },
      "./src/g.ts": {
        "original": {
          "version": "-18341999015-import { b } from \"b\"; export const g = b;",
          "impliedFormat": 1
        },
        "version": "-18341999015-import { b } from \"b\"; export const g = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1465
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:32 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:33 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/d.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:00:34 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date because newest input 'src/project2/src/g.ts' is older than output 'src/project2/outFile.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: local change
Input::
//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:36 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:37 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/a.ts'

[[90m12:00:38 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:42 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:00:43 AM[0m] Updating output timestamps of project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","impliedFormat":1},{"version":"-6189287562-export const b = 10;const bLocal = 10;","impliedFormat":1},{"version":"3248317647-import { a } from \"./a\";export const c = a;","impliedFormat":1},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "original": {
          "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
          "impliedFormat": 1
        },
        "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "original": {
          "version": "-6189287562-export const b = 10;const bLocal = 10;",
          "impliedFormat": 1
        },
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "original": {
          "version": "3248317647-import { a } from \"./a\";export const c = a;",
          "impliedFormat": 1
        },
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "impliedFormat": 1
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1362
}

//// [/src/project2/outFile.tsbuildinfo] file changed its modified time


Change:: non local change
Input::
//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:47 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:48 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/a.ts'

[[90m12:00:49 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:54 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output 'src/project2/outFile.tsbuildinfo' is older than input 'src/project1/src'

[[90m12:00:55 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
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
{"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","impliedFormat":1},{"version":"-6189287562-export const b = 10;const bLocal = 10;","impliedFormat":1},{"version":"3248317647-import { a } from \"./a\";export const c = a;","impliedFormat":1},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "original": {
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "impliedFormat": 1
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "original": {
          "version": "-6189287562-export const b = 10;const bLocal = 10;",
          "impliedFormat": 1
        },
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "original": {
          "version": "3248317647-import { a } from \"./a\";export const c = a;",
          "impliedFormat": 1
        },
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "impliedFormat": 1
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1408
}

//// [/src/project2/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","impliedFormat":1},{"version":"-13789510868-export const e = 10;","impliedFormat":1},{"version":"-4849089835-import { a } from \"a\"; export const f = a;","impliedFormat":1},{"version":"-18341999015-import { b } from \"b\"; export const g = b;","impliedFormat":1}],"root":[[3,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../project1/outfile.d.ts",
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "../project1/outfile.d.ts": {
        "original": {
          "version": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
          "impliedFormat": 1
        },
        "version": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
        "impliedFormat": "commonjs"
      },
      "./src/e.ts": {
        "original": {
          "version": "-13789510868-export const e = 10;",
          "impliedFormat": 1
        },
        "version": "-13789510868-export const e = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/f.ts": {
        "original": {
          "version": "-4849089835-import { a } from \"a\"; export const f = a;",
          "impliedFormat": 1
        },
        "version": "-4849089835-import { a } from \"a\"; export const f = a;",
        "impliedFormat": "commonjs"
      },
      "./src/g.ts": {
        "original": {
          "version": "-18341999015-import { b } from \"b\"; export const g = b;",
          "impliedFormat": 1
        },
        "version": "-18341999015-import { b } from \"b\"; export const g = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1490
}



Change:: emit js files
Input::


Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:00:59 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:00 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because buildinfo file 'src/project1/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:01 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:06 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:07 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
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
{"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","impliedFormat":1},{"version":"-6189287562-export const b = 10;const bLocal = 10;","impliedFormat":1},{"version":"3248317647-import { a } from \"./a\";export const c = a;","impliedFormat":1},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"outSignature":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "original": {
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "impliedFormat": 1
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "original": {
          "version": "-6189287562-export const b = 10;const bLocal = 10;",
          "impliedFormat": 1
        },
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "original": {
          "version": "3248317647-import { a } from \"./a\";export const c = a;",
          "impliedFormat": 1
        },
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "impliedFormat": 1
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1381
}

//// [/src/project2/outFile.js]
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


//// [/src/project2/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","impliedFormat":1},{"version":"-13789510868-export const e = 10;","impliedFormat":1},{"version":"-4849089835-import { a } from \"a\"; export const f = a;","impliedFormat":1},{"version":"-18341999015-import { b } from \"b\"; export const g = b;","impliedFormat":1}],"root":[[3,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../project1/outfile.d.ts",
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "../project1/outfile.d.ts": {
        "original": {
          "version": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
          "impliedFormat": 1
        },
        "version": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
        "impliedFormat": "commonjs"
      },
      "./src/e.ts": {
        "original": {
          "version": "-13789510868-export const e = 10;",
          "impliedFormat": 1
        },
        "version": "-13789510868-export const e = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/f.ts": {
        "original": {
          "version": "-4849089835-import { a } from \"a\"; export const f = a;",
          "impliedFormat": 1
        },
        "version": "-4849089835-import { a } from \"a\"; export const f = a;",
        "impliedFormat": "commonjs"
      },
      "./src/g.ts": {
        "original": {
          "version": "-18341999015-import { b } from \"b\"; export const g = b;",
          "impliedFormat": 1
        },
        "version": "-18341999015-import { b } from \"b\"; export const g = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1463
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:01:12 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:13 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/a.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:01:14 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date because newest input 'src/project2/src/g.ts' is older than output 'src/project2/outFile.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: js emit with change without emitDeclarationOnly
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;



Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:01:16 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:17 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:18 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:23 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:01:24 AM[0m] Updating output timestamps of project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

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
{"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","impliedFormat":1},{"version":"-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;","impliedFormat":1},{"version":"3248317647-import { a } from \"./a\";export const c = a;","impliedFormat":1},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"outSignature":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "original": {
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "impliedFormat": 1
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "original": {
          "version": "-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;",
          "impliedFormat": 1
        },
        "version": "-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "original": {
          "version": "3248317647-import { a } from \"./a\";export const c = a;",
          "impliedFormat": 1
        },
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "impliedFormat": 1
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1399
}

//// [/src/project2/outFile.tsbuildinfo] file changed its modified time


Change:: local change
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:01:28 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:29 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:30 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:34 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:01:35 AM[0m] Updating output timestamps of project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/project1/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","impliedFormat":1},{"version":"-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;","impliedFormat":1},{"version":"3248317647-import { a } from \"./a\";export const c = a;","impliedFormat":1},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "original": {
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "impliedFormat": 1
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "original": {
          "version": "-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;",
          "impliedFormat": 1
        },
        "version": "-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "original": {
          "version": "3248317647-import { a } from \"./a\";export const c = a;",
          "impliedFormat": 1
        },
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "impliedFormat": 1
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "106974224-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1442
}

//// [/src/project2/outFile.tsbuildinfo] file changed its modified time


Change:: non local change
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:01:39 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:40 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:41 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:46 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output 'src/project2/outFile.tsbuildinfo' is older than input 'src/project1/src'

[[90m12:01:47 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
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
{"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","impliedFormat":1},{"version":"-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;","impliedFormat":1},{"version":"3248317647-import { a } from \"./a\";export const c = a;","impliedFormat":1},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-3908737535-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "original": {
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "impliedFormat": 1
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "original": {
          "version": "-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;",
          "impliedFormat": 1
        },
        "version": "-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "original": {
          "version": "3248317647-import { a } from \"./a\";export const c = a;",
          "impliedFormat": 1
        },
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "impliedFormat": 1
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "-3908737535-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1498
}

//// [/src/project2/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-3908737535-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","impliedFormat":1},{"version":"-13789510868-export const e = 10;","impliedFormat":1},{"version":"-4849089835-import { a } from \"a\"; export const f = a;","impliedFormat":1},{"version":"-18341999015-import { b } from \"b\"; export const g = b;","impliedFormat":1}],"root":[[3,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../project1/outfile.d.ts",
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "../project1/outfile.d.ts": {
        "original": {
          "version": "-3908737535-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
          "impliedFormat": 1
        },
        "version": "-3908737535-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
        "impliedFormat": "commonjs"
      },
      "./src/e.ts": {
        "original": {
          "version": "-13789510868-export const e = 10;",
          "impliedFormat": 1
        },
        "version": "-13789510868-export const e = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/f.ts": {
        "original": {
          "version": "-4849089835-import { a } from \"a\"; export const f = a;",
          "impliedFormat": 1
        },
        "version": "-4849089835-import { a } from \"a\"; export const f = a;",
        "impliedFormat": "commonjs"
      },
      "./src/g.ts": {
        "original": {
          "version": "-18341999015-import { b } from \"b\"; export const g = b;",
          "impliedFormat": 1
        },
        "version": "-18341999015-import { b } from \"b\"; export const g = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1522
}



Change:: js emit with change without emitDeclarationOnly
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;



Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:01:52 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:53 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because buildinfo file 'src/project1/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:54 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:02:00 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:02:01 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
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
{"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","impliedFormat":1},{"version":"-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;","impliedFormat":1},{"version":"3248317647-import { a } from \"./a\";export const c = a;","impliedFormat":1},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"outSignature":"1646858368-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n    export const a2 = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "original": {
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "impliedFormat": 1
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "original": {
          "version": "-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;",
          "impliedFormat": 1
        },
        "version": "-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "original": {
          "version": "3248317647-import { a } from \"./a\";export const c = a;",
          "impliedFormat": 1
        },
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "impliedFormat": 1
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "1646858368-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n    export const a2 = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1519
}

//// [/src/project2/outFile.js] file written with same contents
//// [/src/project2/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"1646858368-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n    export const a2 = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","impliedFormat":1},{"version":"-13789510868-export const e = 10;","impliedFormat":1},{"version":"-4849089835-import { a } from \"a\"; export const f = a;","impliedFormat":1},{"version":"-18341999015-import { b } from \"b\"; export const g = b;","impliedFormat":1}],"root":[[3,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../project1/outfile.d.ts",
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "../project1/outfile.d.ts": {
        "original": {
          "version": "1646858368-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n    export const a2 = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
          "impliedFormat": 1
        },
        "version": "1646858368-declare module \"a\" {\n    export const a = 10;\n    export const aaa = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n    export const aaaaa = 10;\n    export const a2 = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
        "impliedFormat": "commonjs"
      },
      "./src/e.ts": {
        "original": {
          "version": "-13789510868-export const e = 10;",
          "impliedFormat": 1
        },
        "version": "-13789510868-export const e = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/f.ts": {
        "original": {
          "version": "-4849089835-import { a } from \"a\"; export const f = a;",
          "impliedFormat": 1
        },
        "version": "-4849089835-import { a } from \"a\"; export const f = a;",
        "impliedFormat": "commonjs"
      },
      "./src/g.ts": {
        "original": {
          "version": "-18341999015-import { b } from \"b\"; export const g = b;",
          "impliedFormat": 1
        },
        "version": "-18341999015-import { b } from \"b\"; export const g = b;",
        "impliedFormat": "commonjs"
      }
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
    "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1521
}

