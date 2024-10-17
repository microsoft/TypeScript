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

//// [/tests/cases/fourslash/server/node_modules/dep/dist/index.d.cts]
export type ModuleType = "CJS";

//// [/tests/cases/fourslash/server/node_modules/dep/dist/index.d.ts]
export type ModuleType = "ESM";

//// [/tests/cases/fourslash/server/node_modules/dep/package.json]
{
    "name": "dep",
    "version": "0.0.1",
    "type": "module",
    "exports": {
        "import": "./dist/index.js",
        "require": "./dist/index.cjs"
    }
}

//// [/tests/cases/fourslash/server/packages/app/node_modules/lib] symlink(/tests/cases/fourslash/server/packages/lib)
//// [/tests/cases/fourslash/server/packages/app/package.json]
{ "type": "module" }

//// [/tests/cases/fourslash/server/packages/app/src/index.ts]
import { ModuleType } from "dep";
import { moduleType } from "lib";
const test: ModuleType = moduleType;

//// [/tests/cases/fourslash/server/packages/app/tsconfig.json]
{
    "compilerOptions": {
        "module": "preserve"
    },
    "references": [
        { "path": "../lib" }
    ]
}

//// [/tests/cases/fourslash/server/packages/lib/package.json]
{
    "name": "lib",
    "version": "0.0.1",
    "type": "module",
    "exports": "./dist/index.js"
}

//// [/tests/cases/fourslash/server/packages/lib/src/index.ts]
import { ModuleType } from "dep";
export const moduleType: ModuleType = "ESM";

//// [/tests/cases/fourslash/server/packages/lib/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "module": "nodenext",
        "outDir": "./dist",
        "rootDir": "./src"
    }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/node_modules/dep/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/node_modules/dep/package.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /tests/cases/fourslash/server/node_modules/dep
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/dep/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/dep/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/dep/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/dep/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/dep/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/dep/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
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
	/tests/cases/fourslash/server/node_modules/dep/package.json SVC-1-0 "{\n    \"name\": \"dep\",\n    \"version\": \"0.0.1\",\n    \"type\": \"module\",\n    \"exports\": {\n        \"import\": \"./dist/index.js\",\n        \"require\": \"./dist/index.cjs\"\n    }\n}"


	../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/node_modules/dep/package.json ProjectRootPath: undefined
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
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/node_modules/dep/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/node_modules/dep/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/node_modules/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/node_modules/tsconfig.json: *new*
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
/tests/cases/fourslash/server/node_modules/dep/node_modules: *new*
  {}
