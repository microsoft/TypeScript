Info 0    [16:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:36.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/playground/tests.ts"
      }
    }
//// [/user/username/projects/myproject/playground/tsconfig.json]
{}

//// [/user/username/projects/myproject/playground/tests.ts]
export function foo() {}

//// [/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts]
export function bar() { }

//// [/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json]
{"include":["./src"]}

//// [/user/username/projects/myproject/playground/tsconfig-json/src/src.ts]
export function foobar() { }

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

Info 2    [16:00:37.000] Search path: /user/username/projects/myproject/playground
Info 3    [16:00:38.000] For info: /user/username/projects/myproject/playground/tests.ts :: Config file name: /user/username/projects/myproject/playground/tsconfig.json
Info 4    [16:00:39.000] Creating configuration project /user/username/projects/myproject/playground/tsconfig.json
Info 5    [16:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Config file
Info 6    [16:00:41.000] Config: /user/username/projects/myproject/playground/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/playground/tests.ts",
  "/user/username/projects/myproject/playground/tsconfig-json/src/src.ts",
  "/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/playground/tsconfig.json"
 }
}
Info 7    [16:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground 1 undefined Config: /user/username/projects/myproject/playground/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground 1 undefined Config: /user/username/projects/myproject/playground/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:44.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/src/src.ts 500 undefined WatchType: Closed Script info
Info 11   [16:00:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:47.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/playground/tsconfig.json
Info 13   [16:00:48.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [16:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 15   [16:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 16   [16:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 17   [16:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 18   [16:00:53.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/playground/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [16:00:54.000] Project '/user/username/projects/myproject/playground/tsconfig.json' (Configured)
Info 20   [16:00:55.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/playground/tests.ts
	/user/username/projects/myproject/playground/tsconfig-json/src/src.ts
	/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	tests.ts
	  Matched by default include pattern '**/*'
	tsconfig-json/src/src.ts
	  Matched by default include pattern '**/*'
	tsconfig-json/tests/spec.ts
	  Matched by default include pattern '**/*'

Info 21   [16:00:56.000] -----------------------------------------------
Info 22   [16:00:57.000] Project '/user/username/projects/myproject/playground/tsconfig.json' (Configured)
Info 22   [16:00:58.000] 	Files (4)

Info 22   [16:00:59.000] -----------------------------------------------
Info 22   [16:01:00.000] Open files: 
Info 22   [16:01:01.000] 	FileName: /user/username/projects/myproject/playground/tests.ts ProjectRootPath: undefined
Info 22   [16:01:02.000] 		Projects: /user/username/projects/myproject/playground/tsconfig.json

PolledWatches::
/user/username/projects/myproject/playground/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/playground/tsconfig.json:
  {}
/user/username/projects/myproject/playground/tsconfig-json/src/src.ts:
  {}
/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/playground:
  {}

Info 22   [16:01:03.000] response:
    {
      "responseRequired": false
    }
Info 23   [16:01:04.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/playground/tests.ts"
      }
    }

PolledWatches::
/user/username/projects/myproject/playground/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/playground/tsconfig.json:
  {}
/user/username/projects/myproject/playground/tsconfig-json/src/src.ts:
  {}
/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/playground:
  {}

Info 24   [16:01:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tests.ts 500 undefined WatchType: Closed Script info
Info 25   [16:01:06.000] Project '/user/username/projects/myproject/playground/tsconfig.json' (Configured)
Info 25   [16:01:07.000] 	Files (4)

Info 25   [16:01:08.000] -----------------------------------------------
Info 25   [16:01:09.000] Open files: 

PolledWatches::
/user/username/projects/myproject/playground/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/playground/tsconfig.json:
  {}
/user/username/projects/myproject/playground/tsconfig-json/src/src.ts:
  {}
/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/playground/tests.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/playground:
  {}

Info 25   [16:01:10.000] response:
    {
      "responseRequired": false
    }
Info 26   [16:01:11.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts"
      }
    }

PolledWatches::
/user/username/projects/myproject/playground/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/playground/tsconfig.json:
  {}
/user/username/projects/myproject/playground/tsconfig-json/src/src.ts:
  {}
/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/playground/tests.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/playground:
  {}

Info 27   [16:01:12.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts 500 undefined WatchType: Closed Script info
Info 28   [16:01:13.000] Search path: /user/username/projects/myproject/playground/tsconfig-json/tests
Info 29   [16:01:14.000] For info: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts :: Config file name: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json
Info 30   [16:01:15.000] Creating configuration project /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json
Info 31   [16:01:16.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Config file
Info 32   [16:01:17.000] Config: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/playground/tsconfig-json/src/src.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json"
 }
}
Info 33   [16:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/src 1 undefined Config: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Wild card directory
Info 34   [16:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/src 1 undefined Config: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Wild card directory
Info 35   [16:01:20.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 36   [16:01:21.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json
Info 37   [16:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 38   [16:01:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 39   [16:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 40   [16:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 41   [16:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 42   [16:01:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 43   [16:01:28.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [16:01:29.000] Project '/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json' (Configured)
Info 45   [16:01:30.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/playground/tsconfig-json/src/src.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/src.ts
	  Matched by include pattern './src' in 'tsconfig.json'

Info 46   [16:01:31.000] -----------------------------------------------
Info 47   [16:01:32.000] `remove Project::
Info 48   [16:01:33.000] Project '/user/username/projects/myproject/playground/tsconfig.json' (Configured)
Info 49   [16:01:34.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/playground/tests.ts
	/user/username/projects/myproject/playground/tsconfig-json/src/src.ts
	/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	tests.ts
	  Matched by default include pattern '**/*'
	tsconfig-json/src/src.ts
	  Matched by default include pattern '**/*'
	tsconfig-json/tests/spec.ts
	  Matched by default include pattern '**/*'

Info 50   [16:01:35.000] -----------------------------------------------
Info 51   [16:01:36.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground 1 undefined Config: /user/username/projects/myproject/playground/tsconfig.json WatchType: Wild card directory
Info 52   [16:01:37.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground 1 undefined Config: /user/username/projects/myproject/playground/tsconfig.json WatchType: Wild card directory
Info 53   [16:01:38.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Config file
Info 54   [16:01:39.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 55   [16:01:40.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 56   [16:01:41.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 57   [16:01:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 58   [16:01:43.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/tests.ts 500 undefined WatchType: Closed Script info
Info 59   [16:01:44.000] Project '/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json' (Configured)
Info 59   [16:01:45.000] 	Files (2)

Info 59   [16:01:46.000] -----------------------------------------------
Info 59   [16:01:47.000] Open files: 
Info 59   [16:01:48.000] 	FileName: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts ProjectRootPath: undefined
Info 59   [16:01:49.000] 		Projects: 

PolledWatches::
/user/username/projects/myproject/playground/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/playground/tsconfig-json/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/playground/tsconfig-json/src/src.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/playground/tsconfig-json/src:
  {}

Info 59   [16:01:50.000] response:
    {
      "responseRequired": false
    }
Info 60   [16:01:51.000] request:
    {
      "command": "getOutliningSpans",
      "arguments": {
        "file": "/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts"
      },
      "seq": 1,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/playground/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/playground/tsconfig-json/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/playground/tsconfig-json/src/src.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/playground/tsconfig-json/src:
  {}

Info 61   [16:01:52.000] Before ensureProjectForOpenFiles:
Info 62   [16:01:53.000] Project '/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json' (Configured)
Info 62   [16:01:54.000] 	Files (2)

Info 62   [16:01:55.000] -----------------------------------------------
Info 62   [16:01:56.000] Open files: 
Info 62   [16:01:57.000] 	FileName: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts ProjectRootPath: undefined
Info 62   [16:01:58.000] 		Projects: 
Info 62   [16:01:59.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 63   [16:02:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 64   [16:02:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 65   [16:02:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 66   [16:02:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 67   [16:02:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 68   [16:02:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 69   [16:02:06.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 70   [16:02:07.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 71   [16:02:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 72   [16:02:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 73   [16:02:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 74   [16:02:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 75   [16:02:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 76   [16:02:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 77   [16:02:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 78   [16:02:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 79   [16:02:16.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 80   [16:02:17.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 81   [16:02:18.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	spec.ts
	  Root file specified for compilation

Info 82   [16:02:19.000] -----------------------------------------------
Info 83   [16:02:20.000] After ensureProjectForOpenFiles:
Info 84   [16:02:21.000] Project '/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json' (Configured)
Info 84   [16:02:22.000] 	Files (2)

Info 84   [16:02:23.000] -----------------------------------------------
Info 84   [16:02:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 84   [16:02:25.000] 	Files (2)

Info 84   [16:02:26.000] -----------------------------------------------
Info 84   [16:02:27.000] Open files: 
Info 84   [16:02:28.000] 	FileName: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts ProjectRootPath: undefined
Info 84   [16:02:29.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::
/user/username/projects/myproject/playground/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/playground/tsconfig-json/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/playground/tsconfig-json/tests/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/playground/tsconfig-json/tests/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/playground/tsconfig-json/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/playground/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/playground/tsconfig-json/tests/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/playground/tsconfig-json/src/src.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json:
  {}
/user/username/projects/myproject/playground/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/playground/tsconfig-json/src:
  {}

Info 84   [16:02:30.000] response:
    {
      "response": [
        {
          "textSpan": {
            "start": {
              "line": 1,
              "offset": 22
            },
            "end": {
              "line": 1,
              "offset": 26
            }
          },
          "hintSpan": {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 26
            }
          },
          "bannerText": "...",
          "autoCollapse": true,
          "kind": "code"
        }
      ],
      "responseRequired": true
    }