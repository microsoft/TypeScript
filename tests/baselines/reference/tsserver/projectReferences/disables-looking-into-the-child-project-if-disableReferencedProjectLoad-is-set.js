Provided types map file "/a/lib/typesMap.json" doesn't exist
Search path: /user/username/projects/myproject/src
For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Creating configuration project /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":0,"tsSize":0,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{"disableReferencedProjectLoad":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	main.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*

getDefaultProject for /user/username/projects/myproject/src/main.ts: /dev/null/inferredProject1*
findDefaultConfiguredProject for /user/username/projects/myproject/src/main.ts: undefined

Search path: /dummy
For info: /dummy/dummy.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject2*
DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

-----------------------------------------------
`remove Project::
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (0)



-----------------------------------------------
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
	FileName: /dummy/dummy.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /dummy/dummy.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Search path: /dummy
For info: /dummy/dummy.ts :: No config files found.
Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

-----------------------------------------------
`remove Project::
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	main.ts
	  Root file specified for compilation

-----------------------------------------------
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /dummy/dummy.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
Search path: /user/username/projects/myproject/src
For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Creating configuration project /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject3*
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject3*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	main.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject3*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /dummy/dummy.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject3*
reload projects.
Scheduled: /dev/null/inferredProject2*
Scheduled: /dev/null/inferredProject3*
Scheduled: *ensureProjectForOpenFiles*
Search path: /dummy
For info: /dummy/dummy.ts :: No config files found.
Search path: /user/username/projects/myproject/src
For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Reloading configured project /user/username/projects/myproject/tsconfig.json
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"User requested reload projects"}}
Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig.json","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject3*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /dummy/dummy.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject3*
Starting updateGraphWorker: Project: /dev/null/inferredProject2*
DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Starting updateGraphWorker: Project: /dev/null/inferredProject3*
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (0)

-----------------------------------------------
Project '/dev/null/inferredProject2*' (Inferred)
	Files (2)

-----------------------------------------------
Project '/dev/null/inferredProject3*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /dummy/dummy.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject2*
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject3*