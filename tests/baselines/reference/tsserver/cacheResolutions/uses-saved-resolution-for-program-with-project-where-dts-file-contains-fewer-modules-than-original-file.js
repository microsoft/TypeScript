Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/tests/index.ts"}}
Search path: /user/username/projects/myproject/tests
For info: /user/username/projects/myproject/tests/index.ts :: Config file name: /user/username/projects/myproject/tests/tsconfig.json
Creating configuration project /user/username/projects/myproject/tests/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/tests/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/tests/index.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tests/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/logic",
   "originalPath": "../logic"
  }
 ]
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests 1 undefined Config: /user/username/projects/myproject/tests/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests 1 undefined Config: /user/username/projects/myproject/tests/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/tests/tsconfig.json
Config: /user/username/projects/myproject/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/logic/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/logic 1 undefined Config: /user/username/projects/myproject/logic/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/logic 1 undefined Config: /user/username/projects/myproject/logic/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/core/anotherClass.ts",
  "/user/username/projects/myproject/core/index.ts",
  "/user/username/projects/myproject/core/myClass.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/core/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core 1 undefined Config: /user/username/projects/myproject/core/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core 1 undefined Config: /user/username/projects/myproject/core/tsconfig.json WatchType: Wild card directory
======== Resolving module '../logic' from '/user/username/projects/myproject/tests/index.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/logic', target file type 'TypeScript'.
File '/user/username/projects/myproject/logic.ts' does not exist.
File '/user/username/projects/myproject/logic.tsx' does not exist.
File '/user/username/projects/myproject/logic.d.ts' does not exist.
File '/user/username/projects/myproject/logic/package.json' does not exist.
File '/user/username/projects/myproject/logic/index.ts' exist - use it as a name resolution result.
======== Module name '../logic' was successfully resolved to '/user/username/projects/myproject/logic/index.ts'. ========
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/logic/index.ts 500 undefined WatchType: Closed Script info
======== Resolving module '../core/myClass' from '/user/username/projects/myproject/logic/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/logic/tsconfig.json'.
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/core/myClass', target file type 'TypeScript'.
File '/user/username/projects/myproject/core/myClass.ts' exist - use it as a name resolution result.
======== Module name '../core/myClass' was successfully resolved to '/user/username/projects/myproject/core/myClass.ts'. ========
======== Resolving module '../core' from '/user/username/projects/myproject/logic/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/logic/tsconfig.json'.
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/core', target file type 'TypeScript'.
File '/user/username/projects/myproject/core.ts' does not exist.
File '/user/username/projects/myproject/core.tsx' does not exist.
File '/user/username/projects/myproject/core.d.ts' does not exist.
File '/user/username/projects/myproject/core/package.json' does not exist.
File '/user/username/projects/myproject/core/index.ts' exist - use it as a name resolution result.
======== Module name '../core' was successfully resolved to '/user/username/projects/myproject/core/index.ts'. ========
======== Resolving module '../core/anotherClass' from '/user/username/projects/myproject/logic/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/logic/tsconfig.json'.
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/core/anotherClass', target file type 'TypeScript'.
File '/user/username/projects/myproject/core/anotherClass.ts' exist - use it as a name resolution result.
======== Module name '../core/anotherClass' was successfully resolved to '/user/username/projects/myproject/core/anotherClass.ts'. ========
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/myClass.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/anotherClass.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/tests/tsconfig.json' (Configured)
	Files (6)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/core/myClass.ts
	/user/username/projects/myproject/core/index.ts
	/user/username/projects/myproject/core/anotherClass.ts
	/user/username/projects/myproject/logic/index.ts
	/user/username/projects/myproject/tests/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../core/myClass.ts
	  Imported via "../core/myClass" from file '../logic/index.ts'
	../core/index.ts
	  Imported via "../core" from file '../logic/index.ts'
	../core/anotherClass.ts
	  Imported via "../core/anotherClass" from file '../logic/index.ts'
	../logic/index.ts
	  Imported via "../logic" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Search path: /user/username/projects/myproject/tests
For info: /user/username/projects/myproject/tests/tsconfig.json :: No config files found.
Project '/user/username/projects/myproject/tests/tsconfig.json' (Configured)
	Files (6)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tests/tsconfig.json
response:{"responseRequired":false}