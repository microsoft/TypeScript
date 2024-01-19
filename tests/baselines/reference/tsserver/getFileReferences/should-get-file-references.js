currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/project/a.ts]
export const a = {};

//// [/project/b.ts]
import "./a";

//// [/project/c.ts]
import {} from "./a";

//// [/project/d.ts]
import { a } from "/project/a";
type T = typeof import("./a").a;

//// [/project/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/a.ts :: Config file name: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/tsconfig.json 2000 undefined Project: /project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/project/tsconfig.json",
        "reason": "Creating possible configured project for /project/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /project/tsconfig.json : {
 "rootNames": [
  "/project/a.ts",
  "/project/b.ts",
  "/project/c.ts",
  "/project/d.ts"
 ],
 "options": {
  "configFilePath": "/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /project/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/project/a.ts SVC-1-0 "export const a = {};"
	/project/b.ts Text-1 "import \"./a\";"
	/project/c.ts Text-1 "import {} from \"./a\";"
	/project/d.ts Text-1 "import { a } from \"/project/a\";\ntype T = typeof import(\"./a\").a;"


	a.ts
	  Matched by default include pattern '**/*'
	  Imported via "./a" from file 'b.ts'
	  Imported via "./a" from file 'c.ts'
	  Imported via "/project/a" from file 'd.ts'
	  Imported via "./a" from file 'd.ts'
	b.ts
	  Matched by default include pattern '**/*'
	c.ts
	  Matched by default include pattern '**/*'
	d.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/project/tsconfig.json"
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
          "projectId": "4877b582a3e7d5836ee46b4a0db488dc715db827bacc8ef1fbcd0dbb78ae23d1",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 4,
            "tsSize": 118,
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
        "triggerFile": "/project/a.ts",
        "configFile": "/project/tsconfig.json",
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
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/project/b.ts: *new*
  {}
/project/c.ts: *new*
  {}
/project/d.ts: *new*
  {}
/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/project: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/b.ts :: Config file name: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /project/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/project/c.ts:
  {}
/project/d.ts:
  {}
/project/tsconfig.json:
  {}

FsWatches *deleted*::
/project/b.ts:
  {}

FsWatchesRecursive::
/project:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/c.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /project/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/c.ts :: Config file name: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /project/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /project/c.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/project/d.ts:
  {}
/project/tsconfig.json:
  {}

FsWatches *deleted*::
/project/c.ts:
  {}

FsWatchesRecursive::
/project:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/d.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /project/d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/d.ts :: Config file name: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /project/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /project/c.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /project/d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/project/tsconfig.json:
  {}

FsWatches *deleted*::
/project/d.ts:
  {}

FsWatchesRecursive::
/project:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "fileReferences",
      "arguments": {
        "file": "/project/a.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "refs": [
          {
            "file": "/project/b.ts",
            "start": {
              "line": 1,
              "offset": 9
            },
            "end": {
              "line": 1,
              "offset": 12
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 14
            },
            "lineText": "import \"./a\";",
            "isWriteAccess": false
          },
          {
            "file": "/project/c.ts",
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 20
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 22
            },
            "lineText": "import {} from \"./a\";",
            "isWriteAccess": false
          },
          {
            "file": "/project/d.ts",
            "start": {
              "line": 1,
              "offset": 20
            },
            "end": {
              "line": 1,
              "offset": 30
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 32
            },
            "lineText": "import { a } from \"/project/a\";",
            "isWriteAccess": false
          },
          {
            "file": "/project/d.ts",
            "start": {
              "line": 2,
              "offset": 25
            },
            "end": {
              "line": 2,
              "offset": 28
            },
            "contextStart": {
              "line": 2,
              "offset": 1
            },
            "contextEnd": {
              "line": 2,
              "offset": 33
            },
            "lineText": "type T = typeof import(\"./a\").a;",
            "isWriteAccess": false
          }
        ],
        "symbolName": "\"/project/a.ts\""
      },
      "responseRequired": true
    }
After request
