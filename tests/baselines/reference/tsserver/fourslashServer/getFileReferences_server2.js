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
          "paths": {
            "@shared/*": [
              "../shared/src/*"
            ]
          },
          "target": "es2025",
          "newLine": "crlf",
          "skipDefaultLibCheck": true,
          "rootDir": "/home/src/workspaces/project/packages/shared/src",
          "outDir": "/home/src/workspaces/project/packages/shared/dist",
          "composite": true,
          "checkJs": true
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
//// [/home/src/workspaces/project/packages/client/index.ts]
import "@shared/referenced";

//// [/home/src/workspaces/project/packages/client/tsconfig.json]
{ "compilerOptions": { "lib": ["es5"], "paths": { "@shared/*": ["../shared/src/*"] } }, "references": [{ "path": "../shared" }] }

//// [/home/src/workspaces/project/packages/server/index.js]
const mod = require("../shared/src/referenced");

//// [/home/src/workspaces/project/packages/server/router.js]
const blah = require("../shared/dist/referenced");

//// [/home/src/workspaces/project/packages/server/tsconfig.json]
{ "compilerOptions": { "lib": ["es5"], "checkJs": true }, "references": [{ "path": "../shared" }] }

//// [/home/src/workspaces/project/packages/shared/src/referenced.ts]
export {};

//// [/home/src/workspaces/project/packages/shared/tsconfig.json]
{ "compilerOptions": { "lib": ["es5"], "rootDir": "src", "outDir": "dist", "composite": true } }

//// [/home/src/workspaces/project/tsconfig.json]
{ "files": [], "references": [{ "path": "packages/server" }, { "path": "packages/client" }] }


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
 "rootNames": [],
 "options": {
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/packages/server",
   "originalPath": "packages/server"
  },
  {
   "path": "/home/src/workspaces/project/packages/client",
   "originalPath": "packages/client"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/packages/server/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/packages/server/index.js",
  "/home/src/workspaces/project/packages/server/router.js"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "checkJs": true,
  "configFilePath": "/home/src/workspaces/project/packages/server/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/packages/shared",
   "originalPath": "../shared"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/server/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/server 1 undefined Config: /home/src/workspaces/project/packages/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/server 1 undefined Config: /home/src/workspaces/project/packages/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/packages/client/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/packages/client/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "paths": {
   "@shared/*": [
    "../shared/src/*"
   ]
  },
  "pathsBasePath": "/home/src/workspaces/project/packages/client",
  "configFilePath": "/home/src/workspaces/project/packages/client/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/packages/shared",
   "originalPath": "../shared"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/client/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/client 1 undefined Config: /home/src/workspaces/project/packages/client/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/client 1 undefined Config: /home/src/workspaces/project/packages/client/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/packages/shared/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/packages/shared/src/referenced.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "rootDir": "/home/src/workspaces/project/packages/shared/src",
  "outDir": "/home/src/workspaces/project/packages/shared/dist",
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/packages/shared/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/shared/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/shared 1 undefined Config: /home/src/workspaces/project/packages/shared/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/shared 1 undefined Config: /home/src/workspaces/project/packages/shared/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/tsconfig.json SVC-1-0 "{ \"files\": [], \"references\": [{ \"path\": \"packages/server\" }, { \"path\": \"packages/client\" }] }"


	../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

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
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/client/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/server/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/shared/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/project/packages/client: *new*
  {}
/home/src/workspaces/project/packages/server: *new*
  {}
/home/src/workspaces/project/packages/shared: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
    initialLoadPending: true
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *new*
    version: Text-1
    containingProjects: 1
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
        "file": "/home/src/workspaces/project/packages/shared/src/referenced.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/packages/shared/src/referenced.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/packages/shared/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/packages/shared/tsconfig.json, currentDirectory: /home/src/workspaces/project/packages/shared
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/packages/shared/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/packages/shared/src/referenced.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/packages/shared/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/packages/shared/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/packages/shared/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/packages/shared/src/referenced.ts SVC-1-0 "export {};"


	../../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.es5.d.ts'
	src/referenced.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/packages/shared/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/packages/shared/src/referenced.ts",
        "configFile": "/home/src/workspaces/project/packages/shared/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/packages/shared/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/packages/shared/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/packages/shared/src/referenced.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/packages/shared/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/packages/shared/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
    initialLoadPending: true
    noOpenRef: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/shared/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/shared/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/shared/tsconfig.json *new*
/home/src/workspaces/project/packages/shared/src/referenced.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/packages/shared/tsconfig.json *default*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/packages/shared/src/referenced.ts"
      },
      "command": "fileReferences"
    }
