TI:: [00:00:21.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:22.000] Processing cache location '/a/data/'
TI:: [00:00:23.000] Trying to find '/a/data/package.json'...
TI:: [00:00:24.000] Finished processing cache location '/a/data/'
Info 0    [00:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/user/username/projects/myproject/a.ts]
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"plugins":[{"name":"some-plugin"}]}}

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


Info 2    [00:00:27.000] Search path: /user/username/projects/myproject
Info 3    [00:00:28.000] For info: /user/username/projects/myproject/a.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:29.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:31.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a.ts"
 ],
 "options": {
  "plugins": [
   {
    "name": "some-plugin"
   }
  ],
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:34.000] Enabling plugin some-plugin from candidate paths: /a/lib/tsc.js/../../..
Info 10   [00:00:35.000] Loading some-plugin from /a/lib/tsc.js/../../.. (resolved to /a/lib/tsc.js/../../../node_modules)
Require:: some-plugin
PluginFactory Invoke
Info 11   [00:00:36.000] Plugin validation succeeded
Info 12   [00:00:37.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 13   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/somefile.txt 500 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Missing file
Info 15   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 16   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 17   [00:00:42.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:00:43.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 19   [00:00:44.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'

Info 20   [00:00:45.000] -----------------------------------------------
Info 21   [00:00:46.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 21   [00:00:47.000] 	Files (2)

Info 21   [00:00:48.000] -----------------------------------------------
Info 21   [00:00:49.000] Open files: 
Info 21   [00:00:50.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 21   [00:00:51.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/somefile.txt: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Info 21   [00:00:52.000] response:
    {
      "responseRequired": false
    }
ExternalFiles:: ["someFile.txt"]
Info 22   [00:00:56.000] FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 23   [00:00:57.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 24   [00:00:58.000] Scheduled: *ensureProjectForOpenFiles*
Info 25   [00:00:59.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Before running timeout callbacks
//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"plugins":[{"name":"some-other-plugin"}]}}


Info 26   [00:01:00.000] Running: /user/username/projects/myproject/tsconfig.json
Info 27   [00:01:01.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 28   [00:01:02.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a.ts"
 ],
 "options": {
  "plugins": [
   {
    "name": "some-other-plugin"
   }
  ],
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 29   [00:01:03.000] Enabling plugin some-other-plugin from candidate paths: /a/lib/tsc.js/../../..
Info 30   [00:01:04.000] Loading some-other-plugin from /a/lib/tsc.js/../../.. (resolved to /a/lib/tsc.js/../../../node_modules)
Require:: some-other-plugin
PluginFactory Invoke
Info 31   [00:01:05.000] Plugin validation succeeded
Info 32   [00:01:06.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 33   [00:01:07.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/somefile.txt 500 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Missing file
Info 34   [00:01:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/someotherfile.txt 500 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Missing file
Info 35   [00:01:09.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [00:01:10.000] Different program with same set of files
Info 37   [00:01:11.000] Running: *ensureProjectForOpenFiles*
Info 38   [00:01:12.000] Before ensureProjectForOpenFiles:
Info 39   [00:01:13.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 39   [00:01:14.000] 	Files (2)

Info 39   [00:01:15.000] -----------------------------------------------
Info 39   [00:01:16.000] Open files: 
Info 39   [00:01:17.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 39   [00:01:18.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 39   [00:01:19.000] After ensureProjectForOpenFiles:
Info 40   [00:01:20.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 40   [00:01:21.000] 	Files (2)

Info 40   [00:01:22.000] -----------------------------------------------
Info 40   [00:01:23.000] Open files: 
Info 40   [00:01:24.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 40   [00:01:25.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/someotherfile.txt: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/somefile.txt:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

ExternalFiles:: ["someOtherFile.txt"]