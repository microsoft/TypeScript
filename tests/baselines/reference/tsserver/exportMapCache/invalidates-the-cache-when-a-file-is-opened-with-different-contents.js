currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/utils.ts]
export class Element {
                // ...
            }

            export abstract class Component {
                abstract render(): Element;
            }

//// [/classes.ts]
import { Component } from "./utils.js";

            export class MyComponent extends Component {
                render/**/
            }

//// [/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/classes.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /classes.ts ProjectRootPath: undefined:: Result: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tsconfig.json",
        "reason": "Creating possible configured project for /classes.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/classes.ts",
  "/utils.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /utils.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/utils.ts Text-1 "export class Element {\n                // ...\n            }\n\n            export abstract class Component {\n                abstract render(): Element;\n            }"
	/classes.ts SVC-1-0 "import { Component } from \"./utils.js\";\n\n            export class MyComponent extends Component {\n                render/**/\n            }"


	utils.ts
	  Imported via "./utils.js" from file 'classes.ts'
	  Matched by default include pattern '**/*'
	classes.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "aace87d7c1572ff43c6978074161b586788b4518c7a9d06c79c03e613b6ce5a3",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 302,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/classes.ts",
        "configFile": "/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'",
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
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /classes.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
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
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/utils.ts: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

Projects::
/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/classes.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /tsconfig.json *default*
/utils.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "includeCompletionsForModuleExports": true,
          "includeCompletionsWithClassMemberSnippets": true,
          "includeCompletionsWithInsertText": true
        }
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 2,
      "success": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/classes.ts",
        "line": 4,
        "offset": 23,
        "prefix": "render"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "flags": 0,
        "isGlobalCompletion": false,
        "isMemberCompletion": true,
        "isNewIdentifierLocation": true,
        "optionalReplacementSpan": {
          "start": {
            "line": 4,
            "offset": 17
          },
          "end": {
            "line": 4,
            "offset": 23
          }
        },
        "entries": [
          {
            "name": "render",
            "kind": "method",
            "kindModifiers": "abstract",
            "sortText": "11",
            "source": "ClassMemberSnippet/",
            "hasAction": true,
            "insertText": "render(): Element {\n}",
            "filterText": "render"
          },
          {
            "name": "abstract",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "accessor",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "async",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "constructor",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "declare",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "get",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "override",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "private",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "protected",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "public",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "readonly",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "set",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "static",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          }
        ],
        "defaultCommitCharacters": []
      },
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/utils.ts",
        "fileContent": "export class Element {\n                // ...\n            }\n\n            export abstract class Component {\n                abstract render2(): Element;\n            }"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /utils.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /utils.ts ProjectRootPath: undefined:: Result: /tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/utils.ts SVC-2-0 "export class Element {\n                // ...\n            }\n\n            export abstract class Component {\n                abstract render2(): Element;\n            }"
	/classes.ts SVC-1-0 "import { Component } from \"./utils.js\";\n\n            export class MyComponent extends Component {\n                render/**/\n            }"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /classes.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /utils.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatches *deleted*::
/utils.ts:
  {}

FsWatchesRecursive::
/:
  {}

Projects::
/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1

ScriptInfos::
/classes.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /tsconfig.json *default*
/utils.ts (Open) *changed*
    open: true *changed*
    version: SVC-2-0 *changed*
    containingProjects: 1
        /tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/classes.ts",
            "textChanges": [
              {
                "newText": "",
                "start": {
                  "line": 4,
                  "offset": 22
                },
                "end": {
                  "line": 4,
                  "offset": 23
                }
              }
            ]
          }
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

ScriptInfos::
/classes.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/utils.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /tsconfig.json *default*

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

After getPackageJsonAutoImportProvider

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/classes.ts",
        "line": 4,
        "offset": 22,
        "prefix": "rende"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 3 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/utils.ts SVC-2-0 "export class Element {\n                // ...\n            }\n\n            export abstract class Component {\n                abstract render2(): Element;\n            }"
	/classes.ts SVC-1-1 "import { Component } from \"./utils.js\";\n\n            export class MyComponent extends Component {\n                rende/**/\n            }"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "flags": 0,
        "isGlobalCompletion": false,
        "isMemberCompletion": true,
        "isNewIdentifierLocation": true,
        "optionalReplacementSpan": {
          "start": {
            "line": 4,
            "offset": 17
          },
          "end": {
            "line": 4,
            "offset": 22
          }
        },
        "entries": [
          {
            "name": "render2",
            "kind": "method",
            "kindModifiers": "abstract",
            "sortText": "11",
            "source": "ClassMemberSnippet/",
            "hasAction": true,
            "insertText": "render2(): Element {\n}",
            "filterText": "render2"
          },
          {
            "name": "abstract",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "accessor",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "async",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "constructor",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "declare",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "get",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "override",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "private",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "protected",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "public",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "readonly",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "set",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "static",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          }
        ],
        "defaultCommitCharacters": []
      },
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 1
    dirty: false *changed*
