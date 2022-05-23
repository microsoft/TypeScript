Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"command":"open","arguments":{"file":"/user/username/rootfolder/otherfolder/a/b/project/file1.ts"},"seq":1,"type":"request"}
Search path: /user/username/rootfolder/otherfolder/a/b/project
For info: /user/username/rootfolder/otherfolder/a/b/project/file1.ts :: Config file name: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Creating configuration project /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json","reason":"Creating possible configured project for /user/username/rootfolder/otherfolder/a/b/project/file1.ts to open"}}
Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json : {
 "rootNames": [
  "/user/username/rootfolder/otherfolder/a/b/project/file1.ts",
  "/user/username/rootfolder/otherfolder/a/b/project/file3.ts"
 ],
 "options": {
  "typeRoots": [],
  "configFilePath": "/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"79b1a0103ed8006f174a1f979cf698219d4ec4ae3a48594da1085f7a1749553c","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":39,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"typeRoots":[]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/rootfolder/otherfolder/a/b/project/file1.ts","configFile":"/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json","diagnostics":[]}}
Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
response:{"responseRequired":false}
FileWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/project/file3.ts 1:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/project/file3.ts 1:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Running: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
got projects updated in background, updating diagnostics for /user/username/rootfolder/otherfolder/a/b/project/file1.ts
event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/rootfolder/otherfolder/a/b/project/file1.ts"]}}
DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: *ensureProjectForOpenFiles*
Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
	Files (4)
	/a/lib/lib.d.ts
	/user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../node_modules/file2.d.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/rootfolder/otherfolder/a/b/project/file1.ts","diagnostics":[]}}
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
got projects updated in background, updating diagnostics for /user/username/rootfolder/otherfolder/a/b/project/file1.ts
event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/rootfolder/otherfolder/a/b/project/file1.ts"]}}