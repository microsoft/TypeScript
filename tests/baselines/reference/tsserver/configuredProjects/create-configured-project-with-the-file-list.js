Provided types map file "/typesMap.json" doesn't exist
Search path: /a/b
For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Creating configuration project /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts",
  "/a/b/f2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/a/b/f1.ts
	/a/b/f2.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	f1.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	f2.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/f1.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json