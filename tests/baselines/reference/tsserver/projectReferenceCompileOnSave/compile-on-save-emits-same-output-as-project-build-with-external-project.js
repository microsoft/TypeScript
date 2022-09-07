Info 0    [16:00:53.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:54.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/SiblingClass/Source.ts"}}
Info 2    [16:00:55.000] Search path: /user/username/projects/myproject/SiblingClass
Info 3    [16:00:56.000] For info: /user/username/projects/myproject/SiblingClass/Source.ts :: Config file name: /user/username/projects/myproject/SiblingClass/tsconfig.json
Info 4    [16:00:57.000] Creating configuration project /user/username/projects/myproject/SiblingClass/tsconfig.json
Info 5    [16:00:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Config file
Info 6    [16:00:59.000] Config: /user/username/projects/myproject/SiblingClass/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/SiblingClass/Source.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "outFile": "/user/username/projects/myproject/SiblingClass/Source.js",
  "configFilePath": "/user/username/projects/myproject/SiblingClass/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/buttonClass",
   "originalPath": "../buttonClass/"
  }
 ]
}
Info 7    [16:01:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsbase.json 2000 undefined Config: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Extended config file
Info 8    [16:01:01.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [16:01:02.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/SiblingClass/tsconfig.json
Info 10   [16:01:03.000] Config: /user/username/projects/myproject/buttonClass/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/buttonClass/Source.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "outFile": "/user/username/projects/myproject/buttonClass/Source.js",
  "configFilePath": "/user/username/projects/myproject/buttonClass/tsconfig.json"
 }
}
Info 11   [16:01:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/buttonClass/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Config file
Info 12   [16:01:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/buttonClass/Source.ts 500 undefined WatchType: Closed Script info
Info 13   [16:01:06.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [16:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info 15   [16:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info 16   [16:01:09.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info 17   [16:01:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info 18   [16:01:11.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/SiblingClass/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [16:01:12.000] Project '/user/username/projects/myproject/SiblingClass/tsconfig.json' (Configured)
Info 20   [16:01:13.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/buttonClass/Source.ts
	/user/username/projects/myproject/SiblingClass/Source.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../buttonClass/Source.ts
	  Source from referenced project '../buttonClass/tsconfig.json' included because '--outFile' specified
	Source.ts
	  Part of 'files' list in tsconfig.json

Info 21   [16:01:14.000] -----------------------------------------------
Info 22   [16:01:15.000] Search path: /user/username/projects/myproject/SiblingClass
Info 23   [16:01:16.000] For info: /user/username/projects/myproject/SiblingClass/tsconfig.json :: No config files found.
Info 24   [16:01:17.000] Project '/user/username/projects/myproject/SiblingClass/tsconfig.json' (Configured)
Info 24   [16:01:18.000] 	Files (3)

Info 24   [16:01:19.000] -----------------------------------------------
Info 24   [16:01:20.000] Open files: 
Info 24   [16:01:21.000] 	FileName: /user/username/projects/myproject/SiblingClass/Source.ts ProjectRootPath: undefined
Info 24   [16:01:22.000] 		Projects: /user/username/projects/myproject/SiblingClass/tsconfig.json
Info 24   [16:01:23.000] response:{"responseRequired":false}
Info 25   [16:01:24.000] request:{"command":"compileOnSaveEmitFile","arguments":{"file":"/user/username/projects/myproject/SiblingClass/Source.ts","projectFileName":"/user/username/projects/myproject/SiblingClass/tsconfig.json"},"seq":1,"type":"request"}
Info 26   [16:01:31.000] response:{"response":true,"responseRequired":true}