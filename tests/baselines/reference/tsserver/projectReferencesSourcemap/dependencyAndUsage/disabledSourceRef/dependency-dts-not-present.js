Info 0    [00:01:04.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:05.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts"
      }
    }
Before request
//// [/user/username/projects/myproject/dependency/FnS.ts]
export function fn1() { }
export function fn2() { }
export function fn3() { }
export function fn4() { }
export function fn5() { }


//// [/user/username/projects/myproject/dependency/tsconfig.json]
{"compilerOptions":{"composite":true,"declarationMap":true,"declarationDir":"../decls"}}

//// [/user/username/projects/myproject/main/main.ts]
import {
    fn1,
    fn2,
    fn3,
    fn4,
    fn5
} from '../decls/fns'

fn1();
fn2();
fn3();
fn4();
fn5();


//// [/user/username/projects/myproject/main/tsconfig.json]
{"compilerOptions":{"composite":true,"declarationMap":true,"disableSourceOfProjectReferenceRedirect":true},"references":[{"path":"../dependency"}]}

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

//// [/user/username/projects/myproject/random/random.ts]
let a = 10;

//// [/user/username/projects/myproject/random/tsconfig.json]
{}

//// [/user/username/projects/myproject/dependency/FnS.js]
"use strict";
exports.__esModule = true;
exports.fn5 = exports.fn4 = exports.fn3 = exports.fn2 = exports.fn1 = void 0;
function fn1() { }
exports.fn1 = fn1;
function fn2() { }
exports.fn2 = fn2;
function fn3() { }
exports.fn3 = fn3;
function fn4() { }
exports.fn4 = fn4;
function fn5() { }
exports.fn5 = fn5;


//// [/user/username/projects/myproject/decls/FnS.d.ts.map]
{"version":3,"file":"FnS.d.ts","sourceRoot":"","sources":["../dependency/FnS.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM"}

//// [/user/username/projects/myproject/dependency/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./fns.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-18619918033-export function fn1() { }\nexport function fn2() { }\nexport function fn3() { }\nexport function fn4() { }\nexport function fn5() { }\n","signature":"-18267052502-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n"}],"options":{"composite":true,"declarationDir":"../decls","declarationMap":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"../decls/FnS.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/dependency/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./fns.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./fns.ts": {
        "version": "-18619918033-export function fn1() { }\nexport function fn2() { }\nexport function fn3() { }\nexport function fn4() { }\nexport function fn5() { }\n",
        "signature": "-18267052502-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n"
      }
    },
    "options": {
      "composite": true,
      "declarationDir": "../decls",
      "declarationMap": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./fns.ts"
    ],
    "latestChangedDtsFile": "../decls/FnS.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1090
}

//// [/user/username/projects/myproject/main/main.js]
"use strict";
exports.__esModule = true;
var fns_1 = require("../decls/fns");
(0, fns_1.fn1)();
(0, fns_1.fn2)();
(0, fns_1.fn3)();
(0, fns_1.fn4)();
(0, fns_1.fn5)();


//// [/user/username/projects/myproject/main/main.d.ts.map]
{"version":3,"file":"main.d.ts","sourceRoot":"","sources":["main.ts"],"names":[],"mappings":""}

//// [/user/username/projects/myproject/main/main.d.ts]
export {};
//# sourceMappingURL=main.d.ts.map

