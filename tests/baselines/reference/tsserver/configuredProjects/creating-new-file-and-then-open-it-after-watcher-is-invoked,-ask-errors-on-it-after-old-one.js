Info 0    [16:00:27.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:28.000] request:
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
{"include":["./src"]}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:29.000] Search path: /user/username/projects/myproject/src
Info 3    [16:00:30.000] For info: /user/username/projects/myproject/src/foo.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [16:00:31.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [16:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [16:00:33.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/foo.ts to open"}}
Info 7    [16:00:34.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/bar.ts",
  "/user/username/projects/myproject/src/foo.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 8    [16:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:37.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/bar.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:39.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 13   [16:00:40.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [16:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [16:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 16   [16:00:43.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [16:00:44.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 18   [16:00:45.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/bar.ts
	/user/username/projects/myproject/src/foo.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/bar.ts
	  Matched by include pattern './src' in 'tsconfig.json'
	src/foo.ts
	  Matched by include pattern './src' in 'tsconfig.json'

Info 19   [16:00:46.000] -----------------------------------------------
Info 20   [16:00:47.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 21   [16:00:48.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":50,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 22   [16:00:49.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/foo.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 23   [16:00:50.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 23   [16:00:51.000] 	Files (3)

Info 23   [16:00:52.000] -----------------------------------------------
Info 23   [16:00:53.000] Open files: 
Info 23   [16:00:54.000] 	FileName: /user/username/projects/myproject/src/foo.ts ProjectRootPath: /user/username/projects/myproject
Info 23   [16:00:55.000] 		Projects: /user/username/projects/myproject/tsconfig.json

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 23   [16:00:56.000] response:
    {
      "responseRequired": false
    }
Info 24   [16:00:59.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/sub/fooBar.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 25   [16:01:00.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 26   [16:01:01.000] Scheduled: *ensureProjectForOpenFiles*
Info 27   [16:01:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/sub/fooBar.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 28   [16:01:03.000] request:
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
//// [/user/username/projects/myproject/src/sub/fooBar.ts]
export function fooBar() { }


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 29   [16:01:04.000] Search path: /user/username/projects/myproject/src/sub
Info 30   [16:01:05.000] For info: /user/username/projects/myproject/src/sub/fooBar.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 31   [16:01:06.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 32   [16:01:07.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 33   [16:01:08.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 34   [16:01:09.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/bar.ts
	/user/username/projects/myproject/src/foo.ts
	/user/username/projects/myproject/src/sub/fooBar.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/bar.ts
	  Matched by include pattern './src' in 'tsconfig.json'
	src/foo.ts
	  Matched by include pattern './src' in 'tsconfig.json'
	src/sub/fooBar.ts
	  Matched by include pattern './src' in 'tsconfig.json'

Info 35   [16:01:10.000] -----------------------------------------------
Info 36   [16:01:11.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 36   [16:01:12.000] 	Files (4)

Info 36   [16:01:13.000] -----------------------------------------------
Info 36   [16:01:14.000] Open files: 
Info 36   [16:01:15.000] 	FileName: /user/username/projects/myproject/src/foo.ts ProjectRootPath: /user/username/projects/myproject
Info 36   [16:01:16.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 36   [16:01:17.000] 	FileName: /user/username/projects/myproject/src/sub/fooBar.ts ProjectRootPath: /user/username/projects/myproject
Info 36   [16:01:18.000] 		Projects: /user/username/projects/myproject/tsconfig.json

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 36   [16:01:19.000] response:
    {
      "responseRequired": false
    }
Info 37   [16:01:20.000] request:
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

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 38   [16:01:21.000] response:
    {
      "responseRequired": false
    }
Info 39   [16:01:22.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/foo.ts","diagnostics":[]}}
Info 40   [16:01:23.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/foo.ts","diagnostics":[]}}
Info 41   [16:01:24.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/foo.ts","diagnostics":[]}}
Info 42   [16:01:25.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/sub/fooBar.ts","diagnostics":[]}}
Info 43   [16:01:26.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/sub/fooBar.ts","diagnostics":[]}}
Info 44   [16:01:27.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/sub/fooBar.ts","diagnostics":[]}}
Info 45   [16:01:28.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}