Input::
//// [/lib/lib.d.ts]
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

//// [/src/project/src/anotherFileWithSameReferenes.ts]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function anotherFileWithSameReferenes() { }


//// [/src/project/src/filePresent.ts]
function something() { return 10; }

//// [/src/project/src/main.ts]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }


//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true},"include":["src/**/*.ts"]}



Output::
/lib/tsc --p src/project
[96msrc/project/src/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileWithSameReferenes.ts","/src/project/src/filePresent.ts","/src/project/src/main.ts"]
Program options: {"composite":true,"project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/main.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/project/src/filepresent.ts (used version)
/src/project/src/anotherfilewithsamereferenes.ts (used version)
/src/project/src/main.ts (used version)


//// [/src/project/src/anotherFileWithSameReferenes.d.ts]
/// <reference path="filePresent.d.ts" />
declare function anotherFileWithSameReferenes(): void;


//// [/src/project/src/anotherFileWithSameReferenes.js]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function anotherFileWithSameReferenes() { }


//// [/src/project/src/filePresent.d.ts]
declare function something(): number;


//// [/src/project/src/filePresent.js]
function something() { return 10; }


//// [/src/project/src/main.d.ts]
/// <reference path="filePresent.d.ts" />
declare function main(): void;


//// [/src/project/src/main.js]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/anotherfilewithsamereferenes.ts","./src/main.ts","./src/filenotfound.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","affectsGlobalScope":true},{"version":"-21256825585-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\n","affectsGlobalScope":true}],"options":{"composite":true},"fileIdsList":[[2,5]],"referencedMap":[[3,1],[4,1]],"exportedModulesMap":[[3,1],[4,1]],"semanticDiagnosticsPerFile":[1,3,2,4]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/main.ts",
      "./src/filenotfound.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-12346563362-function something() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/anotherfilewithsamereferenes.ts": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-21256825585-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\n",
        "signature": "-21256825585-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\n",
        "affectsGlobalScope": true
      }
    },
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
    "exportedModulesMap": {
      "./src/anotherfilewithsamereferenes.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/filepresent.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1266
}



Change:: no-change-run
Input::


Output::
/lib/tsc --p src/project
[96msrc/project/src/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileWithSameReferenes.ts","/src/project/src/filePresent.ts","/src/project/src/main.ts"]
Program options: {"composite":true,"project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/main.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Modify main file
Input::
//// [/src/project/src/main.ts]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();



Output::
/lib/tsc --p src/project
[96msrc/project/src/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileWithSameReferenes.ts","/src/project/src/filePresent.ts","/src/project/src/main.ts"]
Program options: {"composite":true,"project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/main.ts

Shape signatures in builder refreshed for::
/src/project/src/main.ts (computed .d.ts)
/src/project/src/filepresent.ts (computed .d.ts)
/src/project/src/anotherfilewithsamereferenes.ts (computed .d.ts)


//// [/src/project/src/anotherFileWithSameReferenes.d.ts] file written with same contents
//// [/src/project/src/anotherFileWithSameReferenes.js] file written with same contents
//// [/src/project/src/filePresent.d.ts] file written with same contents
//// [/src/project/src/filePresent.js] file written with same contents
//// [/src/project/src/main.d.ts] file written with same contents
//// [/src/project/src/main.js]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/anotherfilewithsamereferenes.ts","./src/main.ts","./src/filenotfound.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-2893492081-declare function something(): number;\r\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"5108835150-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"-24702349751-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();","signature":"-7575087679-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function main(): void;\r\n","affectsGlobalScope":true}],"options":{"composite":true},"fileIdsList":[[2,5]],"referencedMap":[[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2,4]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/main.ts",
      "./src/filenotfound.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-2893492081-declare function something(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/anotherfilewithsamereferenes.ts": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "5108835150-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-24702349751-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();",
        "signature": "-7575087679-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function main(): void;\r\n",
        "affectsGlobalScope": true
      }
    },
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/filepresent.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1574
}



Change:: Modify main file again
Input::
//// [/src/project/src/main.ts]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();something();



Output::
/lib/tsc --p src/project
[96msrc/project/src/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileWithSameReferenes.ts","/src/project/src/filePresent.ts","/src/project/src/main.ts"]
Program options: {"composite":true,"project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/src/project/src/main.ts

Shape signatures in builder refreshed for::
/src/project/src/main.ts (computed .d.ts)


//// [/src/project/src/main.d.ts] file written with same contents
//// [/src/project/src/main.js]
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();
something();


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/anotherfilewithsamereferenes.ts","./src/main.ts","./src/filenotfound.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-2893492081-declare function something(): number;\r\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"5108835150-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"-20086051197-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();","signature":"-7575087679-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function main(): void;\r\n","affectsGlobalScope":true}],"options":{"composite":true},"fileIdsList":[[2,5]],"referencedMap":[[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2,4]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/main.ts",
      "./src/filenotfound.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-2893492081-declare function something(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/anotherfilewithsamereferenes.ts": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "5108835150-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-20086051197-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();",
        "signature": "-7575087679-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function main(): void;\r\n",
        "affectsGlobalScope": true
      }
    },
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/filepresent.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1586
}



