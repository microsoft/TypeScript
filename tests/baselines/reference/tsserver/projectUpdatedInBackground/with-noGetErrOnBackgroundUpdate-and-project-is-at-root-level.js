Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"command":"open","arguments":{"file":"/a/b/project/file1.ts"},"seq":1,"type":"request"}
Search path: /a/b/project
For info: /a/b/project/file1.ts :: Config file name: /a/b/project/tsconfig.json
Creating configuration project /a/b/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/project/tsconfig.json 2000 undefined Project: /a/b/project/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/project/tsconfig.json","reason":"Creating possible configured project for /a/b/project/file1.ts to open"}}
Config: /a/b/project/tsconfig.json : {
 "rootNames": [
  "/a/b/project/file1.ts",
  "/a/b/project/file3.ts"
 ],
 "options": {
  "typeRoots": [],
  "configFilePath": "/a/b/project/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a/b/project 1 undefined Config: /a/b/project/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/project 1 undefined Config: /a/b/project/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/b/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /a/b/project/node_modules 1 undefined Project: /a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/project/node_modules 1 undefined Project: /a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /a/b/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/project/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/a/b/project/file1.ts
	/a/b/project/file3.ts


	../../lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/project/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"1cf2001c133ce00fd258494c136bfa9707203d90270d151ea0f575d93d990f9d","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":39,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"typeRoots":[]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/project/file1.ts","configFile":"/a/b/project/tsconfig.json","diagnostics":[]}}
Project '/a/b/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
		Projects: /a/b/project/tsconfig.json
response:{"responseRequired":false}
FileWatcher:: Triggered with /a/b/project/file3.ts 1:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Scheduled: /a/b/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /a/b/project/file3.ts 1:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Running: /a/b/project/tsconfig.json
Starting updateGraphWorker: Project: /a/b/project/tsconfig.json
Finishing updateGraphWorker: Project: /a/b/project/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/a/b/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
		Projects: /a/b/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/a/b/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
		Projects: /a/b/project/tsconfig.json
got projects updated in background, updating diagnostics for /a/b/project/file1.ts
event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/project/file1.ts"]}}