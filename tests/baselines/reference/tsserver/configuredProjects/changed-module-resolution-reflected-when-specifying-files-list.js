Provided types map file "/typesMap.json" doesn't exist
Search path: /a/b
For info: /a/b/file1.ts :: Config file name: /a/b/tsconfig.json
Creating configuration project /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1.ts"
 ],
 "options": {
  "module": 2,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/file2.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/a/file2.ts
	/a/b/file1.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	../file2.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
DirectoryWatcher:: Triggered with /a/b/file2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/file2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Running: /a/b/tsconfig.jsonFailedLookupInvalidation
Scheduled: /a/b/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Running: /a/b/tsconfig.json
Starting updateGraphWorker: Project: /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/a/b/file2.ts
	/a/b/file1.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	file2.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
After ensureProjectForOpenFiles:
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
FileWatcher:: Close:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
Search path: /a/b
For info: /a/b/file2.ts :: Config file name: /a/b/tsconfig.json
FileWatcher:: Close:: WatchInfo: /a/file2.ts 500 undefined WatchType: Closed Script info
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/file1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/file2.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json