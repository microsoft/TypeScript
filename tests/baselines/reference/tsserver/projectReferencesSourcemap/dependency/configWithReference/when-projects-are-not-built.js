Info 0    [16:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:36.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts"
      }
    }
Before request
//// [/user/username/projects/myproject/dependency/FnS.ts]
export function fn1() { }
export function fn2() { }
export function fn3() { }
export function fn4() { }
export function fn5() { }


//// [/user/username/projects/myproject/dependency/tsconfig.json]
{"compilerOptions":{"composite":true,"declarationMap":true,"declarationDir":"../decls"}}

//// [/user/username/projects/myproject/main/main.ts]
import {
    fn1,
    fn2,
    fn3,
    fn4,
    fn5
} from '../decls/fns'

fn1();
fn2();
fn3();
fn4();
fn5();


//// [/user/username/projects/myproject/main/tsconfig.json]
{"compilerOptions":{"composite":true,"declarationMap":true},"references":[{"path":"../dependency"}]}

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

//// [/user/username/projects/myproject/random/random.ts]
let a = 10;

//// [/user/username/projects/myproject/random/tsconfig.json]
{}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:37.000] Search path: /user/username/projects/myproject/dependency
Info 3    [16:00:38.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 4    [16:00:39.000] Creating configuration project /user/username/projects/myproject/dependency/tsconfig.json
Info 5    [16:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Config file
Info 6    [16:00:41.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/dependency/FnS.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "declarationDir": "/user/username/projects/myproject/decls",
  "configFilePath": "/user/username/projects/myproject/dependency/tsconfig.json"
 }
}
Info 7    [16:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:44.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:45.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
Info 11   [16:00:46.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 13   [16:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 14   [16:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 15   [16:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 16   [16:00:51.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [16:00:52.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 18   [16:00:53.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 19   [16:00:54.000] -----------------------------------------------
Info 20   [16:00:55.000] Search path: /user/username/projects/myproject/dependency
Info 21   [16:00:56.000] For info: /user/username/projects/myproject/dependency/tsconfig.json :: No config files found.
Info 22   [16:00:57.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 22   [16:00:58.000] 	Files (2)

Info 22   [16:00:59.000] -----------------------------------------------
Info 22   [16:01:00.000] Open files: 
Info 22   [16:01:01.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 22   [16:01:02.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}

Info 22   [16:01:03.000] response:
    {
      "responseRequired": false
    }
Info 23   [16:01:04.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}

Info 24   [16:01:05.000] Search path: /user/username/projects/myproject/random
Info 25   [16:01:06.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 26   [16:01:07.000] Creating configuration project /user/username/projects/myproject/random/tsconfig.json
Info 27   [16:01:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Config file
Info 28   [16:01:09.000] Config: /user/username/projects/myproject/random/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/random/random.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/random/tsconfig.json"
 }
}
Info 29   [16:01:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 30   [16:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 31   [16:01:12.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 32   [16:01:13.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json
Info 33   [16:01:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 34   [16:01:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 35   [16:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 36   [16:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 37   [16:01:18.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 38   [16:01:19.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 39   [16:01:20.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/random/random.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	random.ts
	  Matched by default include pattern '**/*'

Info 40   [16:01:21.000] -----------------------------------------------
Info 41   [16:01:22.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 41   [16:01:23.000] 	Files (2)

Info 41   [16:01:24.000] -----------------------------------------------
Info 41   [16:01:25.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 41   [16:01:26.000] 	Files (2)

Info 41   [16:01:27.000] -----------------------------------------------
Info 41   [16:01:28.000] Open files: 
Info 41   [16:01:29.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 41   [16:01:30.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 41   [16:01:31.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 41   [16:01:32.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 41   [16:01:33.000] response:
    {
      "responseRequired": false
    }
Info 42   [16:01:34.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 1,
        "offset": 17
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 43   [16:01:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 44   [16:01:36.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn1",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn1",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
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
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 45   [16:01:37.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 2,
        "offset": 17
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 46   [16:01:38.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn2",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn2",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 2,
              "offset": 17
            },
            "end": {
              "line": 2,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
                "start": {
                  "line": 2,
                  "offset": 17
                },
                "end": {
                  "line": 2,
                  "offset": 20
                },
                "contextStart": {
                  "line": 2,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 2,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 47   [16:01:39.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 3,
        "offset": 17
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 48   [16:01:40.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn3",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn3",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 3,
              "offset": 17
            },
            "end": {
              "line": 3,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 17
                },
                "end": {
                  "line": 3,
                  "offset": 20
                },
                "contextStart": {
                  "line": 3,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 3,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 49   [16:01:41.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 4,
        "offset": 17
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 50   [16:01:42.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn4",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn4",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 4,
              "offset": 17
            },
            "end": {
              "line": 4,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
                "start": {
                  "line": 4,
                  "offset": 17
                },
                "end": {
                  "line": 4,
                  "offset": 20
                },
                "contextStart": {
                  "line": 4,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 4,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 51   [16:01:43.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts",
        "line": 5,
        "offset": 17
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 52   [16:01:44.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fn5",
          "fullDisplayName": "\"/user/username/projects/myproject/dependency/FnS\".fn5",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 5,
              "offset": 17
            },
            "end": {
              "line": 5,
              "offset": 20
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
            "locs": [
              {
                "start": {
                  "line": 5,
                  "offset": 17
                },
                "end": {
                  "line": 5,
                  "offset": 20
                },
                "contextStart": {
                  "line": 5,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 5,
                  "offset": 26
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 53   [16:01:45.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 54   [16:01:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 55   [16:01:47.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 55   [16:01:48.000] 	Files (2)

Info 55   [16:01:49.000] -----------------------------------------------
Info 55   [16:01:50.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 55   [16:01:51.000] 	Files (2)

Info 55   [16:01:52.000] -----------------------------------------------
Info 55   [16:01:53.000] Open files: 
Info 55   [16:01:54.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 55   [16:01:55.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 55   [16:01:56.000] response:
    {
      "responseRequired": false
    }
Info 56   [16:01:57.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 57   [16:01:58.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 58   [16:01:59.000] Search path: /user/username/projects/myproject/random
Info 59   [16:02:00.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 60   [16:02:01.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 60   [16:02:02.000] 	Files (2)

Info 60   [16:02:03.000] -----------------------------------------------
Info 60   [16:02:04.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 60   [16:02:05.000] 	Files (2)

Info 60   [16:02:06.000] -----------------------------------------------
Info 60   [16:02:07.000] Open files: 
Info 60   [16:02:08.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 60   [16:02:09.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 60   [16:02:10.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 60   [16:02:11.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 60   [16:02:12.000] response:
    {
      "responseRequired": false
    }
Info 61   [16:02:13.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/FnS.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 62   [16:02:14.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 63   [16:02:15.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 63   [16:02:16.000] 	Files (2)

Info 63   [16:02:17.000] -----------------------------------------------
Info 63   [16:02:18.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 63   [16:02:19.000] 	Files (2)

Info 63   [16:02:20.000] -----------------------------------------------
Info 63   [16:02:21.000] Open files: 
Info 63   [16:02:22.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 63   [16:02:23.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 63   [16:02:24.000] response:
    {
      "responseRequired": false
    }
Info 64   [16:02:25.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 65   [16:02:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 66   [16:02:27.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 66   [16:02:28.000] 	Files (2)

Info 66   [16:02:29.000] -----------------------------------------------
Info 66   [16:02:30.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 66   [16:02:31.000] 	Files (2)

Info 66   [16:02:32.000] -----------------------------------------------
Info 66   [16:02:33.000] Open files: 
After request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 66   [16:02:34.000] response:
    {
      "responseRequired": false
    }
Info 67   [16:02:35.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/random/random.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/decls/fns.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 68   [16:02:36.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 69   [16:02:37.000] Search path: /user/username/projects/myproject/random
Info 70   [16:02:38.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 71   [16:02:39.000] `remove Project::
Info 72   [16:02:40.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 73   [16:02:41.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 74   [16:02:42.000] -----------------------------------------------
Info 75   [16:02:43.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 76   [16:02:44.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 77   [16:02:45.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Config file
Info 78   [16:02:46.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 79   [16:02:47.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 80   [16:02:48.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 81   [16:02:49.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 82   [16:02:50.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 83   [16:02:51.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 84   [16:02:52.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 84   [16:02:53.000] 	Files (2)

Info 84   [16:02:54.000] -----------------------------------------------
Info 84   [16:02:55.000] Open files: 
Info 84   [16:02:56.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 84   [16:02:57.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/random:
  {}

Info 84   [16:02:58.000] response:
    {
      "responseRequired": false
    }