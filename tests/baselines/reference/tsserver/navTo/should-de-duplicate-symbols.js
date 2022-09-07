Info 0    [16:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:16.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/index.ts"}}
//// [/a/tsconfig.json]
{
    "compilerOptions": {
        "composite": true
    }
}

//// [/a/index.ts]
export const abcdef = 1;

//// [/b/tsconfig.json]
{
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../a" }
    ]
}

//// [/b/index.ts]
import a = require("../a");
export const ghijkl = a.abcdef;


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:17.000] Search path: /a
Info 3    [16:00:18.000] For info: /a/index.ts :: Config file name: /a/tsconfig.json
Info 4    [16:00:19.000] Creating configuration project /a/tsconfig.json
Info 5    [16:00:20.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [16:00:21.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 7    [16:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:24.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:25.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 11   [16:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 12   [16:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [16:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 14   [16:00:29.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [16:00:30.000] Project '/a/tsconfig.json' (Configured)
Info 16   [16:00:31.000] 	Files (1)
	/a/index.ts


	index.ts
	  Matched by default include pattern '**/*'

Info 17   [16:00:32.000] -----------------------------------------------
Info 18   [16:00:33.000] Search path: /a
Info 19   [16:00:34.000] For info: /a/tsconfig.json :: No config files found.
Info 20   [16:00:35.000] Project '/a/tsconfig.json' (Configured)
Info 20   [16:00:36.000] 	Files (1)

Info 20   [16:00:37.000] -----------------------------------------------
Info 20   [16:00:38.000] Open files: 
Info 20   [16:00:39.000] 	FileName: /a/index.ts ProjectRootPath: undefined
Info 20   [16:00:40.000] 		Projects: /a/tsconfig.json

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Info 20   [16:00:41.000] response:{"responseRequired":false}
Info 21   [16:00:42.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/b/index.ts"}}

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Info 22   [16:00:43.000] Search path: /b
Info 23   [16:00:44.000] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info 24   [16:00:45.000] Creating configuration project /b/tsconfig.json
Info 25   [16:00:46.000] FileWatcher:: Added:: WatchInfo: /b/tsconfig.json 2000 undefined Project: /b/tsconfig.json WatchType: Config file
Info 26   [16:00:47.000] Config: /b/tsconfig.json : {
 "rootNames": [
  "/b/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/a",
   "originalPath": "../a"
  }
 ]
}
Info 27   [16:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 28   [16:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 29   [16:00:50.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 30   [16:00:51.000] Starting updateGraphWorker: Project: /b/tsconfig.json
Info 31   [16:00:52.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/tsconfig.json WatchType: Missing file
Info 32   [16:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 33   [16:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 34   [16:00:55.000] Finishing updateGraphWorker: Project: /b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 35   [16:00:56.000] Project '/b/tsconfig.json' (Configured)
Info 36   [16:00:57.000] 	Files (2)
	/a/index.ts
	/b/index.ts


	../a/index.ts
	  Imported via "../a" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 37   [16:00:58.000] -----------------------------------------------
Info 38   [16:00:59.000] Search path: /b
Info 39   [16:01:00.000] For info: /b/tsconfig.json :: No config files found.
Info 40   [16:01:01.000] Project '/a/tsconfig.json' (Configured)
Info 40   [16:01:02.000] 	Files (1)

Info 40   [16:01:03.000] -----------------------------------------------
Info 40   [16:01:04.000] Project '/b/tsconfig.json' (Configured)
Info 40   [16:01:05.000] 	Files (2)

Info 40   [16:01:06.000] -----------------------------------------------
Info 40   [16:01:07.000] Open files: 
Info 40   [16:01:08.000] 	FileName: /a/index.ts ProjectRootPath: undefined
Info 40   [16:01:09.000] 		Projects: /a/tsconfig.json,/b/tsconfig.json
Info 40   [16:01:10.000] 	FileName: /b/index.ts ProjectRootPath: undefined
Info 40   [16:01:11.000] 		Projects: /b/tsconfig.json

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}
/b:
  {}

Info 40   [16:01:12.000] response:{"responseRequired":false}
Info 41   [16:01:13.000] request:{"seq":0,"type":"request","command":"navto","arguments":{"searchValue":"abcdef","file":"/a/index.ts"}}

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}
/b:
  {}


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}
/b:
  {}

Info 42   [16:01:14.000] response:{"response":[{"name":"abcdef","kind":"const","kindModifiers":"export","isCaseSensitive":true,"matchKind":"exact","file":"/a/index.ts","start":{"line":1,"offset":14},"end":{"line":1,"offset":24}}],"responseRequired":true}