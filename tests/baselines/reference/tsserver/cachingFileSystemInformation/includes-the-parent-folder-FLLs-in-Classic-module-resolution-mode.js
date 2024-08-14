currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/proj/foo/boo/app.ts]
import * as debug from "debug"

//// [/users/username/projects/proj/foo/boo/moo/app.ts]
import * as debug from "debug"

//// [/users/username/projects/proj/tsconfig.json]
{
  "files": [
    "foo/boo/app.ts",
    "foo/boo/moo/app.ts"
  ],
  "moduleResolution": "Classic"
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/proj/foo/boo/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/username/projects/proj/foo/boo/app.ts ProjectRootPath: undefined:: Result: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/proj/tsconfig.json 2000 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/projects/proj/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/projects/proj/foo/boo/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/proj/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/proj/foo/boo/app.ts",
  "/users/username/projects/proj/foo/boo/moo/app.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/proj/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/proj/foo/boo/moo/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/foo 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/foo 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules/@types 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules/@types 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/proj/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/proj/foo/boo/app.ts SVC-1-0 "import * as debug from \"debug\""
	/users/username/projects/proj/foo/boo/moo/app.ts Text-1 "import * as debug from \"debug\""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	foo/boo/app.ts
	  Part of 'files' list in tsconfig.json
	foo/boo/moo/app.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/projects/proj/tsconfig.json"
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
          "projectId": "f532fa41948bd8cbfc0733ce5e740d277b4439e224051c042b78b6f976eedf47",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 60,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
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
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/users/username/projects/proj/foo/boo/app.ts",
        "configFile": "/users/username/projects/proj/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 6,
              "offset": 3
            },
            "end": {
              "line": 6,
              "offset": 21
            },
            "text": "'moduleResolution' should be set inside the 'compilerOptions' object of the config json file",
            "code": 6258,
            "category": "error",
            "fileName": "/users/username/projects/proj/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/proj/foo/boo/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/proj/tsconfig.json
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
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/proj/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/proj/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/proj/foo/boo/moo/app.ts: *new*
  {}
/users/username/projects/proj/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/proj/foo: *new*
  {}

Projects::
/users/username/projects/proj/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/proj/tsconfig.json
/users/username/projects/proj/foo/boo/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/proj/tsconfig.json *default*
/users/username/projects/proj/foo/boo/moo/app.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/proj/tsconfig.json

Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /users/username/projects/proj/foo/boo/app.ts:: 1
Info seq  [hh:mm:ss:mss] foo/boo/app.ts(1,24): error TS2307: Cannot find module 'debug' or its corresponding type declarations.

Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /users/username/projects/proj/foo/boo/moo/app.ts:: 1
Info seq  [hh:mm:ss:mss] foo/boo/moo/app.ts(1,24): error TS2307: Cannot find module 'debug' or its corresponding type declarations.

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules/debug :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules/debug :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules/debug/index.d.ts :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules/debug/index.d.ts :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 1
4: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation
//// [/users/username/projects/proj/node_modules/debug/index.d.ts]
export {}


PolledWatches::
/users/username/projects/node_modules:
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/proj/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/proj/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/proj/foo/boo/moo/app.ts:
  {}
/users/username/projects/proj/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/projects/proj/foo:
  {}
/users/username/projects/proj/node_modules: *new*
  {}

Timeout callback:: count: 1
4: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
5: /users/username/projects/proj/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/users/username/projects/proj/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Before running Timeout callback:: count: 2
5: /users/username/projects/proj/tsconfig.json
6: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules/debug/package.json 2000 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules/package.json 2000 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/proj/package.json 2000 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/package.json 2000 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/proj/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/proj/node_modules/debug/index.d.ts Text-1 "export {}"
	/users/username/projects/proj/foo/boo/app.ts SVC-1-0 "import * as debug from \"debug\""
	/users/username/projects/proj/foo/boo/moo/app.ts Text-1 "import * as debug from \"debug\""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/debug/index.d.ts
	  Imported via "debug" from file 'foo/boo/app.ts'
	  Imported via "debug" from file 'foo/boo/moo/app.ts'
	foo/boo/app.ts
	  Part of 'files' list in tsconfig.json
	foo/boo/moo/app.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/proj/foo/boo/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/proj/foo/boo/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /users/username/projects/proj/foo/boo/app.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/users/username/projects/proj/foo/boo/app.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/proj/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/proj/node_modules/debug/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/proj/node_modules/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/proj/package.json: *new*
  {"pollingInterval":2000}

PolledWatches *deleted*::
/users/username/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/proj/foo/boo/moo/app.ts:
  {}
/users/username/projects/proj/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/projects/proj/foo:
  {}
/users/username/projects/proj/node_modules:
  {}

Projects::
/users/username/projects/proj/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /users/username/projects/proj/tsconfig.json
/users/username/projects/proj/foo/boo/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/proj/tsconfig.json *default*
/users/username/projects/proj/foo/boo/moo/app.ts
    version: Text-1
    containingProjects: 1
        /users/username/projects/proj/tsconfig.json
/users/username/projects/proj/node_modules/debug/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/proj/tsconfig.json

Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /users/username/projects/proj/foo/boo/app.ts:: 0
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /users/username/projects/proj/foo/boo/moo/app.ts:: 0