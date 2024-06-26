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
    "incremental": true,
    "declaration": true,
    "outFile": "../outFile.js",
    "module": "amd",
    "emitDeclarationOnly": true
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
    "incremental": true,
    "declaration": true,
    "outFile": "../outFile.js",
    "module": "amd",
    "emitDeclarationOnly": true
  },
  "references": [
    {
      "path": "../../project1/src"
    }
  ]
}



Output::
/lib/tsc --b /src/project2/src --verbose
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output file 'src/project1/outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m10[0m     {
[7m  [0m [91m    ~[0m
[7m11[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
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
{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
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
    "declaration": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 905
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
{"fileNames":["../../lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","-13789510868-export const e = 10;","-4849089835-import { a } from \"a\"; export const f = a;","-18341999015-import { b } from \"b\"; export const g = b;"],"root":[[3,5]],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"version":"FakeTSVersion"}

//// [/src/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../lib/lib.d.ts",
    "../project1/outfile.d.ts",
    "./src/e.ts",
    "./src/f.ts",
    "./src/g.ts"
  ],
  "fileInfos": {
    "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "declaration": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../lib/lib.d.ts",
      "not cached"
    ],
    [
      "../project1/outfile.d.ts",
      "not cached"
    ],
    [
      "./src/e.ts",
      "not cached"
    ],
    [
      "./src/f.ts",
      "not cached"
    ],
    [
      "./src/g.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1116
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/d.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m10[0m     {
[7m  [0m [91m    ~[0m
[7m11[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
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




Change:: change
Input::
//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m10[0m     {
[7m  [0m [91m    ~[0m
[7m11[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
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


//// [/src/project1/outFile.d.ts] file written with same contents
//// [/src/project1/outFile.tsbuildinfo]
{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
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
    "declaration": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 919
}



Change:: emit js files
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly false
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because buildinfo file 'src/project1/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90mHH:MM:SS AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m10[0m     {
[7m  [0m [91m    ~[0m
[7m11[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "emitDeclarationOnly": false,
  "tscBuild": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": false,
  "tscBuild": true,
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
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
    var aa = 10;
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
{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":false,"module":2,"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
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
    "declaration": true,
    "emitDeclarationOnly": false,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 920
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
{"fileNames":["../../lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","-13789510868-export const e = 10;","-4849089835-import { a } from \"a\"; export const f = a;","-18341999015-import { b } from \"b\"; export const g = b;"],"root":[[3,5]],"options":{"declaration":true,"emitDeclarationOnly":false,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"version":"FakeTSVersion"}

//// [/src/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../lib/lib.d.ts",
    "../project1/outfile.d.ts",
    "./src/e.ts",
    "./src/f.ts",
    "./src/g.ts"
  ],
  "fileInfos": {
    "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "declaration": true,
    "emitDeclarationOnly": false,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../lib/lib.d.ts",
      "not cached"
    ],
    [
      "../project1/outfile.d.ts",
      "not cached"
    ],
    [
      "./src/e.ts",
      "not cached"
    ],
    [
      "./src/f.ts",
      "not cached"
    ],
    [
      "./src/g.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1117
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/a.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m10[0m     {
[7m  [0m [91m    ~[0m
[7m11[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
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




Change:: no change run with js emit
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly false
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/a.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m10[0m     {
[7m  [0m [91m    ~[0m
[7m11[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": false,
  "tscBuild": true,
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




Change:: js emit with change
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const blocal = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly false
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project2/src/tsconfig.json'...

[96msrc/project2/src/tsconfig.json[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m TS6306: [0mReferenced project '/src/project1/src' must have setting "composite": true.

[7m10[0m     {
[7m  [0m [91m    ~[0m
[7m11[0m       "path": "../../project1/src"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project1/outFile.js",
  "module": 2,
  "emitDeclarationOnly": false,
  "tscBuild": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": false,
  "tscBuild": true,
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


//// [/src/project1/outFile.d.ts] file written with same contents
//// [/src/project1/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
    var aa = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
    var bLocal = 10;
    var blocal = 10;
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
{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","2355059555-export const b = 10;const bLocal = 10;const blocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":false,"module":2,"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.readable.baseline.txt]
{
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
    "./src/b.ts": "2355059555-export const b = 10;const bLocal = 10;const blocal = 10;",
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
    "declaration": true,
    "emitDeclarationOnly": false,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 937
}

