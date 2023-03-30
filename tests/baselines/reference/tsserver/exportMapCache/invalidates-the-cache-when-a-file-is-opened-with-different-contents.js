currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/classes.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /
Info 3    [00:00:12.000] For info: /classes.ts :: Config file name: /tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/tsconfig.json","reason":"Creating possible configured project for /classes.ts to open"}}
Info 7    [00:00:16.000] Config: /tsconfig.json : {
 "rootNames": [
  "/classes.ts",
  "/utils.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 8    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 10   [00:00:19.000] FileWatcher:: Added:: WatchInfo: /utils.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:20.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 12   [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 13   [00:00:22.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:23.000] Project '/tsconfig.json' (Configured)
Info 15   [00:00:24.000] 	Files (2)
	/utils.ts Text-1 "export class Element {\n                // ...\n            }\n\n            export abstract class Component {\n                abstract render(): Element;\n            }"
	/classes.ts SVC-1-0 "import { Component } from \"./utils.js\";\n\n            export class MyComponent extends Component {\n                render/**/\n            }"


	utils.ts
	  Imported via "./utils.js" from file 'classes.ts'
	  Matched by default include pattern '**/*'
	classes.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:25.000] -----------------------------------------------
Info 17   [00:00:26.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/tsconfig.json"}}
Info 18   [00:00:27.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"aace87d7c1572ff43c6978074161b586788b4518c7a9d06c79c03e613b6ce5a3","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":302,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 19   [00:00:28.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/classes.ts","configFile":"/tsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
Info 20   [00:00:29.000] Project '/tsconfig.json' (Configured)
Info 20   [00:00:30.000] 	Files (2)

Info 20   [00:00:31.000] -----------------------------------------------
Info 20   [00:00:32.000] Open files: 
Info 20   [00:00:33.000] 	FileName: /classes.ts ProjectRootPath: undefined
Info 20   [00:00:34.000] 		Projects: /tsconfig.json
Info 20   [00:00:35.000] response:
    {
      "responseRequired": false
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

Before request

Info 21   [00:00:36.000] request:
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
Info 22   [00:00:37.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":2,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 23   [00:00:38.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 24   [00:00:39.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/classes.ts",
        "line": 4,
        "offset": 23,
        "prefix": "render",
        "includeExternalModuleExports": true,
        "includeInsertTextCompletions": true
      },
      "seq": 3,
      "type": "request"
    }
Info 25   [00:00:40.000] getCompletionData: Get current token: *
Info 26   [00:00:41.000] getCompletionData: Is inside comment: *
Info 27   [00:00:42.000] getCompletionData: Get previous token: *
Info 28   [00:00:43.000] getCompletionsAtPosition: isCompletionListBlocker: *
Info 29   [00:00:44.000] getCompletionData: Semantic work: *
Info 30   [00:00:45.000] getExportInfoMap: cache miss or empty; calculating new results
Info 31   [00:00:46.000] getExportInfoMap: done in * ms
Info 32   [00:00:47.000] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info 33   [00:00:48.000] response:
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
          },
          {
            "name": "render",
            "kind": "method",
            "kindModifiers": "abstract",
            "sortText": "17",
            "insertText": "render(): Element {\n}",
            "hasAction": true,
            "source": "ClassMemberSnippet/"
          }
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info 34   [00:00:49.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/utils.ts",
        "fileContent": "export class Element {\n                // ...\n            }\n\n            export abstract class Component {\n                abstract render2(): Element;\n            }"
      },
      "seq": 4,
      "type": "request"
    }
Info 35   [00:00:50.000] FileWatcher:: Close:: WatchInfo: /utils.ts 500 undefined WatchType: Closed Script info
Info 36   [00:00:51.000] Search path: /
Info 37   [00:00:52.000] For info: /utils.ts :: Config file name: /tsconfig.json
Info 38   [00:00:53.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 39   [00:00:54.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 40   [00:00:55.000] Project '/tsconfig.json' (Configured)
Info 41   [00:00:56.000] 	Files (2)
	/utils.ts SVC-2-0 "export class Element {\n                // ...\n            }\n\n            export abstract class Component {\n                abstract render2(): Element;\n            }"
	/classes.ts SVC-1-0 "import { Component } from \"./utils.js\";\n\n            export class MyComponent extends Component {\n                render/**/\n            }"

Info 42   [00:00:57.000] -----------------------------------------------
Info 43   [00:00:58.000] Project '/tsconfig.json' (Configured)
Info 43   [00:00:59.000] 	Files (2)

Info 43   [00:01:00.000] -----------------------------------------------
Info 43   [00:01:01.000] Open files: 
Info 43   [00:01:02.000] 	FileName: /classes.ts ProjectRootPath: undefined
Info 43   [00:01:03.000] 		Projects: /tsconfig.json
Info 43   [00:01:04.000] 	FileName: /utils.ts ProjectRootPath: undefined
Info 43   [00:01:05.000] 		Projects: /tsconfig.json
Info 43   [00:01:06.000] response:
    {
      "responseRequired": false
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

Before request

Info 44   [00:01:07.000] request:
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
Info 45   [00:01:08.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info 46   [00:01:09.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/classes.ts",
        "line": 4,
        "offset": 22,
        "prefix": "rende",
        "includeExternalModuleExports": true,
        "includeInsertTextCompletions": true
      },
      "seq": 6,
      "type": "request"
    }
Info 47   [00:01:10.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 48   [00:01:11.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 49   [00:01:12.000] Project '/tsconfig.json' (Configured)
Info 50   [00:01:13.000] 	Files (2)
	/utils.ts SVC-2-0 "export class Element {\n                // ...\n            }\n\n            export abstract class Component {\n                abstract render2(): Element;\n            }"
	/classes.ts SVC-1-1 "import { Component } from \"./utils.js\";\n\n            export class MyComponent extends Component {\n                rende/**/\n            }"

Info 51   [00:01:14.000] -----------------------------------------------
Info 52   [00:01:15.000] getCompletionData: Get current token: *
Info 53   [00:01:16.000] getCompletionData: Is inside comment: *
Info 54   [00:01:17.000] getCompletionData: Get previous token: *
Info 55   [00:01:18.000] getCompletionsAtPosition: isCompletionListBlocker: *
Info 56   [00:01:19.000] getCompletionData: Semantic work: *
Info 57   [00:01:20.000] getExportInfoMap: cache miss or empty; calculating new results
Info 58   [00:01:21.000] getExportInfoMap: done in * ms
Info 59   [00:01:22.000] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info 60   [00:01:23.000] response:
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
          },
          {
            "name": "render2",
            "kind": "method",
            "kindModifiers": "abstract",
            "sortText": "17",
            "insertText": "render2(): Element {\n}",
            "hasAction": true,
            "source": "ClassMemberSnippet/"
          }
        ]
      },
      "responseRequired": true
    }
After request
