Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/a.ts"}}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/a.ts


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"type":"request","seq":1,"command":"syntacticDiagnosticsSync","arguments":{"file":"/user/username/projects/myproject/a.ts"}}
response:{"response":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":18},"text":"')' expected.","code":1005,"category":"error"}],"responseRequired":true}
request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/a.ts"]},"seq":2,"type":"request"}
response:{"responseRequired":false}
Session does not support events: ignored event: {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/a.ts","diagnostics":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":18},"text":"')' expected.","code":1005,"category":"error"}]}}
Session does not support events: ignored event: {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}