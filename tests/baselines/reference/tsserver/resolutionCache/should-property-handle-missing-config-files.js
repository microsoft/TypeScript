currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let x = 1


Info 1    [00:00:10.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          },
          {
            "fileName": "/a/b/tsconfig.json"
          }
        ],
        "options": {},
        "projectFileName": "project1"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:12.000] Starting updateGraphWorker: Project: project1
Info 4    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project1 WatchType: Missing file
Info 5    [00:00:14.000] Finishing updateGraphWorker: Project: project1 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 6    [00:00:15.000] Project 'project1' (External)
Info 7    [00:00:16.000] 	Files (1)
	/a/b/app.ts Text-1 "let x = 1"


	a/b/app.ts
	  Root file specified for compilation

Info 8    [00:00:17.000] -----------------------------------------------
Info 9    [00:00:18.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}

Before request
//// [/a/b/tsconfig.json]
{}


Info 10   [00:00:21.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          },
          {
            "fileName": "/a/b/tsconfig.json"
          }
        ],
        "options": {},
        "projectFileName": "project1"
      },
      "seq": 2,
      "type": "request"
    }
Info 11   [00:00:22.000] `remove Project::
Info 12   [00:00:23.000] Project 'project1' (External)
Info 13   [00:00:24.000] 	Files (1)
	/a/b/app.ts


	a/b/app.ts
	  Root file specified for compilation

Info 14   [00:00:25.000] -----------------------------------------------
Info 15   [00:00:26.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project1 WatchType: Missing file
Info 16   [00:00:27.000] Creating configuration project /a/b/tsconfig.json
Info 17   [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 18   [00:00:29.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 19   [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 20   [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 21   [00:00:32.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 22   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 23   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 24   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 25   [00:00:36.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 26   [00:00:37.000] Project '/a/b/tsconfig.json' (Configured)
Info 27   [00:00:38.000] 	Files (1)
	/a/b/app.ts Text-1 "let x = 1"


	app.ts
	  Matched by default include pattern '**/*'

Info 28   [00:00:39.000] -----------------------------------------------
Info 29   [00:00:40.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500} *new*
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts:
  {}
/a/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}
