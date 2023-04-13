currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/proj/a.ts]


//// [/proj/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/proj/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /proj
Info seq  [hh:mm:ss:mss] For info: /proj/a.ts :: Config file name: /proj/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /proj/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /proj/tsconfig.json 2000 undefined Project: /proj/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /proj/tsconfig.json : {
 "rootNames": [
  "/proj/a.ts"
 ],
 "options": {
  "configFilePath": "/proj/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /proj 1 undefined Config: /proj/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj 1 undefined Config: /proj/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /proj/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /proj/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /proj/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/proj/a.ts SVC-1-0 ""


	a.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /proj/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /proj/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/proj/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/proj/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/proj: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "untitled:^Untitled-1",
        "fileContent": "/// <reference path=\"../../../../../../typings/@epic/Core.d.ts\" />\nlet foo = 1;\nfooo/**/",
        "scriptKindName": "TS",
        "projectRootPath": "/proj"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: 
Info seq  [hh:mm:ss:mss] For info: untitled:^Untitled-1 :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /typings/@epic/core.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	untitled:^Untitled-1 SVC-1-0 "/// <reference path=\"../../../../../../typings/@epic/Core.d.ts\" />\nlet foo = 1;\nfooo/**/"


	untitled:^Untitled-1
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /proj/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /proj/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: untitled:^Untitled-1 ProjectRootPath: /proj
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/proj/node_modules/@types:
  {"pollingInterval":500}
/typings/@epic/core.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/proj/tsconfig.json:
  {}

FsWatchesRecursive::
/proj:
  {}

/proj/untitled:^untitled-1 isDynamic:: true
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getCodeFixes",
      "arguments": {
        "file": "untitled:^Untitled-1",
        "startLine": 3,
        "startOffset": 1,
        "endLine": 3,
        "endOffset": 5,
        "errorCodes": [
          2552
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "fixName": "spelling",
          "description": "Change spelling to 'foo'",
          "changes": [
            {
              "fileName": "untitled:^Untitled-1",
              "textChanges": [
                {
                  "start": {
                    "line": 3,
                    "offset": 1
                  },
                  "end": {
                    "line": 3,
                    "offset": 5
                  },
                  "newText": "foo"
                }
              ]
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
