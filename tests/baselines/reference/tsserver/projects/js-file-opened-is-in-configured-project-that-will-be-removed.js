Info 0    [00:00:37.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:38.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/mocks/cssMock.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"allowJs":true}}

//// [/user/username/projects/myproject/mocks/cssMock.js]
function foo() { }

//// [/user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js]
function bar() { }

//// [/user/username/projects/myproject/apps/editor/tsconfig.json]
{"extends":"../../tsconfig.json","include":["./src"]}

//// [/user/username/projects/myproject/apps/editor/src/src.js]
function fooBar() { }

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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:39.000] Search path: /user/username/projects/myproject/mocks
Info 3    [00:00:40.000] For info: /user/username/projects/myproject/mocks/cssMock.js :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:41.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:43.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/mocks/cssMock.js to open"}}
Info 7    [00:00:44.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js",
  "/user/username/projects/myproject/apps/editor/src/src.js",
  "/user/username/projects/myproject/mocks/cssMock.js"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 8    [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js 500 undefined WatchType: Closed Script info
Info 11   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/src/src.js 500 undefined WatchType: Closed Script info
Info 12   [00:00:49.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 13   [00:00:50.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 16   [00:00:53.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:54.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 18   [00:00:55.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js
	/user/username/projects/myproject/apps/editor/src/src.js
	/user/username/projects/myproject/mocks/cssMock.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	apps/editor/scripts/createConfigVariable.js
	  Matched by default include pattern '**/*'
	apps/editor/src/src.js
	  Matched by default include pattern '**/*'
	mocks/cssMock.js
	  Matched by default include pattern '**/*'

Info 19   [00:00:56.000] -----------------------------------------------
Info 20   [00:00:57.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 21   [00:00:58.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":3,"jsSize":57,"jsx":0,"jsxSize":0,"ts":0,"tsSize":0,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"allowJs":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 22   [00:00:59.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/mocks/cssMock.js","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[{"text":"Cannot write file '/user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js' because it would overwrite input file.","code":5055,"category":"error"},{"text":"Cannot write file '/user/username/projects/myproject/apps/editor/src/src.js' because it would overwrite input file.","code":5055,"category":"error"},{"text":"Cannot write file '/user/username/projects/myproject/mocks/cssMock.js' because it would overwrite input file.","code":5055,"category":"error"}]}}
Info 23   [00:01:00.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 23   [00:01:01.000] 	Files (4)

Info 23   [00:01:02.000] -----------------------------------------------
Info 23   [00:01:03.000] Open files: 
Info 23   [00:01:04.000] 	FileName: /user/username/projects/myproject/mocks/cssMock.js ProjectRootPath: undefined
Info 23   [00:01:05.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/apps/editor/scripts/createconfigvariable.js:
  {}
/user/username/projects/myproject/apps/editor/src/src.js:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 23   [00:01:06.000] response:
    {
      "responseRequired": false
    }
Info 24   [00:01:07.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/mocks/cssMock.js"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/apps/editor/scripts/createconfigvariable.js:
  {}
/user/username/projects/myproject/apps/editor/src/src.js:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 25   [00:01:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/mocks/cssMock.js 500 undefined WatchType: Closed Script info
Info 26   [00:01:09.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 26   [00:01:10.000] 	Files (4)

Info 26   [00:01:11.000] -----------------------------------------------
Info 26   [00:01:12.000] Open files: 
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/apps/editor/scripts/createconfigvariable.js:
  {}
/user/username/projects/myproject/apps/editor/src/src.js:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/mocks/cssmock.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 26   [00:01:13.000] response:
    {
      "responseRequired": false
    }
Info 27   [00:01:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/apps/editor/scripts/createconfigvariable.js:
  {}
/user/username/projects/myproject/apps/editor/src/src.js:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/mocks/cssmock.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 28   [00:01:15.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js 500 undefined WatchType: Closed Script info
Info 29   [00:01:16.000] Search path: /user/username/projects/myproject/apps/editor/scripts
Info 30   [00:01:17.000] For info: /user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js :: Config file name: /user/username/projects/myproject/apps/editor/tsconfig.json
Info 31   [00:01:18.000] Creating configuration project /user/username/projects/myproject/apps/editor/tsconfig.json
Info 32   [00:01:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Config file
Info 33   [00:01:20.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/apps/editor/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js to open"}}
Info 34   [00:01:21.000] Config: /user/username/projects/myproject/apps/editor/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/apps/editor/src/src.js"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/user/username/projects/myproject/apps/editor/tsconfig.json"
 }
}
Info 35   [00:01:22.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Extended config file
Info 36   [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/src 1 undefined Config: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Wild card directory
Info 37   [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/src 1 undefined Config: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Wild card directory
Info 38   [00:01:25.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/apps/editor/tsconfig.json
Info 39   [00:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/node_modules/@types 1 undefined Project: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Type roots
Info 40   [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/node_modules/@types 1 undefined Project: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Type roots
Info 41   [00:01:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/node_modules/@types 1 undefined Project: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Type roots
Info 42   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/node_modules/@types 1 undefined Project: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Type roots
Info 43   [00:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Type roots
Info 44   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/apps/editor/tsconfig.json WatchType: Type roots
Info 45   [00:01:32.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/apps/editor/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 46   [00:01:33.000] Project '/user/username/projects/myproject/apps/editor/tsconfig.json' (Configured)
Info 47   [00:01:34.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/apps/editor/src/src.js


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/src.js
	  Matched by include pattern './src' in 'tsconfig.json'

Info 48   [00:01:35.000] -----------------------------------------------
Info 49   [00:01:36.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/apps/editor/tsconfig.json"}}
Info 50   [00:01:37.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"3a35a87188335633b0bee242201aa5e01b96dbee6cfae401ebff6e26120b2aa7","fileStats":{"js":1,"jsSize":21,"jsx":0,"jsxSize":0,"ts":0,"tsSize":0,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"allowJs":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":true,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 51   [00:01:38.000] `remove Project::
Info 52   [00:01:39.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 53   [00:01:40.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js
	/user/username/projects/myproject/apps/editor/src/src.js
	/user/username/projects/myproject/mocks/cssMock.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	apps/editor/scripts/createConfigVariable.js
	  Matched by default include pattern '**/*'
	apps/editor/src/src.js
	  Matched by default include pattern '**/*'
	mocks/cssMock.js
	  Matched by default include pattern '**/*'

Info 54   [00:01:41.000] -----------------------------------------------
Info 55   [00:01:42.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 56   [00:01:43.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 57   [00:01:44.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 58   [00:01:45.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 59   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 60   [00:01:47.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/mocks/cssMock.js 500 undefined WatchType: Closed Script info
Info 61   [00:01:48.000] Before ensureProjectForOpenFiles:
Info 62   [00:01:49.000] Project '/user/username/projects/myproject/apps/editor/tsconfig.json' (Configured)
Info 62   [00:01:50.000] 	Files (2)

Info 62   [00:01:51.000] -----------------------------------------------
Info 62   [00:01:52.000] Open files: 
Info 62   [00:01:53.000] 	FileName: /user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js ProjectRootPath: undefined
Info 62   [00:01:54.000] 		Projects: 
Info 62   [00:01:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/scripts/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 63   [00:01:56.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/scripts/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 64   [00:01:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 65   [00:01:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 66   [00:01:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 67   [00:02:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 68   [00:02:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 69   [00:02:02.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 70   [00:02:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/scripts/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 71   [00:02:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/scripts/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 72   [00:02:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 73   [00:02:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/editor/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 74   [00:02:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 75   [00:02:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/apps/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 76   [00:02:09.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 77   [00:02:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 78   [00:02:11.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 79   [00:02:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 80   [00:02:13.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	createConfigVariable.js
	  Root file specified for compilation

Info 81   [00:02:14.000] -----------------------------------------------
Info 82   [00:02:15.000] After ensureProjectForOpenFiles:
Info 83   [00:02:16.000] Project '/user/username/projects/myproject/apps/editor/tsconfig.json' (Configured)
Info 83   [00:02:17.000] 	Files (2)

Info 83   [00:02:18.000] -----------------------------------------------
Info 83   [00:02:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 83   [00:02:20.000] 	Files (2)

Info 83   [00:02:21.000] -----------------------------------------------
Info 83   [00:02:22.000] Open files: 
Info 83   [00:02:23.000] 	FileName: /user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js ProjectRootPath: undefined
Info 83   [00:02:24.000] 		Projects: /dev/null/inferredProject1*
Info 83   [00:02:25.000] Project '/user/username/projects/myproject/apps/editor/tsconfig.json' (Configured)
Info 83   [00:02:26.000] 	Files (2)

Info 83   [00:02:27.000] -----------------------------------------------
Info 83   [00:02:28.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 83   [00:02:29.000] 	Files (2)

Info 83   [00:02:30.000] -----------------------------------------------
Info 83   [00:02:31.000] Open files: 
Info 83   [00:02:32.000] 	FileName: /user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js ProjectRootPath: undefined
Info 83   [00:02:33.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/apps/editor/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/apps/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/apps/editor/scripts/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/apps/editor/scripts/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/apps/editor/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/apps/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/apps/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/apps/editor/scripts/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/apps/editor/scripts/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/apps/editor/scripts/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/apps/editor/src/src.js:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/apps/editor/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/apps/editor/src:
  {}

Info 83   [00:02:34.000] response:
    {
      "responseRequired": false
    }