currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/test.ts]
var t = '10';

//// [/tests/cases/fourslash/server/test1.ts]
t.

//// [/tests/cases/fourslash/server/tsconfig.json]
{ "files": ["test.ts", "test1.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/test1.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/test1.ts :: Config file name: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tests/cases/fourslash/server/tsconfig.json",
      "reason": "Creating possible configured project for /tests/cases/fourslash/server/test1.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/test.ts",
  "/tests/cases/fourslash/server/test1.ts"
 ],
 "options": {
  "configFilePath": "/tests/cases/fourslash/server/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/test.ts 500 undefined WatchType: Closed Script info
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
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/test.ts Text-1 "var t = '10';"
	/tests/cases/fourslash/server/test1.ts SVC-1-0 "t."


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	test.ts
	  Part of 'files' list in tsconfig.json
	test1.ts
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
      "triggerFile": "/tests/cases/fourslash/server/test1.ts",
      "configFile": "/tests/cases/fourslash/server/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/test1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/tsconfig.json
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/test.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules: *new*
  {}
/tests/cases/fourslash/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/node_modules: *new*
  {}
/tests/cases/fourslash/server/node_modules/@types: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/test.ts","fileContent":"var t = 10; t."},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/test.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/test.ts :: Config file name: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tests/cases/fourslash/server/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/test.ts SVC-2-0 "var t = 10; t."
	/tests/cases/fourslash/server/test1.ts SVC-1-0 "t."

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/test1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/test.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tests/cases/fourslash/server/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/tests/cases/fourslash/server/test.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules:
  {}
/tests/cases/fourslash/node_modules/@types:
  {}
/tests/cases/fourslash/server/node_modules:
  {}
/tests/cases/fourslash/server/node_modules/@types:
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/test1.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/test1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/test.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 3,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/test1.ts","line":1,"offset":3},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionInfo",
     "request_seq": 4,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": false,
      "entries": [
       {
        "name": "toExponential",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       },
       {
        "name": "toFixed",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       },
       {
        "name": "toLocaleString",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       },
       {
        "name": "toPrecision",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       },
       {
        "name": "toString",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       },
       {
        "name": "valueOf",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       }
      ]
     }
    }