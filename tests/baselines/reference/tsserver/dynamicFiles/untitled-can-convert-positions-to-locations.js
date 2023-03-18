Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/proj/a.ts]


//// [/proj/tsconfig.json]
{}


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/proj/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /proj
Info 3    [00:00:12.000] For info: /proj/a.ts :: Config file name: /proj/tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /proj/tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /proj/tsconfig.json 2000 undefined Project: /proj/tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /proj/tsconfig.json : {
 "rootNames": [
  "/proj/a.ts"
 ],
 "options": {
  "configFilePath": "/proj/tsconfig.json"
 }
}
Info 7    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo: /proj 1 undefined Config: /proj/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj 1 undefined Config: /proj/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:18.000] Starting updateGraphWorker: Project: /proj/tsconfig.json
Info 10   [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /proj/tsconfig.json WatchType: Missing file
Info 11   [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /proj/tsconfig.json WatchType: Type roots
Info 12   [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /proj/tsconfig.json WatchType: Type roots
Info 13   [00:00:22.000] Finishing updateGraphWorker: Project: /proj/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:23.000] Project '/proj/tsconfig.json' (Configured)
Info 15   [00:00:24.000] 	Files (1)
	/proj/a.ts SVC-1-0 ""


	a.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:25.000] -----------------------------------------------
Info 17   [00:00:26.000] Project '/proj/tsconfig.json' (Configured)
Info 17   [00:00:27.000] 	Files (1)

Info 17   [00:00:28.000] -----------------------------------------------
Info 17   [00:00:29.000] Open files: 
Info 17   [00:00:30.000] 	FileName: /proj/a.ts ProjectRootPath: undefined
Info 17   [00:00:31.000] 		Projects: /proj/tsconfig.json
Info 17   [00:00:32.000] response:
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

Info 18   [00:00:33.000] request:
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
Info 19   [00:00:34.000] Search path: 
Info 20   [00:00:35.000] For info: untitled:^Untitled-1 :: No config files found.
Info 21   [00:00:36.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 22   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /typings/@epic/core.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 23   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 24   [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 25   [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 26   [00:00:41.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 27   [00:00:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 28   [00:00:43.000] 	Files (1)
	untitled:^Untitled-1 SVC-1-0 "/// <reference path=\"../../../../../../typings/@epic/Core.d.ts\" />\nlet foo = 1;\nfooo/**/"


	untitled:^Untitled-1
	  Root file specified for compilation

Info 29   [00:00:44.000] -----------------------------------------------
Info 30   [00:00:45.000] Project '/proj/tsconfig.json' (Configured)
Info 30   [00:00:46.000] 	Files (1)

Info 30   [00:00:47.000] -----------------------------------------------
Info 30   [00:00:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:00:49.000] 	Files (1)

Info 30   [00:00:50.000] -----------------------------------------------
Info 30   [00:00:51.000] Open files: 
Info 30   [00:00:52.000] 	FileName: /proj/a.ts ProjectRootPath: undefined
Info 30   [00:00:53.000] 		Projects: /proj/tsconfig.json
Info 30   [00:00:54.000] 	FileName: untitled:^Untitled-1 ProjectRootPath: /proj
Info 30   [00:00:55.000] 		Projects: /dev/null/inferredProject1*
Info 30   [00:00:56.000] response:
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

Before request

Info 31   [00:00:57.000] request:
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
Info 32   [00:00:58.000] response:
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
