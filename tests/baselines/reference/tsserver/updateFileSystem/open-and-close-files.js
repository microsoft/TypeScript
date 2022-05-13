Provided types map file "/a/typesMap.json" doesn't exist
request:{"command":"updateFileSystem","arguments":{"fileSystem":"memfs","files":[{"file":"/a/b/app.ts","fileContent":"import { xyz } from './file3'; let x = xyz"},{"file":"/a/b/commonFile1.ts","fileContent":"let x = 1"},{"file":"/a/b/commonFile2.ts","fileContent":"let y = 1"},{"file":"/a/b/file3.ts","fileContent":"export let xyz = 1;"},{"file":"/a/b/tsconfig.json","fileContent":"{}"},{"file":"/a/lib/lib.d.ts","fileContent":"/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"}],"deleted":[]},"seq":1,"type":"request"}
response:{"response":true,"responseRequired":true}
request:{"command":"open","arguments":{"file":"/a/b/app.ts"},"seq":2,"type":"request"}
Search path: /a/b
For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Creating configuration project /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/app.ts to open"}}
Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts",
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts",
  "/a/b/file3.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/b/commonFile1.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (4)
	/a/b/file3.ts
	/a/b/app.ts
	/a/b/commonFile1.ts
	/a/b/commonFile2.ts


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
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/app.ts","configFile":"/a/b/tsconfig.json","diagnostics":[{"text":"File '/a/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es3'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
Project '/a/b/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /a/b/app.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
response:{"responseRequired":false}
request:{"command":"open","arguments":{"file":"/a/b/file3.ts","fileContent":"// some copy right notice\nexport let xyz = 1;"},"seq":3,"type":"request"}
FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Search path: /a/b
For info: /a/b/file3.ts :: Config file name: /a/b/tsconfig.json
Starting updateGraphWorker: Project: /a/b/tsconfig.json
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
Project '/a/b/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /a/b/app.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
response:{"responseRequired":false}
request:{"command":"updateFileSystem","arguments":{"fileSystem":"memfs","files":[],"deleted":[]},"seq":4,"type":"request"}
response:{"response":true,"responseRequired":true}
request:{"command":"updateFileSystem","arguments":{"fileSystem":"memfs","files":[],"deleted":["/a/b/commonFile1.ts"]},"seq":5,"type":"request"}
FileWatcher:: Triggered with /a/b/commonFile1.ts 2:: WatchInfo: /a/b/commonFile1.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Close:: WatchInfo: /a/b/commonFile1.ts 500 undefined WatchType: Closed Script info
Scheduled: /a/b/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /a/b/commonFile1.ts 2:: WatchInfo: /a/b/commonFile1.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Triggered with /a/b/commonFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Scheduled: /a/b/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/commonFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
response:{"response":true,"responseRequired":true}
request:{"command":"close","arguments":{"file":"/a/b/app.ts"},"seq":6,"type":"request"}
FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Project '/a/b/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /a/b/file3.ts ProjectRootPath: undefined
		Projects: /a/b/tsconfig.json
response:{"responseRequired":false}