Info seq  [hh:mm:ss:mss] Finding references to file /home/src/workspaces/project/packages/shared/src/referenced.ts in project /home/src/workspaces/project/packages/shared/tsconfig.json
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
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

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
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/packages/server/tsconfig.json, currentDirectory: /home/src/workspaces/project/packages/server
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/packages/server/tsconfig.json",
        "reason": "Creating project referenced by : /home/src/workspaces/project/tsconfig.json as it references project /home/src/workspaces/project/packages/shared/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/server/index.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/server/router.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/packages/server/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/shared 1 undefined Project: /home/src/workspaces/project/packages/server/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/shared 1 undefined Project: /home/src/workspaces/project/packages/server/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/packages/server/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/packages/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/packages/shared/src/referenced.ts SVC-1-0 "export {};"
	/home/src/workspaces/project/packages/server/index.js Text-1 "const mod = require(\"../shared/src/referenced\");"
	/home/src/workspaces/project/packages/server/router.js Text-1 "const blah = require(\"../shared/dist/referenced\");"


	../../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.es5.d.ts'
	../shared/src/referenced.ts
	  Imported via "../shared/src/referenced" from file 'index.js'
	  Imported via "../shared/dist/referenced" from file 'router.js'
	index.js
	  Matched by default include pattern '**/*'
	router.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/packages/server/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/packages/server/tsconfig.json",
        "configFile": "/home/src/workspaces/project/packages/server/tsconfig.json",
        "diagnostics": [
          {
            "text": "Cannot write file '/home/src/workspaces/project/packages/server/index.js' because it would overwrite input file.",
            "code": 5055,
            "category": "error"
          },
          {
            "text": "Cannot write file '/home/src/workspaces/project/packages/server/router.js' because it would overwrite input file.",
            "code": 5055,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/packages/client/tsconfig.json, currentDirectory: /home/src/workspaces/project/packages/client
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/packages/client/tsconfig.json",
        "reason": "Creating project referenced by : /home/src/workspaces/project/tsconfig.json as it references project /home/src/workspaces/project/packages/shared/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/client/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/packages/client/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/packages/client/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/packages/client/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/packages/shared/src/referenced.ts SVC-1-0 "export {};"
	/home/src/workspaces/project/packages/client/index.ts Text-1 "import \"@shared/referenced\";"


	../../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.es5.d.ts'
	../shared/src/referenced.ts
	  Imported via "@shared/referenced" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/packages/client/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/packages/client/tsconfig.json",
        "configFile": "/home/src/workspaces/project/packages/client/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Finding references to file /home/src/workspaces/project/packages/shared/src/referenced.ts in project /home/src/workspaces/project/packages/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to file /home/src/workspaces/project/packages/shared/src/referenced.ts in project /home/src/workspaces/project/packages/client/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "fileReferences",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": {
        "refs": [
          {
            "file": "/home/src/workspaces/project/packages/server/index.js",
            "start": {
              "line": 1,
              "offset": 22
            },
            "end": {
              "line": 1,
              "offset": 46
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 49
            },
            "lineText": "const mod = require(\"../shared/src/referenced\");",
            "isWriteAccess": false
          },
          {
            "file": "/home/src/workspaces/project/packages/server/router.js",
            "start": {
              "line": 1,
              "offset": 23
            },
            "end": {
              "line": 1,
              "offset": 48
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 51
            },
            "lineText": "const blah = require(\"../shared/dist/referenced\");",
            "isWriteAccess": false
          },
          {
            "file": "/home/src/workspaces/project/packages/client/index.ts",
            "start": {
              "line": 1,
              "offset": 9
            },
            "end": {
              "line": 1,
              "offset": 27
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 29
            },
            "lineText": "import \"@shared/referenced\";",
            "isWriteAccess": false
          }
        ],
        "symbolName": "\"/home/src/workspaces/project/packages/shared/src/referenced.ts\""
      }
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
/home/src/workspaces/project/packages/client/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/packages/client/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/server/index.js: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/packages/server/router.js: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/packages/server/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/shared/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/project/packages/client:
  {}
/home/src/workspaces/project/packages/server:
  {}
/home/src/workspaces/project/packages/shared:
  {}
  {} *new*

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/packages/client/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/packages/server/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/packages/shared/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    dirty: false *changed*
    initialLoadPending: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 4 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/shared/tsconfig.json
        /home/src/workspaces/project/packages/server/tsconfig.json *new*
        /home/src/workspaces/project/packages/client/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 4 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/shared/tsconfig.json
        /home/src/workspaces/project/packages/server/tsconfig.json *new*
        /home/src/workspaces/project/packages/client/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *changed*
    version: Text-1
    containingProjects: 4 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/shared/tsconfig.json
        /home/src/workspaces/project/packages/server/tsconfig.json *new*
        /home/src/workspaces/project/packages/client/tsconfig.json *new*
/home/src/workspaces/project/packages/client/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/packages/client/tsconfig.json
/home/src/workspaces/project/packages/server/index.js *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/packages/server/tsconfig.json
/home/src/workspaces/project/packages/server/router.js *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/packages/server/tsconfig.json
/home/src/workspaces/project/packages/shared/src/referenced.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 3 *changed*
        /home/src/workspaces/project/packages/shared/tsconfig.json *default*
        /home/src/workspaces/project/packages/server/tsconfig.json *new*
        /home/src/workspaces/project/packages/client/tsconfig.json *new*
/home/src/workspaces/project/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
