currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib/index.ts]
const unrelatedLocalVariable = 123;
export const someExportedVariable = unrelatedLocalVariable;

//// [/lib/tsconfig.json]
{}

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/src/index.ts]
import * as lib from '../lib/index';
lib.someExportedVariable;

//// [/src/tsconfig.json]
{}

//// [/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/lib/tsconfig.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /lib
Info seq  [hh:mm:ss:mss] For info: /lib/tsconfig.json :: Config file name: /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib/tsconfig.json 2000 undefined Project: /lib/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/lib/tsconfig.json",
      "reason": "Creating possible configured project for /lib/tsconfig.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /lib/tsconfig.json : {
 "rootNames": [
  "/lib/index.ts"
 ],
 "options": {
  "configFilePath": "/lib/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /lib 1 undefined Config: /lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /lib 1 undefined Config: /lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /lib/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/lib/index.ts Text-1 "const unrelatedLocalVariable = 123;\nexport const someExportedVariable = unrelatedLocalVariable;"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/lib/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/lib/tsconfig.json",
      "configFile": "/lib/tsconfig.json",
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
	/lib/tsconfig.json SVC-1-0 "{}"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /lib/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/lib/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /lib
Info seq  [hh:mm:ss:mss] For info: /lib/index.ts :: Config file name: /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /lib/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /lib/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/src/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /src
Info seq  [hh:mm:ss:mss] For info: /src/index.ts :: Config file name: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/tsconfig.json 2000 undefined Project: /src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/src/tsconfig.json",
      "reason": "Creating possible configured project for /src/index.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /src/tsconfig.json : {
 "rootNames": [
  "/src/index.ts"
 ],
 "options": {
  "configFilePath": "/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/lib/index.ts Text-1 "const unrelatedLocalVariable = 123;\nexport const someExportedVariable = unrelatedLocalVariable;"
	/src/index.ts SVC-1-0 "import * as lib from '../lib/index';\nlib.someExportedVariable;"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	../lib/index.ts
	  Imported via '../lib/index' from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/src/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/src/index.ts",
      "configFile": "/src/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /lib/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /lib/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /lib/tsconfig.json,/src/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"preferences":{"providePrefixAndSuffixTextForRename":true,"quotePreference":"double"}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 3,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/src/index.ts","line":1,"offset":13,"findInStrings":false,"findInComments":false},"command":"rename"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "rename",
     "request_seq": 4,
     "success": true,
     "body": {
      "info": {
       "canRename": true,
       "displayName": "lib",
       "fullDisplayName": "lib",
       "kind": "alias",
       "kindModifiers": "",
       "triggerSpan": {
        "start": {
         "line": 1,
         "offset": 13
        },
        "end": {
         "line": 1,
         "offset": 16
        }
       }
      },
      "locs": [
       {
        "file": "/src/index.ts",
        "locs": [
         {
          "start": {
           "line": 1,
           "offset": 13
          },
          "end": {
           "line": 1,
           "offset": 16
          },
          "contextStart": {
           "line": 1,
           "offset": 1
          },
          "contextEnd": {
           "line": 1,
           "offset": 37
          }
         },
         {
          "start": {
           "line": 2,
           "offset": 1
          },
          "end": {
           "line": 2,
           "offset": 4
          }
         }
        ]
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"preferences":{"providePrefixAndSuffixTextForRename":true,"quotePreference":"double"}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 5,
     "success": true
    }