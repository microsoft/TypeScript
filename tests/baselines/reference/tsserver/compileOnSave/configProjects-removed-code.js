Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/referenceFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/moduleFile1.ts]
export function Foo() { };

//// [/a/b/referenceFile1.ts]

                    /// <reference path="./moduleFile1.ts" />
                    export var x = Foo();

//// [/a/b/tsconfig.json]
{
                        "compileOnSave": true
                    }


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:15.000] Search path: /a/b
Info 3    [00:00:16.000] For info: /a/b/referenceFile1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:17.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:19.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/moduleFile1.ts",
  "/a/b/referenceFile1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:23.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 11   [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 12   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:27.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:28.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:29.000] 	Files (2)
	/a/b/moduleFile1.ts
	/a/b/referenceFile1.ts


	moduleFile1.ts
	  Matched by default include pattern '**/*'
	  Referenced via './moduleFile1.ts' from file 'referenceFile1.ts'
	referenceFile1.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:30.000] -----------------------------------------------
Info 18   [00:00:31.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:32.000] 	Files (2)

Info 18   [00:00:33.000] -----------------------------------------------
Info 18   [00:00:34.000] Open files: 
Info 18   [00:00:35.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 18   [00:00:36.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/modulefile1.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 18   [00:00:37.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:00:39.000] FileWatcher:: Triggered with /a/b/moduleFile1.ts 2:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 20   [00:00:40.000] FileWatcher:: Close:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:41.000] Scheduled: /a/b/tsconfig.json
Info 22   [00:00:42.000] Scheduled: *ensureProjectForOpenFiles*
Info 23   [00:00:43.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/moduleFile1.ts 2:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 24   [00:00:44.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 25   [00:00:45.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 26   [00:00:46.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 27   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 28   [00:00:48.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b/referenceFile1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request
//// [/a/b/moduleFile1.ts] deleted

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 29   [00:00:49.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 30   [00:00:50.000] FileWatcher:: Added:: WatchInfo: /a/b/modulefile1.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 31   [00:00:51.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 32   [00:00:52.000] Project '/a/b/tsconfig.json' (Configured)
Info 33   [00:00:53.000] 	Files (1)
	/a/b/referenceFile1.ts


	referenceFile1.ts
	  Matched by default include pattern '**/*'

Info 34   [00:00:54.000] -----------------------------------------------
Info 35   [00:00:55.000] Before ensureProjectForOpenFiles:
Info 36   [00:00:56.000] Project '/a/b/tsconfig.json' (Configured)
Info 36   [00:00:57.000] 	Files (1)

Info 36   [00:00:58.000] -----------------------------------------------
Info 36   [00:00:59.000] Open files: 
Info 36   [00:01:00.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 36   [00:01:01.000] 		Projects: /a/b/tsconfig.json
Info 36   [00:01:02.000] After ensureProjectForOpenFiles:
Info 37   [00:01:03.000] Project '/a/b/tsconfig.json' (Configured)
Info 37   [00:01:04.000] 	Files (1)

Info 37   [00:01:05.000] -----------------------------------------------
Info 37   [00:01:06.000] Open files: 
Info 37   [00:01:07.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 37   [00:01:08.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile1.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 37   [00:01:09.000] response:
    {
      "response": [
        {
          "projectFileName": "/a/b/tsconfig.json",
          "fileNames": [
            "/a/b/referenceFile1.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
Info 38   [00:01:10.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b/moduleFile1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile1.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile1.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 39   [00:01:11.000] response:
    {
      "response": [],
      "responseRequired": true
    }