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
request:{"command":"completions","arguments":{"file":"/user/username/projects/myproject/a.ts","line":3,"offset":47},"seq":1,"type":"request"}
getCompletionData: Get current token: *
getCompletionData: Is inside comment: *
getCompletionData: Get previous token: *
getCompletionsAtPosition: isCompletionListBlocker: *
getCompletionData: Semantic work: *
getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
response:{"response":[{"name":"foo","kind":"method","kindModifiers":"","sortText":"11"},{"name":"prop","kind":"property","kindModifiers":"","sortText":"11"}],"responseRequired":true}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/b.ts"}}
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/a.ts
	/user/username/projects/myproject/b.ts


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a.ts
	  Root file specified for compilation
	user/username/projects/myproject/b.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"command":"completions","arguments":{"file":"/user/username/projects/myproject/a.ts","line":3,"offset":47},"seq":2,"type":"request"}
getCompletionData: Get current token: *
getCompletionData: Is inside comment: *
getCompletionData: Get previous token: *
getCompletionsAtPosition: isCompletionListBlocker: *
getCompletionData: Semantic work: *
getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
response:{"response":[{"name":"foo","kind":"method","kindModifiers":"","sortText":"11"},{"name":"prop","kind":"property","kindModifiers":"","sortText":"11"}],"responseRequired":true}