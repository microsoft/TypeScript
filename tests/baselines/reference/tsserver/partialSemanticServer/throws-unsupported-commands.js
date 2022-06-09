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
request:{"type":"request","seq":1,"command":"semanticDiagnosticsSync","arguments":{"file":"/user/username/projects/myproject/a.ts"}}
Request: semanticDiagnosticsSync not allowed in LanguageServiceMode.PartialSemantic
LanguageService Operation: getSemanticDiagnostics not allowed in LanguageServiceMode.PartialSemantic