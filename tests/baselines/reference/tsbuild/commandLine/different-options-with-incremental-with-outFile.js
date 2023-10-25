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

//// [/src/project/a.ts]
export const a = 10;const aLocal = 10;

//// [/src/project/b.ts]
export const b = 10;const bLocal = 10;

//// [/src/project/c.ts]
import { a } from "./a";export const c = a;

//// [/src/project/d.ts]
import { b } from "./b";export const d = b;

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "outFile": "../outFile.js",
    "module": "amd"
  }
}



Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:12 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:13 AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/outFile.tsbuildinfo' does not exist

[[90m12:00:14 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
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


//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":864,"kind":"text"}],"hash":"31952994086-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/outFile.js
----------------------------------------------------------------------
text: (0-864)
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
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

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 864,
          "kind": "text"
        }
      ],
      "hash": "31952994086-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2025
}



Change:: with sourceMap
Input::


Output::
/lib/tsc --b /src/project --verbose --sourceMap
[[90m12:00:20 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:21 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:00:22 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "sourceMap": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
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
//# sourceMappingURL=outFile.js.map

//// [/src/outFile.js.map]
{"version":3,"file":"outFile.js","sourceRoot":"","sources":["project/a.ts","project/b.ts","project/c.ts","project/d.ts"],"names":[],"mappings":";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAzB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC"}

//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":864,"kind":"text"}],"mapHash":"-9121204548-{\"version\":3,\"file\":\"outFile.js\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAzB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC\"}","hash":"32120698435-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n//# sourceMappingURL=outFile.js.map"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js","sourceMap":true}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 864,
          "kind": "text"
        }
      ],
      "hash": "32120698435-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n//# sourceMappingURL=outFile.js.map",
      "mapHash": "-9121204548-{\"version\":3,\"file\":\"outFile.js\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAzB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "module": 2,
      "outFile": "./outFile.js",
      "sourceMap": true
    }
  },
  "version": "FakeTSVersion",
  "size": 2473
}



Change:: should re-emit only js so they dont contain sourcemap
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:29 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:30 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:00:31 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
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


//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":864,"kind":"text"}],"hash":"31952994086-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 864,
          "kind": "text"
        }
      ],
      "hash": "31952994086-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2025
}



Change:: with declaration, emit Dts and should not emit js
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration
[[90m12:00:37 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:38 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:00:39 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "declaration": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.d.ts]
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


//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":864,"kind":"text"}],"hash":"31952994086-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"},"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"hash":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/outFile.js
----------------------------------------------------------------------
text: (0-864)
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
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
File:: /src/outFile.d.ts
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

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 864,
          "kind": "text"
        }
      ],
      "hash": "31952994086-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
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
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2334
}



Change:: with declaration and declarationMap
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration --declarationMap
[[90m12:00:45 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:46 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:00:47 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.d.ts]
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
//# sourceMappingURL=outFile.d.ts.map

//// [/src/outFile.d.ts.map]
{"version":3,"file":"outFile.d.ts","sourceRoot":"","sources":["project/a.ts","project/b.ts","project/c.ts","project/d.ts"],"names":[],"mappings":";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC"}

//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":864,"kind":"text"}],"hash":"31952994086-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"},"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"mapHash":"-4599397025-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC\"}","hash":"-34588067782-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n//# sourceMappingURL=outFile.d.ts.map"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 864,
          "kind": "text"
        }
      ],
      "hash": "31952994086-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 192,
          "kind": "text"
        }
      ],
      "hash": "-34588067782-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n//# sourceMappingURL=outFile.d.ts.map",
      "mapHash": "-4599397025-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true,
      "declarationMap": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2740
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:54 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:55 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/outFile.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: local change
Input::
//// [/src/project/a.ts]
export const a = 10;const aLocal = 100;



Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:57 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:58 AM[0m] Project 'src/project/tsconfig.json' is out of date because output 'src/outFile.tsbuildinfo' is older than input 'src/project/a.ts'

[[90m12:00:59 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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


//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":865,"kind":"text"}],"hash":"-41309964298-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-17390360476-export const a = 10;const aLocal = 100;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/outFile.js
----------------------------------------------------------------------
text: (0-865)
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 865,
          "kind": "text"
        }
      ],
      "hash": "-41309964298-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2028
}



Change:: with declaration and declarationMap
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration --declarationMap
[[90m12:01:05 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:01:06 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:07 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.d.ts] file written with same contents
//// [/src/outFile.d.ts.map] file written with same contents
//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":865,"kind":"text"}],"hash":"-41309964298-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"},"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"mapHash":"-4599397025-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC\"}","hash":"-34588067782-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n//# sourceMappingURL=outFile.d.ts.map"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-17390360476-export const a = 10;const aLocal = 100;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/outFile.js
----------------------------------------------------------------------
text: (0-865)
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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
File:: /src/outFile.d.ts
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

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 865,
          "kind": "text"
        }
      ],
      "hash": "-41309964298-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 192,
          "kind": "text"
        }
      ],
      "hash": "-34588067782-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n//# sourceMappingURL=outFile.d.ts.map",
      "mapHash": "-4599397025-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true,
      "declarationMap": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2743
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:01:14 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:01:15 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/a.ts' is older than output 'src/outFile.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with inlineSourceMap
Input::


