currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/src/file1.ts]
let x = 1;

//// [/a/b/src/file2.ts]
let y = 1;

//// [/a/b/file3.ts]
let z = 1;

//// [/a/file4.ts]
let z = 1;

//// [/a/b/tsconfig.json]
{
  "files": [
    "src/file1.ts",
    "file3.ts"
  ]
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/src/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/src/file1.ts ProjectRootPath: undefined:: Result: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/tsconfig.json",
        "reason": "Creating possible configured project for /a/b/src/file1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/src/file1.ts",
  "/a/b/file3.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/b/src/file1.ts SVC-1-0 "let x = 1;"
	/a/b/file3.ts Text-1 "let z = 1;"


	src/file1.ts
	  Part of 'files' list in tsconfig.json
	file3.ts
	  Part of 'files' list in tsconfig.json

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
            "ts": 2,
            "tsSize": 20,
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
        "triggerFile": "/a/b/src/file1.ts",
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
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

FsWatches::
/a/b/file3.ts: *new*
  {}
/a/b/tsconfig.json: *new*
  {}

Projects::
/a/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/file3.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json
/a/b/src/file1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/src/file2.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/src/file2.ts ProjectRootPath: undefined:: Result: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a/b/src/file2.ts",
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
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/src/file2.ts SVC-1-0 "let y = 1;"


	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
/a/b/src/node_modules/@types: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/file3.ts:
  {}
/a/b/tsconfig.json:
  {}

Projects::
/a/b/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/file3.ts
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json
/a/b/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file2.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file3.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/file3.ts ProjectRootPath: undefined:: Result: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true
    }
After request

PolledWatches::
/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatches *deleted*::
/a/b/file3.ts:
  {}

ScriptInfos::
/a/b/file3.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/file4.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/file4.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/file4.ts SVC-1-0 "let z = 1;"


	file4.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/a/b/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/a/file4.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/src/file1.ts ProjectRootPath: undefined:: Result: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/src/file2.ts ProjectRootPath: undefined:: Result: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/file3.ts ProjectRootPath: undefined:: Result: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /a/b/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/a/b/tsconfig.json]
{}


Timeout callback:: count: 2
1: /a/b/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

Info seq  [hh:mm:ss:mss] Running: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file3.ts",
  "/a/b/src/file1.ts",
  "/a/b/src/file2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/b/src/file1.ts SVC-1-0 "let x = 1;"
	/a/b/file3.ts Text-1 "let z = 1;"
	/a/b/src/file2.ts SVC-1-0 "let y = 1;"


	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
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
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a/b/tsconfig.json",
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
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] got projects updated in background /a/b/src/file1.ts,/a/b/src/file2.ts,/a/b/file3.ts,/a/file4.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/a/b/src/file1.ts",
          "/a/b/src/file2.ts",
          "/a/b/file3.ts",
          "/a/file4.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Projects::
/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 2 *changed*
    isOrphan: true *changed*
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file2.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /a/b/tsconfig.json *default* *new*
        /dev/null/inferredProject1* *deleted*
/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/src/file1.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/src/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 5,
      "success": true
    }
After request

PolledWatches::
/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/src/file1.ts: *new*
  {}
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

ScriptInfos::
/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file1.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json
/a/b/src/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/src/file2.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 6,
      "success": true
    }
After request

PolledWatches::
/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/src/file1.ts:
  {}
/a/b/src/file2.ts: *new*
  {}
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

ScriptInfos::
/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file1.ts
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json
/a/b/src/file2.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json
/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file4.ts"
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/file4.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 7,
      "success": true
    }
After request

PolledWatches::
/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/src/file1.ts:
  {}
/a/b/src/file2.ts:
  {}
/a/b/tsconfig.json:
  {}
/a/file4.ts: *new*
  {}

FsWatchesRecursive::
/a/b:
  {}

Projects::
/a/b/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 2
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 2
    isOrphan: true
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file1.ts
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json
/a/b/src/file2.ts
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json
/a/file4.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /dev/null/inferredProject2* *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/file4.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/file4.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/file4.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 8,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/src/file1.ts:
  {}
/a/b/src/file2.ts:
  {}
/a/b/tsconfig.json:
  {}

FsWatches *deleted*::
/a/file4.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Projects::
/a/b/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 2
/dev/null/inferredProject1* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 2
    isClosed: true *changed*
    isOrphan: true
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    isOrphan: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json *default*
/a/b/src/file1.ts
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json
/a/b/src/file2.ts
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json
/a/file4.ts (Open) *changed*
    open: true *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *default* *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/file3.ts"
      },
      "seq": 9,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 9,
      "success": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/file3.ts: *new*
  {}
/a/b/src/file1.ts:
  {}
/a/b/src/file2.ts:
  {}
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Projects::
/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2
    noOpenRef: true *changed*
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1

ScriptInfos::
/a/b/file3.ts *changed*
    open: false *changed*
    version: Text-1
    containingProjects: 1
        /a/b/tsconfig.json
/a/b/src/file1.ts
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json
/a/b/src/file2.ts
    version: SVC-1-0
    containingProjects: 1
        /a/b/tsconfig.json
/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

File5 written
//// [/file5.ts]
let zz = 1;


Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file5.ts"
      },
      "seq": 10,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /file5.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/file5.ts SVC-1-0 "let zz = 1;"


	file5.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/b/src/file1.ts
	/a/b/file3.ts
	/a/b/src/file2.ts


	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/src/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /file5.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 10,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/b/file3.ts:
  {}
/a/b/src/file1.ts:
  {}
/a/b/src/file2.ts:
  {}
/a/b/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/a/b:
  {}

Projects::
/a/b/tsconfig.json (Configured) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 2
    isClosed: true *changed*
    noOpenRef: true
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
/dev/null/inferredProject3* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/file3.ts *deleted*
    version: Text-1
    containingProjects: 0 *changed*
        /a/b/tsconfig.json *deleted*
/a/b/src/file1.ts *deleted*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /a/b/tsconfig.json *deleted*
/a/b/src/file2.ts *deleted*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /a/b/tsconfig.json *deleted*
/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/file5.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
