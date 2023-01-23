Info 0    [00:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:36.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/playground/tests.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
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

Info 2    [00:00:37.000] Search path: /user/username/projects/myproject/playground
Info 3    [00:00:38.000] For info: /user/username/projects/myproject/playground/tests.ts :: Config file name: /user/username/projects/myproject/playground/tsconfig.json
Info 4    [00:00:39.000] Creating configuration project /user/username/projects/myproject/playground/tsconfig.json
Info 5    [00:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Config file
Info 6    [00:00:41.000] Config: /user/username/projects/myproject/playground/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/playground/tests.ts",
  "/user/username/projects/myproject/playground/tsconfig-json/src/src.ts",
  "/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/playground/tsconfig.json"
 }
}
Info 7    [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground 1 undefined Config: /user/username/projects/myproject/playground/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground 1 undefined Config: /user/username/projects/myproject/playground/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:44.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/src/src.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:46.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/playground/tsconfig.json
Info 12   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 14   [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 15   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 16   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 17   [00:00:52.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/playground/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:00:53.000] Project '/user/username/projects/myproject/playground/tsconfig.json' (Configured)
Info 19   [00:00:54.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/playground/tests.ts
	/user/username/projects/myproject/playground/tsconfig-json/src/src.ts
	/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	tests.ts
	  Matched by default include pattern '**/*'
	tsconfig-json/src/src.ts
	  Matched by default include pattern '**/*'
	tsconfig-json/tests/spec.ts
	  Matched by default include pattern '**/*'

Info 20   [00:00:55.000] -----------------------------------------------
Info 21   [00:00:56.000] Project '/user/username/projects/myproject/playground/tsconfig.json' (Configured)
Info 21   [00:00:57.000] 	Files (4)

Info 21   [00:00:58.000] -----------------------------------------------
Info 21   [00:00:59.000] Open files: 
Info 21   [00:01:00.000] 	FileName: /user/username/projects/myproject/playground/tests.ts ProjectRootPath: undefined
Info 21   [00:01:01.000] 		Projects: /user/username/projects/myproject/playground/tsconfig.json
After request

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

Info 21   [00:01:02.000] response:
    {
      "responseRequired": false
    }
Info 22   [00:01:03.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/playground/tests.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

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

Info 23   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tests.ts 500 undefined WatchType: Closed Script info
Info 24   [00:01:05.000] Project '/user/username/projects/myproject/playground/tsconfig.json' (Configured)
Info 24   [00:01:06.000] 	Files (4)

Info 24   [00:01:07.000] -----------------------------------------------
Info 24   [00:01:08.000] Open files: 
After request

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

Info 24   [00:01:09.000] response:
    {
      "responseRequired": false
    }
Info 25   [00:01:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

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

Info 26   [00:01:11.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts 500 undefined WatchType: Closed Script info
Info 27   [00:01:12.000] Search path: /user/username/projects/myproject/playground/tsconfig-json/tests
Info 28   [00:01:13.000] For info: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts :: Config file name: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json
Info 29   [00:01:14.000] Creating configuration project /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json
Info 30   [00:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Config file
Info 31   [00:01:16.000] Config: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/playground/tsconfig-json/src/src.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json"
 }
}
Info 32   [00:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/src 1 undefined Config: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Wild card directory
Info 33   [00:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/src 1 undefined Config: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Wild card directory
Info 34   [00:01:19.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json
Info 35   [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 36   [00:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 37   [00:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 38   [00:01:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 39   [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 40   [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json WatchType: Type roots
Info 41   [00:01:26.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/playground/tsconfig-json/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 42   [00:01:27.000] Project '/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json' (Configured)
Info 43   [00:01:28.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/playground/tsconfig-json/src/src.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/src.ts
	  Matched by include pattern './src' in 'tsconfig.json'

Info 44   [00:01:29.000] -----------------------------------------------
Info 45   [00:01:30.000] `remove Project::
Info 46   [00:01:31.000] Project '/user/username/projects/myproject/playground/tsconfig.json' (Configured)
Info 47   [00:01:32.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/playground/tests.ts
	/user/username/projects/myproject/playground/tsconfig-json/src/src.ts
	/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	tests.ts
	  Matched by default include pattern '**/*'
	tsconfig-json/src/src.ts
	  Matched by default include pattern '**/*'
	tsconfig-json/tests/spec.ts
	  Matched by default include pattern '**/*'

Info 48   [00:01:33.000] -----------------------------------------------
Info 49   [00:01:34.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground 1 undefined Config: /user/username/projects/myproject/playground/tsconfig.json WatchType: Wild card directory
Info 50   [00:01:35.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground 1 undefined Config: /user/username/projects/myproject/playground/tsconfig.json WatchType: Wild card directory
Info 51   [00:01:36.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Config file
Info 52   [00:01:37.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 53   [00:01:38.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 54   [00:01:39.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 55   [00:01:40.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/playground/tsconfig.json WatchType: Type roots
Info 56   [00:01:41.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/playground/tests.ts 500 undefined WatchType: Closed Script info
Info 57   [00:01:42.000] Project '/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json' (Configured)
Info 57   [00:01:43.000] 	Files (2)

Info 57   [00:01:44.000] -----------------------------------------------
Info 57   [00:01:45.000] Open files: 
Info 57   [00:01:46.000] 	FileName: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts ProjectRootPath: undefined
Info 57   [00:01:47.000] 		Projects: 
After request

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

Info 57   [00:01:48.000] response:
    {
      "responseRequired": false
    }
Info 58   [00:01:49.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts",
        "line": 1,
        "offset": 17
      },
      "seq": 4,
      "type": "request"
    }
Before request

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

Info 59   [00:01:50.000] Before ensureProjectForOpenFiles:
Info 60   [00:01:51.000] Project '/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json' (Configured)
Info 60   [00:01:52.000] 	Files (2)

Info 60   [00:01:53.000] -----------------------------------------------
Info 60   [00:01:54.000] Open files: 
Info 60   [00:01:55.000] 	FileName: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts ProjectRootPath: undefined
Info 60   [00:01:56.000] 		Projects: 
Info 60   [00:01:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 61   [00:01:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 62   [00:01:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 63   [00:02:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 64   [00:02:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 65   [00:02:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 66   [00:02:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 67   [00:02:04.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 68   [00:02:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 69   [00:02:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 70   [00:02:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 71   [00:02:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 72   [00:02:09.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 73   [00:02:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 74   [00:02:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 75   [00:02:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 76   [00:02:13.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 77   [00:02:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 78   [00:02:15.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	spec.ts
	  Root file specified for compilation

Info 79   [00:02:16.000] -----------------------------------------------
Info 80   [00:02:17.000] After ensureProjectForOpenFiles:
Info 81   [00:02:18.000] Project '/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json' (Configured)
Info 81   [00:02:19.000] 	Files (2)

Info 81   [00:02:20.000] -----------------------------------------------
Info 81   [00:02:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 81   [00:02:22.000] 	Files (2)

Info 81   [00:02:23.000] -----------------------------------------------
Info 81   [00:02:24.000] Open files: 
Info 81   [00:02:25.000] 	FileName: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts ProjectRootPath: undefined
Info 81   [00:02:26.000] 		Projects: /dev/null/inferredProject1*
Info 81   [00:02:27.000] Finding references to /user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts position 16 in project /dev/null/inferredProject1*
Info 82   [00:02:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/playground/tsconfig-json/tests/spec.d.ts 2000 undefined Project: /dev/null/inferredProject1* WatchType: Missing generated file
After request

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
/user/username/projects/myproject/playground/tsconfig-json/tests/spec.d.ts:
  {"pollingInterval":2000}

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

Info 83   [00:02:29.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts",
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
            },
            "lineText": "export function bar() { }",
            "isWriteAccess": true,
            "isDefinition": true
          }
        ],
        "symbolName": "bar",
        "symbolStartOffset": 17,
        "symbolDisplayString": "function bar(): void"
      },
      "responseRequired": true
    }