Output::
/lib/tsc --b /src/project --verbose --inlineSourceMap
[[90m12:01:16 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:01:17 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:18 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "inlineSourceMap": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0RmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QvYS50cyIsInByb2plY3QvYi50cyIsInByb2plY3QvYy50cyIsInByb2plY3QvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDOzs7Ozs7SUNBMUIsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUNBRCxRQUFBLENBQUMsR0FBRyxLQUFDLENBQUM7Ozs7OztJQ0FOLFFBQUEsQ0FBQyxHQUFHLEtBQUMsQ0FBQyJ9

//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":865,"kind":"text"}],"hash":"-33247521228-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0RmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QvYS50cyIsInByb2plY3QvYi50cyIsInByb2plY3QvYy50cyIsInByb2plY3QvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDOzs7Ozs7SUNBMUIsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUNBRCxRQUFBLENBQUMsR0FBRyxLQUFDLENBQUM7Ozs7OztJQ0FOLFFBQUEsQ0FBQyxHQUFHLEtBQUMsQ0FBQyJ9"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-17390360476-export const a = 10;const aLocal = 100;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"inlineSourceMap":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/outFile.js
----------------------------------------------------------------------
text: (0-865)
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 865,
          "kind": "text"
        }
      ],
      "hash": "-33247521228-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0RmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QvYS50cyIsInByb2plY3QvYi50cyIsInByb2plY3QvYy50cyIsInByb2plY3QvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDOzs7Ozs7SUNBMUIsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUNBRCxRQUFBLENBQUMsR0FBRyxLQUFDLENBQUM7Ozs7OztJQ0FOLFFBQUEsQ0FBQyxHQUFHLEtBQUMsQ0FBQyJ9"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "inlineSourceMap": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2561
}



Change:: with sourceMap
Input::


Output::
/lib/tsc --b /src/project --verbose --sourceMap
[[90m12:01:24 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:01:25 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:26 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "sourceMap": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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
//# sourceMappingURL=outFile.js.map

//// [/src/outFile.js.map]
{"version":3,"file":"outFile.js","sourceRoot":"","sources":["project/a.ts","project/b.ts","project/c.ts","project/d.ts"],"names":[],"mappings":";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,GAAG,CAAC;;;;;;ICA1B,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC"}

//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":865,"kind":"text"}],"mapHash":"-5541118281-{\"version\":3,\"file\":\"outFile.js\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,GAAG,CAAC;;;;;;ICA1B,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC\"}","hash":"-40236925677-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n//# sourceMappingURL=outFile.js.map"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-17390360476-export const a = 10;const aLocal = 100;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js","sourceMap":true}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 865,
          "kind": "text"
        }
      ],
      "hash": "-40236925677-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n//# sourceMappingURL=outFile.js.map",
      "mapHash": "-5541118281-{\"version\":3,\"file\":\"outFile.js\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,GAAG,CAAC;;;;;;ICA1B,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "module": 2,
      "outFile": "./outFile.js",
      "sourceMap": true
    }
  },
  "version": "FakeTSVersion",
  "size": 2476
}



Change:: emit js files
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:01:33 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:01:34 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:35 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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


//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":865,"kind":"text"}],"hash":"-41309964298-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-17390360476-export const a = 10;const aLocal = 100;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 865,
          "kind": "text"
        }
      ],
      "hash": "-41309964298-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2028
}



Change:: with declaration and declarationMap
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration --declarationMap
[[90m12:01:41 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:01:42 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:43 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project/a.ts",
  "/src/project/b.ts",
  "/src/project/c.ts",
  "/src/project/d.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/src/outFile.js",
  "module": 2,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/outFile.d.ts] file written with same contents
//// [/src/outFile.d.ts.map] file written with same contents
//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"js":{"sections":[{"pos":0,"end":865,"kind":"text"}],"hash":"-41309964298-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"},"dts":{"sections":[{"pos":0,"end":192,"kind":"text"}],"mapHash":"-4599397025-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC\"}","hash":"-34588067782-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n//# sourceMappingURL=outFile.d.ts.map"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-17390360476-export const a = 10;const aLocal = 100;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"}},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/outFile.js
----------------------------------------------------------------------
text: (0-865)
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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
File:: /src/outFile.d.ts
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

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 865,
          "kind": "text"
        }
      ],
      "hash": "-41309964298-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.a = void 0;\n    exports.a = 10;\n    var aLocal = 100;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.b = void 0;\n    exports.b = 10;\n    var bLocal = 10;\n});\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.c = void 0;\n    exports.c = a_1.a;\n});\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.d = void 0;\n    exports.d = b_1.b;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 192,
          "kind": "text"
        }
      ],
      "hash": "-34588067782-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n//# sourceMappingURL=outFile.d.ts.map",
      "mapHash": "-4599397025-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true,
      "declarationMap": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 2743
}



Change:: with declaration and declarationMap, should not re-emit
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration --declarationMap
[[90m12:01:50 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:01:51 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/a.ts' is older than output 'src/outFile.tsbuildinfo'

exitCode:: ExitStatus.Success


