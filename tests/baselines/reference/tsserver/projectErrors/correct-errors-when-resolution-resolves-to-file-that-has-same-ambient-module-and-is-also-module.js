Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/myproject/src/a.ts"}}
Search path: /users/username/projects/myproject/src
For info: /users/username/projects/myproject/src/a.ts :: Config file name: /users/username/projects/myproject/tsconfig.json
Creating configuration project /users/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/tsconfig.json 2000 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/users/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /users/username/projects/myproject/src/a.ts to open"}}
Config: /users/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/myproject/src/a.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/myproject/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/src 1 undefined Config: /users/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/src 1 undefined Config: /users/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/users/username/projects/myproject/tsconfig.json' (Configured)
	Files (4)
	/a/lib/lib.d.ts
	/users/username/projects/myproject/node_modules/@custom/plugin/proposed.d.ts
	/users/username/projects/myproject/node_modules/@custom/plugin/index.d.ts
	/users/username/projects/myproject/src/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	node_modules/@custom/plugin/proposed.d.ts
	  Imported via './proposed' from file 'node_modules/@custom/plugin/index.d.ts'
	node_modules/@custom/plugin/index.d.ts
	  Imported via "@custom/plugin" from file 'src/a.ts'
	src/a.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/users/username/projects/myproject/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"49814c247d0e4666719ac54e31c3f19091be4020c5ac046c86474826dc7e4ede","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":73,"tsx":0,"tsxSize":0,"dts":3,"dtsSize":486,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/myproject/src/a.ts","configFile":"/users/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Project '/users/username/projects/myproject/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/myproject/src/a.ts ProjectRootPath: undefined
		Projects: /users/username/projects/myproject/tsconfig.json
response:{"responseRequired":false}
request:{"command":"geterr","arguments":{"delay":0,"files":["/users/username/projects/myproject/src/a.ts"]},"seq":1,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[{"start":{"line":1,"offset":1},"end":{"line":1,"offset":44},"text":"'myModule' is declared but its value is never read.","code":6133,"category":"suggestion","reportsUnnecessary":true},{"start":{"line":2,"offset":10},"end":{"line":2,"offset":13},"text":"'foo' is declared but its value is never read.","code":6133,"category":"suggestion","reportsUnnecessary":true}]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
request:{"command":"change","arguments":{"file":"/users/username/projects/myproject/src/a.ts","line":3,"offset":8,"endLine":3,"endOffset":8,"insertString":"o"},"seq":2,"type":"request"}
response:{"responseRequired":false}
request:{"command":"geterr","arguments":{"delay":0,"files":["/users/username/projects/myproject/src/a.ts"]},"seq":3,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json
Finishing updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[{"start":{"line":1,"offset":1},"end":{"line":1,"offset":44},"text":"'myModule' is declared but its value is never read.","code":6133,"category":"suggestion","reportsUnnecessary":true},{"start":{"line":2,"offset":10},"end":{"line":2,"offset":13},"text":"'foo' is declared but its value is never read.","code":6133,"category":"suggestion","reportsUnnecessary":true}]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}