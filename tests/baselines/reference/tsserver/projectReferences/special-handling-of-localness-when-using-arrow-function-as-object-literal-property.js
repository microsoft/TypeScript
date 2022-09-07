Info 0    [16:00:44.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:45.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/solution/api/src/server.ts"
      }
    }
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
{"files":[],"references":[{"path":"./api"},{"path":"./app"}]}

//// [/user/username/projects/solution/api/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"dist","rootDir":"src"},"include":["src"],"references":[{"path":"../shared"}]}

//// [/user/username/projects/solution/api/src/server.ts]
import * as shared from "../../shared/dist";
shared.foo.bar();

//// [/user/username/projects/solution/app/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"dist","rootDir":"src"},"include":["src"],"references":[{"path":"../shared"}]}

//// [/user/username/projects/solution/app/src/app.ts]
import * as shared from "../../shared/dist";
shared.foo.bar();

//// [/user/username/projects/solution/shared/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"dist","rootDir":"src"},"include":["src"]}

//// [/user/username/projects/solution/shared/src/index.ts]
const local = { bar: () => { } };
export const foo = local;


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:46.000] Search path: /user/username/projects/solution/api/src
Info 3    [16:00:47.000] For info: /user/username/projects/solution/api/src/server.ts :: Config file name: /user/username/projects/solution/api/tsconfig.json
Info 4    [16:00:48.000] Creating configuration project /user/username/projects/solution/api/tsconfig.json
Info 5    [16:00:49.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/tsconfig.json 2000 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Config file
Info 6    [16:00:50.000] Config: /user/username/projects/solution/api/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/api/src/server.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/solution/api/dist",
  "rootDir": "/user/username/projects/solution/api/src",
  "configFilePath": "/user/username/projects/solution/api/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/shared",
   "originalPath": "../shared"
  }
 ]
}
Info 7    [16:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/src 1 undefined Config: /user/username/projects/solution/api/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/src 1 undefined Config: /user/username/projects/solution/api/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:53.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:54.000] Starting updateGraphWorker: Project: /user/username/projects/solution/api/tsconfig.json
Info 11   [16:00:55.000] Config: /user/username/projects/solution/shared/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/shared/src/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/solution/shared/dist",
  "rootDir": "/user/username/projects/solution/shared/src",
  "configFilePath": "/user/username/projects/solution/shared/tsconfig.json"
 }
}
Info 12   [16:00:56.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/tsconfig.json 2000 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Config file
Info 13   [16:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/src 1 undefined Config: /user/username/projects/solution/shared/tsconfig.json WatchType: Wild card directory
Info 14   [16:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/src 1 undefined Config: /user/username/projects/solution/shared/tsconfig.json WatchType: Wild card directory
Info 15   [16:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [16:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [16:01:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/src/index.ts 500 undefined WatchType: Closed Script info
Info 18   [16:01:02.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 19   [16:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/node_modules/@types 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Type roots
Info 20   [16:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/node_modules/@types 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Type roots
Info 21   [16:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Type roots
Info 22   [16:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Type roots
Info 23   [16:01:07.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/api/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [16:01:08.000] Project '/user/username/projects/solution/api/tsconfig.json' (Configured)
Info 25   [16:01:09.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/solution/shared/src/index.ts
	/user/username/projects/solution/api/src/server.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../shared/src/index.ts
	  Imported via "../../shared/dist" from file 'src/server.ts'
	src/server.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 26   [16:01:10.000] -----------------------------------------------
Info 27   [16:01:11.000] Search path: /user/username/projects/solution/api
Info 28   [16:01:12.000] For info: /user/username/projects/solution/api/tsconfig.json :: Config file name: /user/username/projects/solution/tsconfig.json
Info 29   [16:01:13.000] Creating configuration project /user/username/projects/solution/tsconfig.json
Info 30   [16:01:14.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 31   [16:01:15.000] Search path: /user/username/projects/solution
Info 32   [16:01:16.000] For info: /user/username/projects/solution/tsconfig.json :: No config files found.
Info 33   [16:01:17.000] Project '/user/username/projects/solution/api/tsconfig.json' (Configured)
Info 33   [16:01:18.000] 	Files (3)

Info 33   [16:01:19.000] -----------------------------------------------
Info 33   [16:01:20.000] Project '/user/username/projects/solution/tsconfig.json' (Configured)
Info 33   [16:01:21.000] 	Files (0) InitialLoadPending

Info 33   [16:01:22.000] -----------------------------------------------
Info 33   [16:01:23.000] Open files: 
Info 33   [16:01:24.000] 	FileName: /user/username/projects/solution/api/src/server.ts ProjectRootPath: undefined
Info 33   [16:01:25.000] 		Projects: /user/username/projects/solution/api/tsconfig.json

PolledWatches::
/user/username/projects/solution/api/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/api/tsconfig.json:
  {}
/user/username/projects/solution/shared/tsconfig.json:
  {}
/user/username/projects/solution/shared/src/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/solution/api/src:
  {}
/user/username/projects/solution/shared/src:
  {}
/user/username/projects/solution/shared:
  {}

Info 33   [16:01:26.000] response:
    {
      "responseRequired": false
    }
Info 34   [16:01:27.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/solution/api/src/server.ts",
        "line": 2,
        "offset": 12
      },
      "seq": 1,
      "type": "request"
    }

PolledWatches::
/user/username/projects/solution/api/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/api/tsconfig.json:
  {}
/user/username/projects/solution/shared/tsconfig.json:
  {}
/user/username/projects/solution/shared/src/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/solution/api/src:
  {}
/user/username/projects/solution/shared/src:
  {}
/user/username/projects/solution/shared:
  {}

Info 35   [16:01:28.000] Finding references to /user/username/projects/solution/api/src/server.ts position 56 in project /user/username/projects/solution/api/tsconfig.json
Info 36   [16:01:29.000] Search path: /user/username/projects/solution/shared/src
Info 37   [16:01:30.000] For info: /user/username/projects/solution/shared/src/index.ts :: Config file name: /user/username/projects/solution/shared/tsconfig.json
Info 38   [16:01:31.000] Creating configuration project /user/username/projects/solution/shared/tsconfig.json
Info 39   [16:01:32.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 40   [16:01:33.000] Starting updateGraphWorker: Project: /user/username/projects/solution/shared/tsconfig.json
Info 41   [16:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/node_modules/@types 1 undefined Project: /user/username/projects/solution/shared/tsconfig.json WatchType: Type roots
Info 42   [16:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/node_modules/@types 1 undefined Project: /user/username/projects/solution/shared/tsconfig.json WatchType: Type roots
Info 43   [16:01:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/shared/tsconfig.json WatchType: Type roots
Info 44   [16:01:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/shared/tsconfig.json WatchType: Type roots
Info 45   [16:01:38.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/shared/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 46   [16:01:39.000] Project '/user/username/projects/solution/shared/tsconfig.json' (Configured)
Info 47   [16:01:40.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/solution/shared/src/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 48   [16:01:41.000] -----------------------------------------------
Info 49   [16:01:42.000] Search path: /user/username/projects/solution/shared/src
Info 50   [16:01:43.000] For info: /user/username/projects/solution/shared/src/index.ts :: Config file name: /user/username/projects/solution/shared/tsconfig.json
Info 51   [16:01:44.000] Finding references to /user/username/projects/solution/shared/src/index.ts position 16 in project /user/username/projects/solution/shared/tsconfig.json

PolledWatches::
/user/username/projects/solution/api/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/shared/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/api/tsconfig.json:
  {}
/user/username/projects/solution/shared/tsconfig.json:
  {}
/user/username/projects/solution/shared/src/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/solution/api/src:
  {}
/user/username/projects/solution/shared/src:
  {}
/user/username/projects/solution/shared:
  {}

Info 52   [16:01:45.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/solution/shared/src/index.ts",
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 20
            },
            "contextStart": {
              "line": 1,
              "offset": 17
            },
            "contextEnd": {
              "line": 1,
              "offset": 31
            },
            "lineText": "const local = { bar: () => { } };",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/api/src/server.ts",
            "start": {
              "line": 2,
              "offset": 12
            },
            "end": {
              "line": 2,
              "offset": 15
            },
            "lineText": "shared.foo.bar();",
            "isWriteAccess": false
          }
        ],
        "symbolName": "bar",
        "symbolStartOffset": 12,
        "symbolDisplayString": "(property) bar: () => void"
      },
      "responseRequired": true
    }