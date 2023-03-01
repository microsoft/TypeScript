Info 0    [00:00:27.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/src/foo.ts]
export function foo() { }

//// [/user/username/projects/myproject/src/bar.ts]
export function bar() { }

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

//// [/user/username/projects/myproject/tsconfig.json]
{"include":["./src"],"exclude":["./src/sub"]}


Info 1    [00:00:28.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/foo.ts",
        "fileContent": "export function foo() { }",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:29.000] Search path: /user/username/projects/myproject/src
Info 3    [00:00:30.000] For info: /user/username/projects/myproject/src/foo.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:31.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:33.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/foo.ts to open"}}
Info 7    [00:00:34.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/bar.ts",
  "/user/username/projects/myproject/src/foo.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 8    [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/bar.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:38.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 12   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [00:00:42.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:43.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:44.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/bar.ts Text-1 "export function bar() { }"
	/user/username/projects/myproject/src/foo.ts SVC-1-0 "export function foo() { }"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/bar.ts
	  Matched by include pattern './src' in 'tsconfig.json'
	src/foo.ts
	  Matched by include pattern './src' in 'tsconfig.json'

Info 18   [00:00:45.000] -----------------------------------------------
Info 19   [00:00:46.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 20   [00:00:47.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":50,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":true,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 21   [00:00:48.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/foo.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 22   [00:00:49.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 22   [00:00:50.000] 	Files (3)

Info 22   [00:00:51.000] -----------------------------------------------
Info 22   [00:00:52.000] Open files: 
Info 22   [00:00:53.000] 	FileName: /user/username/projects/myproject/src/foo.ts ProjectRootPath: /user/username/projects/myproject
Info 22   [00:00:54.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 22   [00:00:55.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/src/bar.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src: *new*
  {}

Info 23   [00:00:58.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/sub/fooBar.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 24   [00:00:59.000] Project: /user/username/projects/myproject/tsconfig.json Detected excluded file: /user/username/projects/myproject/src/sub/fooBar.ts
Info 25   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/sub/fooBar.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before request
//// [/user/username/projects/myproject/src/sub/fooBar.ts]
export function fooBar() { }


Info 26   [00:01:01.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/sub/fooBar.ts",
        "fileContent": "export function fooBar() { }",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 2,
      "type": "request"
    }
Info 27   [00:01:02.000] Search path: /user/username/projects/myproject/src/sub
Info 28   [00:01:03.000] For info: /user/username/projects/myproject/src/sub/fooBar.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 29   [00:01:04.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/sub/fooBar.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 30   [00:01:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/sub/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 31   [00:01:06.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/sub/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 32   [00:01:07.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 33   [00:01:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 34   [00:01:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 35   [00:01:10.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 36   [00:01:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/sub/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 37   [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/sub/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 38   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 39   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 40   [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 41   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 42   [00:01:17.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 43   [00:01:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 44   [00:01:19.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/sub/fooBar.ts SVC-1-0 "export function fooBar() { }"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	fooBar.ts
	  Root file specified for compilation

Info 45   [00:01:20.000] -----------------------------------------------
Info 46   [00:01:21.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 46   [00:01:22.000] 	Files (3)

Info 46   [00:01:23.000] -----------------------------------------------
Info 46   [00:01:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 46   [00:01:25.000] 	Files (2)

Info 46   [00:01:26.000] -----------------------------------------------
Info 46   [00:01:27.000] Open files: 
Info 46   [00:01:28.000] 	FileName: /user/username/projects/myproject/src/foo.ts ProjectRootPath: /user/username/projects/myproject
Info 46   [00:01:29.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 46   [00:01:30.000] 	FileName: /user/username/projects/myproject/src/sub/fooBar.ts ProjectRootPath: /user/username/projects/myproject
Info 46   [00:01:31.000] 		Projects: /dev/null/inferredProject1*
Info 46   [00:01:32.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/sub/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/sub/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/sub/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/src/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/bar.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before request

Info 47   [00:01:33.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/foo.ts",
          "/user/username/projects/myproject/src/sub/fooBar.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 48   [00:01:34.000] response:
    {
      "responseRequired": false
    }
After request

Checking timeout queue length: 1

Before running timeout callback1

Info 49   [00:01:35.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/foo.ts","diagnostics":[]}}
After running timeout callback1

Before running immediate callbacks and checking length (1)

Info 50   [00:01:36.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/foo.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 51   [00:01:37.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/foo.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Checking timeout queue length: 1

Before running timeout callback2

Info 52   [00:01:38.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/sub/fooBar.ts","diagnostics":[]}}
After running timeout callback2

Before running immediate callbacks and checking length (1)

Info 53   [00:01:39.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/sub/fooBar.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 54   [00:01:40.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/sub/fooBar.ts","diagnostics":[]}}
Info 55   [00:01:41.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)
