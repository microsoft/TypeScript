Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/project/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/users/username/projects/project/tsconfig.json]
{
  "files": [
    "/users/username/projects/project/file1Consumer1.ts"
  ]
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
      "event": "CustomHandler::projectLoadingStart",
      "body": {
        "project": "/users/username/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/projects/project/file1Consumer1.ts to open"
      }
    }
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
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectLoadingFinish",
      "body": {
        "project": "/users/username/projects/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectInfo",
      "body": {
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
        "files": true,
        "include": false,
        "exclude": false,
        "compileOnSave": false,
        "configFileName": "tsconfig.json",
        "projectType": "configured",
        "languageServiceEnabled": true,
        "version": "FakeVersion"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::configFileDiag",
      "body": {
        "configFileName": "/users/username/projects/project/tsconfig.json",
        "diagnostics": [],
        "triggerFile": "/users/username/projects/project/file1Consumer1.ts"
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
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/file1Consumer2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/moduleFile2.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/globalFile3.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/globalFile3.ts :: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 1
4: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
//// [/users/username/projects/project/moduleFile1.ts]
export function Foo() { };

//// [/users/username/projects/project/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/users/username/projects/project/moduleFile2.ts]
export var Foo4 = 10;

//// [/users/username/projects/project/globalFile3.ts]
interface GlobalFoo { age: number }


Timeout callback:: count: 1
4: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
5: /users/username/projects/project/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/users/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

Before running Timeout callback:: count: 2
5: /users/username/projects/project/tsconfig.json
6: *ensureProjectForOpenFiles*
//// [/users/username/projects/project/moduleFile1.ts]
export var T: number;export function Foo() { };


Info seq  [hh:mm:ss:mss] Running: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/project/moduleFile1 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/project/moduleFile1 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/project 0 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/project/moduleFile1.ts Text-1 "export var T: number;export function Foo() { };"
	/users/username/projects/project/file1Consumer1.ts SVC-1-0 "import {Foo} from \"./moduleFile1\"; export var y = 10;"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	moduleFile1.ts
	  Imported via "./moduleFile1" from file 'file1Consumer1.ts'
	file1Consumer1.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/file1Consumer1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/file1Consumer1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/users/username/projects/project/file1Consumer1.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

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
/users/username/projects/project/moduleFile1.ts: *new*
  {}
/users/username/projects/project/tsconfig.json:
  {}

FsWatches *deleted*::
/users/username/projects/project:
  {}

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
/users/username/projects/project/moduleFile1.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /users/username/projects/project/moduleFile1.ts 1:: WatchInfo: /users/username/projects/project/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /users/username/projects/project/moduleFile1.ts 1:: WatchInfo: /users/username/projects/project/moduleFile1.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
7: /users/username/projects/project/tsconfig.json
8: *ensureProjectForOpenFiles*
//// [/users/username/projects/project/moduleFile1.ts]
export function Foo() { };var T1: number;


Timeout callback:: count: 2
7: /users/username/projects/project/tsconfig.json *new*
8: *ensureProjectForOpenFiles* *new*

Projects::
/users/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json
/users/username/projects/project/file1Consumer1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/project/tsconfig.json *default*
/users/username/projects/project/moduleFile1.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /users/username/projects/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/project/moduleFile1.ts Text-2 "export function Foo() { };var T1: number;"
	/users/username/projects/project/file1Consumer1.ts SVC-1-0 "import {Foo} from \"./moduleFile1\"; export var y = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/file1Consumer1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/file1Consumer1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/users/username/projects/project/file1Consumer1.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/users/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json
/users/username/projects/project/file1Consumer1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/project/tsconfig.json *default*
/users/username/projects/project/moduleFile1.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /users/username/projects/project/tsconfig.json
