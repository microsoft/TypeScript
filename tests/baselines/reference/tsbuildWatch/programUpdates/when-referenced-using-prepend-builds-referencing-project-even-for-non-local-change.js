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

//// [/user/username/projects/sample1/core/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true,"outFile":"index.js"}}

//// [/user/username/projects/sample1/core/index.ts]
function foo() { return 10; }

//// [/user/username/projects/sample1/logic/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true,"outFile":"index.js"},"references":[{"path":"../core","prepend":true}]}

//// [/user/username/projects/sample1/logic/index.ts]
function bar() { return foo() + 1 };


/a/lib/tsc.js -b -w sample1/logic
Output::
>> Screen clear
[[90m12:00:29 AM[0m] Starting compilation in watch mode...

[[90m12:00:52 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/sample1/core/index.ts"]
Program options: {"composite":true,"declaration":true,"outFile":"/user/username/projects/sample1/core/index.js","watch":true,"configFilePath":"/user/username/projects/sample1/core/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: ["/user/username/projects/sample1/logic/index.ts"]
Program options: {"composite":true,"declaration":true,"outFile":"/user/username/projects/sample1/logic/index.js","watch":true,"configFilePath":"/user/username/projects/sample1/logic/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/logic/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

PolledWatches::

FsWatches::
/user/username/projects/sample1/core/tsconfig.json:
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/logic/tsconfig.json:
  {}
/user/username/projects/sample1/logic/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {}
/user/username/projects/sample1/logic:
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/core/index.js]
function foo() { return 10; }


//// [/user/username/projects/sample1/core/index.d.ts]
declare function foo(): number;


//// [/user/username/projects/sample1/core/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":31,"kind":"text"}],"hash":"3919763691-function foo() { return 10; }\r\n"},"dts":{"sections":[{"pos":0,"end":33,"kind":"text"}],"hash":"-94503195-declare function foo(): number;\r\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","5450201652-function foo() { return 10; }"],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"-94503195-declare function foo(): number;\r\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/index.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 31,
          "kind": "text"
        }
      ],
      "hash": "3919763691-function foo() { return 10; }\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 33,
          "kind": "text"
        }
      ],
      "hash": "-94503195-declare function foo(): number;\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./index.ts": "5450201652-function foo() { return 10; }"
    },
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./index.js"
    },
    "outSignature": "-94503195-declare function foo(): number;\r\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 973
}

//// [/user/username/projects/sample1/core/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/core/index.js
----------------------------------------------------------------------
text: (0-31)
function foo() { return 10; }

======================================================================
======================================================================
File:: /user/username/projects/sample1/core/index.d.ts
----------------------------------------------------------------------
text: (0-33)
declare function foo(): number;

======================================================================

//// [/user/username/projects/sample1/logic/index.js]
function foo() { return 10; }
function bar() { return foo() + 1; }
;


//// [/user/username/projects/sample1/logic/index.d.ts]
declare function foo(): number;
declare function bar(): number;


//// [/user/username/projects/sample1/logic/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":31,"kind":"prepend","data":"../core/index.js","texts":[{"pos":0,"end":31,"kind":"text"}]},{"pos":31,"end":72,"kind":"text"}],"hash":"14345358628-function foo() { return 10; }\r\nfunction bar() { return foo() + 1; }\r\n;\r\n"},"dts":{"sections":[{"pos":0,"end":33,"kind":"prepend","data":"../core/index.d.ts","texts":[{"pos":0,"end":33,"kind":"text"}]},{"pos":33,"end":66,"kind":"text"}],"hash":"6972815766-declare function foo(): number;\r\ndeclare function bar(): number;\r\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../core/index.d.ts","./index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-94503195-declare function foo(): number;\r\n","5542925109-function bar() { return foo() + 1 };"],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"6972815766-declare function foo(): number;\r\ndeclare function bar(): number;\r\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/logic/index.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 31,
          "kind": "prepend",
          "data": "../core/index.js",
          "texts": [
            {
              "pos": 0,
              "end": 31,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 31,
          "end": 72,
          "kind": "text"
        }
      ],
      "hash": "14345358628-function foo() { return 10; }\r\nfunction bar() { return foo() + 1; }\r\n;\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 33,
          "kind": "prepend",
          "data": "../core/index.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 33,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 33,
          "end": 66,
          "kind": "text"
        }
      ],
      "hash": "6972815766-declare function foo(): number;\r\ndeclare function bar(): number;\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../core/index.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "../core/index.d.ts": "-94503195-declare function foo(): number;\r\n",
      "./index.ts": "5542925109-function bar() { return foo() + 1 };"
    },
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./index.js"
    },
    "outSignature": "6972815766-declare function foo(): number;\r\ndeclare function bar(): number;\r\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1381
}

