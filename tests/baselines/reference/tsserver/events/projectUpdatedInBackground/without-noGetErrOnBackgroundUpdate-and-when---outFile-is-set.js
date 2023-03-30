currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/a.ts]
export let x = 1

//// [/a/tsconfig.json]
{"compilerOptions":{"outFile":"/a/out.js"}}

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


Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] Search path: /a
Info 3    [00:00:16.000] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info 4    [00:00:17.000] Creating configuration project /a/tsconfig.json
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [00:00:19.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/tsconfig.json","reason":"Creating possible configured project for /a/a.ts to open"}}
Info 7    [00:00:20.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/a.ts",
  "/a/lib/lib.d.ts"
 ],
 "options": {
  "outFile": "/a/out.js",
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 8    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:24.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 12   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 14   [00:00:27.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:28.000] Project '/a/tsconfig.json' (Configured)
Info 16   [00:00:29.000] 	Files (2)
	/a/a.ts SVC-1-0 "export let x = 1"
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"


	a.ts
	  Matched by default include pattern '**/*'
	lib/lib.d.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:30.000] -----------------------------------------------
Info 18   [00:00:31.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/tsconfig.json"}}
Info 19   [00:00:32.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"bcbb3eb9a7f46ab3b8f574ad3733f3e5a7ce50557c14c0c6192f1203aedcacca","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":16,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"outFile":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 20   [00:00:33.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/a.ts","configFile":"/a/tsconfig.json","diagnostics":[]}}
Info 21   [00:00:34.000] Project '/a/tsconfig.json' (Configured)
Info 21   [00:00:35.000] 	Files (2)

Info 21   [00:00:36.000] -----------------------------------------------
Info 21   [00:00:37.000] Open files: 
Info 21   [00:00:38.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 21   [00:00:39.000] 		Projects: /a/tsconfig.json
Info 21   [00:00:40.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Info 22   [00:00:43.000] DirectoryWatcher:: Triggered with /a/b.ts :: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 23   [00:00:44.000] Scheduled: /a/tsconfig.json
Info 24   [00:00:45.000] Scheduled: *ensureProjectForOpenFiles*
Info 25   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b.ts :: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
1: /a/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/a/b.ts]
export let y = 1


Info 26   [00:00:47.000] Running: /a/tsconfig.json
Info 27   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /a/b.ts 500 undefined WatchType: Closed Script info
Info 28   [00:00:49.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 29   [00:00:50.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:00:51.000] Project '/a/tsconfig.json' (Configured)
Info 31   [00:00:52.000] 	Files (3)
	/a/a.ts SVC-1-0 "export let x = 1"
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b.ts Text-1 "export let y = 1"


	a.ts
	  Matched by default include pattern '**/*'
	lib/lib.d.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

Info 32   [00:00:53.000] -----------------------------------------------
Info 33   [00:00:54.000] Running: *ensureProjectForOpenFiles*
Info 34   [00:00:55.000] Before ensureProjectForOpenFiles:
Info 35   [00:00:56.000] Project '/a/tsconfig.json' (Configured)
Info 35   [00:00:57.000] 	Files (3)

Info 35   [00:00:58.000] -----------------------------------------------
Info 35   [00:00:59.000] Open files: 
Info 35   [00:01:00.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 35   [00:01:01.000] 		Projects: /a/tsconfig.json
Info 35   [00:01:02.000] After ensureProjectForOpenFiles:
Info 36   [00:01:03.000] Project '/a/tsconfig.json' (Configured)
Info 36   [00:01:04.000] 	Files (3)

Info 36   [00:01:05.000] -----------------------------------------------
Info 36   [00:01:06.000] Open files: 
Info 36   [00:01:07.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 36   [00:01:08.000] 		Projects: /a/tsconfig.json
Info 36   [00:01:09.000] got projects updated in background, updating diagnostics for /a/a.ts
Info 37   [00:01:10.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/a.ts"]}}
After running Timeout callback:: count: 1
3: checkOne

PolledWatches::
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/a/b.ts: *new*
  {}

FsWatchesRecursive::
/a:
  {}

Info 38   [00:01:14.000] FileWatcher:: Triggered with /a/b.ts 1:: WatchInfo: /a/b.ts 500 undefined WatchType: Closed Script info
Info 39   [00:01:15.000] Scheduled: /a/tsconfig.json
Info 40   [00:01:16.000] Scheduled: *ensureProjectForOpenFiles*
Info 41   [00:01:17.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b.ts 1:: WatchInfo: /a/b.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 3
3: checkOne
4: /a/tsconfig.json
5: *ensureProjectForOpenFiles*
//// [/a/b.ts]
export let x = 11


Info 42   [00:01:18.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 43   [00:01:19.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 44   [00:01:20.000] Project '/a/tsconfig.json' (Configured)
Info 45   [00:01:21.000] 	Files (3)
	/a/a.ts SVC-1-0 "export let x = 1"
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b.ts Text-2 "export let x = 11"

Info 46   [00:01:22.000] -----------------------------------------------
Info 47   [00:01:23.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/a.ts","diagnostics":[]}}
Info 48   [00:01:24.000] Running: /a/tsconfig.json
Info 49   [00:01:25.000] Running: *ensureProjectForOpenFiles*
Info 50   [00:01:26.000] Before ensureProjectForOpenFiles:
Info 51   [00:01:27.000] Project '/a/tsconfig.json' (Configured)
Info 51   [00:01:28.000] 	Files (3)

Info 51   [00:01:29.000] -----------------------------------------------
Info 51   [00:01:30.000] Open files: 
Info 51   [00:01:31.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 51   [00:01:32.000] 		Projects: /a/tsconfig.json
Info 51   [00:01:33.000] After ensureProjectForOpenFiles:
Info 52   [00:01:34.000] Project '/a/tsconfig.json' (Configured)
Info 52   [00:01:35.000] 	Files (3)

Info 52   [00:01:36.000] -----------------------------------------------
Info 52   [00:01:37.000] Open files: 
Info 52   [00:01:38.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 52   [00:01:39.000] 		Projects: /a/tsconfig.json
Info 52   [00:01:40.000] got projects updated in background, updating diagnostics for /a/a.ts
Info 53   [00:01:41.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/a.ts"]}}
After running Timeout callback:: count: 1
6: checkOne
