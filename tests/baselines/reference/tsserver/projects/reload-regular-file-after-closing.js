currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
x.

//// [/a/b/lib.ts]
let x: number;

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


Info 1    [00:00:16.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/project",
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          },
          {
            "fileName": "/a/b/lib.ts"
          }
        ],
        "options": {}
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/b/lib.ts 500 undefined WatchType: Closed Script info
Info 4    [00:00:19.000] Starting updateGraphWorker: Project: /a/b/project
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/project WatchType: Type roots
Info 7    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/project WatchType: Type roots
Info 8    [00:00:23.000] Finishing updateGraphWorker: Project: /a/b/project Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:24.000] Project '/a/b/project' (External)
Info 10   [00:00:25.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts Text-1 "x."
	/a/b/lib.ts Text-1 "let x: number;"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation
	lib.ts
	  Root file specified for compilation

Info 11   [00:00:26.000] -----------------------------------------------
Info 12   [00:00:27.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}
/a/b/lib.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 13   [00:00:28.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:29.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:30.000] Project '/a/b/project' (External)
Info 15   [00:00:31.000] 	Files (3)

Info 15   [00:00:32.000] -----------------------------------------------
Info 15   [00:00:33.000] Open files: 
Info 15   [00:00:34.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 15   [00:00:35.000] 		Projects: /a/b/project
Info 15   [00:00:36.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/lib.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/app.ts:
  {}

Before request

Info 16   [00:00:37.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/lib.ts",
        "fileContent": "let x: string"
      },
      "seq": 3,
      "type": "request"
    }
Info 17   [00:00:38.000] FileWatcher:: Close:: WatchInfo: /a/b/lib.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:39.000] Starting updateGraphWorker: Project: /a/b/project
Info 19   [00:00:40.000] Finishing updateGraphWorker: Project: /a/b/project Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 20   [00:00:41.000] Project '/a/b/project' (External)
Info 21   [00:00:42.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts Text-1 "x."
	/a/b/lib.ts SVC-2-0 "let x: string"

Info 22   [00:00:43.000] -----------------------------------------------
Info 23   [00:00:44.000] Project '/a/b/project' (External)
Info 23   [00:00:45.000] 	Files (3)

Info 23   [00:00:46.000] -----------------------------------------------
Info 23   [00:00:47.000] Open files: 
Info 23   [00:00:48.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 23   [00:00:49.000] 		Projects: /a/b/project
Info 23   [00:00:50.000] 	FileName: /a/b/lib.ts ProjectRootPath: undefined
Info 23   [00:00:51.000] 		Projects: /a/b/project
Info 23   [00:00:52.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/lib.ts:
  {}

Before request

Info 24   [00:00:53.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/a/b/app.ts",
        "line": 1,
        "offset": 3
      },
      "seq": 4,
      "type": "request"
    }
Info 25   [00:00:54.000] getCompletionData: Get current token: *
Info 26   [00:00:55.000] getCompletionData: Is inside comment: *
Info 27   [00:00:56.000] getCompletionData: Get previous token: *
Info 28   [00:00:57.000] getCompletionsAtPosition: isCompletionListBlocker: *
Info 29   [00:00:58.000] getCompletionData: Semantic work: *
Info 30   [00:00:59.000] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info 31   [00:01:00.000] response:
    {
      "response": {
        "flags": 0,
        "isGlobalCompletion": false,
        "isMemberCompletion": true,
        "isNewIdentifierLocation": false,
        "entries": [
          {
            "name": "charAt",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          }
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info 32   [00:01:01.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/lib.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 33   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /a/b/lib.ts 500 undefined WatchType: Closed Script info
Info 34   [00:01:03.000] Project '/a/b/project' (External)
Info 34   [00:01:04.000] 	Files (3)

Info 34   [00:01:05.000] -----------------------------------------------
Info 34   [00:01:06.000] Open files: 
Info 34   [00:01:07.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 34   [00:01:08.000] 		Projects: /a/b/project
Info 34   [00:01:09.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/b/lib.ts: *new*
  {}

Before request

Info 35   [00:01:10.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/a/b/app.ts",
        "line": 1,
        "offset": 3
      },
      "seq": 6,
      "type": "request"
    }
Info 36   [00:01:11.000] Starting updateGraphWorker: Project: /a/b/project
Info 37   [00:01:12.000] Finishing updateGraphWorker: Project: /a/b/project Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 38   [00:01:13.000] Project '/a/b/project' (External)
Info 39   [00:01:14.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts Text-1 "x."
	/a/b/lib.ts Text-3 "let x: number;"

Info 40   [00:01:15.000] -----------------------------------------------
Info 41   [00:01:16.000] getCompletionData: Get current token: *
Info 42   [00:01:17.000] getCompletionData: Is inside comment: *
Info 43   [00:01:18.000] getCompletionData: Get previous token: *
Info 44   [00:01:19.000] getCompletionsAtPosition: isCompletionListBlocker: *
Info 45   [00:01:20.000] getCompletionData: Semantic work: *
Info 46   [00:01:21.000] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info 47   [00:01:22.000] response:
    {
      "response": {
        "flags": 0,
        "isGlobalCompletion": false,
        "isMemberCompletion": true,
        "isNewIdentifierLocation": false,
        "entries": [
          {
            "name": "toExponential",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          }
        ]
      },
      "responseRequired": true
    }
After request
