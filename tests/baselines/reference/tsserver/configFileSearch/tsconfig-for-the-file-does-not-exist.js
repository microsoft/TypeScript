Provided types map file "/typesMap.json" doesn't exist
Search path: /a/b/projects/project/src
For info: /a/b/projects/project/src/index.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../../lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
		Projects: /dev/null/inferredProject1*
FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Search path: /a/b/projects/project/src
For info: /a/b/projects/project/src/index.ts :: Config file name: /a/b/projects/project/tsconfig.json
Creating configuration project /a/b/projects/project/tsconfig.json
Scheduled: /a/b/projects/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Running: /a/b/projects/project/tsconfig.json
Loading configured project /a/b/projects/project/tsconfig.json
Config: /a/b/projects/project/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/b/projects/project/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Close:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /a/b/projects/project/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/projects/project/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	src/index.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/a/b/projects/project/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
		Projects: /a/b/projects/project/tsconfig.json
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)



-----------------------------------------------
After ensureProjectForOpenFiles:
Project '/a/b/projects/project/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
		Projects: /a/b/projects/project/tsconfig.json
FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 2:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
`remove Project::
Project '/a/b/projects/project/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	src/index.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
FileWatcher:: Close:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Search path: /a/b/projects/project/src
For info: /a/b/projects/project/src/index.ts :: No config files found.
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 2:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (0)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
		Projects: 
FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../../lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Root file specified for compilation

-----------------------------------------------
After ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
		Projects: /dev/null/inferredProject1*