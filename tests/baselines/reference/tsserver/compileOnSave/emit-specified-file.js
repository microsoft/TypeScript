Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/workspace/projects/b/f1.ts]
export function Foo() { return 10; }

//// [/home/src/workspace/projects/b/f2.ts]
import {Foo} from "./f1"; let y = Foo();

//// [/home/src/workspace/projects/b/tsconfig.json]
{}

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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspace/projects/b/f1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspace/projects/b/f1.ts ProjectRootPath: undefined:: Result: /home/src/workspace/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspace/projects/b/tsconfig.json, currentDirectory: /home/src/workspace/projects/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/tsconfig.json 2000 undefined Project: /home/src/workspace/projects/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspace/projects/b/tsconfig.json : {
 "rootNames": [
  "/home/src/workspace/projects/b/f1.ts",
  "/home/src/workspace/projects/b/f2.ts"
 ],
 "options": {
  "configFilePath": "/home/src/workspace/projects/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspace/projects/b/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspace/projects/b/f1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b 1 undefined Config: /home/src/workspace/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b 1 undefined Config: /home/src/workspace/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/f2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspace/projects/b/f1.ts SVC-1-0 "export function Foo() { return 10; }"
	/home/src/workspace/projects/b/f2.ts Text-1 "import {Foo} from \"./f1\"; let y = Foo();"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by default include pattern '**/*'
	  Imported via "./f1" from file 'f2.ts'
	f2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspace/projects/b/tsconfig.json"
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
          "projectId": "c0a84d11f98c5933c3e8f82d2291dbd11543de93a797aefb5c207ade07013ab3",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 76,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
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
        "triggerFile": "/home/src/workspace/projects/b/f1.ts",
        "configFile": "/home/src/workspace/projects/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/b/f1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/b/tsconfig.json
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
/home/src/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspace/projects/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspace/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspace/projects/b/f2.ts: *new*
  {}
/home/src/workspace/projects/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspace/projects/b: *new*
  {}

Projects::
/home/src/workspace/projects/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/f1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json *default*
/home/src/workspace/projects/b/f2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspace/projects/b/f2.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/b/f2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspace/projects/b/f2.ts ProjectRootPath: undefined:: Result: /home/src/workspace/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/b/f1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/b/f2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true
    }
After request

PolledWatches::
/home/src/workspace/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspace/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspace/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspace/projects/b/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/workspace/projects/b/f2.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/b:
  {}

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/f1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json *default*
/home/src/workspace/projects/b/f2.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/home/src/workspace/projects/b/f1.ts",
        "projectFileName": "/home/src/workspace/projects/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/b/f1.js :: WatchInfo: /home/src/workspace/projects/b 1 undefined Config: /home/src/workspace/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /home/src/workspace/projects/b/tsconfig.json Detected file add/remove of non supported extension: /home/src/workspace/projects/b/f1.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/b/f1.js :: WatchInfo: /home/src/workspace/projects/b 1 undefined Config: /home/src/workspace/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/home/src/workspace/projects/b/f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
function Foo() { return 10; }


