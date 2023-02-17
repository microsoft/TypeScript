TI:: [00:00:17.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:18.000] Processing cache location '/a/data/'
TI:: [00:00:19.000] Trying to find '/a/data/package.json'...
TI:: [00:00:20.000] Finished processing cache location '/a/data/'
Info 0    [00:00:21.000] Provided types map file "c:/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/project/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [c:/project/tsconfig.json]
{}

//// [c:/project/file1.ts]
let x = 10;

//// [c:/project/file2.ts]
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


Info 2    [00:00:23.000] Search path: c:/project
Info 3    [00:00:24.000] For info: c:/project/file1.ts :: Config file name: c:/project/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project c:/project/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: c:/project/tsconfig.json 2000 undefined Project: c:/project/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: c:/project/tsconfig.json : {
 "rootNames": [
  "c:/project/file1.ts",
  "c:/project/file2.ts"
 ],
 "options": {
  "configFilePath": "c:/project/tsconfig.json"
 }
}
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: c:/project 1 undefined Config: c:/project/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/project 1 undefined Config: c:/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] FileWatcher:: Added:: WatchInfo: c:/project/file2.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:31.000] Starting updateGraphWorker: Project: c:/project/tsconfig.json
Info 11   [00:00:32.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: c:/project/node_modules/@types 1 undefined Project: c:/project/tsconfig.json WatchType: Type roots
Info 13   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/project/node_modules/@types 1 undefined Project: c:/project/tsconfig.json WatchType: Type roots
Info 14   [00:00:35.000] Finishing updateGraphWorker: Project: c:/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:36.000] Project 'c:/project/tsconfig.json' (Configured)
Info 16   [00:00:37.000] 	Files (3)
	c:/a/lib/lib.d.ts
	c:/project/file1.ts
	c:/project/file2.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:38.000] -----------------------------------------------
Info 18   [00:00:39.000] Project 'c:/project/tsconfig.json' (Configured)
Info 18   [00:00:40.000] 	Files (3)

Info 18   [00:00:41.000] -----------------------------------------------
Info 18   [00:00:42.000] Open files: 
Info 18   [00:00:43.000] 	FileName: c:/project/file1.ts ProjectRootPath: undefined
Info 18   [00:00:44.000] 		Projects: c:/project/tsconfig.json
After request

PolledWatches::
c:/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
c:/project/tsconfig.json: *new*
  {}
c:/project/file2.ts: *new*
  {}
c:/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
c:/project: *new*
  {}

Info 18   [00:00:45.000] response:
    {
      "responseRequired": false
    }