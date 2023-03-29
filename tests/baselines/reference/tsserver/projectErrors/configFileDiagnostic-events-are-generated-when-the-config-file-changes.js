currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let x = 10

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
{
                    "compilerOptions": {}
                }


Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] Search path: /a/b
Info 3    [00:00:18.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:19.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:21.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/app.ts to open"}}
Info 7    [00:00:22.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 8    [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:25.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 11   [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:29.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:30.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:31.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "let x = 10"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:32.000] -----------------------------------------------
Info 18   [00:00:33.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 19   [00:00:34.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":10,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 20   [00:00:35.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/app.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 21   [00:00:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 21   [00:00:37.000] 	Files (2)

Info 21   [00:00:38.000] -----------------------------------------------
Info 21   [00:00:39.000] Open files: 
Info 21   [00:00:40.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 21   [00:00:41.000] 		Projects: /a/b/tsconfig.json
Info 21   [00:00:42.000] response:
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

Info 22   [00:00:46.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 23   [00:00:47.000] Scheduled: /a/b/tsconfig.json
Info 24   [00:00:48.000] Scheduled: *ensureProjectForOpenFiles*
Info 25   [00:00:49.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /a/b/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/a/b/tsconfig.json]
{
                "compilerOptions": {
                    "haha": 123
                }
            }


Info 26   [00:00:50.000] Running: /a/b/tsconfig.json
Info 27   [00:00:51.000] Reloading configured project /a/b/tsconfig.json
Info 28   [00:00:52.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Change in config file detected"}}
Info 29   [00:00:53.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 30   [00:00:54.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 31   [00:00:55.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 32   [00:00:56.000] Project '/a/b/tsconfig.json' (Configured)
Info 33   [00:00:57.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "let x = 10"

Info 34   [00:00:58.000] -----------------------------------------------
Info 35   [00:00:59.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 36   [00:01:00.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/tsconfig.json","configFile":"/a/b/tsconfig.json","diagnostics":[{"start":{"line":3,"offset":21},"end":{"line":3,"offset":27},"text":"Unknown compiler option 'haha'.","code":5023,"category":"error","fileName":"/a/b/tsconfig.json"}]}}
Info 37   [00:01:01.000] Running: *ensureProjectForOpenFiles*
Info 38   [00:01:02.000] Before ensureProjectForOpenFiles:
Info 39   [00:01:03.000] Project '/a/b/tsconfig.json' (Configured)
Info 39   [00:01:04.000] 	Files (2)

Info 39   [00:01:05.000] -----------------------------------------------
Info 39   [00:01:06.000] Open files: 
Info 39   [00:01:07.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 39   [00:01:08.000] 		Projects: /a/b/tsconfig.json
Info 39   [00:01:09.000] After ensureProjectForOpenFiles:
Info 40   [00:01:10.000] Project '/a/b/tsconfig.json' (Configured)
Info 40   [00:01:11.000] 	Files (2)

Info 40   [00:01:12.000] -----------------------------------------------
Info 40   [00:01:13.000] Open files: 
Info 40   [00:01:14.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 40   [00:01:15.000] 		Projects: /a/b/tsconfig.json
Info 40   [00:01:16.000] got projects updated in background, updating diagnostics for /a/b/app.ts
Info 41   [00:01:17.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/app.ts"]}}
After running Timeout callback:: count: 1
3: checkOne

Info 42   [00:01:21.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 43   [00:01:22.000] Scheduled: /a/b/tsconfig.json
Info 44   [00:01:23.000] Scheduled: *ensureProjectForOpenFiles*
Info 45   [00:01:24.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 3
3: checkOne
4: /a/b/tsconfig.json
5: *ensureProjectForOpenFiles*
//// [/a/b/tsconfig.json]
{
                "compilerOptions": {}
            }


Info 46   [00:01:25.000] Reloading configured project /a/b/tsconfig.json
Info 47   [00:01:26.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Change in config file detected"}}
Info 48   [00:01:27.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 49   [00:01:28.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 50   [00:01:29.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 51   [00:01:30.000] Project '/a/b/tsconfig.json' (Configured)
Info 52   [00:01:31.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "let x = 10"

Info 53   [00:01:32.000] -----------------------------------------------
Info 54   [00:01:33.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 55   [00:01:34.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/tsconfig.json","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 56   [00:01:35.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/app.ts","diagnostics":[]}}
Info 57   [00:01:36.000] Running: /a/b/tsconfig.json
Info 58   [00:01:37.000] Running: *ensureProjectForOpenFiles*
Info 59   [00:01:38.000] Before ensureProjectForOpenFiles:
Info 60   [00:01:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 60   [00:01:40.000] 	Files (2)

Info 60   [00:01:41.000] -----------------------------------------------
Info 60   [00:01:42.000] Open files: 
Info 60   [00:01:43.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 60   [00:01:44.000] 		Projects: /a/b/tsconfig.json
Info 60   [00:01:45.000] After ensureProjectForOpenFiles:
Info 61   [00:01:46.000] Project '/a/b/tsconfig.json' (Configured)
Info 61   [00:01:47.000] 	Files (2)

Info 61   [00:01:48.000] -----------------------------------------------
Info 61   [00:01:49.000] Open files: 
Info 61   [00:01:50.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 61   [00:01:51.000] 		Projects: /a/b/tsconfig.json
Info 61   [00:01:52.000] got projects updated in background, updating diagnostics for /a/b/app.ts
Info 62   [00:01:53.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/app.ts"]}}
After running Timeout callback:: count: 1
6: checkOne