/tests/cases/fourslash/server/node_modules/dep/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/node_modules/node_modules/@types: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

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
/tests/cases/fourslash/server/node_modules/dep/package.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/packages/app/src/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/packages/app/src/index.ts ProjectRootPath: undefined:: Result: /tests/cases/fourslash/server/packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /tests/cases/fourslash/server/packages/app/tsconfig.json, currentDirectory: /tests/cases/fourslash/server/packages/app
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/packages/app/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/packages/app/src/index.ts"
 ],
 "options": {
  "module": 200,
  "configFilePath": "/tests/cases/fourslash/server/packages/app/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/tests/cases/fourslash/server/packages/lib",
   "originalPath": "../lib"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tests/cases/fourslash/server/packages/app/tsconfig.json",
        "reason": "Creating possible configured project for /tests/cases/fourslash/server/packages/app/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app 1 undefined Config: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app 1 undefined Config: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tests/cases/fourslash/server/packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/packages/lib/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/packages/lib/src/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 199,
  "outDir": "/tests/cases/fourslash/server/packages/lib/dist",
  "rootDir": "/tests/cases/fourslash/server/packages/lib/src",
  "configFilePath": "/tests/cases/fourslash/server/packages/lib/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib 1 undefined Config: /tests/cases/fourslash/server/packages/lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib 1 undefined Config: /tests/cases/fourslash/server/packages/lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/dep/dist/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/src 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/src 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/dep/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/node_modules/lib 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/node_modules/lib 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib/src/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib/src/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib/node_modules 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/dep/dist/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/lib/src/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/src/package.json 2000 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tests/cases/fourslash/server/packages/app/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/node_modules/dep/dist/index.d.ts Text-1 "export type ModuleType = \"ESM\";"
	/tests/cases/fourslash/server/packages/lib/src/index.ts Text-1 "import { ModuleType } from \"dep\";\nexport const moduleType: ModuleType = \"ESM\";"
	/tests/cases/fourslash/server/packages/app/src/index.ts SVC-1-0 "import { ModuleType } from \"dep\";\nimport { moduleType } from \"lib\";\nconst test: ModuleType = moduleType;"


	../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../node_modules/dep/dist/index.d.ts
	  Imported via "dep" from file 'src/index.ts' with packageId 'dep/dist/index.d.ts@0.0.1'
	  Imported via "dep" from file '../lib/src/index.ts' with packageId 'dep/dist/index.d.ts@0.0.1'
	  File is ECMAScript module because '../../node_modules/dep/package.json' has field "type" with value "module"
	../lib/src/index.ts
	  Imported via "lib" from file 'src/index.ts' with packageId 'lib/dist/index.d.ts@0.0.1'
	  File is ECMAScript module because '../lib/package.json' has field "type" with value "module"
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/packages/app/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tests/cases/fourslash/server/packages/app/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/tests/cases/fourslash/server/packages/app/src/index.ts",
        "configFile": "/tests/cases/fourslash/server/packages/app/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/node_modules/dep/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/packages/app/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/packages/app/tsconfig.json
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
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/tests/cases/fourslash/server/node_modules/dep/dist/index.d.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/node_modules/dep/dist/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/node_modules/dep/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/node_modules/dep/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/node_modules/dep/tsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/node_modules/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/node_modules/tsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/app/package.json: *new*
  {"pollingInterval":2000}
  {"pollingInterval":250}
/tests/cases/fourslash/server/packages/app/src/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/app/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/lib/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/lib/src/index.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/packages/lib/src/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/packages/lib/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules:
  {}
  {} *new*
/tests/cases/fourslash/node_modules/@types:
  {}
  {} *new*
/tests/cases/fourslash/server/node_modules:
  {}
  {} *new*
/tests/cases/fourslash/server/node_modules/@types:
  {}
  {} *new*
/tests/cases/fourslash/server/node_modules/dep/node_modules:
  {}
/tests/cases/fourslash/server/node_modules/dep/node_modules/@types:
  {}
/tests/cases/fourslash/server/node_modules/node_modules/@types:
  {}
/tests/cases/fourslash/server/packages/app: *new*
  {}
/tests/cases/fourslash/server/packages/app/node_modules: *new*
  {}
/tests/cases/fourslash/server/packages/app/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/packages/app/node_modules/lib: *new*
  {}
/tests/cases/fourslash/server/packages/app/src: *new*
  {}
/tests/cases/fourslash/server/packages/lib: *new*
  {}
  {}
/tests/cases/fourslash/server/packages/lib/node_modules: *new*
  {}
/tests/cases/fourslash/server/packages/lib/src/node_modules: *new*
  {}
/tests/cases/fourslash/server/packages/node_modules: *new*
  {}
/tests/cases/fourslash/server/packages/node_modules/@types: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/tests/cases/fourslash/server/packages/app/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /tests/cases/fourslash/server/packages/app/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /tests/cases/fourslash/server/packages/app/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /tests/cases/fourslash/server/packages/app/tsconfig.json *new*
/tests/cases/fourslash/server/node_modules/dep/dist/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /tests/cases/fourslash/server/packages/app/tsconfig.json
/tests/cases/fourslash/server/node_modules/dep/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/tests/cases/fourslash/server/packages/app/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /tests/cases/fourslash/server/packages/app/tsconfig.json *default*
/tests/cases/fourslash/server/packages/lib/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /tests/cases/fourslash/server/packages/app/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/packages/app/src/index.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 2,
      "success": true,
      "body": []
    }