TI:: Creating typing installer
//// [/a/lib/lib.d.ts]
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

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/tsconfig.json]
{"watchOptions":{"watchDirectory":"UseFsEvents"}}

//// [/a/b/commonFile1.ts]
let x = 1


TI:: [00:00:17.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:18.000] Processing cache location '/a/data/'
TI:: [00:00:19.000] Trying to find '/a/data/package.json'...
TI:: [00:00:20.000] Finished processing cache location '/a/data/'
TI:: [00:00:21.000] Npm config file: /a/data/package.json
TI:: [00:00:22.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:27.000] Updating types-registry npm package...
TI:: [00:00:28.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:35.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:36.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:37.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/commonFile1.ts",
        "projectRootPath": "/a/b"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:38.000] Search path: /a/b
Info 3    [00:00:39.000] For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:40.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:42.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 },
 "watchOptions": {
  "watchDirectory": 0
 }
}
Info 7    [00:00:43.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 8    [00:00:44.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 {"watchDirectory":0} Project: /a/b/tsconfig.json WatchType: Config file
Info 9    [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"watchDirectory":0} Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"watchDirectory":0} Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 11   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:48.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 13   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"watchDirectory":0} Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"watchDirectory":0} Project: /a/b/tsconfig.json WatchType: Type roots
Info 16   [00:00:52.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:53.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:54.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/commonFile1.ts
	/a/b/commonFile2.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:55.000] -----------------------------------------------
Info 20   [00:00:56.000] Project '/a/b/tsconfig.json' (Configured)
Info 20   [00:00:57.000] 	Files (3)

Info 20   [00:00:58.000] -----------------------------------------------
Info 20   [00:00:59.000] Open files: 
Info 20   [00:01:00.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: /a/b
Info 20   [00:01:01.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b: *new*
  {}
/a/b/commonfile2.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Info 20   [00:01:02.000] response:
    {
      "responseRequired": false
    }