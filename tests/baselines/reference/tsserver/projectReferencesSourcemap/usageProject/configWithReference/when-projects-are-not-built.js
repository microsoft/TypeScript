Info 0    [00:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:36.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts"
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

Info 2    [00:00:37.000] Search path: /user/username/projects/myproject/main
Info 3    [00:00:38.000] For info: /user/username/projects/myproject/main/main.ts :: Config file name: /user/username/projects/myproject/main/tsconfig.json
Info 4    [00:00:39.000] Creating configuration project /user/username/projects/myproject/main/tsconfig.json
Info 5    [00:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 6    [00:00:41.000] Config: /user/username/projects/myproject/main/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/main/main.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "configFilePath": "/user/username/projects/myproject/main/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/dependency",
   "originalPath": "../dependency"
  }
 ]
}
Info 7    [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:44.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json
Info 10   [00:00:45.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
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
Info 11   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 12   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:51.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:52.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 19   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 20   [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 21   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 22   [00:00:57.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:58.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 24   [00:00:59.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../dependency/FnS.ts
	  Imported via '../decls/fns' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 25   [00:01:00.000] -----------------------------------------------
Info 26   [00:01:01.000] Search path: /user/username/projects/myproject/main
Info 27   [00:01:02.000] For info: /user/username/projects/myproject/main/tsconfig.json :: No config files found.
Info 28   [00:01:03.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 28   [00:01:04.000] 	Files (3)

Info 28   [00:01:05.000] -----------------------------------------------
Info 28   [00:01:06.000] Open files: 
Info 28   [00:01:07.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 28   [00:01:08.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 28   [00:01:09.000] response:
    {
      "responseRequired": false
    }
Info 29   [00:01:10.000] request:
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
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 30   [00:01:11.000] Search path: /user/username/projects/myproject/random
Info 31   [00:01:12.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 32   [00:01:13.000] Creating configuration project /user/username/projects/myproject/random/tsconfig.json
Info 33   [00:01:14.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Config file
Info 34   [00:01:15.000] Config: /user/username/projects/myproject/random/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/random/random.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/random/tsconfig.json"
 }
}
Info 35   [00:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 36   [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 37   [00:01:18.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json
Info 38   [00:01:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 39   [00:01:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 40   [00:01:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 41   [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 42   [00:01:23.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 43   [00:01:24.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 44   [00:01:25.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/random/random.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	random.ts
	  Matched by default include pattern '**/*'

Info 45   [00:01:26.000] -----------------------------------------------
Info 46   [00:01:27.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 46   [00:01:28.000] 	Files (3)

Info 46   [00:01:29.000] -----------------------------------------------
Info 46   [00:01:30.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 46   [00:01:31.000] 	Files (2)

Info 46   [00:01:32.000] -----------------------------------------------
Info 46   [00:01:33.000] Open files: 
Info 46   [00:01:34.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 46   [00:01:35.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 46   [00:01:36.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 46   [00:01:37.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 46   [00:01:38.000] response:
    {
      "responseRequired": false
    }
Info 47   [00:01:39.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 9,
        "offset": 1
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 48   [00:01:40.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
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
        ],
        "textSpan": {
          "start": {
            "line": 9,
            "offset": 1
          },
          "end": {
            "line": 9,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 49   [00:01:41.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 10,
        "offset": 1
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 50   [00:01:42.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
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
        ],
        "textSpan": {
          "start": {
            "line": 10,
            "offset": 1
          },
          "end": {
            "line": 10,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 51   [00:01:43.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 11,
        "offset": 1
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 52   [00:01:44.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
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
        ],
        "textSpan": {
          "start": {
            "line": 11,
            "offset": 1
          },
          "end": {
            "line": 11,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 53   [00:01:45.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 12,
        "offset": 1
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 54   [00:01:46.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
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
        ],
        "textSpan": {
          "start": {
            "line": 12,
            "offset": 1
          },
          "end": {
            "line": 12,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 55   [00:01:47.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 13,
        "offset": 1
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 56   [00:01:48.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/dependency/FnS.ts",
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
        ],
        "textSpan": {
          "start": {
            "line": 13,
            "offset": 1
          },
          "end": {
            "line": 13,
            "offset": 4
          }
        }
      },
      "responseRequired": true
    }
Info 57   [00:01:49.000] request:
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
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 58   [00:01:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 59   [00:01:51.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 59   [00:01:52.000] 	Files (3)

Info 59   [00:01:53.000] -----------------------------------------------
Info 59   [00:01:54.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 59   [00:01:55.000] 	Files (2)

Info 59   [00:01:56.000] -----------------------------------------------
Info 59   [00:01:57.000] Open files: 
Info 59   [00:01:58.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 59   [00:01:59.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 59   [00:02:00.000] response:
    {
      "responseRequired": false
    }
Info 60   [00:02:01.000] request:
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
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 61   [00:02:02.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 62   [00:02:03.000] Search path: /user/username/projects/myproject/random
Info 63   [00:02:04.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 64   [00:02:05.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 64   [00:02:06.000] 	Files (3)

Info 64   [00:02:07.000] -----------------------------------------------
Info 64   [00:02:08.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 64   [00:02:09.000] 	Files (2)

Info 64   [00:02:10.000] -----------------------------------------------
Info 64   [00:02:11.000] Open files: 
Info 64   [00:02:12.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 64   [00:02:13.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 64   [00:02:14.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 64   [00:02:15.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 64   [00:02:16.000] response:
    {
      "responseRequired": false
    }
Info 65   [00:02:17.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 66   [00:02:18.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 67   [00:02:19.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 67   [00:02:20.000] 	Files (3)

Info 67   [00:02:21.000] -----------------------------------------------
Info 67   [00:02:22.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 67   [00:02:23.000] 	Files (2)

Info 67   [00:02:24.000] -----------------------------------------------
Info 67   [00:02:25.000] Open files: 
Info 67   [00:02:26.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 67   [00:02:27.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 67   [00:02:28.000] response:
    {
      "responseRequired": false
    }
Info 68   [00:02:29.000] request:
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
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 69   [00:02:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 70   [00:02:31.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 70   [00:02:32.000] 	Files (3)

Info 70   [00:02:33.000] -----------------------------------------------
Info 70   [00:02:34.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 70   [00:02:35.000] 	Files (2)

Info 70   [00:02:36.000] -----------------------------------------------
Info 70   [00:02:37.000] Open files: 
After request

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 70   [00:02:38.000] response:
    {
      "responseRequired": false
    }
Info 71   [00:02:39.000] request:
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
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/random/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/random/tsconfig.json:
  {}
/user/username/projects/myproject/main/main.ts:
  {}
/user/username/projects/myproject/random/random.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/random:
  {}

Info 72   [00:02:40.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 73   [00:02:41.000] Search path: /user/username/projects/myproject/random
Info 74   [00:02:42.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 75   [00:02:43.000] `remove Project::
Info 76   [00:02:44.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 77   [00:02:45.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../dependency/FnS.ts
	  Imported via '../decls/fns' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 78   [00:02:46.000] -----------------------------------------------
Info 79   [00:02:47.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 80   [00:02:48.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 81   [00:02:49.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 82   [00:02:50.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 83   [00:02:51.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 84   [00:02:52.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 85   [00:02:53.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 86   [00:02:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 87   [00:02:55.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 88   [00:02:56.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 89   [00:02:57.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 90   [00:02:58.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 91   [00:02:59.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 92   [00:03:00.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 93   [00:03:01.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 93   [00:03:02.000] 	Files (2)

Info 93   [00:03:03.000] -----------------------------------------------
Info 93   [00:03:04.000] Open files: 
Info 93   [00:03:05.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 93   [00:03:06.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
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

Info 93   [00:03:07.000] response:
    {
      "responseRequired": false
    }