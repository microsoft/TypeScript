currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/rootfolder/otherfolder/a/b/project/file1.ts]
import a from "file2"

//// [/user/username/rootfolder/otherfolder/a/b/project/file3.ts]
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

//// [/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json]
{"compilerOptions":{"typeRoots":[]}}


Info 1    [00:00:30.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/rootfolder/otherfolder/a/b/project/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:31.000] Search path: /user/username/rootfolder/otherfolder/a/b/project
Info 3    [00:00:32.000] For info: /user/username/rootfolder/otherfolder/a/b/project/file1.ts :: Config file name: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 4    [00:00:33.000] Creating configuration project /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 5    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Config file
Info 6    [00:00:35.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json","reason":"Creating possible configured project for /user/username/rootfolder/otherfolder/a/b/project/file1.ts to open"}}
Info 7    [00:00:36.000] Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json : {
 "rootNames": [
  "/user/username/rootfolder/otherfolder/a/b/project/file1.ts",
  "/user/username/rootfolder/otherfolder/a/b/project/file3.ts"
 ],
 "options": {
  "typeRoots": [],
  "configFilePath": "/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json"
 }
}
Info 8    [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:40.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 12   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:00:50.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:51.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 23   [00:00:52.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts SVC-1-0 "import a from \"file2\""
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts Text-1 "export class c { }"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info 24   [00:00:53.000] -----------------------------------------------
Info 25   [00:00:54.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json"}}
Info 26   [00:00:55.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"79b1a0103ed8006f174a1f979cf698219d4ec4ae3a48594da1085f7a1749553c","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":39,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"typeRoots":[]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 27   [00:00:56.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/rootfolder/otherfolder/a/b/project/file1.ts","configFile":"/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json","diagnostics":[]}}
Info 28   [00:00:57.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 28   [00:00:58.000] 	Files (3)

Info 28   [00:00:59.000] -----------------------------------------------
Info 28   [00:01:00.000] Open files: 
Info 28   [00:01:01.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 28   [00:01:02.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 28   [00:01:03.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/rootfolder/otherfolder/a/b/project/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json: *new*
  {}
/user/username/rootfolder/otherfolder/a/b/project/file3.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b/project: *new*
  {}

Info 29   [00:01:07.000] FileWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/project/file3.ts 1:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 30   [00:01:08.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 31   [00:01:09.000] Scheduled: *ensureProjectForOpenFiles*
Info 32   [00:01:10.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/project/file3.ts 1:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/user/username/rootfolder/otherfolder/a/b/project/file3.ts]
export class c { }export class d {}


Info 33   [00:01:11.000] Running: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 34   [00:01:12.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 35   [00:01:13.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 36   [00:01:14.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 37   [00:01:15.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts SVC-1-0 "import a from \"file2\""
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts Text-2 "export class c { }export class d {}"

Info 38   [00:01:16.000] -----------------------------------------------
Info 39   [00:01:17.000] Running: *ensureProjectForOpenFiles*
Info 40   [00:01:18.000] Before ensureProjectForOpenFiles:
Info 41   [00:01:19.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 41   [00:01:20.000] 	Files (3)

Info 41   [00:01:21.000] -----------------------------------------------
Info 41   [00:01:22.000] Open files: 
Info 41   [00:01:23.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 41   [00:01:24.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 41   [00:01:25.000] After ensureProjectForOpenFiles:
Info 42   [00:01:26.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 42   [00:01:27.000] 	Files (3)

Info 42   [00:01:28.000] -----------------------------------------------
Info 42   [00:01:29.000] Open files: 
Info 42   [00:01:30.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 42   [00:01:31.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 42   [00:01:32.000] got projects updated in background, updating diagnostics for /user/username/rootfolder/otherfolder/a/b/project/file1.ts
Info 43   [00:01:33.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/rootfolder/otherfolder/a/b/project/file1.ts"]}}
After running Timeout callback:: count: 1
3: checkOne

Info 44   [00:01:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 45   [00:01:38.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation
Info 46   [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 47   [00:01:40.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 48   [00:01:41.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 49   [00:01:42.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 50   [00:01:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 51   [00:01:46.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 52   [00:01:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 2
3: checkOne
6: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts]
export class a { }


PolledWatches::
/user/username/rootfolder/otherfolder/a/b/project/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json:
  {}
/user/username/rootfolder/otherfolder/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b/project:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules: *new*
  {}

Info 53   [00:01:48.000] Scheduled: *ensureProjectForOpenFiles*
Info 54   [00:01:49.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 55   [00:01:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 56   [00:01:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 57   [00:01:52.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 58   [00:01:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 59   [00:01:54.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 60   [00:01:55.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 61   [00:01:56.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 62   [00:01:57.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 63   [00:01:58.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts Text-1 "export class a { }"
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts SVC-1-0 "import a from \"file2\""
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts Text-2 "export class c { }export class d {}"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../node_modules/file2.d.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info 64   [00:01:59.000] -----------------------------------------------
Info 65   [00:02:00.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/rootfolder/otherfolder/a/b/project/file1.ts","diagnostics":[]}}
After running Timeout callback:: count: 1
7: *ensureProjectForOpenFiles*

PolledWatches::
/user/username/rootfolder/otherfolder/a/b/project/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json:
  {}
/user/username/rootfolder/otherfolder/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b/project:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

Before running Timeout callback:: count: 1
7: *ensureProjectForOpenFiles*

Info 66   [00:02:01.000] Running: *ensureProjectForOpenFiles*
Info 67   [00:02:02.000] Before ensureProjectForOpenFiles:
Info 68   [00:02:03.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 68   [00:02:04.000] 	Files (4)

Info 68   [00:02:05.000] -----------------------------------------------
Info 68   [00:02:06.000] Open files: 
Info 68   [00:02:07.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 68   [00:02:08.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 68   [00:02:09.000] After ensureProjectForOpenFiles:
Info 69   [00:02:10.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 69   [00:02:11.000] 	Files (4)

Info 69   [00:02:12.000] -----------------------------------------------
Info 69   [00:02:13.000] Open files: 
Info 69   [00:02:14.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 69   [00:02:15.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 69   [00:02:16.000] got projects updated in background, updating diagnostics for /user/username/rootfolder/otherfolder/a/b/project/file1.ts
Info 70   [00:02:17.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/rootfolder/otherfolder/a/b/project/file1.ts"]}}
After running Timeout callback:: count: 1
8: checkOne
