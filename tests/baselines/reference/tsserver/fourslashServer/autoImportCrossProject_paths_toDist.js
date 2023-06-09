currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/packages/app/package.json]
{ "name": "app", "dependencies": { "dep": "*" } }

//// [/packages/app/src/a.ts]
import "dep";

//// [/packages/app/src/index.ts]
dep1;

//// [/packages/app/src/utils.ts]
dep2;

//// [/packages/app/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": {
      "dep": ["../dep/src/main"],
      "dep/dist/*": ["../dep/src/*"]
    }
  }
  "references": [{ "path": "../dep" }]
}

//// [/packages/dep/package.json]
{ "name": "dep", "main": "dist/main.js", "types": "dist/main.d.ts" }

//// [/packages/dep/src/main.ts]
import "./sub/folder";
export const dep1 = 0;

//// [/packages/dep/src/sub/folder/index.ts]
export const dep2 = 0;

//// [/packages/dep/tsconfig.json]
{
  "compilerOptions": { "outDir": "dist", "rootDir": "src", "module": "commonjs" }
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/packages/app/package.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /packages/app
Info seq  [hh:mm:ss:mss] For info: /packages/app/package.json :: Config file name: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/app/tsconfig.json 2000 undefined Project: /packages/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/packages/app/tsconfig.json",
      "reason": "Creating possible configured project for /packages/app/package.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /packages/app/tsconfig.json : {
 "rootNames": [
  "/packages/app/src/a.ts",
  "/packages/app/src/index.ts",
  "/packages/app/src/utils.ts"
 ],
 "options": {
  "module": 1,
  "outDir": "/packages/app/dist",
  "rootDir": "/packages/app/src",
  "baseUrl": "/packages/app",
  "paths": {
   "dep": [
    "../dep/src/main"
   ],
   "dep/dist/*": [
    "../dep/src/*"
   ]
  },
  "pathsBasePath": "/packages/app",
  "configFilePath": "/packages/app/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/dep",
   "originalPath": "../dep"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/app 1 undefined Config: /packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/app 1 undefined Config: /packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/app/src/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/app/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/app/src/utils.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /packages/dep/tsconfig.json : {
 "rootNames": [
  "/packages/dep/src/main.ts",
  "/packages/dep/src/sub/folder/index.ts"
 ],
 "options": {
  "outDir": "/packages/dep/dist",
  "rootDir": "/packages/dep/src",
  "module": 1,
  "configFilePath": "/packages/dep/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/dep/tsconfig.json 2000 undefined Project: /packages/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/dep 1 undefined Config: /packages/dep/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/dep 1 undefined Config: /packages/dep/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/dep/src/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/dep/src 1 undefined Project: /packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/dep/src 1 undefined Project: /packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/dep/src/sub/folder/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/app/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/packages/dep/src/sub/folder/index.ts Text-1 "export const dep2 = 0;"
	/packages/dep/src/main.ts Text-1 "import \"./sub/folder\";\nexport const dep1 = 0;"
	/packages/app/src/a.ts Text-1 "import \"dep\";"
	/packages/app/src/index.ts Text-1 "dep1;"
	/packages/app/src/utils.ts Text-1 "dep2;"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	../dep/src/sub/folder/index.ts
	  Imported via "./sub/folder" from file '../dep/src/main.ts'
	../dep/src/main.ts
	  Imported via "dep" from file 'src/a.ts'
	src/a.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	src/utils.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/packages/app/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/dep/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/packages/dep/tsconfig.json",
      "reason": "Creating project referenced in solution /packages/app/tsconfig.json to find possible configured project for /packages/app/package.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/dep/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/dep/src 1 undefined Project: /packages/dep/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/dep/src 1 undefined Project: /packages/dep/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/dep/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/dep/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/packages/dep/src/sub/folder/index.ts Text-1 "export const dep2 = 0;"
	/packages/dep/src/main.ts Text-1 "import \"./sub/folder\";\nexport const dep1 = 0;"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	src/sub/folder/index.ts
	  Imported via "./sub/folder" from file 'src/main.ts'
	  Matched by default include pattern '**/*'
	src/main.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/packages/dep/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/packages/app/package.json",
      "configFile": "/packages/app/tsconfig.json",
      "diagnostics": [
       {
        "start": {
         "line": 12,
         "offset": 18
        },
        "end": {
         "line": 12,
         "offset": 38
        },
        "text": "Referenced project '/packages/dep' must have setting \"composite\": true.",
        "code": 6306,
        "category": "error",
        "fileName": "/packages/app/tsconfig.json"
       },
       {
        "start": {
         "line": 12,
         "offset": 3
        },
        "end": {
         "line": 12,
         "offset": 15
        },
        "text": "',' expected.",
        "code": 1005,
        "category": "error",
        "fileName": "/packages/app/tsconfig.json"
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
      "triggerFile": "/packages/app/package.json",
      "configFile": "/packages/dep/tsconfig.json",
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
	/packages/app/package.json SVC-1-0 "{ \"name\": \"app\", \"dependencies\": { \"dep\": \"*\" } }"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/app/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/dep/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/app/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/packages/app/src/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /packages/app/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /packages/app/src
Info seq  [hh:mm:ss:mss] For info: /packages/app/src/index.ts :: Config file name: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/dep/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/app/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /packages/app/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 2,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/packages/app/src/index.ts","includeLinePosition":true},"command":"syntacticDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "syntacticDiagnosticsSync",
     "request_seq": 3,
     "success": true,
     "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/packages/app/src/index.ts","includeLinePosition":true},"command":"semanticDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "semanticDiagnosticsSync",
     "request_seq": 4,
     "success": true,
     "body": [
      {
       "message": "Cannot find name 'dep1'.",
       "start": 0,
       "length": 4,
       "category": "error",
       "code": 2304,
       "startLocation": {
        "line": 1,
        "offset": 1
       },
       "endLocation": {
        "line": 1,
        "offset": 5
       }
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/packages/app/src/index.ts","includeLinePosition":true},"command":"suggestionDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "suggestionDiagnosticsSync",
     "request_seq": 5,
     "success": true,
     "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/packages/app/src/index.ts","startLine":1,"startOffset":1,"endLine":1,"endOffset":5,"errorCodes":[2304]},"command":"getCodeFixes"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getCodeFixes",
     "request_seq": 6,
     "success": true,
     "body": [
      {
       "fixName": "import",
       "description": "Add import from \"dep\"",
       "changes": [
        {
         "fileName": "/packages/app/src/index.ts",
         "textChanges": [
          {
           "start": {
            "line": 1,
            "offset": 1
           },
           "end": {
            "line": 1,
            "offset": 1
           },
           "newText": "import { dep1 } from \"dep\";\r\n\r\n"
          }
         ]
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"file":"/packages/app/src/index.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import { dep1 } from \"dep\";\r\n\r\n"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":8,"type":"request","arguments":{"file":"/packages/app/src/index.ts","line":1,"offset":1,"endLine":3,"endOffset":1,"insertString":""},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":9,"type":"request","arguments":{"file":"/packages/app/src/utils.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /packages/app/src/utils.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /packages/app/src
Info seq  [hh:mm:ss:mss] For info: /packages/app/src/utils.ts :: Config file name: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/app/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/packages/dep/src/sub/folder/index.ts Text-1 "export const dep2 = 0;"
	/packages/dep/src/main.ts Text-1 "import \"./sub/folder\";\nexport const dep1 = 0;"
	/packages/app/src/a.ts Text-1 "import \"dep\";"
	/packages/app/src/index.ts SVC-2-2 "dep1;"
	/packages/app/src/utils.ts Text-1 "dep2;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/dep/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/app/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /packages/app/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /packages/app/src/utils.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":10,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 10,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":11,"type":"request","arguments":{"file":"/packages/app/src/utils.ts","includeLinePosition":true},"command":"syntacticDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "syntacticDiagnosticsSync",
     "request_seq": 11,
     "success": true,
     "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":12,"type":"request","arguments":{"file":"/packages/app/src/utils.ts","includeLinePosition":true},"command":"semanticDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "semanticDiagnosticsSync",
     "request_seq": 12,
     "success": true,
     "body": [
      {
       "message": "Cannot find name 'dep2'.",
       "start": 0,
       "length": 4,
       "category": "error",
       "code": 2304,
       "startLocation": {
        "line": 1,
        "offset": 1
       },
       "endLocation": {
        "line": 1,
        "offset": 5
       }
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":13,"type":"request","arguments":{"file":"/packages/app/src/utils.ts","includeLinePosition":true},"command":"suggestionDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "suggestionDiagnosticsSync",
     "request_seq": 13,
     "success": true,
     "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":14,"type":"request","arguments":{"file":"/packages/app/src/utils.ts","startLine":1,"startOffset":1,"endLine":1,"endOffset":5,"errorCodes":[2304]},"command":"getCodeFixes"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getCodeFixes",
     "request_seq": 14,
     "success": true,
     "body": [
      {
       "fixName": "import",
       "description": "Add import from \"dep/dist/sub/folder\"",
       "changes": [
        {
         "fileName": "/packages/app/src/utils.ts",
         "textChanges": [
          {
           "start": {
            "line": 1,
            "offset": 1
           },
           "end": {
            "line": 1,
            "offset": 1
           },
           "newText": "import { dep2 } from \"dep/dist/sub/folder\";\r\n\r\n"
          }
         ]
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":15,"type":"request","arguments":{"file":"/packages/app/src/utils.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import { dep2 } from \"dep/dist/sub/folder\";\r\n\r\n"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":16,"type":"request","arguments":{"file":"/packages/app/src/utils.ts","line":1,"offset":1,"endLine":3,"endOffset":1,"insertString":""},"command":"change"}