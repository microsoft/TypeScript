Info 0    [16:01:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:01:18.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/src/common/input/keyboard.ts"
      }
    }
//// [/user/username/projects/project/src/common/tsconfig.json]
{"compilerOptions":{"composite":true,"declarationMap":true,"outDir":"../../out","baseUrl":"..","disableSourceOfProjectReferenceRedirect":false},"include":["./**/*"]}

//// [/user/username/projects/project/src/common/input/keyboard.ts]
function bar() { return "just a random function so .d.ts location doesnt match"; }
export function evaluateKeyboardEvent() { }

//// [/user/username/projects/project/src/common/input/keyboard.test.ts]
import { evaluateKeyboardEvent } from 'common/input/keyboard';
function testEvaluateKeyboardEvent() {
    return evaluateKeyboardEvent();
}


//// [/user/username/projects/project/src/tsconfig.json]
{"compilerOptions":{"composite":true,"declarationMap":true,"outDir":"../out","baseUrl":".","paths":{"common/*":["./common/*"]},"tsBuildInfoFile":"../out/src.tsconfig.tsbuildinfo","disableSourceOfProjectReferenceRedirect":false},"include":["./**/*"],"references":[{"path":"./common"}]}

//// [/user/username/projects/project/src/terminal.ts]
import { evaluateKeyboardEvent } from 'common/input/keyboard';
function foo() {
    return evaluateKeyboardEvent();
}


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

//// [/user/username/projects/project/out/input/keyboard.js]
"use strict";
exports.__esModule = true;
exports.evaluateKeyboardEvent = void 0;
function bar() { return "just a random function so .d.ts location doesnt match"; }
function evaluateKeyboardEvent() { }
exports.evaluateKeyboardEvent = evaluateKeyboardEvent;


//// [/user/username/projects/project/out/input/keyboard.d.ts.map]
{"version":3,"file":"keyboard.d.ts","sourceRoot":"","sources":["../../src/common/input/keyboard.ts"],"names":[],"mappings":"AACA,wBAAgB,qBAAqB,SAAM"}

//// [/user/username/projects/project/out/input/keyboard.d.ts]
export declare function evaluateKeyboardEvent(): void;
//# sourceMappingURL=keyboard.d.ts.map

//// [/user/username/projects/project/out/input/keyboard.test.js]
"use strict";
exports.__esModule = true;
var keyboard_1 = require("common/input/keyboard");
function testEvaluateKeyboardEvent() {
    return (0, keyboard_1.evaluateKeyboardEvent)();
}


//// [/user/username/projects/project/out/input/keyboard.test.d.ts.map]
{"version":3,"file":"keyboard.test.d.ts","sourceRoot":"","sources":["../../src/common/input/keyboard.test.ts"],"names":[],"mappings":""}

//// [/user/username/projects/project/out/input/keyboard.test.d.ts]
export {};
//# sourceMappingURL=keyboard.test.d.ts.map

