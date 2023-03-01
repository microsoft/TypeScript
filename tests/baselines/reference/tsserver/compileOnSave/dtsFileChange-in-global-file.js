Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/runtime/a.d.ts]
declare const x: string;

//// [/a/b.ts]
var y = 1;

//// [/a/tsconfig.json]
{"compilerOptions":{},"compileOnSave":true}


Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/runtime/a.d.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] Search path: /a/runtime
Info 3    [00:00:16.000] For info: /a/runtime/a.d.ts :: Config file name: /a/tsconfig.json
Info 4    [00:00:17.000] Creating configuration project /a/tsconfig.json
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [00:00:19.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/b.ts",
  "/a/runtime/a.d.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 7    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/b.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:23.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 11   [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 12   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 14   [00:00:27.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:28.000] Project '/a/tsconfig.json' (Configured)
Info 16   [00:00:29.000] 	Files (2)
	/a/b.ts Text-1 "var y = 1;"
	/a/runtime/a.d.ts SVC-1-0 "declare const x: string;"


	b.ts
	  Matched by default include pattern '**/*'
	runtime/a.d.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:30.000] -----------------------------------------------
Info 18   [00:00:31.000] Project '/a/tsconfig.json' (Configured)
Info 18   [00:00:32.000] 	Files (2)

Info 18   [00:00:33.000] -----------------------------------------------
Info 18   [00:00:34.000] Open files: 
Info 18   [00:00:35.000] 	FileName: /a/runtime/a.d.ts ProjectRootPath: undefined
Info 18   [00:00:36.000] 		Projects: /a/tsconfig.json
Info 18   [00:00:37.000] response:
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
/a/b.ts: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Before request

Info 19   [00:00:38.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:39.000] FileWatcher:: Close:: WatchInfo: /a/b.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:40.000] Search path: /a
Info 22   [00:00:41.000] For info: /a/b.ts :: Config file name: /a/tsconfig.json
Info 23   [00:00:42.000] Project '/a/tsconfig.json' (Configured)
Info 23   [00:00:43.000] 	Files (2)

Info 23   [00:00:44.000] -----------------------------------------------
Info 23   [00:00:45.000] Open files: 
Info 23   [00:00:46.000] 	FileName: /a/runtime/a.d.ts ProjectRootPath: undefined
Info 23   [00:00:47.000] 		Projects: /a/tsconfig.json
Info 23   [00:00:48.000] 	FileName: /a/b.ts ProjectRootPath: undefined
Info 23   [00:00:49.000] 		Projects: /a/tsconfig.json
Info 23   [00:00:50.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}

FsWatches *deleted*::
/a/b.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Before request

Info 24   [00:00:51.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/runtime/a.d.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 25   [00:00:52.000] Before ensureProjectForOpenFiles:
Info 26   [00:00:53.000] Project '/a/tsconfig.json' (Configured)
Info 26   [00:00:54.000] 	Files (2)

Info 26   [00:00:55.000] -----------------------------------------------
Info 26   [00:00:56.000] Open files: 
Info 26   [00:00:57.000] 	FileName: /a/runtime/a.d.ts ProjectRootPath: undefined
Info 26   [00:00:58.000] 		Projects: /a/tsconfig.json
Info 26   [00:00:59.000] 	FileName: /a/b.ts ProjectRootPath: undefined
Info 26   [00:01:00.000] 		Projects: /a/tsconfig.json
Info 26   [00:01:01.000] After ensureProjectForOpenFiles:
Info 27   [00:01:02.000] Project '/a/tsconfig.json' (Configured)
Info 27   [00:01:03.000] 	Files (2)

Info 27   [00:01:04.000] -----------------------------------------------
Info 27   [00:01:05.000] Open files: 
Info 27   [00:01:06.000] 	FileName: /a/runtime/a.d.ts ProjectRootPath: undefined
Info 27   [00:01:07.000] 		Projects: /a/tsconfig.json
Info 27   [00:01:08.000] 	FileName: /a/b.ts ProjectRootPath: undefined
Info 27   [00:01:09.000] 		Projects: /a/tsconfig.json
Info 27   [00:01:10.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 28   [00:01:11.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 29   [00:01:12.000] response:
    {
      "response": [
        {
          "projectFileName": "/a/tsconfig.json",
          "fileNames": [
            "/a/b.ts",
            "/a/runtime/a.d.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
After request
