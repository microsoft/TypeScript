currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/a.ts]
let x = [1, 2];
x


//// [/tests/cases/fourslash/server/tsconfig.json]
{
    "compilerOptions": {
        "plugins": [
            { "name": "create-thrower" }
        ]
    },
    "files": ["a.ts"]
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/tsconfig.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/tsconfig.json :: Config file name: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tests/cases/fourslash/server/tsconfig.json",
      "reason": "Creating possible configured project for /tests/cases/fourslash/server/tsconfig.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/a.ts"
 ],
 "options": {
  "plugins": [
   {
    "name": "create-thrower"
   }
  ],
  "configFilePath": "/tests/cases/fourslash/server/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Enabling plugin create-thrower from candidate paths: /../../..
Info seq  [hh:mm:ss:mss] Loading create-thrower from /../../.. (resolved to /../../../node_modules)
Info seq  [hh:mm:ss:mss] Plugin activation failed: Error: I am not a well-behaved plugin
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tests/cases/fourslash/server/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/a.ts Text-1 "let x = [1, 2];\nx\n"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	a.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/tests/cases/fourslash/server/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/tests/cases/fourslash/server/tsconfig.json",
      "configFile": "/tests/cases/fourslash/server/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/tsconfig.json SVC-1-0 "{\n    \"compilerOptions\": {\n        \"plugins\": [\n            { \"name\": \"create-thrower\" }\n        ]\n    },\n    \"files\": [\"a.ts\"]\n}"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/a.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/a.ts :: Config file name: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/a.ts","line":2,"offset":2},"command":"quickinfo"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "quickinfo",
     "request_seq": 2,
     "success": true,
     "body": {
      "kind": "let",
      "kindModifiers": "",
      "start": {
       "line": 2,
       "offset": 1
      },
      "end": {
       "line": 2,
       "offset": 2
      },
      "displayString": "let x: number[]",
      "documentation": "",
      "tags": []
     }
    }