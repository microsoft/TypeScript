currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/common/src/MyModule.ts]
export function square(n: number) {
  return n * 2;
}

//// [/common/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "dist",
    "composite": true
  },
  "include": ["src"]
}

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/web/src/Helper.ts]
export function saveMe() {
  square(2);
}

//// [/web/src/MyApp.ts]
import { square } from "../../common/dist/src/MyModule";

//// [/web/tsconfig.json]
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "baseUrl": "."
  },
  "include": ["src"],
  "references": [{ "path": "../common" }]
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/common/tsconfig.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /common
Info seq  [hh:mm:ss:mss] For info: /common/tsconfig.json :: Config file name: /common/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /common/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /common/tsconfig.json 2000 undefined Project: /common/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/common/tsconfig.json",
      "reason": "Creating possible configured project for /common/tsconfig.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /common/tsconfig.json : {
 "rootNames": [
  "/common/src/MyModule.ts"
 ],
 "options": {
  "module": 1,
  "outDir": "/common/dist",
  "composite": true,
  "configFilePath": "/common/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /common/src 1 undefined Config: /common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /common/src 1 undefined Config: /common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /common/src/MyModule.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /common/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /common/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/common/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/common/src/MyModule.ts Text-1 "export function square(n: number) {\n  return n * 2;\n}"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	src/MyModule.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/common/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/common/tsconfig.json",
      "configFile": "/common/tsconfig.json",
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
	/common/tsconfig.json SVC-1-0 "{\n  \"compilerOptions\": {\n    \"module\": \"commonjs\",\n    \"outDir\": \"dist\",\n    \"composite\": true\n  },\n  \"include\": [\"src\"]\n}"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/common/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /common/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/web/src/Helper.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /web/src
Info seq  [hh:mm:ss:mss] For info: /web/src/Helper.ts :: Config file name: /web/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /web/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /web/tsconfig.json 2000 undefined Project: /web/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/web/tsconfig.json",
      "reason": "Creating possible configured project for /web/src/Helper.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /web/tsconfig.json : {
 "rootNames": [
  "/web/src/Helper.ts",
  "/web/src/MyApp.ts"
 ],
 "options": {
  "module": 99,
  "moduleResolution": 2,
  "noEmit": true,
  "baseUrl": "/web",
  "configFilePath": "/web/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/common",
   "originalPath": "../common"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /web/src 1 undefined Config: /web/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /web/src 1 undefined Config: /web/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /web/src/MyApp.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /web/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /common/dist/src 1 undefined Project: /web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /common/dist/src 1 undefined Project: /web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /web/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/web/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/web/src/Helper.ts SVC-1-0 "export function saveMe() {\n  square(2);\n}"
	/common/src/MyModule.ts Text-1 "export function square(n: number) {\n  return n * 2;\n}"
	/web/src/MyApp.ts Text-1 "import { square } from \"../../common/dist/src/MyModule\";"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	src/Helper.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	../common/src/MyModule.ts
	  Imported via "../../common/dist/src/MyModule" from file 'src/MyApp.ts'
	src/MyApp.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/web/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/web/src/Helper.ts",
      "configFile": "/web/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/common/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/web/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /common/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /web/src/Helper.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /web/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"preferences":{"includeCompletionsForModuleExports":true,"includeCompletionsWithInsertText":true,"importModuleSpecifierPreference":"non-relative"}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 2,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/web/src/Helper.ts","includeLinePosition":true},"command":"syntacticDiagnosticsSync"}
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
    {"seq":4,"type":"request","arguments":{"file":"/web/src/Helper.ts","includeLinePosition":true},"command":"semanticDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "semanticDiagnosticsSync",
     "request_seq": 4,
     "success": true,
     "body": [
      {
       "message": "Cannot find name 'square'.",
       "start": 29,
       "length": 6,
       "category": "error",
       "code": 2304,
       "startLocation": {
        "line": 2,
        "offset": 3
       },
       "endLocation": {
        "line": 2,
        "offset": 9
       }
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/web/src/Helper.ts","includeLinePosition":true},"command":"suggestionDiagnosticsSync"}
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
    {"seq":6,"type":"request","arguments":{"file":"/web/src/Helper.ts","startLine":2,"startOffset":3,"endLine":2,"endOffset":9,"errorCodes":[2304]},"command":"getCodeFixes"}
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
       "description": "Add import from \"../../common/src/MyModule\"",
       "changes": [
        {
         "fileName": "/web/src/Helper.ts",
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
           "newText": "import { square } from \"../../common/src/MyModule\";\r\n\r\n"
          }
         ]
        }
       ]
      },
      {
       "fixName": "fixMissingFunctionDeclaration",
       "description": "Add missing function declaration 'square'",
       "changes": [
        {
         "fileName": "/web/src/Helper.ts",
         "textChanges": [
          {
           "start": {
            "line": 3,
            "offset": 2
           },
           "end": {
            "line": 3,
            "offset": 2
           },
           "newText": "\r\n\r\nfunction square(arg0: number) {\r\n    throw new Error(\"Function not implemented.\");\r\n}\r\n"
          }
         ]
        }
       ]
      }
     ]
    }