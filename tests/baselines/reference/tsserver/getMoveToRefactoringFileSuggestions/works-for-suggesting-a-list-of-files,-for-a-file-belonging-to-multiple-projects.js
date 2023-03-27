currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/blah/file1.ts]
class CC { }

//// [/blah/file2.ts]


//// [/blah-tests/file3.ts]
import { value1 } from "../blah/file1.ts";

//// [/blah-tests/file4.ts]


//// [/blah/tsconfig.json]
{ "files": ["./file1.ts", "./file2.ts"] }

//// [/blah-tests/tsconfig.json]
{ "files": ["./file3.ts", "./file4.ts"] }


Info 1    [00:00:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/blah/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:21.000] Search path: /blah
Info 3    [00:00:22.000] For info: /blah/file1.ts :: Config file name: /blah/tsconfig.json
Info 4    [00:00:23.000] Creating configuration project /blah/tsconfig.json
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /blah/tsconfig.json 2000 undefined Project: /blah/tsconfig.json WatchType: Config file
Info 6    [00:00:25.000] Config: /blah/tsconfig.json : {
 "rootNames": [
  "/blah/file1.ts",
  "/blah/file2.ts"
 ],
 "options": {
  "configFilePath": "/blah/tsconfig.json"
 }
}
Info 7    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /blah/file2.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:27.000] Starting updateGraphWorker: Project: /blah/tsconfig.json
Info 9    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /blah/tsconfig.json WatchType: Missing file
Info 10   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /blah/node_modules/@types 1 undefined Project: /blah/tsconfig.json WatchType: Type roots
Info 11   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /blah/node_modules/@types 1 undefined Project: /blah/tsconfig.json WatchType: Type roots
Info 12   [00:00:31.000] Finishing updateGraphWorker: Project: /blah/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:32.000] Project '/blah/tsconfig.json' (Configured)
Info 14   [00:00:33.000] 	Files (2)
	/blah/file1.ts SVC-1-0 "class CC { }"
	/blah/file2.ts Text-1 ""


	file1.ts
	  Part of 'files' list in tsconfig.json
	file2.ts
	  Part of 'files' list in tsconfig.json

Info 15   [00:00:34.000] -----------------------------------------------
Info 16   [00:00:35.000] Project '/blah/tsconfig.json' (Configured)
Info 16   [00:00:36.000] 	Files (2)

Info 16   [00:00:37.000] -----------------------------------------------
Info 16   [00:00:38.000] Open files: 
Info 16   [00:00:39.000] 	FileName: /blah/file1.ts ProjectRootPath: undefined
Info 16   [00:00:40.000] 		Projects: /blah/tsconfig.json
Info 16   [00:00:41.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/blah/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/blah/tsconfig.json: *new*
  {}
/blah/file2.ts: *new*
  {}

Before request

Info 17   [00:00:42.000] request:
    {
      "command": "getMoveToRefactoringFileSuggestions",
      "arguments": {
        "file": "/blah/file1.ts",
        "line": 1,
        "offset": 7
      },
      "seq": 2,
      "type": "request"
    }
Info 18   [00:00:43.000] response:
    {
      "response": {
        "newFilename": "/blah/CC.ts",
        "files": [
          "/blah/file1.ts",
          "/blah/file2.ts"
        ]
      },
      "responseRequired": true
    }
After request
