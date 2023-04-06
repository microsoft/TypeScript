currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:27.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/node_modules/memfs/package.json]
{ "name": "memfs", "version": "1.0.0", "types": "lib/index.d.ts" }

//// [/node_modules/memfs/lib/index.d.ts]
/// <reference types="node" />
export declare class Volume {}

//// [/node_modules/@types/node/package.json]
{ "name": "@types/node", "version": "1.0.0" }

//// [/node_modules/@types/node/index.d.ts]
export declare class Stats {}

//// [/package.json]
{ "dependencies": { "memfs": "*" }, "devDependencies": { "@types/node": "*" } }

//// [/tsconfig.json]
{ "compilerOptions": { "types": ["node"] }

//// [/index.ts]
export {};


Info 1    [00:00:28.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:29.000] Search path: /
Info 3    [00:00:30.000] For info: /index.ts :: Config file name: /tsconfig.json
Info 4    [00:00:31.000] Creating configuration project /tsconfig.json
Info 5    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:33.000] Config: /tsconfig.json : {
 "rootNames": [
  "/index.ts"
 ],
 "options": {
  "types": [
   "node"
  ],
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:36.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 10   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 11   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 12   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /node_modules/@types/node/package.json 2000 undefined Project: /tsconfig.json WatchType: File location affecting resolution
Info 13   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 14   [00:00:41.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:42.000] Project '/tsconfig.json' (Configured)
Info 16   [00:00:43.000] 	Files (2)
	/index.ts SVC-1-0 "export {};"
	/node_modules/@types/node/index.d.ts Text-1 "export declare class Stats {}"


	index.ts
	  Matched by default include pattern '**/*'
	node_modules/@types/node/index.d.ts
	  Entry point of type library 'node' specified in compilerOptions with packageId '@types/node/index.d.ts@1.0.0'

Info 17   [00:00:44.000] -----------------------------------------------
Info 18   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 19   [00:00:46.000] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info 20   [00:00:47.000] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info 21   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /node_modules/@types/node/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info 22   [00:00:49.000] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:50.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 24   [00:00:51.000] 	Files (2)
	/node_modules/@types/node/index.d.ts Text-1 "export declare class Stats {}"
	/node_modules/memfs/lib/index.d.ts Text-1 "/// <reference types=\"node\" />\nexport declare class Volume {}"


	node_modules/@types/node/index.d.ts
	  Type library referenced via 'node' from file 'node_modules/memfs/lib/index.d.ts' with packageId '@types/node/index.d.ts@1.0.0'
	node_modules/memfs/lib/index.d.ts
	  Root file specified for compilation

Info 25   [00:00:52.000] -----------------------------------------------
Info 26   [00:00:53.000] Project '/tsconfig.json' (Configured)
Info 26   [00:00:54.000] 	Files (2)

Info 26   [00:00:55.000] -----------------------------------------------
Info 26   [00:00:56.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 26   [00:00:57.000] 	Files (2)

Info 26   [00:00:58.000] -----------------------------------------------
Info 26   [00:00:59.000] Open files: 
Info 26   [00:01:00.000] 	FileName: /index.ts ProjectRootPath: undefined
Info 26   [00:01:01.000] 		Projects: /tsconfig.json
Info 26   [00:01:02.000] response:
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
/node_modules/@types/node/package.json: *new*
  {}
/package.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}
/node_modules: *new*
  {}

Before request

Info 27   [00:01:03.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/index.ts",
        "line": 0,
        "offset": 0,
        "includeExternalModuleExports": true
      },
      "seq": 2,
      "type": "request"
    }
Info 28   [00:01:04.000] getCompletionData: Get current token: *
Info 29   [00:01:05.000] getCompletionData: Is inside comment: *
Info 30   [00:01:06.000] getCompletionData: Get previous token: *
Info 31   [00:01:07.000] getExportInfoMap: cache miss or empty; calculating new results
Info 32   [00:01:08.000] forEachExternalModuleToImportFrom autoImportProvider: *
Info 33   [00:01:09.000] getExportInfoMap: done in * ms
Info 34   [00:01:10.000] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 2 from cache
Info 35   [00:01:11.000] collectAutoImports: response is incomplete
Info 36   [00:01:12.000] collectAutoImports: *
Info 37   [00:01:13.000] getCompletionData: Semantic work: *
Info 38   [00:01:14.000] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info 39   [00:01:15.000] response:
    {
      "response": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
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
            "name": "Stats",
            "kind": "class",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "hasAction": true,
            "source": "/node_modules/@types/node/index",
            "data": {
              "exportName": "Stats",
              "exportMapKey": "Stats|*|",
              "fileName": "/node_modules/@types/node/index.d.ts"
            }
          },
          {
            "name": "Volume",
            "kind": "class",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "hasAction": true,
            "source": "/node_modules/memfs/lib/index",
            "isPackageJsonImport": true,
            "data": {
              "exportName": "Volume",
              "exportMapKey": "Volume|*|",
              "fileName": "/node_modules/memfs/lib/index.d.ts",
              "isPackageJsonImport": true
            }
          }
        ]
      },
      "responseRequired": true
    }
After request
