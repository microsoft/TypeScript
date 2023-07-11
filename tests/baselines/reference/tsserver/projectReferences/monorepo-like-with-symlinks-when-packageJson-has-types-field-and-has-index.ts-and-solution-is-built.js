currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
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
{"main":"lib/index.js","types":"lib/index.d.ts"}

//// [/user/username/projects/myproject/packages/A/tsconfig.json]
{"compilerOptions":{"outDir":"lib","rootDir":"src","composite":true},"include":["src"],"references":[{"path":"../B"}]}

//// [/user/username/projects/myproject/packages/B/tsconfig.json]
{"compilerOptions":{"outDir":"lib","rootDir":"src","composite":true},"include":["src"]}

//// [/user/username/projects/myproject/packages/A/src/index.ts]
import { foo } from 'b';
import { bar } from 'b/lib/bar';
foo();
bar();


//// [/user/username/projects/myproject/packages/B/src/index.ts]
export function foo() { }

//// [/user/username/projects/myproject/packages/B/src/bar.ts]
export function bar() { }

//// [/user/username/projects/myproject/node_modules/b] symlink(/user/username/projects/myproject/packages/B)
//// [/user/username/projects/myproject/packages/B/lib/bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
function bar() { }
exports.bar = bar;


//// [/user/username/projects/myproject/packages/B/lib/bar.d.ts]
export declare function bar(): void;


//// [/user/username/projects/myproject/packages/B/lib/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
function foo() { }
exports.foo = foo;


//// [/user/username/projects/myproject/packages/B/lib/index.d.ts]
export declare function foo(): void;


//// [/user/username/projects/myproject/packages/B/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","./src/bar.ts","./src/index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"1045484683-export function bar() { }","signature":"-2904461644-export declare function bar(): void;\n"},{"version":"4646078106-export function foo() { }","signature":"-5677608893-export declare function foo(): void;\n"}],"root":[2,3],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./lib/index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/B/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "./src/bar.ts",
      "./src/index.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/bar.ts": {
        "original": {
          "version": "1045484683-export function bar() { }",
          "signature": "-2904461644-export declare function bar(): void;\n"
        },
        "version": "1045484683-export function bar() { }",
        "signature": "-2904461644-export declare function bar(): void;\n"
      },
      "./src/index.ts": {
        "original": {
          "version": "4646078106-export function foo() { }",
          "signature": "-5677608893-export declare function foo(): void;\n"
        },
        "version": "4646078106-export function foo() { }",
        "signature": "-5677608893-export declare function foo(): void;\n"
      }
    },
    "root": [
      [
        2,
        "./src/bar.ts"
      ],
      [
        3,
        "./src/index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./lib",
      "rootDir": "./src"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "./src/bar.ts",
      "./src/index.ts"
    ],
    "latestChangedDtsFile": "./lib/index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 964
}

//// [/user/username/projects/myproject/packages/A/lib/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("b");
var bar_1 = require("b/lib/bar");
(0, b_1.foo)();
(0, bar_1.bar)();


//// [/user/username/projects/myproject/packages/A/lib/index.d.ts]
export {};


