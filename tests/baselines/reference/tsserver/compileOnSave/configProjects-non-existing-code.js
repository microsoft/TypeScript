currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/referenceFile1.ts]

                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();

//// [/a/b/tsconfig.json]
{
                        "compileOnSave": true
                    }


Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/referenceFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] Search path: /a/b
Info 3    [00:00:14.000] For info: /a/b/referenceFile1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:15.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:17.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/referenceFile1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:20.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/modulefile2.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 11   [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 12   [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:25.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:26.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:27.000] 	Files (1)
	/a/b/referenceFile1.ts SVC-1-0 "\n                    /// <reference path=\"./moduleFile2.ts\" />\n                    export var x = Foo();"


	referenceFile1.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:28.000] -----------------------------------------------
Info 18   [00:00:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:30.000] 	Files (1)

Info 18   [00:00:31.000] -----------------------------------------------
Info 18   [00:00:32.000] Open files: 
Info 18   [00:00:33.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 18   [00:00:34.000] 		Projects: /a/b/tsconfig.json
Info 18   [00:00:35.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/modulefile2.ts: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 19   [00:00:36.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b/referenceFile1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:37.000] Before ensureProjectForOpenFiles:
Info 21   [00:00:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 21   [00:00:39.000] 	Files (1)

Info 21   [00:00:40.000] -----------------------------------------------
Info 21   [00:00:41.000] Open files: 
Info 21   [00:00:42.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 21   [00:00:43.000] 		Projects: /a/b/tsconfig.json
Info 21   [00:00:44.000] After ensureProjectForOpenFiles:
Info 22   [00:00:45.000] Project '/a/b/tsconfig.json' (Configured)
Info 22   [00:00:46.000] 	Files (1)

Info 22   [00:00:47.000] -----------------------------------------------
Info 22   [00:00:48.000] Open files: 
Info 22   [00:00:49.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 22   [00:00:50.000] 		Projects: /a/b/tsconfig.json
Info 22   [00:00:51.000] response:
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
After request
