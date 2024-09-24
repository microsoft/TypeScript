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

//// [/tests/cases/fourslash/server/packages/common/package.json]
{
    "name": "common",
    "version": "1.0.0",
    "type": "module",
    "exports": {
        ".": {
            "source": "./src/index.ts",
            "default": "./dist/index.js"
        }
    }
}

//// [/tests/cases/fourslash/server/packages/common/src/index.ts]
export {};

//// [/tests/cases/fourslash/server/packages/common/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "rootDir": "src",
        "outDir": "dist",
        "module": "nodenext",
    }
}

//// [/tests/cases/fourslash/server/packages/main/package.json]
{ "type": "module" }

//// [/tests/cases/fourslash/server/packages/main/src/index.ts]
import {} from "../../common/src/index.ts";

//// [/tests/cases/fourslash/server/packages/main/tsconfig.json]
{
    "compilerOptions": {
        "module": "nodenext",
        "rewriteRelativeImportExtensions": true,
        "rootDir": "src",
        "outDir": "dist",
    },
    "references": [
        { "path": "../common" }
    ]
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/packages/common/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/packages/common/tsconfig.json ProjectRootPath: undefined:: Result: /tests/cases/fourslash/server/packages/common/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /tests/cases/fourslash/server/packages/common/tsconfig.json, currentDirectory: /tests/cases/fourslash/server/packages/common
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/packages/common/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/packages/common/src/index.ts"
 ],
 "options": {
  "composite": true,
  "rootDir": "/tests/cases/fourslash/server/packages/common/src",
  "outDir": "/tests/cases/fourslash/server/packages/common/dist",
  "module": 199,
  "configFilePath": "/tests/cases/fourslash/server/packages/common/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tests/cases/fourslash/server/packages/common/tsconfig.json",
        "reason": "Creating possible configured project for /tests/cases/fourslash/server/packages/common/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common 1 undefined Config: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common 1 undefined Config: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tests/cases/fourslash/server/packages/common/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/src/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/common/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tests/cases/fourslash/server/packages/common/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/packages/common/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/tests/cases/fourslash/server/packages/common/src/index.ts Text-1 "export {};"


	src/index.ts
	  Matched by default include pattern '**/*'
	  File is ECMAScript module because 'package.json' has field "type" with value "module"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tests/cases/fourslash/server/packages/common/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/tests/cases/fourslash/server/packages/common/tsconfig.json",
        "configFile": "/tests/cases/fourslash/server/packages/common/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'esnext'",
            "code": 6053,
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
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/packages/common/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /tests/cases/fourslash/server/packages/common
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/packages/common/tsconfig.json SVC-1-0 "{\n    \"compilerOptions\": {\n        \"composite\": true,\n        \"rootDir\": \"src\",\n        \"outDir\": \"dist\",\n        \"module\": \"nodenext\",\n    }\n}"


	../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/packages/common/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/packages/common/tsconfig.json ProjectRootPath: undefined
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
/tests/cases/fourslash/server/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/common/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/common/package.json: *new*
  {"pollingInterval":2000}
  {"pollingInterval":250}
/tests/cases/fourslash/server/packages/common/src/index.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/packages/common/src/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/common/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules: *new*
  {}
/tests/cases/fourslash/node_modules/@types: *new*
  {}
  {}
/tests/cases/fourslash/server/node_modules: *new*
  {}
/tests/cases/fourslash/server/node_modules/@types: *new*
  {}
  {}
/tests/cases/fourslash/server/packages/common: *new*
  {}
/tests/cases/fourslash/server/packages/common/node_modules: *new*
  {}
/tests/cases/fourslash/server/packages/common/node_modules/@types: *new*
  {}
  {}
/tests/cases/fourslash/server/packages/node_modules: *new*
  {}
/tests/cases/fourslash/server/packages/node_modules/@types: *new*
  {}
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/tests/cases/fourslash/server/packages/common/tsconfig.json (Configured) *new*
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
/tests/cases/fourslash/server/packages/common/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /tests/cases/fourslash/server/packages/common/tsconfig.json
/tests/cases/fourslash/server/packages/common/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/packages/main/src/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/packages/main/src/index.ts ProjectRootPath: undefined:: Result: /tests/cases/fourslash/server/packages/main/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /tests/cases/fourslash/server/packages/main/tsconfig.json, currentDirectory: /tests/cases/fourslash/server/packages/main
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/main/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/packages/main/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/packages/main/src/index.ts"
 ],
 "options": {
  "module": 199,
  "rewriteRelativeImportExtensions": true,
  "rootDir": "/tests/cases/fourslash/server/packages/main/src",
  "outDir": "/tests/cases/fourslash/server/packages/main/dist",
  "configFilePath": "/tests/cases/fourslash/server/packages/main/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/tests/cases/fourslash/server/packages/common",
   "originalPath": "../common"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tests/cases/fourslash/server/packages/main/tsconfig.json",
        "reason": "Creating possible configured project for /tests/cases/fourslash/server/packages/main/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/main 1 undefined Config: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/main 1 undefined Config: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tests/cases/fourslash/server/packages/main/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/src/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/common/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/main/src/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/main/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/main/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/main/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tests/cases/fourslash/server/packages/main/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/packages/main/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/tests/cases/fourslash/server/packages/common/src/index.ts Text-1 "export {};"
	/tests/cases/fourslash/server/packages/main/src/index.ts SVC-1-0 "import {} from \"../../common/src/index.ts\";"


	../common/src/index.ts
	  Imported via "../../common/src/index.ts" from file 'src/index.ts'
	  File is ECMAScript module because '../common/package.json' has field "type" with value "module"
	src/index.ts
	  Matched by default include pattern '**/*'
	  File is ECMAScript module because 'package.json' has field "type" with value "module"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/main/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tests/cases/fourslash/server/packages/main/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/tests/cases/fourslash/server/packages/main/src/index.ts",
        "configFile": "/tests/cases/fourslash/server/packages/main/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'esnext'",
            "code": 6053,
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
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/packages/common/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/packages/main/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/packages/common/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/packages/main/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/packages/main/tsconfig.json
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
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
  {"pollingInterval":500} *new*
/tests/cases/fourslash/server/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/common/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/common/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":250}
  {"pollingInterval":2000} *new*
/tests/cases/fourslash/server/packages/common/src/index.ts:
  {"pollingInterval":500}
/tests/cases/fourslash/server/packages/common/src/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/tests/cases/fourslash/server/packages/common/tsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/main/package.json: *new*
  {"pollingInterval":2000}
  {"pollingInterval":250}
/tests/cases/fourslash/server/packages/main/src/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/main/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/tsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules:
  {}
/tests/cases/fourslash/node_modules/@types:
  {}
  {}
  {} *new*
/tests/cases/fourslash/server/node_modules:
  {}
/tests/cases/fourslash/server/node_modules/@types:
  {}
  {}
  {} *new*
/tests/cases/fourslash/server/packages/common:
  {}
/tests/cases/fourslash/server/packages/common/node_modules:
  {}
/tests/cases/fourslash/server/packages/common/node_modules/@types:
  {}
  {}
/tests/cases/fourslash/server/packages/main: *new*
  {}
/tests/cases/fourslash/server/packages/main/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/packages/node_modules:
  {}
/tests/cases/fourslash/server/packages/node_modules/@types:
  {}
  {}
  {} *new*

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/tests/cases/fourslash/server/packages/common/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*
/tests/cases/fourslash/server/packages/main/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

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
/tests/cases/fourslash/server/packages/common/src/index.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /tests/cases/fourslash/server/packages/common/tsconfig.json
        /tests/cases/fourslash/server/packages/main/tsconfig.json *new*
/tests/cases/fourslash/server/packages/common/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/tests/cases/fourslash/server/packages/main/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /tests/cases/fourslash/server/packages/main/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/packages/common/src/index.ts",
        "includeLinePosition": true
      },
      "command": "syntacticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "syntacticDiagnosticsSync",
      "request_seq": 2,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/packages/main/src/index.ts",
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
        "file": "/tests/cases/fourslash/server/packages/common/src/index.ts",
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
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/packages/main/src/index.ts",
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
          "message": "This import path is unsafe to rewrite because it resolves to another project, and the relative path between the projects' output files is not the same as the relative path between its input files.",
          "start": 15,
          "length": 27,
          "category": "error",
          "code": 2878,
          "startLocation": {
            "line": 1,
            "offset": 16
          },
          "endLocation": {
            "line": 1,
            "offset": 43
          }
        }
      ]
    }