//// [/user/username/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../src/common/input/keyboard.ts","../src/common/input/keyboard.test.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-15187822601-function bar() { return \"just a random function so .d.ts location doesnt match\"; }\nexport function evaluateKeyboardEvent() { }","signature":"-14411843863-export declare function evaluateKeyboardEvent(): void;\n"},{"version":"-7258701250-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction testEvaluateKeyboardEvent() {\n    return evaluateKeyboardEvent();\n}\n","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"declarationMap":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2],"latestChangedDtsFile":"./input/keyboard.test.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../src/common/input/keyboard.ts",
      "../src/common/input/keyboard.test.ts"
    ],
    "fileNamesList": [
      [
        "../src/common/input/keyboard.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../src/common/input/keyboard.ts": {
        "version": "-15187822601-function bar() { return \"just a random function so .d.ts location doesnt match\"; }\nexport function evaluateKeyboardEvent() { }",
        "signature": "-14411843863-export declare function evaluateKeyboardEvent(): void;\n"
      },
      "../src/common/input/keyboard.test.ts": {
        "version": "-7258701250-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction testEvaluateKeyboardEvent() {\n    return evaluateKeyboardEvent();\n}\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "declarationMap": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/common/input/keyboard.test.ts": [
        "../src/common/input/keyboard.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../src/common/input/keyboard.test.ts",
      "../src/common/input/keyboard.ts"
    ],
    "latestChangedDtsFile": "./input/keyboard.test.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1244
}

//// [/user/username/projects/project/out/terminal.js]
"use strict";
exports.__esModule = true;
var keyboard_1 = require("common/input/keyboard");
function foo() {
    return (0, keyboard_1.evaluateKeyboardEvent)();
}


//// [/user/username/projects/project/out/terminal.d.ts.map]
{"version":3,"file":"terminal.d.ts","sourceRoot":"","sources":["../src/terminal.ts"],"names":[],"mappings":""}

//// [/user/username/projects/project/out/terminal.d.ts]
export {};
//# sourceMappingURL=terminal.d.ts.map

//// [/user/username/projects/project/out/common/input/keyboard.test.js]
"use strict";
exports.__esModule = true;
var keyboard_1 = require("common/input/keyboard");
function testEvaluateKeyboardEvent() {
    return (0, keyboard_1.evaluateKeyboardEvent)();
}


//// [/user/username/projects/project/out/common/input/keyboard.test.d.ts.map]
{"version":3,"file":"keyboard.test.d.ts","sourceRoot":"","sources":["../../../src/common/input/keyboard.test.ts"],"names":[],"mappings":""}

//// [/user/username/projects/project/out/common/input/keyboard.test.d.ts]
export {};
//# sourceMappingURL=keyboard.test.d.ts.map

//// [/user/username/projects/project/out/src.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./input/keyboard.d.ts","../src/terminal.ts","../src/common/input/keyboard.test.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-31108785029-export declare function evaluateKeyboardEvent(): void;\n//# sourceMappingURL=keyboard.d.ts.map",{"version":"-9992649704-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction foo() {\n    return evaluateKeyboardEvent();\n}\n","signature":"-3531856636-export {};\n"},{"version":"-7258701250-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction testEvaluateKeyboardEvent() {\n    return evaluateKeyboardEvent();\n}\n","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"declarationMap":true,"outDir":"./","tsBuildInfoFile":"./src.tsconfig.tsbuildinfo"},"fileIdsList":[[2]],"referencedMap":[[4,1],[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,4,3],"latestChangedDtsFile":"./common/input/keyboard.test.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/project/out/src.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./input/keyboard.d.ts",
      "../src/terminal.ts",
      "../src/common/input/keyboard.test.ts"
    ],
    "fileNamesList": [
      [
        "./input/keyboard.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./input/keyboard.d.ts": {
        "version": "-31108785029-export declare function evaluateKeyboardEvent(): void;\n//# sourceMappingURL=keyboard.d.ts.map",
        "signature": "-31108785029-export declare function evaluateKeyboardEvent(): void;\n//# sourceMappingURL=keyboard.d.ts.map"
      },
      "../src/terminal.ts": {
        "version": "-9992649704-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction foo() {\n    return evaluateKeyboardEvent();\n}\n",
        "signature": "-3531856636-export {};\n"
      },
      "../src/common/input/keyboard.test.ts": {
        "version": "-7258701250-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction testEvaluateKeyboardEvent() {\n    return evaluateKeyboardEvent();\n}\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "declarationMap": true,
      "outDir": "./",
      "tsBuildInfoFile": "./src.tsconfig.tsbuildinfo"
    },
    "referencedMap": {
      "../src/common/input/keyboard.test.ts": [
        "./input/keyboard.d.ts"
      ],
      "../src/terminal.ts": [
        "./input/keyboard.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./input/keyboard.d.ts",
      "../src/common/input/keyboard.test.ts",
      "../src/terminal.ts"
    ],
    "latestChangedDtsFile": "./common/input/keyboard.test.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1374
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:01:19.000] Search path: /user/username/projects/project/src/common/input
Info 3    [16:01:20.000] For info: /user/username/projects/project/src/common/input/keyboard.ts :: Config file name: /user/username/projects/project/src/common/tsconfig.json
Info 4    [16:01:21.000] Creating configuration project /user/username/projects/project/src/common/tsconfig.json
Info 5    [16:01:22.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/tsconfig.json 2000 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Config file
Info 6    [16:01:23.000] Config: /user/username/projects/project/src/common/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/src/common/input/keyboard.test.ts",
  "/user/username/projects/project/src/common/input/keyboard.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "outDir": "/user/username/projects/project/out",
  "baseUrl": "/user/username/projects/project/src",
  "disableSourceOfProjectReferenceRedirect": false,
  "configFilePath": "/user/username/projects/project/src/common/tsconfig.json"
 }
}
Info 7    [16:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common 1 undefined Config: /user/username/projects/project/src/common/tsconfig.json WatchType: Wild card directory
Info 8    [16:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common 1 undefined Config: /user/username/projects/project/src/common/tsconfig.json WatchType: Wild card directory
Info 9    [16:01:26.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:01:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/input/keyboard.test.ts 500 undefined WatchType: Closed Script info
Info 11   [16:01:28.000] Starting updateGraphWorker: Project: /user/username/projects/project/src/common/tsconfig.json
Info 12   [16:01:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [16:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info 14   [16:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info 15   [16:01:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info 16   [16:01:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info 17   [16:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info 18   [16:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info 19   [16:01:36.000] Finishing updateGraphWorker: Project: /user/username/projects/project/src/common/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [16:01:37.000] Project '/user/username/projects/project/src/common/tsconfig.json' (Configured)
Info 21   [16:01:38.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/project/src/common/input/keyboard.ts
	/user/username/projects/project/src/common/input/keyboard.test.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	input/keyboard.ts
	  Imported via 'common/input/keyboard' from file 'input/keyboard.test.ts'
	  Matched by include pattern './**/*' in 'tsconfig.json'
	input/keyboard.test.ts
	  Matched by include pattern './**/*' in 'tsconfig.json'

Info 22   [16:01:39.000] -----------------------------------------------
Info 23   [16:01:40.000] Search path: /user/username/projects/project/src/common
Info 24   [16:01:41.000] For info: /user/username/projects/project/src/common/tsconfig.json :: Config file name: /user/username/projects/project/src/tsconfig.json
Info 25   [16:01:42.000] Creating configuration project /user/username/projects/project/src/tsconfig.json
Info 26   [16:01:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/src/tsconfig.json 2000 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Config file
Info 27   [16:01:44.000] Search path: /user/username/projects/project/src
Info 28   [16:01:45.000] For info: /user/username/projects/project/src/tsconfig.json :: No config files found.
Info 29   [16:01:46.000] Project '/user/username/projects/project/src/common/tsconfig.json' (Configured)
Info 29   [16:01:47.000] 	Files (3)

Info 29   [16:01:48.000] -----------------------------------------------
Info 29   [16:01:49.000] Project '/user/username/projects/project/src/tsconfig.json' (Configured)
Info 29   [16:01:50.000] 	Files (0) InitialLoadPending

Info 29   [16:01:51.000] -----------------------------------------------
Info 29   [16:01:52.000] Open files: 
Info 29   [16:01:53.000] 	FileName: /user/username/projects/project/src/common/input/keyboard.ts ProjectRootPath: undefined
Info 29   [16:01:54.000] 		Projects: /user/username/projects/project/src/common/tsconfig.json

PolledWatches::
/user/username/projects/project/src/common/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/project/src/common/tsconfig.json:
  {}
/user/username/projects/project/src/common/input/keyboard.test.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/project/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/src/common:
  {}

Info 29   [16:01:55.000] response:
    {
      "responseRequired": false
    }
Info 30   [16:01:56.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/src/terminal.ts"
      }
    }

PolledWatches::
/user/username/projects/project/src/common/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/project/src/common/tsconfig.json:
  {}
/user/username/projects/project/src/common/input/keyboard.test.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/project/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/src/common:
  {}

Info 31   [16:01:57.000] Search path: /user/username/projects/project/src
Info 32   [16:01:58.000] For info: /user/username/projects/project/src/terminal.ts :: Config file name: /user/username/projects/project/src/tsconfig.json
Info 33   [16:01:59.000] Loading configured project /user/username/projects/project/src/tsconfig.json
Info 34   [16:02:00.000] Config: /user/username/projects/project/src/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/src/terminal.ts",
  "/user/username/projects/project/src/common/input/keyboard.test.ts",
  "/user/username/projects/project/src/common/input/keyboard.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "outDir": "/user/username/projects/project/out",
  "baseUrl": "/user/username/projects/project/src",
  "paths": {
   "common/*": [
    "./common/*"
   ]
  },
  "tsBuildInfoFile": "/user/username/projects/project/out/src.tsconfig.tsbuildinfo",
  "disableSourceOfProjectReferenceRedirect": false,
  "pathsBasePath": "/user/username/projects/project/src",
  "configFilePath": "/user/username/projects/project/src/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/project/src/common",
   "originalPath": "./common"
  }
 ]
}
Info 35   [16:02:01.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src 1 undefined Config: /user/username/projects/project/src/tsconfig.json WatchType: Wild card directory
Info 36   [16:02:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src 1 undefined Config: /user/username/projects/project/src/tsconfig.json WatchType: Wild card directory
Info 37   [16:02:03.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 38   [16:02:04.000] Starting updateGraphWorker: Project: /user/username/projects/project/src/tsconfig.json
Info 39   [16:02:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info 40   [16:02:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info 41   [16:02:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info 42   [16:02:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info 43   [16:02:09.000] Finishing updateGraphWorker: Project: /user/username/projects/project/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [16:02:10.000] Project '/user/username/projects/project/src/tsconfig.json' (Configured)
Info 45   [16:02:11.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/project/src/common/input/keyboard.ts
	/user/username/projects/project/src/terminal.ts
	/user/username/projects/project/src/common/input/keyboard.test.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	common/input/keyboard.ts
	  Imported via 'common/input/keyboard' from file 'terminal.ts'
	  Imported via 'common/input/keyboard' from file 'common/input/keyboard.test.ts'
	  Matched by include pattern './**/*' in 'tsconfig.json'
	terminal.ts
	  Matched by include pattern './**/*' in 'tsconfig.json'
	common/input/keyboard.test.ts
	  Matched by include pattern './**/*' in 'tsconfig.json'

Info 46   [16:02:12.000] -----------------------------------------------
Info 47   [16:02:13.000] Search path: /user/username/projects/project/src
Info 48   [16:02:14.000] For info: /user/username/projects/project/src/tsconfig.json :: No config files found.
Info 49   [16:02:15.000] Project '/user/username/projects/project/src/common/tsconfig.json' (Configured)
Info 49   [16:02:16.000] 	Files (3)

Info 49   [16:02:17.000] -----------------------------------------------
Info 49   [16:02:18.000] Project '/user/username/projects/project/src/tsconfig.json' (Configured)
Info 49   [16:02:19.000] 	Files (4)

Info 49   [16:02:20.000] -----------------------------------------------
Info 49   [16:02:21.000] Open files: 
Info 49   [16:02:22.000] 	FileName: /user/username/projects/project/src/common/input/keyboard.ts ProjectRootPath: undefined
Info 49   [16:02:23.000] 		Projects: /user/username/projects/project/src/common/tsconfig.json,/user/username/projects/project/src/tsconfig.json
Info 49   [16:02:24.000] 	FileName: /user/username/projects/project/src/terminal.ts ProjectRootPath: undefined
Info 49   [16:02:25.000] 		Projects: /user/username/projects/project/src/tsconfig.json

PolledWatches::
/user/username/projects/project/src/common/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/project/src/common/tsconfig.json:
  {}
/user/username/projects/project/src/common/input/keyboard.test.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/project/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/src/common:
  {}
/user/username/projects/project/src:
  {}

Info 49   [16:02:26.000] response:
    {
      "responseRequired": false
    }
Info 50   [16:02:27.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/project/src/common/input/keyboard.ts",
        "line": 2,
        "offset": 17
      },
      "seq": 1,
      "type": "request"
    }

PolledWatches::
/user/username/projects/project/src/common/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/project/src/common/tsconfig.json:
  {}
/user/username/projects/project/src/common/input/keyboard.test.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/project/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/src/common:
  {}
/user/username/projects/project/src:
  {}

Info 51   [16:02:28.000] Finding references to /user/username/projects/project/src/common/input/keyboard.ts position 99 in project /user/username/projects/project/src/common/tsconfig.json
Info 52   [16:02:29.000] Finding references to /user/username/projects/project/src/common/input/keyboard.ts position 99 in project /user/username/projects/project/src/tsconfig.json
Info 53   [16:02:30.000] Search path: /user/username/projects/project/src/common/input
Info 54   [16:02:31.000] For info: /user/username/projects/project/src/common/input/keyboard.ts :: Config file name: /user/username/projects/project/src/common/tsconfig.json
Info 55   [16:02:32.000] Search path: /user/username/projects/project/src/common/input
Info 56   [16:02:33.000] For info: /user/username/projects/project/src/common/input/keyboard.ts :: Config file name: /user/username/projects/project/src/common/tsconfig.json
Info 57   [16:02:34.000] Search path: /user/username/projects/project/src/common/input
Info 58   [16:02:35.000] For info: /user/username/projects/project/src/common/input/keyboard.test.ts :: Config file name: /user/username/projects/project/src/common/tsconfig.json
Info 59   [16:02:36.000] Search path: /user/username/projects/project/src/common/input
Info 60   [16:02:37.000] For info: /user/username/projects/project/src/common/input/keyboard.test.ts :: Config file name: /user/username/projects/project/src/common/tsconfig.json
Info 61   [16:02:38.000] Search path: /user/username/projects/project/src/common/input
Info 62   [16:02:39.000] For info: /user/username/projects/project/src/common/input/keyboard.test.ts :: Config file name: /user/username/projects/project/src/common/tsconfig.json

PolledWatches::
/user/username/projects/project/src/common/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/project/src/common/tsconfig.json:
  {}
/user/username/projects/project/src/common/input/keyboard.test.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/project/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/src/common:
  {}
/user/username/projects/project/src:
  {}

Info 63   [16:02:40.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/project/src/common/input/keyboard.ts",
            "start": {
              "line": 2,
              "offset": 17
            },
            "end": {
              "line": 2,
              "offset": 38
            },
            "contextStart": {
              "line": 2,
              "offset": 1
            },
            "contextEnd": {
              "line": 2,
              "offset": 44
            },
            "lineText": "export function evaluateKeyboardEvent() { }",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/user/username/projects/project/src/common/input/keyboard.test.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 31
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 63
            },
            "lineText": "import { evaluateKeyboardEvent } from 'common/input/keyboard';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/project/src/common/input/keyboard.test.ts",
            "start": {
              "line": 3,
              "offset": 12
            },
            "end": {
              "line": 3,
              "offset": 33
            },
            "lineText": "    return evaluateKeyboardEvent();",
            "isWriteAccess": false,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/project/src/terminal.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 31
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 63
            },
            "lineText": "import { evaluateKeyboardEvent } from 'common/input/keyboard';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/project/src/terminal.ts",
            "start": {
              "line": 3,
              "offset": 12
            },
            "end": {
              "line": 3,
              "offset": 33
            },
            "lineText": "    return evaluateKeyboardEvent();",
            "isWriteAccess": false,
            "isDefinition": false
          }
        ],
        "symbolName": "evaluateKeyboardEvent",
        "symbolStartOffset": 17,
        "symbolDisplayString": "function evaluateKeyboardEvent(): void"
      },
      "responseRequired": true
    }