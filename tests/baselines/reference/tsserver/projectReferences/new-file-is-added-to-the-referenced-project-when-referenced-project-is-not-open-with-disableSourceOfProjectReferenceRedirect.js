Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/projects/project2/class2.ts"}}
Search path: /user/username/projects/myproject/projects/project2
For info: /user/username/projects/myproject/projects/project2/class2.ts :: Config file name: /user/username/projects/myproject/projects/project2/tsconfig.json
Creating configuration project /user/username/projects/myproject/projects/project2/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/projects/project2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/projects/project2/class2.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/myproject/projects/project2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/projects/project1",
   "originalPath": "../project1"
  }
 ]
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Config: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Config: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Config: /user/username/projects/myproject/projects/project1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/projects/project1/class1.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/projects/project1/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class1.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.d.ts
	/user/username/projects/myproject/projects/project2/class2.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Search path: /user/username/projects/myproject/projects/project2
For info: /user/username/projects/myproject/projects/project2/tsconfig.json :: No config files found.
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
response:{"responseRequired":false}
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.d.ts
	/user/username/projects/myproject/projects/project1/class3.d.ts
	/user/username/projects/myproject/projects/project2/class2.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	../project1/class3.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp/file.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 2:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 2:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.d.ts
	/user/username/projects/myproject/projects/project2/class2.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.d.ts
	/user/username/projects/myproject/projects/project1/class3.d.ts
	/user/username/projects/myproject/projects/project2/class2.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	../project1/class3.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json