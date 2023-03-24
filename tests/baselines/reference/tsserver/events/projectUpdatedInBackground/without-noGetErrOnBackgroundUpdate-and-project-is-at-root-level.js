currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/project/file1.ts]
import a from "file2"

//// [/a/b/project/file3.ts]
export class c { }

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

//// [/a/b/project/tsconfig.json]
{"compilerOptions":{"typeRoots":[]}}


Info 1    [00:00:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/project/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:21.000] Search path: /a/b/project
Info 3    [00:00:22.000] For info: /a/b/project/file1.ts :: Config file name: /a/b/project/tsconfig.json
Info 4    [00:00:23.000] Creating configuration project /a/b/project/tsconfig.json
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/b/project/tsconfig.json 2000 undefined Project: /a/b/project/tsconfig.json WatchType: Config file
Info 6    [00:00:25.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/project/tsconfig.json","reason":"Creating possible configured project for /a/b/project/file1.ts to open"}}
Info 7    [00:00:26.000] Config: /a/b/project/tsconfig.json : {
 "rootNames": [
  "/a/b/project/file1.ts",
  "/a/b/project/file3.ts"
 ],
 "options": {
  "typeRoots": [],
  "configFilePath": "/a/b/project/tsconfig.json"
 }
}
Info 8    [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/project 1 undefined Config: /a/b/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/project 1 undefined Config: /a/b/project/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:30.000] Starting updateGraphWorker: Project: /a/b/project/tsconfig.json
Info 12   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/project/node_modules 1 undefined Project: /a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/project/node_modules 1 undefined Project: /a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:34.000] Finishing updateGraphWorker: Project: /a/b/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:35.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 17   [00:00:36.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/project/file1.ts SVC-1-0 "import a from \"file2\""
	/a/b/project/file3.ts Text-1 "export class c { }"


	../../lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:37.000] -----------------------------------------------
Info 19   [00:00:38.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/project/tsconfig.json"}}
Info 20   [00:00:39.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"1cf2001c133ce00fd258494c136bfa9707203d90270d151ea0f575d93d990f9d","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":39,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"typeRoots":[]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 21   [00:00:40.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/project/file1.ts","configFile":"/a/b/project/tsconfig.json","diagnostics":[]}}
Info 22   [00:00:41.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 22   [00:00:42.000] 	Files (3)

Info 22   [00:00:43.000] -----------------------------------------------
Info 22   [00:00:44.000] Open files: 
Info 22   [00:00:45.000] 	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
Info 22   [00:00:46.000] 		Projects: /a/b/project/tsconfig.json
Info 22   [00:00:47.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/project/tsconfig.json: *new*
  {}
/a/b/project/file3.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b/project: *new*
  {}

Info 23   [00:00:51.000] FileWatcher:: Triggered with /a/b/project/file3.ts 1:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 24   [00:00:52.000] Scheduled: /a/b/project/tsconfig.json
Info 25   [00:00:53.000] Scheduled: *ensureProjectForOpenFiles*
Info 26   [00:00:54.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/project/file3.ts 1:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Before checking timeout queue length (2) and running
//// [/a/b/project/file3.ts]
export class c { }export class d {}


Info 27   [00:00:55.000] Running: /a/b/project/tsconfig.json
Info 28   [00:00:56.000] Starting updateGraphWorker: Project: /a/b/project/tsconfig.json
Info 29   [00:00:57.000] Finishing updateGraphWorker: Project: /a/b/project/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 30   [00:00:58.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 31   [00:00:59.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/project/file1.ts SVC-1-0 "import a from \"file2\""
	/a/b/project/file3.ts Text-2 "export class c { }export class d {}"

Info 32   [00:01:00.000] -----------------------------------------------
Info 33   [00:01:01.000] Running: *ensureProjectForOpenFiles*
Info 34   [00:01:02.000] Before ensureProjectForOpenFiles:
Info 35   [00:01:03.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 35   [00:01:04.000] 	Files (3)

Info 35   [00:01:05.000] -----------------------------------------------
Info 35   [00:01:06.000] Open files: 
Info 35   [00:01:07.000] 	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
Info 35   [00:01:08.000] 		Projects: /a/b/project/tsconfig.json
Info 35   [00:01:09.000] After ensureProjectForOpenFiles:
Info 36   [00:01:10.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 36   [00:01:11.000] 	Files (3)

Info 36   [00:01:12.000] -----------------------------------------------
Info 36   [00:01:13.000] Open files: 
Info 36   [00:01:14.000] 	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
Info 36   [00:01:15.000] 		Projects: /a/b/project/tsconfig.json
Info 36   [00:01:16.000] got projects updated in background, updating diagnostics for /a/b/project/file1.ts
Info 37   [00:01:17.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/project/file1.ts"]}}
After checking timeout queue length (2) and running

Before running timeout callbacks
//// [/a/b/node_modules/file2.d.ts]
export class a { }


Info 38   [00:01:23.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/project/file1.ts","diagnostics":[]}}
After running timeout callbacks

Before running timeout callbacks

After running timeout callbacks
