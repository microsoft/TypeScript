Info 0    [00:01:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/packages/A/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
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
{"compilerOptions":{"outDir":"lib","rootDir":"src","composite":true,"preserveSymlinks":true},"include":["src"],"references":[{"path":"../B"}]}

//// [/user/username/projects/myproject/packages/B/tsconfig.json]
{"compilerOptions":{"outDir":"lib","rootDir":"src","composite":true,"preserveSymlinks":true},"include":["src"]}

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
exports.__esModule = true;
exports.bar = void 0;
function bar() { }
exports.bar = bar;


//// [/user/username/projects/myproject/packages/B/lib/bar.d.ts]
export declare function bar(): void;


//// [/user/username/projects/myproject/packages/B/lib/index.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
function foo() { }
exports.foo = foo;


//// [/user/username/projects/myproject/packages/B/lib/index.d.ts]
export declare function foo(): void;


//// [/user/username/projects/myproject/packages/B/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","./src/bar.ts","./src/index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"1045484683-export function bar() { }","signature":"-2904461644-export declare function bar(): void;\n"},{"version":"4646078106-export function foo() { }","signature":"-5677608893-export declare function foo(): void;\n"}],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./lib/index.d.ts"},"version":"FakeTSVersion"}

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
  "size": 951
}

//// [/user/username/projects/myproject/packages/A/lib/index.js]
"use strict";
exports.__esModule = true;
var b_1 = require("b");
var bar_1 = require("b/lib/bar");
(0, b_1.foo)();
(0, bar_1.bar)();


//// [/user/username/projects/myproject/packages/A/lib/index.d.ts]
export {};


