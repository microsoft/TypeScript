currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/commonFile1.ts]
/// <reference path="commonFile2.ts"/>
                    let x = y

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
        "file": "/a/b/commonFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a/b
Info seq  [hh:mm:ss:mss] For info: /a/b/commonFile1.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/commonFile1.ts SVC-1-0 "/// <reference path=\"commonFile2.ts\"/>\n                    let x = y"


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/commonFile2.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/commonFile1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 22
          },
          "end": {
            "line": 1,
            "offset": 36
          },
          "text": "File '/a/b/commonFile2.ts' not found.",
          "code": 6053,
          "category": "error"
        },
        {
          "start": {
            "line": 2,
            "offset": 29
          },
          "end": {
            "line": 2,
            "offset": 30
          },
          "text": "Cannot find name 'y'.",
          "code": 2304,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
After request

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /a/b/commonFile2.ts 0:: WatchInfo: /a/b/commonFile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/commonFile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /a/b/commonFile2.ts 0:: WatchInfo: /a/b/commonFile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Before running Timeout callback:: count: 2
1: /dev/null/inferredProject1*
2: *ensureProjectForOpenFiles*
//// [/a/b/commonFile2.ts]
let y = 1


PolledWatches *deleted*::
/a/b/commonFile2.ts:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

Timeout callback:: count: 2
1: /dev/null/inferredProject1* *new*
2: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] Running: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/commonFile2.ts Text-1 "let y = 1"
	/a/b/commonFile1.ts SVC-1-0 "/// <reference path=\"commonFile2.ts\"/>\n                    let x = y"


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile2.ts
	  Referenced via 'commonFile2.ts' from file 'commonFile1.ts'
	commonFile1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] got projects updated in background /a/b/commonFile1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/a/b/commonFile1.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

FsWatches::
/a/b/commonFile2.ts: *new*
  {}
/a/lib/lib.d.ts:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/commonFile1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
