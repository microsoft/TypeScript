currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.ts]
type A = { name: string }

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/fp-ts/index.d.ts]
export * as string from "./lib/string";

//// [/node_modules/fp-ts/lib/string.d.ts]
export declare const fromString: (s: string) => string;
export type SafeString = string;

//// [/node_modules/fp-ts/package.json]
{ "name": "fp-ts", "version": "0.10.4" }

//// [/package.json]
{ "dependencies": { "fp-ts": "^0.10.4" } }

//// [/tsconfig.json]
{ "compilerOptions": { "module": "commonjs" } }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/node_modules/fp-ts/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /node_modules/fp-ts/package.json ProjectRootPath: undefined:: Result: undefined
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
	/node_modules/fp-ts/package.json SVC-1-0 "{ \"name\": \"fp-ts\", \"version\": \"0.10.4\" }"


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
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/fp-ts/package.json ProjectRootPath: undefined
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

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
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
/node_modules/fp-ts/package.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /index.ts ProjectRootPath: undefined:: Result: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tsconfig.json",
        "reason": "Creating possible configured project for /index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/index.ts",
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/index.ts SVC-1-0 "type A = { name: string }"
	/lib.d.ts Text-1 lib.d.ts-Text


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'
	lib.d.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/fp-ts/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/fp-ts/lib/string.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/fp-ts/lib/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/node_modules/fp-ts/lib/string.d.ts Text-1 "export declare const fromString: (s: string) => string;\nexport type SafeString = string;"
	/node_modules/fp-ts/index.d.ts Text-1 "export * as string from \"./lib/string\";"


	node_modules/fp-ts/lib/string.d.ts
	  Imported via "./lib/string" from file 'node_modules/fp-ts/index.d.ts' with packageId 'fp-ts/lib/string.d.ts@0.10.4'
	node_modules/fp-ts/index.d.ts
	  Root file specified for compilation

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
        "triggerFile": "/index.ts",
        "configFile": "/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/fp-ts/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
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
/node_modules/fp-ts/index.d.ts: *new*
  {"pollingInterval":500}
/node_modules/fp-ts/lib/package.json: *new*
  {"pollingInterval":2000}
/node_modules/fp-ts/lib/string.d.ts: *new*
  {"pollingInterval":500}
/package.json: *new*
  {"pollingInterval":250}
/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
: *new*
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /tsconfig.json *new*
/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /tsconfig.json *new*
/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /tsconfig.json *new*
/node_modules/fp-ts/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/node_modules/fp-ts/lib/string.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/node_modules/fp-ts/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "preferences": {
          "includeCompletionsForModuleExports": true,
          "allowIncompleteCompletions": true
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
After Request
Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "line": 1,
        "offset": 24
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 2 module specifiers, plus 0 ambient and 0 from cache
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
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": {
        "flags": 9,
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "entries": [
          {
            "name": "A",
            "kind": "type",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "any",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBuffer",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBufferConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBufferLike",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBufferTypes",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBufferView",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayLike",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "asserts",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Awaited",
            "kind": "type",
            "kindModifiers": "declare",
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
            "name": "Boolean",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "BooleanConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "CallableFunction",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Capitalize",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassAccessorDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassAccessorDecoratorResult",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassAccessorDecoratorTarget",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassDecorator",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassFieldDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassGetterDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassMemberDecoratorContext",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassMethodDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassSetterDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ConcatArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ConstructorParameters",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DataView",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DataViewConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Date",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DateConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DecoratorContext",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DecoratorMetadata",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DecoratorMetadataObject",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Error",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "EvalError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "EvalErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Exclude",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Extract",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "false",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Float32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Float32ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Float64Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Float64ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Function",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "FunctionConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "globalThis",
            "kind": "module",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "IArguments",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ImportAttributes",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ImportCallOptions",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ImportMeta",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "infer",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "InstanceType",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int8Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int8ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int16Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int16ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int32ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Intl",
            "kind": "module",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "JSON",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "keyof",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Lowercase",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Math",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "MethodDecorator",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "never",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "NewableFunction",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "NoInfer",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "NonNullable",
            "kind": "type",
            "kindModifiers": "declare",
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
            "name": "Number",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "NumberConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "object",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Object",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ObjectConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Omit",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "OmitThisParameter",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ParameterDecorator",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Parameters",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Partial",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Pick",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Promise",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PromiseConstructorLike",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PromiseLike",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PropertyDecorator",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PropertyDescriptor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PropertyDescriptorMap",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PropertyKey",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RangeError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RangeErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "readonly",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Readonly",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ReadonlyArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Record",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ReferenceError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ReferenceErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RegExp",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RegExpConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RegExpExecArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RegExpMatchArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Required",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ReturnType",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "string",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "String",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "StringConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "symbol",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Symbol",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "SyntaxError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "SyntaxErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "TemplateStringsArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ThisParameterType",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ThisType",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "true",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "TypedPropertyDescriptor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "TypeError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "TypeErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "typeof",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Uint8Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint8ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint8ClampedArray",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint8ClampedArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint16Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint16ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint32ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uncapitalize",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "undefined",
            "kind": "keyword",
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
            "name": "Uppercase",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "URIError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "URIErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "void",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "WeakKey",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "WeakKeyTypes",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "SafeString",
            "kind": "type",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "fp-ts/lib/string",
            "hasAction": true,
            "sourceDisplay": [
              {
                "text": "fp-ts/lib/string",
                "kind": "text"
              }
            ],
            "isPackageJsonImport": true,
            "data": {
              "exportName": "SafeString",
              "exportMapKey": "10 * SafeString ",
              "moduleSpecifier": "fp-ts/lib/string",
              "fileName": "/node_modules/fp-ts/lib/string.d.ts",
              "isPackageJsonImport": true
            }
          },
          {
            "name": "string",
            "kind": "alias",
            "kindModifiers": "declare",
            "sortText": "16",
            "source": "fp-ts",
            "hasAction": true,
            "sourceDisplay": [
              {
                "text": "fp-ts",
                "kind": "text"
              }
            ],
            "isPackageJsonImport": true,
            "data": {
              "exportName": "string",
              "exportMapKey": "6 * string ",
              "moduleSpecifier": "fp-ts",
              "fileName": "/node_modules/fp-ts/index.d.ts",
              "isPackageJsonImport": true
            }
          },
          {
            "name": "ImportAssertions",
            "kind": "interface",
            "kindModifiers": "deprecated,declare",
            "sortText": "z15"
          }
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
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
/node_modules/fp-ts/index.d.ts:
  {"pollingInterval":500}
/node_modules/fp-ts/lib/package.json:
  {"pollingInterval":2000}
/node_modules/fp-ts/lib/string.d.ts:
  {"pollingInterval":500}
/package.json:
  {"pollingInterval":250}
/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
:
  {}
/node_modules: *new*
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
