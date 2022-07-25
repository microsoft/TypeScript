Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/sample1/tests/index.ts"}}
Search path: /user/username/projects/sample1/tests
For info: /user/username/projects/sample1/tests/index.ts :: Config file name: /user/username/projects/sample1/tests/tsconfig.json
Creating configuration project /user/username/projects/sample1/tests/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Config: /user/username/projects/sample1/tests/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/tests/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/tests/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  },
  {
   "path": "/user/username/projects/sample1/logic",
   "originalPath": "../logic"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Config: /user/username/projects/sample1/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/core/anotherModule.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/some_decl.d.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "declarationMap": true,
  "skipDefaultLibCheck": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/sample1/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Reusing resolution of module '../core/index' from '/user/username/projects/sample1/tests/index.ts' found in cache from location '/user/username/projects/sample1/tests', it was successfully resolved to '/user/username/projects/sample1/core/index.ts'.
Reusing resolution of module '../logic/index' from '/user/username/projects/sample1/tests/index.ts' found in cache from location '/user/username/projects/sample1/tests', it was successfully resolved to '/user/username/projects/sample1/logic/index.ts'.
Reusing resolution of module '../core/anotherModule' from '/user/username/projects/sample1/tests/index.ts' found in cache from location '/user/username/projects/sample1/tests', it was successfully resolved to '/user/username/projects/sample1/core/anotherModule.ts'.
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Reusing resolution of module '../core/anotherModule' from '/user/username/projects/sample1/logic/index.ts' found in cache from location '/user/username/projects/sample1/logic', it was successfully resolved to '/user/username/projects/sample1/core/anotherModule.ts'.
======== Resolving module '../core/index' from '/user/username/projects/sample1/logic/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/sample1/logic/tsconfig.json'.
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/index', target file type 'TypeScript'.
File '/user/username/projects/sample1/core/index.ts' exist - use it as a name resolution result.
======== Module name '../core/index' was successfully resolved to '/user/username/projects/sample1/core/index.ts'. ========
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/anotherModule.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/sample1/core/index.ts
	/user/username/projects/sample1/core/anotherModule.ts
	/user/username/projects/sample1/logic/index.ts
	/user/username/projects/sample1/tests/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../core/index.ts
	  Imported via '../core/index' from file 'index.ts'
	  Imported via '../core/index' from file '../logic/index.ts'
	../core/anotherModule.ts
	  Imported via '../core/anotherModule' from file '../logic/index.ts'
	  Imported via '../core/anotherModule' from file 'index.ts'
	../logic/index.ts
	  Imported via '../logic/index' from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Search path: /user/username/projects/sample1/tests
For info: /user/username/projects/sample1/tests/tsconfig.json :: No config files found.
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/sample1/tests/tsconfig.json
response:{"responseRequired":false}