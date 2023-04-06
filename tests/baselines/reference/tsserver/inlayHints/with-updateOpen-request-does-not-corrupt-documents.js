currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
declare function foo(param: any): void;
foo(12);

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


Info 1    [00:00:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:21.000] Search path: /a/b
Info 3    [00:00:22.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:23.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:25.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts",
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile1.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:30.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 12   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [00:00:34.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:35.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:36.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "declare function foo(param: any): void;\nfoo(12);"
	/a/b/commonFile1.ts Text-1 "let x = 1"
	/a/b/commonFile2.ts Text-1 "let y = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'
	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:37.000] -----------------------------------------------
Info 19   [00:00:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 19   [00:00:39.000] 	Files (4)

Info 19   [00:00:40.000] -----------------------------------------------
Info 19   [00:00:41.000] Open files: 
Info 19   [00:00:42.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 19   [00:00:43.000] 		Projects: /a/b/tsconfig.json
Info 19   [00:00:44.000] response:
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
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 20   [00:00:45.000] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "includeInlayParameterNameHints": "all"
        }
      },
      "seq": 2,
      "type": "request"
    }
Info 21   [00:00:46.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":2,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 22   [00:00:47.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 23   [00:00:48.000] request:
    {
      "command": "provideInlayHints",
      "arguments": {
        "file": "/a/b/app.ts",
        "start": 0,
        "length": 48
      },
      "seq": 3,
      "type": "request"
    }
Info 24   [00:00:49.000] response:
    {
      "response": [
        {
          "text": "param:",
          "position": {
            "line": 2,
            "offset": 5
          },
          "kind": "Parameter",
          "whitespaceAfter": true
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 25   [00:00:50.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/a/b/app.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 39
                },
                "end": {
                  "line": 1,
                  "offset": 39
                },
                "newText": "//"
              }
            ]
          }
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info 26   [00:00:51.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info 27   [00:00:52.000] request:
    {
      "command": "provideInlayHints",
      "arguments": {
        "file": "/a/b/app.ts",
        "start": 0,
        "length": 48
      },
      "seq": 5,
      "type": "request"
    }
Info 28   [00:00:53.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 29   [00:00:54.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 30   [00:00:55.000] Project '/a/b/tsconfig.json' (Configured)
Info 31   [00:00:56.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-1 "declare function foo(param: any): void//;\nfoo(12);"
	/a/b/commonFile1.ts Text-1 "let x = 1"
	/a/b/commonFile2.ts Text-1 "let y = 1"

Info 32   [00:00:57.000] -----------------------------------------------
Info 33   [00:00:58.000] response:
    {
      "response": [
        {
          "text": "param:",
          "position": {
            "line": 2,
            "offset": 5
          },
          "kind": "Parameter",
          "whitespaceAfter": true
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 34   [00:00:59.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/a/b/app.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 41
                },
                "end": {
                  "line": 1,
                  "offset": 41
                },
                "newText": "c"
              }
            ]
          }
        ]
      },
      "seq": 6,
      "type": "request"
    }
Info 35   [00:01:00.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info 36   [00:01:01.000] request:
    {
      "command": "provideInlayHints",
      "arguments": {
        "file": "/a/b/app.ts",
        "start": 0,
        "length": 48
      },
      "seq": 7,
      "type": "request"
    }
Info 37   [00:01:02.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 38   [00:01:03.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 39   [00:01:04.000] Project '/a/b/tsconfig.json' (Configured)
Info 40   [00:01:05.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-2 "declare function foo(param: any): void//c;\nfoo(12);"
	/a/b/commonFile1.ts Text-1 "let x = 1"
	/a/b/commonFile2.ts Text-1 "let y = 1"

Info 41   [00:01:06.000] -----------------------------------------------
Info 42   [00:01:07.000] response:
    {
      "response": [
        {
          "text": "param:",
          "position": {
            "line": 2,
            "offset": 5
          },
          "kind": "Parameter",
          "whitespaceAfter": true
        }
      ],
      "responseRequired": true
    }
After request
