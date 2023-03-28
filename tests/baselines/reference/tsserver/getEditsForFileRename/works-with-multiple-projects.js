currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/user.ts]
import { x } from "./old";

//// [/a/old.ts]
export const x = 0;

//// [/a/tsconfig.json]
{"files":["./old.ts","./user.ts"]}

//// [/b/user.ts]
import { x } from "../a/old";

//// [/b/tsconfig.json]
{}


Info 1    [00:00:18.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/user.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:19.000] Search path: /a
Info 3    [00:00:20.000] For info: /a/user.ts :: Config file name: /a/tsconfig.json
Info 4    [00:00:21.000] Creating configuration project /a/tsconfig.json
Info 5    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [00:00:23.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/old.ts",
  "/a/user.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 7    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/old.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:25.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 9    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 10   [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 11   [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 12   [00:00:29.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:30.000] Project '/a/tsconfig.json' (Configured)
Info 14   [00:00:31.000] 	Files (2)
	/a/old.ts Text-1 "export const x = 0;"
	/a/user.ts SVC-1-0 "import { x } from \"./old\";"


	old.ts
	  Part of 'files' list in tsconfig.json
	  Imported via "./old" from file 'user.ts'
	user.ts
	  Part of 'files' list in tsconfig.json

Info 15   [00:00:32.000] -----------------------------------------------
Info 16   [00:00:33.000] Project '/a/tsconfig.json' (Configured)
Info 16   [00:00:34.000] 	Files (2)

Info 16   [00:00:35.000] -----------------------------------------------
Info 16   [00:00:36.000] Open files: 
Info 16   [00:00:37.000] 	FileName: /a/user.ts ProjectRootPath: undefined
Info 16   [00:00:38.000] 		Projects: /a/tsconfig.json
Info 16   [00:00:39.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}
/a/old.ts: *new*
  {}

Before request

Info 17   [00:00:40.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b/user.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 18   [00:00:41.000] Search path: /b
Info 19   [00:00:42.000] For info: /b/user.ts :: Config file name: /b/tsconfig.json
Info 20   [00:00:43.000] Creating configuration project /b/tsconfig.json
Info 21   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /b/tsconfig.json 2000 undefined Project: /b/tsconfig.json WatchType: Config file
Info 22   [00:00:45.000] Config: /b/tsconfig.json : {
 "rootNames": [
  "/b/user.ts"
 ],
 "options": {
  "configFilePath": "/b/tsconfig.json"
 }
}
Info 23   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 24   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 25   [00:00:48.000] Starting updateGraphWorker: Project: /b/tsconfig.json
Info 26   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/tsconfig.json WatchType: Missing file
Info 27   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 28   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 29   [00:00:52.000] Finishing updateGraphWorker: Project: /b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:00:53.000] Project '/b/tsconfig.json' (Configured)
Info 31   [00:00:54.000] 	Files (2)
	/a/old.ts Text-1 "export const x = 0;"
	/b/user.ts SVC-1-0 "import { x } from \"../a/old\";"


	../a/old.ts
	  Imported via "../a/old" from file 'user.ts'
	user.ts
	  Matched by default include pattern '**/*'

Info 32   [00:00:55.000] -----------------------------------------------
Info 33   [00:00:56.000] Project '/a/tsconfig.json' (Configured)
Info 33   [00:00:57.000] 	Files (2)

Info 33   [00:00:58.000] -----------------------------------------------
Info 33   [00:00:59.000] Project '/b/tsconfig.json' (Configured)
Info 33   [00:01:00.000] 	Files (2)

Info 33   [00:01:01.000] -----------------------------------------------
Info 33   [00:01:02.000] Open files: 
Info 33   [00:01:03.000] 	FileName: /a/user.ts ProjectRootPath: undefined
Info 33   [00:01:04.000] 		Projects: /a/tsconfig.json
Info 33   [00:01:05.000] 	FileName: /b/user.ts ProjectRootPath: undefined
Info 33   [00:01:06.000] 		Projects: /b/tsconfig.json
Info 33   [00:01:07.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/old.ts:
  {}
/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/b: *new*
  {}

Before request

Info 34   [00:01:08.000] request:
    {
      "command": "getEditsForFileRename",
      "arguments": {
        "oldFilePath": "/a/old.ts",
        "newFilePath": "/a/new.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 35   [00:01:09.000] response:
    {
      "response": [
        {
          "fileName": "/a/tsconfig.json",
          "textChanges": [
            {
              "start": {
                "line": 1,
                "offset": 12
              },
              "end": {
                "line": 1,
                "offset": 20
              },
              "newText": "new.ts"
            }
          ]
        },
        {
          "fileName": "/a/user.ts",
          "textChanges": [
            {
              "start": {
                "line": 1,
                "offset": 20
              },
              "end": {
                "line": 1,
                "offset": 25
              },
              "newText": "./new"
            }
          ]
        },
        {
          "fileName": "/b/user.ts",
          "textChanges": [
            {
              "start": {
                "line": 1,
                "offset": 20
              },
              "end": {
                "line": 1,
                "offset": 28
              },
              "newText": "../a/new"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
