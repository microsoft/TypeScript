Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
//// [/home/src/tslibs/TS/Lib/lib.d.ts]
lib.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/home/src/workspaces/project/index.ts]
autorun

//// [/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts]
export declare function autorun(): void;

//// [/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json]
{ "types": "dist/mobx.d.ts" }

//// [/home/src/workspaces/project/node_modules/mobx] symlink(/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx)
//// [/home/src/workspaces/project/package.json]
{ "dependencies": { "mobx": "*" } }

//// [/home/src/workspaces/project/tsconfig.json]
{ "compilerOptions": { "module": "commonjs" } }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
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
  "module": 1,
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/index.ts Text-1 "autorun"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.d.ts'
	index.ts
	  Matched by default include pattern '**/*'

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
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/tsconfig.json SVC-1-0 "{ \"compilerOptions\": { \"module\": \"commonjs\" } }"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Creating AutoImportProviderProject: /dev/null/autoImportProviderProject1*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts Text-1 "export declare function autorun(): void;"


	node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 0,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json: *new*
  {"pollingInterval":250}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules: *new*
  {}
  {}
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
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
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
/home/src/workspaces/project/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

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
      "request_seq": 1,
      "success": true
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":250}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/home/src/workspaces/project/index.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
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
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
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
/home/src/workspaces/project/index.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
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
      "request_seq": 2,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
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
      "request_seq": 3,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
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
      "request_seq": 4,
      "success": true,
      "body": [
        {
          "message": "Cannot find name 'autorun'.",
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
    {
      "seq": 5,
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
      "request_seq": 5,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 8,
        "errorCodes": [
          2304
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Creating AutoImportProviderProject: /dev/null/autoImportProviderProject2*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/package.json 2000 undefined Project: /dev/null/autoImportProviderProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json 2000 undefined Project: /dev/null/autoImportProviderProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts Text-1 "export declare function autorun(): void;"


	node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 6,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      },
      "body": [
        {
          "fixName": "import",
          "description": "Add import from \"mobx\"",
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
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { autorun } from \"mobx\";\r\n\r\n"
                }
              ]
            }
          ]
        }
      ]
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/home/src/workspaces/project/package.json:
  {"pollingInterval":250}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
  {} *new*
/home/src/workspaces/project/node_modules/@types:
  {}
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/autoImportProviderProject2* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject2* *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
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
/home/src/workspaces/project/index.ts (Open)
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/autoImportProviderProject1*
        /dev/null/autoImportProviderProject2* *new*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import { autorun } from \"mobx\";\r\n\r\n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 7,
      "success": true
    }
After Request
Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/autoImportProviderProject2* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: /dev/null/autoImportProviderProject2*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
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
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-1 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/autoImportProviderProject1*
        /dev/null/autoImportProviderProject2*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 1,
        "endLine": 3,
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
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
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
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-2-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/autoImportProviderProject1*
        /dev/null/autoImportProviderProject2*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
