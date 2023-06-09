currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.ts]
useForm

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/react-hook-form/dist/index.d.ts]
export * from "./useForm";

//// [/node_modules/react-hook-form/dist/useForm.d.ts]
export declare function useForm(): void;

//// [/node_modules/react-hook-form/package.json]
{ "types": "dist/index.d.ts" }

//// [/package.json]
{ "dependencies": { "react-hook-form": "*" } }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/package.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /package.json :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/package.json SVC-1-0 "{ \"dependencies\": { \"react-hook-form\": \"*\" } }"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/react-hook-form/dist/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/react-hook-form/dist/useForm.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/node_modules/react-hook-form/dist/useForm.d.ts Text-1 "export declare function useForm(): void;"
	/node_modules/react-hook-form/dist/index.d.ts Text-1 "export * from \"./useForm\";"


	node_modules/react-hook-form/dist/useForm.d.ts
	  Imported via "./useForm" from file 'node_modules/react-hook-form/dist/index.d.ts'
	node_modules/react-hook-form/dist/index.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /index.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/index.ts SVC-1-0 "useForm"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject2*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/node_modules/react-hook-form/dist/useForm.d.ts Text-1 "export declare function useForm(): void;"
	/node_modules/react-hook-form/dist/index.d.ts Text-1 "export * from \"./useForm\";"


	node_modules/react-hook-form/dist/useForm.d.ts
	  Imported via "./useForm" from file 'node_modules/react-hook-form/dist/index.d.ts'
	node_modules/react-hook-form/dist/index.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
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
    {"seq":3,"type":"request","arguments":{"file":"/index.ts","includeLinePosition":true},"command":"syntacticDiagnosticsSync"}
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
    {"seq":4,"type":"request","arguments":{"file":"/index.ts","includeLinePosition":true},"command":"semanticDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "semanticDiagnosticsSync",
     "request_seq": 4,
     "success": true,
     "body": [
      {
       "message": "Cannot find name 'useForm'.",
       "start": 0,
       "length": 7,
       "category": "error",
       "code": 2304,
       "startLocation": {
        "line": 1,
        "offset": 1
       },
       "endLocation": {
        "line": 1,
        "offset": 8
       }
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/index.ts","includeLinePosition":true},"command":"suggestionDiagnosticsSync"}
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
    {"seq":6,"type":"request","arguments":{"file":"/index.ts","startLine":1,"startOffset":1,"endLine":1,"endOffset":8,"errorCodes":[2304]},"command":"getCodeFixes"}
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
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
       "description": "Add import from \"react-hook-form\"",
       "changes": [
        {
         "fileName": "/index.ts",
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
           "newText": "import { useForm } from \"react-hook-form\";\r\n\r\n"
          }
         ]
        }
       ]
      },
      {
       "fixName": "import",
       "description": "Add import from \"react-hook-form/dist/useForm\"",
       "changes": [
        {
         "fileName": "/index.ts",
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
           "newText": "import { useForm } from \"react-hook-form/dist/useForm\";\r\n\r\n"
          }
         ]
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"file":"/index.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import { useForm } from \"react-hook-form\";\r\n\r\n"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":8,"type":"request","arguments":{"file":"/index.ts","line":1,"offset":1,"endLine":3,"endOffset":1,"insertString":""},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":9,"type":"request","arguments":{"file":"/index.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import { useForm } from \"react-hook-form/dist/useForm\";\r\n\r\n"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":10,"type":"request","arguments":{"file":"/index.ts","line":1,"offset":1,"endLine":3,"endOffset":1,"insertString":""},"command":"change"}