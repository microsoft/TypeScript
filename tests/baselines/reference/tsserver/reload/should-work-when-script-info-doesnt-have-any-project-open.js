currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts",
        "fileContent": "let z = 1"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a/b
Info seq  [hh:mm:ss:mss] For info: /a/b/app.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "let z = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

contents set during open request:: Content of /a/b/app.ts:: let z = 1
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/b/app.ts: *new*
  {}
/a/lib/lib.d.ts:
  {}

contents of closed file:: Content of /a/b/app.ts:: let x = 1
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
info:: /a/b/app.ts:: 
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "reload",
      "arguments": {
        "file": "/a/b/app.ts",
        "tmpfile": "/a/b/app.tmp"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "reload",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
Info seq  [hh:mm:ss:mss] response:
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

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "reload",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "reload",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
Info seq  [hh:mm:ss:mss] response:
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

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /a/b
Info seq  [hh:mm:ss:mss] For info: /a/b/app.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts Text-4 "let x = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/app.ts:
  {}

contents of file when opened without specifying contents:: Content of /a/b/app.ts:: let x = 1
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/b/app.ts: *new*
  {}
/a/lib/lib.d.ts:
  {}

contents of closed file:: Content of /a/b/app.ts:: let x = 1
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
info:: /a/b/app.ts:: 
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "reload",
      "arguments": {
        "file": "/a/b/app.ts",
        "tmpfile": "/a/b/app.tmp"
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "reload",
      "request_seq": 7,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
Info seq  [hh:mm:ss:mss] response:
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

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "reload",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "reload",
      "request_seq": 8,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
Info seq  [hh:mm:ss:mss] response:
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