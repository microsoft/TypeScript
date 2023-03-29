currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:27.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/src/a.ts]
export const foo = 0;

//// [/src/b.ts]
foo

//// [/src/c.ts]
import 

//// [/src/b-link.ts] symlink(/src/b.ts)
//// [/src/ambient.d.ts]
declare module 'ambient' {}

//// [/tsconfig.json]
{ "include": ["src"] }

//// [/package.json]
{ "dependencies": { "mobx": "*" } }

//// [/node_modules/mobx/package.json]
{ "name": "mobx", "version": "1.0.0" }

//// [/node_modules/mobx/index.d.ts]
export declare function observable(): unknown;


Info 1    [00:00:28.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:29.000] Search path: /src
Info 3    [00:00:30.000] For info: /src/a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:31.000] Creating configuration project /tsconfig.json
Info 5    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:33.000] Config: /tsconfig.json : {
 "rootNames": [
  "/src/a.ts",
  "/src/ambient.d.ts",
  "/src/b-link.ts",
  "/src/b.ts",
  "/src/c.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /src/ambient.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /src/b-link.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /src/b.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /src/c.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:40.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 14   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 15   [00:00:42.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:43.000] Project '/tsconfig.json' (Configured)
Info 17   [00:00:44.000] 	Files (5)
	/src/a.ts SVC-1-0 "export const foo = 0;"
	/src/ambient.d.ts Text-1 "declare module 'ambient' {}"
	/src/b-link.ts Text-1 "foo"
	/src/b.ts Text-1 "foo"
	/src/c.ts Text-1 "import "


	src/a.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/ambient.d.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/b-link.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/b.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/c.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 18   [00:00:45.000] -----------------------------------------------
Info 19   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 20   [00:00:47.000] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info 21   [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 22   [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 23   [00:00:50.000] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info 24   [00:00:51.000] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 25   [00:00:52.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 26   [00:00:53.000] 	Files (1)
	/node_modules/mobx/index.d.ts Text-1 "export declare function observable(): unknown;"


	node_modules/mobx/index.d.ts
	  Root file specified for compilation

Info 27   [00:00:54.000] -----------------------------------------------
Info 28   [00:00:55.000] Project '/tsconfig.json' (Configured)
Info 28   [00:00:56.000] 	Files (5)

Info 28   [00:00:57.000] -----------------------------------------------
Info 28   [00:00:58.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 28   [00:00:59.000] 	Files (1)

Info 28   [00:01:00.000] -----------------------------------------------
Info 28   [00:01:01.000] Open files: 
Info 28   [00:01:02.000] 	FileName: /src/a.ts ProjectRootPath: undefined
Info 28   [00:01:03.000] 		Projects: /tsconfig.json
Info 28   [00:01:04.000] response:
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
/src/ambient.d.ts: *new*
  {}
/src/b-link.ts: *new*
  {}
/src/b.ts: *new*
  {}
/src/c.ts: *new*
  {}
/package.json: *new*
  {}

FsWatchesRecursive::
/src: *new*
  {}
/node_modules: *new*
  {}

Before request

Info 29   [00:01:05.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 30   [00:01:06.000] FileWatcher:: Close:: WatchInfo: /src/b.ts 500 undefined WatchType: Closed Script info
Info 31   [00:01:07.000] Search path: /src
Info 32   [00:01:08.000] For info: /src/b.ts :: Config file name: /tsconfig.json
Info 33   [00:01:09.000] Project '/tsconfig.json' (Configured)
Info 33   [00:01:10.000] 	Files (5)

Info 33   [00:01:11.000] -----------------------------------------------
Info 33   [00:01:12.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 33   [00:01:13.000] 	Files (1)

Info 33   [00:01:14.000] -----------------------------------------------
Info 33   [00:01:15.000] Open files: 
Info 33   [00:01:16.000] 	FileName: /src/a.ts ProjectRootPath: undefined
Info 33   [00:01:17.000] 		Projects: /tsconfig.json
Info 33   [00:01:18.000] 	FileName: /src/b.ts ProjectRootPath: undefined
Info 33   [00:01:19.000] 		Projects: /tsconfig.json
Info 33   [00:01:20.000] response:
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
/src/ambient.d.ts:
  {}
/src/b-link.ts:
  {}
/src/c.ts:
  {}
/package.json:
  {}

FsWatches *deleted*::
/src/b.ts:
  {}

FsWatchesRecursive::
/src:
  {}
/node_modules:
  {}

Before request

Info 34   [00:01:21.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/c.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 35   [00:01:22.000] FileWatcher:: Close:: WatchInfo: /src/c.ts 500 undefined WatchType: Closed Script info
Info 36   [00:01:23.000] Search path: /src
Info 37   [00:01:24.000] For info: /src/c.ts :: Config file name: /tsconfig.json
Info 38   [00:01:25.000] Project '/tsconfig.json' (Configured)
Info 38   [00:01:26.000] 	Files (5)

Info 38   [00:01:27.000] -----------------------------------------------
Info 38   [00:01:28.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 38   [00:01:29.000] 	Files (1)

Info 38   [00:01:30.000] -----------------------------------------------
Info 38   [00:01:31.000] Open files: 
Info 38   [00:01:32.000] 	FileName: /src/a.ts ProjectRootPath: undefined
Info 38   [00:01:33.000] 		Projects: /tsconfig.json
Info 38   [00:01:34.000] 	FileName: /src/b.ts ProjectRootPath: undefined
Info 38   [00:01:35.000] 		Projects: /tsconfig.json
Info 38   [00:01:36.000] 	FileName: /src/c.ts ProjectRootPath: undefined
Info 38   [00:01:37.000] 		Projects: /tsconfig.json
Info 38   [00:01:38.000] response:
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
/src/ambient.d.ts:
  {}
/src/b-link.ts:
  {}
/package.json:
  {}

FsWatches *deleted*::
/src/c.ts:
  {}

FsWatchesRecursive::
/src:
  {}
/node_modules:
  {}

Before request

Info 39   [00:01:39.000] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "includeCompletionsForImportStatements": true,
          "includeCompletionsForModuleExports": true,
          "includeCompletionsWithInsertText": true,
          "includeCompletionsWithSnippetText": true
        }
      },
      "seq": 4,
      "type": "request"
    }
Info 40   [00:01:40.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":4,"success":true,"performanceData":{"updateGraphDurationMs":*,"createAutoImportProviderProgramDurationMs":*}}
Info 41   [00:01:41.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 42   [00:01:42.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/src/b.ts",
        "line": 1,
        "offset": 3
      },
      "seq": 5,
      "type": "request"
    }
Info 43   [00:01:43.000] getCompletionData: Get current token: *
Info 44   [00:01:44.000] getCompletionData: Is inside comment: *
Info 45   [00:01:45.000] getCompletionData: Get previous token: *
Info 46   [00:01:46.000] getExportInfoMap: cache miss or empty; calculating new results
Info 47   [00:01:47.000] forEachExternalModuleToImportFrom autoImportProvider: *
Info 48   [00:01:48.000] getExportInfoMap: done in * ms
Info 49   [00:01:49.000] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 1 from cache
Info 50   [00:01:50.000] collectAutoImports: response is incomplete
Info 51   [00:01:51.000] collectAutoImports: *
Info 52   [00:01:52.000] getCompletionData: Semantic work: *
Info 53   [00:01:53.000] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info 54   [00:01:54.000] response:
    {
      "response": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "optionalReplacementSpan": {
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 4
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
            "name": "any",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "as",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "asserts",
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
            "name": "await",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "bigint",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "boolean",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "break",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "case",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "catch",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "class",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "const",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "continue",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "debugger",
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
            "name": "default",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "delete",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "do",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "else",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "enum",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "export",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "extends",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "false",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "finally",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "for",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "function",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "globalThis",
            "kind": "module",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "if",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "implements",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "import",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "in",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "infer",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "instanceof",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "interface",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "keyof",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "let",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "module",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "namespace",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "never",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "new",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "null",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "number",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "object",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "package",
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
            "name": "return",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "satisfies",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "string",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "super",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "switch",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "symbol",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "this",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "throw",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "true",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "try",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "type",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "typeof",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "undefined",
            "kind": "var",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "unique",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "unknown",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "var",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "void",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "while",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "with",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "yield",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "foo",
            "kind": "const",
            "kindModifiers": "export",
            "sortText": "16",
            "hasAction": true,
            "source": "/src/a",
            "data": {
              "exportName": "foo",
              "exportMapKey": "foo|*|",
              "fileName": "/src/a.ts"
            }
          }
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info 55   [00:01:55.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/src/c.ts",
        "line": 1,
        "offset": 8
      },
      "seq": 6,
      "type": "request"
    }
Info 56   [00:01:56.000] getCompletionData: Get current token: *
Info 57   [00:01:57.000] getCompletionData: Is inside comment: *
Info 58   [00:01:58.000] getCompletionData: Get previous token: *
Info 59   [00:01:59.000] getExportInfoMap: cache miss or empty; calculating new results
Info 60   [00:02:00.000] forEachExternalModuleToImportFrom autoImportProvider: *
Info 61   [00:02:01.000] getExportInfoMap: done in * ms
Info 62   [00:02:02.000] collectAutoImports: resolved 2 module specifiers, plus 0 ambient and 0 from cache
Info 63   [00:02:03.000] collectAutoImports: response is complete
Info 64   [00:02:04.000] collectAutoImports: *
Info 65   [00:02:05.000] getCompletionData: Semantic work: *
Info 66   [00:02:06.000] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info 67   [00:02:07.000] response:
    {
      "response": {
        "flags": 11,
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "foo",
            "kind": "const",
            "kindModifiers": "export",
            "sortText": "11",
            "insertText": "import { foo$1 } from \"./a\";",
            "replacementSpan": {
              "start": {
                "line": 1,
                "offset": 1
              },
              "end": {
                "line": 1,
                "offset": 7
              }
            },
            "isSnippet": true,
            "source": "./a",
            "sourceDisplay": [
              {
                "text": "./a",
                "kind": "text"
              }
            ],
            "isImportStatementCompletion": true,
            "data": {
              "exportName": "foo",
              "exportMapKey": "foo|*|",
              "moduleSpecifier": "./a",
              "fileName": "/src/a.ts"
            }
          },
          {
            "name": "observable",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "11",
            "insertText": "import { observable$1 } from \"mobx\";",
            "replacementSpan": {
              "start": {
                "line": 1,
                "offset": 1
              },
              "end": {
                "line": 1,
                "offset": 7
              }
            },
            "isSnippet": true,
            "source": "mobx",
            "sourceDisplay": [
              {
                "text": "mobx",
                "kind": "text"
              }
            ],
            "isPackageJsonImport": true,
            "isImportStatementCompletion": true,
            "data": {
              "exportName": "observable",
              "exportMapKey": "observable|*|",
              "moduleSpecifier": "mobx",
              "fileName": "/node_modules/mobx/index.d.ts",
              "isPackageJsonImport": true
            }
          },
          {
            "name": "type",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          }
        ]
      },
      "responseRequired": true
    }
After request

Info 68   [00:02:08.000] mobxCache: {
 "modulePaths": [
  {
   "path": "/node_modules/mobx/index.d.ts",
   "isRedirect": false,
   "isInNodeModules": true
  }
 ],
 "moduleSpecifiers": [
  "mobx"
 ],
 "isBlockedByPackageJsonDependencies": false
}