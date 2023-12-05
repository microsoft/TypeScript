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
[[90m12:00:19 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:20 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output file 'src/project1/outFile.tsbuildinfo' does not exist

[[90m12:00:21 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:27 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:28 AM[0m] Building project '/src/project2/src/tsconfig.json'...

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
  "incremental": true,
  "declaration": true,
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
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"hash":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-192)
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
          "end": 192,
          "kind": "text"
        }
      ],
      "hash": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"
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
    }
  },
  "version": "FakeTSVersion",
  "size": 1318
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:00:29 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:30 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/d.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:00:31 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:32 AM[0m] Building project '/src/project2/src/tsconfig.json'...

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
[[90m12:00:34 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:35 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/a.ts'

[[90m12:00:36 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:42 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:43 AM[0m] Building project '/src/project2/src/tsconfig.json'...

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
  "incremental": true,
  "declaration": true,
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


//// [/src/project1/outFile.d.ts] file written with same contents
//// [/src/project1/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"hash":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

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
          "end": 192,
          "kind": "text"
        }
      ],
      "hash": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"
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
    }
  },
  "version": "FakeTSVersion",
  "size": 1332
}



Change:: emit js files
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly false
[[90m12:00:44 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:45 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because buildinfo file 'src/project1/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:00:46 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:52 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:53 AM[0m] Building project '/src/project2/src/tsconfig.json'...

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
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": false,
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
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"js":{"sections":[{"pos":0,"end":881,"kind":"text"}],"hash":"8033983700-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n    var aa = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"},"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"hash":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":false,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.js
----------------------------------------------------------------------
text: (0-881)
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

======================================================================
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-192)
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
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 881,
          "kind": "text"
        }
      ],
      "hash": "8033983700-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n    var aa = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 192,
          "kind": "text"
        }
      ],
      "hash": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"
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
    }
  },
  "version": "FakeTSVersion",
  "size": 2360
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:00:54 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:55 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/a.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:00:56 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:00:57 AM[0m] Building project '/src/project2/src/tsconfig.json'...

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
[[90m12:00:58 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:59 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/a.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:01:00 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:01:01 AM[0m] Building project '/src/project2/src/tsconfig.json'...

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
[[90m12:01:03 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:04 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:05 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:12 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/outFile.tsbuildinfo' does not exist

[[90m12:01:13 AM[0m] Building project '/src/project2/src/tsconfig.json'...

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
  "incremental": true,
  "declaration": true,
  "outFile": "/src/project2/outFile.js",
  "module": 2,
  "emitDeclarationOnly": false,
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
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"js":{"sections":[{"pos":0,"end":902,"kind":"text"}],"hash":"11057592749-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n    var aa = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n    var blocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"},"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"hash":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","2355059555-export const b = 10;const bLocal = 10;const blocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":false,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/project1/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project1/outFile.js
----------------------------------------------------------------------
text: (0-902)
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

======================================================================
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-192)
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
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 902,
          "kind": "text"
        }
      ],
      "hash": "11057592749-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n    var aa = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n    var blocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 192,
          "kind": "text"
        }
      ],
      "hash": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"
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
    }
  },
  "version": "FakeTSVersion",
  "size": 2400
}

