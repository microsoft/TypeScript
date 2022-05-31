Provided types map file "/fshost/typesMap.json" doesn't exist
request:{"command":"updateFileSystem","arguments":{"fileSystem":"memfs","files":[{"file":"/fshost/b/app.ts","fileContent":"import { xyz } from './file3'; let x = xyz"},{"file":"/fshost/b/commonFile1.ts","fileContent":"let x = 1"},{"file":"/fshost/b/commonFile2.ts","fileContent":"let y = 1"},{"file":"/fshost/b/file3.ts","fileContent":"export let xyz = 1;"},{"file":"/fshost/b/tsconfig.json","fileContent":"{}"},{"file":"/fshost/lib/lib.d.ts","fileContent":"/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"}],"deleted":[]},"seq":1,"type":"request"}
response:{"response":true,"responseRequired":true}
request:{"command":"open","arguments":{"file":"/fshost/b/app.ts"},"seq":2,"type":"request"}
Search path: /fshost/b
For info: /fshost/b/app.ts :: Config file name: /fshost/b/tsconfig.json
Creating configuration project /fshost/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /fshost/b/tsconfig.json 2000 undefined Project: /fshost/b/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/fshost/b/tsconfig.json","reason":"Creating possible configured project for /fshost/b/app.ts to open"}}
Config: /fshost/b/tsconfig.json : {
 "rootNames": [
  "/fshost/b/app.ts",
  "/fshost/b/commonFile1.ts",
  "/fshost/b/commonFile2.ts",
  "/fshost/b/file3.ts"
 ],
 "options": {
  "configFilePath": "/fshost/b/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /fshost/b 1 undefined Config: /fshost/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /fshost/b 1 undefined Config: /fshost/b/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /fshost/b/commonFile1.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /fshost/b/commonFile2.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /fshost/b/file3.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /fshost/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /fshost/lib.d.ts 500 undefined Project: /fshost/b/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /fshost/b/node_modules/@types 1 undefined Project: /fshost/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /fshost/b/node_modules/@types 1 undefined Project: /fshost/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /fshost/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/fshost/b/tsconfig.json' (Configured)
	Files (4)
	/fshost/b/file3.ts
	/fshost/b/app.ts
	/fshost/b/commonFile1.ts
	/fshost/b/commonFile2.ts


	file3.ts
	  Imported via './file3' from file 'app.ts'
	  Matched by default include pattern '**/*'
	app.ts
	  Matched by default include pattern '**/*'
	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/fshost/b/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/fshost/b/app.ts","configFile":"/fshost/b/tsconfig.json","diagnostics":[{"text":"File '/fshost/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es3'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
Project '/fshost/b/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /fshost/b/app.ts ProjectRootPath: undefined
		Projects: /fshost/b/tsconfig.json
response:{"responseRequired":false}
request:{"command":"open","arguments":{"file":"/fshost/b/file3.ts","fileContent":"// some copy right notice\nexport let xyz = 1;"},"seq":3,"type":"request"}
FileWatcher:: Close:: WatchInfo: /fshost/b/file3.ts 500 undefined WatchType: Closed Script info
Search path: /fshost/b
For info: /fshost/b/file3.ts :: Config file name: /fshost/b/tsconfig.json
Starting updateGraphWorker: Project: /fshost/b/tsconfig.json
Finishing updateGraphWorker: Project: /fshost/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
Project '/fshost/b/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /fshost/b/app.ts ProjectRootPath: undefined
		Projects: /fshost/b/tsconfig.json
	FileName: /fshost/b/file3.ts ProjectRootPath: undefined
		Projects: /fshost/b/tsconfig.json
response:{"responseRequired":false}
request:{"command":"updateFileSystem","arguments":{"fileSystem":"memfs","files":[],"deleted":[]},"seq":4,"type":"request"}
response:{"response":true,"responseRequired":true}
request:{"command":"updateFileSystem","arguments":{"fileSystem":"memfs","files":[],"deleted":["/fshost/b/commonFile1.ts"]},"seq":5,"type":"request"}
FileWatcher:: Triggered with /fshost/b/commonFile1.ts 2:: WatchInfo: /fshost/b/commonFile1.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Close:: WatchInfo: /fshost/b/commonFile1.ts 500 undefined WatchType: Closed Script info
Scheduled: /fshost/b/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /fshost/b/commonFile1.ts 2:: WatchInfo: /fshost/b/commonFile1.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Triggered with /fshost/b/commonFile1.ts :: WatchInfo: /fshost/b 1 undefined Config: /fshost/b/tsconfig.json WatchType: Wild card directory
Scheduled: /fshost/b/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /fshost/b/commonFile1.ts :: WatchInfo: /fshost/b 1 undefined Config: /fshost/b/tsconfig.json WatchType: Wild card directory
response:{"response":true,"responseRequired":true}
request:{"command":"close","arguments":{"file":"/fshost/b/app.ts"},"seq":6,"type":"request"}
FileWatcher:: Added:: WatchInfo: /fshost/b/app.ts 500 undefined WatchType: Closed Script info
Project '/fshost/b/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /fshost/b/file3.ts ProjectRootPath: undefined
		Projects: /fshost/b/tsconfig.json
response:{"responseRequired":false}