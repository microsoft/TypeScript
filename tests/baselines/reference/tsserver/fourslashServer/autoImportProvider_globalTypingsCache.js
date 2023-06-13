currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts]
export class BrowserRouterFromDts {}

//// [/Library/Caches/typescript/node_modules/@types/react-router-dom/package.json]
{ "name": "@types/react-router-dom", "version": "16.8.4", "types": "index.d.ts" }

//// [/project/index.js]
BrowserRouter

//// [/project/node_modules/react-router-dom/BrowserRouter.js]
export const BrowserRouterFromJs = () => null;

//// [/project/node_modules/react-router-dom/index.js]
import "./BrowserRouter";
export {};

//// [/project/node_modules/react-router-dom/package.json]
{ "name": "react-router-dom", "version": "16.8.4", "main": "index.js" }

//// [/project/package.json]
{ "dependencies": { "react-router-dom": "*" } }

//// [/project/tsconfig.json]
{ "compilerOptions": { "module": "commonjs", "allowJs": true, "checkJs": true, "maxNodeModuleJsDepth": 2 }, "typeAcquisition": { "enable": true } }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/Library/Caches/typescript/node_modules/@types/react-router-dom/package.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /Library/Caches/typescript/node_modules/@types/react-router-dom
Info seq  [hh:mm:ss:mss] For info: /Library/Caches/typescript/node_modules/@types/react-router-dom/package.json :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/react-router-dom/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/react-router-dom/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/react-router-dom/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Library/Caches/typescript/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/Library/Caches/typescript/node_modules/@types/react-router-dom/package.json SVC-1-0 "{ \"name\": \"@types/react-router-dom\", \"version\": \"16.8.4\", \"types\": \"index.d.ts\" }"
	/Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts Text-1 "export class BrowserRouterFromDts {}"


	../../../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../../lib.d.ts'
	../../../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../../lib.d.ts'
	package.json
	  Root file specified for compilation
	index.d.ts
	  Entry point for implicit type library 'react-router-dom' with packageId '@types/react-router-dom/index.d.ts@16.8.4'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Library/Caches/typescript/node_modules/@types/react-router-dom/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/Library/Caches/typescript/node_modules/@types/jsconfig.json: *new*
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/react-router-dom/jsconfig.json: *new*
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/react-router-dom/package.json: *new*
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/react-router-dom/tsconfig.json: *new*
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/tsconfig.json: *new*
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/jsconfig.json: *new*
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/tsconfig.json: *new*
  {"pollingInterval":2000}
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/Library/Caches/typescript/node_modules: *new*
  {}
/Library/Caches/typescript/node_modules/@types: *new*
  {}
/Library/Caches/typescript/node_modules/@types/node_modules/@types: *new*
  {}
/Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules: *new*
  {}
/Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules/@types: *new*
  {}
