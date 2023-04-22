currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/file1.ts]
import {} from "./file.ts";

//// [/file2.ts]
interface ka {
                name: string;
            }
            

//// [/tsconfig.json]
{"files":["./file1.ts","./file.ts"]}


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file2.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /
Info 3    [00:00:12.000] For info: /file2.ts :: Config file name: /tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /tsconfig.json : {
 "rootNames": [
  "/file1.ts",
  "/file.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /file1.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:17.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 9    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /file.ts 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 10   [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /file.ts 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo:  0 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  0 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:22.000] FileWatcher:: Added:: WatchInfo: /file.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 14   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 15   [00:00:24.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:25.000] Project '/tsconfig.json' (Configured)
Info 17   [00:00:26.000] 	Files (1)
	/file1.ts Text-1 "import {} from \"./file.ts\";"


	file1.ts
	  Part of 'files' list in tsconfig.json

Info 18   [00:00:27.000] -----------------------------------------------
Info 19   [00:00:28.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 21   [00:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:00:32.000] 	Files (1)
	/file2.ts SVC-1-0 "interface ka {\n                name: string;\n            }\n            "


	file2.ts
	  Root file specified for compilation

Info 24   [00:00:33.000] -----------------------------------------------
Info 25   [00:00:34.000] Project '/tsconfig.json' (Configured)
Info 25   [00:00:35.000] 	Files (1)

Info 25   [00:00:36.000] -----------------------------------------------
Info 25   [00:00:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:38.000] 	Files (1)

Info 25   [00:00:39.000] -----------------------------------------------
Info 25   [00:00:40.000] Open files: 
Info 25   [00:00:41.000] 	FileName: /file2.ts ProjectRootPath: undefined
Info 25   [00:00:42.000] 		Projects: /dev/null/inferredProject1*
Info 25   [00:00:43.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/file.ts: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/file1.ts: *new*
  {}
/: *new*
  {}

Before request

Info 26   [00:00:44.000] request:
    {
      "command": "getMoveToRefactoringFileSuggestions",
      "arguments": {
        "file": "/file2.ts",
        "line": 1,
        "offset": 11
      },
      "seq": 2,
      "type": "request"
    }
Info 27   [00:00:45.000] response:
    {
      "response": {
        "newFilename": "/ka.ts",
        "files": [
          "/file2.ts"
        ]
      },
      "responseRequired": true
    }
After request
