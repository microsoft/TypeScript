Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"command":"open","arguments":{"file":"untitled:Untitled-1","fileContent":"/// <reference path=\"../../../../../../typings/@epic/Core.d.ts\" />\n/// <reference path=\"./src/somefile.d.ts\" />","scriptKindName":"TS","projectRootPath":"/user/someuser/projects/someFolder"},"seq":1,"type":"request"}
Search path: 
For info: untitled:Untitled-1 :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /typings/@epic/core.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
FileWatcher:: Added:: WatchInfo: /user/someuser/projects/somefolder/src/somefile.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/someFolder/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/someFolder/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	untitled:Untitled-1


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	untitled:Untitled-1
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: untitled:Untitled-1 ProjectRootPath: /user/someuser/projects/someFolder
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}

ScriptInfos:
path: /user/someuser/projects/somefolder/untitled:untitled-1 fileName: untitled:Untitled-1
path: /a/lib/lib.d.ts fileName: /a/lib/lib.d.ts

request:{"command":"geterr","arguments":{"delay":0,"files":["untitled:Untitled-1"]},"seq":2,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"untitled:Untitled-1","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"untitled:Untitled-1","diagnostics":[{"start":{"line":1,"offset":22},"end":{"line":1,"offset":63},"text":"File '../../../../../../typings/@epic/Core.d.ts' not found.","code":6053,"category":"error"},{"start":{"line":2,"offset":22},"end":{"line":2,"offset":41},"text":"File 'src/somefile.d.ts' not found.","code":6053,"category":"error"}]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"untitled:Untitled-1","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}