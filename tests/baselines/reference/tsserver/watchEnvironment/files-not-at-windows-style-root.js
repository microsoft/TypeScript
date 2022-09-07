Info 0    [16:00:21.000] Provided types map file "c:/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:22.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "c:/myfolder/allproject/project/file1.ts"
      }
    }
//// [c:/myfolder/allproject/project/tsconfig.json]
{}

//// [c:/myfolder/allproject/project/file1.ts]
let x = 10;

//// [c:/myfolder/allproject/project/file2.ts]
let y = 10;

//// [c:/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:23.000] Search path: c:/myfolder/allproject/project
Info 3    [16:00:24.000] For info: c:/myfolder/allproject/project/file1.ts :: Config file name: c:/myfolder/allproject/project/tsconfig.json
Info 4    [16:00:25.000] Creating configuration project c:/myfolder/allproject/project/tsconfig.json
Info 5    [16:00:26.000] FileWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/tsconfig.json 2000 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Config file
Info 6    [16:00:27.000] Config: c:/myfolder/allproject/project/tsconfig.json : {
 "rootNames": [
  "c:/myfolder/allproject/project/file1.ts",
  "c:/myfolder/allproject/project/file2.ts"
 ],
 "options": {
  "configFilePath": "c:/myfolder/allproject/project/tsconfig.json"
 }
}
Info 7    [16:00:28.000] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project 1 undefined Config: c:/myfolder/allproject/project/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project 1 undefined Config: c:/myfolder/allproject/project/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:30.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:31.000] FileWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/file2.ts 500 undefined WatchType: Closed Script info
Info 11   [16:00:32.000] Starting updateGraphWorker: Project: c:/myfolder/allproject/project/tsconfig.json
Info 12   [16:00:33.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [16:00:34.000] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info 14   [16:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info 15   [16:00:36.000] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info 16   [16:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info 17   [16:00:38.000] Finishing updateGraphWorker: Project: c:/myfolder/allproject/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [16:00:39.000] Project 'c:/myfolder/allproject/project/tsconfig.json' (Configured)
Info 19   [16:00:40.000] 	Files (3)
	c:/a/lib/lib.d.ts
	c:/myfolder/allproject/project/file1.ts
	c:/myfolder/allproject/project/file2.ts


	../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'

Info 20   [16:00:41.000] -----------------------------------------------
Info 21   [16:00:42.000] Project 'c:/myfolder/allproject/project/tsconfig.json' (Configured)
Info 21   [16:00:43.000] 	Files (3)

Info 21   [16:00:44.000] -----------------------------------------------
Info 21   [16:00:45.000] Open files: 
Info 21   [16:00:46.000] 	FileName: c:/myfolder/allproject/project/file1.ts ProjectRootPath: undefined
Info 21   [16:00:47.000] 		Projects: c:/myfolder/allproject/project/tsconfig.json

PolledWatches::
c:/myfolder/allproject/project/node_modules/@types:
  {"pollingInterval":500}
c:/myfolder/allproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
c:/myfolder/allproject/project/tsconfig.json:
  {}
c:/myfolder/allproject/project/file2.ts:
  {}
c:/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
c:/myfolder/allproject/project:
  {}

Info 21   [16:00:48.000] response:
    {
      "responseRequired": false
    }