currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/project/app.ts]
let x = 1;

//// [/users/username/projects/project/node_modules/@types/lib1/index.d.ts]
export let a: number

//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {},
  "exclude": [
    "node_modules"
  ]
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/project/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/username/projects/project/app.ts ProjectRootPath: undefined:: Result: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/tsconfig.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/projects/project/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/project/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/app.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types/lib1/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/users/username/projects/project/app.ts SVC-1-0 "let x = 1;"
	/users/username/projects/project/node_modules/@types/lib1/index.d.ts Text-1 "export let a: number"


	app.ts
	  Matched by default include pattern '**/*'
	node_modules/@types/lib1/index.d.ts
	  Entry point for implicit type library 'lib1'

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
            "tsSize": 10,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 20,
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
          "exclude": true,
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
        "triggerFile": "/users/username/projects/project/app.ts",
        "configFile": "/users/username/projects/project/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/app.ts ProjectRootPath: undefined
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
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/node_modules/@types/lib1/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}
/users/username/projects/project/node_modules: *new*
  {}
/users/username/projects/project/node_modules/@types: *new*
  {}

Projects::
/users/username/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/users/username/projects/project/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/project/tsconfig.json *default*
/users/username/projects/project/node_modules/@types/lib1/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib1/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib1/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib1/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib1/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib1/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib1/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib1/index.d.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /users/username/projects/project/tsconfig.json Detected excluded file: /users/username/projects/project/node_modules/@types/lib1/index.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib1/index.d.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
4: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
5: /users/username/projects/project/tsconfig.json
6: *ensureProjectForOpenFiles*
//// [/users/username/projects/project/node_modules/@types/lib1/index.d.ts] deleted

Timeout callback:: count: 3
4: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation *new*
5: /users/username/projects/project/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/users/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

ScriptInfos::
/users/username/projects/project/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/project/tsconfig.json *default*
/users/username/projects/project/node_modules/@types/lib1/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /users/username/projects/project/tsconfig.json *deleted*

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/node_modules/@types/lib1/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/node_modules/@types/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/node_modules/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/projects/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/users/username/projects/project/app.ts SVC-1-0 "let x = 1;"


	app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/users/username/projects/project/tsconfig.json",
        "configFile": "/users/username/projects/project/tsconfig.json",
        "diagnostics": [
          {
            "text": "Cannot find type definition file for 'lib1'.\n  The file is in the program because:\n    Entry point for implicit type library 'lib1'",
            "code": 2688,
            "category": "error"
          },
          {
            "text": "File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /users/username/projects/project/app.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/users/username/projects/project/app.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/package.json:
  {"pollingInterval":2000}
/users/username/projects/project/node_modules/@types/lib1/package.json:
  {"pollingInterval":2000}
/users/username/projects/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/users/username/projects/project/node_modules/package.json:
  {"pollingInterval":2000}
/users/username/projects/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}
/users/username/projects/project/node_modules:
  {}
/users/username/projects/project/node_modules/@types:
  {}

Projects::
/users/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2 :: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2 :: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2 :: WatchInfo: /users/username/projects/project/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2 :: WatchInfo: /users/username/projects/project/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2 :: WatchInfo: /users/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2 :: WatchInfo: /users/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2 :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /users/username/projects/project/tsconfig.json Detected excluded file: /users/username/projects/project/node_modules/@types/lib2
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2 :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2/index.d.ts :: WatchInfo: /users/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2/index.d.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /users/username/projects/project/tsconfig.json Detected excluded file: /users/username/projects/project/node_modules/@types/lib2/index.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/node_modules/@types/lib2/index.d.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
11: /users/username/projects/project/tsconfig.json
12: *ensureProjectForOpenFiles*
14: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation
//// [/users/username/projects/project/node_modules/@types/lib2/index.d.ts]
export let b: number


Timeout callback:: count: 3
11: /users/username/projects/project/tsconfig.json *new*
12: *ensureProjectForOpenFiles* *new*
14: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/users/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types/lib2/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/package.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/users/username/projects/project/app.ts SVC-1-0 "let x = 1;"
	/users/username/projects/project/node_modules/@types/lib2/index.d.ts Text-1 "export let b: number"


	app.ts
	  Matched by default include pattern '**/*'
	node_modules/@types/lib2/index.d.ts
	  Entry point for implicit type library 'lib2'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /users/username/projects/project/app.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/users/username/projects/project/app.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/users/username/projects/node_modules:
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/node_modules/@types/lib2/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}
/users/username/projects/project/node_modules:
  {}
/users/username/projects/project/node_modules/@types:
  {}

Timeout callback:: count: 0
14: /users/username/projects/project/tsconfig.jsonFailedLookupInvalidation *deleted*

Projects::
/users/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

ScriptInfos::
/users/username/projects/project/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/project/tsconfig.json *default*
/users/username/projects/project/node_modules/@types/lib1/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/users/username/projects/project/node_modules/@types/lib2/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/project/tsconfig.json
