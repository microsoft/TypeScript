currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/classes.ts]
import { Component } from "./utils.js";

export class MyComponent extends Component {
    render
}

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tsconfig.json]
{
  "compilerOptions": {
    "module": "nodenext"
  }
}

//// [/utils.ts]
export class Element {
    // ...
}

export abstract class Component {
    abstract render(): Element;
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tsconfig.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tsconfig.json",
      "reason": "Creating possible configured project for /tsconfig.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/classes.ts",
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts",
  "/utils.ts"
 ],
 "options": {
  "module": 199,
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /classes.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /utils.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/utils.ts Text-1 "export class Element {\n    // ...\n}\n\nexport abstract class Component {\n    abstract render(): Element;\n}"
	/classes.ts Text-1 "import { Component } from \"./utils.js\";\n\nexport class MyComponent extends Component {\n    render\n}"
	/lib.d.ts Text-1 lib.d.ts-Text


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	utils.ts
	  Imported via "./utils.js" from file 'classes.ts'
	  Matched by default include pattern '**/*'
	  File is CommonJS module because 'package.json' was not found
	classes.ts
	  Matched by default include pattern '**/*'
	  File is CommonJS module because 'package.json' was not found
	lib.d.ts
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
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/tsconfig.json",
      "configFile": "/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tsconfig.json SVC-1-0 "{\n  \"compilerOptions\": {\n    \"module\": \"nodenext\"\n  }\n}"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/classes.ts: *new*
  {"pollingInterval":500}
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tsconfig.json: *new*
  {"pollingInterval":2000}
/utils.ts: *new*
  {"pollingInterval":500}

watchedDirectoriesRecursive::
: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/classes.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /classes.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /classes.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /classes.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tsconfig.json:
  {"pollingInterval":2000}
/utils.ts:
  {"pollingInterval":500}

watchedFiles *deleted*::
/classes.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
:
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"preferences":{"includeCompletionsWithInsertText":true,"includeCompletionsWithSnippetText":true,"includeCompletionsWithClassMemberSnippets":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 2,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/classes.ts","line":4,"offset":11},"command":"completionInfo"}
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
     "seq": 0,
     "type": "response",
     "command": "completionInfo",
     "request_seq": 3,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": true,
      "optionalReplacementSpan": {
       "start": {
        "line": 4,
        "offset": 5
       },
       "end": {
        "line": 4,
        "offset": 11
       }
      },
      "entries": [
       {
        "name": "render",
        "kind": "method",
        "kindModifiers": "abstract",
        "sortText": "11",
        "insertText": "render(): Element {\r\n    $0\r\n}",
        "filterText": "render",
        "isSnippet": true,
        "hasAction": true,
        "source": "ClassMemberSnippet/"
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
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/utils.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /utils.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /utils.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /classes.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /utils.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/utils.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
:
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/classes.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /classes.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /utils.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/classes.ts","line":4,"offset":10,"endLine":4,"endOffset":11,"insertString":""},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"preferences":{"includeCompletionsWithInsertText":true,"includeCompletionsWithSnippetText":true,"includeCompletionsWithClassMemberSnippets":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 7,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":8,"type":"request","arguments":{"file":"/classes.ts","line":4,"offset":10},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/utils.ts Text-1 "export class Element {\n    // ...\n}\n\nexport abstract class Component {\n    abstract render(): Element;\n}"
	/classes.ts SVC-2-1 "import { Component } from \"./utils.js\";\n\nexport class MyComponent extends Component {\n    rende\n}"
	/lib.d.ts Text-1 lib.d.ts-Text

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache hit
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionInfo",
     "request_seq": 8,
     "success": true,
     "performanceData": {
      "updateGraphDurationMs": *
     },
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": true,
      "optionalReplacementSpan": {
       "start": {
        "line": 4,
        "offset": 5
       },
       "end": {
        "line": 4,
        "offset": 10
       }
      },
      "entries": [
       {
        "name": "render",
        "kind": "method",
        "kindModifiers": "abstract",
        "sortText": "11",
        "insertText": "render(): Element {\r\n    $0\r\n}",
        "filterText": "render",
        "isSnippet": true,
        "hasAction": true,
        "source": "ClassMemberSnippet/"
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
      ]
     }
    }