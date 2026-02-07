Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "options": {
          "module": "node16",
          "lib": [
            "es5"
          ],
          "strict": true,
          "outDir": "/home/src/workspaces/project/out",
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
//// [/home/src/workspaces/project/index.mts]
import leftPad = require("left-pad");
leftPad("", 4);

//// [/home/src/workspaces/project/node_modules/left-pad/index.d.ts]
declare function leftPad(str: string|number, len: number, ch?: string|number): string;
declare namespace leftPad { }
export = leftPad;

//// [/home/src/workspaces/project/node_modules/left-pad/index.js]
module.exports = leftPad;
function leftPad(str, len, ch) {}

//// [/home/src/workspaces/project/node_modules/left-pad/package.json]
{
  "name": "left-pad",
  "version": "1.3.0",
  "description": "String left pad",
  "main": "index.js",
  "types": "index.d.ts"
}

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
      "module": "node16",
      "lib": ["es5"],
      "strict": true,
      "outDir": "./out",

  }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/node_modules/left-pad/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/node_modules/left-pad/package.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project/node_modules/left-pad
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/left-pad/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/left-pad/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
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
	/home/src/workspaces/project/node_modules/left-pad/package.json SVC-1-0 "{\n  \"name\": \"left-pad\",\n  \"version\": \"1.3.0\",\n  \"description\": \"String left pad\",\n  \"main\": \"index.js\",\n  \"types\": \"index.d.ts\"\n}"


	../../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.es5.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/node_modules/left-pad/package.json ProjectRootPath: undefined
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
/home/src/workspaces/project/node_modules/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/left-pad/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/left-pad/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/tsconfig.json: *new*
  {"pollingInterval":2000}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

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
/home/src/workspaces/project/node_modules/left-pad/package.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.mts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/index.mts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/index.mts"
 ],
 "options": {
  "module": 100,
  "lib": [
   "lib.es5.d.ts"
  ],
  "strict": true,
  "outDir": "/home/src/workspaces/project/out",
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
        "reason": "Creating possible configured project for /home/src/workspaces/project/index.mts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/left-pad/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/left-pad/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/node_modules/left-pad/index.d.ts Text-1 "declare function leftPad(str: string|number, len: number, ch?: string|number): string;\ndeclare namespace leftPad { }\nexport = leftPad;"
	/home/src/workspaces/project/index.mts SVC-1-0 "import leftPad = require(\"left-pad\");\nleftPad(\"\", 4);"


	../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	node_modules/left-pad/index.d.ts
	  Imported via "left-pad" from file 'index.mts' with packageId 'left-pad/index.d.ts@1.3.0'
	  File is CommonJS module because 'node_modules/left-pad/package.json' does not have field "type"
	index.mts
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
        "triggerFile": "/home/src/workspaces/project/index.mts",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/node_modules/left-pad/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/index.mts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
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
/home/src/workspaces/project/node_modules/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/left-pad/index.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/left-pad/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/left-pad/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/left-pad/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectories::
/home/src/workspaces: *new*
  {}
/home/src/workspaces/project: *new*
  {}

watchedDirectoriesRecursive::
/home/src/workspaces/project: *new*
  {}
/home/src/workspaces/project/node_modules: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/tsconfig.json *new*
/home/src/workspaces/project/index.mts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/left-pad/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/left-pad/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.mts",
        "line": 2,
        "offset": 1
      },
      "command": "findSourceDefinition"
    }
Info seq  [hh:mm:ss:mss] Creating AuxiliaryProject: /dev/null/auxiliaryProject1*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/left-pad/index.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/left-pad/package.json 2000 undefined Project: /dev/null/auxiliaryProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/workspaces/project/node_modules/left-pad/index.js Text-1 "module.exports = leftPad;\nfunction leftPad(str, len, ch) {}"
	/home/src/workspaces/project/index.mts SVC-1-0 "import leftPad = require(\"left-pad\");\nleftPad(\"\", 4);"


	node_modules/left-pad/index.js
	  Imported via "left-pad" from file 'index.mts' with packageId 'left-pad/index.js@1.3.0'
	  File is CommonJS module because 'node_modules/left-pad/package.json' does not have field "type"
	index.mts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "findSourceDefinition",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": [
        {
          "file": "/home/src/workspaces/project/node_modules/left-pad/index.js",
          "start": {
            "line": 2,
            "offset": 10
          },
          "end": {
            "line": 2,
            "offset": 17
          },
          "contextStart": {
            "line": 2,
            "offset": 1
          },
          "contextEnd": {
            "line": 2,
            "offset": 34
          }
        }
      ]
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
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/left-pad/index.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/left-pad/index.js: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/left-pad/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/left-pad/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/home/src/workspaces/project/node_modules/left-pad/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectories::
/home/src/workspaces:
  {}
  {} *new*
/home/src/workspaces/project:
  {}
  {} *new*

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules: *new*
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/node_modules:
  {}
  {} *new*

Projects::
/dev/null/auxiliaryProject1* (Auxiliary) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /home/src/workspaces/project/node_modules/left-pad/index.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false
    noDtsResolutionProject: /dev/null/auxiliaryProject1* *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /home/src/workspaces/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /home/src/workspaces/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/index.mts (Open) *changed*
    version: SVC-1-0
    containingProjects: 2 *changed*
        /home/src/workspaces/project/tsconfig.json *default*
        /dev/null/auxiliaryProject1* *new*
/home/src/workspaces/project/node_modules/left-pad/index.d.ts *changed*
    version: Text-1
    sourceMapFilePath: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/left-pad/index.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
/home/src/workspaces/project/node_modules/left-pad/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
