currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let x = 1

//// [/a/b/app.tmp]
const y = 42

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
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts",
        "fileContent": "let z = 1"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] Search path: /a/b
Info 3    [00:00:18.000] For info: /a/b/app.ts :: No config files found.
Info 4    [00:00:19.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:23.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:25.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "let z = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation

Info 11   [00:00:26.000] -----------------------------------------------
Info 12   [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:28.000] 	Files (2)

Info 12   [00:00:29.000] -----------------------------------------------
Info 12   [00:00:30.000] Open files: 
Info 12   [00:00:31.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 12   [00:00:32.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:00:33.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

contents set during open request:: Content of /a/b/app.ts:: let z = 1
Before request

Info 13   [00:00:34.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:00:37.000] 	Files (2)

Info 15   [00:00:38.000] -----------------------------------------------
Info 15   [00:00:39.000] Open files: 
Info 15   [00:00:40.000] response:
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
/a/b/app.ts: *new*
  {}

contents of closed file:: Content of /a/b/app.ts:: let x = 1
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
info:: /a/b/app.ts:: 
Before request

Info 16   [00:00:41.000] request:
    {
      "command": "reload",
      "arguments": {
        "file": "/a/b/app.ts",
        "tmpfile": "/a/b/app.tmp"
      },
      "seq": 3,
      "type": "request"
    }
Info 17   [00:00:42.000] response:
    {"seq":0,"type":"response","command":"reload","request_seq":3,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 18   [00:00:43.000] response:
    {
      "response": {
        "reloadFinished": true
      },
      "responseRequired": true
    }
After request

contents of temp file:: Content of /a/b/app.ts:: const y = 42
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
info:: /a/b/app.ts:: 
Before request

Info 19   [00:00:44.000] request:
    {
      "command": "reload",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 20   [00:00:45.000] response:
    {"seq":0,"type":"response","command":"reload","request_seq":4,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 21   [00:00:46.000] response:
    {
      "response": {
        "reloadFinished": true
      },
      "responseRequired": true
    }
After request

contents of closed file:: Content of /a/b/app.ts:: let x = 1
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
info:: /a/b/app.ts:: 
Before request

Info 22   [00:00:47.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 23   [00:00:48.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 24   [00:00:49.000] Search path: /a/b
Info 25   [00:00:50.000] For info: /a/b/app.ts :: No config files found.
Info 26   [00:00:51.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 27   [00:00:52.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 28   [00:00:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:00:54.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts Text-4 "let x = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation

Info 30   [00:00:55.000] -----------------------------------------------
Info 31   [00:00:56.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:00:57.000] 	Files (2)

Info 31   [00:00:58.000] -----------------------------------------------
Info 31   [00:00:59.000] Open files: 
Info 31   [00:01:00.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 31   [00:01:01.000] 		Projects: /dev/null/inferredProject1*
Info 31   [00:01:02.000] response:
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
/a/b/app.ts:
  {}

contents of file when opened without specifying contents:: Content of /a/b/app.ts:: let x = 1
Before request

Info 32   [00:01:03.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info 33   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 34   [00:01:05.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [00:01:06.000] 	Files (2)

Info 34   [00:01:07.000] -----------------------------------------------
Info 34   [00:01:08.000] Open files: 
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
/a/b/app.ts: *new*
  {}

contents of closed file:: Content of /a/b/app.ts:: let x = 1
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
info:: /a/b/app.ts:: 
Before request

Info 35   [00:01:10.000] request:
    {
      "command": "reload",
      "arguments": {
        "file": "/a/b/app.ts",
        "tmpfile": "/a/b/app.tmp"
      },
      "seq": 7,
      "type": "request"
    }
Info 36   [00:01:11.000] response:
    {"seq":0,"type":"response","command":"reload","request_seq":7,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 37   [00:01:12.000] response:
    {
      "response": {
        "reloadFinished": true
      },
      "responseRequired": true
    }
After request

contents of temp file:: Content of /a/b/app.ts:: const y = 42
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
info:: /a/b/app.ts:: 
Before request

Info 38   [00:01:13.000] request:
    {
      "command": "reload",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info 39   [00:01:14.000] response:
    {"seq":0,"type":"response","command":"reload","request_seq":8,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 40   [00:01:15.000] response:
    {
      "response": {
        "reloadFinished": true
      },
      "responseRequired": true
    }
After request

contents of closed file:: Content of /a/b/app.ts:: let x = 1
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
info:: /a/b/app.ts:: 