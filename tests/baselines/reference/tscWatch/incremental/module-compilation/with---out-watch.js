currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames: false
Input::
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

//// [/users/username/projects/project/file1.ts]
export const x = 10;

//// [/users/username/projects/project/file2.ts]
export const y = 20;

//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "module": "amd",
    "outFile": "out.js"
  }
}


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/out.js]
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});


//// [/users/username/projects/project/out.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file1.ts","./file2.ts"],"js":{"sections":[{"pos":0,"end":406,"kind":"text"}],"hash":"-23721256875-define(\"file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\n"}},"program":{"fileNames":["../../../../a/lib/lib.d.ts","./file1.ts","./file2.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-10726455937-export const x = 10;","-13729954175-export const y = 20;"],"root":[2,3],"options":{"module":2,"outFile":"./out.js"}},"version":"FakeTSVersion"}

//// [/users/username/projects/project/out.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./file1.ts",
      "./file2.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 406,
          "kind": "text"
        }
      ],
      "hash": "-23721256875-define(\"file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      "./file2.ts"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./file1.ts": "-10726455937-export const x = 10;",
      "./file2.ts": "-13729954175-export const y = 20;"
    },
    "root": [
      [
        2,
        "./file1.ts"
      ],
      [
        3,
        "./file2.ts"
      ]
    ],
    "options": {
      "module": 2,
      "outFile": "./out.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 1209
}

//// [/users/username/projects/project/out.tsbuildinfo.baseline.txt]
======================================================================
File:: /users/username/projects/project/out.js
----------------------------------------------------------------------
text: (0-406)
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});

======================================================================


PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/project/file1.ts: *new*
  {}
/users/username/projects/project/file2.ts: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Program root files: [
  "/users/username/projects/project/file1.ts",
  "/users/username/projects/project/file2.ts"
]
Program options: {
  "incremental": true,
  "module": 2,
  "outFile": "/users/username/projects/project/out.js",
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
