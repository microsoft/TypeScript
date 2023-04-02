currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
let x =1;

//// [/a/b/tsconfig.json]
{"compilerOptions":{},"files":["f1.ts"]}


Info 1    [00:00:12.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 2    [00:00:13.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: false Elapsed:: *ms
Info 3    [00:00:14.000] Same program as before
Info 4    [00:00:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 4    [00:00:16.000] 	Files (0) NoProgram

Info 4    [00:00:17.000] -----------------------------------------------
Info 4    [00:00:18.000] Open files: 
Info 4    [00:00:19.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 4    [00:00:20.000] 		Projects: /dev/null/inferredProject1*