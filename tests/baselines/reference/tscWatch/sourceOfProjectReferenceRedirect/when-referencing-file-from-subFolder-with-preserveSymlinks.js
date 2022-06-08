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

//// [/user/username/projects/myproject/packages/B/package.json]
{}

//// [/user/username/projects/myproject/packages/A/tsconfig.json]
{"compilerOptions":{"outDir":"lib","rootDir":"src","composite":true,"preserveSymlinks":true},"include":["src"],"references":[{"path":"../B"}]}

//// [/user/username/projects/myproject/packages/B/tsconfig.json]
{"compilerOptions":{"outDir":"lib","rootDir":"src","composite":true,"preserveSymlinks":true},"include":["src"]}

//// [/user/username/projects/myproject/packages/A/src/test.ts]
import { foo } from 'b/lib/foo';
import { bar } from 'b/lib/bar/foo';
foo();
bar();


//// [/user/username/projects/myproject/packages/B/src/foo.ts]
export function foo() { }

//// [/user/username/projects/myproject/packages/B/src/bar/foo.ts]
export function bar() { }

//// [/user/username/projects/myproject/node_modules/b] symlink(/user/username/projects/myproject/packages/B)

/a/lib/tsc.js --w --p /user/username/projects/myproject/packages/A/tsconfig.json
Output::
>> Screen clear
[[90m12:00:45 AM[0m] Starting compilation in watch mode...

[[90m12:00:56 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/A/src/test.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/A/lib","rootDir":"/user/username/projects/myproject/packages/A/src","composite":true,"preserveSymlinks":true,"configFilePath":"/user/username/projects/myproject/packages/A/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/B/src/foo.ts
/user/username/projects/myproject/packages/B/src/bar/foo.ts
/user/username/projects/myproject/packages/A/src/test.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/B/src/foo.ts
/user/username/projects/myproject/packages/B/src/bar/foo.ts
/user/username/projects/myproject/packages/A/src/test.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/packages/b/src/foo.ts (used version)
/user/username/projects/myproject/packages/b/src/bar/foo.ts (used version)
/user/username/projects/myproject/packages/a/src/test.ts (computed .d.ts during emit)

WatchedFiles::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/A/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/B/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/a/src/test.ts:
  {"fileName":"/user/username/projects/myproject/packages/A/src/test.ts","pollingInterval":250}
/user/username/projects/myproject/packages/b/src/foo.ts:
  {"fileName":"/user/username/projects/myproject/packages/B/src/foo.ts","pollingInterval":250}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
  {"fileName":"/user/username/projects/myproject/packages/B/src/bar/foo.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/packages/b/package.json:
  {"fileName":"/user/username/projects/myproject/packages/B/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/b/src:
  {"directoryName":"/user/username/projects/myproject/packages/b/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/a/src:
  {"directoryName":"/user/username/projects/myproject/packages/A/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/packages/a/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/a/node_modules:
  {"directoryName":"/user/username/projects/myproject/packages/A/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/node_modules:
  {"directoryName":"/user/username/projects/myproject/packages/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/packages/A/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/packages/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/packages/A/lib/test.js]
"use strict";
exports.__esModule = true;
var foo_1 = require("b/lib/foo");
var foo_2 = require("b/lib/bar/foo");
(0, foo_1.foo)();
(0, foo_2.bar)();


//// [/user/username/projects/myproject/packages/A/lib/test.d.ts]
export {};


//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../b/src/foo.ts","../b/src/bar/foo.ts","./src/test.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"4646078106-export function foo() { }","1045484683-export function bar() { }",{"version":"14700910833-import { foo } from 'b/lib/foo';\nimport { bar } from 'b/lib/bar/foo';\nfoo();\nbar();\n","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"fileIdsList":[[2,3]],"referencedMap":[[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2],"dtsChangeTime":53000},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../b/src/foo.ts",
      "../b/src/bar/foo.ts",
      "./src/test.ts"
    ],
    "fileNamesList": [
      [
        "../b/src/foo.ts",
        "../b/src/bar/foo.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../b/src/foo.ts": {
        "version": "4646078106-export function foo() { }",
        "signature": "4646078106-export function foo() { }"
      },
      "../b/src/bar/foo.ts": {
        "version": "1045484683-export function bar() { }",
        "signature": "1045484683-export function bar() { }"
      },
      "./src/test.ts": {
        "version": "14700910833-import { foo } from 'b/lib/foo';\nimport { bar } from 'b/lib/bar/foo';\nfoo();\nbar();\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "./lib",
      "rootDir": "./src"
    },
    "referencedMap": {
      "./src/test.ts": [
        "../b/src/foo.ts",
        "../b/src/bar/foo.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "./src/test.ts",
      "../b/src/bar/foo.ts",
      "../b/src/foo.ts"
    ],
    "dtsChangeTime": 53000
  },
  "version": "FakeTSVersion",
  "size": 984
}

