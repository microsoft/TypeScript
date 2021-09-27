Provided types map file "/typesMap.json" doesn't exist
Search path: /a
For info: /a/app.js :: Config file name: /a/jsconfig.json
Creating configuration project /a/jsconfig.json
FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Config: /a/jsconfig.json : {
 "rootNames": [
  "/a/app.js",
  "/a/extremlylarge.d.ts",
  "/a/largefile.js",
  "/a/lib/lib.d.ts"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/a/jsconfig.json"
 }
}
Non TS file size exceeded limit (20971531). Largest files: /a/largefile.js:20971521, /a/app.js:10
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/extremlylarge.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/largefile.js 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/jsconfig.json
Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/jsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/a/app.js


	lib/lib.d.ts
	  Default library for target 'es3'
	app.js
	  Matched by include pattern '**/*' in 'jsconfig.json'

-----------------------------------------------
Project '/a/jsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/app.js ProjectRootPath: undefined
		Projects: /a/jsconfig.json
languageServiceEnabled: false
lastFileExceededProgramSize: /a/largefile.js