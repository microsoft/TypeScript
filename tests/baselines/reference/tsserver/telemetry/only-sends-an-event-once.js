currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/a.ts]


//// [/b.ts]


//// [/a/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/tsconfig.json",
        "reason": "Creating possible configured project for /a/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/a.ts"
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
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/a.ts SVC-1-0 ""


	a.ts
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
        "triggerFile": "/a/a.ts",
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
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
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
/a/a.ts: *new*
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
        "file": "/b.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /b.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b.ts SVC-1-0 ""


	b.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/a.ts


	a.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/a.ts:
  {}
/a/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/a:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/tsconfig.json",
        "reason": "Creating possible configured project for /a/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/a.ts"
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
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/a.ts SVC-2-0 ""


	a.ts
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
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a/a.ts",
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
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a/a.ts ProjectRootPath: undefined
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
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}
