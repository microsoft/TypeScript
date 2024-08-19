currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.ts]
Lib1

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/lib1/index.d.ts]
export class Lib1 {}

//// [/node_modules/lib1/package.json]
{ "name": "lib1", "types": "./index.d.ts" }

//// [/node_modules/lib10/index.d.ts]
export class Lib10 {}

//// [/node_modules/lib10/package.json]
{ "name": "lib10", "types": "./index.d.ts" }

//// [/node_modules/lib11/index.d.ts]
export class Lib11 {}

//// [/node_modules/lib11/package.json]
{ "name": "lib11", "types": "./index.d.ts" }

//// [/node_modules/lib2/index.d.ts]
export class Lib2 {}

//// [/node_modules/lib2/package.json]
{ "name": "lib2", "types": "./index.d.ts" }

//// [/node_modules/lib3/index.d.ts]
export class Lib3 {}

//// [/node_modules/lib3/package.json]
{ "name": "lib3", "types": "./index.d.ts" }

//// [/node_modules/lib4/index.d.ts]
export class Lib4 {}

//// [/node_modules/lib4/package.json]
{ "name": "lib4", "types": "./index.d.ts" }

//// [/node_modules/lib5/index.d.ts]
export class Lib5 {}

//// [/node_modules/lib5/package.json]
{ "name": "lib5", "types": "./index.d.ts" }

//// [/node_modules/lib6/index.d.ts]
export class Lib6 {}

//// [/node_modules/lib6/package.json]
{ "name": "lib6", "types": "./index.d.ts" }

//// [/node_modules/lib7/index.d.ts]
export class Lib7 {}

//// [/node_modules/lib7/package.json]
{ "name": "lib7", "types": "./index.d.ts" }

//// [/node_modules/lib8/index.d.ts]
export class Lib8 {}

//// [/node_modules/lib8/package.json]
{ "name": "lib8", "types": "./index.d.ts" }

//// [/node_modules/lib9/index.d.ts]
export class Lib9 {}

//// [/node_modules/lib9/package.json]
{ "name": "lib9", "types": "./index.d.ts" }

//// [/package.json]
{
  "dependencies": {
    "lib1": "*",
    "lib2": "*",
    "lib3": "*",
    "lib4": "*",
    "lib5": "*",
    "lib6": "*",
    "lib7": "*",
    "lib8": "*",
    "lib9": "*",
    "lib10": "*",
    "lib11": "*"
  }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /index.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/index.ts SVC-1-0 "Lib1"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: attempted to add more than 10 dependencies. Aborting.
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
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
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/package.json: *new*
  {"pollingInterval":250}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
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
      "request_seq": 1,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
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
        "file": "/index.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 3,
      "success": true,
      "body": [
        {
          "message": "Cannot find name 'Lib1'.",
          "start": 0,
          "length": 4,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 5
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "includeLinePosition": true
      },
      "command": "suggestionDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "suggestionDiagnosticsSync",
      "request_seq": 4,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 5,
        "errorCodes": [
          2304
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: attempted to add more than 10 dependencies. Aborting.
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 5,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
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
      "request_seq": 6,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "includeLinePosition": true
      },
      "command": "syntacticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "syntacticDiagnosticsSync",
      "request_seq": 7,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 8,
      "success": true,
      "body": [
        {
          "message": "Cannot find name 'Lib1'.",
          "start": 0,
          "length": 4,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 5
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "includeLinePosition": true
      },
      "command": "suggestionDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "suggestionDiagnosticsSync",
      "request_seq": 9,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 5,
        "errorCodes": [
          2304
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: attempted to add more than 10 dependencies. Aborting.
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 10,
      "success": true,
      "body": []
    }