//// [/user/username/projects/sample1/logic/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/logic/index.js
----------------------------------------------------------------------
prepend: (0-31):: ../core/index.js texts:: 1
>>--------------------------------------------------------------------
text: (0-31)
function foo() { return 10; }

----------------------------------------------------------------------
text: (31-72)
function bar() { return foo() + 1; }
;

======================================================================
======================================================================
File:: /user/username/projects/sample1/logic/index.d.ts
----------------------------------------------------------------------
prepend: (0-33):: ../core/index.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-33)
declare function foo(): number;

----------------------------------------------------------------------
text: (33-66)
declare function bar(): number;

======================================================================


Change:: Make non local change and build core

Input::
//// [/user/username/projects/sample1/core/index.ts]
function foo() { return 10; }
function myFunc() { return 10; }


Output::
>> Screen clear
[[90m12:00:56 AM[0m] File change detected. Starting incremental compilation...



Program root files: ["/user/username/projects/sample1/core/index.ts"]
Program options: {"composite":true,"declaration":true,"outFile":"/user/username/projects/sample1/core/index.js","watch":true,"configFilePath":"/user/username/projects/sample1/core/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

PolledWatches::

FsWatches::
/user/username/projects/sample1/core/tsconfig.json:
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/logic/tsconfig.json:
  {}
/user/username/projects/sample1/logic/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {}
/user/username/projects/sample1/logic:
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/core/index.js]
function foo() { return 10; }
function myFunc() { return 10; }


//// [/user/username/projects/sample1/core/index.d.ts]
declare function foo(): number;
declare function myFunc(): number;


//// [/user/username/projects/sample1/core/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":65,"kind":"text"}],"hash":"4398839647-function foo() { return 10; }\r\nfunction myFunc() { return 10; }\r\n"},"dts":{"sections":[{"pos":0,"end":69,"kind":"text"}],"hash":"-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-3957203077-function foo() { return 10; }\nfunction myFunc() { return 10; }"],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/index.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 65,
          "kind": "text"
        }
      ],
      "hash": "4398839647-function foo() { return 10; }\r\nfunction myFunc() { return 10; }\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 69,
          "kind": "text"
        }
      ],
      "hash": "-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./index.ts": "-3957203077-function foo() { return 10; }\nfunction myFunc() { return 10; }"
    },
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./index.js"
    },
    "outSignature": "-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1124
}

//// [/user/username/projects/sample1/core/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/core/index.js
----------------------------------------------------------------------
text: (0-65)
function foo() { return 10; }
function myFunc() { return 10; }

======================================================================
======================================================================
File:: /user/username/projects/sample1/core/index.d.ts
----------------------------------------------------------------------
text: (0-69)
declare function foo(): number;
declare function myFunc(): number;

======================================================================


Change:: Build logic

Input::

