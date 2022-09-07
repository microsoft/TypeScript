Info 0    [16:00:44.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:45.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/solution/b/index.ts"}}
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

//// [/user/username/projects/solution/tsconfig.json]
{"files":[],"include":[],"references":[{"path":"./a"},{"path":"./b"},{"path":"./c"},{"path":"./d"}]}

//// [/user/username/projects/solution/a/tsconfig.json]
{"compilerOptions":{"composite":true,"module":"none"},"files":["./index.ts"]}

//// [/user/username/projects/solution/a/index.ts]

                export interface I {
                    M(): void;
                }

//// [/user/username/projects/solution/b/tsconfig.json]
{"compilerOptions":{"composite":true},"files":["./index.ts"],"references":[{"path":"../a"}]}

//// [/user/username/projects/solution/b/index.ts]

                import { I } from "../a";

                export class B implements I {
                    M() {}
                }

//// [/user/username/projects/solution/c/tsconfig.json]
{"compilerOptions":{"composite":true},"files":["./index.ts"],"references":[{"path":"../b"}]}

//// [/user/username/projects/solution/c/index.ts]

                import { I } from "../a";
                import { B } from "../b";

                export const C: I = new B();
                

//// [/user/username/projects/solution/d/tsconfig.json]
{"compilerOptions":{"composite":true},"files":["./index.ts"],"references":[{"path":"../c"}]}

//// [/user/username/projects/solution/d/index.ts]

                import { I } from "../a";
                import { C } from "../c";

                export const D: I = C;
                


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:46.000] Search path: /user/username/projects/solution/b
Info 3    [16:00:47.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 4    [16:00:48.000] Creating configuration project /user/username/projects/solution/b/tsconfig.json
Info 5    [16:00:49.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/tsconfig.json 2000 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Config file
Info 6    [16:00:50.000] Config: /user/username/projects/solution/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/b/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/a",
   "originalPath": "../a"
  }
 ]
}
Info 7    [16:00:51.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [16:00:52.000] Starting updateGraphWorker: Project: /user/username/projects/solution/b/tsconfig.json
Info 9    [16:00:53.000] Config: /user/username/projects/solution/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/a/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 0,
  "configFilePath": "/user/username/projects/solution/a/tsconfig.json"
 }
}
Info 10   [16:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/tsconfig.json 2000 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Config file
Info 11   [16:00:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/index.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [16:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [16:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [16:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [16:01:00.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 17   [16:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info 18   [16:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info 19   [16:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info 20   [16:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info 21   [16:01:05.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [16:01:06.000] Project '/user/username/projects/solution/b/tsconfig.json' (Configured)
Info 23   [16:01:07.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/solution/a/index.ts
	/user/username/projects/solution/b/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../a/index.ts
	  Source from referenced project '../a/tsconfig.json' included because '--module' is specified as 'none'
	  Imported via "../a" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 24   [16:01:08.000] -----------------------------------------------
Info 25   [16:01:09.000] Search path: /user/username/projects/solution/b
Info 26   [16:01:10.000] For info: /user/username/projects/solution/b/tsconfig.json :: Config file name: /user/username/projects/solution/tsconfig.json
Info 27   [16:01:11.000] Creating configuration project /user/username/projects/solution/tsconfig.json
Info 28   [16:01:12.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 29   [16:01:13.000] Search path: /user/username/projects/solution
Info 30   [16:01:14.000] For info: /user/username/projects/solution/tsconfig.json :: No config files found.
Info 31   [16:01:15.000] Project '/user/username/projects/solution/b/tsconfig.json' (Configured)
Info 31   [16:01:16.000] 	Files (3)

Info 31   [16:01:17.000] -----------------------------------------------
Info 31   [16:01:18.000] Project '/user/username/projects/solution/tsconfig.json' (Configured)
Info 31   [16:01:19.000] 	Files (0) InitialLoadPending

Info 31   [16:01:20.000] -----------------------------------------------
Info 31   [16:01:21.000] Open files: 
Info 31   [16:01:22.000] 	FileName: /user/username/projects/solution/b/index.ts ProjectRootPath: undefined
Info 31   [16:01:23.000] 		Projects: /user/username/projects/solution/b/tsconfig.json

PolledWatches::
/user/username/projects/solution/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/b/tsconfig.json:
  {}
/user/username/projects/solution/a/tsconfig.json:
  {}
/user/username/projects/solution/a/index.ts:
  {}
/user/username/projects/solution:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/solution/a:
  {}

Info 31   [16:01:24.000] response:{"responseRequired":false}
Info 32   [16:01:25.000] request:{"command":"references","arguments":{"file":"/user/username/projects/solution/b/index.ts","line":4,"offset":43},"seq":1,"type":"request"}

PolledWatches::
/user/username/projects/solution/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/b/tsconfig.json:
  {}
/user/username/projects/solution/a/tsconfig.json:
  {}
/user/username/projects/solution/a/index.ts:
  {}
/user/username/projects/solution:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/solution/a:
  {}

Info 33   [16:01:26.000] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/b/tsconfig.json
Info 34   [16:01:27.000] Search path: /user/username/projects/solution/a
Info 35   [16:01:28.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 36   [16:01:29.000] Creating configuration project /user/username/projects/solution/a/tsconfig.json
Info 37   [16:01:30.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 38   [16:01:31.000] Starting updateGraphWorker: Project: /user/username/projects/solution/a/tsconfig.json
Info 39   [16:01:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info 40   [16:01:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info 41   [16:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info 42   [16:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info 43   [16:01:36.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [16:01:37.000] Project '/user/username/projects/solution/a/tsconfig.json' (Configured)
Info 45   [16:01:38.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/solution/a/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 46   [16:01:39.000] -----------------------------------------------
Info 47   [16:01:40.000] Search path: /user/username/projects/solution/a
Info 48   [16:01:41.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 49   [16:01:42.000] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/a/tsconfig.json
Info 50   [16:01:43.000] Loading configured project /user/username/projects/solution/tsconfig.json
Info 51   [16:01:44.000] Config: /user/username/projects/solution/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/solution/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/a",
   "originalPath": "./a"
  },
  {
   "path": "/user/username/projects/solution/b",
   "originalPath": "./b"
  },
  {
   "path": "/user/username/projects/solution/c",
   "originalPath": "./c"
  },
  {
   "path": "/user/username/projects/solution/d",
   "originalPath": "./d"
  }
 ]
}
Info 52   [16:01:45.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 53   [16:01:46.000] Starting updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json
Info 54   [16:01:47.000] Config: /user/username/projects/solution/c/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/c/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/c/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/b",
   "originalPath": "../b"
  }
 ]
}
Info 55   [16:01:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 56   [16:01:49.000] Config: /user/username/projects/solution/d/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/d/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/d/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/c",
   "originalPath": "../c"
  }
 ]
}
Info 57   [16:01:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 58   [16:01:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info 59   [16:01:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info 60   [16:01:53.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 61   [16:01:54.000] Different program with same set of files
Info 62   [16:01:55.000] Creating configuration project /user/username/projects/solution/c/tsconfig.json
Info 63   [16:01:56.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 64   [16:01:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/index.ts 500 undefined WatchType: Closed Script info
Info 65   [16:01:58.000] Starting updateGraphWorker: Project: /user/username/projects/solution/c/tsconfig.json
Info 66   [16:01:59.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 67   [16:02:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 68   [16:02:01.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 69   [16:02:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 70   [16:02:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 71   [16:02:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 72   [16:02:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info 73   [16:02:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info 74   [16:02:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info 75   [16:02:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info 76   [16:02:09.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 77   [16:02:10.000] Project '/user/username/projects/solution/c/tsconfig.json' (Configured)
Info 78   [16:02:11.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/solution/a/index.ts
	/user/username/projects/solution/b/index.ts
	/user/username/projects/solution/c/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../a/index.ts
	  Imported via "../a" from file 'index.ts'
	  Imported via "../a" from file '../b/index.ts'
	../b/index.ts
	  Imported via "../b" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 79   [16:02:12.000] -----------------------------------------------
Info 80   [16:02:13.000] Creating configuration project /user/username/projects/solution/d/tsconfig.json
Info 81   [16:02:14.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 82   [16:02:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/index.ts 500 undefined WatchType: Closed Script info
Info 83   [16:02:16.000] Starting updateGraphWorker: Project: /user/username/projects/solution/d/tsconfig.json
Info 84   [16:02:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 85   [16:02:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 86   [16:02:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 87   [16:02:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 88   [16:02:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 89   [16:02:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 90   [16:02:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 91   [16:02:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 92   [16:02:25.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info 93   [16:02:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info 94   [16:02:27.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info 95   [16:02:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info 96   [16:02:29.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/d/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 97   [16:02:30.000] Project '/user/username/projects/solution/d/tsconfig.json' (Configured)
Info 98   [16:02:31.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/solution/a/index.ts
	/user/username/projects/solution/b/index.ts
	/user/username/projects/solution/c/index.ts
	/user/username/projects/solution/d/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../a/index.ts
	  Imported via "../a" from file 'index.ts'
	  Imported via "../a" from file '../c/index.ts'
	  Imported via "../a" from file '../b/index.ts'
	../b/index.ts
	  Imported via "../b" from file '../c/index.ts'
	../c/index.ts
	  Imported via "../c" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 99   [16:02:32.000] -----------------------------------------------
Info 100  [16:02:33.000] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/c/tsconfig.json
Info 101  [16:02:34.000] Search path: /user/username/projects/solution/a
Info 102  [16:02:35.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 103  [16:02:36.000] Search path: /user/username/projects/solution/a
Info 104  [16:02:37.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 105  [16:02:38.000] Search path: /user/username/projects/solution/b
Info 106  [16:02:39.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 107  [16:02:40.000] Search path: /user/username/projects/solution/b
Info 108  [16:02:41.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 109  [16:02:42.000] Search path: /user/username/projects/solution/b
Info 110  [16:02:43.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 111  [16:02:44.000] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/d/tsconfig.json
Info 112  [16:02:45.000] Search path: /user/username/projects/solution/a
Info 113  [16:02:46.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 114  [16:02:47.000] Search path: /user/username/projects/solution/a
Info 115  [16:02:48.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 116  [16:02:49.000] Search path: /user/username/projects/solution/b
Info 117  [16:02:50.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 118  [16:02:51.000] Search path: /user/username/projects/solution/b
Info 119  [16:02:52.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 120  [16:02:53.000] Search path: /user/username/projects/solution/b
Info 121  [16:02:54.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 122  [16:02:55.000] Search path: /user/username/projects/solution/c
Info 123  [16:02:56.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 124  [16:02:57.000] Search path: /user/username/projects/solution/c
Info 125  [16:02:58.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 126  [16:02:59.000] Search path: /user/username/projects/solution/c
Info 127  [16:03:00.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json

PolledWatches::
/user/username/projects/solution/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/d/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/b/tsconfig.json:
  {}
/user/username/projects/solution/a/tsconfig.json:
  {}
/user/username/projects/solution/a/index.ts:
  {}
/user/username/projects/solution:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}
/user/username/projects/solution/c/tsconfig.json:
  {}
/user/username/projects/solution/d/tsconfig.json:
  {}
/user/username/projects/solution/c/index.ts:
  {}
/user/username/projects/solution/d/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/solution/a:
  {}
/user/username/projects/solution/b:
  {}
/user/username/projects/solution/c:
  {}

Info 128  [16:03:01.000] response:{"response":{"refs":[{"file":"/user/username/projects/solution/b/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/b/index.ts","start":{"line":4,"offset":43},"end":{"line":4,"offset":44},"lineText":"                export class B implements I {","isWriteAccess":false},{"file":"/user/username/projects/solution/a/index.ts","start":{"line":2,"offset":34},"end":{"line":2,"offset":35},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":4,"offset":18},"lineText":"                export interface I {","isWriteAccess":true},{"file":"/user/username/projects/solution/c/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/c/index.ts","start":{"line":5,"offset":33},"end":{"line":5,"offset":34},"lineText":"                export const C: I = new B();","isWriteAccess":false},{"file":"/user/username/projects/solution/d/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/d/index.ts","start":{"line":5,"offset":33},"end":{"line":5,"offset":34},"lineText":"                export const D: I = C;","isWriteAccess":false}],"symbolName":"I","symbolStartOffset":43,"symbolDisplayString":"(alias) interface I\nimport I"},"responseRequired":true}
Info 129  [16:03:02.000] request:{"command":"references","arguments":{"file":"/user/username/projects/solution/b/index.ts","line":4,"offset":43},"seq":2,"type":"request"}

PolledWatches::
/user/username/projects/solution/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/d/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/b/tsconfig.json:
  {}
/user/username/projects/solution/a/tsconfig.json:
  {}
/user/username/projects/solution/a/index.ts:
  {}
/user/username/projects/solution:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}
/user/username/projects/solution/c/tsconfig.json:
  {}
/user/username/projects/solution/d/tsconfig.json:
  {}
/user/username/projects/solution/c/index.ts:
  {}
/user/username/projects/solution/d/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/solution/a:
  {}
/user/username/projects/solution/b:
  {}
/user/username/projects/solution/c:
  {}

Info 130  [16:03:03.000] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/b/tsconfig.json
Info 131  [16:03:04.000] Search path: /user/username/projects/solution/a
Info 132  [16:03:05.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 133  [16:03:06.000] Search path: /user/username/projects/solution/a
Info 134  [16:03:07.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 135  [16:03:08.000] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/c/tsconfig.json
Info 136  [16:03:09.000] Search path: /user/username/projects/solution/b
Info 137  [16:03:10.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 138  [16:03:11.000] Search path: /user/username/projects/solution/b
Info 139  [16:03:12.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 140  [16:03:13.000] Search path: /user/username/projects/solution/b
Info 141  [16:03:14.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 142  [16:03:15.000] Search path: /user/username/projects/solution/a
Info 143  [16:03:16.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 144  [16:03:17.000] Search path: /user/username/projects/solution/a
Info 145  [16:03:18.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 146  [16:03:19.000] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/d/tsconfig.json
Info 147  [16:03:20.000] Search path: /user/username/projects/solution/b
Info 148  [16:03:21.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 149  [16:03:22.000] Search path: /user/username/projects/solution/b
Info 150  [16:03:23.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 151  [16:03:24.000] Search path: /user/username/projects/solution/b
Info 152  [16:03:25.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 153  [16:03:26.000] Search path: /user/username/projects/solution/a
Info 154  [16:03:27.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 155  [16:03:28.000] Search path: /user/username/projects/solution/a
Info 156  [16:03:29.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 157  [16:03:30.000] Search path: /user/username/projects/solution/c
Info 158  [16:03:31.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 159  [16:03:32.000] Search path: /user/username/projects/solution/c
Info 160  [16:03:33.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 161  [16:03:34.000] Search path: /user/username/projects/solution/c
Info 162  [16:03:35.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 163  [16:03:36.000] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/a/tsconfig.json

PolledWatches::
/user/username/projects/solution/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/d/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/b/tsconfig.json:
  {}
/user/username/projects/solution/a/tsconfig.json:
  {}
/user/username/projects/solution/a/index.ts:
  {}
/user/username/projects/solution:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}
/user/username/projects/solution/c/tsconfig.json:
  {}
/user/username/projects/solution/d/tsconfig.json:
  {}
/user/username/projects/solution/c/index.ts:
  {}
/user/username/projects/solution/d/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/solution/a:
  {}
/user/username/projects/solution/b:
  {}
/user/username/projects/solution/c:
  {}

Info 164  [16:03:37.000] response:{"response":{"refs":[{"file":"/user/username/projects/solution/b/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/b/index.ts","start":{"line":4,"offset":43},"end":{"line":4,"offset":44},"lineText":"                export class B implements I {","isWriteAccess":false},{"file":"/user/username/projects/solution/a/index.ts","start":{"line":2,"offset":34},"end":{"line":2,"offset":35},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":4,"offset":18},"lineText":"                export interface I {","isWriteAccess":true},{"file":"/user/username/projects/solution/c/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/c/index.ts","start":{"line":5,"offset":33},"end":{"line":5,"offset":34},"lineText":"                export const C: I = new B();","isWriteAccess":false},{"file":"/user/username/projects/solution/d/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/d/index.ts","start":{"line":5,"offset":33},"end":{"line":5,"offset":34},"lineText":"                export const D: I = C;","isWriteAccess":false}],"symbolName":"I","symbolStartOffset":43,"symbolDisplayString":"(alias) interface I\nimport I"},"responseRequired":true}