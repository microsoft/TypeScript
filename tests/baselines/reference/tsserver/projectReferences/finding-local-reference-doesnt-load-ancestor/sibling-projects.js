Info 0    [00:00:34.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:35.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/solution/compiler/program.ts"
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
{"files":[],"include":[],"references":[{"path":"./compiler"},{"path":"./services"}]}

//// [/user/username/projects/solution/compiler/tsconfig.json]
{"compilerOptions":{"composite":true,"module":"none"},"files":["./types.ts","./program.ts"]}

//// [/user/username/projects/solution/compiler/types.ts]

                namespace ts {
                    export interface Program {
                        getSourceFiles(): string[];
                    }
                }

//// [/user/username/projects/solution/compiler/program.ts]

                namespace ts {
                    export const program: Program = {
                        getSourceFiles: () => [getSourceFile()]
                    };
                    function getSourceFile() { return "something"; }
                }

//// [/user/username/projects/solution/services/tsconfig.json]
{"compilerOptions":{"composite":true},"files":["./services.ts"],"references":[{"path":"../compiler"}]}

//// [/user/username/projects/solution/services/services.ts]

                namespace ts {
                    const result = program.getSourceFiles();
                }


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:36.000] Search path: /user/username/projects/solution/compiler
Info 3    [00:00:37.000] For info: /user/username/projects/solution/compiler/program.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
Info 4    [00:00:38.000] Creating configuration project /user/username/projects/solution/compiler/tsconfig.json
Info 5    [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/tsconfig.json 2000 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Config file
Info 6    [00:00:40.000] Config: /user/username/projects/solution/compiler/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/compiler/types.ts",
  "/user/username/projects/solution/compiler/program.ts"
 ],
 "options": {
  "composite": true,
  "module": 0,
  "configFilePath": "/user/username/projects/solution/compiler/tsconfig.json"
 }
}
Info 7    [00:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/types.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:42.000] Starting updateGraphWorker: Project: /user/username/projects/solution/compiler/tsconfig.json
Info 9    [00:00:43.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Info 11   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Info 12   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Info 13   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Info 14   [00:00:48.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/compiler/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:49.000] Project '/user/username/projects/solution/compiler/tsconfig.json' (Configured)
Info 16   [00:00:50.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/solution/compiler/types.ts
	/user/username/projects/solution/compiler/program.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	types.ts
	  Part of 'files' list in tsconfig.json
	program.ts
	  Part of 'files' list in tsconfig.json

Info 17   [00:00:51.000] -----------------------------------------------
Info 18   [00:00:52.000] Search path: /user/username/projects/solution/compiler
Info 19   [00:00:53.000] For info: /user/username/projects/solution/compiler/tsconfig.json :: Config file name: /user/username/projects/solution/tsconfig.json
Info 20   [00:00:54.000] Creating configuration project /user/username/projects/solution/tsconfig.json
Info 21   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 22   [00:00:56.000] Search path: /user/username/projects/solution
Info 23   [00:00:57.000] For info: /user/username/projects/solution/tsconfig.json :: No config files found.
Info 24   [00:00:58.000] Project '/user/username/projects/solution/compiler/tsconfig.json' (Configured)
Info 24   [00:00:59.000] 	Files (3)

Info 24   [00:01:00.000] -----------------------------------------------
Info 24   [00:01:01.000] Project '/user/username/projects/solution/tsconfig.json' (Configured)
Info 24   [00:01:02.000] 	Files (0) InitialLoadPending

Info 24   [00:01:03.000] -----------------------------------------------
Info 24   [00:01:04.000] Open files: 
Info 24   [00:01:05.000] 	FileName: /user/username/projects/solution/compiler/program.ts ProjectRootPath: undefined
Info 24   [00:01:06.000] 		Projects: /user/username/projects/solution/compiler/tsconfig.json
After request

PolledWatches::
/user/username/projects/solution/compiler/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/compiler/tsconfig.json:
  {}
/user/username/projects/solution/compiler/types.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::

Info 24   [00:01:07.000] response:
    {
      "responseRequired": false
    }
Info 25   [00:01:08.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/solution/compiler/program.ts",
        "line": 4,
        "offset": 48
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/solution/compiler/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/compiler/tsconfig.json:
  {}
/user/username/projects/solution/compiler/types.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::

Info 26   [00:01:09.000] Finding references to /user/username/projects/solution/compiler/program.ts position 133 in project /user/username/projects/solution/compiler/tsconfig.json
After request

PolledWatches::
/user/username/projects/solution/compiler/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/compiler/tsconfig.json:
  {}
/user/username/projects/solution/compiler/types.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::

Info 27   [00:01:10.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/solution/compiler/program.ts",
            "start": {
              "line": 4,
              "offset": 48
            },
            "end": {
              "line": 4,
              "offset": 61
            },
            "lineText": "                        getSourceFiles: () => [getSourceFile()]",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/solution/compiler/program.ts",
            "start": {
              "line": 6,
              "offset": 30
            },
            "end": {
              "line": 6,
              "offset": 43
            },
            "contextStart": {
              "line": 6,
              "offset": 21
            },
            "contextEnd": {
              "line": 6,
              "offset": 69
            },
            "lineText": "                    function getSourceFile() { return \"something\"; }",
            "isWriteAccess": true
          }
        ],
        "symbolName": "getSourceFile",
        "symbolStartOffset": 48,
        "symbolDisplayString": "function getSourceFile(): string"
      },
      "responseRequired": true
    }
