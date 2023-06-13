currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/common-dependency/index.d.ts]
export declare class CommonDependency {}

//// [/node_modules/common-dependency/package.json]
{ "name": "common-dependency" }

//// [/node_modules/package-dependency/index.d.ts]
export declare class PackageDependency

//// [/node_modules/package-dependency/package.json]
{ "name": "package-dependency" }

//// [/package.json]
{ "private": true, "dependencies": { "common-dependency": "*" } }

//// [/packages/a/index.ts]


//// [/packages/a/package.json]
{ "peerDependencies": { "package-dependency": "*" } }

//// [/packages/a/tsconfig.json]
{ "compilerOptions": { "target": "esnext", "composite": true } }

//// [/tsconfig.json]
{ "files": [], "references": [{ "path": "packages/a" }] }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/node_modules/common-dependency/package.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /node_modules/common-dependency
Info seq  [hh:mm:ss:mss] For info: /node_modules/common-dependency/package.json :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/common-dependency/package.json SVC-1-0 "{ \"name\": \"common-dependency\" }"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/common-dependency/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}

Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/packages/a/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /packages/a
Info seq  [hh:mm:ss:mss] For info: /packages/a/index.ts :: Config file name: /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/a/tsconfig.json 2000 undefined Project: /packages/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/packages/a/tsconfig.json",
      "reason": "Creating possible configured project for /packages/a/index.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /packages/a/tsconfig.json : {
 "rootNames": [
  "/packages/a/index.ts"
 ],
 "options": {
  "target": 99,
  "composite": true,
  "configFilePath": "/packages/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.esnext.full.d.ts 500 undefined Project: /packages/a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/packages/a/index.ts SVC-1-0 ""


	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/a/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 2 root files in 2 dependencies in * ms
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/package-dependency/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/common-dependency/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/node_modules/package-dependency/index.d.ts Text-1 "export declare class PackageDependency"
	/node_modules/common-dependency/index.d.ts Text-1 "export declare class CommonDependency {}"


	../../node_modules/package-dependency/index.d.ts
	  Root file specified for compilation
	../../node_modules/common-dependency/index.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/packages/a/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/packages/a/index.ts",
      "configFile": "/packages/a/tsconfig.json",
      "diagnostics": [
       {
        "text": "File '/lib.esnext.full.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'esnext'",
        "code": 6053,
        "category": "error",
        "relatedInformation": [
         {
          "span": {
           "start": {
            "line": 1,
            "offset": 34
           },
           "end": {
            "line": 1,
            "offset": 42
           },
           "file": "/packages/a/tsconfig.json"
          },
          "message": "File is default library for target specified here.",
          "category": "message",
          "code": 1426
         }
        ]
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
Info seq  [hh:mm:ss:mss] Search path: /packages/a
Info seq  [hh:mm:ss:mss] For info: /packages/a/tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/packages/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/common-dependency/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /packages/a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/a/tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/node_modules/common-dependency/index.d.ts: *new*
  {"pollingInterval":500}
/node_modules/package-dependency/index.d.ts: *new*
  {"pollingInterval":500}
/package.json: *new*
  {"pollingInterval":250}
/packages/a/package.json: *new*
  {"pollingInterval":250}
/packages/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/packages/a: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"preferences":{"includeCompletionsForModuleExports":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 2,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/packages/a/index.ts","line":1,"offset":1},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 2 from cache
Info seq  [hh:mm:ss:mss] collectAutoImports: response is incomplete
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
        "name": "CommonDependency",
        "kind": "class",
        "kindModifiers": "export,declare",
        "sortText": "16",
        "hasAction": true,
        "source": "/node_modules/common-dependency/index",
        "isPackageJsonImport": true,
        "data": {
         "exportName": "CommonDependency",
         "exportMapKey": "CommonDependency|*|",
         "fileName": "/node_modules/common-dependency/index.d.ts",
         "isPackageJsonImport": true
        }
       },
       {
        "name": "PackageDependency",
        "kind": "class",
        "kindModifiers": "export,declare",
        "sortText": "16",
        "hasAction": true,
        "source": "/node_modules/package-dependency/index",
        "isPackageJsonImport": true,
        "data": {
         "exportName": "PackageDependency",
         "exportMapKey": "PackageDependency|*|",
         "fileName": "/node_modules/package-dependency/index.d.ts",
         "isPackageJsonImport": true
        }
       }
      ]
     }
    }