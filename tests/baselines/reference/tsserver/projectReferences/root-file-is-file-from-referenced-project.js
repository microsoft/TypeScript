Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/src/common/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declarationMap": true,
    "outDir": "../../out",
    "baseUrl": "..",
    "disableSourceOfProjectReferenceRedirect": false
  },
  "include": [
    "./**/*"
  ]
}

//// [/user/username/projects/project/src/common/input/keyboard.ts]
function bar() { return "just a random function so .d.ts location doesnt match"; }
export function evaluateKeyboardEvent() { }

//// [/user/username/projects/project/src/common/input/keyboard.test.ts]
import { evaluateKeyboardEvent } from 'common/input/keyboard';
function testEvaluateKeyboardEvent() {
    return evaluateKeyboardEvent();
}


//// [/user/username/projects/project/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declarationMap": true,
    "outDir": "../out",
    "baseUrl": ".",
    "paths": {
      "common/*": [
        "./common/*"
      ]
    },
    "tsBuildInfoFile": "../out/src.tsconfig.tsbuildinfo",
    "disableSourceOfProjectReferenceRedirect": false
  },
  "include": [
    "./**/*"
  ],
  "references": [
    {
      "path": "./common"
    }
  ]
}

//// [/user/username/projects/project/src/terminal.ts]
import { evaluateKeyboardEvent } from 'common/input/keyboard';
function foo() {
    return evaluateKeyboardEvent();
}


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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

//// [/user/username/projects/project/out/input/keyboard.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateKeyboardEvent = evaluateKeyboardEvent;
function bar() { return "just a random function so .d.ts location doesnt match"; }
function evaluateKeyboardEvent() { }


//// [/user/username/projects/project/out/input/keyboard.d.ts.map]
{"version":3,"file":"keyboard.d.ts","sourceRoot":"","sources":["../../src/common/input/keyboard.ts"],"names":[],"mappings":"AACA,wBAAgB,qBAAqB,SAAM"}

//// [/user/username/projects/project/out/input/keyboard.d.ts]
export declare function evaluateKeyboardEvent(): void;
//# sourceMappingURL=keyboard.d.ts.map

