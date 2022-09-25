Info 0    [00:01:16.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:17.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/packages/A/src/test.ts"
      }
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
{}

//// [/user/username/projects/myproject/packages/A/tsconfig.json]
{"compilerOptions":{"outDir":"lib","rootDir":"src","composite":true},"include":["src"],"references":[{"path":"../B"}]}

//// [/user/username/projects/myproject/packages/B/tsconfig.json]
{"compilerOptions":{"outDir":"lib","rootDir":"src","composite":true},"include":["src"]}

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
//// [/user/username/projects/myproject/packages/B/lib/foo.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
function foo() { }
exports.foo = foo;


//// [/user/username/projects/myproject/packages/B/lib/foo.d.ts]
export declare function foo(): void;


//// [/user/username/projects/myproject/packages/B/lib/bar/foo.js]
"use strict";
exports.__esModule = true;
exports.bar = void 0;
function bar() { }
exports.bar = bar;


//// [/user/username/projects/myproject/packages/B/lib/bar/foo.d.ts]
export declare function bar(): void;


//// [/user/username/projects/myproject/packages/B/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","./src/foo.ts","./src/bar/foo.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"4646078106-export function foo() { }","signature":"-5677608893-export declare function foo(): void;\n"},{"version":"1045484683-export function bar() { }","signature":"-2904461644-export declare function bar(): void;\n"}],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2],"latestChangedDtsFile":"./lib/bar/foo.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/B/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "./src/foo.ts",
      "./src/bar/foo.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/foo.ts": {
        "version": "4646078106-export function foo() { }",
        "signature": "-5677608893-export declare function foo(): void;\n"
      },
      "./src/bar/foo.ts": {
        "version": "1045484683-export function bar() { }",
        "signature": "-2904461644-export declare function bar(): void;\n"
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
      "./src/bar/foo.ts",
      "./src/foo.ts"
    ],
    "latestChangedDtsFile": "./lib/bar/foo.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 955
}

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
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../b/lib/foo.d.ts","../b/lib/bar/foo.d.ts","./src/test.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-5677608893-export declare function foo(): void;\n","-2904461644-export declare function bar(): void;\n",{"version":"14700910833-import { foo } from 'b/lib/foo';\nimport { bar } from 'b/lib/bar/foo';\nfoo();\nbar();\n","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"fileIdsList":[[2,3]],"referencedMap":[[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2],"latestChangedDtsFile":"./lib/test.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../b/lib/foo.d.ts",
      "../b/lib/bar/foo.d.ts",
      "./src/test.ts"
    ],
    "fileNamesList": [
      [
        "../b/lib/foo.d.ts",
        "../b/lib/bar/foo.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../b/lib/foo.d.ts": {
        "version": "-5677608893-export declare function foo(): void;\n",
        "signature": "-5677608893-export declare function foo(): void;\n"
      },
      "../b/lib/bar/foo.d.ts": {
        "version": "-2904461644-export declare function bar(): void;\n",
        "signature": "-2904461644-export declare function bar(): void;\n"
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
        "../b/lib/foo.d.ts",
        "../b/lib/bar/foo.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "./src/test.ts",
      "../b/lib/bar/foo.d.ts",
      "../b/lib/foo.d.ts"
    ],
    "latestChangedDtsFile": "./lib/test.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1035
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:18.000] Search path: /user/username/projects/myproject/packages/A/src
Info 3    [00:01:19.000] For info: /user/username/projects/myproject/packages/A/src/test.ts :: Config file name: /user/username/projects/myproject/packages/A/tsconfig.json
Info 4    [00:01:20.000] Creating configuration project /user/username/projects/myproject/packages/A/tsconfig.json
Info 5    [00:01:21.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Config file
Info 6    [00:01:22.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/packages/A/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/packages/A/src/test.ts to open"}}
Info 7    [00:01:23.000] Config: /user/username/projects/myproject/packages/A/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/A/src/test.ts"
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
Info 8    [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/a/src 1 undefined Config: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Wild card directory
Info 9    [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/a/src 1 undefined Config: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Wild card directory
Info 10   [00:01:26.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [00:01:27.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json
Info 12   [00:01:28.000] Config: /user/username/projects/myproject/packages/B/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/B/src/foo.ts",
  "/user/username/projects/myproject/packages/B/src/bar/foo.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/packages/B/lib",
  "rootDir": "/user/username/projects/myproject/packages/B/src",
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/packages/B/tsconfig.json"
 }
}
Info 13   [00:01:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Config file
Info 14   [00:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/b/src 1 undefined Config: /user/username/projects/myproject/packages/B/tsconfig.json WatchType: Wild card directory
Info 15   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/b/src 1 undefined Config: /user/username/projects/myproject/packages/B/tsconfig.json WatchType: Wild card directory
Info 16   [00:01:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/src/foo.ts 500 undefined WatchType: Closed Script info
Info 17   [00:01:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/src/bar/foo.ts 500 undefined WatchType: Closed Script info
Info 18   [00:01:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 19   [00:01:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/src 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/src 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:01:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 22   [00:01:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 23   [00:01:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 24   [00:01:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 25   [00:01:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 26   [00:01:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [00:01:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/package.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: File location affecting resolution
Info 28   [00:01:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 29   [00:01:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 30   [00:01:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 31   [00:01:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 32   [00:01:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 33   [00:01:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 34   [00:01:50.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 35   [00:01:51.000] Project '/user/username/projects/myproject/packages/A/tsconfig.json' (Configured)
Info 36   [00:01:52.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/packages/B/src/foo.ts
	/user/username/projects/myproject/packages/B/src/bar/foo.ts
	/user/username/projects/myproject/packages/A/src/test.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../B/src/foo.ts
	  Imported via 'b/lib/foo' from file 'src/test.ts'
	../B/src/bar/foo.ts
	  Imported via 'b/lib/bar/foo' from file 'src/test.ts'
	src/test.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 37   [00:01:53.000] -----------------------------------------------
Info 38   [00:01:54.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/packages/A/tsconfig.json"}}
Info 39   [00:01:55.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"8c5cfb88fb6a6125ddaca4c198af63d261c8feb2786e348cbf3223fcf8461e16","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":134,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"outDir":"","rootDir":"","composite":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 40   [00:01:56.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/packages/A/src/test.ts","configFile":"/user/username/projects/myproject/packages/A/tsconfig.json","diagnostics":[]}}
Info 41   [00:01:57.000] Search path: /user/username/projects/myproject/packages/A
Info 42   [00:01:58.000] For info: /user/username/projects/myproject/packages/A/tsconfig.json :: No config files found.
Info 43   [00:01:59.000] Project '/user/username/projects/myproject/packages/A/tsconfig.json' (Configured)
Info 43   [00:02:00.000] 	Files (4)

Info 43   [00:02:01.000] -----------------------------------------------
Info 43   [00:02:02.000] Open files: 
Info 43   [00:02:03.000] 	FileName: /user/username/projects/myproject/packages/A/src/test.ts ProjectRootPath: undefined
Info 43   [00:02:04.000] 		Projects: /user/username/projects/myproject/packages/A/tsconfig.json
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 43   [00:02:05.000] response:
    {
      "responseRequired": false
    }
Info 44   [00:02:06.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/packages/A/src/test.ts"
        ]
      },
      "seq": 1,
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 45   [00:02:07.000] response:
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 46   [00:02:08.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 47   [00:02:09.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 48   [00:02:10.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
Info 49   [00:02:11.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 50   [00:02:12.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/user/username/projects/myproject/packages/A/src/test.ts",
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 51   [00:02:13.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 52   [00:02:14.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/packages/A/src/test.ts"
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 53   [00:02:15.000] response:
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 54   [00:02:16.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json
Info 55   [00:02:17.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 56   [00:02:18.000] Different program with same set of files
Info 57   [00:02:19.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 58   [00:02:20.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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

Info 59   [00:02:21.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
Info 60   [00:02:22.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
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
/user/username/projects/myproject/packages/b/src/foo.ts:
  {}
/user/username/projects/myproject/packages/b/src/bar/foo.ts:
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