//// [/user/username/projects/myproject/main/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../decls/fns.d.ts","./main.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-18326212334-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n//# sourceMappingURL=FnS.d.ts.map",{"version":"-805644102-import {\n    fn1,\n    fn2,\n    fn3,\n    fn4,\n    fn5\n} from '../decls/fns'\n\nfn1();\nfn2();\nfn3();\nfn4();\nfn5();\n","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"declarationMap":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./main.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../decls/fns.d.ts",
      "./main.ts"
    ],
    "fileNamesList": [
      [
        "../decls/fns.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../decls/fns.d.ts": {
        "version": "-18326212334-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n//# sourceMappingURL=FnS.d.ts.map",
        "signature": "-18326212334-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n//# sourceMappingURL=FnS.d.ts.map"
      },
      "./main.ts": {
        "version": "-805644102-import {\n    fn1,\n    fn2,\n    fn3,\n    fn4,\n    fn5\n} from '../decls/fns'\n\nfn1();\nfn2();\nfn3();\nfn4();\nfn5();\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "declarationMap": true
    },
    "referencedMap": {
      "./main.ts": [
        "../decls/fns.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../decls/fns.d.ts",
      "./main.ts"
    ],
    "latestChangedDtsFile": "./main.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1151
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:06.000] Search path: /user/username/projects/myproject/main
Info 3    [00:01:07.000] For info: /user/username/projects/myproject/main/main.ts :: Config file name: /user/username/projects/myproject/main/tsconfig.json
Info 4    [00:01:08.000] Creating configuration project /user/username/projects/myproject/main/tsconfig.json
Info 5    [00:01:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 6    [00:01:10.000] Config: /user/username/projects/myproject/main/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/main/main.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/myproject/main/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/dependency",
   "originalPath": "../dependency"
  }
 ]
}
Info 7    [00:01:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 8    [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 9    [00:01:13.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json
Info 10   [00:01:14.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/dependency/FnS.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "declarationDir": "/user/username/projects/myproject/decls",
  "configFilePath": "/user/username/projects/myproject/dependency/tsconfig.json"
 }
}
Info 11   [00:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 12   [00:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 13   [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 14   [00:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:01:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 17   [00:01:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 18   [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 19   [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 20   [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 21   [00:01:25.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:01:26.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 23   [00:01:27.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	main.ts
	  Matched by default include pattern '**/*'

Info 24   [00:01:28.000] -----------------------------------------------
Info 25   [00:01:29.000] Search path: /user/username/projects/myproject/main
Info 26   [00:01:30.000] For info: /user/username/projects/myproject/main/tsconfig.json :: No config files found.
Info 27   [00:01:31.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 27   [00:01:32.000] 	Files (2)

Info 27   [00:01:33.000] -----------------------------------------------
Info 27   [00:01:34.000] Open files: 
Info 27   [00:01:35.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 27   [00:01:36.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}

Info 27   [00:01:37.000] response:
    {
      "responseRequired": false
    }
Info 28   [00:01:38.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}

Info 29   [00:01:39.000] Search path: /user/username/projects/myproject/dependency
Info 30   [00:01:40.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 31   [00:01:41.000] Creating configuration project /user/username/projects/myproject/dependency/tsconfig.json
Info 32   [00:01:42.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
Info 33   [00:01:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 34   [00:01:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 35   [00:01:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 36   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 37   [00:01:47.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 38   [00:01:48.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 39   [00:01:49.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 40   [00:01:50.000] -----------------------------------------------
Info 41   [00:01:51.000] Search path: /user/username/projects/myproject/dependency
Info 42   [00:01:52.000] For info: /user/username/projects/myproject/dependency/tsconfig.json :: No config files found.
Info 43   [00:01:53.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 43   [00:01:54.000] 	Files (2)

Info 43   [00:01:55.000] -----------------------------------------------
Info 43   [00:01:56.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 43   [00:01:57.000] 	Files (2)

Info 43   [00:01:58.000] -----------------------------------------------
Info 43   [00:01:59.000] Open files: 
Info 43   [00:02:00.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 43   [00:02:01.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 43   [00:02:02.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 43   [00:02:03.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}

Info 43   [00:02:04.000] response:
    {
      "responseRequired": false
    }
Info 44   [00:02:05.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}

Info 45   [00:02:06.000] Search path: /user/username/projects/myproject/random
Info 46   [00:02:07.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 47   [00:02:08.000] Creating configuration project /user/username/projects/myproject/random/tsconfig.json
Info 48   [00:02:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Config file
Info 49   [00:02:10.000] Config: /user/username/projects/myproject/random/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/random/random.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/random/tsconfig.json"
 }
}
Info 50   [00:02:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 51   [00:02:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 52   [00:02:13.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json
Info 53   [00:02:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 54   [00:02:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 55   [00:02:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 56   [00:02:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 57   [00:02:18.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 58   [00:02:19.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 59   [00:02:20.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/random/random.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	random.ts
	  Matched by default include pattern '**/*'

Info 60   [00:02:21.000] -----------------------------------------------
Info 61   [00:02:22.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 61   [00:02:23.000] 	Files (2)

Info 61   [00:02:24.000] -----------------------------------------------
Info 61   [00:02:25.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 61   [00:02:26.000] 	Files (2)

Info 61   [00:02:27.000] -----------------------------------------------
Info 61   [00:02:28.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 61   [00:02:29.000] 	Files (2)

Info 61   [00:02:30.000] -----------------------------------------------
Info 61   [00:02:31.000] Open files: 
Info 61   [00:02:32.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 61   [00:02:33.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 61   [00:02:34.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 61   [00:02:35.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 61   [00:02:36.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 61   [00:02:37.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 61   [00:02:38.000] response:
    {
      "responseRequired": false
    }
Info 62   [00:02:39.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 9,
        "offset": 1
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 63   [00:02:40.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/main/main.ts",
            "start": {
              "line": 2,
              "offset": 5
            },
            "end": {
              "line": 2,
              "offset": 8
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 7,
              "offset": 22
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 9,
            "offset": 1
          },
          "end": {
            "line": 9,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 64   [00:02:41.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 10,
        "offset": 1
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 65   [00:02:42.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/main/main.ts",
            "start": {
              "line": 3,
              "offset": 5
            },
            "end": {
              "line": 3,
              "offset": 8
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 7,
              "offset": 22
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 10,
            "offset": 1
          },
          "end": {
            "line": 10,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 66   [00:02:43.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 11,
        "offset": 1
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 67   [00:02:44.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/main/main.ts",
            "start": {
              "line": 4,
              "offset": 5
            },
            "end": {
              "line": 4,
              "offset": 8
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 7,
              "offset": 22
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 11,
            "offset": 1
          },
          "end": {
            "line": 11,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 68   [00:02:45.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 12,
        "offset": 1
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 69   [00:02:46.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/main/main.ts",
            "start": {
              "line": 5,
              "offset": 5
            },
            "end": {
              "line": 5,
              "offset": 8
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 7,
              "offset": 22
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 12,
            "offset": 1
          },
          "end": {
            "line": 12,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 70   [00:02:47.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 13,
        "offset": 1
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 71   [00:02:48.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/main/main.ts",
            "start": {
              "line": 6,
              "offset": 5
            },
            "end": {
              "line": 6,
              "offset": 8
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 7,
              "offset": 22
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 13,
            "offset": 1
          },
          "end": {
            "line": 13,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 72   [00:02:49.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 1,
        "offset": 17
      },
      "seq": 6,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 73   [00:02:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 74   [00:02:51.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn1",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn1",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 17
                },
                "end": {
                  "line": 1,
                  "offset": 20
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 75   [00:02:52.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 2,
        "offset": 17
      },
      "seq": 7,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 76   [00:02:53.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn2",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn2",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 2,
              "offset": 17
            },
            "end": {
              "line": 2,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
                "start": {
                  "line": 2,
                  "offset": 17
                },
                "end": {
                  "line": 2,
                  "offset": 20
                },
                "contextStart": {
                  "line": 2,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 2,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 77   [00:02:54.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 3,
        "offset": 17
      },
      "seq": 8,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 78   [00:02:55.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn3",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn3",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 3,
              "offset": 17
            },
            "end": {
              "line": 3,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 17
                },
                "end": {
                  "line": 3,
                  "offset": 20
                },
                "contextStart": {
                  "line": 3,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 3,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 79   [00:02:56.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 4,
        "offset": 17
      },
      "seq": 9,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 80   [00:02:57.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn4",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn4",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 4,
              "offset": 17
            },
            "end": {
              "line": 4,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
                "start": {
                  "line": 4,
                  "offset": 17
                },
                "end": {
                  "line": 4,
                  "offset": 20
                },
                "contextStart": {
                  "line": 4,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 4,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 81   [00:02:58.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 5,
        "offset": 17
      },
      "seq": 10,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 82   [00:02:59.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn5",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn5",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 5,
              "offset": 17
            },
            "end": {
              "line": 5,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
                "start": {
                  "line": 5,
                  "offset": 17
                },
                "end": {
                  "line": 5,
                  "offset": 20
                },
                "contextStart": {
                  "line": 5,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 5,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 83   [00:03:00.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 84   [00:03:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 85   [00:03:02.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 85   [00:03:03.000] 	Files (2)

Info 85   [00:03:04.000] -----------------------------------------------
Info 85   [00:03:05.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 85   [00:03:06.000] 	Files (2)

Info 85   [00:03:07.000] -----------------------------------------------
Info 85   [00:03:08.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 85   [00:03:09.000] 	Files (2)

Info 85   [00:03:10.000] -----------------------------------------------
Info 85   [00:03:11.000] Open files: 
Info 85   [00:03:12.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 85   [00:03:13.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 85   [00:03:14.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 85   [00:03:15.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 85   [00:03:16.000] response:
    {
      "responseRequired": false
    }
Info 86   [00:03:17.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 87   [00:03:18.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 88   [00:03:19.000] Search path: /user/username/projects/myproject/random
Info 89   [00:03:20.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 90   [00:03:21.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 90   [00:03:22.000] 	Files (2)

Info 90   [00:03:23.000] -----------------------------------------------
Info 90   [00:03:24.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 90   [00:03:25.000] 	Files (2)

Info 90   [00:03:26.000] -----------------------------------------------
Info 90   [00:03:27.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 90   [00:03:28.000] 	Files (2)

Info 90   [00:03:29.000] -----------------------------------------------
Info 90   [00:03:30.000] Open files: 
Info 90   [00:03:31.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 90   [00:03:32.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 90   [00:03:33.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 90   [00:03:34.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 90   [00:03:35.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 90   [00:03:36.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 90   [00:03:37.000] response:
    {
      "responseRequired": false
    }
Info 91   [00:03:38.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 92   [00:03:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 93   [00:03:40.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 93   [00:03:41.000] 	Files (2)

Info 93   [00:03:42.000] -----------------------------------------------
Info 93   [00:03:43.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 93   [00:03:44.000] 	Files (2)

Info 93   [00:03:45.000] -----------------------------------------------
Info 93   [00:03:46.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 93   [00:03:47.000] 	Files (2)

Info 93   [00:03:48.000] -----------------------------------------------
Info 93   [00:03:49.000] Open files: 
Info 93   [00:03:50.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 93   [00:03:51.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 93   [00:03:52.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 93   [00:03:53.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 93   [00:03:54.000] response:
    {
      "responseRequired": false
    }
Info 94   [00:03:55.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 95   [00:03:56.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 96   [00:03:57.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 96   [00:03:58.000] 	Files (2)

Info 96   [00:03:59.000] -----------------------------------------------
Info 96   [00:04:00.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 96   [00:04:01.000] 	Files (2)

Info 96   [00:04:02.000] -----------------------------------------------
Info 96   [00:04:03.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 96   [00:04:04.000] 	Files (2)

Info 96   [00:04:05.000] -----------------------------------------------
Info 96   [00:04:06.000] Open files: 
Info 96   [00:04:07.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 96   [00:04:08.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 96   [00:04:09.000] response:
    {
      "responseRequired": false
    }
Info 97   [00:04:10.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 98   [00:04:11.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 99   [00:04:12.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 99   [00:04:13.000] 	Files (2)

Info 99   [00:04:14.000] -----------------------------------------------
Info 99   [00:04:15.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 99   [00:04:16.000] 	Files (2)

Info 99   [00:04:17.000] -----------------------------------------------
Info 99   [00:04:18.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 99   [00:04:19.000] 	Files (2)

Info 99   [00:04:20.000] -----------------------------------------------
Info 99   [00:04:21.000] Open files: 
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 99   [00:04:22.000] response:
    {
      "responseRequired": false
    }
Info 100  [00:04:23.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}
/user/username/projects/myproject/random:
  {}

Info 101  [00:04:24.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 102  [00:04:25.000] Search path: /user/username/projects/myproject/random
Info 103  [00:04:26.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 104  [00:04:27.000] `remove Project::
Info 105  [00:04:28.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 106  [00:04:29.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	main.ts
	  Matched by default include pattern '**/*'

Info 107  [00:04:30.000] -----------------------------------------------
Info 108  [00:04:31.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 109  [00:04:32.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 110  [00:04:33.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 111  [00:04:34.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 112  [00:04:35.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 113  [00:04:36.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 114  [00:04:37.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 115  [00:04:38.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 116  [00:04:39.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 117  [00:04:40.000] `remove Project::
Info 118  [00:04:41.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 119  [00:04:42.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 120  [00:04:43.000] -----------------------------------------------
Info 121  [00:04:44.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 122  [00:04:45.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 123  [00:04:46.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 124  [00:04:47.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 125  [00:04:48.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 126  [00:04:49.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 127  [00:04:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 128  [00:04:51.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 129  [00:04:52.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 130  [00:04:53.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 131  [00:04:54.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 131  [00:04:55.000] 	Files (2)

Info 131  [00:04:56.000] -----------------------------------------------
Info 131  [00:04:57.000] Open files: 
Info 131  [00:04:58.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 131  [00:04:59.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/random:
  {}

Info 131  [00:05:00.000] response:
    {
      "responseRequired": false
    }