Info 0    [00:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:36.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/a/a.ts",
        "projectRootPath": "/users/username/projects/a"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/users/username/projects/c/fc.ts]
export const C = 8

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

//// [/users/username/projects/a/a.ts]
import {C} from "./c/fc"; console.log(C)

//// [/users/username/projects/a/tsconfig.json]
{"compilerOptions":{"module":"commonjs"}}

//// [/users/username/projects/a/c] symlink(/users/username/projects/c)
//// [/users/username/projects/b/b.ts]
import {C} from "./c/fc"; console.log(C)

//// [/users/username/projects/b/tsconfig.json]
{"compilerOptions":{"module":"commonjs"}}

//// [/users/username/projects/b/c] symlink(/users/username/projects/c)

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:37.000] Search path: /users/username/projects/a
Info 3    [00:00:38.000] For info: /users/username/projects/a/a.ts :: Config file name: /users/username/projects/a/tsconfig.json
Info 4    [00:00:39.000] Creating configuration project /users/username/projects/a/tsconfig.json
Info 5    [00:00:40.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/a/tsconfig.json 2000 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Config file
Info 6    [00:00:41.000] Config: /users/username/projects/a/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/a/a.ts",
  "/users/username/projects/a/c/fc.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/users/username/projects/a/tsconfig.json"
 }
}
Info 7    [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a 1 undefined Config: /users/username/projects/a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a 1 undefined Config: /users/username/projects/a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:44.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/a/c/fc.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:45.000] Starting updateGraphWorker: Project: /users/username/projects/a/tsconfig.json
Info 11   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Info 13   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Info 14   [00:00:49.000] Finishing updateGraphWorker: Project: /users/username/projects/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:50.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 16   [00:00:51.000] 	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/a/c/fc.ts
	/users/username/projects/a/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	c/fc.ts
	  Imported via "./c/fc" from file 'a.ts'
	  Matched by default include pattern '**/*'
	a.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:52.000] -----------------------------------------------
Info 18   [00:00:53.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 18   [00:00:54.000] 	Files (3)

Info 18   [00:00:55.000] -----------------------------------------------
Info 18   [00:00:56.000] Open files: 
Info 18   [00:00:57.000] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info 18   [00:00:58.000] 		Projects: /users/username/projects/a/tsconfig.json
After request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/a/tsconfig.json:
  {}
/users/username/projects/a/c/fc.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}

Info 18   [00:00:59.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:01:00.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/b/b.ts",
        "projectRootPath": "/users/username/projects/b"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/a/tsconfig.json:
  {}
/users/username/projects/a/c/fc.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}

