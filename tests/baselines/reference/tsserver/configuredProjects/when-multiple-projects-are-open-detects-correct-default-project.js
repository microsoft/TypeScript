Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/foo/index.ts"}}
Search path: /user/username/projects/myproject/foo
For info: /user/username/projects/myproject/foo/index.ts :: Config file name: /user/username/projects/myproject/foo/tsconfig.json
Creating configuration project /user/username/projects/myproject/foo/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/foo/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/foo/index.ts to open"}}
Config: /user/username/projects/myproject/foo/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/foo/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es2017.d.ts"
  ],
  "configFilePath": "/user/username/projects/myproject/foo/tsconfig.json"
 }
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2017.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.es2017.d.ts
	/user/username/projects/myproject/bar/index.ts
	/user/username/projects/myproject/foo/index.ts


	../../../../../a/lib/lib.es2017.d.ts
	  Library 'lib.es2017.d.ts' specified in compilerOptions
	../bar/index.ts
	  Imported via "bar" from file 'index.ts'
	index.ts
	  Matched by include pattern 'index.ts' in 'tsconfig.json'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/foo/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"36730603d9c37d63f14b455060fadde05a7a93dcbc44aecd507b60e066616be6","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":90,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"lib":["es2017"]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/foo/index.ts","configFile":"/user/username/projects/myproject/foo/tsconfig.json","diagnostics":[]}}
Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/foo/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/bar/index.ts"}}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/bar/index.ts 500 undefined WatchType: Closed Script info
Search path: /user/username/projects/myproject/bar
For info: /user/username/projects/myproject/bar/index.ts :: Config file name: /user/username/projects/myproject/bar/tsconfig.json
Creating configuration project /user/username/projects/myproject/bar/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/bar/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/bar/index.ts to open"}}
Config: /user/username/projects/myproject/bar/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/bar/index.ts"
 ],
 "options": {
  "lib": [
   "lib.dom.d.ts",
   "lib.es2017.d.ts"
  ],
  "configFilePath": "/user/username/projects/myproject/bar/tsconfig.json"
 }
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.dom.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.es2017.d.ts
	/a/lib/lib.dom.d.ts
	/user/username/projects/myproject/bar/index.ts


	../../../../../a/lib/lib.es2017.d.ts
	  Library 'lib.es2017.d.ts' specified in compilerOptions
	../../../../../a/lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	index.ts
	  Matched by include pattern 'index.ts' in 'tsconfig.json'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/bar/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5370ca7ca3faf398ecd694700ec7a0793b5e111125c5b8f56f69d3de23ff19ae","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":56,"tsx":0,"tsxSize":0,"dts":2,"dtsSize":391,"deferred":0,"deferredSize":0},"compilerOptions":{"lib":["dom","es2017"]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/bar/index.ts","configFile":"/user/username/projects/myproject/bar/tsconfig.json","diagnostics":[]}}
Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/foo/tsconfig.json
	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/foo/tsconfig.json,/user/username/projects/myproject/bar/tsconfig.json
response:{"responseRequired":false}
request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/bar/index.ts","/user/username/projects/myproject/foo/index.ts"]},"seq":1,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/bar/index.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/bar/index.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/bar/index.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/foo/index.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/foo/index.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/foo/index.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}