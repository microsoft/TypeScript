TI:: Creating typing installer
//// [/a/b/referenceFile1.ts]

                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();

//// [/a/b/tsconfig.json]
{
                        "compileOnSave": true
                    }


TI:: [00:00:11.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:12.000] Processing cache location '/a/data/'
TI:: [00:00:13.000] Trying to find '/a/data/package.json'...
TI:: [00:00:14.000] Finished processing cache location '/a/data/'
TI:: [00:00:15.000] Npm config file: /a/data/package.json
TI:: [00:00:16.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:21.000] Updating types-registry npm package...
TI:: [00:00:22.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:29.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:30.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:31.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/referenceFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:32.000] Search path: /a/b
Info 3    [00:00:33.000] For info: /a/b/referenceFile1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:34.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:36.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/referenceFile1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:39.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /a/b/modulefile2.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 11   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 12   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:44.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:45.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:46.000] 	Files (1)
	/a/b/referenceFile1.ts


	referenceFile1.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:47.000] -----------------------------------------------
Info 18   [00:00:48.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:49.000] 	Files (1)

Info 18   [00:00:50.000] -----------------------------------------------
Info 18   [00:00:51.000] Open files: 
Info 18   [00:00:52.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 18   [00:00:53.000] 		Projects: /a/b/tsconfig.json
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

Info 18   [00:00:54.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:00:55.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b/referenceFile1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

Info 20   [00:00:56.000] Before ensureProjectForOpenFiles:
Info 21   [00:00:57.000] Project '/a/b/tsconfig.json' (Configured)
Info 21   [00:00:58.000] 	Files (1)

Info 21   [00:00:59.000] -----------------------------------------------
Info 21   [00:01:00.000] Open files: 
Info 21   [00:01:01.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 21   [00:01:02.000] 		Projects: /a/b/tsconfig.json
Info 21   [00:01:03.000] After ensureProjectForOpenFiles:
Info 22   [00:01:04.000] Project '/a/b/tsconfig.json' (Configured)
Info 22   [00:01:05.000] 	Files (1)

Info 22   [00:01:06.000] -----------------------------------------------
Info 22   [00:01:07.000] Open files: 
Info 22   [00:01:08.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 22   [00:01:09.000] 		Projects: /a/b/tsconfig.json
After request

Info 22   [00:01:10.000] response:
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