Output::
[[90m12:01:29 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/sample1/logic/index.ts"]
Program options: {"composite":true,"declaration":true,"outFile":"/user/username/projects/sample1/logic/index.js","watch":true,"configFilePath":"/user/username/projects/sample1/logic/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/logic/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

PolledWatches::

FsWatches::
/user/username/projects/sample1/core/tsconfig.json:
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/logic/tsconfig.json:
  {}
/user/username/projects/sample1/logic/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {}
/user/username/projects/sample1/logic:
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/logic/index.js]
function foo() { return 10; }
function myFunc() { return 10; }
function bar() { return foo() + 1; }
;


//// [/user/username/projects/sample1/logic/index.d.ts]
declare function foo(): number;
declare function myFunc(): number;
declare function bar(): number;


//// [/user/username/projects/sample1/logic/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":65,"kind":"prepend","data":"../core/index.js","texts":[{"pos":0,"end":65,"kind":"text"}]},{"pos":65,"end":106,"kind":"text"}],"hash":"3972873752-function foo() { return 10; }\r\nfunction myFunc() { return 10; }\r\nfunction bar() { return foo() + 1; }\r\n;\r\n"},"dts":{"sections":[{"pos":0,"end":69,"kind":"prepend","data":"../core/index.d.ts","texts":[{"pos":0,"end":69,"kind":"text"}]},{"pos":69,"end":102,"kind":"text"}],"hash":"-20001340-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\ndeclare function bar(): number;\r\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../core/index.d.ts","./index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n","5542925109-function bar() { return foo() + 1 };"],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"-20001340-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\ndeclare function bar(): number;\r\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/logic/index.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 65,
          "kind": "prepend",
          "data": "../core/index.js",
          "texts": [
            {
              "pos": 0,
              "end": 65,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 65,
          "end": 106,
          "kind": "text"
        }
      ],
      "hash": "3972873752-function foo() { return 10; }\r\nfunction myFunc() { return 10; }\r\nfunction bar() { return foo() + 1; }\r\n;\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 69,
          "kind": "prepend",
          "data": "../core/index.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 69,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 69,
          "end": 102,
          "kind": "text"
        }
      ],
      "hash": "-20001340-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\ndeclare function bar(): number;\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../core/index.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "../core/index.d.ts": "-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n",
      "./index.ts": "5542925109-function bar() { return foo() + 1 };"
    },
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./index.js"
    },
    "outSignature": "-20001340-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\ndeclare function bar(): number;\r\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1532
}

//// [/user/username/projects/sample1/logic/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/logic/index.js
----------------------------------------------------------------------
prepend: (0-65):: ../core/index.js texts:: 1
>>--------------------------------------------------------------------
text: (0-65)
function foo() { return 10; }
function myFunc() { return 10; }

----------------------------------------------------------------------
text: (65-106)
function bar() { return foo() + 1; }
;

======================================================================
======================================================================
File:: /user/username/projects/sample1/logic/index.d.ts
----------------------------------------------------------------------
prepend: (0-69):: ../core/index.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-69)
declare function foo(): number;
declare function myFunc(): number;

----------------------------------------------------------------------
text: (69-102)
declare function bar(): number;

======================================================================


Change:: Make local change and build core

Input::
//// [/user/username/projects/sample1/core/index.ts]
function foo() { return 10; }
function myFunc() { return 100; }


Output::
>> Screen clear
[[90m12:01:33 AM[0m] File change detected. Starting incremental compilation...



Program root files: ["/user/username/projects/sample1/core/index.ts"]
Program options: {"composite":true,"declaration":true,"outFile":"/user/username/projects/sample1/core/index.js","watch":true,"configFilePath":"/user/username/projects/sample1/core/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

PolledWatches::

FsWatches::
/user/username/projects/sample1/core/tsconfig.json:
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/logic/tsconfig.json:
  {}
/user/username/projects/sample1/logic/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {}
/user/username/projects/sample1/logic:
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/core/index.js]
function foo() { return 10; }
function myFunc() { return 100; }


//// [/user/username/projects/sample1/core/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":66,"kind":"text"}],"hash":"3026098063-function foo() { return 10; }\r\nfunction myFunc() { return 100; }\r\n"},"dts":{"sections":[{"pos":0,"end":69,"kind":"text"}],"hash":"-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-6034018805-function foo() { return 10; }\nfunction myFunc() { return 100; }"],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/index.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 66,
          "kind": "text"
        }
      ],
      "hash": "3026098063-function foo() { return 10; }\r\nfunction myFunc() { return 100; }\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 69,
          "kind": "text"
        }
      ],
      "hash": "-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./index.ts": "-6034018805-function foo() { return 10; }\nfunction myFunc() { return 100; }"
    },
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./index.js"
    },
    "outSignature": "-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1126
}

