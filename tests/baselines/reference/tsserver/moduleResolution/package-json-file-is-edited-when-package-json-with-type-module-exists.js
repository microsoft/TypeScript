Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/project/src/fileA.ts"}}
Search path: /project/src
For info: /project/src/fileA.ts :: Config file name: /project/src/tsconfig.json
Creating configuration project /project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /project/src/tsconfig.json 2000 undefined Project: /project/src/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/project/src/tsconfig.json","reason":"Creating possible configured project for /project/src/fileA.ts to open"}}
Config: /project/src/tsconfig.json : {
 "rootNames": [
  "/project/src/fileA.ts",
  "/project/src/fileB.mts"
 ],
 "options": {
  "target": 3,
  "module": 100,
  "outDir": "/project/out",
  "traceResolution": true,
  "configFilePath": "/project/src/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /project/src 1 undefined Config: /project/src/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/src 1 undefined Config: /project/src/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /project/src/fileB.mts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /project/src/tsconfig.json
File '/project/src/package.json' does not exist.
Found 'package.json' at '/project/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './fileB.mjs' from '/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/project/src/fileB.mjs', target file type 'TypeScript'.
File name '/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/project/src/fileB.mts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /project/src/node_modules/@types 1 undefined Project: /project/src/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/src/node_modules/@types 1 undefined Project: /project/src/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /project/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/project/src/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.es2016.full.d.ts
	/project/src/fileB.mts
	/project/src/fileA.ts


	../../a/lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	fileB.mts
	  Imported via "./fileB.mjs" from file 'fileA.ts'
	  Matched by default include pattern '**/*'
	fileA.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
FileWatcher:: Added:: WatchInfo: /project/package.json 250 undefined WatchType: package.json file
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/project/src/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"a3b45b8f68f65469901c233d34469b471d96c653005963b26785ecd050e1e1b3","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":68,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"target":"es2016","module":"node16","outDir":"","traceResolution":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/project/src/fileA.ts","configFile":"/project/src/tsconfig.json","diagnostics":[]}}
Project '/project/src/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /project/src/fileA.ts ProjectRootPath: undefined
		Projects: /project/src/tsconfig.json
response:{"responseRequired":false}
Modify package json file to remove type module
FileWatcher:: Triggered with /project/package.json 1:: WatchInfo: /project/package.json 250 undefined WatchType: package.json file
Elapsed:: *ms FileWatcher:: Triggered with /project/package.json 1:: WatchInfo: /project/package.json 250 undefined WatchType: package.json file
request:{"command":"geterr","arguments":{"delay":0,"files":["/project/src/fileA.ts"]},"seq":1,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Modify package json file to add type module
FileWatcher:: Triggered with /project/package.json 1:: WatchInfo: /project/package.json 250 undefined WatchType: package.json file
Elapsed:: *ms FileWatcher:: Triggered with /project/package.json 1:: WatchInfo: /project/package.json 250 undefined WatchType: package.json file
request:{"command":"geterr","arguments":{"delay":0,"files":["/project/src/fileA.ts"]},"seq":2,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Delete package.json
FileWatcher:: Triggered with /project/package.json 2:: WatchInfo: /project/package.json 250 undefined WatchType: package.json file
FileWatcher:: Close:: WatchInfo: /project/package.json 250 undefined WatchType: package.json file
Elapsed:: *ms FileWatcher:: Triggered with /project/package.json 2:: WatchInfo: /project/package.json 250 undefined WatchType: package.json file
request:{"command":"geterr","arguments":{"delay":0,"files":["/project/src/fileA.ts"]},"seq":3,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Modify package json file to without type module
request:{"command":"geterr","arguments":{"delay":0,"files":["/project/src/fileA.ts"]},"seq":4,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":4}}
Delete package.json
request:{"command":"geterr","arguments":{"delay":0,"files":["/project/src/fileA.ts"]},"seq":5,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/project/src/fileA.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":5}}