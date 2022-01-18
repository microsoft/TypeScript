Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/test.ts"}}
Search path: /a/b
For info: /a/b/test.ts :: Config file name: /a/b/tsconfig.json
Creating configuration project /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/test.ts to open"}}
Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/app.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	app.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":10,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/test.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/test.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	test.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/test.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/app.ts"}}
FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Search path: /a/b
For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Project '/a/b/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/test.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
	FileName: /a/b/app.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/test2.ts"}}
Search path: /a/b
For info: /a/b/test2.ts :: Config file name: /a/b/tsconfig.json
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/test2.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject2*
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/test2.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	test2.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/test.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
	FileName: /a/b/app.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/test2.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
response:{"responseRequired":false}