Info 0    [00:00:51.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
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

//// [/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts]
import {C} from "@microsoft/recognizers-text";
new C();

//// [/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json]
{"include":["src"]}

//// [/users/username/projects/myproject/javascript/packages/recognizers-text/src/recognizers-text.ts]
export class C { method () { return 10; } }

//// [/users/username/projects/myproject/javascript/packages/recognizers-text/package.json]
{"typings":"dist/types/recognizers-text.d.ts"}

//// [/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text] symlink(/users/username/projects/myproject/javascript/packages/recognizers-text)
//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts]
export class C { method(): number; }


Info 1    [00:00:52.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "projectRootPath": "/users/username/projects/myproject"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:53.000] Search path: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime
Info 3    [00:00:54.000] For info: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts :: Config file name: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 4    [00:00:55.000] Creating configuration project /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 5    [00:00:56.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json 2000 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Config file
Info 6    [00:00:57.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json","reason":"Creating possible configured project for /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts to open"}}
Info 7    [00:00:58.000] Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json"
 }
}
Info 8    [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Wild card directory
Info 9    [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Wild card directory
Info 10   [00:01:01.000] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 11   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:01:08.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/package.json 2000 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: File location affecting resolution
Info 18   [00:01:09.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 19   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 20   [00:01:11.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 21   [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 22   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 23   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 24   [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 25   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 26   [00:01:17.000] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 27   [00:01:18.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 28   [00:01:19.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts Text-1 "export class C { method(): number; }"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../recognizers-text/dist/types/recognizers-text.d.ts
	  Imported via "@microsoft/recognizers-text" from file 'src/datetime/baseDate.ts'
	src/datetime/baseDate.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 29   [00:01:20.000] -----------------------------------------------
Info 30   [00:01:21.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json"}}
Info 31   [00:01:22.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"a6bd830f3b019a6f703b938422f5798726d0914f0d6f67c2539798ea5e66fed2","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":55,"tsx":0,"tsxSize":0,"dts":2,"dtsSize":370,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 32   [00:01:23.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","configFile":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json","diagnostics":[]}}
Info 33   [00:01:24.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 33   [00:01:25.000] 	Files (3)

Info 33   [00:01:26.000] -----------------------------------------------
Info 33   [00:01:27.000] Open files: 
Info 33   [00:01:28.000] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info 33   [00:01:29.000] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 33   [00:01:30.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules: *new*
  {}

Before request

Info 34   [00:01:31.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info 35   [00:01:32.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 36   [00:01:33.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 37   [00:01:34.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 38   [00:01:35.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
Info 39   [00:01:36.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)

Info 40   [00:01:38.000] FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 2:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info 41   [00:01:39.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info 42   [00:01:40.000] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 43   [00:01:41.000] Scheduled: *ensureProjectForOpenFiles*
Info 44   [00:01:42.000] Elapsed:: *ms FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 2:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Before running timeout callbacks
//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts] deleted

PolledWatches::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json:
  {}

FsWatches *deleted*::
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules:
  {}

Info 45   [00:01:45.000] Running: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 46   [00:01:46.000] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 47   [00:01:47.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 48   [00:01:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 49   [00:01:49.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 50   [00:01:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 51   [00:01:51.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 52   [00:01:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 53   [00:01:53.000] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 54   [00:01:54.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 55   [00:01:55.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/datetime/baseDate.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 56   [00:01:56.000] -----------------------------------------------
Info 57   [00:01:57.000] Running: *ensureProjectForOpenFiles*
Info 58   [00:01:58.000] Before ensureProjectForOpenFiles:
Info 59   [00:01:59.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 59   [00:02:00.000] 	Files (2)

Info 59   [00:02:01.000] -----------------------------------------------
Info 59   [00:02:02.000] Open files: 
Info 59   [00:02:03.000] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info 59   [00:02:04.000] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 59   [00:02:05.000] After ensureProjectForOpenFiles:
Info 60   [00:02:06.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 60   [00:02:07.000] 	Files (2)

Info 60   [00:02:08.000] -----------------------------------------------
Info 60   [00:02:09.000] Open files: 
Info 60   [00:02:10.000] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info 60   [00:02:11.000] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 60   [00:02:12.000] got projects updated in background, updating diagnostics for /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts
Info 61   [00:02:13.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"]}}
After running timeout callbacks

PolledWatches::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules:
  {}

Before running timeout callbacks

Info 62   [00:02:14.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After running timeout callbacks

Before request

Info 63   [00:02:15.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 64   [00:02:16.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 65   [00:02:17.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 66   [00:02:18.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":46},"text":"Cannot find module '@microsoft/recognizers-text' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 67   [00:02:19.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
Info 68   [00:02:20.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)

Before running timeout callbacks
//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts]
export class C { method(): number; }


After running timeout callbacks

Before running timeout callbacks

After running timeout callbacks

Before request

Info 69   [00:02:27.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info 70   [00:02:28.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 71   [00:02:29.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 72   [00:02:30.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":46},"text":"Cannot find module '@microsoft/recognizers-text' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 73   [00:02:31.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
Info 74   [00:02:32.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":4}}
Before running immediate callbacks and checking length (1)
