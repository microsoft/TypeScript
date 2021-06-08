Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/Logger.ts","projectRootPath":"/user/username/projects/myproject"}}
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/Logger.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Creating configuration project /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/Logger.ts to open"}}
Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/Logger.ts",
  "/user/username/projects/myproject/another.ts"
 ],
 "options": {
  "forceConsistentCasingInFileNames": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/another.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/Logger.ts
	/user/username/projects/myproject/another.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	Logger.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'
	  Imported via "./Logger" from file 'another.ts'
	another.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":71,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"forceConsistentCasingInFileNames":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/Logger.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/Logger.ts ProjectRootPath: /user/username/projects/myproject
		Projects: /user/username/projects/myproject/tsconfig.json
response:{"responseRequired":false}
request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/Logger.ts"]},"seq":1,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/Logger.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/Logger.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/Logger.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
DirectoryWatcher:: Triggered with /user/username/projects/myproject/Logger.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/Logger.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/logger.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/logger.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/Logger.ts"}}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/Logger.ts 500 undefined WatchType: Closed Script info
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/logger.ts","projectRootPath":"/user/username/projects/myproject"}}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/Logger.ts 500 undefined WatchType: Closed Script info
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/Logger.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/Logger.ts ProjectRootPath: /user/username/projects/myproject
		Projects: /user/username/projects/myproject/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/another.ts","projectRootPath":"/user/username/projects/myproject"}}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/another.ts 500 undefined WatchType: Closed Script info
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/another.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/Logger.ts ProjectRootPath: /user/username/projects/myproject
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/another.ts ProjectRootPath: /user/username/projects/myproject
		Projects: /user/username/projects/myproject/tsconfig.json
response:{"responseRequired":false}
request:{"command":"updateOpen","arguments":{"changedFiles":[{"fileName":"/user/username/projects/myproject/another.ts","textChanges":[{"newText":"./logger","start":{"line":1,"offset":25},"end":{"line":1,"offset":33}}]}]},"seq":2,"type":"request"}
response:{"response":true,"responseRequired":true}
request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/logger.ts","/user/username/projects/myproject/another.ts"]},"seq":3,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/logger.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/logger.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/logger.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/another.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/another.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/another.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}