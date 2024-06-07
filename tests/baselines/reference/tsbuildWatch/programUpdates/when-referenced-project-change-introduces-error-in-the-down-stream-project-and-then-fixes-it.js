currentDirectory:: /user/username/projects/sample1 useCaseSensitiveFileNames: false
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

//// [/user/username/projects/sample1/Library/library.ts]

interface SomeObject
{
    message: string;
}

export function createSomeObject(): SomeObject
{
    return {
        message: "new Object"
    };
}

//// [/user/username/projects/sample1/Library/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/user/username/projects/sample1/App/app.ts]
import { createSomeObject } from "../Library/library";
createSomeObject().message;

//// [/user/username/projects/sample1/App/tsconfig.json]
{
  "references": [
    {
      "path": "../Library"
    }
  ]
}


/a/lib/tsc.js -b -w App
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/sample1/Library/library.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSomeObject = createSomeObject;
function createSomeObject() {
    return {
        message: "new Object"
    };
}


//// [/user/username/projects/sample1/Library/library.d.ts]
interface SomeObject {
    message: string;
}
export declare function createSomeObject(): SomeObject;
export {};


//// [/user/username/projects/sample1/Library/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../a/lib/lib.d.ts","./library.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}","signature":"-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./library.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/Library/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../a/lib/lib.d.ts",
    "./library.ts"
  ],
  "fileInfos": {
    "../../../../../a/lib/lib.d.ts": {
      "original": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./library.ts": {
      "original": {
        "version": "5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}",
        "signature": "-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n",
        "impliedFormat": 1
      },
      "version": "5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}",
      "signature": "-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./library.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./library.d.ts",
  "version": "FakeTSVersion",
  "size": 950
}

//// [/user/username/projects/sample1/App/app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var library_1 = require("../Library/library");
(0, library_1.createSomeObject)().message;



PolledWatches::
/a/lib/package.json: *new*
  {"pollingInterval":2000}
/a/package.json: *new*
  {"pollingInterval":2000}
/package.json: *new*
  {"pollingInterval":2000}
/user/package.json: *new*
  {"pollingInterval":2000}
/user/username/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/sample1/App/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/sample1/Library/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/sample1/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/sample1/App/app.ts: *new*
  {}
/user/username/projects/sample1/App/tsconfig.json: *new*
  {}
/user/username/projects/sample1/Library/library.ts: *new*
  {}
/user/username/projects/sample1/Library/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/sample1/App: *new*
  {}
/user/username/projects/sample1/Library: *new*
  {}

Program root files: [
  "/user/username/projects/sample1/Library/library.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/Library/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/sample1/library/library.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/sample1/App/app.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/App/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/sample1/library/library.d.ts (used version)
/user/username/projects/sample1/app/app.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Introduce error

Input::
//// [/user/username/projects/sample1/Library/library.ts]

interface SomeObject
{
    message2: string;
}

export function createSomeObject(): SomeObject
{
    return {
        message2: "new Object"
    };
}


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...



//// [/user/username/projects/sample1/Library/library.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSomeObject = createSomeObject;
function createSomeObject() {
    return {
        message2: "new Object"
    };
}


//// [/user/username/projects/sample1/Library/library.d.ts]
interface SomeObject {
    message2: string;
}
export declare function createSomeObject(): SomeObject;
export {};


//// [/user/username/projects/sample1/Library/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../a/lib/lib.d.ts","./library.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-9741349880-\ninterface SomeObject\n{\n    message2: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message2: \"new Object\"\n    };\n}","signature":"1956297931-interface SomeObject {\n    message2: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./library.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/Library/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../a/lib/lib.d.ts",
    "./library.ts"
  ],
  "fileInfos": {
    "../../../../../a/lib/lib.d.ts": {
      "original": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./library.ts": {
      "original": {
        "version": "-9741349880-\ninterface SomeObject\n{\n    message2: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message2: \"new Object\"\n    };\n}",
        "signature": "1956297931-interface SomeObject {\n    message2: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n",
        "impliedFormat": 1
      },
      "version": "-9741349880-\ninterface SomeObject\n{\n    message2: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message2: \"new Object\"\n    };\n}",
      "signature": "1956297931-interface SomeObject {\n    message2: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./library.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./library.d.ts",
  "version": "FakeTSVersion",
  "size": 952
}


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[96mApp/app.ts[0m:[93m2[0m:[93m20[0m - [91merror[0m[90m TS2551: [0mProperty 'message' does not exist on type 'SomeObject'. Did you mean 'message2'?

[7m2[0m createSomeObject().message;
[7m [0m [91m                   ~~~~~~~[0m

  [96mLibrary/library.d.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     message2: string;
    [7m [0m [96m    ~~~~~~~~[0m
    'message2' is declared here.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/sample1/Library/library.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/Library/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/Library/library.ts

Shape signatures in builder refreshed for::
/user/username/projects/sample1/library/library.ts (computed .d.ts)

Program root files: [
  "/user/username/projects/sample1/App/app.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/App/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

Shape signatures in builder refreshed for::
/user/username/projects/sample1/library/library.d.ts (used version)
/user/username/projects/sample1/app/app.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Fix error

Input::
//// [/user/username/projects/sample1/Library/library.ts]

interface SomeObject
{
    message: string;
}

export function createSomeObject(): SomeObject
{
    return {
        message: "new Object"
    };
}


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...



//// [/user/username/projects/sample1/Library/library.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSomeObject = createSomeObject;
function createSomeObject() {
    return {
        message: "new Object"
    };
}


//// [/user/username/projects/sample1/Library/library.d.ts]
interface SomeObject {
    message: string;
}
export declare function createSomeObject(): SomeObject;
export {};


//// [/user/username/projects/sample1/Library/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../a/lib/lib.d.ts","./library.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}","signature":"-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./library.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/Library/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../a/lib/lib.d.ts",
    "./library.ts"
  ],
  "fileInfos": {
    "../../../../../a/lib/lib.d.ts": {
      "original": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./library.ts": {
      "original": {
        "version": "5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}",
        "signature": "-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n",
        "impliedFormat": 1
      },
      "version": "5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}",
      "signature": "-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./library.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./library.d.ts",
  "version": "FakeTSVersion",
  "size": 950
}


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/sample1/App/app.js] file written with same contents


Program root files: [
  "/user/username/projects/sample1/Library/library.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/Library/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/Library/library.ts

Shape signatures in builder refreshed for::
/user/username/projects/sample1/library/library.ts (computed .d.ts)

Program root files: [
  "/user/username/projects/sample1/App/app.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/App/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

Shape signatures in builder refreshed for::
/user/username/projects/sample1/library/library.d.ts (used version)
/user/username/projects/sample1/app/app.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
