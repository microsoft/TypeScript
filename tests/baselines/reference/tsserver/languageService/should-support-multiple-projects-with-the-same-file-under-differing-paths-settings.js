currentDirectory:: / useCaseSensitiveFileNames: true
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/project/shared.ts]
import {foo_a} from "foo";


//// [/project/a/tsconfig.json]
{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }

//// [/project/a/foo.d.ts]
export const foo_a = 1;


//// [/project/a/index.ts]
import "../shared";

//// [/project/b/tsconfig.json]
{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }

//// [/project/b/foo.d.ts]
export const foo_b = 1;


//// [/project/b/index.ts]
import "../shared";


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/a/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /project/a
Info seq  [hh:mm:ss:mss] For info: /project/a/index.ts :: Config file name: /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/a/tsconfig.json 2000 undefined Project: /project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/project/a/tsconfig.json",
        "reason": "Creating possible configured project for /project/a/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /project/a/tsconfig.json : {
 "rootNames": [
  "/project/a/index.ts",
  "/project/a/foo.d.ts"
 ],
 "options": {
  "paths": {
   "foo": [
    "./foo.d.ts"
   ]
  },
  "pathsBasePath": "/project/a",
  "configFilePath": "/project/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/a/foo.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/shared.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/lib.d.ts 500 undefined Project: /project/a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /project/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/project/a/foo.d.ts Text-1 "export const foo_a = 1;\n"
	/project/shared.ts Text-1 "import {foo_a} from \"foo\";\n"
	/project/a/index.ts SVC-1-0 "import \"../shared\";"


	foo.d.ts
	  Imported via "foo" from file '../shared.ts'
	  Part of 'files' list in tsconfig.json
	../shared.ts
	  Imported via "../shared" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/project/a/tsconfig.json"
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
          "projectId": "8382422079dee6b4fb34f2ab2d40007086e862bfc0a8280c00ed7422516632a7",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 46,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 24,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "paths": ""
          },
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
        "triggerFile": "/project/a/index.ts",
        "configFile": "/project/a/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/project/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'",
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
Info seq  [hh:mm:ss:mss] Project '/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/project/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/project/a/foo.d.ts: *new*
  {}
/project/a/tsconfig.json: *new*
  {}
/project/shared.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/b/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /project/b
Info seq  [hh:mm:ss:mss] For info: /project/b/index.ts :: Config file name: /project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/b/tsconfig.json 2000 undefined Project: /project/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/project/b/tsconfig.json",
        "reason": "Creating possible configured project for /project/b/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /project/b/tsconfig.json : {
 "rootNames": [
  "/project/b/index.ts",
  "/project/b/foo.d.ts"
 ],
 "options": {
  "paths": {
   "foo": [
    "./foo.d.ts"
   ]
  },
  "pathsBasePath": "/project/b",
  "configFilePath": "/project/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/b/foo.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/lib.d.ts 500 undefined Project: /project/b/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /project/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/project/b/foo.d.ts Text-1 "export const foo_b = 1;\n"
	/project/shared.ts Text-1 "import {foo_a} from \"foo\";\n"
	/project/b/index.ts SVC-1-0 "import \"../shared\";"


	foo.d.ts
	  Imported via "foo" from file '../shared.ts'
	  Part of 'files' list in tsconfig.json
	../shared.ts
	  Imported via "../shared" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/project/b/tsconfig.json"
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
          "projectId": "ff748b7ad584af8ee55c62331d5f8d69532c7d7ce4527fe99ab7f6667a690c52",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 46,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 24,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "paths": ""
          },
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
        "triggerFile": "/project/b/index.ts",
        "configFile": "/project/b/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/project/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'",
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
Info seq  [hh:mm:ss:mss] Project '/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /project/b/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/project/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/project/a/foo.d.ts:
  {}
/project/a/tsconfig.json:
  {}
/project/b/foo.d.ts: *new*
  {}
/project/b/tsconfig.json: *new*
  {}
/project/shared.ts:
  {}

Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /project/a/tsconfig.json:: 0
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /project/b/tsconfig.json:: 1
Info seq  [hh:mm:ss:mss] ../shared.ts(1,9): error TS2724: '"foo"' has no exported member named 'foo_a'. Did you mean 'foo_b'?
