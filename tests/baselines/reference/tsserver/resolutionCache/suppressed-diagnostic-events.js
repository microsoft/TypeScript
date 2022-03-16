Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"command":"open","arguments":{"file":"/a.ts","fileContent":"1 = 2;"},"seq":1,"type":"request"}
Search path: /
For info: /a.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)
	/a.ts


	a.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"command":"geterr","arguments":{"delay":0,"files":["/a.ts"]},"seq":2,"type":"request"}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
response:{"responseRequired":false}
request:{"command":"geterr","arguments":{"delay":0,"file":"/a.ts"},"seq":3,"type":"request"}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
response:{"responseRequired":false}