Info 0    [00:00:21.000] Provided types map file "c:/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:22.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "c:/myfolder/allproject/project/file1.ts"
      }
    }
Before request
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

Info 2    [00:00:23.000] Search path: c:/myfolder/allproject/project
Info 3    [00:00:24.000] For info: c:/myfolder/allproject/project/file1.ts :: Config file name: c:/myfolder/allproject/project/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project c:/myfolder/allproject/project/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/tsconfig.json 2000 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: c:/myfolder/allproject/project/tsconfig.json : {
 "rootNames": [
  "c:/myfolder/allproject/project/file1.ts",
  "c:/myfolder/allproject/project/file2.ts"
 ],
 "options": {
  "configFilePath": "c:/myfolder/allproject/project/tsconfig.json"
 }
}
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project 1 undefined Config: c:/myfolder/allproject/project/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project 1 undefined Config: c:/myfolder/allproject/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] FileWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/file2.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:31.000] Starting updateGraphWorker: Project: c:/myfolder/allproject/project/tsconfig.json
Info 11   [00:00:32.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info 13   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info 14   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info 15   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info 16   [00:00:37.000] Finishing updateGraphWorker: Project: c:/myfolder/allproject/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:38.000] Project 'c:/myfolder/allproject/project/tsconfig.json' (Configured)
Info 18   [00:00:39.000] 	Files (3)
	c:/a/lib/lib.d.ts
	c:/myfolder/allproject/project/file1.ts
	c:/myfolder/allproject/project/file2.ts


	../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:40.000] -----------------------------------------------
Info 20   [00:00:41.000] Project 'c:/myfolder/allproject/project/tsconfig.json' (Configured)
Info 20   [00:00:42.000] 	Files (3)

Info 20   [00:00:43.000] -----------------------------------------------
Info 20   [00:00:44.000] Open files: 
Info 20   [00:00:45.000] 	FileName: c:/myfolder/allproject/project/file1.ts ProjectRootPath: undefined
Info 20   [00:00:46.000] 		Projects: c:/myfolder/allproject/project/tsconfig.json
After request

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

Info 20   [00:00:47.000] response:
    {
      "responseRequired": false
    }