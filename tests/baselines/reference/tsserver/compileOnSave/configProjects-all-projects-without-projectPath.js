currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/file1.ts]
export var t = 10;

//// [/a/b/file2.ts]
import {t} from "./file1"; var t2 = 11;

//// [/a/c/file2.ts]
import {t} from "../b/file1"; var t3 = 11;

//// [/a/b/tsconfig.json]
{ "compileOnSave": true }

//// [/a/c/tsconfig.json]
{ "compileOnSave": true }


Info 1    [00:00:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:21.000] Search path: /a/b
Info 3    [00:00:22.000] For info: /a/b/file1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:23.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:25.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1.ts",
  "/a/b/file2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:29.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 11   [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 12   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:33.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:34.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:35.000] 	Files (2)
	/a/b/file1.ts SVC-1-0 "export var t = 10;"
	/a/b/file2.ts Text-1 "import {t} from \"./file1\"; var t2 = 11;"


	file1.ts
	  Matched by default include pattern '**/*'
	  Imported via "./file1" from file 'file2.ts'
	file2.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:36.000] -----------------------------------------------
Info 18   [00:00:37.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:38.000] 	Files (2)

Info 18   [00:00:39.000] -----------------------------------------------
Info 18   [00:00:40.000] Open files: 
Info 18   [00:00:41.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 18   [00:00:42.000] 		Projects: /a/b/tsconfig.json
Info 18   [00:00:43.000] response:
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
/a/b/file2.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 19   [00:00:44.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file2.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:45.000] FileWatcher:: Close:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:46.000] Search path: /a/b
Info 22   [00:00:47.000] For info: /a/b/file2.ts :: Config file name: /a/b/tsconfig.json
Info 23   [00:00:48.000] Project '/a/b/tsconfig.json' (Configured)
Info 23   [00:00:49.000] 	Files (2)

Info 23   [00:00:50.000] -----------------------------------------------
Info 23   [00:00:51.000] Open files: 
Info 23   [00:00:52.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 23   [00:00:53.000] 		Projects: /a/b/tsconfig.json
Info 23   [00:00:54.000] 	FileName: /a/b/file2.ts ProjectRootPath: undefined
Info 23   [00:00:55.000] 		Projects: /a/b/tsconfig.json
Info 23   [00:00:56.000] response:
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
/a/b/file2.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info 24   [00:00:57.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/c/file2.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 25   [00:00:58.000] Search path: /a/c
Info 26   [00:00:59.000] For info: /a/c/file2.ts :: Config file name: /a/c/tsconfig.json
Info 27   [00:01:00.000] Creating configuration project /a/c/tsconfig.json
Info 28   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /a/c/tsconfig.json 2000 undefined Project: /a/c/tsconfig.json WatchType: Config file
Info 29   [00:01:02.000] Config: /a/c/tsconfig.json : {
 "rootNames": [
  "/a/c/file2.ts"
 ],
 "options": {
  "configFilePath": "/a/c/tsconfig.json"
 }
}
Info 30   [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /a/c 1 undefined Config: /a/c/tsconfig.json WatchType: Wild card directory
Info 31   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c 1 undefined Config: /a/c/tsconfig.json WatchType: Wild card directory
Info 32   [00:01:05.000] Starting updateGraphWorker: Project: /a/c/tsconfig.json
Info 33   [00:01:06.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/c/tsconfig.json WatchType: Missing file
Info 34   [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 35   [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 36   [00:01:09.000] Finishing updateGraphWorker: Project: /a/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 37   [00:01:10.000] Project '/a/c/tsconfig.json' (Configured)
Info 38   [00:01:11.000] 	Files (2)
	/a/b/file1.ts SVC-1-0 "export var t = 10;"
	/a/c/file2.ts SVC-1-0 "import {t} from \"../b/file1\"; var t3 = 11;"


	../b/file1.ts
	  Imported via "../b/file1" from file 'file2.ts'
	file2.ts
	  Matched by default include pattern '**/*'

Info 39   [00:01:12.000] -----------------------------------------------
Info 40   [00:01:13.000] Project '/a/b/tsconfig.json' (Configured)
Info 40   [00:01:14.000] 	Files (2)

Info 40   [00:01:15.000] -----------------------------------------------
Info 40   [00:01:16.000] Project '/a/c/tsconfig.json' (Configured)
Info 40   [00:01:17.000] 	Files (2)

Info 40   [00:01:18.000] -----------------------------------------------
Info 40   [00:01:19.000] Open files: 
Info 40   [00:01:20.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 40   [00:01:21.000] 		Projects: /a/b/tsconfig.json,/a/c/tsconfig.json
Info 40   [00:01:22.000] 	FileName: /a/b/file2.ts ProjectRootPath: undefined
Info 40   [00:01:23.000] 		Projects: /a/b/tsconfig.json
Info 40   [00:01:24.000] 	FileName: /a/c/file2.ts ProjectRootPath: undefined
Info 40   [00:01:25.000] 		Projects: /a/c/tsconfig.json
Info 40   [00:01:26.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/c/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/c/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b:
  {}
/a/c: *new*
  {}

Before request

Info 41   [00:01:27.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 42   [00:01:28.000] Before ensureProjectForOpenFiles:
Info 43   [00:01:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 43   [00:01:30.000] 	Files (2)

Info 43   [00:01:31.000] -----------------------------------------------
Info 43   [00:01:32.000] Project '/a/c/tsconfig.json' (Configured)
Info 43   [00:01:33.000] 	Files (2)

Info 43   [00:01:34.000] -----------------------------------------------
Info 43   [00:01:35.000] Open files: 
Info 43   [00:01:36.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 43   [00:01:37.000] 		Projects: /a/b/tsconfig.json,/a/c/tsconfig.json
Info 43   [00:01:38.000] 	FileName: /a/b/file2.ts ProjectRootPath: undefined
Info 43   [00:01:39.000] 		Projects: /a/b/tsconfig.json
Info 43   [00:01:40.000] 	FileName: /a/c/file2.ts ProjectRootPath: undefined
Info 43   [00:01:41.000] 		Projects: /a/c/tsconfig.json
Info 43   [00:01:42.000] After ensureProjectForOpenFiles:
Info 44   [00:01:43.000] Project '/a/b/tsconfig.json' (Configured)
Info 44   [00:01:44.000] 	Files (2)

Info 44   [00:01:45.000] -----------------------------------------------
Info 44   [00:01:46.000] Project '/a/c/tsconfig.json' (Configured)
Info 44   [00:01:47.000] 	Files (2)

Info 44   [00:01:48.000] -----------------------------------------------
Info 44   [00:01:49.000] Open files: 
Info 44   [00:01:50.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 44   [00:01:51.000] 		Projects: /a/b/tsconfig.json,/a/c/tsconfig.json
Info 44   [00:01:52.000] 	FileName: /a/b/file2.ts ProjectRootPath: undefined
Info 44   [00:01:53.000] 		Projects: /a/b/tsconfig.json
Info 44   [00:01:54.000] 	FileName: /a/c/file2.ts ProjectRootPath: undefined
Info 44   [00:01:55.000] 		Projects: /a/c/tsconfig.json
Info 44   [00:01:56.000] response:
    {
      "response": [
        {
          "projectFileName": "/a/b/tsconfig.json",
          "fileNames": [
            "/a/b/file1.ts",
            "/a/b/file2.ts"
          ],
          "projectUsesOutFile": false
        },
        {
          "projectFileName": "/a/c/tsconfig.json",
          "fileNames": [
            "/a/b/file1.ts",
            "/a/c/file2.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
After request