/Library/Caches/typescript/node_modules/node_modules/@types: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/project/index.js"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/index.js :: Config file name: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/tsconfig.json 2000 undefined Project: /project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/project/tsconfig.json",
      "reason": "Creating possible configured project for /project/index.js to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /project/tsconfig.json : {
 "rootNames": [
  "/project/index.js"
 ],
 "options": {
  "module": 1,
  "allowJs": true,
  "checkJs": true,
  "maxNodeModuleJsDepth": 2,
  "configFilePath": "/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/project/index.js SVC-1-0 "BrowserRouter"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	index.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts Text-1 "export class BrowserRouterFromDts {}"


	../Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts
	  Root file specified for compilation

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
      "triggerFile": "/project/index.js",
      "configFile": "/project/tsconfig.json",
      "diagnostics": [
       {
        "text": "Cannot write file '/project/index.js' because it would overwrite input file.",
        "code": 5055,
        "category": "error"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Library/Caches/typescript/node_modules/@types/react-router-dom/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /project/index.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/tsconfig.json
After Request
watchedFiles::
/Library/Caches/typescript/node_modules/@types/jsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/react-router-dom/jsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/react-router-dom/package.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/react-router-dom/tsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/tsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/jsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/tsconfig.json:
  {"pollingInterval":2000}
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/project/package.json: *new*
  {"pollingInterval":250}
/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/Library/Caches/typescript/node_modules:
  {}
/Library/Caches/typescript/node_modules/@types:
  {}
/Library/Caches/typescript/node_modules/@types/node_modules/@types:
  {}
/Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules:
  {}
/Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules/@types:
  {}
/Library/Caches/typescript/node_modules/node_modules/@types:
  {}
/project: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"preferences":{"allowIncompleteCompletions":true,"includeCompletionsForModuleExports":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 2,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/project/index.js","line":1,"offset":14},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /library/caches/typescript/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /library/caches/typescript/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
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
      "flags": 9,
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
        "offset": 14
       }
      },
      "entries": [
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
        "name": "Boolean",
        "kind": "var",
        "kindModifiers": "declare",
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
        "name": "DataView",
        "kind": "var",
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
        "name": "debugger",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "decodeURI",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "decodeURIComponent",
        "kind": "function",
        "kindModifiers": "declare",
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
        "name": "encodeURI",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "encodeURIComponent",
        "kind": "function",
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
        "name": "eval",
        "kind": "function",
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
        "name": "Float32Array",
        "kind": "var",
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
        "name": "Function",
        "kind": "var",
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
        "name": "if",
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
        "name": "Infinity",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "instanceof",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "Int16Array",
        "kind": "var",
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
        "name": "Int8Array",
        "kind": "var",
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
        "name": "isFinite",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "isNaN",
        "kind": "function",
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
        "name": "let",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "Math",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "NaN",
        "kind": "var",
        "kindModifiers": "declare",
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
        "name": "Number",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "Object",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "package",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "parseFloat",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "parseInt",
        "kind": "function",
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
        "name": "ReferenceError",
        "kind": "var",
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
        "name": "String",
        "kind": "var",
        "kindModifiers": "declare",
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
        "name": "SyntaxError",
        "kind": "var",
        "kindModifiers": "declare",
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
        "name": "TypeError",
        "kind": "var",
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
        "name": "Uint16Array",
        "kind": "var",
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
        "name": "Uint8Array",
        "kind": "var",
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
        "name": "undefined",
        "kind": "var",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "URIError",
        "kind": "var",
        "kindModifiers": "declare",
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
        "name": "BrowserRouterFromDts",
        "kind": "class",
        "kindModifiers": "export,declare",
        "sortText": "16",
        "hasAction": true,
        "source": "react-router-dom",
        "sourceDisplay": [
         {
          "text": "react-router-dom",
          "kind": "text"
         }
        ],
        "isPackageJsonImport": true,
        "data": {
         "exportName": "BrowserRouterFromDts",
         "exportMapKey": "BrowserRouterFromDts|*|",
         "moduleSpecifier": "react-router-dom",
         "fileName": "/Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts",
         "isPackageJsonImport": true
        }
       },
       {
        "name": "escape",
        "kind": "function",
        "kindModifiers": "deprecated,declare",
        "sortText": "z15"
       },
       {
        "name": "unescape",
        "kind": "function",
        "kindModifiers": "deprecated,declare",
        "sortText": "z15"
       }
      ]
     }
    }
After Request
watchedFiles::
/Library/Caches/typescript/node_modules/@types/jsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/react-router-dom/jsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/react-router-dom/package.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/react-router-dom/tsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/@types/tsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/jsconfig.json:
  {"pollingInterval":2000}
/Library/Caches/typescript/node_modules/tsconfig.json:
  {"pollingInterval":2000}
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/project/package.json:
  {"pollingInterval":250}
/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/Library/Caches/typescript/node_modules:
  {}
/Library/Caches/typescript/node_modules/@types:
  {}
/Library/Caches/typescript/node_modules/@types/node_modules/@types:
  {}
/Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules:
  {}
/Library/Caches/typescript/node_modules/@types/react-router-dom/node_modules/@types:
  {}
/Library/Caches/typescript/node_modules/node_modules/@types:
  {}
/library/caches/typescript/node_modules: *new*
  {}
/project:
  {}
