currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/main.ts]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }


//// [/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function anotherFileWithSameReferenes() { }


//// [/home/src/workspaces/project/src/filePresent.ts]
function something() { return 10; }

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "include": [
    "src/**/*.ts"
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


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96msrc/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  src/anotherFileWithSameReferenes.ts[90m:2[0m
     1  src/main.ts[90m:2[0m


//// [/home/src/workspaces/project/src/filePresent.js]
function something() { return 10; }


//// [/home/src/workspaces/project/src/filePresent.d.ts]
declare function something(): number;


//// [/home/src/workspaces/project/src/anotherFileWithSameReferenes.js]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function anotherFileWithSameReferenes() { }


//// [/home/src/workspaces/project/src/anotherFileWithSameReferenes.d.ts]
declare function anotherFileWithSameReferenes(): void;


//// [/home/src/workspaces/project/src/main.js]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }


//// [/home/src/workspaces/project/src/main.d.ts]
declare function main(): void;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/filepresent.ts","./src/anotherfilewithsamereferenes.ts","./src/main.ts","./src/filenotfound.ts"],"fileIdsList":[[2,5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-4903250974-declare function something(): number;\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"-11249446897-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"-21256825585-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\n","signature":"-1399491038-declare function main(): void;\n","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true},"referencedMap":[[3,1],[4,1]],"latestChangedDtsFile":"./src/main.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/filepresent.ts",
    "./src/anotherfilewithsamereferenes.ts",
    "./src/main.ts",
    "./src/filenotfound.ts"
  ],
  "fileIdsList": [
    [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/filepresent.ts": {
      "original": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-4903250974-declare function something(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "-12346563362-function something() { return 10; }",
      "signature": "-4903250974-declare function something(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/anotherfilewithsamereferenes.ts": {
      "original": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
      "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true
    },
    "./src/main.ts": {
      "original": {
        "version": "-21256825585-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\n",
        "signature": "-1399491038-declare function main(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-21256825585-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\n",
      "signature": "-1399491038-declare function main(): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/filepresent.ts",
        "./src/anotherfilewithsamereferenes.ts",
        "./src/main.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherfilewithsamereferenes.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ],
    "./src/main.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ]
  },
  "latestChangedDtsFile": "./src/main.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 1469
}


Program root files: [
  "/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts",
  "/home/src/workspaces/project/src/filePresent.ts",
  "/home/src/workspaces/project/src/main.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/main.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/src/filepresent.ts (computed .d.ts during emit)
/home/src/workspaces/project/src/anotherfilewithsamereferenes.ts (computed .d.ts during emit)
/home/src/workspaces/project/src/main.ts (computed .d.ts during emit)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96msrc/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  src/anotherFileWithSameReferenes.ts[90m:2[0m
     1  src/main.ts[90m:2[0m



Program root files: [
  "/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts",
  "/home/src/workspaces/project/src/filePresent.ts",
  "/home/src/workspaces/project/src/main.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Modify main file

Input::
//// [/home/src/workspaces/project/src/main.ts]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96msrc/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  src/anotherFileWithSameReferenes.ts[90m:2[0m
     1  src/main.ts[90m:2[0m


//// [/home/src/workspaces/project/src/main.js]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/filepresent.ts","./src/anotherfilewithsamereferenes.ts","./src/main.ts","./src/filenotfound.ts"],"fileIdsList":[[2,5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-4903250974-declare function something(): number;\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"-11249446897-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"-24702349751-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();","signature":"-1399491038-declare function main(): void;\n","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true},"referencedMap":[[3,1],[4,1]],"latestChangedDtsFile":"./src/main.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/filepresent.ts",
    "./src/anotherfilewithsamereferenes.ts",
    "./src/main.ts",
    "./src/filenotfound.ts"
  ],
  "fileIdsList": [
    [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/filepresent.ts": {
      "original": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-4903250974-declare function something(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "-12346563362-function something() { return 10; }",
      "signature": "-4903250974-declare function something(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/anotherfilewithsamereferenes.ts": {
      "original": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
      "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true
    },
    "./src/main.ts": {
      "original": {
        "version": "-24702349751-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();",
        "signature": "-1399491038-declare function main(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-24702349751-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();",
      "signature": "-1399491038-declare function main(): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/filepresent.ts",
        "./src/anotherfilewithsamereferenes.ts",
        "./src/main.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherfilewithsamereferenes.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ],
    "./src/main.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ]
  },
  "latestChangedDtsFile": "./src/main.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 1481
}


Program root files: [
  "/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts",
  "/home/src/workspaces/project/src/filePresent.ts",
  "/home/src/workspaces/project/src/main.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/src/main.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/src/main.ts (computed .d.ts)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Modify main file again

Input::
//// [/home/src/workspaces/project/src/main.ts]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();something();


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96msrc/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  src/anotherFileWithSameReferenes.ts[90m:2[0m
     1  src/main.ts[90m:2[0m


//// [/home/src/workspaces/project/src/main.js]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();
something();


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/filepresent.ts","./src/anotherfilewithsamereferenes.ts","./src/main.ts","./src/filenotfound.ts"],"fileIdsList":[[2,5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-4903250974-declare function something(): number;\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"-11249446897-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"-20086051197-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();","signature":"-1399491038-declare function main(): void;\n","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true},"referencedMap":[[3,1],[4,1]],"latestChangedDtsFile":"./src/main.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/filepresent.ts",
    "./src/anotherfilewithsamereferenes.ts",
    "./src/main.ts",
    "./src/filenotfound.ts"
  ],
  "fileIdsList": [
    [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/filepresent.ts": {
      "original": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-4903250974-declare function something(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "-12346563362-function something() { return 10; }",
      "signature": "-4903250974-declare function something(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/anotherfilewithsamereferenes.ts": {
      "original": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
      "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true
    },
    "./src/main.ts": {
      "original": {
        "version": "-20086051197-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();",
        "signature": "-1399491038-declare function main(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-20086051197-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();",
      "signature": "-1399491038-declare function main(): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/filepresent.ts",
        "./src/anotherfilewithsamereferenes.ts",
        "./src/main.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherfilewithsamereferenes.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ],
    "./src/main.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ]
  },
  "latestChangedDtsFile": "./src/main.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 1493
}


Program root files: [
  "/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts",
  "/home/src/workspaces/project/src/filePresent.ts",
  "/home/src/workspaces/project/src/main.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/src/main.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/src/main.ts (computed .d.ts)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Add new file and update main file

Input::
//// [/home/src/workspaces/project/src/main.ts]
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();something();foo();

//// [/home/src/workspaces/project/src/newFile.ts]
function foo() { return 20; }


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96msrc/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m3[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/fileNotFound.ts' not found.

[7m3[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  src/anotherFileWithSameReferenes.ts[90m:2[0m
     1  src/main.ts[90m:3[0m


//// [/home/src/workspaces/project/src/filePresent.js] file written with same contents
//// [/home/src/workspaces/project/src/anotherFileWithSameReferenes.js] file written with same contents
//// [/home/src/workspaces/project/src/main.js]
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();
something();
foo();


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/filepresent.ts","./src/anotherfilewithsamereferenes.ts","./src/newfile.ts","./src/main.ts","./src/filenotfound.ts"],"fileIdsList":[[2,6],[2,4,6]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-4903250974-declare function something(): number;\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"-11249446897-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"5451387573-function foo() { return 20; }","signature":"517738360-declare function foo(): number;\n","affectsGlobalScope":true},{"version":"-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();","signature":"-1399491038-declare function main(): void;\n","affectsGlobalScope":true}],"root":[[2,5]],"options":{"composite":true},"referencedMap":[[3,1],[5,2]],"latestChangedDtsFile":"./src/newFile.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/filepresent.ts",
    "./src/anotherfilewithsamereferenes.ts",
    "./src/newfile.ts",
    "./src/main.ts",
    "./src/filenotfound.ts"
  ],
  "fileIdsList": [
    [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ],
    [
      "./src/filepresent.ts",
      "./src/newfile.ts",
      "./src/filenotfound.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/filepresent.ts": {
      "original": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-4903250974-declare function something(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "-12346563362-function something() { return 10; }",
      "signature": "-4903250974-declare function something(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/anotherfilewithsamereferenes.ts": {
      "original": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
      "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true
    },
    "./src/newfile.ts": {
      "original": {
        "version": "5451387573-function foo() { return 20; }",
        "signature": "517738360-declare function foo(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "5451387573-function foo() { return 20; }",
      "signature": "517738360-declare function foo(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/main.ts": {
      "original": {
        "version": "-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();",
        "signature": "-1399491038-declare function main(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();",
      "signature": "-1399491038-declare function main(): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./src/filepresent.ts",
        "./src/anotherfilewithsamereferenes.ts",
        "./src/newfile.ts",
        "./src/main.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherfilewithsamereferenes.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ],
    "./src/main.ts": [
      "./src/filepresent.ts",
      "./src/newfile.ts",
      "./src/filenotfound.ts"
    ]
  },
  "latestChangedDtsFile": "./src/newFile.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 1707
}

//// [/home/src/workspaces/project/src/newFile.js]
function foo() { return 20; }


//// [/home/src/workspaces/project/src/newFile.d.ts]
declare function foo(): number;



Program root files: [
  "/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts",
  "/home/src/workspaces/project/src/filePresent.ts",
  "/home/src/workspaces/project/src/main.ts",
  "/home/src/workspaces/project/src/newFile.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/newFile.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/newFile.ts
/home/src/workspaces/project/src/main.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/src/newfile.ts (computed .d.ts)
/home/src/workspaces/project/src/filepresent.ts (computed .d.ts)
/home/src/workspaces/project/src/anotherfilewithsamereferenes.ts (computed .d.ts)
/home/src/workspaces/project/src/main.ts (computed .d.ts)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Write file that could not be resolved

Input::
//// [/home/src/workspaces/project/src/fileNotFound.ts]
function something2() { return 20; }


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/src/filePresent.js] file written with same contents
//// [/home/src/workspaces/project/src/anotherFileWithSameReferenes.js] file written with same contents
//// [/home/src/workspaces/project/src/main.js] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/anotherfilewithsamereferenes.ts","./src/newfile.ts","./src/main.ts"],"fileIdsList":[[2,3],[2,3,5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-4903250974-declare function something(): number;\n","affectsGlobalScope":true},{"version":"-9011934479-function something2() { return 20; }","signature":"-11412869068-declare function something2(): number;\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"-11249446897-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"5451387573-function foo() { return 20; }","signature":"517738360-declare function foo(): number;\n","affectsGlobalScope":true},{"version":"-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();","signature":"-1399491038-declare function main(): void;\n","affectsGlobalScope":true}],"root":[[2,6]],"options":{"composite":true},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./src/fileNotFound.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/filepresent.ts",
    "./src/filenotfound.ts",
    "./src/anotherfilewithsamereferenes.ts",
    "./src/newfile.ts",
    "./src/main.ts"
  ],
  "fileIdsList": [
    [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ],
    [
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/newfile.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/filepresent.ts": {
      "original": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-4903250974-declare function something(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "-12346563362-function something() { return 10; }",
      "signature": "-4903250974-declare function something(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/filenotfound.ts": {
      "original": {
        "version": "-9011934479-function something2() { return 20; }",
        "signature": "-11412869068-declare function something2(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "-9011934479-function something2() { return 20; }",
      "signature": "-11412869068-declare function something2(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/anotherfilewithsamereferenes.ts": {
      "original": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
      "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true
    },
    "./src/newfile.ts": {
      "original": {
        "version": "5451387573-function foo() { return 20; }",
        "signature": "517738360-declare function foo(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "5451387573-function foo() { return 20; }",
      "signature": "517738360-declare function foo(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/main.ts": {
      "original": {
        "version": "-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();",
        "signature": "-1399491038-declare function main(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();",
      "signature": "-1399491038-declare function main(): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        6
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/anotherfilewithsamereferenes.ts",
        "./src/newfile.ts",
        "./src/main.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherfilewithsamereferenes.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ],
    "./src/main.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/newfile.ts"
    ]
  },
  "latestChangedDtsFile": "./src/fileNotFound.d.ts",
  "version": "FakeTSVersion",
  "size": 1855
}

//// [/home/src/workspaces/project/src/newFile.js] file written with same contents
//// [/home/src/workspaces/project/src/fileNotFound.js]
function something2() { return 20; }


//// [/home/src/workspaces/project/src/fileNotFound.d.ts]
declare function something2(): number;



Program root files: [
  "/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts",
  "/home/src/workspaces/project/src/fileNotFound.ts",
  "/home/src/workspaces/project/src/filePresent.ts",
  "/home/src/workspaces/project/src/main.ts",
  "/home/src/workspaces/project/src/newFile.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/fileNotFound.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/newFile.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/fileNotFound.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/newFile.ts
/home/src/workspaces/project/src/main.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/src/filenotfound.ts (computed .d.ts)
/home/src/workspaces/project/src/filepresent.ts (computed .d.ts)
/home/src/workspaces/project/src/anotherfilewithsamereferenes.ts (computed .d.ts)
/home/src/workspaces/project/src/newfile.ts (computed .d.ts)
/home/src/workspaces/project/src/main.ts (computed .d.ts)

exitCode:: ExitStatus.Success

Change:: Modify main file

Input::
//// [/home/src/workspaces/project/src/main.ts]
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();something();foo();something();


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/src/main.js]
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();
something();
foo();
something();


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/anotherfilewithsamereferenes.ts","./src/newfile.ts","./src/main.ts"],"fileIdsList":[[2,3],[2,3,5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-4903250974-declare function something(): number;\n","affectsGlobalScope":true},{"version":"-9011934479-function something2() { return 20; }","signature":"-11412869068-declare function something2(): number;\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"-11249446897-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"5451387573-function foo() { return 20; }","signature":"517738360-declare function foo(): number;\n","affectsGlobalScope":true},{"version":"3987942182-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();something();","signature":"-1399491038-declare function main(): void;\n","affectsGlobalScope":true}],"root":[[2,6]],"options":{"composite":true},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./src/fileNotFound.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/filepresent.ts",
    "./src/filenotfound.ts",
    "./src/anotherfilewithsamereferenes.ts",
    "./src/newfile.ts",
    "./src/main.ts"
  ],
  "fileIdsList": [
    [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ],
    [
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/newfile.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/filepresent.ts": {
      "original": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-4903250974-declare function something(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "-12346563362-function something() { return 10; }",
      "signature": "-4903250974-declare function something(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/filenotfound.ts": {
      "original": {
        "version": "-9011934479-function something2() { return 20; }",
        "signature": "-11412869068-declare function something2(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "-9011934479-function something2() { return 20; }",
      "signature": "-11412869068-declare function something2(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/anotherfilewithsamereferenes.ts": {
      "original": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
      "signature": "-11249446897-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true
    },
    "./src/newfile.ts": {
      "original": {
        "version": "5451387573-function foo() { return 20; }",
        "signature": "517738360-declare function foo(): number;\n",
        "affectsGlobalScope": true
      },
      "version": "5451387573-function foo() { return 20; }",
      "signature": "517738360-declare function foo(): number;\n",
      "affectsGlobalScope": true
    },
    "./src/main.ts": {
      "original": {
        "version": "3987942182-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();something();",
        "signature": "-1399491038-declare function main(): void;\n",
        "affectsGlobalScope": true
      },
      "version": "3987942182-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();something();",
      "signature": "-1399491038-declare function main(): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        6
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/anotherfilewithsamereferenes.ts",
        "./src/newfile.ts",
        "./src/main.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherfilewithsamereferenes.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts"
    ],
    "./src/main.ts": [
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/newfile.ts"
    ]
  },
  "latestChangedDtsFile": "./src/fileNotFound.d.ts",
  "version": "FakeTSVersion",
  "size": 1866
}


Program root files: [
  "/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts",
  "/home/src/workspaces/project/src/fileNotFound.ts",
  "/home/src/workspaces/project/src/filePresent.ts",
  "/home/src/workspaces/project/src/main.ts",
  "/home/src/workspaces/project/src/newFile.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/src/filePresent.ts
/home/src/workspaces/project/src/fileNotFound.ts
/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
/home/src/workspaces/project/src/newFile.ts
/home/src/workspaces/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/src/main.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/src/main.ts (computed .d.ts)

exitCode:: ExitStatus.Success
