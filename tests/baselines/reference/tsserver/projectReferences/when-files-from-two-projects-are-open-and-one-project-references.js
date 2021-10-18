Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/main/src/file1.ts"}}
Search path: /user/username/projects/myproject/main/src
For info: /user/username/projects/myproject/main/src/file1.ts :: Config file name: /user/username/projects/myproject/main/tsconfig.json
Creating configuration project /user/username/projects/myproject/main/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/main/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/main/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/main/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  },
  {
   "path": "/user/username/projects/myproject/indirect",
   "originalPath": "../indirect"
  },
  {
   "path": "/user/username/projects/myproject/noCoreRef1",
   "originalPath": "../noCoreRef1"
  },
  {
   "path": "/user/username/projects/myproject/indirectDisabledChildLoad1",
   "originalPath": "../indirectDisabledChildLoad1"
  },
  {
   "path": "/user/username/projects/myproject/indirectDisabledChildLoad2",
   "originalPath": "../indirectDisabledChildLoad2"
  },
  {
   "path": "/user/username/projects/myproject/refToCoreRef3",
   "originalPath": "../refToCoreRef3"
  },
  {
   "path": "/user/username/projects/myproject/indirectNoCoreRef",
   "originalPath": "../indirectNoCoreRef"
  }
 ]
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json
Config: /user/username/projects/myproject/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/core/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/core/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core 1 undefined Config: /user/username/projects/myproject/core/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core 1 undefined Config: /user/username/projects/myproject/core/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/indirect/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/indirect/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/coreRef1",
   "originalPath": "../coreRef1"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect 1 undefined Config: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect 1 undefined Config: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/coreRef1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/coreRef1/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/coreRef1/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1 1 undefined Config: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1 1 undefined Config: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/noCoreRef1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/noCoreRef1/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/noCoreRef1/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef1 1 undefined Config: /user/username/projects/myproject/noCoreRef1/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef1 1 undefined Config: /user/username/projects/myproject/noCoreRef1/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirectDisabledChildLoad1/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/coreRef2",
   "originalPath": "../coreRef2"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1 1 undefined Config: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1 1 undefined Config: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/coreRef2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/coreRef2/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/coreRef2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef2 1 undefined Config: /user/username/projects/myproject/coreRef2/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef2 1 undefined Config: /user/username/projects/myproject/coreRef2/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirectDisabledChildLoad2/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/coreRef3",
   "originalPath": "../coreRef3"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2 1 undefined Config: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2 1 undefined Config: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/coreRef3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/coreRef3/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/coreRef3/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3 1 undefined Config: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3 1 undefined Config: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/refToCoreRef3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/refToCoreRef3/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/refToCoreRef3/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/coreRef3",
   "originalPath": "../coreRef3"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3 1 undefined Config: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3 1 undefined Config: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/indirectNoCoreRef/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirectNoCoreRef/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/indirectNoCoreRef/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/noCoreRef2",
   "originalPath": "../noCoreRef2"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectNoCoreRef/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectNoCoreRef 1 undefined Config: /user/username/projects/myproject/indirectNoCoreRef/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectNoCoreRef 1 undefined Config: /user/username/projects/myproject/indirectNoCoreRef/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/noCoreRef2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/noCoreRef2/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/noCoreRef2/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef2 1 undefined Config: /user/username/projects/myproject/noCoreRef2/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef2 1 undefined Config: /user/username/projects/myproject/noCoreRef2/tsconfig.json WatchType: Wild card directory
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/main/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Search path: /user/username/projects/myproject/main
For info: /user/username/projects/myproject/main/tsconfig.json :: No config files found.
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/main/src/file1.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/core/src/file1.ts"}}
Search path: /user/username/projects/myproject/core/src
For info: /user/username/projects/myproject/core/src/file1.ts :: Config file name: /user/username/projects/myproject/core/tsconfig.json
Creating configuration project /user/username/projects/myproject/core/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/core/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/node_modules/@types 1 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/node_modules/@types 1 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/core/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/core/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/core/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Search path: /user/username/projects/myproject/core
For info: /user/username/projects/myproject/core/tsconfig.json :: No config files found.
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/user/username/projects/myproject/core/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/main/src/file1.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json
	FileName: /user/username/projects/myproject/core/src/file1.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/core/tsconfig.json
response:{"responseRequired":false}
request:{"command":"references","arguments":{"file":"/user/username/projects/myproject/core/src/file1.ts","line":1,"offset":14},"seq":1,"type":"request"}
Creating configuration project /user/username/projects/myproject/indirect/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect/src/file1.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/indirect/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirect/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/indirect/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/indirect/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Creating configuration project /user/username/projects/myproject/coreRef1/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1/src/file1.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/coreRef1/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/coreRef1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/coreRef1/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/coreRef1/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Creating configuration project /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1/src/file1.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/indirectDisabledChildLoad1/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Creating configuration project /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2/src/file1.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/indirectDisabledChildLoad2/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Creating configuration project /user/username/projects/myproject/refToCoreRef3/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3/src/file1.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/refToCoreRef3/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/refToCoreRef3/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Creating configuration project /user/username/projects/myproject/coreRef3/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3/src/file1.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/coreRef3/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/coreRef3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/coreRef3/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/coreRef3/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/src/file1.d.ts 2000 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Missing generated file
response:{"response":{"refs":[{"file":"/user/username/projects/myproject/core/src/file1.ts","start":{"line":1,"offset":14},"end":{"line":1,"offset":23},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":29},"lineText":"export const coreConst = 10;","isWriteAccess":true,"isDefinition":true}],"symbolName":"coreConst","symbolStartOffset":14,"symbolDisplayString":"const coreConst: 10"},"responseRequired":true}