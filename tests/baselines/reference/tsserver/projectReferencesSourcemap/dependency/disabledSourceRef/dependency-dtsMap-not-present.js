Info 0    [00:01:04.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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
Object.defineProperty(exports, "__esModule", { value: true });
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


//// [/user/username/projects/myproject/decls/FnS.d.ts]
export declare function fn1(): void;
export declare function fn2(): void;
export declare function fn3(): void;
export declare function fn4(): void;
export declare function fn5(): void;
//# sourceMappingURL=FnS.d.ts.map

//// [/user/username/projects/myproject/dependency/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./fns.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-18619918033-export function fn1() { }\nexport function fn2() { }\nexport function fn3() { }\nexport function fn4() { }\nexport function fn5() { }\n","signature":"-18267052502-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n"}],"root":[2],"options":{"composite":true,"declarationDir":"../decls","declarationMap":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"../decls/FnS.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/dependency/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./fns.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./fns.ts": {
        "original": {
          "version": "-18619918033-export function fn1() { }\nexport function fn2() { }\nexport function fn3() { }\nexport function fn4() { }\nexport function fn5() { }\n",
          "signature": "-18267052502-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n"
        },
        "version": "-18619918033-export function fn1() { }\nexport function fn2() { }\nexport function fn3() { }\nexport function fn4() { }\nexport function fn5() { }\n",
        "signature": "-18267052502-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n"
      }
    },
    "root": [
      [
        2,
        "./fns.ts"
      ]
    ],
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
  "size": 1101
}

//// [/user/username/projects/myproject/main/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../decls/fns.d.ts","./main.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-18267052502-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n",{"version":"-805644102-import {\n    fn1,\n    fn2,\n    fn3,\n    fn4,\n    fn5\n} from '../decls/fns'\n\nfn1();\nfn2();\nfn3();\nfn4();\nfn5();\n","signature":"-3531856636-export {};\n"}],"root":[3],"options":{"composite":true,"declarationMap":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./main.d.ts"},"version":"FakeTSVersion"}

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
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../decls/fns.d.ts": {
        "version": "-18267052502-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n",
        "signature": "-18267052502-export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\nexport declare function fn4(): void;\nexport declare function fn5(): void;\n"
      },
      "./main.ts": {
        "original": {
          "version": "-805644102-import {\n    fn1,\n    fn2,\n    fn3,\n    fn4,\n    fn5\n} from '../decls/fns'\n\nfn1();\nfn2();\nfn3();\nfn4();\nfn5();\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-805644102-import {\n    fn1,\n    fn2,\n    fn3,\n    fn4,\n    fn5\n} from '../decls/fns'\n\nfn1();\nfn2();\nfn3();\nfn4();\nfn5();\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        3,
        "./main.ts"
      ]
    ],
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
  "size": 1129
}


