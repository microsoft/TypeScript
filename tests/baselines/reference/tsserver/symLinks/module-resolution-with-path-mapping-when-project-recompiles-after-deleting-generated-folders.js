currentDirectory:: / useCaseSensitiveFileNames: false
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
{"compilerOptions":{"rootDir":"src","baseUrl":"./","paths":{"@microsoft/*":["../*"]}},"include":["src"]}

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
  "rootDir": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src",
  "baseUrl": "/users/username/projects/myproject/javascript/packages/recognizers-date-time",
  "paths": {
   "@microsoft/*": [
    "../*"
   ]
  },
  "pathsBasePath": "/users/username/projects/myproject/javascript/packages/recognizers-date-time",
  "configFilePath": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json"
 }
}
Info 8    [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Wild card directory
Info 9    [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Wild card directory
Info 10   [00:01:01.000] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 11   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages 0 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages 0 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:01:06.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/package.json 2000 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: File location affecting resolution
Info 16   [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 17   [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 18   [00:01:09.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 19   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 20   [00:01:11.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 21   [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 22   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 23   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info 24   [00:01:15.000] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 25   [00:01:16.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 26   [00:01:17.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts Text-1 "export class C { method(): number; }"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../recognizers-text/dist/types/recognizers-text.d.ts
	  Imported via "@microsoft/recognizers-text" from file 'src/datetime/baseDate.ts'
	src/datetime/baseDate.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 27   [00:01:18.000] -----------------------------------------------
Info 28   [00:01:19.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json"}}
Info 29   [00:01:20.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"a6bd830f3b019a6f703b938422f5798726d0914f0d6f67c2539798ea5e66fed2","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":55,"tsx":0,"tsxSize":0,"dts":2,"dtsSize":370,"deferred":0,"deferredSize":0},"compilerOptions":{"rootDir":"","baseUrl":"","paths":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 30   [00:01:21.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","configFile":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json","diagnostics":[]}}
Info 31   [00:01:22.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 31   [00:01:23.000] 	Files (3)

Info 31   [00:01:24.000] -----------------------------------------------
Info 31   [00:01:25.000] Open files: 
Info 31   [00:01:26.000] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info 31   [00:01:27.000] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 31   [00:01:28.000] response:
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
/users/username/projects/myproject/javascript/packages: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src: *new*
  {}

Before request

Info 32   [00:01:29.000] request:
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
Info 33   [00:01:30.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
1: checkOne

Info 34   [00:01:31.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
1: semanticCheck

Info 35   [00:01:32.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After running Immedidate callback:: count: 1
2: suggestionCheck

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info 36   [00:01:33.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
Info 37   [00:01:34.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
After running Immedidate callback:: count: 0

Info 38   [00:01:36.000] FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 2:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info 39   [00:01:37.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info 40   [00:01:38.000] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 41   [00:01:39.000] Scheduled: *ensureProjectForOpenFiles*
Info 42   [00:01:40.000] Elapsed:: *ms FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 2:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
2: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
3: *ensureProjectForOpenFiles*
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
/users/username/projects/myproject/javascript/packages:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json:
  {}

FsWatches *deleted*::
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src:
  {}

Info 43   [00:01:43.000] Running: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 44   [00:01:44.000] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 45   [00:01:45.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 47   [00:01:47.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 48   [00:01:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 49   [00:01:49.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 50   [00:01:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 51   [00:01:51.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 52   [00:01:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 53   [00:01:53.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 54   [00:01:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 55   [00:01:55.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 56   [00:01:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 57   [00:01:57.000] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 58   [00:01:58.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 59   [00:01:59.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/datetime/baseDate.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 60   [00:02:00.000] -----------------------------------------------
Info 61   [00:02:01.000] Running: *ensureProjectForOpenFiles*
Info 62   [00:02:02.000] Before ensureProjectForOpenFiles:
Info 63   [00:02:03.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 63   [00:02:04.000] 	Files (2)

Info 63   [00:02:05.000] -----------------------------------------------
Info 63   [00:02:06.000] Open files: 
Info 63   [00:02:07.000] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info 63   [00:02:08.000] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 63   [00:02:09.000] After ensureProjectForOpenFiles:
Info 64   [00:02:10.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 64   [00:02:11.000] 	Files (2)

Info 64   [00:02:12.000] -----------------------------------------------
Info 64   [00:02:13.000] Open files: 
Info 64   [00:02:14.000] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info 64   [00:02:15.000] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 64   [00:02:16.000] got projects updated in background, updating diagnostics for /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts
Info 65   [00:02:17.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"]}}
After running Timeout callback:: count: 1
4: checkOne

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
/users/username/projects/myproject/javascript/packages:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules: *new*
  {}

Before running Timeout callback:: count: 1
4: checkOne

Info 66   [00:02:18.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After running Timeout callback:: count: 0

Before request

Info 67   [00:02:19.000] request:
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
Info 68   [00:02:20.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
5: checkOne

Info 69   [00:02:21.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
4: semanticCheck

Info 70   [00:02:22.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":46},"text":"Cannot find module '@microsoft/recognizers-text' or its corresponding type declarations.","code":2307,"category":"error"}]}}
After running Immedidate callback:: count: 1
5: suggestionCheck

Before running Immedidate callback:: count: 1
5: suggestionCheck

Info 71   [00:02:23.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
Info 72   [00:02:24.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
After running Immedidate callback:: count: 0

Info 73   [00:02:29.000] DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 74   [00:02:30.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 75   [00:02:32.000] DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 76   [00:02:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 77   [00:02:35.000] DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 78   [00:02:36.000] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.jsonFailedLookupInvalidation
Info 79   [00:02:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 1
6: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.jsonFailedLookupInvalidation
//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts]
export class C { method(): number; }


Info 80   [00:02:38.000] Running: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.jsonFailedLookupInvalidation
Info 81   [00:02:39.000] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 82   [00:02:40.000] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2
7: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
8: *ensureProjectForOpenFiles*

Before running Timeout callback:: count: 2
7: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
8: *ensureProjectForOpenFiles*

Info 83   [00:02:41.000] Running: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 84   [00:02:42.000] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 85   [00:02:43.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info 86   [00:02:44.000] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 87   [00:02:45.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 88   [00:02:46.000] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 89   [00:02:47.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 90   [00:02:48.000] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 91   [00:02:49.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 92   [00:02:50.000] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 93   [00:02:51.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 94   [00:02:52.000] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 95   [00:02:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 96   [00:02:54.000] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 97   [00:02:55.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info 98   [00:02:56.000] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 99   [00:02:57.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 100  [00:02:58.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts Text-2 "export class C { method(): number; }"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../recognizers-text/dist/types/recognizers-text.d.ts
	  Imported via "@microsoft/recognizers-text" from file 'src/datetime/baseDate.ts'
	src/datetime/baseDate.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 101  [00:02:59.000] -----------------------------------------------
Info 102  [00:03:00.000] Running: *ensureProjectForOpenFiles*
Info 103  [00:03:01.000] Before ensureProjectForOpenFiles:
Info 104  [00:03:02.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 104  [00:03:03.000] 	Files (3)

Info 104  [00:03:04.000] -----------------------------------------------
Info 104  [00:03:05.000] Open files: 
Info 104  [00:03:06.000] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info 104  [00:03:07.000] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 104  [00:03:08.000] After ensureProjectForOpenFiles:
Info 105  [00:03:09.000] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info 105  [00:03:10.000] 	Files (3)

Info 105  [00:03:11.000] -----------------------------------------------
Info 105  [00:03:12.000] Open files: 
Info 105  [00:03:13.000] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info 105  [00:03:14.000] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info 105  [00:03:15.000] got projects updated in background, updating diagnostics for /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts
Info 106  [00:03:16.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"]}}
After running Timeout callback:: count: 1
9: checkOne

PolledWatches::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/myproject/javascript/packages/node_modules:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/node_modules:
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/myproject/javascript/packages:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src:
  {}

FsWatchesRecursive *deleted*::
/users/username/projects/myproject/javascript/packages/recognizers-text:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules:
  {}

Before request

Info 107  [00:03:17.000] request:
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
Info 108  [00:03:18.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
10: checkOne

Info 109  [00:03:19.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
6: semanticCheck

Info 110  [00:03:20.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
After running Immedidate callback:: count: 1
7: suggestionCheck

Before running Immedidate callback:: count: 1
7: suggestionCheck

Info 111  [00:03:21.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts","diagnostics":[]}}
Info 112  [00:03:22.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":4}}
After running Immedidate callback:: count: 0
