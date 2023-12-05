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
    "composite": true,
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
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"hash":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

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
      "composite": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1599
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
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/e.ts","./src/f.ts","./src/g.ts"],"dts":{"sections":[{"pos":0,"end":144,"kind":"text"}],"hash":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","-13789510868-export const e = 10;","-4849089835-import { a } from \"a\"; export const f = a;","-18341999015-import { b } from \"b\"; export const g = b;"],"root":[[3,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project2/outFile.d.ts
----------------------------------------------------------------------
text: (0-144)
declare module "e" {
    export const e = 10;
}
declare module "f" {
    export const f = 10;
}
declare module "g" {
    export const g = 10;
}

======================================================================

//// [/src/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 144,
          "kind": "text"
        }
      ],
      "hash": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n"
    }
  },
  "program": {
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
      "composite": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1650
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:00:34 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:35 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/d.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:00:36 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date because newest input 'src/project2/src/g.ts' is older than output 'src/project2/outFile.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: change
Input::
//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:00:38 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:39 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/a.ts'

[[90m12:00:40 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:45 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:00:46 AM[0m] Updating output timestamps of project '/src/project2/src/tsconfig.json'...

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
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"hash":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

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
      "composite": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1613
}

//// [/src/project2/outFile.tsbuildinfo] file changed its modified time


Change:: emit js files
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly false
[[90m12:00:49 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:50 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because buildinfo file 'src/project1/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:00:51 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:57 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:00:58 AM[0m] Building project '/src/project2/src/tsconfig.json'...

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
  "composite": true,
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
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"js":{"sections":[{"pos":0,"end":881,"kind":"text"}],"hash":"8033983700-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n    var aa = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"},"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"hash":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":false,"module":2,"outFile":"./outFile.js"},"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

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
      "composite": true,
      "emitDeclarationOnly": false,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2641
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
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/e.ts","./src/f.ts","./src/g.ts"],"js":{"sections":[{"pos":0,"end":623,"kind":"text"}],"hash":"40579807800-define(\"e\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.e = void 0;\n    exports.e = 10;\n});\ndefine(\"f\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.f = void 0;\n    exports.f = a_1.a;\n});\ndefine(\"g\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.g = void 0;\n    exports.g = b_1.b;\n});\n"},"dts":{"sections":[{"pos":0,"end":144,"kind":"text"}],"hash":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","../project1/outfile.d.ts","./src/e.ts","./src/f.ts","./src/g.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","-13789510868-export const e = 10;","-4849089835-import { a } from \"a\"; export const f = a;","-18341999015-import { b } from \"b\"; export const g = b;"],"root":[[3,5]],"options":{"composite":true,"emitDeclarationOnly":false,"module":2,"outFile":"./outFile.js"},"outSignature":"-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/project2/outFile.js
----------------------------------------------------------------------
text: (0-623)
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

======================================================================
======================================================================
File:: /src/project2/outFile.d.ts
----------------------------------------------------------------------
text: (0-144)
declare module "e" {
    export const e = 10;
}
declare module "f" {
    export const f = 10;
}
declare module "g" {
    export const g = 10;
}

======================================================================

//// [/src/project2/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 623,
          "kind": "text"
        }
      ],
      "hash": "40579807800-define(\"e\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.e = void 0;\n    exports.e = 10;\n});\ndefine(\"f\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.f = void 0;\n    exports.f = a_1.a;\n});\ndefine(\"g\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.g = void 0;\n    exports.g = b_1.b;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 144,
          "kind": "text"
        }
      ],
      "hash": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n"
    }
  },
  "program": {
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
      "composite": true,
      "emitDeclarationOnly": false,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2402
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:01:04 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:05 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/a.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:01:06 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date because newest input 'src/project2/src/g.ts' is older than output 'src/project2/outFile.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: no change run with js emit
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly false
[[90m12:01:07 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:08 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/a.ts' is older than output 'src/project1/outFile.tsbuildinfo'

[[90m12:01:09 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date because newest input 'src/project2/src/g.ts' is older than output 'src/project2/outFile.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: js emit with change
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const blocal = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly false
[[90m12:01:11 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:12 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/outFile.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:13 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:19 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:01:20 AM[0m] Updating output timestamps of project '/src/project2/src/tsconfig.json'...

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
{"bundle":{"commonSourceDirectory":"./src","sourceFiles":["./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"js":{"sections":[{"pos":0,"end":902,"kind":"text"}],"hash":"11057592749-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n    var aa = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n    var blocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"},"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"hash":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"}},"program":{"fileNames":["../../lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts","./src/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","2355059555-export const b = 10;const bLocal = 10;const blocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":false,"module":2,"outFile":"./outFile.js"},"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

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
      "composite": true,
      "emitDeclarationOnly": false,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2681
}

//// [/src/project2/outFile.tsbuildinfo] file changed its modified time
