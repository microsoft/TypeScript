Provided types map file "/typesMap.json" doesn't exist
Search path: /a/b/src
For info: /a/b/src/file1.ts :: Config file name: /a/b/tsconfig.json
Creating configuration project /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/src/file1.ts",
  "/a/b/file3.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (2)
	/a/b/src/file1.ts
	/a/b/file3.ts


	src/file1.ts
	  Part of 'files' list in tsconfig.json
	file3.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
Search path: /a/b/src
For info: /a/b/src/file2.ts :: Config file name: /a/b/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)
	/a/b/src/file2.ts


	file2.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Search path: /a/b
For info: /a/b/file3.ts :: Config file name: /a/b/tsconfig.json
Project '/a/b/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
Search path: /a
For info: /a/file4.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject2*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)
	/a/file4.ts


	file4.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/file4.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Scheduled: /a/b/tsconfig.json
Search path: /a/b/src
For info: /a/b/src/file2.ts :: Config file name: /a/b/tsconfig.json
Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Running: /a/b/tsconfig.json
Reloading configured project /a/b/tsconfig.json
Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file3.ts",
  "/a/b/src/file1.ts",
  "/a/b/src/file2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /a/b/tsconfig.json
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (3)
	/a/b/src/file1.ts
	/a/b/file3.ts
	/a/b/src/file2.ts


	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/file4.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)



-----------------------------------------------
After ensureProjectForOpenFiles:
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/file4.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
FileWatcher:: Added:: WatchInfo: /a/b/src/file1.ts 500 undefined WatchType: Closed Script info
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/file4.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
FileWatcher:: Added:: WatchInfo: /a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/file4.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
FileWatcher:: Added:: WatchInfo: /a/file4.ts 500 undefined WatchType: Closed Script info
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
FileWatcher:: Close:: WatchInfo: /a/file4.ts 500 undefined WatchType: Closed Script info
Search path: /a
For info: /a/file4.ts :: No config files found.
Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)
	/a/file4.ts


	file4.ts
	  Root file specified for compilation

-----------------------------------------------
`remove Project::
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)



-----------------------------------------------
DirectoryWatcher:: Close:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/file4.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/file4.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
Search path: /
For info: /file5.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject3*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject3*' (Inferred)
	Files (1)
	/file5.ts


	file5.ts
	  Root file specified for compilation

-----------------------------------------------
`remove Project::
Project '/a/b/tsconfig.json' (Configured)
	Files (3)
	/a/b/src/file1.ts
	/a/b/file3.ts
	/a/b/src/file2.ts


	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
FileWatcher:: Close:: WatchInfo: /a/b/src/file1.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Close:: WatchInfo: /a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Project '/dev/null/inferredProject2*' (Inferred)
	Files (1)

-----------------------------------------------
Project '/dev/null/inferredProject3*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/file4.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
	FileName: /file5.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject3*