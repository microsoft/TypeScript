Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/project/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/users/username/projects/project/tsconfig.json]
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
        "file": "/users/username/projects/project/file1Consumer1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/username/projects/project/file1Consumer1.ts ProjectRootPath: undefined:: Result: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /users/username/projects/project/tsconfig.json, currentDirectory: /users/username/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/tsconfig.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/project/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/file1Consumer1.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/projects/project/file1Consumer1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/moduleFile1 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/moduleFile1 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/project/file1Consumer1.ts SVC-1-0 "import {Foo} from \"./moduleFile1\"; export var y = 10;"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file1Consumer1.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/projects/project/tsconfig.json"
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
          "projectId": "5b0be5fc7f7235edf5a31bffe614b4e0819e55ec5f118558864b1f882e283c0d",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 53,
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
        "triggerFile": "/users/username/projects/project/file1Consumer1.ts",
        "configFile": "/users/username/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/file1Consumer1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
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
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/moduleFile1: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Projects::
/users/username/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json
/users/username/projects/project/file1Consumer1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/project/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile1.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile1.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile1.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile1.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile2.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile2.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/globalFile3.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/globalFile3.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/globalFile3.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/globalFile3.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
10: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
11: /users/username/projects/project/tsconfig.json
12: *ensureProjectForOpenFiles*
//// [/users/username/projects/project/moduleFile1.ts]
export function Foo() { };

//// [/users/username/projects/project/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/users/username/projects/project/moduleFile2.ts]
export var Foo4 = 10;

//// [/users/username/projects/project/globalFile3.ts]
interface GlobalFoo { age: number }


Timeout callback:: count: 3
10: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation *new*
11: /users/username/projects/project/tsconfig.json *new*
12: *ensureProjectForOpenFiles* *new*

Projects::
/users/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After running Timeout callback:: count: 2

Timeout callback:: count: 2
11: /users/username/projects/project/tsconfig.json *deleted*
12: *ensureProjectForOpenFiles* *deleted*
13: /users/username/projects/project/tsconfig.json *new*
14: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
15: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
16: /users/username/projects/project/tsconfig.json
17: *ensureProjectForOpenFiles*
//// [/users/username/projects/project/moduleFile1.ts]
export var T: number;export function Foo() { };

//// [/users/username/projects/project/file1Consumer2.ts] deleted

Timeout callback:: count: 3
13: /users/username/projects/project/tsconfig.json *deleted*
14: *ensureProjectForOpenFiles* *deleted*
15: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation *new*
16: /users/username/projects/project/tsconfig.json *new*
17: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/globalFile3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/moduleFile2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/project/moduleFile1 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/project/moduleFile1 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/project/moduleFile1.ts Text-1 "export var T: number;export function Foo() { };"
	/users/username/projects/project/file1Consumer1.ts SVC-1-0 "import {Foo} from \"./moduleFile1\"; export var y = 10;"
	/users/username/projects/project/globalFile3.ts Text-1 "interface GlobalFoo { age: number }"
	/users/username/projects/project/moduleFile2.ts Text-1 "export var Foo4 = 10;"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
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
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/file1Consumer1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/file1Consumer1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /users/username/projects/project/file1Consumer1.ts
Info seq  [hh:mm:ss:mss] Queueing diagnostics update for /users/username/projects/project/file1Consumer1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/users/username/projects/project/file1Consumer1.ts"
        ]
      }
    }
After running Timeout callback:: count: 1

PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/project/moduleFile1:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project/globalFile3.ts: *new*
  {}
/users/username/projects/project/moduleFile1.ts: *new*
  {}
/users/username/projects/project/moduleFile2.ts: *new*
  {}
/users/username/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/users/username/projects/project:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Timeout callback:: count: 1
18: checkOne *new*

Projects::
/users/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json
/users/username/projects/project/file1Consumer1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/project/tsconfig.json *default*
/users/username/projects/project/globalFile3.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json
/users/username/projects/project/moduleFile1.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json
/users/username/projects/project/moduleFile2.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json