Info 28   [00:01:11.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/solution/compiler/program.ts",
        "line": 4,
        "offset": 25
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/solution/compiler/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/solution/compiler/tsconfig.json:
  {}
/user/username/projects/solution/compiler/types.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::

Info 29   [00:01:12.000] Finding references to /user/username/projects/solution/compiler/program.ts position 110 in project /user/username/projects/solution/compiler/tsconfig.json
Info 30   [00:01:13.000] Loading configured project /user/username/projects/solution/tsconfig.json
Info 31   [00:01:14.000] Config: /user/username/projects/solution/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/solution/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/compiler",
   "originalPath": "./compiler"
  },
  {
   "path": "/user/username/projects/solution/services",
   "originalPath": "./services"
  }
 ]
}
Info 32   [00:01:15.000] Starting updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json
Info 33   [00:01:16.000] Config: /user/username/projects/solution/services/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/services/services.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/services/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/compiler",
   "originalPath": "../compiler"
  }
 ]
}
Info 34   [00:01:17.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 35   [00:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info 36   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info 37   [00:01:20.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 38   [00:01:21.000] Different program with same set of files
Info 39   [00:01:22.000] Creating configuration project /user/username/projects/solution/services/tsconfig.json
Info 40   [00:01:23.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/services.ts 500 undefined WatchType: Closed Script info
Info 41   [00:01:24.000] Starting updateGraphWorker: Project: /user/username/projects/solution/services/tsconfig.json
Info 42   [00:01:25.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Info 43   [00:01:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Info 44   [00:01:27.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Info 45   [00:01:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Info 46   [00:01:29.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/services/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 47   [00:01:30.000] Project '/user/username/projects/solution/services/tsconfig.json' (Configured)
Info 48   [00:01:31.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/solution/compiler/types.ts
	/user/username/projects/solution/compiler/program.ts
	/user/username/projects/solution/services/services.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../compiler/types.ts
	  Source from referenced project '../compiler/tsconfig.json' included because '--module' is specified as 'none'
	../compiler/program.ts
	  Source from referenced project '../compiler/tsconfig.json' included because '--module' is specified as 'none'
	services.ts
	  Part of 'files' list in tsconfig.json

Info 49   [00:01:32.000] -----------------------------------------------
Info 50   [00:01:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/types.d.ts 2000 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Missing generated file
Info 51   [00:01:34.000] Finding references to /user/username/projects/solution/compiler/types.ts position 103 in project /user/username/projects/solution/services/tsconfig.json
Info 52   [00:01:35.000] Search path: /user/username/projects/solution/compiler
Info 53   [00:01:36.000] For info: /user/username/projects/solution/compiler/types.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
Info 54   [00:01:37.000] Search path: /user/username/projects/solution/compiler
Info 55   [00:01:38.000] For info: /user/username/projects/solution/compiler/types.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
Info 56   [00:01:39.000] Search path: /user/username/projects/solution/compiler
Info 57   [00:01:40.000] For info: /user/username/projects/solution/compiler/program.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
After request

PolledWatches::
/user/username/projects/solution/compiler/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/services/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/compiler/types.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/solution/compiler/tsconfig.json:
  {}
/user/username/projects/solution/compiler/types.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution/tsconfig.json:
  {}
/user/username/projects/solution/services/tsconfig.json:
  {}
/user/username/projects/solution/services/services.ts:
  {}

FsWatchesRecursive::

Info 58   [00:01:41.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/solution/compiler/types.ts",
            "start": {
              "line": 4,
              "offset": 25
            },
            "end": {
              "line": 4,
              "offset": 39
            },
            "contextStart": {
              "line": 4,
              "offset": 25
            },
            "contextEnd": {
              "line": 4,
              "offset": 52
            },
            "lineText": "                        getSourceFiles(): string[];",
            "isWriteAccess": false,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/solution/compiler/program.ts",
            "start": {
              "line": 4,
              "offset": 25
            },
            "end": {
              "line": 4,
              "offset": 39
            },
            "contextStart": {
              "line": 4,
              "offset": 25
            },
            "contextEnd": {
              "line": 4,
              "offset": 64
            },
            "lineText": "                        getSourceFiles: () => [getSourceFile()]",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/user/username/projects/solution/services/services.ts",
            "start": {
              "line": 3,
              "offset": 44
            },
            "end": {
              "line": 3,
              "offset": 58
            },
            "lineText": "                    const result = program.getSourceFiles();",
            "isWriteAccess": false,
            "isDefinition": false
          }
        ],
        "symbolName": "getSourceFiles",
        "symbolStartOffset": 25,
        "symbolDisplayString": "(method) ts.Program.getSourceFiles(): string[]"
      },
      "responseRequired": true
    }