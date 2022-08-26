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

WatchedFiles::
/user/username/projects/sample1/core/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/core/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/core/index.ts:
  {"fileName":"/user/username/projects/sample1/core/index.ts","pollingInterval":250}
/user/username/projects/sample1/logic/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/logic/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/logic/index.ts:
  {"fileName":"/user/username/projects/sample1/logic/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {"directoryName":"/user/username/projects/sample1/core"}
/user/username/projects/sample1/logic:
  {"directoryName":"/user/username/projects/sample1/logic"}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/core/index.js]
function foo() { return 10; }


//// [/user/username/projects/sample1/core/index.d.ts]
declare function foo(): number;


//// [/user/username/projects/sample1/core/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":30,"kind":"text"}],"hash":"3762995390-function foo() { return 10; }\n"},"dts":{"sections":[{"pos":0,"end":32,"kind":"text"}],"hash":"517738360-declare function foo(): number;\n"}},"program":{"fileNames":["./index.ts"],"fileInfos":["5450201652-function foo() { return 10; }"],"options":{"composite":true,"outFile":"./index.js"},"outSignature":"517738360-declare function foo(): number;\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

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
          "end": 30,
          "kind": "text"
        }
      ],
      "hash": "3762995390-function foo() { return 10; }\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 32,
          "kind": "text"
        }
      ],
      "hash": "517738360-declare function foo(): number;\n"
    }
  },
  "program": {
    "fileNames": [
      "./index.ts"
    ],
    "fileInfos": {
      "./index.ts": "5450201652-function foo() { return 10; }"
    },
    "options": {
      "composite": true,
      "outFile": "./index.js"
    },
    "outSignature": "517738360-declare function foo(): number;\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 555
}

//// [/user/username/projects/sample1/core/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/core/index.js
----------------------------------------------------------------------
text: (0-30)
function foo() { return 10; }

======================================================================
======================================================================
File:: /user/username/projects/sample1/core/index.d.ts
----------------------------------------------------------------------
text: (0-32)
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
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":30,"kind":"prepend","data":"../core/index.js","texts":[{"pos":0,"end":30,"kind":"text"}]},{"pos":30,"end":69,"kind":"text"}],"hash":"9692417533-function foo() { return 10; }\nfunction bar() { return foo() + 1; }\n;\n"},"dts":{"sections":[{"pos":0,"end":32,"kind":"prepend","data":"../core/index.d.ts","texts":[{"pos":0,"end":32,"kind":"text"}]},{"pos":32,"end":64,"kind":"text"}],"hash":"9641219228-declare function foo(): number;\ndeclare function bar(): number;\n"}},"program":{"fileNames":["./index.ts"],"fileInfos":["5542925109-function bar() { return foo() + 1 };"],"options":{"composite":true,"outFile":"./index.js"},"outSignature":"9641219228-declare function foo(): number;\ndeclare function bar(): number;\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

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
          "end": 30,
          "kind": "prepend",
          "data": "../core/index.js",
          "texts": [
            {
              "pos": 0,
              "end": 30,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 30,
          "end": 69,
          "kind": "text"
        }
      ],
      "hash": "9692417533-function foo() { return 10; }\nfunction bar() { return foo() + 1; }\n;\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 32,
          "kind": "prepend",
          "data": "../core/index.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 32,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 32,
          "end": 64,
          "kind": "text"
        }
      ],
      "hash": "9641219228-declare function foo(): number;\ndeclare function bar(): number;\n"
    }
  },
  "program": {
    "fileNames": [
      "./index.ts"
    ],
    "fileInfos": {
      "./index.ts": "5542925109-function bar() { return foo() + 1 };"
    },
    "options": {
      "composite": true,
      "outFile": "./index.js"
    },
    "outSignature": "9641219228-declare function foo(): number;\ndeclare function bar(): number;\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 885
}

//// [/user/username/projects/sample1/logic/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/logic/index.js
----------------------------------------------------------------------
prepend: (0-30):: ../core/index.js texts:: 1
>>--------------------------------------------------------------------
text: (0-30)
function foo() { return 10; }

----------------------------------------------------------------------
text: (30-69)
function bar() { return foo() + 1; }
;

======================================================================
======================================================================
File:: /user/username/projects/sample1/logic/index.d.ts
----------------------------------------------------------------------
prepend: (0-32):: ../core/index.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-32)
declare function foo(): number;

----------------------------------------------------------------------
text: (32-64)
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

WatchedFiles::
/user/username/projects/sample1/core/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/core/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/core/index.ts:
  {"fileName":"/user/username/projects/sample1/core/index.ts","pollingInterval":250}
/user/username/projects/sample1/logic/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/logic/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/logic/index.ts:
  {"fileName":"/user/username/projects/sample1/logic/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {"directoryName":"/user/username/projects/sample1/core"}
/user/username/projects/sample1/logic:
  {"directoryName":"/user/username/projects/sample1/logic"}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/core/index.js]
function foo() { return 10; }
function myFunc() { return 10; }


//// [/user/username/projects/sample1/core/index.d.ts]
declare function foo(): number;
declare function myFunc(): number;