Info 1    [00:01:05.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:01:06.000] Search path: /user/username/projects/myproject/dependency
Info 3    [00:01:07.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 4    [00:01:08.000] Creating configuration project /user/username/projects/myproject/dependency/tsconfig.json
Info 5    [00:01:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Config file
Info 6    [00:01:10.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
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
Info 7    [00:01:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 8    [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 9    [00:01:13.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
Info 10   [00:01:14.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 12   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 13   [00:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 14   [00:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 15   [00:01:19.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:01:20.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 17   [00:01:21.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/dependency/FnS.ts SVC-1-0 "export function fn1() { }\nexport function fn2() { }\nexport function fn3() { }\nexport function fn4() { }\nexport function fn5() { }\n"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 18   [00:01:22.000] -----------------------------------------------
Info 19   [00:01:23.000] Search path: /user/username/projects/myproject/dependency
Info 20   [00:01:24.000] For info: /user/username/projects/myproject/dependency/tsconfig.json :: No config files found.
Info 21   [00:01:25.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 21   [00:01:26.000] 	Files (2)

Info 21   [00:01:27.000] -----------------------------------------------
Info 21   [00:01:28.000] Open files: 
Info 21   [00:01:29.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 21   [00:01:30.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 21   [00:01:31.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency: *new*
  {}

Before request

Info 22   [00:01:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 23   [00:01:33.000] Search path: /user/username/projects/myproject/random
Info 24   [00:01:34.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 25   [00:01:35.000] Creating configuration project /user/username/projects/myproject/random/tsconfig.json
Info 26   [00:01:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Config file
Info 27   [00:01:37.000] Config: /user/username/projects/myproject/random/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/random/random.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/random/tsconfig.json"
 }
}
Info 28   [00:01:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 29   [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 30   [00:01:40.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json
Info 31   [00:01:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 32   [00:01:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 33   [00:01:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 34   [00:01:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 35   [00:01:45.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [00:01:46.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 37   [00:01:47.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/random/random.ts SVC-1-0 "let a = 10;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	random.ts
	  Matched by default include pattern '**/*'

Info 38   [00:01:48.000] -----------------------------------------------
Info 39   [00:01:49.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 39   [00:01:50.000] 	Files (2)

Info 39   [00:01:51.000] -----------------------------------------------
Info 39   [00:01:52.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 39   [00:01:53.000] 	Files (2)

Info 39   [00:01:54.000] -----------------------------------------------
Info 39   [00:01:55.000] Open files: 
Info 39   [00:01:56.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 39   [00:01:57.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 39   [00:01:58.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 39   [00:01:59.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 39   [00:02:00.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random: *new*
  {}

Before request

Info 40   [00:02:01.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 1,
        "offset": 17
      },
      "seq": 3,
      "type": "request"
    }
Info 41   [00:02:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 500 undefined WatchType: Closed Script info
Info 42   [00:02:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts.map 2000 undefined WatchType: Missing source map file
Info 43   [00:02:04.000] response:
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
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts.map: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/decls/fns.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Before request

Info 44   [00:02:05.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 2,
        "offset": 17
      },
      "seq": 4,
      "type": "request"
    }
Info 45   [00:02:06.000] response:
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
After request

Before request

Info 46   [00:02:07.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 3,
        "offset": 17
      },
      "seq": 5,
      "type": "request"
    }
Info 47   [00:02:08.000] response:
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
After request

Before request

Info 48   [00:02:09.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 4,
        "offset": 17
      },
      "seq": 6,
      "type": "request"
    }
Info 49   [00:02:10.000] response:
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
After request

Before request

Info 50   [00:02:11.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 5,
        "offset": 17
      },
      "seq": 7,
      "type": "request"
    }
Info 51   [00:02:12.000] response:
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
After request

Before request

Info 52   [00:02:13.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info 53   [00:02:14.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 54   [00:02:15.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 54   [00:02:16.000] 	Files (2)

Info 54   [00:02:17.000] -----------------------------------------------
Info 54   [00:02:18.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 54   [00:02:19.000] 	Files (2)

Info 54   [00:02:20.000] -----------------------------------------------
Info 54   [00:02:21.000] Open files: 
Info 54   [00:02:22.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 54   [00:02:23.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 54   [00:02:24.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts.map:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/decls/fns.d.ts:
  {}
/user/username/projects/myproject/random/random.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Before request

Info 55   [00:02:25.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      },
      "seq": 9,
      "type": "request"
    }
Info 56   [00:02:26.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 57   [00:02:27.000] Search path: /user/username/projects/myproject/random
Info 58   [00:02:28.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 59   [00:02:29.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 59   [00:02:30.000] 	Files (2)

Info 59   [00:02:31.000] -----------------------------------------------
Info 59   [00:02:32.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 59   [00:02:33.000] 	Files (2)

Info 59   [00:02:34.000] -----------------------------------------------
Info 59   [00:02:35.000] Open files: 
Info 59   [00:02:36.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 59   [00:02:37.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 59   [00:02:38.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 59   [00:02:39.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 59   [00:02:40.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts.map:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/decls/fns.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Before request

Info 60   [00:02:41.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts"
      },
      "seq": 10,
      "type": "request"
    }
Info 61   [00:02:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 62   [00:02:43.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 62   [00:02:44.000] 	Files (2)

Info 62   [00:02:45.000] -----------------------------------------------
Info 62   [00:02:46.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 62   [00:02:47.000] 	Files (2)

Info 62   [00:02:48.000] -----------------------------------------------
Info 62   [00:02:49.000] Open files: 
Info 62   [00:02:50.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 62   [00:02:51.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 62   [00:02:52.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts.map:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/decls/fns.d.ts:
  {}
/user/username/projects/myproject/dependency/fns.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Before request

Info 63   [00:02:53.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      },
      "seq": 11,
      "type": "request"
    }
Info 64   [00:02:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 65   [00:02:55.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 65   [00:02:56.000] 	Files (2)

Info 65   [00:02:57.000] -----------------------------------------------
Info 65   [00:02:58.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 65   [00:02:59.000] 	Files (2)

Info 65   [00:03:00.000] -----------------------------------------------
Info 65   [00:03:01.000] Open files: 
Info 65   [00:03:02.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts.map:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/decls/fns.d.ts:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/user/username/projects/myproject/random/random.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Before request

Info 66   [00:03:03.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      },
      "seq": 12,
      "type": "request"
    }
Info 67   [00:03:04.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 68   [00:03:05.000] Search path: /user/username/projects/myproject/random
Info 69   [00:03:06.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 70   [00:03:07.000] `remove Project::
Info 71   [00:03:08.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 72   [00:03:09.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 73   [00:03:10.000] -----------------------------------------------
Info 74   [00:03:11.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 75   [00:03:12.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 76   [00:03:13.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Config file
Info 77   [00:03:14.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 78   [00:03:15.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 79   [00:03:16.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 80   [00:03:17.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 81   [00:03:18.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 82   [00:03:19.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 500 undefined WatchType: Closed Script info
Info 83   [00:03:20.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts.map 2000 undefined WatchType: Missing source map file
Info 84   [00:03:21.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 84   [00:03:22.000] 	Files (2)

Info 84   [00:03:23.000] -----------------------------------------------
Info 84   [00:03:24.000] Open files: 
Info 84   [00:03:25.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 84   [00:03:26.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 84   [00:03:27.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts.map:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/decls/fns.d.ts:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/random:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/dependency:
  {}