//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../node_modules/b/lib/index.d.ts","../../node_modules/b/lib/bar.d.ts","./src/index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-5677608893-export declare function foo(): void;\n","-2904461644-export declare function bar(): void;\n",{"version":"3563314629-import { foo } from 'b';\nimport { bar } from 'b/lib/bar';\nfoo();\nbar();\n","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"fileIdsList":[[2,3]],"referencedMap":[[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2,4],"latestChangedDtsFile":"./lib/index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../node_modules/b/lib/index.d.ts",
      "../../node_modules/b/lib/bar.d.ts",
      "./src/index.ts"
    ],
    "fileNamesList": [
      [
        "../../node_modules/b/lib/index.d.ts",
        "../../node_modules/b/lib/bar.d.ts"
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
      "../../node_modules/b/lib/index.d.ts": {
        "version": "-5677608893-export declare function foo(): void;\n",
        "signature": "-5677608893-export declare function foo(): void;\n"
      },
      "../../node_modules/b/lib/bar.d.ts": {
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
    "options": {
      "composite": true,
      "outDir": "./lib",
      "rootDir": "./src"
    },
    "referencedMap": {
      "./src/index.ts": [
        "../../node_modules/b/lib/index.d.ts",
        "../../node_modules/b/lib/bar.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../node_modules/b/lib/bar.d.ts",
      "../../node_modules/b/lib/index.d.ts",
      "./src/index.ts"
    ],
    "latestChangedDtsFile": "./lib/index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1054
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:13.000] Search path: /user/username/projects/myproject/packages/A/src
Info 3    [00:01:14.000] For info: /user/username/projects/myproject/packages/A/src/index.ts :: Config file name: /user/username/projects/myproject/packages/A/tsconfig.json
Info 4    [00:01:15.000] Creating configuration project /user/username/projects/myproject/packages/A/tsconfig.json
Info 5    [00:01:16.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Config file
Info 6    [00:01:17.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/packages/A/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/packages/A/src/index.ts to open"}}
Info 7    [00:01:18.000] Config: /user/username/projects/myproject/packages/A/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/A/src/index.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/packages/A/lib",
  "rootDir": "/user/username/projects/myproject/packages/A/src",
  "composite": true,
  "preserveSymlinks": true,
  "configFilePath": "/user/username/projects/myproject/packages/A/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/packages/B",
   "originalPath": "../B"
  }
 ]
}
Info 8    [00:01:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/a/src 1 undefined Config: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Wild card directory
Info 9    [00:01:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/a/src 1 undefined Config: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Wild card directory
Info 10   [00:01:21.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json
Info 11   [00:01:22.000] Config: /user/username/projects/myproject/packages/B/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/B/src/bar.ts",
  "/user/username/projects/myproject/packages/B/src/index.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/packages/B/lib",
  "rootDir": "/user/username/projects/myproject/packages/B/src",
  "composite": true,
  "preserveSymlinks": true,
  "configFilePath": "/user/username/projects/myproject/packages/B/tsconfig.json"
 }
}
Info 12   [00:01:23.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Config file
Info 13   [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/b/src 1 undefined Config: /user/username/projects/myproject/packages/B/tsconfig.json WatchType: Wild card directory
Info 14   [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/b/src 1 undefined Config: /user/username/projects/myproject/packages/B/tsconfig.json WatchType: Wild card directory
Info 15   [00:01:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/src/index.ts 500 undefined WatchType: Closed Script info
Info 16   [00:01:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/src/bar.ts 500 undefined WatchType: Closed Script info
Info 17   [00:01:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 18   [00:01:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/src 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:01:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/src 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:01:31.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 22   [00:01:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 23   [00:01:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 24   [00:01:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 25   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 26   [00:01:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/package.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: File location affecting resolution
Info 27   [00:01:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 28   [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 29   [00:01:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 30   [00:01:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 31   [00:01:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 32   [00:01:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 33   [00:01:44.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [00:01:45.000] Project '/user/username/projects/myproject/packages/A/tsconfig.json' (Configured)
Info 35   [00:01:46.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/packages/B/src/index.ts
	/user/username/projects/myproject/packages/B/src/bar.ts
	/user/username/projects/myproject/packages/A/src/index.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../B/src/index.ts
	  Imported via 'b' from file 'src/index.ts'
	../B/src/bar.ts
	  Imported via 'b/lib/bar' from file 'src/index.ts'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 36   [00:01:47.000] -----------------------------------------------
Info 37   [00:01:48.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/packages/A/tsconfig.json"}}
Info 38   [00:01:49.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"8c5cfb88fb6a6125ddaca4c198af63d261c8feb2786e348cbf3223fcf8461e16","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":122,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"outDir":"","rootDir":"","composite":true,"preserveSymlinks":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 39   [00:01:50.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/packages/A/src/index.ts","configFile":"/user/username/projects/myproject/packages/A/tsconfig.json","diagnostics":[]}}
Info 40   [00:01:51.000] Search path: /user/username/projects/myproject/packages/A
Info 41   [00:01:52.000] For info: /user/username/projects/myproject/packages/A/tsconfig.json :: No config files found.
Info 42   [00:01:53.000] Project '/user/username/projects/myproject/packages/A/tsconfig.json' (Configured)
Info 42   [00:01:54.000] 	Files (4)

Info 42   [00:01:55.000] -----------------------------------------------
Info 42   [00:01:56.000] Open files: 
Info 42   [00:01:57.000] 	FileName: /user/username/projects/myproject/packages/A/src/index.ts ProjectRootPath: undefined
Info 42   [00:01:58.000] 		Projects: /user/username/projects/myproject/packages/A/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 42   [00:01:59.000] response:
    {
      "responseRequired": false
    }
Info 43   [00:02:00.000] request:
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
Before request

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

After request

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 44   [00:02:01.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 45   [00:02:02.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/index.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 46   [00:02:03.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/index.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 47   [00:02:04.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/index.ts","diagnostics":[]}}
Info 48   [00:02:05.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 49   [00:02:06.000] request:
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
Before request

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

After request

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 50   [00:02:07.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 51   [00:02:08.000] request:
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
Before request

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

After request

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 52   [00:02:09.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 53   [00:02:10.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json
Info 54   [00:02:11.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 55   [00:02:12.000] Different program with same set of files
Info 56   [00:02:13.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/index.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 57   [00:02:14.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/index.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 58   [00:02:15.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/index.ts","diagnostics":[]}}
Info 59   [00:02:16.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":4}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/packages/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/a/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/tsconfig.json:
  {}
/user/username/projects/myproject/packages/b/src/index.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/packages/b/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/a/src:
  {}
/user/username/projects/myproject/packages/b/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
