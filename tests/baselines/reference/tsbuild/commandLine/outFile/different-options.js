currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outFile": "../outFile.js",
    "module": "amd"
  }
}

//// [/home/src/workspaces/project/a.ts]
export const a = 10;const aLocal = 10;

//// [/home/src/workspaces/project/b.ts]
export const b = 10;const bLocal = 10;

//// [/home/src/workspaces/project/c.ts]
import { a } from "./a";export const c = a;

//// [/home/src/workspaces/project/d.ts]
import { b } from "./b";export const d = b;

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


/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file '../outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    const aLocal = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
    const bLocal = 10;
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


//// [/home/src/workspaces/outFile.d.ts]
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


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "composite": true,
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
    ],
    [
      "./project/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1223
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: with sourceMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose --sourceMap
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    const aLocal = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
    const bLocal = 10;
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

//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js","sourceMap":true},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js",
    "sourceMap": true
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
    ],
    [
      "./project/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1240
}

//// [/home/src/workspaces/outFile.js.map]
{"version":3,"file":"outFile.js","sourceRoot":"","sources":["project/a.ts","project/b.ts","project/c.ts","project/d.ts"],"names":[],"mappings":";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,MAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAzB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,MAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC"}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "sourceMap": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: should re-emit only js so they dont contain sourcemap

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    const aLocal = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
    const bLocal = 10;
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


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "composite": true,
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
    ],
    [
      "./project/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1223
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: with declaration should not emit anything

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose --declaration
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.




Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.




Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: with declaration and declarationMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose --declaration --declarationMap
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.d.ts]
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

//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "composite": true,
    "declaration": true,
    "declarationMap": true,
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
    ],
    [
      "./project/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1264
}

//// [/home/src/workspaces/outFile.d.ts.map]
{"version":3,"file":"outFile.d.ts","sourceRoot":"","sources":["project/a.ts","project/b.ts","project/c.ts","project/d.ts"],"names":[],"mappings":";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC"}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "declaration": true,
  "declarationMap": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: should re-emit only dts so they dont contain sourcemap

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.d.ts]
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


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "composite": true,
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
    ],
    [
      "./project/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1223
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: with emitDeclarationOnly should not emit anything

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose --emitDeclarationOnly
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.




Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.




Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: local change

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = 10;const aLocal = 100;


/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    const aLocal = 100;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
    const bLocal = 10;
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


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-17390360476-export const a = 10;const aLocal = 100;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "composite": true,
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
    ],
    [
      "./project/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1224
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: with declaration should not emit anything

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose --declaration
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.




Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "declaration": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: with inlineSourceMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose --inlineSourceMap
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    const aLocal = 100;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
    const bLocal = 10;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0RmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QvYS50cyIsInByb2plY3QvYi50cyIsInByb2plY3QvYy50cyIsInByb2plY3QvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDOzs7Ozs7SUNBMUIsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUNBRCxRQUFBLENBQUMsR0FBRyxLQUFDLENBQUM7Ozs7OztJQ0FOLFFBQUEsQ0FBQyxHQUFHLEtBQUMsQ0FBQyJ9

//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-17390360476-export const a = 10;const aLocal = 100;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"inlineSourceMap":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "composite": true,
    "inlineSourceMap": true,
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
    ],
    [
      "./project/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1247
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "inlineSourceMap": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: with sourceMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose --sourceMap
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
    const aLocal = 100;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
    const bLocal = 10;
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

//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-17390360476-export const a = 10;const aLocal = 100;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"composite":true,"module":2,"outFile":"./outFile.js","sourceMap":true},"semanticDiagnosticsPerFile":[1,2,3,4,5],"outSignature":"-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js",
    "sourceMap": true
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
    ],
    [
      "./project/d.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 1241
}

//// [/home/src/workspaces/outFile.js.map]
{"version":3,"file":"outFile.js","sourceRoot":"","sources":["project/a.ts","project/b.ts","project/c.ts","project/d.ts"],"names":[],"mappings":";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,MAAM,MAAM,GAAG,GAAG,CAAC;;;;;;ICA1B,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,MAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC"}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "composite": true,
  "outFile": "/home/src/workspaces/outFile.js",
  "module": 2,
  "sourceMap": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
