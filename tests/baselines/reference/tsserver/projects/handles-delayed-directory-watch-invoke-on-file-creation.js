Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/project/b.ts","projectRootPath":"/users/username/projects/project"}}
Search path: /users/username/projects/project
For info: /users/username/projects/project/b.ts :: Config file name: /users/username/projects/project/tsconfig.json
Creating configuration project /users/username/projects/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /users/username/projects/project/tsconfig.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/users/username/projects/project/tsconfig.json","reason":"Creating possible configured project for /users/username/projects/project/b.ts to open"}}
Config: /users/username/projects/project/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/b.ts",
  "/users/username/projects/project/sub/a.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/project/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/a.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/project/b.ts
	/users/username/projects/project/sub/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	b.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'
	sub/a.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/users/username/projects/project/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5b0be5fc7f7235edf5a31bffe614b4e0819e55ec5f118558864b1f882e283c0d","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":40,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/project/b.ts","configFile":"/users/username/projects/project/tsconfig.json","diagnostics":[]}}
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/project/sub/a.ts","projectRootPath":"/users/username/projects/project"}}
FileWatcher:: Close:: WatchInfo: /users/username/projects/project/sub/a.ts 500 undefined WatchType: Closed Script info
Search path: /users/username/projects/project/sub
For info: /users/username/projects/project/sub/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
response:{"responseRequired":false}
DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Scheduled: /users/username/projects/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/users/username/projects/project/sub/a.ts"}}
Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/project/a.ts","projectRootPath":"/users/username/projects/project"}}
Search path: /users/username/projects/project
For info: /users/username/projects/project/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/project/b.ts
	/users/username/projects/project/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	b.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'
	a.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
	FileName: /users/username/projects/project/a.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
response:{"responseRequired":false}
Running: /users/username/projects/project/tsconfig.json
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
	FileName: /users/username/projects/project/a.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
	FileName: /users/username/projects/project/a.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
got projects updated in background, updating diagnostics for /users/username/projects/project/b.ts,/users/username/projects/project/a.ts
event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/users/username/projects/project/b.ts","/users/username/projects/project/a.ts"]}}
request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/users/username/projects/project/a.ts"}}
Scheduled: /users/username/projects/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/project/sub/a.ts","projectRootPath":"/users/username/projects/project"}}
Search path: /users/username/projects/project/sub
For info: /users/username/projects/project/sub/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /users/username/projects/project/a.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/users/username/projects/project/b.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	b.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/project/sub/a.ts","configFile":"/users/username/projects/project/tsconfig.json","diagnostics":[{"text":"File '/users/username/projects/project/a.ts' not found.\n  The file is in the program because:\n    Matched by include pattern '**/*' in '/users/username/projects/project/tsconfig.json'","code":6053,"category":"error"}]}}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /users/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/users/username/projects/project/sub/a.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
Running: /users/username/projects/project/tsconfig.json
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
		Projects: /dev/null/inferredProject1*
After ensureProjectForOpenFiles:
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
		Projects: /users/username/projects/project/tsconfig.json
	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
		Projects: /dev/null/inferredProject1*
got projects updated in background, updating diagnostics for /users/username/projects/project/b.ts,/users/username/projects/project/sub/a.ts
event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/users/username/projects/project/b.ts","/users/username/projects/project/sub/a.ts"]}}
FileWatcher:: Triggered with /users/username/projects/project/a.ts 2:: WatchInfo: /users/username/projects/project/a.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
Elapsed:: *ms FileWatcher:: Triggered with /users/username/projects/project/a.ts 2:: WatchInfo: /users/username/projects/project/a.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Scheduled: /users/username/projects/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
request:{"command":"geterr","arguments":{"delay":0,"files":["/users/username/projects/project/b.ts","/users/username/projects/project/sub/a.ts"]},"seq":1,"type":"request"}
response:{"responseRequired":false}
FileWatcher:: Close:: WatchInfo: /users/username/projects/project/sub/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Close:: WatchInfo: /users/username/projects/project/sub/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Close:: WatchInfo: /users/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
FileWatcher:: Close:: WatchInfo: /users/username/projects/project/a.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/users/username/projects/project/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/project/b.ts
	/users/username/projects/project/sub/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	b.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'
	sub/a.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/project/b.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/project/b.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/project/b.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/project/sub/a.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/project/sub/a.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/project/sub/a.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}