currentDirectory:: /user/username/projects useCaseSensitiveFileNames: false
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
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outFile": "index.js"
  }
}

//// [/user/username/projects/sample1/core/index.ts]
function foo() { return 10; }

//// [/user/username/projects/sample1/logic/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "composite": true,
    "declaration": true,
    "outFile": "index.js"
  },
  "references": [
    {
      "path": "../core",
      "prepend": true
    }
  ]
}

//// [/user/username/projects/sample1/logic/index.ts]
function bar() { return foo() + 1 };


/a/lib/tsc.js -b -w sample1/logic
Output::
>> Screen clear
[[90m12:00:29 AM[0m] Starting compilation in watch mode...

[96msample1/logic/tsconfig.json[0m:[93m9[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'prepend' has been removed. Please remove it from your configuration.

[7m 9[0m     {
[7m  [0m [91m    ~[0m
[7m10[0m       "path": "../core",
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m11[0m       "prepend": true
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m

[[90m12:00:41 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/sample1/core/index.js]
function foo() { return 10; }


//// [/user/username/projects/sample1/core/index.d.ts]
declare function foo(): number;


//// [/user/username/projects/sample1/core/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":30,"kind":"text"}],"hash":"3762995390-function foo() { return 10; }\n"},"dts":{"sections":[{"pos":0,"end":32,"kind":"text"}],"hash":"517738360-declare function foo(): number;\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","5450201652-function foo() { return 10; }"],"root":[2],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"517738360-declare function foo(): number;\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

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
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./index.ts": "5450201652-function foo() { return 10; }"
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./index.js"
    },
    "outSignature": "517738360-declare function foo(): number;\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 978
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


FsWatches::
/user/username/projects/sample1/core/index.ts: *new*
  {}
/user/username/projects/sample1/core/tsconfig.json: *new*
  {}
/user/username/projects/sample1/logic/index.ts: *new*
  {}
/user/username/projects/sample1/logic/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core: *new*
  {}
/user/username/projects/sample1/logic: *new*
  {}

Program root files: [
  "/user/username/projects/sample1/core/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/sample1/core/index.js",
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/sample1/logic/index.ts"
]
Program options: {
  "ignoreDeprecations": "5.0",
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/sample1/logic/index.js",
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/logic/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Make non local change and build core

Input::
//// [/user/username/projects/sample1/core/index.ts]
function foo() { return 10; }
function myFunc() { return 10; }


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:00:44 AM[0m] File change detected. Starting incremental compilation...



//// [/user/username/projects/sample1/core/index.js]
function foo() { return 10; }
function myFunc() { return 10; }


//// [/user/username/projects/sample1/core/index.d.ts]
declare function foo(): number;
declare function myFunc(): number;


//// [/user/username/projects/sample1/core/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":63,"kind":"text"}],"hash":"-6033649947-function foo() { return 10; }\nfunction myFunc() { return 10; }\n"},"dts":{"sections":[{"pos":0,"end":67,"kind":"text"}],"hash":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-3957203077-function foo() { return 10; }\nfunction myFunc() { return 10; }"],"root":[2],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

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
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./index.ts": "-3957203077-function foo() { return 10; }\nfunction myFunc() { return 10; }"
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./index.js"
    },
    "outSignature": "2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1122
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


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/sample1/core/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/sample1/core/index.js",
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Build logic

Input::

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
[96msample1/logic/tsconfig.json[0m:[93m9[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'prepend' has been removed. Please remove it from your configuration.

[7m 9[0m     {
[7m  [0m [91m    ~[0m
[7m10[0m       "path": "../core",
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m11[0m       "prepend": true
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m

[[90m12:01:01 AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/sample1/logic/index.ts"
]
Program options: {
  "ignoreDeprecations": "5.0",
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/sample1/logic/index.js",
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/logic/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Make local change and build core

Input::
//// [/user/username/projects/sample1/core/index.ts]
function foo() { return 10; }
function myFunc() { return 100; }


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:01:05 AM[0m] File change detected. Starting incremental compilation...



//// [/user/username/projects/sample1/core/index.js]
function foo() { return 10; }
function myFunc() { return 100; }


//// [/user/username/projects/sample1/core/index.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./index.ts"],"js":{"sections":[{"pos":0,"end":64,"kind":"text"}],"hash":"-5849092235-function foo() { return 10; }\nfunction myFunc() { return 100; }\n"},"dts":{"sections":[{"pos":0,"end":67,"kind":"text"}],"hash":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-6034018805-function foo() { return 10; }\nfunction myFunc() { return 100; }"],"root":[2],"options":{"composite":true,"declaration":true,"outFile":"./index.js"},"outSignature":"2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n","latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

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
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./index.ts": "-6034018805-function foo() { return 10; }\nfunction myFunc() { return 100; }"
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outFile": "./index.js"
    },
    "outSignature": "2172043225-declare function foo(): number;\ndeclare function myFunc(): number;\n",
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1124
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


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/sample1/core/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/sample1/core/index.js",
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Build logic

Input::

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
[96msample1/logic/tsconfig.json[0m:[93m9[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'prepend' has been removed. Please remove it from your configuration.

[7m 9[0m     {
[7m  [0m [91m    ~[0m
[7m10[0m       "path": "../core",
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m11[0m       "prepend": true
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[7m12[0m     }
[7m  [0m [91m~~~~~[0m

[[90m12:01:19 AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/sample1/logic/index.ts"
]
Program options: {
  "ignoreDeprecations": "5.0",
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/sample1/logic/index.js",
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/logic/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
