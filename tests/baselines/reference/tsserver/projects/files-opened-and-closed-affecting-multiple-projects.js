Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"command":"open","arguments":{"file":"/a/b/projects/config/file.ts"},"seq":1,"type":"request"}
Search path: /a/b/projects/config
For info: /a/b/projects/config/file.ts :: Config file name: /a/b/projects/config/tsconfig.json
Creating configuration project /a/b/projects/config/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/projects/config/tsconfig.json 2000 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Config file
Config: /a/b/projects/config/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/config/file.ts"
 ],
 "options": {
  "configFilePath": "/a/b/projects/config/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/config 1 undefined Config: /a/b/projects/config/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/config 1 undefined Config: /a/b/projects/config/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /a/b/projects/config/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/projects/files/file1.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/config/node_modules/@types 1 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/config/node_modules/@types 1 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/projects/config/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/projects/config/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/a/b/projects/files/file1.ts
	/a/b/projects/config/file.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	../files/file1.ts
	  Imported via "../files/file1" from file 'file.ts'
	file.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Project '/a/b/projects/config/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/config/file.ts ProjectRootPath: undefined
		Projects: /a/b/projects/config/tsconfig.json
response:{"responseRequired":false}
request:{"command":"open","arguments":{"file":"/a/b/projects/files/file1.ts"},"seq":2,"type":"request"}
FileWatcher:: Close:: WatchInfo: /a/b/projects/files/file1.ts 500 undefined WatchType: Closed Script info
Search path: /a/b/projects/files
For info: /a/b/projects/files/file1.ts :: No config files found.
Project '/a/b/projects/config/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/config/file.ts ProjectRootPath: undefined
		Projects: /a/b/projects/config/tsconfig.json
	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
		Projects: /a/b/projects/config/tsconfig.json
response:{"responseRequired":false}
request:{"command":"close","arguments":{"file":"/a/b/projects/config/file.ts"},"seq":3,"type":"request"}
FileWatcher:: Added:: WatchInfo: /a/b/projects/config/file.ts 500 undefined WatchType: Closed Script info
Project '/a/b/projects/config/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
		Projects: /a/b/projects/config/tsconfig.json
response:{"responseRequired":false}
request:{"command":"open","arguments":{"file":"/a/b/projects/files/file2.ts"},"seq":4,"type":"request"}
Search path: /a/b/projects/files
For info: /a/b/projects/files/file2.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/b/projects/files/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /a/b/projects/files/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/files/file2.ts


	../../../lib/lib.d.ts
	  Default library for target 'es5'
	file2.ts
	  Root file specified for compilation

-----------------------------------------------
`remove Project::
Project '/a/b/projects/config/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/a/b/projects/files/file1.ts
	/a/b/projects/config/file.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	../files/file1.ts
	  Imported via "../files/file1" from file 'file.ts'
	file.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/config 1 undefined Config: /a/b/projects/config/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/config 1 undefined Config: /a/b/projects/config/tsconfig.json WatchType: Wild card directory
FileWatcher:: Close:: WatchInfo: /a/b/projects/config/tsconfig.json 2000 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Config file
DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/config/node_modules/@types 1 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/config/node_modules/@types 1 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Type roots
FileWatcher:: Close:: WatchInfo: /a/b/projects/config/file.ts 500 undefined WatchType: Closed Script info
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
		Projects: 
	FileName: /a/b/projects/files/file2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"command":"occurrences","arguments":{"file":"/a/b/projects/files/file1.ts","line":1,"offset":11},"seq":5,"type":"request"}
Before ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
		Projects: 
	FileName: /a/b/projects/files/file2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject2*
DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/files/file1.ts


	../../../lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
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
	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
	FileName: /a/b/projects/files/file2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"response":[],"responseRequired":true}