currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/referencesForGlobals_1.ts]
class globalClass {
    public f() { }
}

//// [/referencesForGlobals_2.ts]
var c = globalClass();

//// [/tsconfig.json]
{ "files": ["referencesForGlobals_1.ts", "referencesForGlobals_2.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/referencesForGlobals_1.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /referencesForGlobals_1.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tsconfig.json",
      "reason": "Creating possible configured project for /referencesForGlobals_1.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/referencesForGlobals_1.ts",
  "/referencesForGlobals_2.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /referencesForGlobals_2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/referencesForGlobals_1.ts SVC-1-0 "class globalClass {\n    public f() { }\n}"
	/referencesForGlobals_2.ts Text-1 "var c = globalClass();"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	referencesForGlobals_1.ts
	  Part of 'files' list in tsconfig.json
	referencesForGlobals_2.ts
	  Part of 'files' list in tsconfig.json

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
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/referencesForGlobals_1.ts",
      "configFile": "/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /referencesForGlobals_1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/referencesForGlobals_2.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /referencesForGlobals_2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /referencesForGlobals_2.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /referencesForGlobals_1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /referencesForGlobals_2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/referencesForGlobals_2.ts","line":1,"offset":9},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /referencesForGlobals_2.ts position 8 in project /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "references-full",
     "request_seq": 2,
     "success": true,
     "body": [
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/referencesForGlobals_1.ts",
        "kind": "class",
        "name": "class globalClass",
        "textSpan": {
         "start": 6,
         "length": 11
        },
        "displayParts": [
         {
          "text": "class",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "globalClass",
          "kind": "className"
         }
        ],
        "contextSpan": {
         "start": 0,
         "length": 40
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 6,
          "length": 11
         },
         "fileName": "/referencesForGlobals_1.ts",
         "contextSpan": {
          "start": 0,
          "length": 40
         },
         "isWriteAccess": true
        },
        {
         "textSpan": {
          "start": 8,
          "length": 11
         },
         "fileName": "/referencesForGlobals_2.ts",
         "isWriteAccess": false
        }
       ]
      }
     ]
    }