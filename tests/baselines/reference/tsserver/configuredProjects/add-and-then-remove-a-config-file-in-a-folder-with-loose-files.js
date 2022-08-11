Provided types map file "/typesMap.json" doesn't exist
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/commonFile1.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/commonFile1.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/commonFile2.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject2*
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/commonFile2.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	commonFile2.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/commonFile1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Creating configuration project /user/username/projects/myproject/tsconfig.json
Scheduled: /user/username/projects/myproject/tsconfig.json
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/commonFile2.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Running: /user/username/projects/myproject/tsconfig.json
Loading configured project /user/username/projects/myproject/tsconfig.json
Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/commonFile1.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/commonFile1.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	commonFile1.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)



-----------------------------------------------
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
`remove Project::
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/commonFile1.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	commonFile1.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/commonFile1.ts :: No config files found.
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/commonFile2.ts :: No config files found.
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
		Projects: 
	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/commonFile1.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Root file specified for compilation

-----------------------------------------------
After ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*