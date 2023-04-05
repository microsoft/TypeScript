currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/user/username/projects/a/a.ts]
export class A { }

//// [/user/username/projects/a/tsconfig.json]
{}


Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/a/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Search path: /user/username/projects/a
Info 3    [00:00:24.000] For info: /user/username/projects/a/a.ts :: Config file name: /user/username/projects/a/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /user/username/projects/a/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/tsconfig.json 2000 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/a/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/a/a.ts to open"}}
Info 7    [00:00:28.000] Config: /user/username/projects/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/a/a.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/a/tsconfig.json"
 }
}
Info 8    [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a 1 undefined Config: /user/username/projects/a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a 1 undefined Config: /user/username/projects/a/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:31.000] Starting updateGraphWorker: Project: /user/username/projects/a/tsconfig.json
Info 11   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Type roots
Info 13   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Type roots
Info 14   [00:00:35.000] Finishing updateGraphWorker: Project: /user/username/projects/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:36.000] Project '/user/username/projects/a/tsconfig.json' (Configured)
Info 16   [00:00:37.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/a/a.ts SVC-1-0 "export class A { }"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:38.000] -----------------------------------------------
Info 18   [00:00:39.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/a/tsconfig.json"}}
Info 19   [00:00:40.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"20a91f8dffe761e39e0ada0a62a3058faad15d4a8c135539aaccd61bb5497dea","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":18,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 20   [00:00:41.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/a/a.ts","configFile":"/user/username/projects/a/tsconfig.json","diagnostics":[]}}
Info 21   [00:00:42.000] Project '/user/username/projects/a/tsconfig.json' (Configured)
Info 21   [00:00:43.000] 	Files (2)

Info 21   [00:00:44.000] -----------------------------------------------
Info 21   [00:00:45.000] Open files: 
Info 21   [00:00:46.000] 	FileName: /user/username/projects/a/a.ts ProjectRootPath: undefined
Info 21   [00:00:47.000] 		Projects: /user/username/projects/a/tsconfig.json
Info 21   [00:00:48.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/a/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/a: *new*
  {}

Info 22   [00:00:52.000] FileWatcher:: Triggered with /user/username/projects/a/tsconfig.json 1:: WatchInfo: /user/username/projects/a/tsconfig.json 2000 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Config file
Info 23   [00:00:53.000] Scheduled: /user/username/projects/a/tsconfig.json
Info 24   [00:00:54.000] Scheduled: *ensureProjectForOpenFiles*
Info 25   [00:00:55.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/a/tsconfig.json 1:: WatchInfo: /user/username/projects/a/tsconfig.json 2000 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /user/username/projects/a/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/user/username/projects/a/tsconfig.json] file written with same contents

Info 26   [00:00:56.000] Running: /user/username/projects/a/tsconfig.json
Info 27   [00:00:57.000] Reloading configured project /user/username/projects/a/tsconfig.json
Info 28   [00:00:58.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/a/tsconfig.json","reason":"Change in config file detected"}}
Info 29   [00:00:59.000] Config: /user/username/projects/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/a/a.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/a/tsconfig.json"
 }
}
Info 30   [00:01:00.000] Starting updateGraphWorker: Project: /user/username/projects/a/tsconfig.json
Info 31   [00:01:01.000] Finishing updateGraphWorker: Project: /user/username/projects/a/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 32   [00:01:02.000] Same program as before
Info 33   [00:01:03.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/a/tsconfig.json"}}
Info 34   [00:01:04.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/a/tsconfig.json","configFile":"/user/username/projects/a/tsconfig.json","diagnostics":[]}}
Info 35   [00:01:05.000] Running: *ensureProjectForOpenFiles*
Info 36   [00:01:06.000] Before ensureProjectForOpenFiles:
Info 37   [00:01:07.000] Project '/user/username/projects/a/tsconfig.json' (Configured)
Info 37   [00:01:08.000] 	Files (2)

Info 37   [00:01:09.000] -----------------------------------------------
Info 37   [00:01:10.000] Open files: 
Info 37   [00:01:11.000] 	FileName: /user/username/projects/a/a.ts ProjectRootPath: undefined
Info 37   [00:01:12.000] 		Projects: /user/username/projects/a/tsconfig.json
Info 37   [00:01:13.000] After ensureProjectForOpenFiles:
Info 38   [00:01:14.000] Project '/user/username/projects/a/tsconfig.json' (Configured)
Info 38   [00:01:15.000] 	Files (2)

Info 38   [00:01:16.000] -----------------------------------------------
Info 38   [00:01:17.000] Open files: 
Info 38   [00:01:18.000] 	FileName: /user/username/projects/a/a.ts ProjectRootPath: undefined
Info 38   [00:01:19.000] 		Projects: /user/username/projects/a/tsconfig.json
Info 38   [00:01:20.000] got projects updated in background, updating diagnostics for /user/username/projects/a/a.ts
Info 39   [00:01:21.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/a/a.ts"]}}
After running Timeout callback:: count: 1
3: checkOne
