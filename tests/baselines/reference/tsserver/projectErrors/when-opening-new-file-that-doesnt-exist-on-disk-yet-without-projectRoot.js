Info 0    [16:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:26.000] request:{"command":"open","arguments":{"file":"untitled:Untitled-1","fileContent":"/// <reference path=\"../../../../../../typings/@epic/Core.d.ts\" />\n/// <reference path=\"./src/somefile.d.ts\" />","scriptKindName":"TS"},"seq":1,"type":"request"}
Info 2    [16:00:27.000] Search path: 
Info 3    [16:00:28.000] For info: untitled:Untitled-1 :: No config files found.
Info 4    [16:00:29.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 5    [16:00:30.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 6    [16:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 7    [16:00:32.000] FileWatcher:: Added:: WatchInfo: /typings/@epic/core.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 8    [16:00:33.000] FileWatcher:: Added:: WatchInfo: /src/somefile.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 9    [16:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [16:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [16:00:36.000] 	Files (2)
	/a/lib/lib.d.ts
	untitled:Untitled-1


	a/lib/lib.d.ts
	  Default library for target 'es5'
	untitled:Untitled-1
	  Root file specified for compilation

Info 12   [16:00:37.000] -----------------------------------------------
Info 13   [16:00:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [16:00:39.000] 	Files (2)

Info 13   [16:00:40.000] -----------------------------------------------
Info 13   [16:00:41.000] Open files: 
Info 13   [16:00:42.000] 	FileName: untitled:Untitled-1 ProjectRootPath: undefined
Info 13   [16:00:43.000] 		Projects: /dev/null/inferredProject1*
Info 13   [16:00:44.000] response:{"responseRequired":false}

ScriptInfos:
path: /untitled:untitled-1 fileName: untitled:Untitled-1
path: /a/lib/lib.d.ts fileName: /a/lib/lib.d.ts

Info 14   [16:00:45.000] request:{"command":"geterr","arguments":{"delay":0,"files":["untitled:Untitled-1"]},"seq":2,"type":"request"}
Info 15   [16:00:46.000] response:{"responseRequired":false}
Info 16   [16:00:47.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"untitled:Untitled-1","diagnostics":[]}}
Info 17   [16:00:48.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"untitled:Untitled-1","diagnostics":[{"start":{"line":1,"offset":22},"end":{"line":1,"offset":63},"text":"File '../../../../../../typings/@epic/Core.d.ts' not found.","code":6053,"category":"error"},{"start":{"line":2,"offset":22},"end":{"line":2,"offset":41},"text":"File 'src/somefile.d.ts' not found.","code":6053,"category":"error"}]}}
Info 18   [16:00:49.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"untitled:Untitled-1","diagnostics":[]}}
Info 19   [16:00:50.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}