//// [/user/username/projects/project/out/input/keyboard.test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","../src/common/input/keyboard.ts","../src/common/input/keyboard.test.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-15187822601-function bar() { return \"just a random function so .d.ts location doesnt match\"; }\nexport function evaluateKeyboardEvent() { }","signature":"-14411843863-export declare function evaluateKeyboardEvent(): void;\n"},{"version":"-7258701250-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction testEvaluateKeyboardEvent() {\n    return evaluateKeyboardEvent();\n}\n","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"composite":true,"declarationMap":true,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./input/keyboard.test.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../src/common/input/keyboard.ts",
    "../src/common/input/keyboard.test.ts"
  ],
  "fileIdsList": [
    [
      "../src/common/input/keyboard.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/common/input/keyboard.ts": {
      "original": {
        "version": "-15187822601-function bar() { return \"just a random function so .d.ts location doesnt match\"; }\nexport function evaluateKeyboardEvent() { }",
        "signature": "-14411843863-export declare function evaluateKeyboardEvent(): void;\n"
      },
      "version": "-15187822601-function bar() { return \"just a random function so .d.ts location doesnt match\"; }\nexport function evaluateKeyboardEvent() { }",
      "signature": "-14411843863-export declare function evaluateKeyboardEvent(): void;\n"
    },
    "../src/common/input/keyboard.test.ts": {
      "original": {
        "version": "-7258701250-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction testEvaluateKeyboardEvent() {\n    return evaluateKeyboardEvent();\n}\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-7258701250-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction testEvaluateKeyboardEvent() {\n    return evaluateKeyboardEvent();\n}\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      2,
      "../src/common/input/keyboard.ts"
    ],
    [
      3,
      "../src/common/input/keyboard.test.ts"
    ]
  ],
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
  "latestChangedDtsFile": "./input/keyboard.test.d.ts",
  "version": "FakeTSVersion",
  "size": 1281
}

//// [/user/username/projects/project/out/terminal.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keyboard_1 = require("common/input/keyboard");
function foo() {
    return (0, keyboard_1.evaluateKeyboardEvent)();
}


//// [/user/username/projects/project/out/terminal.d.ts.map]
{"version":3,"file":"terminal.d.ts","sourceRoot":"","sources":["../src/terminal.ts"],"names":[],"mappings":""}

//// [/user/username/projects/project/out/terminal.d.ts]
export {};
//# sourceMappingURL=terminal.d.ts.map

//// [/user/username/projects/project/out/src.tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./input/keyboard.d.ts","../src/terminal.ts","./input/keyboard.test.d.ts","../src/common/input/keyboard.test.ts","../src/common/input/keyboard.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-14411843863-export declare function evaluateKeyboardEvent(): void;\n",{"version":"-9992649704-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction foo() {\n    return evaluateKeyboardEvent();\n}\n","signature":"-3531856636-export {};\n"},"-3531856636-export {};\n"],"root":[[2,4]],"resolvedRoot":[[4,5],[2,6]],"options":{"composite":true,"declarationMap":true,"outDir":"./","tsBuildInfoFile":"./src.tsconfig.tsbuildinfo"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./terminal.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/project/out/src.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./input/keyboard.d.ts",
    "../src/terminal.ts",
    "./input/keyboard.test.d.ts",
    "../src/common/input/keyboard.test.ts",
    "../src/common/input/keyboard.ts"
  ],
  "fileIdsList": [
    [
      "./input/keyboard.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./input/keyboard.d.ts": {
      "version": "-14411843863-export declare function evaluateKeyboardEvent(): void;\n",
      "signature": "-14411843863-export declare function evaluateKeyboardEvent(): void;\n"
    },
    "../src/terminal.ts": {
      "original": {
        "version": "-9992649704-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction foo() {\n    return evaluateKeyboardEvent();\n}\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-9992649704-import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction foo() {\n    return evaluateKeyboardEvent();\n}\n",
      "signature": "-3531856636-export {};\n"
    },
    "./input/keyboard.test.d.ts": {
      "version": "-3531856636-export {};\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./input/keyboard.d.ts",
        "../src/terminal.ts",
        "./input/keyboard.test.d.ts"
      ]
    ]
  ],
  "resolvedRoot": [
    [
      [
        4,
        5
      ],
      [
        "./input/keyboard.test.d.ts",
        "../src/common/input/keyboard.test.ts"
      ]
    ],
    [
      [
        2,
        6
      ],
      [
        "./input/keyboard.d.ts",
        "../src/common/input/keyboard.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "declarationMap": true,
    "outDir": "./",
    "tsBuildInfoFile": "./src.tsconfig.tsbuildinfo"
  },
  "referencedMap": {
    "../src/terminal.ts": [
      "./input/keyboard.d.ts"
    ]
  },
  "latestChangedDtsFile": "./terminal.d.ts",
  "version": "FakeTSVersion",
  "size": 1258
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/src/common/input/keyboard.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/src/common/input/keyboard.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/src/common/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/project/src/common/tsconfig.json, currentDirectory: /user/username/projects/project/src/common
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/tsconfig.json 2000 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/src/common/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/src/common/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/project/src/common/input/keyboard.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common 1 undefined Config: /user/username/projects/project/src/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common 1 undefined Config: /user/username/projects/project/src/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/input/keyboard.test.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/src/common/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/src/common/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/src/common/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/src/common/input/keyboard.ts SVC-1-0 "function bar() { return \"just a random function so .d.ts location doesnt match\"; }\nexport function evaluateKeyboardEvent() { }"
	/user/username/projects/project/src/common/input/keyboard.test.ts Text-1 "import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction testEvaluateKeyboardEvent() {\n    return evaluateKeyboardEvent();\n}\n"


	../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	input/keyboard.ts
	  Imported via 'common/input/keyboard' from file 'input/keyboard.test.ts'
	  Matched by include pattern './**/*' in 'tsconfig.json'
	input/keyboard.test.ts
	  Matched by include pattern './**/*' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/src/common/tsconfig.json"
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
          "projectId": "58d12dd71f80dfa0ccecae0e067ef09b37055067324c54b473f0a9633cac0e9d",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 266,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "declarationMap": true,
            "outDir": "",
            "baseUrl": "",
            "disableSourceOfProjectReferenceRedirect": false
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
        "triggerFile": "/user/username/projects/project/src/common/input/keyboard.ts",
        "configFile": "/user/username/projects/project/src/common/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/src/common/tsconfig.json ProjectRootPath: undefined:: Result: /user/username/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/project/src/tsconfig.json, currentDirectory: /user/username/projects/project/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/src/tsconfig.json 2000 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/src/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/src/common/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/src/common/input/keyboard.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/src/common/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/src/common/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/src/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project/src/common/input/keyboard.test.ts: *new*
  {}
/user/username/projects/project/src/common/tsconfig.json: *new*
  {}
/user/username/projects/project/src/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/project/src/common: *new*
  {}

Projects::
/user/username/projects/project/src/common/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/project/src/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
    initialLoadPending: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/src/common/tsconfig.json
/user/username/projects/project/src/common/input/keyboard.test.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/src/common/tsconfig.json
/user/username/projects/project/src/common/input/keyboard.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/src/common/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/src/terminal.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/src/terminal.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/src/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/src/tsconfig.json",
        "reason": "Creating project possibly referencing default composite project /user/username/projects/project/src/common/tsconfig.json of open file /user/username/projects/project/src/common/input/keyboard.ts"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src 1 undefined Config: /user/username/projects/project/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src 1 undefined Config: /user/username/projects/project/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/src/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/src/common/input/keyboard.ts SVC-1-0 "function bar() { return \"just a random function so .d.ts location doesnt match\"; }\nexport function evaluateKeyboardEvent() { }"
	/user/username/projects/project/src/terminal.ts SVC-1-0 "import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction foo() {\n    return evaluateKeyboardEvent();\n}\n"
	/user/username/projects/project/src/common/input/keyboard.test.ts Text-1 "import { evaluateKeyboardEvent } from 'common/input/keyboard';\nfunction testEvaluateKeyboardEvent() {\n    return evaluateKeyboardEvent();\n}\n"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	common/input/keyboard.ts
	  Imported via 'common/input/keyboard' from file 'terminal.ts'
	  Imported via 'common/input/keyboard' from file 'common/input/keyboard.test.ts'
	  Matched by include pattern './**/*' in 'tsconfig.json'
	terminal.ts
	  Matched by include pattern './**/*' in 'tsconfig.json'
	common/input/keyboard.test.ts
	  Matched by include pattern './**/*' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/src/tsconfig.json"
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
          "projectId": "c14c2b498e8950e1cc4bf8754b3abe14d8f8b0a1518d9ec82740c213fa410edb",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 384,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "declarationMap": true,
            "outDir": "",
            "baseUrl": "",
            "paths": "",
            "tsBuildInfoFile": "",
            "disableSourceOfProjectReferenceRedirect": false
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
        "triggerFile": "/user/username/projects/project/src/terminal.ts",
        "configFile": "/user/username/projects/project/src/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/src/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/src/common/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/src/common/input/keyboard.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/src/common/tsconfig.json,/user/username/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/src/terminal.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/src/common/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/src/common/input/keyboard.test.ts:
  {}
/user/username/projects/project/src/common/tsconfig.json:
  {}
/user/username/projects/project/src/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/src: *new*
  {}
/user/username/projects/project/src/common:
  {}

Projects::
/user/username/projects/project/src/common/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    dirty: false *changed*
    initialLoadPending: false *changed*
    autoImportProviderHost: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/project/src/common/tsconfig.json
        /user/username/projects/project/src/tsconfig.json *new*
/user/username/projects/project/src/common/input/keyboard.test.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/project/src/common/tsconfig.json
        /user/username/projects/project/src/tsconfig.json *new*
/user/username/projects/project/src/common/input/keyboard.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 2 *changed*
        /user/username/projects/project/src/common/tsconfig.json *default*
        /user/username/projects/project/src/tsconfig.json *new*
/user/username/projects/project/src/terminal.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/src/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/project/src/common/input/keyboard.ts",
        "line": 2,
        "offset": 17
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/project/src/common/input/keyboard.ts position 99 in project /user/username/projects/project/src/common/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/project/src/common/input/keyboard.ts position 99 in project /user/username/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/src/common/input/keyboard.test.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/src/common/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/src/common/input/keyboard.test.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/src/common/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/src/common/input/keyboard.test.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/src/common/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
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
After request

Projects::
/user/username/projects/project/src/common/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
    originalConfiguredProjects: 2 *changed*
        /user/username/projects/project/src/common/tsconfig.json *new*
        /user/username/projects/project/src/tsconfig.json *new*
