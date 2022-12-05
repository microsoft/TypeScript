Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"composite":true,"resolveJsonModule":true}}

//// [/user/username/projects/myproject/index.ts]
import * as tsconfig from "./tsconfig.json";

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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:23.000] Search path: /user/username/projects/myproject
Info 3    [00:00:24.000] For info: /user/username/projects/myproject/index.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/index.ts"
 ],
 "options": {
  "composite": true,
  "resolveJsonModule": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 10   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 500 undefined WatchType: Closed Script info
Info 15   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 17   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 18   [00:00:39.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:00:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 20   [00:00:41.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/tsconfig.json
	/user/username/projects/myproject/index.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	tsconfig.json
	  Imported via "./tsconfig.json" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 21   [00:00:42.000] -----------------------------------------------
Info 22   [00:00:43.000] Search path: /user/username/projects/myproject
Info 23   [00:00:44.000] For info: /user/username/projects/myproject/tsconfig.json :: No config files found.
Info 24   [00:00:45.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 24   [00:00:46.000] 	Files (3)

Info 24   [00:00:47.000] -----------------------------------------------
Info 24   [00:00:48.000] Open files: 
Info 24   [00:00:49.000] 	FileName: /user/username/projects/myproject/index.ts ProjectRootPath: undefined
Info 24   [00:00:50.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 24   [00:00:51.000] response:
    {
      "responseRequired": false
    }