//// [/user/username/projects/sample1/core/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":63,"kind":"text"}],"hash":"-6033649947-function foo() { return 10; }\nfunction myFunc() { return 10; }\n"},"dts":{"sections":[{"pos":0,"end":67,"kind":"text"}],"hash":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n"}},"program":{"fileNames":["./index.ts"],"fileInfos":["-3957203077-function foo() { return 10; }\nfunction myFunc() { return 10; }"],"options":{"composite":true,"outFile":"./index.js"},"outSignature":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

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
          "end": 63,
          "kind": "text"
        }
      ],
      "hash": "-6033649947-function foo() { return 10; }\nfunction myFunc() { return 10; }\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 67,
          "kind": "text"
        }
      ],
      "hash": "2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n"
    }
  },
  "program": {
    "fileNames": [
      "./index.ts"
    ],
    "fileInfos": {
      "./index.ts": "-3957203077-function foo() { return 10; }\nfunction myFunc() { return 10; }"
    },
    "options": {
      "composite": true,
      "outFile": "./index.js"
    },
    "outSignature": "2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 699
}

//// [/user/username/projects/sample1/core/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/core/index.js
----------------------------------------------------------------------
text: (0-63)
function foo() { return 10; }
function myFunc() { return 10; }

======================================================================
======================================================================
File:: /user/username/projects/sample1/core/index.d.ts
----------------------------------------------------------------------
text: (0-67)
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

WatchedFiles::
/user/username/projects/sample1/core/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/core/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/core/index.ts:
  {"fileName":"/user/username/projects/sample1/core/index.ts","pollingInterval":250}
/user/username/projects/sample1/logic/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/logic/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/logic/index.ts:
  {"fileName":"/user/username/projects/sample1/logic/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {"directoryName":"/user/username/projects/sample1/core"}
/user/username/projects/sample1/logic:
  {"directoryName":"/user/username/projects/sample1/logic"}

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
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":63,"kind":"prepend","data":"../core/index.js","texts":[{"pos":0,"end":63,"kind":"text"}]},{"pos":63,"end":102,"kind":"text"}],"hash":"-12608297404-function foo() { return 10; }\nfunction myFunc() { return 10; }\nfunction bar() { return foo() + 1; }\n;\n"},"dts":{"sections":[{"pos":0,"end":67,"kind":"prepend","data":"../core/index.d.ts","texts":[{"pos":0,"end":67,"kind":"text"}]},{"pos":67,"end":99,"kind":"text"}],"hash":"-2581247747-declare function foo(): number;\ndeclare function myFunc(): number;\ndeclare function bar(): number;\n"}},"program":{"fileNames":["./index.ts"],"fileInfos":["5542925109-function bar() { return foo() + 1 };"],"options":{"composite":true,"outFile":"./index.js"},"outSignature":"-2581247747-declare function foo(): number;\ndeclare function myFunc(): number;\ndeclare function bar(): number;\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

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
          "end": 63,
          "kind": "prepend",
          "data": "../core/index.js",
          "texts": [
            {
              "pos": 0,
              "end": 63,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 63,
          "end": 102,
          "kind": "text"
        }
      ],
      "hash": "-12608297404-function foo() { return 10; }\nfunction myFunc() { return 10; }\nfunction bar() { return foo() + 1; }\n;\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 67,
          "kind": "prepend",
          "data": "../core/index.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 67,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 67,
          "end": 99,
          "kind": "text"
        }
      ],
      "hash": "-2581247747-declare function foo(): number;\ndeclare function myFunc(): number;\ndeclare function bar(): number;\n"
    }
  },
  "program": {
    "fileNames": [
      "./index.ts"
    ],
    "fileInfos": {
      "./index.ts": "5542925109-function bar() { return foo() + 1 };"
    },
    "options": {
      "composite": true,
      "outFile": "./index.js"
    },
    "outSignature": "-2581247747-declare function foo(): number;\ndeclare function myFunc(): number;\ndeclare function bar(): number;\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 996
}

//// [/user/username/projects/sample1/logic/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/logic/index.js
----------------------------------------------------------------------
prepend: (0-63):: ../core/index.js texts:: 1
>>--------------------------------------------------------------------
text: (0-63)
function foo() { return 10; }
function myFunc() { return 10; }

----------------------------------------------------------------------
text: (63-102)
function bar() { return foo() + 1; }
;

======================================================================
======================================================================
File:: /user/username/projects/sample1/logic/index.d.ts
----------------------------------------------------------------------
prepend: (0-67):: ../core/index.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-67)
declare function foo(): number;
declare function myFunc(): number;

----------------------------------------------------------------------
text: (67-99)
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

WatchedFiles::
/user/username/projects/sample1/core/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/core/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/core/index.ts:
  {"fileName":"/user/username/projects/sample1/core/index.ts","pollingInterval":250}
/user/username/projects/sample1/logic/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/logic/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/logic/index.ts:
  {"fileName":"/user/username/projects/sample1/logic/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {"directoryName":"/user/username/projects/sample1/core"}
/user/username/projects/sample1/logic:
  {"directoryName":"/user/username/projects/sample1/logic"}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/core/index.js]
