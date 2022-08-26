Provided types map file "/typesMap.json" doesn't exist
Search path: /a/username/project/src
For info: /a/username/project/src/index.ts :: Config file name: /a/username/project/tsconfig.json
Creating configuration project /a/username/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/username/project/tsconfig.json 2000 undefined Project: /a/username/project/tsconfig.json WatchType: Config file
Config: /a/username/project/tsconfig.json : {
 "rootNames": [
  "/a/username/project/src/file1.ts",
  "/a/username/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/username/project/tsconfig.json"
 },
 "watchOptions": {
  "synchronousWatchDirectory": true
 }
}
FileWatcher:: Close:: WatchInfo: /a/username/project/tsconfig.json 2000 undefined Project: /a/username/project/tsconfig.json WatchType: Config file
FileWatcher:: Added:: WatchInfo: /a/username/project/tsconfig.json 2000 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/username/project/src/file1.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/username/project/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /a/username/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/username/project/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/a/username/project/src/file1.ts
	/a/username/project/src/index.ts


	../../lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	  Imported via "./" from file 'src/index.ts'

-----------------------------------------------
Project '/a/username/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/username/project/src/index.ts ProjectRootPath: undefined
		Projects: /a/username/project/tsconfig.json
Completion Entries:: ["file1"]
WatchedFiles::
/a/username/project/tsconfig.json:
  {"fileName":"/a/username/project/tsconfig.json","pollingInterval":250}
/a/username/project:
  {"fileName":"/a/username/project","pollingInterval":500}
/a/username/project/src:
  {"fileName":"/a/username/project/src","pollingInterval":500}
/a/username/project/src/file1.ts:
  {"fileName":"/a/username/project/src/file1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/username/project/node_modules/@types:
  {"fileName":"/a/username/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::

DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Scheduled: /a/username/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /a/username/project/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Running: /a/username/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
FileWatcher:: Added:: WatchInfo: /a/username/project/src/file2.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/username/project/tsconfig.json
Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/username/project/tsconfig.json' (Configured)
	Files (4)
	/a/lib/lib.d.ts
	/a/username/project/src/file1.ts
	/a/username/project/src/index.ts
	/a/username/project/src/file2.ts


	../../lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	  Imported via "./" from file 'src/index.ts'
	src/file2.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Completion Entries:: ["file1","file2"]
WatchedFiles::
/a/username/project/tsconfig.json:
  {"fileName":"/a/username/project/tsconfig.json","pollingInterval":250}
/a/username/project:
  {"fileName":"/a/username/project","pollingInterval":500}
/a/username/project/src:
  {"fileName":"/a/username/project/src","pollingInterval":500}
/a/username/project/src/file1.ts:
  {"fileName":"/a/username/project/src/file1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/username/project/node_modules/@types:
  {"fileName":"/a/username/project/node_modules/@types","pollingInterval":500}
/a/username/project/src/file2.ts:
  {"fileName":"/a/username/project/src/file2.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
