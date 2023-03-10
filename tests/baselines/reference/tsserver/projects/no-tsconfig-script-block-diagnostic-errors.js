Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.ts]
 

//// [/a/b/f2.html]
var hello = "hello";

//// [/a/b/tsconfig.json]
{"compilerOptions":{"allowJs":true}}

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


Info 1    [00:00:18.000] request:
    {
      "command": "configure",
      "arguments": {
        "extraFileExtensions": [
          {
            "extension": ".html",
            "scriptKind": 1,
            "isMixedContent": true
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:19.000] reload projects.
Info 3    [00:00:20.000] Before ensureProjectForOpenFiles:
Info 4    [00:00:21.000] Open files: 
Info 4    [00:00:22.000] After ensureProjectForOpenFiles:
Info 5    [00:00:23.000] Open files: 
Info 5    [00:00:24.000] Host file extension mappings updated
Info 6    [00:00:25.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
Info 7    [00:00:26.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 8    [00:00:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/f1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 9    [00:00:28.000] Search path: /a/b
Info 10   [00:00:29.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 11   [00:00:30.000] Creating configuration project /a/b/tsconfig.json
Info 12   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 13   [00:00:32.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts",
  "/a/b/f2.html"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 14   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 15   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 16   [00:00:35.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 17   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 19   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 20   [00:00:39.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:00:40.000] Project '/a/b/tsconfig.json' (Configured)
Info 22   [00:00:41.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.ts SVC-1-0 " "
	/a/b/f2.html Text-1 ""


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by default include pattern '**/*'
	f2.html
	  Matched by default include pattern '**/*'

Info 23   [00:00:42.000] -----------------------------------------------
Info 24   [00:00:43.000] Project '/a/b/tsconfig.json' (Configured)
Info 24   [00:00:44.000] 	Files (3)

Info 24   [00:00:45.000] -----------------------------------------------
Info 24   [00:00:46.000] Open files: 
Info 24   [00:00:47.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 24   [00:00:48.000] 		Projects: /a/b/tsconfig.json
Info 24   [00:00:49.000] response:
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
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 25   [00:00:50.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/tsconfig.json",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info 26   [00:00:51.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Info 27   [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.ts]
 

//// [/a/b/f2.html]
var hello = "hello";

//// [/a/b/tsconfig.json]
{"compilerOptions":{"allowJs":false}}

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


Info 28   [00:00:18.000] request:
    {
      "command": "configure",
      "arguments": {
        "extraFileExtensions": [
          {
            "extension": ".html",
            "scriptKind": 1,
            "isMixedContent": true
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info 29   [00:00:19.000] reload projects.
Info 30   [00:00:20.000] Before ensureProjectForOpenFiles:
Info 31   [00:00:21.000] Open files: 
Info 31   [00:00:22.000] After ensureProjectForOpenFiles:
Info 32   [00:00:23.000] Open files: 
Info 32   [00:00:24.000] Host file extension mappings updated
Info 33   [00:00:25.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
Info 34   [00:00:26.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 35   [00:00:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/f1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 36   [00:00:28.000] Search path: /a/b
Info 37   [00:00:29.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 38   [00:00:30.000] Creating configuration project /a/b/tsconfig.json
Info 39   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 40   [00:00:32.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts"
 ],
 "options": {
  "allowJs": false,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 41   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 42   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 43   [00:00:35.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 44   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 45   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 46   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 47   [00:00:39.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 48   [00:00:40.000] Project '/a/b/tsconfig.json' (Configured)
Info 49   [00:00:41.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.ts SVC-1-0 " "


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by default include pattern '**/*'

Info 50   [00:00:42.000] -----------------------------------------------
Info 51   [00:00:43.000] Project '/a/b/tsconfig.json' (Configured)
Info 51   [00:00:44.000] 	Files (2)

Info 51   [00:00:45.000] -----------------------------------------------
Info 51   [00:00:46.000] Open files: 
Info 51   [00:00:47.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 51   [00:00:48.000] 		Projects: /a/b/tsconfig.json
Info 51   [00:00:49.000] response:
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
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 52   [00:00:50.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/tsconfig.json",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info 53   [00:00:51.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Info 54   [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.ts]
 

//// [/a/b/f2.html]
var hello = "hello";

//// [/a/b/tsconfig.json]
{}

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


Info 55   [00:00:18.000] request:
    {
      "command": "configure",
      "arguments": {
        "extraFileExtensions": [
          {
            "extension": ".html",
            "scriptKind": 1,
            "isMixedContent": true
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info 56   [00:00:19.000] reload projects.
Info 57   [00:00:20.000] Before ensureProjectForOpenFiles:
Info 58   [00:00:21.000] Open files: 
Info 58   [00:00:22.000] After ensureProjectForOpenFiles:
Info 59   [00:00:23.000] Open files: 
Info 59   [00:00:24.000] Host file extension mappings updated
Info 60   [00:00:25.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
Info 61   [00:00:26.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 62   [00:00:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/f1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 63   [00:00:28.000] Search path: /a/b
Info 64   [00:00:29.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 65   [00:00:30.000] Creating configuration project /a/b/tsconfig.json
Info 66   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 67   [00:00:32.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 68   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 69   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 70   [00:00:35.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 71   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 72   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 73   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 74   [00:00:39.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 75   [00:00:40.000] Project '/a/b/tsconfig.json' (Configured)
Info 76   [00:00:41.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.ts SVC-1-0 " "


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by default include pattern '**/*'

Info 77   [00:00:42.000] -----------------------------------------------
Info 78   [00:00:43.000] Project '/a/b/tsconfig.json' (Configured)
Info 78   [00:00:44.000] 	Files (2)

Info 78   [00:00:45.000] -----------------------------------------------
Info 78   [00:00:46.000] Open files: 
Info 78   [00:00:47.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 78   [00:00:48.000] 		Projects: /a/b/tsconfig.json
Info 78   [00:00:49.000] response:
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
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 79   [00:00:50.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/tsconfig.json",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info 80   [00:00:51.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Info 81   [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.ts]
 

//// [/a/b/f2.html]
var hello = "hello";

//// [/a/b/tsconfig.json]
{"compilerOptions":{"allowJs":true},"files":["/a/b/f1.ts","/a/b/f2.html"]}

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


Info 82   [00:00:18.000] request:
    {
      "command": "configure",
      "arguments": {
        "extraFileExtensions": [
          {
            "extension": ".html",
            "scriptKind": 1,
            "isMixedContent": true
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info 83   [00:00:19.000] reload projects.
Info 84   [00:00:20.000] Before ensureProjectForOpenFiles:
Info 85   [00:00:21.000] Open files: 
Info 85   [00:00:22.000] After ensureProjectForOpenFiles:
Info 86   [00:00:23.000] Open files: 
Info 86   [00:00:24.000] Host file extension mappings updated
Info 87   [00:00:25.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
Info 88   [00:00:26.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 89   [00:00:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/f1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 90   [00:00:28.000] Search path: /a/b
Info 91   [00:00:29.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 92   [00:00:30.000] Creating configuration project /a/b/tsconfig.json
Info 93   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 94   [00:00:32.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts",
  "/a/b/f2.html"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 95   [00:00:33.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 96   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 97   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 98   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 99   [00:00:37.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 100  [00:00:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 101  [00:00:39.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.ts SVC-1-0 " "
	/a/b/f2.html Text-1 ""


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Part of 'files' list in tsconfig.json
	f2.html
	  Part of 'files' list in tsconfig.json

Info 102  [00:00:40.000] -----------------------------------------------
Info 103  [00:00:41.000] Project '/a/b/tsconfig.json' (Configured)
Info 103  [00:00:42.000] 	Files (3)

Info 103  [00:00:43.000] -----------------------------------------------
Info 103  [00:00:44.000] Open files: 
Info 103  [00:00:45.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 103  [00:00:46.000] 		Projects: /a/b/tsconfig.json
Info 103  [00:00:47.000] response:
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
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 104  [00:00:48.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/tsconfig.json",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info 105  [00:00:49.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Info 106  [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.ts]
 

//// [/a/b/f2.html]
var hello = "hello";

//// [/a/b/tsconfig.json]
{"compilerOptions":{"allowJs":true},"exclude":["/a/b/f2.html"]}

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


Info 107  [00:00:18.000] request:
    {
      "command": "configure",
      "arguments": {
        "extraFileExtensions": [
          {
            "extension": ".html",
            "scriptKind": 1,
            "isMixedContent": true
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info 108  [00:00:19.000] reload projects.
Info 109  [00:00:20.000] Before ensureProjectForOpenFiles:
Info 110  [00:00:21.000] Open files: 
Info 110  [00:00:22.000] After ensureProjectForOpenFiles:
Info 111  [00:00:23.000] Open files: 
Info 111  [00:00:24.000] Host file extension mappings updated
Info 112  [00:00:25.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
Info 113  [00:00:26.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 114  [00:00:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/f1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 115  [00:00:28.000] Search path: /a/b
Info 116  [00:00:29.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 117  [00:00:30.000] Creating configuration project /a/b/tsconfig.json
Info 118  [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 119  [00:00:32.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 120  [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 121  [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 122  [00:00:35.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 123  [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 124  [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 125  [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 126  [00:00:39.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 127  [00:00:40.000] Project '/a/b/tsconfig.json' (Configured)
Info 128  [00:00:41.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.ts SVC-1-0 " "


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by default include pattern '**/*'

Info 129  [00:00:42.000] -----------------------------------------------
Info 130  [00:00:43.000] Project '/a/b/tsconfig.json' (Configured)
Info 130  [00:00:44.000] 	Files (2)

Info 130  [00:00:45.000] -----------------------------------------------
Info 130  [00:00:46.000] Open files: 
Info 130  [00:00:47.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 130  [00:00:48.000] 		Projects: /a/b/tsconfig.json
Info 130  [00:00:49.000] response:
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
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 131  [00:00:50.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/tsconfig.json",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info 132  [00:00:51.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
