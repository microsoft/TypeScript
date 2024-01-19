currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let x = 1;

//// [/a/b/c/lib.ts]


//// [/a/b/c/tsconfig.json]
{}

//// [/a/b/d/lib.ts]


//// [/a/b/d/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "lazyConfiguredProjectsFromExternalProject": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/proj1",
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          }
        ],
        "options": {}
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/proj1
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/proj1 WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/proj1 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/proj1' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/app.ts Text-1 "let x = 1;"


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "6179ebc6317f2206f8b1c649a4f8dbc8cb8b17ec75e8a104a8b52d60cbb17c85",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 10,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "compileOnSave": true,
          "configFileName": "other",
          "projectType": "external",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/proj1",
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          },
          {
            "fileName": "/a/b/c/tsconfig.json"
          },
          {
            "fileName": "/a/b/d/tsconfig.json"
          }
        ],
        "options": {}
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/b/proj1' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/app.ts


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/proj1 WatchType: Missing file
Info seq  [hh:mm:ss:mss] Creating configuration project /a/b/c/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/c/tsconfig.json 2000 undefined Project: /a/b/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Creating configuration project /a/b/d/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/d/tsconfig.json 2000 undefined Project: /a/b/d/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches *deleted*::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts:
  {}
/a/b/c/tsconfig.json: *new*
  {}
/a/b/d/tsconfig.json: *new*
  {}

Info seq  [hh:mm:ss:mss] Loading configured project /a/b/c/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/c/tsconfig.json",
        "reason": "Creating configured project in external project: /a/b/proj1"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/b/c/tsconfig.json : {
 "rootNames": [
  "/a/b/c/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/c/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/c/lib.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/c/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/c/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/c/lib.ts Text-1 ""


	lib.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/b/c/tsconfig.json"
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
          "projectId": "5352a7c2fc98c282ebc6570440fd7412ec495d43e1ac8299e6c582f9e692654c",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
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
        "triggerFile": "/a/b/c/tsconfig.json",
        "configFile": "/a/b/c/tsconfig.json",
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
Info seq  [hh:mm:ss:mss] Loading configured project /a/b/d/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/d/tsconfig.json",
        "reason": "Creating configured project in external project: /a/b/proj1"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/b/d/tsconfig.json : {
 "rootNames": [
  "/a/b/d/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/d/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/d/lib.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/d/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/d/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/d/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/d/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/d/lib.ts Text-1 ""


	lib.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/b/d/tsconfig.json"
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
          "projectId": "d563056dcee6466e800d33bf1bd53a198fe5f8c11cfcca8099df1a717bab249f",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
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
        "triggerFile": "/a/b/d/tsconfig.json",
        "configFile": "/a/b/d/tsconfig.json",
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
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a/b/d/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a/b/d/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Before request

PolledWatches::
/a/b/c/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/d/node_modules/@types: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts:
  {}
/a/b/c/lib.ts: *new*
  {}
/a/b/c/tsconfig.json:
  {}
/a/b/d/lib.ts: *new*
  {}
/a/b/d/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b/c: *new*
  {}
/a/b/d: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/proj1",
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          },
          {
            "fileName": "/a/b/d/tsconfig.json"
          }
        ],
        "options": {}
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/b/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/c/lib.ts


	lib.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/c/tsconfig.json 2000 undefined Project: /a/b/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/c/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/d/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/c/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts:
  {}
/a/b/c/lib.ts:
  {}
/a/b/d/lib.ts:
  {}
/a/b/d/tsconfig.json:
  {}

FsWatches *deleted*::
/a/b/c/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b/d:
  {}

FsWatchesRecursive *deleted*::
/a/b/c:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/proj1",
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          }
        ],
        "options": {}
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/b/d/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/d/lib.ts


	lib.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/d/tsconfig.json 2000 undefined Project: /a/b/d/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/d/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/proj1
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/proj1 WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/proj1 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/proj1' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/app.ts Text-1 "let x = 1;"


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500} *new*

PolledWatches *deleted*::
/a/b/d/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts:
  {}
/a/b/c/lib.ts:
  {}
/a/b/d/lib.ts:
  {}

FsWatches *deleted*::
/a/b/d/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/a/b/d:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/proj1",
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          },
          {
            "fileName": "/a/b/c/tsconfig.json"
          },
          {
            "fileName": "/a/b/d/tsconfig.json"
          }
        ],
        "options": {}
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/b/proj1' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/app.ts


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/proj1 WatchType: Missing file
Info seq  [hh:mm:ss:mss] Creating configuration project /a/b/c/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/c/tsconfig.json 2000 undefined Project: /a/b/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Creating configuration project /a/b/d/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/d/tsconfig.json 2000 undefined Project: /a/b/d/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches *deleted*::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts:
  {}
/a/b/c/lib.ts:
  {}
/a/b/c/tsconfig.json: *new*
  {}
/a/b/d/lib.ts:
  {}
/a/b/d/tsconfig.json: *new*
  {}

Info seq  [hh:mm:ss:mss] Loading configured project /a/b/c/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/c/tsconfig.json",
        "reason": "Creating configured project in external project: /a/b/proj1"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/b/c/tsconfig.json : {
 "rootNames": [
  "/a/b/c/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/c/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/c/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/c/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/c/lib.ts Text-1 ""


	lib.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/b/c/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a/b/c/tsconfig.json",
        "configFile": "/a/b/c/tsconfig.json",
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
Info seq  [hh:mm:ss:mss] Loading configured project /a/b/d/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/d/tsconfig.json",
        "reason": "Creating configured project in external project: /a/b/proj1"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/b/d/tsconfig.json : {
 "rootNames": [
  "/a/b/d/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/d/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/d/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/d/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/d/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/d/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/d/lib.ts Text-1 ""


	lib.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/b/d/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a/b/d/tsconfig.json",
        "configFile": "/a/b/d/tsconfig.json",
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
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a/b/d/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a/b/d/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Before request

PolledWatches::
/a/b/c/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/d/node_modules/@types: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts:
  {}
/a/b/c/lib.ts:
  {}
/a/b/c/tsconfig.json:
  {}
/a/b/d/lib.ts:
  {}
/a/b/d/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b/c: *new*
  {}
/a/b/d: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "closeExternalProject",
      "arguments": {
        "projectFileName": "/a/b/proj1"
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/b/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/c/lib.ts


	lib.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/c/tsconfig.json 2000 undefined Project: /a/b/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/c/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/b/d/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/d/lib.ts


	lib.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/d/tsconfig.json 2000 undefined Project: /a/b/d/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/d/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches *deleted*::
/a/b/c/node_modules/@types:
  {"pollingInterval":500}
/a/b/d/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts:
  {}
/a/b/c/lib.ts:
  {}
/a/b/d/lib.ts:
  {}

FsWatches *deleted*::
/a/b/c/tsconfig.json:
  {}
/a/b/d/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/a/b/c:
  {}
/a/b/d:
  {}
