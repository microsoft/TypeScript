currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/project/node_modules/@company/common] symlink(/project/packages/common)
//// [/project/packages/app/lib/index.ts]
Tooltip

//// [/project/packages/app/package.json]
{
  "name": "@company/app",
  "version": "1.0.0",
  "dependencies": {
    "@company/common": "1.0.0"
  }
}

//// [/project/packages/app/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}

//// [/project/packages/common/lib/index.tsx]
export function Tooltip {};

//// [/project/packages/common/package.json]
{
  "name": "@company/common",
  "version": "1.0.0",
  "main": "./lib/index.tsx"
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/project/packages/common/package.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /project/packages/common
Info seq  [hh:mm:ss:mss] For info: /project/packages/common/package.json :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project/packages/common/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/packages/common/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project/packages/common/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/packages/common/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/project/packages/common/package.json SVC-1-0 "{\n  \"name\": \"@company/common\",\n  \"version\": \"1.0.0\",\n  \"main\": \"./lib/index.tsx\"\n}"


	../../../lib.d.ts
	  Default library for target 'es5'
	../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../lib.d.ts'
	../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/packages/common/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/packages/common/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/project/packages/common/package.json: *new*
  {"pollingInterval":250}

watchedDirectoriesRecursive::
/project/packages/common/node_modules: *new*
  {}
/project/packages/common/node_modules/@types: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/project/packages/app/lib/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /project/packages/app/lib
Info seq  [hh:mm:ss:mss] For info: /project/packages/app/lib/index.ts :: Config file name: /project/packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /project/packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/packages/app/tsconfig.json 2000 undefined Project: /project/packages/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/project/packages/app/tsconfig.json",
      "reason": "Creating possible configured project for /project/packages/app/lib/index.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /project/packages/app/tsconfig.json : {
 "rootNames": [
  "/project/packages/app/lib/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 99,
  "moduleResolution": 100,
  "paths": {
   "@/*": [
    "./*"
   ]
  },
  "pathsBasePath": "/project/packages/app",
  "configFilePath": "/project/packages/app/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project/packages/app 1 undefined Config: /project/packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/packages/app 1 undefined Config: /project/packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /project/packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project/packages/app/node_modules 1 undefined Project: /project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/packages/app/node_modules 1 undefined Project: /project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project/packages/app/node_modules/@types 1 undefined Project: /project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/packages/app/node_modules/@types 1 undefined Project: /project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /project/packages/app/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/project/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/project/packages/app/lib/index.ts SVC-1-0 "Tooltip"


	../../../lib.d.ts
	  Default library for target 'es5'
	../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../lib.d.ts'
	../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../lib.d.ts'
	lib/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/packages/app/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/packages/common/lib/index.tsx 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/project/packages/common/lib/index.tsx Text-1 "export function Tooltip {};"


	../common/lib/index.tsx
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/project/packages/app/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/project/packages/app/lib/index.ts",
      "configFile": "/project/packages/app/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Search path: /project/packages/app
Info seq  [hh:mm:ss:mss] For info: /project/packages/app/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/project/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/packages/common/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /project/packages/app/lib/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/packages/app/tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/project/packages/app/package.json: *new*
  {"pollingInterval":250}
/project/packages/app/tsconfig.json: *new*
  {"pollingInterval":2000}
/project/packages/common/lib/index.tsx: *new*
  {"pollingInterval":500}
/project/packages/common/package.json:
  {"pollingInterval":250}

watchedDirectoriesRecursive::
/project/packages/app: *new*
  {}
/project/packages/app/node_modules: *new*
  {}
/project/packages/app/node_modules/@types: *new*
  {}
/project/packages/common/node_modules:
  {}
/project/packages/common/node_modules/@types:
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"preferences":{"includeCompletionsForModuleExports":true,"includeCompletionsWithInsertText":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 2,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/project/packages/app/lib/index.ts","includeLinePosition":true},"command":"syntacticDiagnosticsSync"}
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
    {"seq":4,"type":"request","arguments":{"file":"/project/packages/app/lib/index.ts","includeLinePosition":true},"command":"semanticDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "semanticDiagnosticsSync",
     "request_seq": 4,
     "success": true,
     "body": [
      {
       "message": "Cannot find name 'Tooltip'.",
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
    {"seq":5,"type":"request","arguments":{"file":"/project/packages/app/lib/index.ts","includeLinePosition":true},"command":"suggestionDiagnosticsSync"}
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
    {"seq":6,"type":"request","arguments":{"file":"/project/packages/app/lib/index.ts","startLine":1,"startOffset":1,"endLine":1,"endOffset":8,"errorCodes":[2304]},"command":"getCodeFixes"}
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
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
       "description": "Add import from \"@company/common\"",
       "changes": [
        {
         "fileName": "/project/packages/app/lib/index.ts",
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
           "newText": "import { Tooltip } from \"@company/common\";\r\n\r\n"
          }
         ]
        }
       ]
      }
     ]
    }
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/project/packages/app/package.json:
  {"pollingInterval":250}
/project/packages/app/tsconfig.json:
  {"pollingInterval":2000}
/project/packages/common/lib/index.tsx:
  {"pollingInterval":500}
/project/packages/common/package.json:
  {"pollingInterval":250}

watchedDirectoriesRecursive::
/project/node_modules: *new*
  {}
/project/packages/app:
  {}
/project/packages/app/node_modules:
  {}
/project/packages/app/node_modules/@types:
  {}
/project/packages/common/node_modules:
  {}
/project/packages/common/node_modules/@types:
  {}
