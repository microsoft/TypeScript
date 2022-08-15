Provided types map file "/typesMap.json" doesn't exist
Search path: c:/project
For info: c:/project/file1.ts :: Config file name: c:/project/tsconfig.json
Creating configuration project c:/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: c:/project/tsconfig.json 2000 undefined Project: c:/project/tsconfig.json WatchType: Config file
Config: c:/project/tsconfig.json : {
 "rootNames": [
  "c:/project/file1.ts",
  "c:/project/file2.ts"
 ],
 "options": {
  "configFilePath": "c:/project/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: c:/project 1 undefined Config: c:/project/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/project 1 undefined Config: c:/project/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: c:/project/file2.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: c:/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: c:/project/node_modules/@types 1 undefined Project: c:/project/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/project/node_modules/@types 1 undefined Project: c:/project/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: c:/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project 'c:/project/tsconfig.json' (Configured)
	Files (3)
	c:/a/lib/lib.d.ts
	c:/project/file1.ts
	c:/project/file2.ts


	../a/lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Project 'c:/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: c:/project/file1.ts ProjectRootPath: undefined
		Projects: c:/project/tsconfig.json
PolledWatches::
c:/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
c:/project/tsconfig.json:
  {}
c:/project/file2.ts:
  {}
c:/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
c:/project:
  {}
