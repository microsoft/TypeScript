Provided types map file "/typesMap.json" doesn't exist
Search path: /user/username/projects/sample1/tests
For info: /user/username/projects/sample1/tests/index.ts :: Config file name: /user/username/projects/sample1/tests/tsconfig.json
Creating configuration project /user/username/projects/sample1/tests/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Config: /user/username/projects/sample1/tests/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/tests/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "configFilePath": "/user/username/projects/sample1/tests/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  },
  {
   "path": "/user/username/projects/sample1/logic",
   "originalPath": "../logic"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Config: /user/username/projects/sample1/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/core/anotherModule.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/some_decl.d.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "declarationMap": true,
  "skipDefaultLibCheck": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/sample1/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/anotherModule.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/sample1/core/index.ts
	/user/username/projects/sample1/core/anotherModule.ts
	/user/username/projects/sample1/logic/index.ts
	/user/username/projects/sample1/tests/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../core/index.ts
	  Imported via '../core/index' from file 'index.ts'
	  Imported via '../core/index' from file '../logic/index.ts'
	../core/anotherModule.ts
	  Imported via '../core/anotherModule' from file '../logic/index.ts'
	  Imported via '../core/anotherModule' from file 'index.ts'
	../logic/index.ts
	  Imported via '../logic/index' from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Search path: /user/username/projects/sample1/tests
For info: /user/username/projects/sample1/tests/tsconfig.json :: No config files found.
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/sample1/tests/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Scheduled: /user/username/projects/sample1/tests/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Running: /user/username/projects/sample1/tests/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/sample1/tests/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/sample1/tests/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Scheduled: /user/username/projects/sample1/tests/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Running: /user/username/projects/sample1/tests/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/sample1/tests/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/sample1/tests/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/sample1/logic/tsconfig.json 1:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Scheduled: /user/username/projects/sample1/tests/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/sample1/logic/tsconfig.json 1:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Running: /user/username/projects/sample1/tests/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Config: /user/username/projects/sample1/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "declarationDir": "/user/username/projects/sample1/logic/decls",
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  }
 ]
}
Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/sample1/tests/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/sample1/tests/tsconfig.json