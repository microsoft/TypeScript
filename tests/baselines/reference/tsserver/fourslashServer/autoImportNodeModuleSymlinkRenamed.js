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

//// [/home/src/workspaces/solution/node_modules/@monorepo/utils] symlink(/home/src/workspaces/solution/packages/utils)
//// [/home/src/workspaces/solution/node_modules/utils] symlink(/home/src/workspaces/solution/packages/utils)
//// [/home/src/workspaces/solution/node_modules/web] symlink(/home/src/workspaces/solution/packages/web)
//// [/home/src/workspaces/solution/package.json]
{
    "name": "monorepo",
    "workspaces": ["packages/*"]
}

//// [/home/src/workspaces/solution/packages/utils/package.json]
{
    "name": "utils",
    "version": "1.0.0",
    "exports": "./dist/index.js"
}

//// [/home/src/workspaces/solution/packages/utils/src/index.ts]
export function gainUtility() { return 0; }

//// [/home/src/workspaces/solution/packages/utils/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "module": "nodenext",
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"]
}

//// [/home/src/workspaces/solution/packages/web/package.json]
{
    "name": "web",
    "version": "1.0.0",
    "dependencies": {
        "@monorepo/utils": "file:../utils"
    }
}

//// [/home/src/workspaces/solution/packages/web/src/index.ts]
gainUtility

//// [/home/src/workspaces/solution/packages/web/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "rootDir": "src",
        "outDir": "dist",
        "emitDeclarationOnly": true
    },
    "include": ["src"],
    "references": [
        { "path": "../utils" }
    ]
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/solution/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/solution/package.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/solution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/solution/package.json SVC-1-0 "{\n    \"name\": \"monorepo\",\n    \"workspaces\": [\"packages/*\"]\n}"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/solution/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 0,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
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
/home/src/workspaces/solution/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/solution/package.json: *new*
  {"pollingInterval":250}
/home/src/workspaces/solution/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules: *new*
  {}
/home/src/workspaces/node_modules/@types: *new*
  {}
/home/src/workspaces/solution/node_modules: *new*
  {}
/home/src/workspaces/solution/node_modules/@types: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/solution/package.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/solution/packages/web/src/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/solution/packages/web/src/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/solution/packages/web/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/solution/packages/web/tsconfig.json, currentDirectory: /home/src/workspaces/solution/packages/web
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/web/tsconfig.json 2000 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/solution/packages/web/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/solution/packages/web/src/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 99,
  "moduleResolution": 100,
  "rootDir": "/home/src/workspaces/solution/packages/web/src",
  "outDir": "/home/src/workspaces/solution/packages/web/dist",
  "emitDeclarationOnly": true,
  "configFilePath": "/home/src/workspaces/solution/packages/web/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/solution/packages/utils",
   "originalPath": "../utils"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/solution/packages/web/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/solution/packages/web/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/web/src 1 undefined Config: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/web/src 1 undefined Config: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/solution/packages/web/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/solution/packages/utils/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/solution/packages/utils/src/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 199,
  "rootDir": "/home/src/workspaces/solution/packages/utils/src",
  "outDir": "/home/src/workspaces/solution/packages/utils/dist",
  "configFilePath": "/home/src/workspaces/solution/packages/utils/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/utils/tsconfig.json 2000 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/utils/src 1 undefined Config: /home/src/workspaces/solution/packages/utils/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/utils/src 1 undefined Config: /home/src/workspaces/solution/packages/utils/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/web/node_modules 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/web/node_modules 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/node_modules 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/node_modules 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/web/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/web/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/solution/packages/web/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/solution/packages/web/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/solution/packages/web/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/solution/packages/web/src/index.ts SVC-1-0 "gainUtility"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/web/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Creating AutoImportProviderProject: /dev/null/autoImportProviderProject1*, currentDirectory: /home/src/workspaces/solution/packages/web
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/packages/utils/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/home/src/workspaces/solution/packages/utils/src/index.ts Text-1 "export function gainUtility() { return 0; }"


	../utils/src/index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/solution/packages/web/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/solution/packages/web/src/index.ts",
        "configFile": "/home/src/workspaces/solution/packages/web/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/solution/packages/web/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/solution/packages/web/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/solution/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/solution/packages/web/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/solution/packages/web/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/solution/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/package.json:
  {"pollingInterval":250}
/home/src/workspaces/solution/packages/utils/src/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/solution/packages/utils/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/solution/packages/web/package.json: *new*
  {"pollingInterval":250}
/home/src/workspaces/solution/packages/web/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/solution/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {} *new*
/home/src/workspaces/node_modules/@types:
  {}
  {} *new*
/home/src/workspaces/solution/node_modules:
  {}
  {} *new*
/home/src/workspaces/solution/node_modules/@types:
  {}
  {} *new*
/home/src/workspaces/solution/packages/node_modules: *new*
  {}
/home/src/workspaces/solution/packages/node_modules/@types: *new*
  {}
/home/src/workspaces/solution/packages/utils/src: *new*
  {}
/home/src/workspaces/solution/packages/web/node_modules: *new*
  {}
/home/src/workspaces/solution/packages/web/node_modules/@types: *new*
  {}
/home/src/workspaces/solution/packages/web/src: *new*
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/solution/packages/web/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/solution/packages/web/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/solution/packages/web/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/solution/packages/web/tsconfig.json *new*
/home/src/workspaces/solution/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/solution/packages/utils/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/solution/packages/web/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/solution/packages/web/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "preferences": {
          "includeCompletionsForModuleExports": true,
          "includeCompletionsWithInsertText": true
        }
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
After Request
Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: undefined *changed*
/home/src/workspaces/solution/packages/web/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/solution/packages/web/src/index.ts",
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
        "file": "/home/src/workspaces/solution/packages/web/src/index.ts",
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
          "message": "Cannot find name 'gainUtility'.",
          "start": 0,
          "length": 11,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 12
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/solution/packages/web/src/index.ts",
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
        "file": "/home/src/workspaces/solution/packages/web/src/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 12,
        "errorCodes": [
          2304
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 1 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/solution/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 6,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": [
        {
          "fixName": "import",
          "description": "Add import from \"@monorepo/utils\"",
          "changes": [
            {
              "fileName": "/home/src/workspaces/solution/packages/web/src/index.ts",
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
                  "newText": "import { gainUtility } from \"@monorepo/utils\";\r\n\r\n"
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
/home/src/workspaces/solution/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/package.json:
  {"pollingInterval":250}
/home/src/workspaces/solution/packages/utils/src/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/solution/packages/utils/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/packages/web/package.json:
  {"pollingInterval":250}
/home/src/workspaces/solution/packages/web/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/solution/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/solution/node_modules:
  {}
  {}
  {} *new*
/home/src/workspaces/solution/node_modules/@types:
  {}
  {}
/home/src/workspaces/solution/packages/node_modules:
  {}
/home/src/workspaces/solution/packages/node_modules/@types:
  {}
/home/src/workspaces/solution/packages/utils/src:
  {}
/home/src/workspaces/solution/packages/web/node_modules:
  {}
/home/src/workspaces/solution/packages/web/node_modules/@types:
  {}
/home/src/workspaces/solution/packages/web/src:
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/solution/packages/web/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
