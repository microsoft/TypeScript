Provided types map file "/typesMap.json" doesn't exist
Search path: /user/username/projects/myproject/c
For info: /user/username/projects/myproject/c/index.ts :: Config file name: /user/username/projects/myproject/c/tsconfig.json
Creating configuration project /user/username/projects/myproject/c/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/c/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/c/index.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/c",
  "paths": {
   "@ref/*": [
    "../refs/*"
   ]
  },
  "pathsBasePath": "/user/username/projects/myproject/c",
  "configFilePath": "/user/username/projects/myproject/c/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/b",
   "originalPath": "../b"
  }
 ]
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c 1 undefined Config: /user/username/projects/myproject/c/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c 1 undefined Config: /user/username/projects/myproject/c/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/index.ts"
 ],
 "options": {
  "composite": true,
  "baseUrl": "/user/username/projects/myproject/b",
  "paths": {
   "@ref/*": [
    "../*"
   ]
  },
  "pathsBasePath": "/user/username/projects/myproject/b",
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/a",
   "originalPath": "../a"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs/a.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/a/index.ts
	/user/username/projects/myproject/b/index.ts
	/user/username/projects/myproject/refs/a.d.ts
	/user/username/projects/myproject/c/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../a/index.ts
	  Imported via '@ref/a' from file '../b/index.ts'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	../refs/a.d.ts
	  Imported via "@ref/a" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/c/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Scheduled: /user/username/projects/myproject/c/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json :: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Project: /user/username/projects/myproject/a/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/a/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json :: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json :: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json :: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Running: /user/username/projects/myproject/c/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/c/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/c/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Scheduled: /user/username/projects/myproject/c/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json :: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/a/tsconfig.json :: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Running: /user/username/projects/myproject/c/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/c/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/c/tsconfig.json