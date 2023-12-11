currentDirectory:: / useCaseSensitiveFileNames: true
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/src/app.ts]
let x = 10;

//// [/a/B/lib/module2.ts]
let z = 10;

//// [/a/b/tsconfig.json]


//// [/a/tsconfig.json]



Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/src/app.ts",
        "projectRootPath": "/a"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a/b/src
Info seq  [hh:mm:ss:mss] For info: /a/b/src/app.ts :: Config file name: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/tsconfig.json",
        "reason": "Creating possible configured project for /a/b/src/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/src/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/src/app.ts SVC-1-0 "let x = 10;"


	src/app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/b/tsconfig.json"
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
          "projectId": "e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 11,
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
        "triggerFile": "/a/b/src/app.ts",
        "configFile": "/a/b/tsconfig.json",
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
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/app.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/src/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/src/app.ts: *new*
  {}
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/src/app.ts",
        "projectRootPath": "/a/b"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /a/b/src
Info seq  [hh:mm:ss:mss] For info: /a/b/src/app.ts :: Config file name: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/app.ts ProjectRootPath: /a/b
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatches *deleted*::
/a/b/src/app.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/src/app.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/src/app.ts: *new*
  {}
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/src/app.ts",
        "projectRootPath": "/a/B"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /a/b/src
Info seq  [hh:mm:ss:mss] For info: /a/b/src/app.ts :: Config file name: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/app.ts ProjectRootPath: /a/B
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatches *deleted*::
/a/b/src/app.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/src/app.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/src/app.ts: *new*
  {}
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/B/lib/module2.ts",
        "projectRootPath": "/a"
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a/B/lib
Info seq  [hh:mm:ss:mss] For info: /a/B/lib/module2.ts :: Config file name: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/tsconfig.json",
        "reason": "Creating possible configured project for /a/B/lib/module2.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/B/lib/module2.ts",
  "/a/b/src/app.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/B/lib/module2.ts SVC-1-0 "let z = 10;"
	/a/b/src/app.ts SVC-1-0 "let x = 10;"


	B/lib/module2.ts
	  Matched by default include pattern '**/*'
	b/src/app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/tsconfig.json"
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
          "projectId": "bcbb3eb9a7f46ab3b8f574ad3733f3e5a7ce50557c14c0c6192f1203aedcacca",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 22,
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
        "triggerFile": "/a/B/lib/module2.ts",
        "configFile": "/a/tsconfig.json",
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
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/src/app.ts


	src/app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/B/lib/module2.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/src/app.ts:
  {}
/a/tsconfig.json: *new*
  {}

FsWatches *deleted*::
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a: *new*
  {}

FsWatchesRecursive *deleted*::
/a/b:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/B/lib/module2.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/B/lib/module2.ts: *new*
  {}
/a/b/src/app.ts:
  {}
/a/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/B/lib/module2.ts",
        "projectRootPath": "/a/b"
      },
      "seq": 9,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /a/B/lib
Info seq  [hh:mm:ss:mss] For info: /a/B/lib/module2.ts :: Config file name: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/B/lib/module2.ts ProjectRootPath: /a/b
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/src/app.ts:
  {}
/a/tsconfig.json:
  {}

FsWatches *deleted*::
/a/B/lib/module2.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/B/lib/module2.ts"
      },
      "seq": 10,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/B/lib/module2.ts: *new*
  {}
/a/b/src/app.ts:
  {}
/a/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/B/lib/module2.ts",
        "projectRootPath": "/a/B"
      },
      "seq": 11,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /a/B/lib
Info seq  [hh:mm:ss:mss] For info: /a/B/lib/module2.ts :: No config files found.
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/B/lib/module2.ts
	/a/b/src/app.ts


	B/lib/module2.ts
	  Matched by default include pattern '**/*'
	b/src/app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/B/lib/module2.ts ProjectRootPath: /a/B
Info seq  [hh:mm:ss:mss] 		Projects: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches *deleted*::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/B/lib/module2.ts:
  {}
/a/b/src/app.ts:
  {}
/a/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/a:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/B/lib/module2.ts"
      },
      "seq": 12,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/B/lib/module2.ts: *new*
  {}
