Info 0    [16:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:36.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/a/a.ts",
        "projectRootPath": "/users/username/projects/a"
      }
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

Info 2    [16:00:37.000] Search path: /users/username/projects/a
Info 3    [16:00:38.000] For info: /users/username/projects/a/a.ts :: Config file name: /users/username/projects/a/tsconfig.json
Info 4    [16:00:39.000] Creating configuration project /users/username/projects/a/tsconfig.json
Info 5    [16:00:40.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/a/tsconfig.json 2000 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Config file
Info 6    [16:00:41.000] Config: /users/username/projects/a/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/a/a.ts",
  "/users/username/projects/a/c/fc.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/users/username/projects/a/tsconfig.json"
 }
}
Info 7    [16:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a 1 undefined Config: /users/username/projects/a/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a 1 undefined Config: /users/username/projects/a/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:44.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:45.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/a/c/fc.ts 500 undefined WatchType: Closed Script info
Info 11   [16:00:46.000] Starting updateGraphWorker: Project: /users/username/projects/a/tsconfig.json
Info 12   [16:00:47.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [16:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Info 14   [16:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Info 15   [16:00:50.000] Finishing updateGraphWorker: Project: /users/username/projects/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [16:00:51.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 17   [16:00:52.000] 	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/a/c/fc.ts
	/users/username/projects/a/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	c/fc.ts
	  Imported via "./c/fc" from file 'a.ts'
	  Matched by default include pattern '**/*'
	a.ts
	  Matched by default include pattern '**/*'

Info 18   [16:00:53.000] -----------------------------------------------
Info 19   [16:00:54.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 19   [16:00:55.000] 	Files (3)

Info 19   [16:00:56.000] -----------------------------------------------
Info 19   [16:00:57.000] Open files: 
Info 19   [16:00:58.000] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info 19   [16:00:59.000] 		Projects: /users/username/projects/a/tsconfig.json
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

Info 19   [16:01:00.000] response:
    {
      "responseRequired": false
    }
Info 20   [16:01:01.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/b/b.ts",
        "projectRootPath": "/users/username/projects/b"
      }
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

Info 21   [16:01:02.000] Search path: /users/username/projects/b
Info 22   [16:01:03.000] For info: /users/username/projects/b/b.ts :: Config file name: /users/username/projects/b/tsconfig.json
Info 23   [16:01:04.000] Creating configuration project /users/username/projects/b/tsconfig.json
Info 24   [16:01:05.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/b/tsconfig.json 2000 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Config file
Info 25   [16:01:06.000] Config: /users/username/projects/b/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/b/b.ts",
  "/users/username/projects/b/c/fc.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/users/username/projects/b/tsconfig.json"
 }
}
Info 26   [16:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b 1 undefined Config: /users/username/projects/b/tsconfig.json WatchType: Wild card directory
Info 27   [16:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b 1 undefined Config: /users/username/projects/b/tsconfig.json WatchType: Wild card directory
Info 28   [16:01:09.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 29   [16:01:10.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/b/c/fc.ts 500 undefined WatchType: Closed Script info
Info 30   [16:01:11.000] Starting updateGraphWorker: Project: /users/username/projects/b/tsconfig.json
Info 31   [16:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Info 32   [16:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Info 33   [16:01:14.000] Finishing updateGraphWorker: Project: /users/username/projects/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [16:01:15.000] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info 35   [16:01:16.000] 	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/b/c/fc.ts
	/users/username/projects/b/b.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	c/fc.ts
	  Imported via "./c/fc" from file 'b.ts'
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

Info 36   [16:01:17.000] -----------------------------------------------
Info 37   [16:01:18.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 37   [16:01:19.000] 	Files (3)

Info 37   [16:01:20.000] -----------------------------------------------
Info 37   [16:01:21.000] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info 37   [16:01:22.000] 	Files (3)

Info 37   [16:01:23.000] -----------------------------------------------
Info 37   [16:01:24.000] Open files: 
Info 37   [16:01:25.000] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info 37   [16:01:26.000] 		Projects: /users/username/projects/a/tsconfig.json
Info 37   [16:01:27.000] 	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
Info 37   [16:01:28.000] 		Projects: /users/username/projects/b/tsconfig.json
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

Info 37   [16:01:29.000] response:
    {
      "responseRequired": false
    }
Info 38   [16:01:30.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/a/c/fc.ts",
        "projectRootPath": "/users/username/projects/a"
      }
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

Info 39   [16:01:31.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/a/c/fc.ts 500 undefined WatchType: Closed Script info
Info 40   [16:01:32.000] Search path: /users/username/projects/a/c
Info 41   [16:01:33.000] For info: /users/username/projects/a/c/fc.ts :: Config file name: /users/username/projects/a/tsconfig.json
Info 42   [16:01:34.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 42   [16:01:35.000] 	Files (3)

Info 42   [16:01:36.000] -----------------------------------------------
Info 42   [16:01:37.000] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info 42   [16:01:38.000] 	Files (3)

Info 42   [16:01:39.000] -----------------------------------------------
Info 42   [16:01:40.000] Open files: 
Info 42   [16:01:41.000] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info 42   [16:01:42.000] 		Projects: /users/username/projects/a/tsconfig.json
Info 42   [16:01:43.000] 	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
Info 42   [16:01:44.000] 		Projects: /users/username/projects/b/tsconfig.json
Info 42   [16:01:45.000] 	FileName: /users/username/projects/a/c/fc.ts ProjectRootPath: /users/username/projects/a
Info 42   [16:01:46.000] 		Projects: /users/username/projects/a/tsconfig.json
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

Info 42   [16:01:47.000] response:
    {
      "responseRequired": false
    }
Info 43   [16:01:48.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/b/c/fc.ts",
        "projectRootPath": "/users/username/projects/b"
      }
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

Info 44   [16:01:49.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/b/c/fc.ts 500 undefined WatchType: Closed Script info
Info 45   [16:01:50.000] Search path: /users/username/projects/b/c
Info 46   [16:01:51.000] For info: /users/username/projects/b/c/fc.ts :: Config file name: /users/username/projects/b/tsconfig.json
Info 47   [16:01:52.000] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info 47   [16:01:53.000] 	Files (3)

Info 47   [16:01:54.000] -----------------------------------------------
Info 47   [16:01:55.000] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info 47   [16:01:56.000] 	Files (3)

Info 47   [16:01:57.000] -----------------------------------------------
Info 47   [16:01:58.000] Open files: 
Info 47   [16:01:59.000] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info 47   [16:02:00.000] 		Projects: /users/username/projects/a/tsconfig.json
Info 47   [16:02:01.000] 	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
Info 47   [16:02:02.000] 		Projects: /users/username/projects/b/tsconfig.json
Info 47   [16:02:03.000] 	FileName: /users/username/projects/a/c/fc.ts ProjectRootPath: /users/username/projects/a
Info 47   [16:02:04.000] 		Projects: /users/username/projects/a/tsconfig.json
Info 47   [16:02:05.000] 	FileName: /users/username/projects/b/c/fc.ts ProjectRootPath: /users/username/projects/b
Info 47   [16:02:06.000] 		Projects: /users/username/projects/b/tsconfig.json
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

Info 47   [16:02:07.000] response:
    {
      "responseRequired": false
    }
Info 48   [16:02:08.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "rename",
      "arguments": {
        "file": "/users/username/projects/a/c/fc.ts",
        "line": 1,
        "offset": 14
      }
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

Info 49   [16:02:09.000] response:
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