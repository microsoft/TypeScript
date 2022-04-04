Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/container/compositeExec/index.ts"}}
Search path: /user/username/projects/container/compositeExec
For info: /user/username/projects/container/compositeExec/index.ts :: Config file name: /user/username/projects/container/compositeExec/tsconfig.json
Creating configuration project /user/username/projects/container/compositeExec/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Config: /user/username/projects/container/compositeExec/tsconfig.json : {
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
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json
Config: /user/username/projects/container/lib/tsconfig.json : {
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
FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/compositeExec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Search path: /user/username/projects/container/compositeExec
For info: /user/username/projects/container/compositeExec/tsconfig.json :: Config file name: /user/username/projects/container/tsconfig.json
Creating configuration project /user/username/projects/container/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/container/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Search path: /user/username/projects/container
For info: /user/username/projects/container/tsconfig.json :: No config files found.
Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/container/tsconfig.json' (Configured)
	Files (0) InitialLoadPending

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/container/compositeExec/tsconfig.json
response:{"responseRequired":false}
request:{"command":"rename","arguments":{"file":"/user/username/projects/container/compositeExec/index.ts","line":3,"offset":16},"seq":1,"type":"request"}
Search path: /user/username/projects/container/lib
For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
Creating configuration project /user/username/projects/container/lib/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Loading configured project /user/username/projects/container/tsconfig.json
Config: /user/username/projects/container/tsconfig.json : {
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
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/container/tsconfig.json
Config: /user/username/projects/container/exec/tsconfig.json : {
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
FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/container/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Creating configuration project /user/username/projects/container/exec/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/index.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/exec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
response:{"response":{"info":{"canRename":true,"displayName":"myConst","fullDisplayName":"container.myConst","kind":"const","kindModifiers":"export","triggerSpan":{"start":{"line":3,"offset":16},"end":{"line":3,"offset":23}}},"locs":[{"file":"/user/username/projects/container/lib/index.ts","locs":[{"start":{"line":2,"offset":18},"end":{"line":2,"offset":25},"contextStart":{"line":2,"offset":5},"contextEnd":{"line":2,"offset":31}}]},{"file":"/user/username/projects/container/compositeExec/index.ts","locs":[{"start":{"line":3,"offset":16},"end":{"line":3,"offset":23}}]},{"file":"/user/username/projects/container/exec/index.ts","locs":[{"start":{"line":3,"offset":16},"end":{"line":3,"offset":23}}]}]},"responseRequired":true}