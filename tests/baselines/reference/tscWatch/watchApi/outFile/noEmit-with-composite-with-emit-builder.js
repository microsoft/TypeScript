currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outFile": "../outFile.js",
    "module": "amd"
  }
}

//// [/user/username/projects/myproject/main.ts]
export const x = 10;

//// [/user/username/projects/myproject/other.ts]
export const y = 10;

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


tsc --w --noEmit
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/main.ts","./myproject/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-10726455937-export const x = 10;","-13729955264-export const y = 10;"],"root":[2,3],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"changeFileSet":[1,2,3],"version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/main.ts",
    "./myproject/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/main.ts": "-10726455937-export const x = 10;",
    "./myproject/other.ts": "-13729955264-export const y = 10;"
  },
  "root": [
    [
      2,
      "./myproject/main.ts"
    ],
    [
      3,
      "./myproject/other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/main.ts",
    "./myproject/other.ts"
  ],
  "version": "FakeTSVersion",
  "size": 718
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/main.ts: *new*
  {}
/user/username/projects/myproject/other.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "composite": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "noEmit": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

tsc --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/main.ts","./myproject/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-10726455937-export const x = 10;","-13729955264-export const y = 10;"],"root":[2,3],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"outSignature":"3483479585-declare module \"main\" {\n    export const x = 10;\n}\ndeclare module \"other\" {\n    export const y = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/main.ts",
    "./myproject/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/main.ts": "-10726455937-export const x = 10;",
    "./myproject/other.ts": "-13729955264-export const y = 10;"
  },
  "root": [
    [
      2,
      "./myproject/main.ts"
    ],
    [
      3,
      "./myproject/other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../home/src/tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./myproject/main.ts",
      "not cached or not changed"
    ],
    [
      "./myproject/other.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "3483479585-declare module \"main\" {\n    export const x = 10;\n}\ndeclare module \"other\" {\n    export const y = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 913
}

//// [/user/username/projects/outFile.js]
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("other", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 10;
});


//// [/user/username/projects/outFile.d.ts]
declare module "main" {
    export const x = 10;
}
declare module "other" {
    export const y = 10;
}



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500} *new*
/user/username/projects/node_modules/@types:
  {"pollingInterval":500} *new*

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {} *new*
/user/username/projects/myproject/main.ts:
  {} *new*
/user/username/projects/myproject/other.ts:
  {} *new*
/user/username/projects/myproject/tsconfig.json:
  {} *new*

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/main.ts:
  {}
/user/username/projects/myproject/other.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {} *new*

FsWatchesRecursive *deleted*::
/user/username/projects/myproject:
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "composite": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Add comment

Input::
//// [/user/username/projects/myproject/main.ts]
export const x = 10;
// SomeComment


PolledWatches *deleted*::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/main.ts:
  {}
/user/username/projects/myproject/other.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject:
  {}

tsc --w --noEmit
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/main.ts","./myproject/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-14918944530-export const x = 10;\n// SomeComment","-13729955264-export const y = 10;"],"root":[2,3],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"changeFileSet":[2],"outSignature":"3483479585-declare module \"main\" {\n    export const x = 10;\n}\ndeclare module \"other\" {\n    export const y = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/main.ts",
    "./myproject/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/main.ts": "-14918944530-export const x = 10;\n// SomeComment",
    "./myproject/other.ts": "-13729955264-export const y = 10;"
  },
  "root": [
    [
      2,
      "./myproject/main.ts"
    ],
    [
      3,
      "./myproject/other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "./myproject/main.ts"
  ],
  "outSignature": "3483479585-declare module \"main\" {\n    export const x = 10;\n}\ndeclare module \"other\" {\n    export const y = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 912
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/main.ts: *new*
  {}
/user/username/projects/myproject/other.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "composite": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "noEmit": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

tsc --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/main.ts","./myproject/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-14918944530-export const x = 10;\n// SomeComment","-13729955264-export const y = 10;"],"root":[2,3],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"outSignature":"3483479585-declare module \"main\" {\n    export const x = 10;\n}\ndeclare module \"other\" {\n    export const y = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/main.ts",
    "./myproject/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/main.ts": "-14918944530-export const x = 10;\n// SomeComment",
    "./myproject/other.ts": "-13729955264-export const y = 10;"
  },
  "root": [
    [
      2,
      "./myproject/main.ts"
    ],
    [
      3,
      "./myproject/other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../home/src/tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./myproject/main.ts",
      "not cached or not changed"
    ],
    [
      "./myproject/other.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "3483479585-declare module \"main\" {\n    export const x = 10;\n}\ndeclare module \"other\" {\n    export const y = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 929
}

//// [/user/username/projects/outFile.js]
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
// SomeComment
define("other", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 10;
});



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500} *new*
/user/username/projects/node_modules/@types:
  {"pollingInterval":500} *new*

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {} *new*
/user/username/projects/myproject/main.ts:
  {} *new*
/user/username/projects/myproject/other.ts:
  {} *new*
/user/username/projects/myproject/tsconfig.json:
  {} *new*

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/main.ts:
  {}
/user/username/projects/myproject/other.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {} *new*

FsWatchesRecursive *deleted*::
/user/username/projects/myproject:
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "composite": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Add comment

Input::
//// [/user/username/projects/myproject/main.ts]
export const x = 10;
// SomeComment
// SomeComment


PolledWatches *deleted*::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/main.ts:
  {}
/user/username/projects/myproject/other.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject:
  {}

tsc --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/main.ts","./myproject/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16105752451-export const x = 10;\n// SomeComment\n// SomeComment","-13729955264-export const y = 10;"],"root":[2,3],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"outSignature":"3483479585-declare module \"main\" {\n    export const x = 10;\n}\ndeclare module \"other\" {\n    export const y = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/main.ts",
    "./myproject/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/main.ts": "-16105752451-export const x = 10;\n// SomeComment\n// SomeComment",
    "./myproject/other.ts": "-13729955264-export const y = 10;"
  },
  "root": [
    [
      2,
      "./myproject/main.ts"
    ],
    [
      3,
      "./myproject/other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../home/src/tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./myproject/main.ts",
      "not cached or not changed"
    ],
    [
      "./myproject/other.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "3483479585-declare module \"main\" {\n    export const x = 10;\n}\ndeclare module \"other\" {\n    export const y = 10;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 945
}

//// [/user/username/projects/outFile.js]
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
// SomeComment
// SomeComment
define("other", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 10;
});



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/main.ts: *new*
  {}
/user/username/projects/myproject/other.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "composite": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
