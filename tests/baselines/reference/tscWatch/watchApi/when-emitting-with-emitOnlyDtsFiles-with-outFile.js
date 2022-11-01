Input::
//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"composite":true,"noEmitOnError":true,"module":"amd","outFile":"outFile.js"},"files":["a.ts","b.ts"]}

//// [/user/username/projects/myproject/a.ts]
export const x = 10;

//// [/user/username/projects/myproject/b.ts]
export const y: 10 = 20;

//// [/a/lib/lib.d.ts]
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


/a/lib/tsc.js --w --extendedDiagnostics
Output::
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
  options: {"composite":true,"noEmitOnError":true,"module":2,"outFile":"/user/username/projects/myproject/outFile.js","extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
[96mb.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType '20' is not assignable to type '10'.

[7m1[0m export const y: 10 = 20;
[7m [0m [91m             ~[0m

[[90m12:00:24 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"composite":true,"noEmitOnError":true,"module":2,"outFile":"/user/username/projects/myproject/outFile.js","extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/a.ts:
  {}
/user/username/projects/myproject/b.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Fix error but run emit with emitOnlyDts

Input::
//// [/user/username/projects/myproject/b.ts]
export const y = 10;


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 250 undefined Source file
Synchronizing program
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
  options: {"composite":true,"noEmitOnError":true,"module":2,"outFile":"/user/username/projects/myproject/outFile.js","extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"composite":true,"noEmitOnError":true,"module":2,"outFile":"/user/username/projects/myproject/outFile.js","extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/a.ts:
  {}
/user/username/projects/myproject/b.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/outFile.d.ts]
declare module "a" {
    export const x = 10;
}
declare module "b" {
    export const y = 10;
}


//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./a.ts","./b.ts"],"dts":{"sections":[{"pos":0,"end":96,"kind":"text"}],"hash":"-4206946595-declare module \"a\" {\n    export const x = 10;\n}\ndeclare module \"b\" {\n    export const y = 10;\n}\n"}},"program":{"fileNames":["../../../../a/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-10726455937-export const x = 10;","-13729955264-export const y = 10;"],"options":{"composite":true,"module":2,"noEmitOnError":true,"outFile":"./outFile.js"},"outSignature":"-4206946595-declare module \"a\" {\n    export const x = 10;\n}\ndeclare module \"b\" {\n    export const y = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts","pendingEmit":1},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./a.ts",
      "./b.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 96,
          "kind": "text"
        }
      ],
      "hash": "-4206946595-declare module \"a\" {\n    export const x = 10;\n}\ndeclare module \"b\" {\n    export const y = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./a.ts": "-10726455937-export const x = 10;",
      "./b.ts": "-13729955264-export const y = 10;"
    },
    "options": {
      "composite": true,
      "module": 2,
      "noEmitOnError": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-4206946595-declare module \"a\" {\n    export const x = 10;\n}\ndeclare module \"b\" {\n    export const y = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts",
    "pendingEmit": [
      "Js",
      1
    ]
  },
  "version": "FakeTSVersion",
  "size": 1081
}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/myproject/outFile.js
======================================================================
======================================================================
File:: /user/username/projects/myproject/outFile.d.ts
----------------------------------------------------------------------
text: (0-96)
declare module "a" {
    export const x = 10;
}
declare module "b" {
    export const y = 10;
}

======================================================================


Change:: Emit with emitOnlyDts shouldnt emit anything

Input::

Output::

Program: Same as old program

BuilderProgram: Same as old builder program

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/a.ts:
  {}
/user/username/projects/myproject/b.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Emit all files

Input::
//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./a.ts","./b.ts"],"js":{"sections":[{"pos":0,"end":326,"kind":"text"}],"hash":"13183887368-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.y = void 0;\n    exports.y = 10;\n});\n"},"dts":{"sections":[{"pos":0,"end":96,"kind":"text"}],"hash":"-4206946595-declare module \"a\" {\n    export const x = 10;\n}\ndeclare module \"b\" {\n    export const y = 10;\n}\n"}},"program":{"fileNames":["../../../../a/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-10726455937-export const x = 10;","-13729955264-export const y = 10;"],"options":{"composite":true,"module":2,"noEmitOnError":true,"outFile":"./outFile.js"},"outSignature":"-4206946595-declare module \"a\" {\n    export const x = 10;\n}\ndeclare module \"b\" {\n    export const y = 10;\n}\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./a.ts",
      "./b.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 326,
          "kind": "text"
        }
      ],
      "hash": "13183887368-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    exports.__esModule = true;\n    exports.y = void 0;\n    exports.y = 10;\n});\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 96,
          "kind": "text"
        }
      ],
      "hash": "-4206946595-declare module \"a\" {\n    export const x = 10;\n}\ndeclare module \"b\" {\n    export const y = 10;\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./a.ts": "-10726455937-export const x = 10;",
      "./b.ts": "-13729955264-export const y = 10;"
    },
    "options": {
      "composite": true,
      "module": 2,
      "noEmitOnError": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-4206946595-declare module \"a\" {\n    export const x = 10;\n}\ndeclare module \"b\" {\n    export const y = 10;\n}\n",
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1495
}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/myproject/outFile.js
----------------------------------------------------------------------
text: (0-326)
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.y = void 0;
    exports.y = 10;
});

======================================================================
======================================================================
File:: /user/username/projects/myproject/outFile.d.ts
----------------------------------------------------------------------
text: (0-96)
declare module "a" {
    export const x = 10;
}
declare module "b" {
    export const y = 10;
}

======================================================================

//// [/user/username/projects/myproject/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.y = void 0;
    exports.y = 10;
});



Output::

Program: Same as old program

BuilderProgram: Same as old builder program

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/a.ts:
  {}
/user/username/projects/myproject/b.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Emit with emitOnlyDts shouldnt emit anything

Input::

Output::

Program: Same as old program

BuilderProgram: Same as old builder program

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/a.ts:
  {}
/user/username/projects/myproject/b.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Emit full should not emit anything

Input::

Output::

Program: Same as old program

BuilderProgram: Same as old builder program

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/a.ts:
  {}
/user/username/projects/myproject/b.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