//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../b/lib/index.d.ts","../b/lib/bar.d.ts","./src/index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-5677608893-export declare function foo(): void;\n","-2904461644-export declare function bar(): void;\n",{"version":"3563314629-import { foo } from 'b';\nimport { bar } from 'b/lib/bar';\nfoo();\nbar();\n","signature":"-3531856636-export {};\n"}],"root":[4],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"fileIdsList":[[2,3]],"referencedMap":[[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2],"latestChangedDtsFile":"./lib/index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../b/lib/index.d.ts",
      "../b/lib/bar.d.ts",
      "./src/index.ts"
    ],
    "fileNamesList": [
      [
        "../b/lib/index.d.ts",
        "../b/lib/bar.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../b/lib/index.d.ts": {
        "version": "-5677608893-export declare function foo(): void;\n",
        "signature": "-5677608893-export declare function foo(): void;\n"
      },
      "../b/lib/bar.d.ts": {
        "version": "-2904461644-export declare function bar(): void;\n",
        "signature": "-2904461644-export declare function bar(): void;\n"
      },
      "./src/index.ts": {
        "original": {
          "version": "3563314629-import { foo } from 'b';\nimport { bar } from 'b/lib/bar';\nfoo();\nbar();\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "3563314629-import { foo } from 'b';\nimport { bar } from 'b/lib/bar';\nfoo();\nbar();\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        4,
        "./src/index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./lib",
      "rootDir": "./src"
    },
    "referencedMap": {
      "./src/index.ts": [
        "../b/lib/index.d.ts",
        "../b/lib/bar.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "./src/index.ts",
      "../b/lib/bar.d.ts",
      "../b/lib/index.d.ts"
    ],
    "latestChangedDtsFile": "./lib/index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1033
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/packages/A/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/packages/A/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/packages/A/src/index.ts :: Config file name: /user/username/projects/myproject/packages/A/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/packages/A/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/packages/A/tsconfig.json",
      "reason": "Creating possible configured project for /user/username/projects/myproject/packages/A/src/index.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/packages/A/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/A/src/index.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/packages/A/lib",
  "rootDir": "/user/username/projects/myproject/packages/A/src",
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/packages/A/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/packages/B",
   "originalPath": "../B"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/a/src 1 undefined Config: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/a/src 1 undefined Config: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/packages/B/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/B/src/bar.ts",
  "/user/username/projects/myproject/packages/B/src/index.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/packages/B/lib",
  "rootDir": "/user/username/projects/myproject/packages/B/src",
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/packages/B/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/b/src 1 undefined Config: /user/username/projects/myproject/packages/B/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/b/src 1 undefined Config: /user/username/projects/myproject/packages/B/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/src 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/src 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/package.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/src/bar.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/packages/A/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/packages/B/src/index.ts Text-1 "export function foo() { }"
	/user/username/projects/myproject/packages/B/src/bar.ts Text-1 "export function bar() { }"
	/user/username/projects/myproject/packages/A/src/index.ts SVC-1-0 "import { foo } from 'b';\nimport { bar } from 'b/lib/bar';\nfoo();\nbar();\n"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../B/src/index.ts
	  Imported via 'b' from file 'src/index.ts'
	../B/src/bar.ts
	  Imported via 'b/lib/bar' from file 'src/index.ts'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/packages/A/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "telemetry",
     "body": {
      "telemetryEventName": "projectInfo",
      "payload": {
       "projectId": "8c5cfb88fb6a6125ddaca4c198af63d261c8feb2786e348cbf3223fcf8461e16",
       "fileStats": {
        "js": 0,
        "jsSize": 0,
        "jsx": 0,
        "jsxSize": 0,
        "ts": 3,
        "tsSize": 122,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 1,
        "dtsSize": 334,
        "deferred": 0,
        "deferredSize": 0
       },
       "compilerOptions": {
        "outDir": "",
        "rootDir": "",
        "composite": true
       },
       "typeAcquisition": {
        "enable": false,
        "include": false,
        "exclude": false
       },
       "extends": false,
       "files": false,
       "include": true,
       "exclude": false,
       "compileOnSave": false,
       "configFileName": "tsconfig.json",
       "projectType": "configured",
       "languageServiceEnabled": true,
       "version": "FakeVersion"
      }
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/user/username/projects/myproject/packages/A/src/index.ts",
      "configFile": "/user/username/projects/myproject/packages/A/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/packages/A
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/packages/A/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/packages/A/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/packages/A/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/packages/A/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/packages/a/tsconfig.json: *new*
  {}
/user/username/projects/myproject/packages/b/package.json: *new*
  {}
/user/username/projects/myproject/packages/b/src/bar.ts: *new*
  {}
/user/username/projects/myproject/packages/b/src/index.ts: *new*
  {}
/user/username/projects/myproject/packages/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/packages/a/src: *new*
  {}
/user/username/projects/myproject/packages/b/src: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/packages/A/src/index.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/user/username/projects/myproject/packages/A/src/index.ts",
      "diagnostics": []
     }
    }
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
1: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "semanticDiag",
     "body": {
      "file": "/user/username/projects/myproject/packages/A/src/index.ts",
      "diagnostics": []
     }
    }
After running Immedidate callback:: count: 1
2: suggestionCheck

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "suggestionDiag",
     "body": {
      "file": "/user/username/projects/myproject/packages/A/src/index.ts",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 2
     }
    }
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/user/username/projects/myproject/packages/A/src/index.ts",
            "textChanges": [
              {
                "newText": "\n",
                "start": {
                  "line": 5,
                  "offset": 1
                },
                "end": {
                  "line": 5,
                  "offset": 1
                }
              }
            ]
          }
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/packages/A/src/index.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
2: checkOne

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/packages/A/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/packages/B/src/index.ts Text-1 "export function foo() { }"
	/user/username/projects/myproject/packages/B/src/bar.ts Text-1 "export function bar() { }"
	/user/username/projects/myproject/packages/A/src/index.ts SVC-1-1 "import { foo } from 'b';\nimport { bar } from 'b/lib/bar';\nfoo();\nbar();\n\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/user/username/projects/myproject/packages/A/src/index.ts",
      "diagnostics": []
     }
    }
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
3: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "semanticDiag",
     "body": {
      "file": "/user/username/projects/myproject/packages/A/src/index.ts",
      "diagnostics": []
     }
    }
After running Immedidate callback:: count: 1
4: suggestionCheck

Before running Immedidate callback:: count: 1
4: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "suggestionDiag",
     "body": {
      "file": "/user/username/projects/myproject/packages/A/src/index.ts",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 4
     }
    }
After running Immedidate callback:: count: 0
