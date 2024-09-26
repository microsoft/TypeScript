currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/a.ts]
export function foo() { }

//// [/user/username/projects/myproject/b.ts]
export function bar() { }

//// [/user/username/projects/myproject/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
  "outFile": "../outFile.js",
  "module": "amd"

    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}

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


/home/src/tslibs/TS/Lib/tsc.js --b -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m10[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m10[0m         "b.ts"
[7m  [0m [91m        ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = foo;
    function foo() { }
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bar = bar;
    function bar() { }
});


//// [/user/username/projects/outFile.d.ts]
declare module "a" {
    export function foo(): void;
}
declare module "b" {
    export function bar(): void;
}


//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/a.ts","./myproject/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","4646078106-export function foo() { }","1045484683-export function bar() { }"],"root":[2,3],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-5340070911-declare module \"a\" {\n    export function foo(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n","latestChangedDtsFile":"./outFile.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/a.ts",
    "./myproject/b.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/a.ts": "4646078106-export function foo() { }",
    "./myproject/b.ts": "1045484683-export function bar() { }"
  },
  "root": [
    [
      2,
      "./myproject/a.ts"
    ],
    [
      3,
      "./myproject/b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-5340070911-declare module \"a\" {\n    export function foo(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 939
}


FsWatches::
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/b.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "composite": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: reports syntax errors after change to config file

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
  "outFile": "../outFile.js",
  "module": "amd"

    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m11[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m11[0m         "b.ts"
[7m  [0m [91m        ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: reports syntax errors after change to ts file

Input::
//// [/user/username/projects/myproject/a.ts]
export function fooBar() { }


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m11[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m11[0m         "b.ts"
[7m  [0m [91m        ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fooBar = fooBar;
    function fooBar() { }
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bar = bar;
    function bar() { }
});


//// [/user/username/projects/outFile.d.ts]
declare module "a" {
    export function fooBar(): void;
}
declare module "b" {
    export function bar(): void;
}


//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/a.ts","./myproject/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-3260843409-export function fooBar() { }","1045484683-export function bar() { }"],"root":[2,3],"options":{"composite":true,"declaration":true,"module":2,"outFile":"./outFile.js"},"outSignature":"771185302-declare module \"a\" {\n    export function fooBar(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n","latestChangedDtsFile":"./outFile.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/a.ts",
    "./myproject/b.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/a.ts": "-3260843409-export function fooBar() { }",
    "./myproject/b.ts": "1045484683-export function bar() { }"
  },
  "root": [
    [
      2,
      "./myproject/a.ts"
    ],
    [
      3,
      "./myproject/b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "771185302-declare module \"a\" {\n    export function fooBar(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 963
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: reports error when there is no change to tsconfig file

Input::
//// [/user/username/projects/myproject/tsconfig.json] file written with same contents

Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m11[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m11[0m         "b.ts"
[7m  [0m [91m        ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: builds after fixing config file errors

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outFile": "../outFile.js",
    "module": "amd"
  },
  "files": [
    "a.ts",
    "b.ts"
  ]
}


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/a.ts","./myproject/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-3260843409-export function fooBar() { }","1045484683-export function bar() { }"],"root":[2,3],"options":{"composite":true,"declaration":true,"module":2,"outFile":"./outFile.js"},"outSignature":"771185302-declare module \"a\" {\n    export function fooBar(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/a.ts",
    "./myproject/b.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/a.ts": "-3260843409-export function fooBar() { }",
    "./myproject/b.ts": "1045484683-export function bar() { }"
  },
  "root": [
    [
      2,
      "./myproject/a.ts"
    ],
    [
      3,
      "./myproject/b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "771185302-declare module \"a\" {\n    export function fooBar(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 949
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
