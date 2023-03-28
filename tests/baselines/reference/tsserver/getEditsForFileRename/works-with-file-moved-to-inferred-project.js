currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
import {} from "./b";

//// [/c.ts]
export {};

//// [/tsconfig.json]
{"files":["./a.ts","./b.ts"]}


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /
Info 3    [00:00:12.000] For info: /a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts",
  "/b.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:16.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 8    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 9    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 10   [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo:  0 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  0 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:21.000] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 13   [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 14   [00:00:23.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:24.000] Project '/tsconfig.json' (Configured)
Info 16   [00:00:25.000] 	Files (1)
	/a.ts SVC-1-0 "import {} from \"./b\";"


	a.ts
	  Part of 'files' list in tsconfig.json

Info 17   [00:00:26.000] -----------------------------------------------
Info 18   [00:00:27.000] Project '/tsconfig.json' (Configured)
Info 18   [00:00:28.000] 	Files (1)

Info 18   [00:00:29.000] -----------------------------------------------
Info 18   [00:00:30.000] Open files: 
Info 18   [00:00:31.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 18   [00:00:32.000] 		Projects: /tsconfig.json
Info 18   [00:00:33.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/b: *new*
  {"pollingInterval":500}
/b.ts: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/: *new*
  {}

Before request

Info 19   [00:00:34.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/c.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:35.000] Search path: /
Info 21   [00:00:36.000] For info: /c.ts :: Config file name: /tsconfig.json
Info 22   [00:00:37.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 23   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 24   [00:00:39.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 25   [00:00:40.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 26   [00:00:41.000] 	Files (1)
	/c.ts SVC-1-0 "export {};"


	c.ts
	  Root file specified for compilation

Info 27   [00:00:42.000] -----------------------------------------------
Info 28   [00:00:43.000] Project '/tsconfig.json' (Configured)
Info 28   [00:00:44.000] 	Files (1)

Info 28   [00:00:45.000] -----------------------------------------------
Info 28   [00:00:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 28   [00:00:47.000] 	Files (1)

Info 28   [00:00:48.000] -----------------------------------------------
Info 28   [00:00:49.000] Open files: 
Info 28   [00:00:50.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 28   [00:00:51.000] 		Projects: /tsconfig.json
Info 28   [00:00:52.000] 	FileName: /c.ts ProjectRootPath: undefined
Info 28   [00:00:53.000] 		Projects: /dev/null/inferredProject1*
Info 28   [00:00:54.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 29   [00:00:55.000] request:
    {
      "command": "getEditsForFileRename",
      "arguments": {
        "oldFilePath": "/b.ts",
        "newFilePath": "/c.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 30   [00:00:56.000] response:
    {
      "response": [
        {
          "fileName": "/tsconfig.json",
          "textChanges": [
            {
              "start": {
                "line": 1,
                "offset": 21
              },
              "end": {
                "line": 1,
                "offset": 27
              },
              "newText": "c.ts"
            }
          ]
        },
        {
          "fileName": "/a.ts",
          "textChanges": [
            {
              "start": {
                "line": 1,
                "offset": 17
              },
              "end": {
                "line": 1,
                "offset": 20
              },
              "newText": "./c"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