Info 20   [00:01:01.000] Search path: /users/username/projects/b
Info 21   [00:01:02.000] For info: /users/username/projects/b/b.ts :: Config file name: /users/username/projects/b/tsconfig.json
Info 22   [00:01:03.000] Creating configuration project /users/username/projects/b/tsconfig.json
Info 23   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/b/tsconfig.json 2000 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Config file
Info 24   [00:01:05.000] Config: /users/username/projects/b/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/b/b.ts",
  "/users/username/projects/b/c/fc.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/users/username/projects/b/tsconfig.json"
 }
}
Info 25   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b 1 undefined Config: /users/username/projects/b/tsconfig.json WatchType: Wild card directory
Info 26   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b 1 undefined Config: /users/username/projects/b/tsconfig.json WatchType: Wild card directory
Info 27   [00:01:08.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/b/c/fc.ts 500 undefined WatchType: Closed Script info
Info 28   [00:01:09.000] Starting updateGraphWorker: Project: /users/username/projects/b/tsconfig.json
Info 29   [00:01:10.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Info 30   [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Info 31   [00:01:12.000] Finishing updateGraphWorker: Project: /users/username/projects/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 32   [00:01:13.000] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info 33   [00:01:14.000] 	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/b/c/fc.ts
	/users/username/projects/b/b.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	c/fc.ts
	  Imported via "./c/fc" from file 'b.ts'
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

Info 34   [00:01:15.000] -----------------------------------------------
Info 35   [00:01:16.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 35   [00:01:17.000] 	Files (3)

Info 35   [00:01:18.000] -----------------------------------------------
Info 35   [00:01:19.000] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info 35   [00:01:20.000] 	Files (3)

Info 35   [00:01:21.000] -----------------------------------------------
Info 35   [00:01:22.000] Open files: 
Info 35   [00:01:23.000] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info 35   [00:01:24.000] 		Projects: /users/username/projects/a/tsconfig.json
Info 35   [00:01:25.000] 	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
Info 35   [00:01:26.000] 		Projects: /users/username/projects/b/tsconfig.json
After request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/a/tsconfig.json:
  {}
/users/username/projects/a/c/fc.ts:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/b/tsconfig.json:
  {}
/users/username/projects/b/c/fc.ts:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b:
  {}

Info 35   [00:01:27.000] response:
    {
      "responseRequired": false
    }
Info 36   [00:01:28.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/a/c/fc.ts",
        "projectRootPath": "/users/username/projects/a"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/a/tsconfig.json:
  {}
/users/username/projects/a/c/fc.ts:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/b/tsconfig.json:
  {}
/users/username/projects/b/c/fc.ts:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b:
  {}

Info 37   [00:01:29.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/a/c/fc.ts 500 undefined WatchType: Closed Script info
Info 38   [00:01:30.000] Search path: /users/username/projects/a/c
Info 39   [00:01:31.000] For info: /users/username/projects/a/c/fc.ts :: Config file name: /users/username/projects/a/tsconfig.json
Info 40   [00:01:32.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 40   [00:01:33.000] 	Files (3)

Info 40   [00:01:34.000] -----------------------------------------------
Info 40   [00:01:35.000] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info 40   [00:01:36.000] 	Files (3)

Info 40   [00:01:37.000] -----------------------------------------------
Info 40   [00:01:38.000] Open files: 
Info 40   [00:01:39.000] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info 40   [00:01:40.000] 		Projects: /users/username/projects/a/tsconfig.json
Info 40   [00:01:41.000] 	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
Info 40   [00:01:42.000] 		Projects: /users/username/projects/b/tsconfig.json
Info 40   [00:01:43.000] 	FileName: /users/username/projects/a/c/fc.ts ProjectRootPath: /users/username/projects/a
Info 40   [00:01:44.000] 		Projects: /users/username/projects/a/tsconfig.json
After request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/a/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/b/tsconfig.json:
  {}
/users/username/projects/b/c/fc.ts:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b:
  {}

Info 40   [00:01:45.000] response:
    {
      "responseRequired": false
    }
Info 41   [00:01:46.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/b/c/fc.ts",
        "projectRootPath": "/users/username/projects/b"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/a/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/b/tsconfig.json:
  {}
/users/username/projects/b/c/fc.ts:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b:
  {}

Info 42   [00:01:47.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/b/c/fc.ts 500 undefined WatchType: Closed Script info
Info 43   [00:01:48.000] Search path: /users/username/projects/b/c
Info 44   [00:01:49.000] For info: /users/username/projects/b/c/fc.ts :: Config file name: /users/username/projects/b/tsconfig.json
Info 45   [00:01:50.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 45   [00:01:51.000] 	Files (3)

Info 45   [00:01:52.000] -----------------------------------------------
Info 45   [00:01:53.000] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info 45   [00:01:54.000] 	Files (3)

Info 45   [00:01:55.000] -----------------------------------------------
Info 45   [00:01:56.000] Open files: 
Info 45   [00:01:57.000] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info 45   [00:01:58.000] 		Projects: /users/username/projects/a/tsconfig.json
Info 45   [00:01:59.000] 	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
Info 45   [00:02:00.000] 		Projects: /users/username/projects/b/tsconfig.json
Info 45   [00:02:01.000] 	FileName: /users/username/projects/a/c/fc.ts ProjectRootPath: /users/username/projects/a
Info 45   [00:02:02.000] 		Projects: /users/username/projects/a/tsconfig.json
Info 45   [00:02:03.000] 	FileName: /users/username/projects/b/c/fc.ts ProjectRootPath: /users/username/projects/b
Info 45   [00:02:04.000] 		Projects: /users/username/projects/b/tsconfig.json
After request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/a/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/b/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b:
  {}

Info 45   [00:02:05.000] response:
    {
      "responseRequired": false
    }
Info 46   [00:02:06.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/users/username/projects/a/c/fc.ts",
        "line": 1,
        "offset": 14
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/a/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/b/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b:
  {}

After request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/a/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/b/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b:
  {}

Info 47   [00:02:07.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "C",
          "fullDisplayName": "\"/users/username/projects/a/c/fc\".C",
          "kind": "const",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 15
            }
          }
        },
        "locs": [
          {
            "file": "/users/username/projects/a/c/fc.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 14
                },
                "end": {
                  "line": 1,
                  "offset": 15
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 19
                }
              }
            ]
          },
          {
            "file": "/users/username/projects/a/a.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 9
                },
                "end": {
                  "line": 1,
                  "offset": 10
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 26
                }
              },
              {
                "start": {
                  "line": 1,
                  "offset": 39
                },
                "end": {
                  "line": 1,
                  "offset": 40
                }
              }
            ]
          },
          {
            "file": "/users/username/projects/b/c/fc.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 14
                },
                "end": {
                  "line": 1,
                  "offset": 15
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 19
                }
              }
            ]
          },
          {
            "file": "/users/username/projects/b/b.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 9
                },
                "end": {
                  "line": 1,
                  "offset": 10
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 26
                }
              },
              {
                "start": {
                  "line": 1,
                  "offset": 39
                },
                "end": {
                  "line": 1,
                  "offset": 40
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }