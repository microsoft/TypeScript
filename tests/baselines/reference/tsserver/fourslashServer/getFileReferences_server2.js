currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/packages/client/index.ts]
import "@shared/referenced";

//// [/packages/client/tsconfig.json]
{ "compilerOptions": { "paths": { "@shared/*": ["../shared/src/*"] } }, "references": [{ "path": "../shared" }] }

//// [/packages/server/index.js]
const mod = require("../shared/src/referenced");

//// [/packages/server/router.js]
const blah = require("../shared/dist/referenced");

//// [/packages/server/tsconfig.json]
{ "compilerOptions": { "checkJs": true }, "references": [{ "path": "../shared" }] }

//// [/packages/shared/src/referenced.ts]
export {};

//// [/packages/shared/tsconfig.json]
{ "compilerOptions": { "rootDir": "src", "outDir": "dist", "composite": true } }

//// [/tsconfig.json]
{ "files": [], "references": [{ "path": "packages/server" }, { "path": "packages/client" }] }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tsconfig.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tsconfig.json",
      "reason": "Creating possible configured project for /tsconfig.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/server",
   "originalPath": "packages/server"
  },
  {
   "path": "/packages/client",
   "originalPath": "packages/client"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /packages/server/tsconfig.json : {
 "rootNames": [
  "/packages/server/index.js",
  "/packages/server/router.js"
 ],
 "options": {
  "checkJs": true,
  "configFilePath": "/packages/server/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/shared",
   "originalPath": "../shared"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/server/tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/server 1 undefined Config: /packages/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/server 1 undefined Config: /packages/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /packages/shared/tsconfig.json : {
 "rootNames": [
  "/packages/shared/src/referenced.ts"
 ],
 "options": {
  "rootDir": "/packages/shared/src",
  "outDir": "/packages/shared/dist",
  "composite": true,
  "configFilePath": "/packages/shared/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/shared/tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/shared 1 undefined Config: /packages/shared/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/shared 1 undefined Config: /packages/shared/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /packages/client/tsconfig.json : {
 "rootNames": [
  "/packages/client/index.ts"
 ],
 "options": {
  "paths": {
   "@shared/*": [
    "../shared/src/*"
   ]
  },
  "pathsBasePath": "/packages/client",
  "configFilePath": "/packages/client/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/shared",
   "originalPath": "../shared"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/client/tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/client 1 undefined Config: /packages/client/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/client 1 undefined Config: /packages/client/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/server/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/packages/server/tsconfig.json",
      "reason": "Creating project referenced in solution /tsconfig.json to find possible configured project for /tsconfig.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/server/index.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/server/router.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/server/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/shared/src/referenced.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/shared/dist 1 undefined Project: /packages/server/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/shared/dist 1 undefined Project: /packages/server/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/server/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/packages/shared/src/referenced.ts Text-1 "export {};"
	/packages/server/index.js Text-1 "const mod = require(\"../shared/src/referenced\");"
	/packages/server/router.js Text-1 "const blah = require(\"../shared/dist/referenced\");"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	../shared/src/referenced.ts
	  Imported via "../shared/src/referenced" from file 'index.js'
	  Imported via "../shared/dist/referenced" from file 'router.js'
	index.js
	  Matched by default include pattern '**/*'
	router.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/packages/server/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/shared/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/packages/shared/tsconfig.json",
      "reason": "Creating project referenced in solution /tsconfig.json to find possible configured project for /tsconfig.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/shared/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/shared/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/shared/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/packages/shared/src/referenced.ts Text-1 "export {};"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	src/referenced.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/packages/shared/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/client/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/packages/client/tsconfig.json",
      "reason": "Creating project referenced in solution /tsconfig.json to find possible configured project for /tsconfig.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/client/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/client/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/client/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/client/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/packages/shared/src/referenced.ts Text-1 "export {};"
	/packages/client/index.ts Text-1 "import \"@shared/referenced\";"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	../shared/src/referenced.ts
	  Imported via "@shared/referenced" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/packages/client/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/tsconfig.json",
      "configFile": "/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/tsconfig.json",
      "configFile": "/packages/server/tsconfig.json",
      "diagnostics": [
       {
        "text": "Cannot write file '/packages/server/index.js' because it would overwrite input file.",
        "code": 5055,
        "category": "error"
       },
       {
        "text": "Cannot write file '/packages/server/router.js' because it would overwrite input file.",
        "code": 5055,
        "category": "error"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/tsconfig.json",
      "configFile": "/packages/shared/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/tsconfig.json",
      "configFile": "/packages/client/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tsconfig.json SVC-1-0 "{ \"files\": [], \"references\": [{ \"path\": \"packages/server\" }, { \"path\": \"packages/client\" }] }"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/shared/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/client/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/packages/shared/src/referenced.ts"},"command":"fileReferences"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "fileReferences",
     "request_seq": 1,
     "success": true,
     "body": {
      "refs": [
       {
        "file": "/packages/server/index.js",
        "start": {
         "line": 1,
         "offset": 22
        },
        "end": {
         "line": 1,
         "offset": 46
        },
        "contextStart": {
         "line": 1,
         "offset": 1
        },
        "contextEnd": {
         "line": 1,
         "offset": 49
        },
        "lineText": "const mod = require(\"../shared/src/referenced\");",
        "isWriteAccess": false
       },
       {
        "file": "/packages/server/router.js",
        "start": {
         "line": 1,
         "offset": 23
        },
        "end": {
         "line": 1,
         "offset": 48
        },
        "contextStart": {
         "line": 1,
         "offset": 1
        },
        "contextEnd": {
         "line": 1,
         "offset": 51
        },
        "lineText": "const blah = require(\"../shared/dist/referenced\");",
        "isWriteAccess": false
       },
       {
        "file": "/packages/client/index.ts",
        "start": {
         "line": 1,
         "offset": 9
        },
        "end": {
         "line": 1,
         "offset": 27
        },
        "contextStart": {
         "line": 1,
         "offset": 1
        },
        "contextEnd": {
         "line": 1,
         "offset": 29
        },
        "lineText": "import \"@shared/referenced\";",
        "isWriteAccess": false
       }
      ],
      "symbolName": "\"/packages/shared/src/referenced.ts\""
     }
    }