Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/ui.ts"}}
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/ui.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Creating configuration project /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/ui.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/ui.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	ui.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/ui.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
response:{"responseRequired":false}
request:{"command":"syntacticDiagnosticsSync","arguments":{"file":"/user/username/projects/myproject/ui.ts","projectFileName":"/user/username/projects/myproject/tsconfig.json"},"seq":1,"type":"request"}
response:{"response":[],"responseRequired":true}
request:{"command":"semanticDiagnosticsSync","arguments":{"file":"/user/username/projects/myproject/ui.ts","projectFileName":"/user/username/projects/myproject/tsconfig.json"},"seq":2,"type":"request"}
response:{"response":[{"start":{"line":1,"offset":11},"end":{"line":1,"offset":39},"text":"An async function or method must return a 'Promise'. Make sure you have a declaration for 'Promise' or include 'ES2015' in your '--lib' option.","code":2697,"category":"error"}],"responseRequired":true}
request:{"command":"suggestionDiagnosticsSync","arguments":{"file":"/user/username/projects/myproject/ui.ts","projectFileName":"/user/username/projects/myproject/tsconfig.json"},"seq":3,"type":"request"}
response:{"response":[],"responseRequired":true}