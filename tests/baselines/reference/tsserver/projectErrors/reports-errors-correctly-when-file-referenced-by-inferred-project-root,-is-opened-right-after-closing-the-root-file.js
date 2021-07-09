Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/src/client/app.js","projectRootPath":"/user/username/projects/myproject"}}
Search path: /user/username/projects/myproject/src/client
For info: /user/username/projects/myproject/src/client/app.js :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
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
	/user/username/projects/myproject/src/client/app.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/test/backend/index.js","projectRootPath":"/user/username/projects/myproject"}}
Search path: /user/username/projects/myproject/test/backend
For info: /user/username/projects/myproject/test/backend/index.js :: No config files found.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js
	/user/username/projects/myproject/src/server/utilities.js
	/user/username/projects/myproject/test/backend/index.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation
	src/server/utilities.js
	  Imported via '../../src/server/utilities' from file 'test/backend/index.js'
	test/backend/index.js
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
		Projects: /dev/null/inferredProject1*
	FileName: /user/username/projects/myproject/test/backend/index.js ProjectRootPath: /user/username/projects/myproject
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/test/backend/index.js","/user/username/projects/myproject/src/client/app.js"]},"seq":1,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/test/backend/index.js"}}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Project '/dev/null/inferredProject1*' (Inferred)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/src/server/utilities.js","projectRootPath":"/user/username/projects/myproject"}}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Search path: /user/username/projects/myproject/src/server
For info: /user/username/projects/myproject/src/server/utilities.js :: No config files found.
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

-----------------------------------------------
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js
	/user/username/projects/myproject/src/server/utilities.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation
	src/server/utilities.js
	  Root file specified for compilation

-----------------------------------------------
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Project '/dev/null/inferredProject1*' (Inferred)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
		Projects: /dev/null/inferredProject1*
	FileName: /user/username/projects/myproject/src/server/utilities.js ProjectRootPath: /user/username/projects/myproject
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/src/server/utilities.js","/user/username/projects/myproject/src/client/app.js"]},"seq":2,"type":"request"}
response:{"responseRequired":false}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}