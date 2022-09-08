Info 0    [00:00:44.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:45.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/solution/b/index.ts"
      }
    }
Before request
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

Info 2    [00:00:46.000] Search path: /user/username/projects/solution/b
Info 3    [00:00:47.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 4    [00:00:48.000] Creating configuration project /user/username/projects/solution/b/tsconfig.json
Info 5    [00:00:49.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/tsconfig.json 2000 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Config file
Info 6    [00:00:50.000] Config: /user/username/projects/solution/b/tsconfig.json : {
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
Info 7    [00:00:51.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [00:00:52.000] Starting updateGraphWorker: Project: /user/username/projects/solution/b/tsconfig.json
Info 9    [00:00:53.000] Config: /user/username/projects/solution/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/a/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 0,
  "configFilePath": "/user/username/projects/solution/a/tsconfig.json"
 }
}
Info 10   [00:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/tsconfig.json 2000 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Config file
Info 11   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/index.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:01:00.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 17   [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info 18   [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info 19   [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info 20   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info 21   [00:01:05.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:01:06.000] Project '/user/username/projects/solution/b/tsconfig.json' (Configured)
Info 23   [00:01:07.000] 	Files (3)
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

Info 24   [00:01:08.000] -----------------------------------------------
Info 25   [00:01:09.000] Search path: /user/username/projects/solution/b
Info 26   [00:01:10.000] For info: /user/username/projects/solution/b/tsconfig.json :: Config file name: /user/username/projects/solution/tsconfig.json
Info 27   [00:01:11.000] Creating configuration project /user/username/projects/solution/tsconfig.json
Info 28   [00:01:12.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 29   [00:01:13.000] Search path: /user/username/projects/solution
Info 30   [00:01:14.000] For info: /user/username/projects/solution/tsconfig.json :: No config files found.
Info 31   [00:01:15.000] Project '/user/username/projects/solution/b/tsconfig.json' (Configured)
Info 31   [00:01:16.000] 	Files (3)

Info 31   [00:01:17.000] -----------------------------------------------
Info 31   [00:01:18.000] Project '/user/username/projects/solution/tsconfig.json' (Configured)
Info 31   [00:01:19.000] 	Files (0) InitialLoadPending

Info 31   [00:01:20.000] -----------------------------------------------
Info 31   [00:01:21.000] Open files: 
Info 31   [00:01:22.000] 	FileName: /user/username/projects/solution/b/index.ts ProjectRootPath: undefined
Info 31   [00:01:23.000] 		Projects: /user/username/projects/solution/b/tsconfig.json
After request

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

Info 31   [00:01:24.000] response:
    {
      "responseRequired": false
    }
Info 32   [00:01:25.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/solution/b/index.ts",
        "line": 4,
        "offset": 43
      },
      "seq": 1,
      "type": "request"
    }
Before request

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

Info 33   [00:01:26.000] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/b/tsconfig.json
Info 34   [00:01:27.000] Search path: /user/username/projects/solution/a
Info 35   [00:01:28.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 36   [00:01:29.000] Creating configuration project /user/username/projects/solution/a/tsconfig.json
Info 37   [00:01:30.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 38   [00:01:31.000] Starting updateGraphWorker: Project: /user/username/projects/solution/a/tsconfig.json
Info 39   [00:01:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info 40   [00:01:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info 41   [00:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info 42   [00:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info 43   [00:01:36.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [00:01:37.000] Project '/user/username/projects/solution/a/tsconfig.json' (Configured)
Info 45   [00:01:38.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/solution/a/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 46   [00:01:39.000] -----------------------------------------------
Info 47   [00:01:40.000] Search path: /user/username/projects/solution/a
Info 48   [00:01:41.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 49   [00:01:42.000] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/a/tsconfig.json
Info 50   [00:01:43.000] Loading configured project /user/username/projects/solution/tsconfig.json
Info 51   [00:01:44.000] Config: /user/username/projects/solution/tsconfig.json : {
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
Info 52   [00:01:45.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 53   [00:01:46.000] Starting updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json
Info 54   [00:01:47.000] Config: /user/username/projects/solution/c/tsconfig.json : {
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
Info 55   [00:01:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 56   [00:01:49.000] Config: /user/username/projects/solution/d/tsconfig.json : {
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
Info 57   [00:01:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 58   [00:01:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info 59   [00:01:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info 60   [00:01:53.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 61   [00:01:54.000] Different program with same set of files
Info 62   [00:01:55.000] Creating configuration project /user/username/projects/solution/c/tsconfig.json
Info 63   [00:01:56.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 64   [00:01:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/index.ts 500 undefined WatchType: Closed Script info
Info 65   [00:01:58.000] Starting updateGraphWorker: Project: /user/username/projects/solution/c/tsconfig.json
Info 66   [00:01:59.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 67   [00:02:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 68   [00:02:01.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 69   [00:02:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 70   [00:02:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 71   [00:02:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info 72   [00:02:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info 73   [00:02:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info 74   [00:02:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info 75   [00:02:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info 76   [00:02:09.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 77   [00:02:10.000] Project '/user/username/projects/solution/c/tsconfig.json' (Configured)
Info 78   [00:02:11.000] 	Files (4)
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

Info 79   [00:02:12.000] -----------------------------------------------
Info 80   [00:02:13.000] Creating configuration project /user/username/projects/solution/d/tsconfig.json
Info 81   [00:02:14.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 82   [00:02:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/index.ts 500 undefined WatchType: Closed Script info
Info 83   [00:02:16.000] Starting updateGraphWorker: Project: /user/username/projects/solution/d/tsconfig.json
Info 84   [00:02:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 85   [00:02:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 86   [00:02:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 87   [00:02:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 88   [00:02:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 89   [00:02:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 90   [00:02:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 91   [00:02:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info 92   [00:02:25.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info 93   [00:02:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info 94   [00:02:27.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info 95   [00:02:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info 96   [00:02:29.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/d/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 97   [00:02:30.000] Project '/user/username/projects/solution/d/tsconfig.json' (Configured)
Info 98   [00:02:31.000] 	Files (5)
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

Info 99   [00:02:32.000] -----------------------------------------------
Info 100  [00:02:33.000] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/c/tsconfig.json
Info 101  [00:02:34.000] Search path: /user/username/projects/solution/a
Info 102  [00:02:35.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 103  [00:02:36.000] Search path: /user/username/projects/solution/a
Info 104  [00:02:37.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 105  [00:02:38.000] Search path: /user/username/projects/solution/b
Info 106  [00:02:39.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 107  [00:02:40.000] Search path: /user/username/projects/solution/b
Info 108  [00:02:41.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 109  [00:02:42.000] Search path: /user/username/projects/solution/b
Info 110  [00:02:43.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 111  [00:02:44.000] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/d/tsconfig.json
Info 112  [00:02:45.000] Search path: /user/username/projects/solution/a
Info 113  [00:02:46.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 114  [00:02:47.000] Search path: /user/username/projects/solution/a
Info 115  [00:02:48.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 116  [00:02:49.000] Search path: /user/username/projects/solution/b
Info 117  [00:02:50.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 118  [00:02:51.000] Search path: /user/username/projects/solution/b
Info 119  [00:02:52.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 120  [00:02:53.000] Search path: /user/username/projects/solution/b
Info 121  [00:02:54.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 122  [00:02:55.000] Search path: /user/username/projects/solution/c
Info 123  [00:02:56.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 124  [00:02:57.000] Search path: /user/username/projects/solution/c
Info 125  [00:02:58.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 126  [00:02:59.000] Search path: /user/username/projects/solution/c
Info 127  [00:03:00.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
After request

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

Info 128  [00:03:01.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/solution/b/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/b/index.ts",
            "start": {
              "line": 4,
              "offset": 43
            },
            "end": {
              "line": 4,
              "offset": 44
            },
            "lineText": "                export class B implements I {",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/solution/a/index.ts",
            "start": {
              "line": 2,
              "offset": 34
            },
            "end": {
              "line": 2,
              "offset": 35
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 4,
              "offset": 18
            },
            "lineText": "                export interface I {",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/c/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/c/index.ts",
            "start": {
              "line": 5,
              "offset": 33
            },
            "end": {
              "line": 5,
              "offset": 34
            },
            "lineText": "                export const C: I = new B();",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/solution/d/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/d/index.ts",
            "start": {
              "line": 5,
              "offset": 33
            },
            "end": {
              "line": 5,
              "offset": 34
            },
            "lineText": "                export const D: I = C;",
            "isWriteAccess": false
          }
        ],
        "symbolName": "I",
        "symbolStartOffset": 43,
        "symbolDisplayString": "(alias) interface I\nimport I"
      },
      "responseRequired": true
    }
Info 129  [00:03:02.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/solution/b/index.ts",
        "line": 4,
        "offset": 43
      },
      "seq": 2,
      "type": "request"
    }
Before request

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

Info 130  [00:03:03.000] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/b/tsconfig.json
Info 131  [00:03:04.000] Search path: /user/username/projects/solution/a
Info 132  [00:03:05.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 133  [00:03:06.000] Search path: /user/username/projects/solution/a
Info 134  [00:03:07.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 135  [00:03:08.000] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/c/tsconfig.json
Info 136  [00:03:09.000] Search path: /user/username/projects/solution/b
Info 137  [00:03:10.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 138  [00:03:11.000] Search path: /user/username/projects/solution/b
Info 139  [00:03:12.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 140  [00:03:13.000] Search path: /user/username/projects/solution/b
Info 141  [00:03:14.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 142  [00:03:15.000] Search path: /user/username/projects/solution/a
Info 143  [00:03:16.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 144  [00:03:17.000] Search path: /user/username/projects/solution/a
Info 145  [00:03:18.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 146  [00:03:19.000] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/d/tsconfig.json
Info 147  [00:03:20.000] Search path: /user/username/projects/solution/b
Info 148  [00:03:21.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 149  [00:03:22.000] Search path: /user/username/projects/solution/b
Info 150  [00:03:23.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 151  [00:03:24.000] Search path: /user/username/projects/solution/b
Info 152  [00:03:25.000] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info 153  [00:03:26.000] Search path: /user/username/projects/solution/a
Info 154  [00:03:27.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 155  [00:03:28.000] Search path: /user/username/projects/solution/a
Info 156  [00:03:29.000] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info 157  [00:03:30.000] Search path: /user/username/projects/solution/c
Info 158  [00:03:31.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 159  [00:03:32.000] Search path: /user/username/projects/solution/c
Info 160  [00:03:33.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 161  [00:03:34.000] Search path: /user/username/projects/solution/c
Info 162  [00:03:35.000] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info 163  [00:03:36.000] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/a/tsconfig.json
After request

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

Info 164  [00:03:37.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/solution/b/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/b/index.ts",
            "start": {
              "line": 4,
              "offset": 43
            },
            "end": {
              "line": 4,
              "offset": 44
            },
            "lineText": "                export class B implements I {",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/solution/a/index.ts",
            "start": {
              "line": 2,
              "offset": 34
            },
            "end": {
              "line": 2,
              "offset": 35
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 4,
              "offset": 18
            },
            "lineText": "                export interface I {",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/c/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/c/index.ts",
            "start": {
              "line": 5,
              "offset": 33
            },
            "end": {
              "line": 5,
              "offset": 34
            },
            "lineText": "                export const C: I = new B();",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/solution/d/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/d/index.ts",
            "start": {
              "line": 5,
              "offset": 33
            },
            "end": {
              "line": 5,
              "offset": 34
            },
            "lineText": "                export const D: I = C;",
            "isWriteAccess": false
          }
        ],
        "symbolName": "I",
        "symbolStartOffset": 43,
        "symbolDisplayString": "(alias) interface I\nimport I"
      },
      "responseRequired": true
    }