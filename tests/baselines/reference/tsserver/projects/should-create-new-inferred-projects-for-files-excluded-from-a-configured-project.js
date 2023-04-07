currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/tsconfig.json]
{
                    "compilerOptions": {},
                    "files": ["/a/b/commonFile1.ts", "/a/b/commonFile2.ts"]
                }


Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/commonFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] Search path: /a/b
Info 3    [00:00:16.000] For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:17.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:19.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:21.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 10   [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:25.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:26.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:27.000] 	Files (2)
	/a/b/commonFile1.ts SVC-1-0 "let x = 1"
	/a/b/commonFile2.ts Text-1 "let y = 1"


	commonFile1.ts
	  Part of 'files' list in tsconfig.json
	commonFile2.ts
	  Part of 'files' list in tsconfig.json

Info 15   [00:00:28.000] -----------------------------------------------
Info 16   [00:00:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:30.000] 	Files (2)

Info 16   [00:00:31.000] -----------------------------------------------
Info 16   [00:00:32.000] Open files: 
Info 16   [00:00:33.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 16   [00:00:34.000] 		Projects: /a/b/tsconfig.json
Info 16   [00:00:35.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b/commonfile2.ts: *new*
  {}

Info 17   [00:00:39.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 18   [00:00:40.000] Scheduled: /a/b/tsconfig.json
Info 19   [00:00:41.000] Scheduled: *ensureProjectForOpenFiles*
Info 20   [00:00:42.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /a/b/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/a/b/tsconfig.json]
{
                "compilerOptions": {},
                "files": ["/a/b/commonFile1.ts"]
            }


Info 21   [00:00:43.000] Running: /a/b/tsconfig.json
Info 22   [00:00:44.000] Reloading configured project /a/b/tsconfig.json
Info 23   [00:00:45.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 24   [00:00:46.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 25   [00:00:47.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 26   [00:00:48.000] Project '/a/b/tsconfig.json' (Configured)
Info 27   [00:00:49.000] 	Files (1)
	/a/b/commonFile1.ts SVC-1-0 "let x = 1"


	commonFile1.ts
	  Part of 'files' list in tsconfig.json

Info 28   [00:00:50.000] -----------------------------------------------
Info 29   [00:00:51.000] Running: *ensureProjectForOpenFiles*
Info 30   [00:00:52.000] Before ensureProjectForOpenFiles:
Info 31   [00:00:53.000] Project '/a/b/tsconfig.json' (Configured)
Info 31   [00:00:54.000] 	Files (1)

Info 31   [00:00:55.000] -----------------------------------------------
Info 31   [00:00:56.000] Open files: 
Info 31   [00:00:57.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 31   [00:00:58.000] 		Projects: /a/b/tsconfig.json
Info 31   [00:00:59.000] After ensureProjectForOpenFiles:
Info 32   [00:01:00.000] Project '/a/b/tsconfig.json' (Configured)
Info 32   [00:01:01.000] 	Files (1)

Info 32   [00:01:02.000] -----------------------------------------------
Info 32   [00:01:03.000] Open files: 
Info 32   [00:01:04.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 32   [00:01:05.000] 		Projects: /a/b/tsconfig.json
After running Timeout callback:: count: 0

Before request

Info 32   [00:01:06.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/commonFile2.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 33   [00:01:07.000] FileWatcher:: Close:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 34   [00:01:08.000] Search path: /a/b
Info 35   [00:01:09.000] For info: /a/b/commonFile2.ts :: Config file name: /a/b/tsconfig.json
Info 36   [00:01:10.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 37   [00:01:11.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 38   [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 39   [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 40   [00:01:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 41   [00:01:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 42   [00:01:16.000] 	Files (1)
	/a/b/commonFile2.ts Text-1 "let y = 1"


	commonFile2.ts
	  Root file specified for compilation

Info 43   [00:01:17.000] -----------------------------------------------
Info 44   [00:01:18.000] Project '/a/b/tsconfig.json' (Configured)
Info 44   [00:01:19.000] 	Files (1)

Info 44   [00:01:20.000] -----------------------------------------------
Info 44   [00:01:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 44   [00:01:22.000] 	Files (1)

Info 44   [00:01:23.000] -----------------------------------------------
Info 44   [00:01:24.000] Open files: 
Info 44   [00:01:25.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 44   [00:01:26.000] 		Projects: /a/b/tsconfig.json
Info 44   [00:01:27.000] 	FileName: /a/b/commonFile2.ts ProjectRootPath: undefined
Info 44   [00:01:28.000] 		Projects: /dev/null/inferredProject1*
Info 44   [00:01:29.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatches *deleted*::
/a/b/commonfile2.ts:
  {}
