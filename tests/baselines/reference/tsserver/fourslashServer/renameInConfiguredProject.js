currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/referencesForGlobals_1.ts]
var globalName = 0;

//// [/tests/cases/fourslash/server/referencesForGlobals_2.ts]
var y = globalName;

//// [/tests/cases/fourslash/server/tsconfig.json]
{ "files": ["referencesForGlobals_1.ts", "referencesForGlobals_2.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/referencesForGlobals_1.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/referencesForGlobals_1.ts :: Config file name: /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tests/cases/fourslash/server/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tests/cases/fourslash/server/tsconfig.json",
      "reason": "Creating possible configured project for /tests/cases/fourslash/server/referencesForGlobals_1.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/referencesForGlobals_1.ts",
  "/tests/cases/fourslash/server/referencesForGlobals_2.ts"
 ],
 "options": {
  "configFilePath": "/tests/cases/fourslash/server/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/referencesForGlobals_2.ts 500 undefined WatchType: Closed Script info
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
	/tests/cases/fourslash/server/referencesForGlobals_1.ts SVC-1-0 "var globalName = 0;"
	/tests/cases/fourslash/server/referencesForGlobals_2.ts Text-1 "var y = globalName;"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
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
      "projectName": "/tests/cases/fourslash/server/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/tests/cases/fourslash/server/referencesForGlobals_1.ts",
      "configFile": "/tests/cases/fourslash/server/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/referencesForGlobals_1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/tsconfig.json
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/referencesForGlobals_2.ts: *new*
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
    {"seq":1,"type":"request","arguments":{"preferences":{"providePrefixAndSuffixTextForRename":true,"quotePreference":"double"}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 1,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/referencesForGlobals_1.ts","line":1,"offset":5,"findInStrings":true,"findInComments":true},"command":"rename"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "rename",
     "request_seq": 2,
     "success": true,
     "body": {
      "info": {
       "canRename": true,
       "displayName": "globalName",
       "fullDisplayName": "globalName",
       "kind": "var",
       "kindModifiers": "",
       "triggerSpan": {
        "start": {
         "line": 1,
         "offset": 5
        },
        "end": {
         "line": 1,
         "offset": 15
        }
       }
      },
      "locs": [
       {
        "file": "/tests/cases/fourslash/server/referencesForGlobals_1.ts",
        "locs": [
         {
          "start": {
           "line": 1,
           "offset": 5
          },
          "end": {
           "line": 1,
           "offset": 15
          },
          "contextStart": {
           "line": 1,
           "offset": 1
          },
          "contextEnd": {
           "line": 1,
           "offset": 20
          }
         }
        ]
       },
       {
        "file": "/tests/cases/fourslash/server/referencesForGlobals_2.ts",
        "locs": [
         {
          "start": {
           "line": 1,
           "offset": 9
          },
          "end": {
           "line": 1,
           "offset": 19
          }
         }
        ]
       }
      ]
     }
    }
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
    {"seq":4,"type":"request","arguments":{"preferences":{"providePrefixAndSuffixTextForRename":true,"quotePreference":"double"}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 4,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/referencesForGlobals_2.ts","line":1,"offset":9,"findInStrings":true,"findInComments":true},"command":"rename"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "rename",
     "request_seq": 5,
     "success": true,
     "body": {
      "info": {
       "canRename": true,
       "displayName": "globalName",
       "fullDisplayName": "globalName",
       "kind": "var",
       "kindModifiers": "",
       "triggerSpan": {
        "start": {
         "line": 1,
         "offset": 9
        },
        "end": {
         "line": 1,
         "offset": 19
        }
       }
      },
      "locs": [
       {
        "file": "/tests/cases/fourslash/server/referencesForGlobals_1.ts",
        "locs": [
         {
          "start": {
           "line": 1,
           "offset": 5
          },
          "end": {
           "line": 1,
           "offset": 15
          },
          "contextStart": {
           "line": 1,
           "offset": 1
          },
          "contextEnd": {
           "line": 1,
           "offset": 20
          }
         }
        ]
       },
       {
        "file": "/tests/cases/fourslash/server/referencesForGlobals_2.ts",
        "locs": [
         {
          "start": {
           "line": 1,
           "offset": 9
          },
          "end": {
           "line": 1,
           "offset": 19
          }
         }
        ]
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"preferences":{"providePrefixAndSuffixTextForRename":true,"quotePreference":"double"}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 6,
     "success": true
    }