//// [/user/username/projects/sample1/core/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/core/index.js
----------------------------------------------------------------------
text: (0-66)
function foo() { return 10; }
function myFunc() { return 100; }

======================================================================
======================================================================
File:: /user/username/projects/sample1/core/index.d.ts
----------------------------------------------------------------------
text: (0-69)
declare function foo(): number;
declare function myFunc(): number;

======================================================================


Change:: Build logic

Input::

Output::
[[90m12:02:00 AM[0m] Found 0 errors. Watching for file changes.



PolledWatches::

FsWatches::
/user/username/projects/sample1/core/tsconfig.json:
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/logic/tsconfig.json:
  {}
/user/username/projects/sample1/logic/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {}
/user/username/projects/sample1/logic:
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/logic/index.js]
function foo() { return 10; }
function myFunc() { return 100; }
function bar() { return foo() + 1; }
;


//// [/user/username/projects/sample1/logic/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":66,"kind":"prepend","data":"../core/index.js","texts":[{"pos":0,"end":66,"kind":"text"}]},{"pos":66,"end":107,"kind":"text"}],"hash":"4338406472-function foo() { return 10; }\r\nfunction myFunc() { return 100; }\r\nfunction bar() { return foo() + 1; }\r\n;\r\n"},"dts":{"sections":[{"pos":0,"end":69,"kind":"prepend","data":"../core/index.d.ts","texts":[{"pos":0,"end":69,"kind":"text"}]},{"pos":69,"end":102,"kind":"text"}],"hash":"-20001340-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\ndeclare function bar(): number;\r\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../core/index.d.ts","./index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n","5542925109-function bar() { return foo() + 1 };"],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"-20001340-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\ndeclare function bar(): number;\r\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/logic/index.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 66,
          "kind": "prepend",
          "data": "../core/index.js",
          "texts": [
            {
              "pos": 0,
              "end": 66,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 66,
          "end": 107,
          "kind": "text"
        }
      ],
      "hash": "4338406472-function foo() { return 10; }\r\nfunction myFunc() { return 100; }\r\nfunction bar() { return foo() + 1; }\r\n;\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 69,
          "kind": "prepend",
          "data": "../core/index.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 69,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 69,
          "end": 102,
          "kind": "text"
        }
      ],
      "hash": "-20001340-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\ndeclare function bar(): number;\r\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../core/index.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "../core/index.d.ts": "-2252796589-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\n",
      "./index.ts": "5542925109-function bar() { return foo() + 1 };"
    },
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./index.js"
    },
    "outSignature": "-20001340-declare function foo(): number;\r\ndeclare function myFunc(): number;\r\ndeclare function bar(): number;\r\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1533
}

//// [/user/username/projects/sample1/logic/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/logic/index.js
----------------------------------------------------------------------
prepend: (0-66):: ../core/index.js texts:: 1
>>--------------------------------------------------------------------
text: (0-66)
function foo() { return 10; }
function myFunc() { return 100; }

----------------------------------------------------------------------
text: (66-107)
function bar() { return foo() + 1; }
;

======================================================================
======================================================================
File:: /user/username/projects/sample1/logic/index.d.ts
----------------------------------------------------------------------
prepend: (0-69):: ../core/index.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-69)
declare function foo(): number;
declare function myFunc(): number;

----------------------------------------------------------------------
text: (69-102)
declare function bar(): number;

======================================================================

