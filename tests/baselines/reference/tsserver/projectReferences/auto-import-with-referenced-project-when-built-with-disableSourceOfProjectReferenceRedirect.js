Info 0    [00:01:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/app/src/program/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/user/username/projects/myproject/tsconfig.json]
{"files":[],"references":[{"path":"shared/src/library"},{"path":"app/src/program"}]}

//// [/user/username/projects/myproject/shared/src/library/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"../../bld/library"}}

//// [/user/username/projects/myproject/shared/src/library/index.ts]
export function foo() {}

//// [/user/username/projects/myproject/shared/package.json]
{"name":"shared","version":"1.0.0","main":"bld/library/index.js","types":"bld/library/index.d.ts"}

//// [/user/username/projects/myproject/app/src/program/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"../../bld/program","disableSourceOfProjectReferenceRedirect":true},"references":[{"path":"../../../shared/src/library"}]}

//// [/user/username/projects/myproject/app/src/program/bar.ts]
import {foo} from "shared";

//// [/user/username/projects/myproject/app/src/program/index.ts]
foo

//// [/user/username/projects/myproject/node_modules/shared] symlink(/user/username/projects/myproject/shared)
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

//// [/user/username/projects/myproject/shared/bld/library/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
function foo() { }
exports.foo = foo;


//// [/user/username/projects/myproject/shared/bld/library/index.d.ts]
export declare function foo(): void;


