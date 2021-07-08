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
{"compilerOptions":{"composite":true,"outDir":"outDir"}}

//// [/user/username/projects/sample1/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


//// [/user/username/projects/sample1/core/anotherModule.ts]
export const World = "hello";



/a/lib/tsc.js -b -w sample1/core -verbose
Output::
>> Screen clear
[[90m12:00:27 AM[0m] Starting compilation in watch mode...

[[90m12:00:28 AM[0m] Projects in this build: 
    * sample1/core/tsconfig.json

[[90m12:00:29 AM[0m] Project 'sample1/core/tsconfig.json' is out of date because output file 'sample1/core/outDir/anotherModule.js' does not exist

[[90m12:00:30 AM[0m] Building project '/user/username/projects/sample1/core/tsconfig.json'...

[[90m12:00:46 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/sample1/core/anotherModule.ts","/user/username/projects/sample1/core/index.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/sample1/core/outDir","watch":true,"configFilePath":"/user/username/projects/sample1/core/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/sample1/core/anothermodule.ts (used version)
/user/username/projects/sample1/core/index.ts (used version)

WatchedFiles::
/user/username/projects/sample1/core/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/core/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/core/anothermodule.ts:
  {"fileName":"/user/username/projects/sample1/core/anotherModule.ts","pollingInterval":250}
/user/username/projects/sample1/core/index.ts:
  {"fileName":"/user/username/projects/sample1/core/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {"directoryName":"/user/username/projects/sample1/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/core/outDir/anotherModule.js]
"use strict";
exports.__esModule = true;
exports.World = void 0;
exports.World = "hello";


//// [/user/username/projects/sample1/core/outDir/anotherModule.d.ts]
export declare const World = "hello";


//// [/user/username/projects/sample1/core/outDir/index.js]
"use strict";
exports.__esModule = true;
exports.multiply = exports.leftPad = exports.someString = void 0;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;


//// [/user/username/projects/sample1/core/outDir/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;


//// [/user/username/projects/sample1/core/outDir/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../anothermodule.ts","../index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-2676574883-export const World = \"hello\";\r\n","-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../anothermodule.ts",
      "../index.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-2676574883-export const World = \"hello\";\r\n"
      },
      "../index.ts": {
        "version": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n",
        "signature": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../anothermodule.ts",
      "../index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 915
}


Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/sample1/core/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/core/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/core/anothermodule.ts:
  {"fileName":"/user/username/projects/sample1/core/anotherModule.ts","pollingInterval":250}
/user/username/projects/sample1/core/index.ts:
  {"fileName":"/user/username/projects/sample1/core/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {"directoryName":"/user/username/projects/sample1/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Add new file

Input::
//// [/user/username/projects/sample1/core/file3.ts]
export const y = 10;


Output::
>> Screen clear
[[90m12:00:49 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:50 AM[0m] Project 'sample1/core/tsconfig.json' is out of date because oldest output 'sample1/core/outDir/anotherModule.js' is older than newest input 'sample1/core/file3.ts'

[[90m12:00:51 AM[0m] Building project '/user/username/projects/sample1/core/tsconfig.json'...

[[90m12:01:00 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/sample1/core/tsconfig.json'...

[[90m12:01:04 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/sample1/core/anotherModule.ts","/user/username/projects/sample1/core/file3.ts","/user/username/projects/sample1/core/index.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/sample1/core/outDir","watch":true,"configFilePath":"/user/username/projects/sample1/core/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/file3.ts
/user/username/projects/sample1/core/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/core/file3.ts

Shape signatures in builder refreshed for::
/user/username/projects/sample1/core/file3.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/sample1/core/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/core/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/core/anothermodule.ts:
  {"fileName":"/user/username/projects/sample1/core/anotherModule.ts","pollingInterval":250}
/user/username/projects/sample1/core/index.ts:
  {"fileName":"/user/username/projects/sample1/core/index.ts","pollingInterval":250}
/user/username/projects/sample1/core/file3.ts:
  {"fileName":"/user/username/projects/sample1/core/file3.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {"directoryName":"/user/username/projects/sample1/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/core/outDir/anotherModule.js] file changed its modified time
//// [/user/username/projects/sample1/core/outDir/anotherModule.d.ts] file changed its modified time
//// [/user/username/projects/sample1/core/outDir/index.js] file changed its modified time
//// [/user/username/projects/sample1/core/outDir/index.d.ts] file changed its modified time
//// [/user/username/projects/sample1/core/outDir/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../anothermodule.ts","../file3.ts","../index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-2676574883-export const World = \"hello\";\r\n",{"version":"-13729955264-export const y = 10;","signature":"-7152472870-export declare const y = 10;\n"},"-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../anothermodule.ts",
      "../file3.ts",
      "../index.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-2676574883-export const World = \"hello\";\r\n"
      },
      "../file3.ts": {
        "version": "-13729955264-export const y = 10;",
        "signature": "-7152472870-export declare const y = 10;\n"
      },
      "../index.ts": {
        "version": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n",
        "signature": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../anothermodule.ts",
      "../file3.ts",
      "../index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1036
}

//// [/user/username/projects/sample1/core/outDir/file3.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
exports.y = 10;


//// [/user/username/projects/sample1/core/outDir/file3.d.ts]
export declare const y = 10;



Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/sample1/core/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/core/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/core/anothermodule.ts:
  {"fileName":"/user/username/projects/sample1/core/anotherModule.ts","pollingInterval":250}
/user/username/projects/sample1/core/index.ts:
  {"fileName":"/user/username/projects/sample1/core/index.ts","pollingInterval":250}
/user/username/projects/sample1/core/file3.ts:
  {"fileName":"/user/username/projects/sample1/core/file3.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {"directoryName":"/user/username/projects/sample1/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