function foo() { return 10; }
function myFunc() { return 100; }


//// [/user/username/projects/sample1/core/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":64,"kind":"text"}],"hash":"-5849092235-function foo() { return 10; }\nfunction myFunc() { return 100; }\n"},"dts":{"sections":[{"pos":0,"end":67,"kind":"text"}],"hash":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n"}},"program":{"fileNames":["./index.ts"],"fileInfos":["-6034018805-function foo() { return 10; }\nfunction myFunc() { return 100; }"],"options":{"composite":true,"outFile":"./index.js"},"outSignature":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

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
          "end": 64,
          "kind": "text"
        }
      ],
      "hash": "-5849092235-function foo() { return 10; }\nfunction myFunc() { return 100; }\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 67,
          "kind": "text"
        }
      ],
      "hash": "2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n"
    }
  },
  "program": {
    "fileNames": [
      "./index.ts"
    ],
    "fileInfos": {
      "./index.ts": "-6034018805-function foo() { return 10; }\nfunction myFunc() { return 100; }"
    },
    "options": {
      "composite": true,
      "outFile": "./index.js"
    },
    "outSignature": "2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 701
}

//// [/user/username/projects/sample1/core/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/core/index.js
----------------------------------------------------------------------
text: (0-64)
function foo() { return 10; }
function myFunc() { return 100; }

======================================================================
======================================================================
File:: /user/username/projects/sample1/core/index.d.ts
----------------------------------------------------------------------
text: (0-67)
declare function foo(): number;
declare function myFunc(): number;

======================================================================


Change:: Build logic

Input::

Output::
[[90m12:02:00 AM[0m] Found 0 errors. Watching for file changes.



WatchedFiles::
/user/username/projects/sample1/core/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/core/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/core/index.ts:
  {"fileName":"/user/username/projects/sample1/core/index.ts","pollingInterval":250}
/user/username/projects/sample1/logic/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/logic/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/logic/index.ts:
  {"fileName":"/user/username/projects/sample1/logic/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {"directoryName":"/user/username/projects/sample1/core"}
/user/username/projects/sample1/logic:
  {"directoryName":"/user/username/projects/sample1/logic"}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/logic/index.js]
function foo() { return 10; }
function myFunc() { return 100; }
function bar() { return foo() + 1; }
;


//// [/user/username/projects/sample1/logic/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":64,"kind":"prepend","data":"../core/index.js","texts":[{"pos":0,"end":64,"kind":"text"}]},{"pos":64,"end":103,"kind":"text"}],"hash":"-1300839212-function foo() { return 10; }\nfunction myFunc() { return 100; }\nfunction bar() { return foo() + 1; }\n;\n"},"dts":{"sections":[{"pos":0,"end":67,"kind":"prepend","data":"../core/index.d.ts","texts":[{"pos":0,"end":67,"kind":"text"}]},{"pos":67,"end":99,"kind":"text"}],"hash":"-2581247747-declare function foo(): number;\ndeclare function myFunc(): number;\ndeclare function bar(): number;\n"}},"program":{"fileNames":["./index.ts"],"fileInfos":["5542925109-function bar() { return foo() + 1 };"],"options":{"composite":true,"outFile":"./index.js"},"outSignature":"-2581247747-declare function foo(): number;\ndeclare function myFunc(): number;\ndeclare function bar(): number;\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

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
          "end": 64,
          "kind": "prepend",
          "data": "../core/index.js",
          "texts": [
            {
              "pos": 0,
              "end": 64,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 64,
          "end": 103,
          "kind": "text"
        }
      ],
      "hash": "-1300839212-function foo() { return 10; }\nfunction myFunc() { return 100; }\nfunction bar() { return foo() + 1; }\n;\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 67,
          "kind": "prepend",
          "data": "../core/index.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 67,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 67,
          "end": 99,
          "kind": "text"
        }
      ],
      "hash": "-2581247747-declare function foo(): number;\ndeclare function myFunc(): number;\ndeclare function bar(): number;\n"
    }
  },
  "program": {
    "fileNames": [
      "./index.ts"
    ],
    "fileInfos": {
      "./index.ts": "5542925109-function bar() { return foo() + 1 };"
    },
    "options": {
      "composite": true,
      "outFile": "./index.js"
    },
    "outSignature": "-2581247747-declare function foo(): number;\ndeclare function myFunc(): number;\ndeclare function bar(): number;\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 996
}

//// [/user/username/projects/sample1/logic/index.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/sample1/logic/index.js
----------------------------------------------------------------------
prepend: (0-64):: ../core/index.js texts:: 1
>>--------------------------------------------------------------------
text: (0-64)
function foo() { return 10; }
function myFunc() { return 100; }

----------------------------------------------------------------------
text: (64-103)
function bar() { return foo() + 1; }
;

======================================================================
======================================================================
File:: /user/username/projects/sample1/logic/index.d.ts
----------------------------------------------------------------------
prepend: (0-67):: ../core/index.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-67)
declare function foo(): number;
declare function myFunc(): number;

----------------------------------------------------------------------
text: (67-99)
declare function bar(): number;

======================================================================

