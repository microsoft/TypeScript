Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/file.ts"}}
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/file.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/file.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/file.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/file.ts"]},"seq":1,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
request:{"command":"updateOpen","arguments":{"changedFiles":[{"fileName":"/user/username/projects/myproject/file.ts","textChanges":[{"newText":"             ","start":{"line":3,"offset":5},"end":{"line":3,"offset":18}}]}]},"seq":2,"type":"request"}
response:{"response":true,"responseRequired":true}
request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/file.ts"]},"seq":3,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[{"start":{"line":4,"offset":9},"end":{"line":4,"offset":10},"text":"Type 'number' is not assignable to type 'string'.","code":2322,"category":"error"}]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
request:{"command":"updateOpen","arguments":{"changedFiles":[{"fileName":"/user/username/projects/myproject/file.ts","textChanges":[{"newText":"// @ts-ignore","start":{"line":3,"offset":5},"end":{"line":3,"offset":18}}]}]},"seq":4,"type":"request"}
response:{"response":true,"responseRequired":true}
request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/file.ts"]},"seq":5,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":5}}