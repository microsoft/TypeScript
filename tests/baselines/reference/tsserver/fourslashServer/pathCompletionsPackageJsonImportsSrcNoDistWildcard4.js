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

//// [/home/src/workspaces/project/nope.ts]
export const nope = 0;

//// [/home/src/workspaces/project/package.json]
{
  "types": "index.d.ts",
  "imports": {
    "#*": "dist/*",
    "#foo/*": "dist/*",
    "#bar/*": "dist/*",
    "#exact-match": "dist/index.d.ts"
  }
}

//// [/home/src/workspaces/project/src/a.mts]
import { } from "";

//// [/home/src/workspaces/project/src/blah.ts]
export const blah = 0;

//// [/home/src/workspaces/project/src/foo/onlyInFooFolder.ts]
export const foo = 0;

//// [/home/src/workspaces/project/src/index.ts]
export const index = 0;

//// [/home/src/workspaces/project/src/subfolder/one.ts]
export const one = 0;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "nodenext",
    "rootDir": "src",
    "outDir": "dist"
  }
}


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
  "/home/src/workspaces/project/nope.ts",
  "/home/src/workspaces/project/src/a.mts",
  "/home/src/workspaces/project/src/blah.ts",
  "/home/src/workspaces/project/src/index.ts",
  "/home/src/workspaces/project/src/foo/onlyInFooFolder.ts",
  "/home/src/workspaces/project/src/subfolder/one.ts"
 ],
 "options": {
  "module": 199,
  "rootDir": "/home/src/workspaces/project/src",
  "outDir": "/home/src/workspaces/project/dist",
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/nope.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/a.mts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/blah.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/foo/onlyInFooFolder.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/subfolder/one.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/foo/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/subfolder/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/workspaces/project/nope.ts Text-1 "export const nope = 0;"
	/home/src/workspaces/project/src/a.mts Text-1 "import { } from \"\";"
	/home/src/workspaces/project/src/blah.ts Text-1 "export const blah = 0;"
	/home/src/workspaces/project/src/index.ts Text-1 "export const index = 0;"
	/home/src/workspaces/project/src/foo/onlyInFooFolder.ts Text-1 "export const foo = 0;"
	/home/src/workspaces/project/src/subfolder/one.ts Text-1 "export const one = 0;"


	nope.ts
	  Matched by default include pattern '**/*'
	  File is CommonJS module because 'package.json' does not have field "type"
	src/a.mts
	  Matched by default include pattern '**/*'
	src/blah.ts
	  Matched by default include pattern '**/*'
	  File is CommonJS module because 'package.json' does not have field "type"
	src/index.ts
	  Matched by default include pattern '**/*'
	  File is CommonJS module because 'package.json' does not have field "type"
	src/foo/onlyInFooFolder.ts
	  Matched by default include pattern '**/*'
	  File is CommonJS module because 'package.json' does not have field "type"
	src/subfolder/one.ts
	  Matched by default include pattern '**/*'
	  File is CommonJS module because 'package.json' does not have field "type"

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
        "diagnostics": [
          {
            "text": "File '/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'esnext'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "File '/home/src/workspaces/project/nope.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.\n  The file is in the program because:\n    Matched by default include pattern '**/*'\n  File is CommonJS module because '/home/src/workspaces/project/package.json' does not have field \"type\"",
            "code": 6059,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
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
	/home/src/workspaces/project/tsconfig.json SVC-1-0 "{\n  \"compilerOptions\": {\n    \"module\": \"nodenext\",\n    \"rootDir\": \"src\",\n    \"outDir\": \"dist\"\n  }\n}"


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
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

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
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/nope.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/package.json: *new*
  {"pollingInterval":2000}
  {"pollingInterval":250}
/home/src/workspaces/project/src/a.mts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/src/blah.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/src/foo/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/src/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/subfolder/one.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/src/subfolder/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules: *new*
  {}
/home/src/workspaces/node_modules/@types: *new*
  {}
  {}
/home/src/workspaces/project: *new*
  {}
/home/src/workspaces/project/node_modules: *new*
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
/home/src/workspaces/project/nope.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/blah.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/src/a.mts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/src/a.mts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/a.mts ProjectRootPath: undefined
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
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/nope.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":250}
/home/src/workspaces/project/src/blah.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/src/foo/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/src/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/subfolder/one.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/src/subfolder/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/home/src/workspaces/project/src/a.mts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/node_modules:
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
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
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
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 18
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionInfo",
      "request_seq": 3,
      "success": true,
      "body": {
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "#a.mjs",
            "kind": "script",
            "kindModifiers": ".mjs",
            "sortText": "11"
          },
          {
            "name": "#blah.js",
            "kind": "script",
            "kindModifiers": ".js",
            "sortText": "11"
          },
          {
            "name": "#index.js",
            "kind": "script",
            "kindModifiers": ".js",
            "sortText": "11"
          },
          {
            "name": "#foo",
            "kind": "directory",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "#subfolder",
            "kind": "directory",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "#bar",
            "kind": "directory",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "#exact-match",
            "kind": "script",
            "kindModifiers": "",
            "sortText": "11"
          }
        ],
        "defaultCommitCharacters": []
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 18,
        "endLine": 1,
        "endOffset": 18,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 4,
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

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-1 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 18,
        "endLine": 1,
        "endOffset": 18,
        "insertString": "#"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 5,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 19,
        "key": "#"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 6,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 19,
        "endLine": 1,
        "endOffset": 19,
        "insertString": "f"
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
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-3 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 20,
        "key": "f"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 8,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 20,
        "endLine": 1,
        "endOffset": 20,
        "insertString": "o"
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
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-4 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 21,
        "key": "o"
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
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 21,
        "endLine": 1,
        "endOffset": 21,
        "insertString": "o"
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
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-5 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 12,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 22,
        "key": "o"
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
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 22,
        "endLine": 1,
        "endOffset": 22,
        "insertString": "/"
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
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-6 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 14,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 23,
        "key": "/"
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
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 15,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 16,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 23
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/workspaces/project/nope.ts Text-1 "export const nope = 0;"
	/home/src/workspaces/project/src/a.mts SVC-2-6 "import { } from \"#foo/\";"
	/home/src/workspaces/project/src/blah.ts Text-1 "export const blah = 0;"
	/home/src/workspaces/project/src/index.ts Text-1 "export const index = 0;"
	/home/src/workspaces/project/src/foo/onlyInFooFolder.ts Text-1 "export const foo = 0;"
	/home/src/workspaces/project/src/subfolder/one.ts Text-1 "export const one = 0;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionInfo",
      "request_seq": 16,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": {
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "a.mjs",
            "kind": "script",
            "kindModifiers": ".mjs",
            "sortText": "11"
          },
          {
            "name": "blah.js",
            "kind": "script",
            "kindModifiers": ".js",
            "sortText": "11"
          },
          {
            "name": "index.js",
            "kind": "script",
            "kindModifiers": ".js",
            "sortText": "11"
          },
          {
            "name": "foo",
            "kind": "directory",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "subfolder",
            "kind": "directory",
            "kindModifiers": "",
            "sortText": "11"
          }
        ],
        "defaultCommitCharacters": []
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
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/nope.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":250}
/home/src/workspaces/project/src/blah.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/src/foo/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/src/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/subfolder/one.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/src/subfolder/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {} *new*
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/node_modules:
  {}
  {} *new*
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/src: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 17,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 23,
        "endLine": 1,
        "endOffset": 23,
        "insertString": ""
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
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-7 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 18,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 23,
        "endLine": 1,
        "endOffset": 23,
        "insertString": "f"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 18,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-8 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 19,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 24,
        "key": "f"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 19,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 20,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
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
      "request_seq": 20,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-9 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 21,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
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
      "request_seq": 21,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 22,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 25,
        "endLine": 1,
        "endOffset": 25,
        "insertString": "o"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 22,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-10 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 23,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 26,
        "key": "o"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 23,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 24,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 26,
        "endLine": 1,
        "endOffset": 26,
        "insertString": "/"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 24,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/nope.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/a.mts (Open) *changed*
    version: SVC-2-11 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/src/blah.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/foo/onlyInFooFolder.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/index.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/src/subfolder/one.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 25,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 27,
        "key": "/"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 25,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 26,
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
      "request_seq": 26,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 27,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/a.mts",
        "line": 1,
        "offset": 27
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/workspaces/project/nope.ts Text-1 "export const nope = 0;"
	/home/src/workspaces/project/src/a.mts SVC-2-11 "import { } from \"#foo/foo/\";"
	/home/src/workspaces/project/src/blah.ts Text-1 "export const blah = 0;"
	/home/src/workspaces/project/src/index.ts Text-1 "export const index = 0;"
	/home/src/workspaces/project/src/foo/onlyInFooFolder.ts Text-1 "export const foo = 0;"
	/home/src/workspaces/project/src/subfolder/one.ts Text-1 "export const one = 0;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionInfo",
      "request_seq": 27,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": {
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "onlyInFooFolder.js",
            "kind": "script",
            "kindModifiers": ".js",
            "sortText": "11"
          }
        ],
        "defaultCommitCharacters": []
      }
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*