//// [/user/username/projects/myproject/shared/bld/library/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../a/lib/lib.d.ts","../../src/library/index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n"}],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/shared/bld/library/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../a/lib/lib.d.ts",
      "../../src/library/index.ts"
    ],
    "fileInfos": {
      "../../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../../src/library/index.ts": {
        "original": {
          "version": "3524703962-export function foo() {}",
          "signature": "-5677608893-export declare function foo(): void;\n"
        },
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../../a/lib/lib.d.ts",
      "../../src/library/index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 807
}

//// [/user/username/projects/myproject/app/bld/program/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../a/lib/lib.d.ts","../../../shared/bld/library/index.d.ts","../../src/program/bar.ts","../../src/program/index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-5677608893-export declare function foo(): void;\n","-9677035610-import {foo} from \"shared\";",{"version":"193491849-foo","affectsGlobalScope":true}],"options":{"composite":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,3,[4,[{"file":"../../src/program/index.ts","start":0,"length":3,"messageText":"Cannot find name 'foo'.","category":1,"code":2304}]],2],"affectedFilesPendingEmit":[3,4],"emitSignatures":[3,4]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/app/bld/program/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../a/lib/lib.d.ts",
      "../../../shared/bld/library/index.d.ts",
      "../../src/program/bar.ts",
      "../../src/program/index.ts"
    ],
    "fileNamesList": [
      [
        "../../../shared/bld/library/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../../../shared/bld/library/index.d.ts": {
        "version": "-5677608893-export declare function foo(): void;\n",
        "signature": "-5677608893-export declare function foo(): void;\n"
      },
      "../../src/program/bar.ts": {
        "version": "-9677035610-import {foo} from \"shared\";",
        "signature": "-9677035610-import {foo} from \"shared\";"
      },
      "../../src/program/index.ts": {
        "original": {
          "version": "193491849-foo",
          "affectsGlobalScope": true
        },
        "version": "193491849-foo",
        "signature": "193491849-foo",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../../src/program/bar.ts": [
        "../../../shared/bld/library/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/program/bar.ts": [
        "../../../shared/bld/library/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../a/lib/lib.d.ts",
      "../../src/program/bar.ts",
      [
        "../../src/program/index.ts",
        [
          {
            "file": "../../src/program/index.ts",
            "start": 0,
            "length": 3,
            "messageText": "Cannot find name 'foo'.",
            "category": 1,
            "code": 2304
          }
        ]
      ],
      "../../../shared/bld/library/index.d.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../../src/program/bar.ts",
        "Js | Dts"
      ],
      [
        "../../src/program/index.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "../../src/program/bar.ts",
      "../../src/program/index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1091
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:13.000] Search path: /user/username/projects/myproject/app/src/program
Info 3    [00:01:14.000] For info: /user/username/projects/myproject/app/src/program/index.ts :: Config file name: /user/username/projects/myproject/app/src/program/tsconfig.json
Info 4    [00:01:15.000] Creating configuration project /user/username/projects/myproject/app/src/program/tsconfig.json
Info 5    [00:01:16.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Config file
Info 6    [00:01:17.000] Config: /user/username/projects/myproject/app/src/program/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app/src/program/bar.ts",
  "/user/username/projects/myproject/app/src/program/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/app/bld/program",
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/myproject/app/src/program/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/shared/src/library",
   "originalPath": "../../../shared/src/library"
  }
 ]
}
Info 7    [00:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program 1 undefined Config: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Wild card directory
Info 8    [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program 1 undefined Config: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Wild card directory
Info 9    [00:01:20.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/bar.ts 500 undefined WatchType: Closed Script info
Info 10   [00:01:21.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/app/src/program/tsconfig.json
Info 11   [00:01:22.000] Config: /user/username/projects/myproject/shared/src/library/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/shared/src/library/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/shared/bld/library",
  "configFilePath": "/user/username/projects/myproject/shared/src/library/tsconfig.json"
 }
}
Info 12   [00:01:23.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Config file
Info 13   [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library 1 undefined Config: /user/username/projects/myproject/shared/src/library/tsconfig.json WatchType: Wild card directory
Info 14   [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library 1 undefined Config: /user/username/projects/myproject/shared/src/library/tsconfig.json WatchType: Wild card directory
Info 15   [00:01:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/bld/library/index.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:01:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 17   [00:01:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:01:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 22   [00:01:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 23   [00:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 24   [00:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 25   [00:01:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/package.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: File location affecting resolution
Info 26   [00:01:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 27   [00:01:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 28   [00:01:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 29   [00:01:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 30   [00:01:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 31   [00:01:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 32   [00:01:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 33   [00:01:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 34   [00:01:45.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app/src/program/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 35   [00:01:46.000] Project '/user/username/projects/myproject/app/src/program/tsconfig.json' (Configured)
Info 36   [00:01:47.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/shared/bld/library/index.d.ts
	/user/username/projects/myproject/app/src/program/bar.ts
	/user/username/projects/myproject/app/src/program/index.ts


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../../../shared/bld/library/index.d.ts
	  Imported via "shared" from file 'bar.ts' with packageId 'shared/bld/library/index.d.ts@1.0.0'
	bar.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'

Info 37   [00:01:48.000] -----------------------------------------------
Info 38   [00:01:49.000] Search path: /user/username/projects/myproject/app/src/program
Info 39   [00:01:50.000] For info: /user/username/projects/myproject/app/src/program/tsconfig.json :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 40   [00:01:51.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 41   [00:01:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 42   [00:01:53.000] Search path: /user/username/projects/myproject
Info 43   [00:01:54.000] For info: /user/username/projects/myproject/tsconfig.json :: No config files found.
Info 44   [00:01:55.000] Project '/user/username/projects/myproject/app/src/program/tsconfig.json' (Configured)
Info 44   [00:01:56.000] 	Files (4)

Info 44   [00:01:57.000] -----------------------------------------------
Info 44   [00:01:58.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 44   [00:01:59.000] 	Files (0) InitialLoadPending

Info 44   [00:02:00.000] -----------------------------------------------
Info 44   [00:02:01.000] Open files: 
Info 44   [00:02:02.000] 	FileName: /user/username/projects/myproject/app/src/program/index.ts ProjectRootPath: undefined
Info 44   [00:02:03.000] 		Projects: /user/username/projects/myproject/app/src/program/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/app/src/program/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/app/src/program/tsconfig.json:
  {}
/user/username/projects/myproject/app/src/program/bar.ts:
  {}
/user/username/projects/myproject/shared/src/library/tsconfig.json:
  {}
/user/username/projects/myproject/shared/bld/library/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/shared/package.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/app/src/program:
  {}
/user/username/projects/myproject/shared/src/library:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 44   [00:02:04.000] response:
    {
      "responseRequired": false
    }
Info 45   [00:02:05.000] request:
    {
      "command": "getCodeFixes",
      "arguments": {
        "file": "/user/username/projects/myproject/app/src/program/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 4,
        "errorCodes": [
          2304
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/app/src/program/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/app/src/program/tsconfig.json:
  {}
/user/username/projects/myproject/app/src/program/bar.ts:
  {}
/user/username/projects/myproject/shared/src/library/tsconfig.json:
  {}
/user/username/projects/myproject/shared/bld/library/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/shared/package.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/app/src/program:
  {}
/user/username/projects/myproject/shared/src/library:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 46   [00:02:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 47   [00:02:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
After request

PolledWatches::
/user/username/projects/myproject/app/src/program/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/app/src/program/tsconfig.json:
  {}
/user/username/projects/myproject/app/src/program/bar.ts:
  {}
/user/username/projects/myproject/shared/src/library/tsconfig.json:
  {}
/user/username/projects/myproject/shared/bld/library/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/shared/package.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/app/src/program:
  {}
/user/username/projects/myproject/shared/src/library:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 48   [00:02:08.000] response:
    {
      "response": [
        {
          "fixName": "import",
          "description": "Add import from \"shared\"",
          "changes": [
            {
              "fileName": "/user/username/projects/myproject/app/src/program/index.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { foo } from \"shared\";\n\n"
                }
              ]
            }
          ]
        }
      ],
      "responseRequired": true
    }