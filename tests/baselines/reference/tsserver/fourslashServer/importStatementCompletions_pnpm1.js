currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/project/index.ts]
import Com

//// [/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts]
export declare function Component(): void;

//// [/project/node_modules/@types/react] symlink(/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react)
//// [/project/tsconfig.json]
{ "compilerOptions": { "module": "commonjs" } }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/project/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/tsconfig.json :: Config file name: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/tsconfig.json 2000 undefined Project: /project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/project/tsconfig.json",
        "reason": "Creating possible configured project for /project/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /project/tsconfig.json : {
 "rootNames": [
  "/project/index.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/project/index.ts Text-1 "import Com"
	/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts Text-1 "export declare function Component(): void;"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	index.ts
	  Matched by default include pattern '**/*'
	node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts
	  Entry point for implicit type library 'react'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/project/tsconfig.json",
        "configFile": "/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/project/tsconfig.json SVC-1-0 "{ \"compilerOptions\": { \"module\": \"commonjs\" } }"
	/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts Text-1 "export declare function Component(): void;"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	tsconfig.json
	  Root file specified for compilation
	node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts
	  Entry point for implicit type library 'react'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/project/index.ts: *new*
  {"pollingInterval":500}
/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts: *new*
  {"pollingInterval":500}
/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/project: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/project/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /project/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/index.ts :: Config file name: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /project/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts:
  {"pollingInterval":500}
/project/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/project/index.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/project:
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "preferences": {
          "includeCompletionsForImportStatements": true,
          "includeCompletionsWithInsertText": true,
          "includeCompletionsWithSnippetText": true
        }
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
        "file": "/project/index.ts",
        "line": 1,
        "offset": 11
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 1 module specifiers, plus 0 ambient and 0 from cache
Info seq  [hh:mm:ss:mss] collectAutoImports: response is complete
Info seq  [hh:mm:ss:mss] collectAutoImports: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionInfo",
      "request_seq": 3,
      "success": true,
      "body": {
        "flags": 11,
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "optionalReplacementSpan": {
          "start": {
            "line": 1,
            "offset": 8
          },
          "end": {
            "line": 1,
            "offset": 11
          }
        },
        "entries": [
          {
            "name": "Component",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "11",
            "insertText": "import { Component$1 } from \"react\";",
            "replacementSpan": {
              "start": {
                "line": 1,
                "offset": 1
              },
              "end": {
                "line": 1,
                "offset": 11
              }
            },
            "isSnippet": true,
            "source": "react",
            "sourceDisplay": [
              {
                "text": "react",
                "kind": "text"
              }
            ],
            "isImportStatementCompletion": true,
            "data": {
              "exportName": "Component",
              "exportMapKey": "9 * Component ",
              "moduleSpecifier": "react",
              "fileName": "/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts"
            }
          },
          {
            "name": "type",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          }
        ]
      }
    }
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts:
  {"pollingInterval":500}
/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/project:
  {}
/project/node_modules: *new*
  {}
