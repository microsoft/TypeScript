TI:: Creating typing installer
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


TI:: [00:00:29.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:30.000] Processing cache location '/a/data/'
TI:: [00:00:31.000] Trying to find '/a/data/package.json'...
TI:: [00:00:32.000] Finished processing cache location '/a/data/'
TI:: [00:00:33.000] Npm config file: /a/data/package.json
TI:: [00:00:34.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:39.000] Updating types-registry npm package...
TI:: [00:00:40.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:47.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:48.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:49.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/rootfolder/otherfolder/a/b/project/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:50.000] Search path: /user/username/rootfolder/otherfolder/a/b/project
Info 3    [00:00:51.000] For info: /user/username/rootfolder/otherfolder/a/b/project/file1.ts :: Config file name: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 4    [00:00:52.000] Creating configuration project /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 5    [00:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Config file
Info 6    [00:00:54.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json","reason":"Creating possible configured project for /user/username/rootfolder/otherfolder/a/b/project/file1.ts to open"}}
Info 7    [00:00:55.000] Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json : {
 "rootNames": [
  "/user/username/rootfolder/otherfolder/a/b/project/file1.ts",
  "/user/username/rootfolder/otherfolder/a/b/project/file3.ts"
 ],
 "options": {
  "typeRoots": [],
  "configFilePath": "/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json"
 }
}
Info 8    [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:58.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:59.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 12   [00:01:00.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:01:09.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:01:10.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 23   [00:01:11.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info 24   [00:01:12.000] -----------------------------------------------
Info 25   [00:01:13.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json"}}
Info 26   [00:01:14.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"79b1a0103ed8006f174a1f979cf698219d4ec4ae3a48594da1085f7a1749553c","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":39,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"typeRoots":[]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 27   [00:01:15.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/rootfolder/otherfolder/a/b/project/file1.ts","configFile":"/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json","diagnostics":[]}}
Info 28   [00:01:16.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 28   [00:01:17.000] 	Files (3)

Info 28   [00:01:18.000] -----------------------------------------------
Info 28   [00:01:19.000] Open files: 
Info 28   [00:01:20.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 28   [00:01:21.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
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

Info 28   [00:01:22.000] response:
    {
      "responseRequired": false
    }
Info 29   [00:01:26.000] FileWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/project/file3.ts 1:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 30   [00:01:27.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 31   [00:01:28.000] Scheduled: *ensureProjectForOpenFiles*
Info 32   [00:01:29.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/project/file3.ts 1:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Before checking timeout queue length (2) and running
//// [/user/username/rootfolder/otherfolder/a/b/project/file3.ts]
export class c { }export class d {}


Info 33   [00:01:30.000] Running: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 34   [00:01:31.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 35   [00:01:32.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 36   [00:01:33.000] Different program with same set of files
Info 37   [00:01:34.000] Running: *ensureProjectForOpenFiles*
Info 38   [00:01:35.000] Before ensureProjectForOpenFiles:
Info 39   [00:01:36.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 39   [00:01:37.000] 	Files (3)

Info 39   [00:01:38.000] -----------------------------------------------
Info 39   [00:01:39.000] Open files: 
Info 39   [00:01:40.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 39   [00:01:41.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 39   [00:01:42.000] After ensureProjectForOpenFiles:
Info 40   [00:01:43.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 40   [00:01:44.000] 	Files (3)

Info 40   [00:01:45.000] -----------------------------------------------
Info 40   [00:01:46.000] Open files: 
Info 40   [00:01:47.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 40   [00:01:48.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 40   [00:01:49.000] got projects updated in background, updating diagnostics for /user/username/rootfolder/otherfolder/a/b/project/file1.ts
Info 41   [00:01:50.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/rootfolder/otherfolder/a/b/project/file1.ts"]}}
After checking timeout queue length (2) and running

Checking timeout queue length: 1

Info 42   [00:01:54.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 43   [00:01:55.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation
Info 44   [00:01:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 45   [00:01:57.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [00:01:58.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 47   [00:01:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 48   [00:02:02.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 49   [00:02:03.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 50   [00:02:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
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

Info 51   [00:02:05.000] Scheduled: *ensureProjectForOpenFiles*
Info 52   [00:02:06.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 53   [00:02:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 54   [00:02:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 55   [00:02:09.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 56   [00:02:10.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 57   [00:02:11.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 58   [00:02:12.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 59   [00:02:13.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 60   [00:02:14.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 61   [00:02:15.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../node_modules/file2.d.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info 62   [00:02:16.000] -----------------------------------------------
Info 63   [00:02:17.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/rootfolder/otherfolder/a/b/project/file1.ts","diagnostics":[]}}
After running timeout callbacks

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

Before running timeout callbacks

Info 64   [00:02:18.000] Running: *ensureProjectForOpenFiles*
Info 65   [00:02:19.000] Before ensureProjectForOpenFiles:
Info 66   [00:02:20.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 66   [00:02:21.000] 	Files (4)

Info 66   [00:02:22.000] -----------------------------------------------
Info 66   [00:02:23.000] Open files: 
Info 66   [00:02:24.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 66   [00:02:25.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 66   [00:02:26.000] After ensureProjectForOpenFiles:
Info 67   [00:02:27.000] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info 67   [00:02:28.000] 	Files (4)

Info 67   [00:02:29.000] -----------------------------------------------
Info 67   [00:02:30.000] Open files: 
Info 67   [00:02:31.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info 67   [00:02:32.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info 67   [00:02:33.000] got projects updated in background, updating diagnostics for /user/username/rootfolder/otherfolder/a/b/project/file1.ts
Info 68   [00:02:34.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/rootfolder/otherfolder/a/b/project/file1.ts"]}}
After running timeout callbacks

Checking timeout queue length: 1