Change:: Add new file and update main file
Input::
//// [/src/project/src/main.ts]
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();something();foo();

//// [/src/project/src/newFile.ts]
function foo() { return 20; }



Output::
/lib/tsc --p src/project
[96msrc/project/src/anotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m2[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m

[96msrc/project/src/main.ts[0m:[93m3[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/src/project/src/fileNotFound.ts' not found.

[7m3[0m /// <reference path="./fileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/project/src/anotherFileWithSameReferenes.ts","/src/project/src/filePresent.ts","/src/project/src/main.ts","/src/project/src/newFile.ts"]
Program options: {"composite":true,"project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

Shape signatures in builder refreshed for::
/src/project/src/newfile.ts (computed .d.ts)
/src/project/src/filepresent.ts (computed .d.ts)
/src/project/src/anotherfilewithsamereferenes.ts (computed .d.ts)
/src/project/src/main.ts (computed .d.ts)


//// [/src/project/src/anotherFileWithSameReferenes.d.ts] file written with same contents
//// [/src/project/src/anotherFileWithSameReferenes.js] file written with same contents
//// [/src/project/src/filePresent.d.ts] file written with same contents
//// [/src/project/src/filePresent.js] file written with same contents
//// [/src/project/src/main.d.ts]
/// <reference path="newFile.d.ts" />
/// <reference path="filePresent.d.ts" />
declare function main(): void;


//// [/src/project/src/main.js]
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();
something();
foo();


//// [/src/project/src/newFile.d.ts]
declare function foo(): number;


//// [/src/project/src/newFile.js]
function foo() { return 20; }


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/anotherfilewithsamereferenes.ts","./src/newfile.ts","./src/main.ts","./src/filenotfound.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-2893492081-declare function something(): number;\r\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"5108835150-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"5451387573-function foo() { return 20; }","signature":"-94503195-declare function foo(): number;\r\n","affectsGlobalScope":true},{"version":"-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();","signature":"23846498620-/// <reference path=\"newFile.d.ts\" />\r\n/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function main(): void;\r\n","affectsGlobalScope":true}],"options":{"composite":true},"fileIdsList":[[2,6],[2,4,6]],"referencedMap":[[3,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2,5,4]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filenotfound.ts"
    ],
    "fileNamesList": [
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
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-2893492081-declare function something(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/anotherfilewithsamereferenes.ts": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "5108835150-/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "5451387573-function foo() { return 20; }",
        "signature": "-94503195-declare function foo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();",
        "signature": "23846498620-/// <reference path=\"newFile.d.ts\" />\r\n/// <reference path=\"filePresent.d.ts\" />\r\ndeclare function main(): void;\r\n",
        "affectsGlobalScope": true
      }
    },
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/filepresent.ts",
      "./src/main.ts",
      "./src/newfile.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1844
}



Change:: Write file that could not be resolved
Input::
//// [/src/project/src/fileNotFound.ts]
function something2() { return 20; }



Output::
/lib/tsc --p src/project
exitCode:: ExitStatus.Success
Program root files: ["/src/project/src/anotherFileWithSameReferenes.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/main.ts","/src/project/src/newFile.ts"]
Program options: {"composite":true,"project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

Shape signatures in builder refreshed for::
/src/project/src/filenotfound.ts (computed .d.ts)
/src/project/src/filepresent.ts (computed .d.ts)
/src/project/src/anotherfilewithsamereferenes.ts (computed .d.ts)
/src/project/src/newfile.ts (computed .d.ts)
/src/project/src/main.ts (computed .d.ts)


//// [/src/project/src/anotherFileWithSameReferenes.d.ts]
/// <reference path="filePresent.d.ts" />
/// <reference path="fileNotFound.d.ts" />
declare function anotherFileWithSameReferenes(): void;


//// [/src/project/src/anotherFileWithSameReferenes.js] file written with same contents
//// [/src/project/src/fileNotFound.d.ts]
declare function something2(): number;


//// [/src/project/src/fileNotFound.js]
function something2() { return 20; }


//// [/src/project/src/filePresent.d.ts] file written with same contents
//// [/src/project/src/filePresent.js] file written with same contents
//// [/src/project/src/main.d.ts]
/// <reference path="newFile.d.ts" />
/// <reference path="filePresent.d.ts" />
/// <reference path="fileNotFound.d.ts" />
declare function main(): void;


//// [/src/project/src/main.js] file written with same contents
//// [/src/project/src/newFile.d.ts] file written with same contents
//// [/src/project/src/newFile.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/anotherfilewithsamereferenes.ts","./src/newfile.ts","./src/main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-2893492081-declare function something(): number;\r\n","affectsGlobalScope":true},{"version":"-9011934479-function something2() { return 20; }","signature":"-11552458975-declare function something2(): number;\r\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"-13698947860-/// <reference path=\"filePresent.d.ts\" />\r\n/// <reference path=\"fileNotFound.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"5451387573-function foo() { return 20; }","signature":"-94503195-declare function foo(): number;\r\n","affectsGlobalScope":true},{"version":"-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();","signature":"25064093018-/// <reference path=\"newFile.d.ts\" />\r\n/// <reference path=\"filePresent.d.ts\" />\r\n/// <reference path=\"fileNotFound.d.ts\" />\r\ndeclare function main(): void;\r\n","affectsGlobalScope":true}],"options":{"composite":true},"fileIdsList":[[2,3],[2,3,5]],"referencedMap":[[4,1],[6,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2,6,5]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/newfile.ts",
      "./src/main.ts"
    ],
    "fileNamesList": [
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
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-2893492081-declare function something(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/filenotfound.ts": {
        "version": "-9011934479-function something2() { return 20; }",
        "signature": "-11552458975-declare function something2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/anotherfilewithsamereferenes.ts": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "-13698947860-/// <reference path=\"filePresent.d.ts\" />\r\n/// <reference path=\"fileNotFound.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "5451387573-function foo() { return 20; }",
        "signature": "-94503195-declare function foo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-3581559188-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();",
        "signature": "25064093018-/// <reference path=\"newFile.d.ts\" />\r\n/// <reference path=\"filePresent.d.ts\" />\r\n/// <reference path=\"fileNotFound.d.ts\" />\r\ndeclare function main(): void;\r\n",
        "affectsGlobalScope": true
      }
    },
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/filenotfound.ts",
      "./src/filepresent.ts",
      "./src/main.ts",
      "./src/newfile.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 2103
}



Change:: Modify main file
Input::
//// [/src/project/src/main.ts]
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();something();foo();something();



Output::
/lib/tsc --p src/project
exitCode:: ExitStatus.Success
Program root files: ["/src/project/src/anotherFileWithSameReferenes.ts","/src/project/src/fileNotFound.ts","/src/project/src/filePresent.ts","/src/project/src/main.ts","/src/project/src/newFile.ts"]
Program options: {"composite":true,"project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/src/filePresent.ts
/src/project/src/fileNotFound.ts
/src/project/src/anotherFileWithSameReferenes.ts
/src/project/src/newFile.ts
/src/project/src/main.ts

Semantic diagnostics in builder refreshed for::
/src/project/src/main.ts

Shape signatures in builder refreshed for::
/src/project/src/main.ts (computed .d.ts)


//// [/src/project/src/main.d.ts] file written with same contents
//// [/src/project/src/main.js]
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();
something();
foo();
something();


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/anotherfilewithsamereferenes.ts","./src/newfile.ts","./src/main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12346563362-function something() { return 10; }","signature":"-2893492081-declare function something(): number;\r\n","affectsGlobalScope":true},{"version":"-9011934479-function something2() { return 20; }","signature":"-11552458975-declare function something2(): number;\r\n","affectsGlobalScope":true},{"version":"-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n","signature":"-13698947860-/// <reference path=\"filePresent.d.ts\" />\r\n/// <reference path=\"fileNotFound.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n","affectsGlobalScope":true},{"version":"5451387573-function foo() { return 20; }","signature":"-94503195-declare function foo(): number;\r\n","affectsGlobalScope":true},{"version":"3987942182-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();something();","signature":"25064093018-/// <reference path=\"newFile.d.ts\" />\r\n/// <reference path=\"filePresent.d.ts\" />\r\n/// <reference path=\"fileNotFound.d.ts\" />\r\ndeclare function main(): void;\r\n","affectsGlobalScope":true}],"options":{"composite":true},"fileIdsList":[[2,3],[2,3,5]],"referencedMap":[[4,1],[6,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2,6,5]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/newfile.ts",
      "./src/main.ts"
    ],
    "fileNamesList": [
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
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "-12346563362-function something() { return 10; }",
        "signature": "-2893492081-declare function something(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/filenotfound.ts": {
        "version": "-9011934479-function something2() { return 20; }",
        "signature": "-11552458975-declare function something2(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/anotherfilewithsamereferenes.ts": {
        "version": "-28237004260-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }\n",
        "signature": "-13698947860-/// <reference path=\"filePresent.d.ts\" />\r\n/// <reference path=\"fileNotFound.d.ts\" />\r\ndeclare function anotherFileWithSameReferenes(): void;\r\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "5451387573-function foo() { return 20; }",
        "signature": "-94503195-declare function foo(): number;\r\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "3987942182-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }\nsomething();something();foo();something();",
        "signature": "25064093018-/// <reference path=\"newFile.d.ts\" />\r\n/// <reference path=\"filePresent.d.ts\" />\r\n/// <reference path=\"fileNotFound.d.ts\" />\r\ndeclare function main(): void;\r\n",
        "affectsGlobalScope": true
      }
    },
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/anotherfilewithsamereferenes.ts",
      "./src/filenotfound.ts",
      "./src/filepresent.ts",
      "./src/main.ts",
      "./src/newfile.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 2114
}

