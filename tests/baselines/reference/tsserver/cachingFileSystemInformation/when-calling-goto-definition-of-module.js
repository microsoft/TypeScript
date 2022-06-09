Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/controllers/vessels/client.ts"}}
Search path: /a/b/controllers/vessels
For info: /a/b/controllers/vessels/client.ts :: Config file name: /a/b/tsconfig.json
Creating configuration project /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/controllers/vessels/client.ts",
  "/a/b/models/vessel.ts",
  "/a/b/utils/db.ts"
 ],
 "options": {
  "target": 2,
  "module": 5,
  "baseUrl": "/a/b",
  "paths": {
   "~/*": [
    "*"
   ]
  },
  "pathsBasePath": "/a/b",
  "configFilePath": "/a/b/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/b/models/vessel.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/b/utils/db.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (3)
	/a/b/utils/db.ts
	/a/b/models/vessel.ts
	/a/b/controllers/vessels/client.ts


	utils/db.ts
	  Imported via '~/utils/db' from file 'models/vessel.ts'
	  Matched by default include pattern '**/*'
	models/vessel.ts
	  Imported via '~/models/vessel' from file 'controllers/vessels/client.ts'
	  Matched by default include pattern '**/*'
	controllers/vessels/client.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/controllers/vessels/client.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"definition","arguments":{"file":"/a/b/controllers/vessels/client.ts","position":54}}
response:{"response":[{"file":"/a/b/models/vessel.ts","start":{"line":2,"offset":21},"end":{"line":4,"offset":17}}],"responseRequired":true}
fileExists:: []
directoryExists:: []
getDirectories:: []
readFile:: []
readDirectory:: []
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/models/vessel.ts"}}
FileWatcher:: Close:: WatchInfo: /a/b/models/vessel.ts 500 undefined WatchType: Closed Script info
Search path: /a/b/models
For info: /a/b/models/vessel.ts :: Config file name: /a/b/tsconfig.json
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/controllers/vessels/client.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/models/vessel.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
response:{"responseRequired":false}
fileExists:: [{"key":"/a/b/models/tsconfig.json","count":1},{"key":"/a/b/models/jsconfig.json","count":1}]
directoryExists:: []
getDirectories:: []
readFile:: []
readDirectory:: []