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
          "module": "nodenext",
          "composite": true,
          "rewriteRelativeImportExtensions": true,
          "rootDir": "/tests/cases/fourslash/server/src/services",
          "outDir": "/tests/cases/fourslash/server/dist/services",
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
//// [/tests/cases/fourslash/server/src/compiler/parser.ts]
export {};

//// [/tests/cases/fourslash/server/src/compiler/tsconfig.json]
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "lib": ["es5"],
        "rootDir": ".",
        "outDir": "../../dist/compiler",
}

//// [/tests/cases/fourslash/server/src/services/services.ts]
import {} from "../compiler/parser.ts";

//// [/tests/cases/fourslash/server/src/services/tsconfig.json]
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "lib": ["es5"],
        "rootDir": ".",
        "outDir": "../../dist/services",
    },
    "references": [
        { "path": "../compiler" }
    ]
}

//// [/tests/cases/fourslash/server/src/tsconfig-base.json]
{
    "compilerOptions": {
        "lib": ["es5"],
        "module": "nodenext",
        "composite": true,
        "rewriteRelativeImportExtensions": true,
    }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/src/tsconfig-base.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/src/tsconfig-base.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /tests/cases/fourslash/server/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/src/tsconfig-base.json SVC-1-0 "{\n    \"compilerOptions\": {\n        \"lib\": [\"es5\"],\n        \"module\": \"nodenext\",\n        \"composite\": true,\n        \"rewriteRelativeImportExtensions\": true,\n    }\n}"


	../../../../../home/src/tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../home/src/tslibs/TS/Lib/lib.es5.d.ts'
	../../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../home/src/tslibs/TS/Lib/lib.es5.d.ts'
	tsconfig-base.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/src/tsconfig-base.json ProjectRootPath: undefined
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
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json: *new*
  {"pollingInterval":2000}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

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
/tests/cases/fourslash/server/src/tsconfig-base.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/src/services/services.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/src/services/services.ts ProjectRootPath: undefined:: Result: /tests/cases/fourslash/server/src/services/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /tests/cases/fourslash/server/src/services/tsconfig.json, currentDirectory: /tests/cases/fourslash/server/src/services
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/services/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/src/services/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/src/services/services.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "module": 199,
  "composite": true,
  "rewriteRelativeImportExtensions": true,
  "rootDir": "/tests/cases/fourslash/server/src/services",
  "outDir": "/tests/cases/fourslash/server/dist/services",
  "configFilePath": "/tests/cases/fourslash/server/src/services/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/tests/cases/fourslash/server/src/compiler",
   "originalPath": "../compiler"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/tsconfig-base.json 2000 undefined Config: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tests/cases/fourslash/server/src/services/tsconfig.json",
        "reason": "Creating possible configured project for /tests/cases/fourslash/server/src/services/services.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/services 1 undefined Config: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/services 1 undefined Config: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tests/cases/fourslash/server/src/services/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/src/compiler/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/src/compiler/parser.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "module": 199,
  "composite": true,
  "rewriteRelativeImportExtensions": true,
  "rootDir": "/tests/cases/fourslash/server/src/compiler",
  "outDir": "/tests/cases/fourslash/server/dist/compiler",
  "configFilePath": "/tests/cases/fourslash/server/src/compiler/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/compiler/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/compiler 1 undefined Config: /tests/cases/fourslash/server/src/compiler/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/compiler 1 undefined Config: /tests/cases/fourslash/server/src/compiler/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/compiler/parser.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/compiler/package.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/package.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/package.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/package.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/src/services/package.json 2000 undefined Project: /tests/cases/fourslash/server/src/services/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tests/cases/fourslash/server/src/services/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/src/services/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/src/compiler/parser.ts Text-1 "export {};"
	/tests/cases/fourslash/server/src/services/services.ts SVC-1-0 "import {} from \"../compiler/parser.ts\";"


	../../../../../../home/src/tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../../home/src/tslibs/TS/Lib/lib.es5.d.ts'
	../../../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../../home/src/tslibs/TS/Lib/lib.es5.d.ts'
	../compiler/parser.ts
	  Imported via "../compiler/parser.ts" from file 'services.ts'
	  File is CommonJS module because 'package.json' was not found
	services.ts
	  Matched by default include pattern '**/*'
	  File is CommonJS module because 'package.json' was not found

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tests/cases/fourslash/server/src/services/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/tests/cases/fourslash/server/src/services/services.ts",
        "configFile": "/tests/cases/fourslash/server/src/services/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/src/services/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/src/services/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/src/tsconfig-base.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/src/services/services.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/src/services/tsconfig.json
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
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
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
/tests/cases/fourslash/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/compiler/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/compiler/parser.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/src/compiler/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/services/package.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/services/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/tsconfig-base.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/src/tsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/server/src/compiler: *new*
  {}
/tests/cases/fourslash/server/src/services: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/tests/cases/fourslash/server/src/services/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /tests/cases/fourslash/server/src/services/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /tests/cases/fourslash/server/src/services/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /tests/cases/fourslash/server/src/services/tsconfig.json *new*
/tests/cases/fourslash/server/src/compiler/parser.ts *new*
    version: Text-1
    containingProjects: 1
        /tests/cases/fourslash/server/src/services/tsconfig.json
/tests/cases/fourslash/server/src/services/services.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /tests/cases/fourslash/server/src/services/tsconfig.json *default*
/tests/cases/fourslash/server/src/tsconfig-base.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/src/compiler/parser.ts",
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
        "file": "/tests/cases/fourslash/server/src/services/services.ts",
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
        "file": "/tests/cases/fourslash/server/src/compiler/parser.ts",
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
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/src/services/services.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 6,
      "success": true,
      "body": []
    }