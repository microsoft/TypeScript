Info 0    [16:01:10.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:01:11.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/container/compositeExec/index.ts"}}
Info 2    [16:01:12.000] Search path: /user/username/projects/container/compositeExec
Info 3    [16:01:13.000] For info: /user/username/projects/container/compositeExec/index.ts :: Config file name: /user/username/projects/container/compositeExec/tsconfig.json
Info 4    [16:01:14.000] Creating configuration project /user/username/projects/container/compositeExec/tsconfig.json
Info 5    [16:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 6    [16:01:16.000] Config: /user/username/projects/container/compositeExec/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/container/compositeExec/index.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/container/built/local/compositeExec.js",
  "composite": true,
  "declarationMap": true,
  "configFilePath": "/user/username/projects/container/compositeExec/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/container/lib",
   "originalPath": "../lib",
   "prepend": true
  }
 ]
}
Info 7    [16:01:17.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [16:01:18.000] Starting updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json
Info 9    [16:01:19.000] Config: /user/username/projects/container/lib/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/container/lib/index.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/container/built/local/lib.js",
  "composite": true,
  "declarationMap": true,
  "configFilePath": "/user/username/projects/container/lib/tsconfig.json"
 }
}
Info 10   [16:01:20.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 11   [16:01:21.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/index.ts 500 undefined WatchType: Closed Script info
Info 12   [16:01:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [16:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 14   [16:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 15   [16:01:25.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 16   [16:01:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 17   [16:01:27.000] Finishing updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [16:01:28.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 19   [16:01:29.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/compositeExec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 20   [16:01:30.000] -----------------------------------------------
Info 21   [16:01:31.000] Search path: /user/username/projects/container/compositeExec
Info 22   [16:01:32.000] For info: /user/username/projects/container/compositeExec/tsconfig.json :: Config file name: /user/username/projects/container/tsconfig.json
Info 23   [16:01:33.000] Creating configuration project /user/username/projects/container/tsconfig.json
Info 24   [16:01:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 25   [16:01:35.000] Search path: /user/username/projects/container
Info 26   [16:01:36.000] For info: /user/username/projects/container/tsconfig.json :: No config files found.
Info 27   [16:01:37.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 27   [16:01:38.000] 	Files (3)

Info 27   [16:01:39.000] -----------------------------------------------
Info 27   [16:01:40.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 27   [16:01:41.000] 	Files (0) InitialLoadPending

Info 27   [16:01:42.000] -----------------------------------------------
Info 27   [16:01:43.000] Open files: 
Info 27   [16:01:44.000] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info 27   [16:01:45.000] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
Info 27   [16:01:46.000] response:{"responseRequired":false}
Info 28   [16:01:47.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/container/compositeExec/index.ts","line":3,"offset":16},"seq":1,"type":"request"}
Info 29   [16:01:48.000] Search path: /user/username/projects/container/lib
Info 30   [16:01:49.000] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
Info 31   [16:01:50.000] Creating configuration project /user/username/projects/container/lib/tsconfig.json
Info 32   [16:01:51.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 33   [16:01:52.000] Starting updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json
Info 34   [16:01:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 35   [16:01:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 36   [16:01:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 37   [16:01:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 38   [16:01:57.000] Finishing updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 39   [16:01:58.000] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info 40   [16:01:59.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 41   [16:02:00.000] -----------------------------------------------
Info 42   [16:02:01.000] Loading configured project /user/username/projects/container/tsconfig.json
Info 43   [16:02:02.000] Config: /user/username/projects/container/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/container/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/container/exec",
   "originalPath": "./exec"
  },
  {
   "path": "/user/username/projects/container/compositeExec",
   "originalPath": "./compositeExec"
  }
 ]
}
Info 44   [16:02:03.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 45   [16:02:04.000] Starting updateGraphWorker: Project: /user/username/projects/container/tsconfig.json
Info 46   [16:02:05.000] Config: /user/username/projects/container/exec/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/container/exec/index.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/container/built/local/exec.js",
  "configFilePath": "/user/username/projects/container/exec/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/container/lib",
   "originalPath": "../lib",
   "prepend": true
  }
 ]
}
Info 47   [16:02:06.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 48   [16:02:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 49   [16:02:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 50   [16:02:09.000] Finishing updateGraphWorker: Project: /user/username/projects/container/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 51   [16:02:10.000] Different program with same set of files
Info 52   [16:02:11.000] Creating configuration project /user/username/projects/container/exec/tsconfig.json
Info 53   [16:02:12.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 54   [16:02:13.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/index.ts 500 undefined WatchType: Closed Script info
Info 55   [16:02:14.000] Starting updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json
Info 56   [16:02:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 57   [16:02:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 58   [16:02:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 59   [16:02:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 60   [16:02:19.000] Finishing updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 61   [16:02:20.000] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info 62   [16:02:21.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/exec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 63   [16:02:22.000] -----------------------------------------------
Info 64   [16:02:23.000] Search path: /user/username/projects/container/lib
Info 65   [16:02:24.000] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
Info 66   [16:02:25.000] response:{"response":{"info":{"canRename":true,"displayName":"myConst","fullDisplayName":"container.myConst","kind":"const","kindModifiers":"export","triggerSpan":{"start":{"line":3,"offset":16},"end":{"line":3,"offset":23}}},"locs":[{"file":"/user/username/projects/container/lib/index.ts","locs":[{"start":{"line":2,"offset":18},"end":{"line":2,"offset":25},"contextStart":{"line":2,"offset":5},"contextEnd":{"line":2,"offset":31}}]},{"file":"/user/username/projects/container/compositeExec/index.ts","locs":[{"start":{"line":3,"offset":16},"end":{"line":3,"offset":23}}]},{"file":"/user/username/projects/container/exec/index.ts","locs":[{"start":{"line":3,"offset":16},"end":{"line":3,"offset":23}}]}]},"responseRequired":true}