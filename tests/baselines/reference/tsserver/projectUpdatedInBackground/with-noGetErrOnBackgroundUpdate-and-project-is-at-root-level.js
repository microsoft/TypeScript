Info 0    [16:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/project/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:21.000] Search path: /a/b/project
Info 3    [16:00:22.000] For info: /a/b/project/file1.ts :: Config file name: /a/b/project/tsconfig.json
Info 4    [16:00:23.000] Creating configuration project /a/b/project/tsconfig.json
Info 5    [16:00:24.000] FileWatcher:: Added:: WatchInfo: /a/b/project/tsconfig.json 2000 undefined Project: /a/b/project/tsconfig.json WatchType: Config file
Info 6    [16:00:25.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/project/tsconfig.json","reason":"Creating possible configured project for /a/b/project/file1.ts to open"}}
Info 7    [16:00:26.000] Config: /a/b/project/tsconfig.json : {
 "rootNames": [
  "/a/b/project/file1.ts",
  "/a/b/project/file3.ts"
 ],
 "options": {
  "typeRoots": [],
  "configFilePath": "/a/b/project/tsconfig.json"
 }
}
Info 8    [16:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/project 1 undefined Config: /a/b/project/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/project 1 undefined Config: /a/b/project/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:29.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:30.000] FileWatcher:: Added:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:31.000] Starting updateGraphWorker: Project: /a/b/project/tsconfig.json
Info 13   [16:00:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [16:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/project/node_modules 1 undefined Project: /a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [16:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/project/node_modules 1 undefined Project: /a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [16:00:35.000] Finishing updateGraphWorker: Project: /a/b/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [16:00:36.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 18   [16:00:37.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/project/file1.ts
	/a/b/project/file3.ts


	../../lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info 19   [16:00:38.000] -----------------------------------------------
Info 20   [16:00:39.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/project/tsconfig.json"}}
Info 21   [16:00:40.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"1cf2001c133ce00fd258494c136bfa9707203d90270d151ea0f575d93d990f9d","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":39,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"typeRoots":[]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 22   [16:00:41.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/project/file1.ts","configFile":"/a/b/project/tsconfig.json","diagnostics":[]}}
Info 23   [16:00:42.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 23   [16:00:43.000] 	Files (3)

Info 23   [16:00:44.000] -----------------------------------------------
Info 23   [16:00:45.000] Open files: 
Info 23   [16:00:46.000] 	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
Info 23   [16:00:47.000] 		Projects: /a/b/project/tsconfig.json

PolledWatches::
/a/b/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/project/tsconfig.json:
  {}
/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/project:
  {}

Info 23   [16:00:48.000] response:
    {
      "responseRequired": false
    }
Info 24   [16:00:52.000] FileWatcher:: Triggered with /a/b/project/file3.ts 1:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 25   [16:00:53.000] Scheduled: /a/b/project/tsconfig.json
Info 26   [16:00:54.000] Scheduled: *ensureProjectForOpenFiles*
Info 27   [16:00:55.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/project/file3.ts 1:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 28   [16:00:56.000] Running: /a/b/project/tsconfig.json
Info 29   [16:00:57.000] Starting updateGraphWorker: Project: /a/b/project/tsconfig.json
Info 30   [16:00:58.000] Finishing updateGraphWorker: Project: /a/b/project/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 31   [16:00:59.000] Different program with same set of files
Info 32   [16:01:00.000] Running: *ensureProjectForOpenFiles*
Info 33   [16:01:01.000] Before ensureProjectForOpenFiles:
Info 34   [16:01:02.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 34   [16:01:03.000] 	Files (3)

Info 34   [16:01:04.000] -----------------------------------------------
Info 34   [16:01:05.000] Open files: 
Info 34   [16:01:06.000] 	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
Info 34   [16:01:07.000] 		Projects: /a/b/project/tsconfig.json
Info 34   [16:01:08.000] After ensureProjectForOpenFiles:
Info 35   [16:01:09.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 35   [16:01:10.000] 	Files (3)

Info 35   [16:01:11.000] -----------------------------------------------
Info 35   [16:01:12.000] Open files: 
Info 35   [16:01:13.000] 	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
Info 35   [16:01:14.000] 		Projects: /a/b/project/tsconfig.json
Info 35   [16:01:15.000] got projects updated in background, updating diagnostics for /a/b/project/file1.ts
Info 36   [16:01:16.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/project/file1.ts"]}}