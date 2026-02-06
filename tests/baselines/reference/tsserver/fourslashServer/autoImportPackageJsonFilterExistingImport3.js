Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "options": {
          "lib": [
            "es5"
          ],
          "module": "preserve",
          "types": [
            "*"
          ],
          "target": "es2025",
          "newLine": "crlf",
          "skipDefaultLibCheck": true
        }
      },
      "command": "compilerOptionsForInferredProjects"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "compilerOptionsForInferredProjects",
      "request_seq": 0,
      "success": true,
      "body": true
    }
//// [/home/src/workspaces/project/index.ts]
readFile

//// [/home/src/workspaces/project/node_modules/@types/node/index.d.ts]
declare module "node:fs" {
    export function readFile(): void;
    export function writeFile(): void;
}

//// [/home/src/workspaces/project/package.json]
{}

//// [/home/src/workspaces/project/tsconfig.json]
{ "compilerOptions": { "lib": ["es5"], "module": "preserve", "types": ["*"] } }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "module": 200,
  "types": [
   "*"
  ],
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/node/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/node/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/index.ts Text-1 "readFile"
	/home/src/workspaces/project/node_modules/@types/node/index.d.ts Text-1 "declare module \"node:fs\" {\n    export function readFile(): void;\n    export function writeFile(): void;\n}"


	../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	index.ts
	  Matched by default include pattern '**/*'
	node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/tsconfig.json",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/node/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/tsconfig.json SVC-1-0 "{ \"compilerOptions\": { \"lib\": [\"es5\"], \"module\": \"preserve\", \"types\": [\"*\"] } }"
	/home/src/workspaces/project/node_modules/@types/node/index.d.ts Text-1 "declare module \"node:fs\" {\n    export function readFile(): void;\n    export function writeFile(): void;\n}"


	../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	tsconfig.json
	  Root file specified for compilation
	node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/node/index.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/node/package.json: *new*
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json: *new*
  {"pollingInterval":2000}
  {"pollingInterval":2000}
  {"pollingInterval":250}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules/@types: *new*
  {}
  {}
/home/src/workspaces/project: *new*
  {}
/home/src/workspaces/project/node_modules: *new*
  {}
  {}
/home/src/workspaces/project/node_modules/@types: *new*
  {}
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/@types/node/index.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/node/index.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/node/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
  {"pollingInterval":250}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/home/src/workspaces/project/index.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 3,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "includeLinePosition": true
      },
      "command": "syntacticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "syntacticDiagnosticsSync",
      "request_seq": 4,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 5,
      "success": true,
      "body": [
        {
          "message": "Cannot find name 'readFile'.",
          "start": 0,
          "length": 8,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 9
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "includeLinePosition": true
      },
      "command": "suggestionDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "suggestionDiagnosticsSync",
      "request_seq": 6,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 9,
        "errorCodes": [
          2304
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 7,
      "success": true,
      "body": []
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 8,
      "success": true
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-1 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "i"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 9,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 2,
        "key": "i"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 10,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 2,
        "endLine": 1,
        "endOffset": 2,
        "insertString": "m"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 11,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-3 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 12,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 3,
        "key": "m"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 12,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 13,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 3,
        "endLine": 1,
        "endOffset": 3,
        "insertString": "p"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 13,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-4 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 14,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 4,
        "key": "p"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 14,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 15,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 4,
        "endLine": 1,
        "endOffset": 4,
        "insertString": "o"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 15,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-5 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 16,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 5,
        "key": "o"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 16,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 17,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 5,
        "endLine": 1,
        "endOffset": 5,
        "insertString": "r"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 17,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-6 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 18,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 6,
        "key": "r"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 18,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 19,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 6,
        "endLine": 1,
        "endOffset": 6,
        "insertString": "t"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 19,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-7 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 20,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 7,
        "key": "t"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 20,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 21,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 7,
        "endLine": 1,
        "endOffset": 7,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 21,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-8 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 22,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 8,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 22,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 23,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 8,
        "endLine": 1,
        "endOffset": 8,
        "insertString": "{"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 23,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-9 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 24,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 9,
        "key": "{"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 24,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 25,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 9,
        "endLine": 1,
        "endOffset": 9,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 25,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-10 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 26,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 10,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 26,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 27,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 10,
        "endLine": 1,
        "endOffset": 10,
        "insertString": "w"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 27,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-11 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 28,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 11,
        "key": "w"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 28,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 29,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 11,
        "endLine": 1,
        "endOffset": 11,
        "insertString": "r"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 29,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-12 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 30,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 12,
        "key": "r"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 30,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 31,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 12,
        "endLine": 1,
        "endOffset": 12,
        "insertString": "i"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 31,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-13 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 32,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 13,
        "key": "i"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 32,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 33,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 13,
        "endLine": 1,
        "endOffset": 13,
        "insertString": "t"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 33,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-14 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 34,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 14,
        "key": "t"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 34,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 35,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 14,
        "endLine": 1,
        "endOffset": 14,
        "insertString": "e"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 35,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-15 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 36,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 15,
        "key": "e"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 36,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 37,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 15,
        "endLine": 1,
        "endOffset": 15,
        "insertString": "F"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 37,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-16 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 38,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 16,
        "key": "F"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 38,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 39,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 16,
        "endLine": 1,
        "endOffset": 16,
        "insertString": "i"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 39,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-17 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 40,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 17,
        "key": "i"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 40,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 41,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 17,
        "endLine": 1,
        "endOffset": 17,
        "insertString": "l"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 41,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-18 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 42,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 18,
        "key": "l"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 42,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 43,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 18,
        "endLine": 1,
        "endOffset": 18,
        "insertString": "e"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 43,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-19 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 44,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 19,
        "key": "e"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 44,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 45,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 19,
        "endLine": 1,
        "endOffset": 19,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 45,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-20 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 46,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 20,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 46,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 47,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 20,
        "endLine": 1,
        "endOffset": 20,
        "insertString": "}"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 47,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-21 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 48,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 21,
        "key": "}"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 48,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 49,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 21,
        "endLine": 1,
        "endOffset": 21,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 49,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-22 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 50,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 22,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 50,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 51,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 22,
        "endLine": 1,
        "endOffset": 22,
        "insertString": "f"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 51,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-23 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 52,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 23,
        "key": "f"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 52,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 53,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 23,
        "endLine": 1,
        "endOffset": 23,
        "insertString": "r"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 53,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-24 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 54,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 24,
        "key": "r"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 54,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 55,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 24,
        "endLine": 1,
        "endOffset": 24,
        "insertString": "o"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 55,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-25 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 56,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 25,
        "key": "o"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 56,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 57,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 25,
        "endLine": 1,
        "endOffset": 25,
        "insertString": "m"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 57,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-26 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 58,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 26,
        "key": "m"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 58,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 59,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 26,
        "endLine": 1,
        "endOffset": 26,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 59,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-27 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 60,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 27,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 60,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 61,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 27,
        "endLine": 1,
        "endOffset": 27,
        "insertString": "\""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 61,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-28 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 62,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 28,
        "key": "\""
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 62,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 63,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 28,
        "endLine": 1,
        "endOffset": 28,
        "insertString": "n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 63,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-29 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 64,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 29,
        "key": "n"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 64,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 65,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 29,
        "endLine": 1,
        "endOffset": 29,
        "insertString": "o"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 65,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-30 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 66,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 30,
        "key": "o"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 66,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 67,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 30,
        "endLine": 1,
        "endOffset": 30,
        "insertString": "d"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 67,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-31 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 68,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 31,
        "key": "d"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 68,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 69,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 31,
        "endLine": 1,
        "endOffset": 31,
        "insertString": "e"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 69,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-32 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 70,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 32,
        "key": "e"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 70,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 71,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 32,
        "endLine": 1,
        "endOffset": 32,
        "insertString": ":"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 71,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-33 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 72,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 33,
        "key": ":"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 72,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 73,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 33,
        "endLine": 1,
        "endOffset": 33,
        "insertString": "f"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 73,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-34 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 74,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 34,
        "key": "f"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 74,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 75,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 34,
        "endLine": 1,
        "endOffset": 34,
        "insertString": "s"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 75,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-35 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 76,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 35,
        "key": "s"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 76,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 77,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 35,
        "endLine": 1,
        "endOffset": 35,
        "insertString": "\""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 77,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-36 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 78,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 36,
        "key": "\""
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 78,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 79,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 36,
        "endLine": 1,
        "endOffset": 36,
        "insertString": ";"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 79,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-37 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 80,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 37,
        "key": ";"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 80,
      "success": true,
      "body": [
        {
          "start": {
            "line": 1,
            "offset": 37
          },
          "end": {
            "line": 1,
            "offset": 37
          },
          "newText": " "
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 81,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 37,
        "endLine": 1,
        "endOffset": 37,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 81,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-38 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 82,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 38,
        "endLine": 1,
        "endOffset": 38,
        "insertString": "\n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 82,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-39 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 83,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 2,
        "offset": 1,
        "key": "\n"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 83,
      "success": true,
      "body": [
        {
          "start": {
            "line": 1,
            "offset": 37
          },
          "end": {
            "line": 1,
            "offset": 38
          },
          "newText": ""
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 84,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 37,
        "endLine": 1,
        "endOffset": 38,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 84,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-40 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 85,
      "type": "request",
      "arguments": {
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 85,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 86,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "includeLinePosition": true
      },
      "command": "syntacticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/index.ts SVC-2-40 "import { writeFile } from \"node:fs\";\nreadFile"
	/home/src/workspaces/project/node_modules/@types/node/index.d.ts Text-1 "declare module \"node:fs\" {\n    export function readFile(): void;\n    export function writeFile(): void;\n}"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "syntacticDiagnosticsSync",
      "request_seq": 86,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": []
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 87,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 87,
      "success": true,
      "body": [
        {
          "message": "Cannot find name 'readFile'.",
          "start": 37,
          "length": 8,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 2,
            "offset": 1
          },
          "endLocation": {
            "line": 2,
            "offset": 9
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 88,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "includeLinePosition": true
      },
      "command": "suggestionDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "suggestionDiagnosticsSync",
      "request_seq": 88,
      "success": true,
      "body": [
        {
          "message": "'writeFile' is declared but its value is never read.",
          "start": 0,
          "length": 36,
          "category": "suggestion",
          "code": 6133,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 37
          },
          "reportsUnnecessary": true
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 89,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "startLine": 2,
        "startOffset": 1,
        "endLine": 2,
        "endOffset": 9,
        "errorCodes": [
          2304
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 89,
      "success": true,
      "body": [
        {
          "fixName": "import",
          "description": "Update import from \"node:fs\"",
          "changes": [
            {
              "fileName": "/home/src/workspaces/project/index.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 10
                  },
                  "end": {
                    "line": 1,
                    "offset": 10
                  },
                  "newText": "readFile, "
                }
              ]
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 90,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 37,
        "errorCodes": [
          6133
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 90,
      "success": true,
      "body": [
        {
          "fixName": "unusedIdentifier",
          "description": "Remove import from 'node:fs'",
          "changes": [
            {
              "fileName": "/home/src/workspaces/project/index.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 2,
                    "offset": 1
                  },
                  "newText": ""
                }
              ]
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 91,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 10,
        "endLine": 1,
        "endOffset": 10,
        "insertString": "readFile, "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 91,
      "success": true
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-41 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 92,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 10,
        "endLine": 1,
        "endOffset": 20,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 92,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-42 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
