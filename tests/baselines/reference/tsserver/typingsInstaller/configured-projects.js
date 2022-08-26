Provided types map file "/typesMap.json" doesn't exist
Search path: /a/b
For info: /a/b/app.js :: Config file name: /a/b/tsconfig.json
Creating configuration project /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.js"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (1)
	/a/b/app.js


	app.js
	  Matched by default include pattern '**/*'

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/b/app.js ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
Scheduled: /a/b/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Running: /a/b/tsconfig.json
Starting updateGraphWorker: Project: /a/b/tsconfig.json
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (2)
	/a/b/app.js
	/a/data/node_modules/@types/jquery/index.d.ts


	app.js
	  Matched by default include pattern '**/*'
	../data/node_modules/@types/jquery/index.d.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/a/b/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/app.js ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
After ensureProjectForOpenFiles:
Project '/a/b/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/app.js ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json