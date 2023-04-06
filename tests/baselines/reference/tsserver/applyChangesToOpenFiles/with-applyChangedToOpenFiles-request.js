currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let z = 1;

//// [/a/b/file3.ts]
let xyz = 1;

//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

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

//// [/a/b/tsconfig.json]
{}


Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Search path: /a/b
Info 3    [00:00:24.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts",
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts",
  "/a/b/file3.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile1.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:33.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 13   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 16   [00:00:37.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:39.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "let z = 1;"
	/a/b/commonFile1.ts Text-1 "let x = 1"
	/a/b/commonFile2.ts Text-1 "let y = 1"
	/a/b/file3.ts Text-1 "let xyz = 1;"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'
	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:40.000] -----------------------------------------------
Info 20   [00:00:41.000] Project '/a/b/tsconfig.json' (Configured)
Info 20   [00:00:42.000] 	Files (5)

Info 20   [00:00:43.000] -----------------------------------------------
Info 20   [00:00:44.000] Open files: 
Info 20   [00:00:45.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 20   [00:00:46.000] 		Projects: /a/b/tsconfig.json
Info 20   [00:00:47.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b/commonfile1.ts: *new*
  {}
/a/b/commonfile2.ts: *new*
  {}
/a/b/file3.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 21   [00:00:48.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file3.ts",
        "fileContent": "// some copy right notice\nlet xyz = 1;"
      },
      "seq": 2,
      "type": "request"
    }
Info 22   [00:00:49.000] FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 23   [00:00:50.000] Search path: /a/b
Info 24   [00:00:51.000] For info: /a/b/file3.ts :: Config file name: /a/b/tsconfig.json
Info 25   [00:00:52.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 26   [00:00:53.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 27   [00:00:54.000] Project '/a/b/tsconfig.json' (Configured)
Info 28   [00:00:55.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "let z = 1;"
	/a/b/commonFile1.ts Text-1 "let x = 1"
	/a/b/commonFile2.ts Text-1 "let y = 1"
	/a/b/file3.ts SVC-2-0 "// some copy right notice\nlet xyz = 1;"

Info 29   [00:00:56.000] -----------------------------------------------
Info 30   [00:00:57.000] Project '/a/b/tsconfig.json' (Configured)
Info 30   [00:00:58.000] 	Files (5)

Info 30   [00:00:59.000] -----------------------------------------------
Info 30   [00:01:00.000] Open files: 
Info 30   [00:01:01.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 30   [00:01:02.000] 		Projects: /a/b/tsconfig.json
Info 30   [00:01:03.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 30   [00:01:04.000] 		Projects: /a/b/tsconfig.json
Info 30   [00:01:05.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/commonfile1.ts:
  {}
/a/b/commonfile2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/file3.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info 31   [00:01:06.000] request:
    {
      "command": "applyChangedToOpenFiles",
      "arguments": {
        "openFiles": [
          {
            "fileName": "/a/b/commonFile1.ts",
            "content": "// some copy right notice\nlet x = 1"
          },
          {
            "fileName": "/a/b/commonFile2.ts",
            "content": "// some copy right notice\nlet y = 1"
          }
        ],
        "changedFiles": [
          {
            "fileName": "/a/b/app.ts",
            "changes": [
              {
                "span": {
                  "start": 0,
                  "length": 0
                },
                "newText": "let zzz = 10;"
              },
              {
                "span": {
                  "start": 0,
                  "length": 0
                },
                "newText": "let zz = 10;"
              }
            ]
          }
        ],
        "closedFiles": [
          "/a/b/file3.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 32   [00:01:07.000] FileWatcher:: Close:: WatchInfo: /a/b/commonFile1.ts 500 undefined WatchType: Closed Script info
Info 33   [00:01:08.000] FileWatcher:: Close:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 34   [00:01:09.000] FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 35   [00:01:10.000] Search path: /a/b
Info 36   [00:01:11.000] For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Info 37   [00:01:12.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 38   [00:01:13.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 39   [00:01:14.000] Project '/a/b/tsconfig.json' (Configured)
Info 40   [00:01:15.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-1 "let zzz = 10;let zz = 10;let z = 1;"
	/a/b/commonFile1.ts SVC-2-0 "// some copy right notice\nlet x = 1"
	/a/b/commonFile2.ts SVC-2-0 "// some copy right notice\nlet y = 1"
	/a/b/file3.ts Text-3 "let xyz = 1;"

Info 41   [00:01:16.000] -----------------------------------------------
Info 42   [00:01:17.000] Search path: /a/b
Info 43   [00:01:18.000] For info: /a/b/commonFile2.ts :: Config file name: /a/b/tsconfig.json
Info 44   [00:01:19.000] Project '/a/b/tsconfig.json' (Configured)
Info 44   [00:01:20.000] 	Files (5)

Info 44   [00:01:21.000] -----------------------------------------------
Info 44   [00:01:22.000] Open files: 
Info 44   [00:01:23.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 44   [00:01:24.000] 		Projects: /a/b/tsconfig.json
Info 44   [00:01:25.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 44   [00:01:26.000] 		Projects: /a/b/tsconfig.json
Info 44   [00:01:27.000] 	FileName: /a/b/commonFile2.ts ProjectRootPath: undefined
Info 44   [00:01:28.000] 		Projects: /a/b/tsconfig.json
Info 44   [00:01:29.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/file3.ts: *new*
  {}

FsWatches *deleted*::
/a/b/commonfile1.ts:
  {}
/a/b/commonfile2.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info 45   [00:01:30.000] request:
    {
      "command": "applyChangedToOpenFiles",
      "arguments": {
        "openFiles": [
          {
            "fileName": "/a/b/commonFile1.ts",
            "content": "let x = 1"
          }
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info 46   [00:01:31.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 47   [00:01:32.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 4 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 48   [00:01:33.000] Project '/a/b/tsconfig.json' (Configured)
Info 49   [00:01:34.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-1 "let zzz = 10;let zz = 10;let z = 1;"
	/a/b/commonFile1.ts SVC-3-0 "let x = 1"
	/a/b/commonFile2.ts SVC-2-0 "// some copy right notice\nlet y = 1"
	/a/b/file3.ts Text-3 "let xyz = 1;"

Info 50   [00:01:35.000] -----------------------------------------------
Info 51   [00:01:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 51   [00:01:37.000] 	Files (5)

Info 51   [00:01:38.000] -----------------------------------------------
Info 51   [00:01:39.000] Open files: 
Info 51   [00:01:40.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 51   [00:01:41.000] 		Projects: /a/b/tsconfig.json
Info 51   [00:01:42.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 51   [00:01:43.000] 		Projects: /a/b/tsconfig.json
Info 51   [00:01:44.000] 	FileName: /a/b/commonFile2.ts ProjectRootPath: undefined
Info 51   [00:01:45.000] 		Projects: /a/b/tsconfig.json
Info 51   [00:01:46.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
