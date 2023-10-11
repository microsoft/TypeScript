Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/workspace/projects/b/moduleFile1.ts]
export function Foo() { };

//// [/home/src/workspace/projects/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/home/src/workspace/projects/b/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/home/src/workspace/projects/b/globalFile3.ts]
interface GlobalFoo { age: number }

//// [/home/src/workspace/projects/b/moduleFile2.ts]
export var Foo4 = 10;

//// [/home/src/workspace/projects/b/tsconfig.json]
{
                        "compileOnSave": true
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspace/projects/b/moduleFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspace/projects/b/moduleFile1.ts ProjectRootPath: undefined:: Result: /home/src/workspace/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspace/projects/b/tsconfig.json, currentDirectory: /home/src/workspace/projects/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/tsconfig.json 2000 undefined Project: /home/src/workspace/projects/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspace/projects/b/tsconfig.json : {
 "rootNames": [
  "/home/src/workspace/projects/b/file1Consumer1.ts",
  "/home/src/workspace/projects/b/file1Consumer2.ts",
  "/home/src/workspace/projects/b/globalFile3.ts",
  "/home/src/workspace/projects/b/moduleFile1.ts",
  "/home/src/workspace/projects/b/moduleFile2.ts"
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
        "reason": "Creating possible configured project for /home/src/workspace/projects/b/moduleFile1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b 1 undefined Config: /home/src/workspace/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b 1 undefined Config: /home/src/workspace/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/file1Consumer1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/file1Consumer2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/globalFile3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/moduleFile2.ts 500 undefined WatchType: Closed Script info
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
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspace/projects/b/moduleFile1.ts SVC-1-0 "export function Foo() { };"
	/home/src/workspace/projects/b/file1Consumer1.ts Text-1 "import {Foo} from \"./moduleFile1\"; export var y = 10;"
	/home/src/workspace/projects/b/file1Consumer2.ts Text-1 "import {Foo} from \"./moduleFile1\"; let z = 10;"
	/home/src/workspace/projects/b/globalFile3.ts Text-1 "interface GlobalFoo { age: number }"
	/home/src/workspace/projects/b/moduleFile2.ts Text-1 "export var Foo4 = 10;"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	moduleFile1.ts
	  Imported via "./moduleFile1" from file 'file1Consumer1.ts'
	  Imported via "./moduleFile1" from file 'file1Consumer2.ts'
	  Matched by default include pattern '**/*'
	file1Consumer1.ts
	  Matched by default include pattern '**/*'
	file1Consumer2.ts
	  Matched by default include pattern '**/*'
	globalFile3.ts
	  Matched by default include pattern '**/*'
	moduleFile2.ts
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
            "ts": 5,
            "tsSize": 181,
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
          "compileOnSave": true,
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
        "triggerFile": "/home/src/workspace/projects/b/moduleFile1.ts",
        "configFile": "/home/src/workspace/projects/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/b/moduleFile1.ts ProjectRootPath: undefined
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
/home/src/workspace/projects/b/file1Consumer1.ts: *new*
  {}
/home/src/workspace/projects/b/file1Consumer2.ts: *new*
  {}
/home/src/workspace/projects/b/globalFile3.ts: *new*
  {}
/home/src/workspace/projects/b/moduleFile2.ts: *new*
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
/home/src/workspace/projects/b/file1Consumer1.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/file1Consumer2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/globalFile3.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/moduleFile1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json *default*
/home/src/workspace/projects/b/moduleFile2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/home/src/workspace/projects/b/moduleFile1.ts",
        "projectFileName": "/home/src/workspace/projects/b/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "projectFileName": "/home/src/workspace/projects/b/tsconfig.json",
          "fileNames": [
            "/home/src/workspace/projects/b/moduleFile1.ts",
            "/home/src/workspace/projects/b/file1Consumer2.ts",
            "/home/src/workspace/projects/b/file1Consumer1.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "change",
      "arguments": {
        "file": "/home/src/workspace/projects/b/moduleFile1.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "export var T: number;"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 3,
      "success": true
    }
After request

Projects::
/home/src/workspace/projects/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/file1Consumer1.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/file1Consumer2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/globalFile3.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/moduleFile1.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json *default*
/home/src/workspace/projects/b/moduleFile2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspace/projects/b/file1Consumer2.ts 2:: WatchInfo: /home/src/workspace/projects/b/file1Consumer2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/b/file1Consumer2.ts 2:: WatchInfo: /home/src/workspace/projects/b/file1Consumer2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/b/file1Consumer2.ts :: WatchInfo: /home/src/workspace/projects/b 1 undefined Config: /home/src/workspace/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/b/file1Consumer2.ts :: WatchInfo: /home/src/workspace/projects/b 1 undefined Config: /home/src/workspace/projects/b/tsconfig.json WatchType: Wild card directory
Before request
//// [/home/src/workspace/projects/b/file1Consumer2.ts] deleted

Timeout callback:: count: 2
3: /home/src/workspace/projects/b/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/file1Consumer1.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/file1Consumer2.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspace/projects/b/tsconfig.json *deleted*
/home/src/workspace/projects/b/globalFile3.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json
/home/src/workspace/projects/b/moduleFile1.ts (Open)
    version: SVC-1-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json *default*
/home/src/workspace/projects/b/moduleFile2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/home/src/workspace/projects/b/moduleFile1.ts",
        "projectFileName": "/home/src/workspace/projects/b/tsconfig.json"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/b/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspace/projects/b/moduleFile1.ts SVC-1-1 "export var T: number;export function Foo() { };"
	/home/src/workspace/projects/b/file1Consumer1.ts Text-1 "import {Foo} from \"./moduleFile1\"; export var y = 10;"
	/home/src/workspace/projects/b/globalFile3.ts Text-1 "interface GlobalFoo { age: number }"
	/home/src/workspace/projects/b/moduleFile2.ts Text-1 "export var Foo4 = 10;"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	moduleFile1.ts
	  Imported via "./moduleFile1" from file 'file1Consumer1.ts'
	  Matched by default include pattern '**/*'
	file1Consumer1.ts
	  Matched by default include pattern '**/*'
	globalFile3.ts
	  Matched by default include pattern '**/*'
	moduleFile2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "projectFileName": "/home/src/workspace/projects/b/tsconfig.json",
          "fileNames": [
            "/home/src/workspace/projects/b/moduleFile1.ts",
            "/home/src/workspace/projects/b/file1Consumer1.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/home/src/workspace/projects/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*
