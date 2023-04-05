currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/file1.d.ts]
class C {}

//// [/a/lib.d.ts]


//// [/a/file3.d.ts]


//// [/a/lib.es6.d.ts]


//// [/tsconfig.json]
{"files":["./file1.d.ts","./a/lib.d.ts","./a/file3.d.ts","/a/lib.es6.d.ts"]}


Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file1.d.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] Search path: /
Info 3    [00:00:18.000] For info: /file1.d.ts :: Config file name: /tsconfig.json
Info 4    [00:00:19.000] Creating configuration project /tsconfig.json
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:21.000] Config: /tsconfig.json : {
 "rootNames": [
  "/file1.d.ts",
  "/a/lib.d.ts",
  "/a/file3.d.ts",
  "/a/lib.es6.d.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib.d.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/file3.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib.es6.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:25.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 11   [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 12   [00:00:27.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:28.000] Project '/tsconfig.json' (Configured)
Info 14   [00:00:29.000] 	Files (4)
	/file1.d.ts SVC-1-0 "class C {}"
	/a/lib.d.ts Text-1 ""
	/a/file3.d.ts Text-1 ""
	/a/lib.es6.d.ts Text-1 ""


	file1.d.ts
	  Part of 'files' list in tsconfig.json
	a/lib.d.ts
	  Part of 'files' list in tsconfig.json
	a/file3.d.ts
	  Part of 'files' list in tsconfig.json
	a/lib.es6.d.ts
	  Part of 'files' list in tsconfig.json

Info 15   [00:00:30.000] -----------------------------------------------
Info 16   [00:00:31.000] Project '/tsconfig.json' (Configured)
Info 16   [00:00:32.000] 	Files (4)

Info 16   [00:00:33.000] -----------------------------------------------
Info 16   [00:00:34.000] Open files: 
Info 16   [00:00:35.000] 	FileName: /file1.d.ts ProjectRootPath: undefined
Info 16   [00:00:36.000] 		Projects: /tsconfig.json
Info 16   [00:00:37.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/a/lib.d.ts: *new*
  {}
/a/file3.d.ts: *new*
  {}
/a/lib.es6.d.ts: *new*
  {}

Before request

Info 17   [00:00:38.000] request:
    {
      "command": "getMoveToRefactoringFileSuggestions",
      "arguments": {
        "file": "/file1.d.ts",
        "line": 1,
        "offset": 7
      },
      "seq": 2,
      "type": "request"
    }
Info 18   [00:00:39.000] response:
    {
      "response": {
        "newFilename": "/C.d.ts",
        "files": [
          "/a/file3.d.ts"
        ]
      },
      "responseRequired": true
    }
After request
