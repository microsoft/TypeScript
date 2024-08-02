currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/a.ts]
import 'react';
declare module 'react' {
  export function useBlah(): void;  
}
0;
use

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/@types/react/index.d.ts]
export function useState(): void;

//// [/tsconfig.json]
{ "compilerOptions": { "module": "esnext" } }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tsconfig.json ProjectRootPath: undefined:: Result: /tsconfig.json
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
  "/a.ts",
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts"
 ],
 "options": {
  "module": 99,
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/react/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/react/package.json 2000 undefined Project: /tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/@types/react/index.d.ts Text-1 "export function useState(): void;"
	/a.ts Text-1 "import 'react';\ndeclare module 'react' {\n  export function useBlah(): void;  \n}\n0;\nuse"
	/lib.d.ts Text-1 lib.d.ts-Text


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	node_modules/@types/react/index.d.ts
	  Imported via 'react' from file 'a.ts'
	  Entry point for implicit type library 'react'
	a.ts
	  Matched by default include pattern '**/*'
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
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/react/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tsconfig.json SVC-1-0 "{ \"compilerOptions\": { \"module\": \"esnext\" } }"
	/node_modules/@types/react/index.d.ts Text-1 "export function useState(): void;"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	tsconfig.json
	  Root file specified for compilation
	node_modules/@types/react/index.d.ts
	  Entry point for implicit type library 'react'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
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
/a.ts: *new*
  {"pollingInterval":500}
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types/react/index.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types/react/package.json: *new*
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/a.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/lib.d.ts *new*
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts *new*
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a.ts ProjectRootPath: undefined:: Result: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true
    }
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/node_modules/@types/react/index.d.ts:
  {"pollingInterval":500}
/node_modules/@types/react/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/a.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*

ScriptInfos::
/a.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
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
          "includeInsertTextCompletions": true
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
        "file": "/a.ts",
        "line": 6,
        "offset": 4
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
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
        "optionalReplacementSpan": {
          "start": {
            "line": 6,
            "offset": 1
          },
          "end": {
            "line": 6,
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
            "name": "declare",
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
            "name": "enum",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "Int8Array",
            "kind": "var",
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
            "name": "Int32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "interface",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "Math",
            "kind": "var",
            "kindModifiers": "declare",
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
            "name": "NaN",
            "kind": "var",
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
            "name": "Number",
            "kind": "var",
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
            "name": "readonly",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "type",
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
            "name": "URIError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "using",
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
            "name": "useBlah",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "/node_modules/@types/react/index",
            "hasAction": true,
            "data": {
              "exportName": "useBlah",
              "exportMapKey": "7 * useBlah ",
              "fileName": "/node_modules/@types/react/index.d.ts"
            }
          },
          {
            "name": "useState",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "/node_modules/@types/react/index",
            "hasAction": true,
            "data": {
              "exportName": "useState",
              "exportMapKey": "8 * useState ",
              "fileName": "/node_modules/@types/react/index.d.ts"
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
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "preferences": {
          "includeCompletionsForModuleExports": true,
          "includeInsertTextCompletions": true
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 4,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 6,
        "offset": 4
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache hit
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
      "request_seq": 5,
      "success": true,
      "body": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "optionalReplacementSpan": {
          "start": {
            "line": 6,
            "offset": 1
          },
          "end": {
            "line": 6,
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
            "name": "declare",
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
            "name": "enum",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "Int8Array",
            "kind": "var",
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
            "name": "Int32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "interface",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "Math",
            "kind": "var",
            "kindModifiers": "declare",
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
            "name": "NaN",
            "kind": "var",
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
            "name": "Number",
            "kind": "var",
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
            "name": "readonly",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "type",
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
            "name": "URIError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "using",
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
            "name": "useBlah",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "/node_modules/@types/react/index",
            "hasAction": true,
            "data": {
              "exportName": "useBlah",
              "exportMapKey": "7 * useBlah ",
              "fileName": "/node_modules/@types/react/index.d.ts"
            }
          },
          {
            "name": "useState",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "/node_modules/@types/react/index",
            "hasAction": true,
            "data": {
              "exportName": "useState",
              "exportMapKey": "8 * useState ",
              "fileName": "/node_modules/@types/react/index.d.ts"
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
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 6,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 1,
        "endLine": 3,
        "endOffset": 37,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 7,
      "success": true
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-1 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 1,
        "endLine": 3,
        "endOffset": 1,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 8,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-2 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 2,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 9,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 2,
        "endLine": 3,
        "endOffset": 2,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 10,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-3 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 3,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 11,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 12,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 3,
        "endLine": 3,
        "endOffset": 3,
        "insertString": "e"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 12,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-4 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 13,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 4,
        "key": "e"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 13,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 14,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 4,
        "endLine": 3,
        "endOffset": 4,
        "insertString": "x"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 14,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-5 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 15,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 5,
        "key": "x"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 15,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 16,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 5,
        "endLine": 3,
        "endOffset": 5,
        "insertString": "p"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 16,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-6 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 17,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 6,
        "key": "p"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 17,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 18,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 6,
        "endLine": 3,
        "endOffset": 6,
        "insertString": "o"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 18,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-7 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 19,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 7,
        "key": "o"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 19,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 20,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 7,
        "endLine": 3,
        "endOffset": 7,
        "insertString": "r"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 20,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-8 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 21,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 8,
        "key": "r"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 21,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 22,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 8,
        "endLine": 3,
        "endOffset": 8,
        "insertString": "t"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 22,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-9 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 23,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 9,
        "key": "t"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 23,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 24,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 9,
        "endLine": 3,
        "endOffset": 9,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 24,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-10 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 25,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 10,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 25,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 26,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 10,
        "endLine": 3,
        "endOffset": 10,
        "insertString": "f"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 26,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-11 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 27,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 11,
        "key": "f"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 27,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 28,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 11,
        "endLine": 3,
        "endOffset": 11,
        "insertString": "u"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 28,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-12 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 29,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 12,
        "key": "u"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 29,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 30,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 12,
        "endLine": 3,
        "endOffset": 12,
        "insertString": "n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 30,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-13 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 31,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 13,
        "key": "n"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 31,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 32,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 13,
        "endLine": 3,
        "endOffset": 13,
        "insertString": "c"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 32,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-14 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 33,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 14,
        "key": "c"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 33,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 34,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 14,
        "endLine": 3,
        "endOffset": 14,
        "insertString": "t"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 34,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-15 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 35,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 15,
        "key": "t"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 35,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 36,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 15,
        "endLine": 3,
        "endOffset": 15,
        "insertString": "i"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 36,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-16 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 37,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 16,
        "key": "i"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 37,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 38,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 16,
        "endLine": 3,
        "endOffset": 16,
        "insertString": "o"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 38,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-17 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 39,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 17,
        "key": "o"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 39,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 40,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 17,
        "endLine": 3,
        "endOffset": 17,
        "insertString": "n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 40,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-18 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 41,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 18,
        "key": "n"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 41,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 42,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 18,
        "endLine": 3,
        "endOffset": 18,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 42,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-19 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 43,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 19,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 43,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 44,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 19,
        "endLine": 3,
        "endOffset": 19,
        "insertString": "u"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 44,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-20 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 45,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 20,
        "key": "u"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 45,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 46,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 20,
        "endLine": 3,
        "endOffset": 20,
        "insertString": "s"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 46,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-21 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 47,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 21,
        "key": "s"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 47,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 48,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 21,
        "endLine": 3,
        "endOffset": 21,
        "insertString": "e"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 48,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-22 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 49,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 22,
        "key": "e"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 49,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 50,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 22,
        "endLine": 3,
        "endOffset": 22,
        "insertString": "Y"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 50,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-23 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 51,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 23,
        "key": "Y"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 51,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 52,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 23,
        "endLine": 3,
        "endOffset": 23,
        "insertString": "e"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 52,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-24 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 53,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 24,
        "key": "e"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 53,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 54,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 24,
        "endLine": 3,
        "endOffset": 24,
        "insertString": "s"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 54,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-25 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 55,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 25,
        "key": "s"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 55,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 56,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 25,
        "endLine": 3,
        "endOffset": 25,
        "insertString": "("
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 56,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-26 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 57,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 26,
        "key": "("
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 57,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 58,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 26,
        "endLine": 3,
        "endOffset": 26,
        "insertString": ")"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 58,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-27 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 59,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 27,
        "key": ")"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 59,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 60,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 27,
        "endLine": 3,
        "endOffset": 27,
        "insertString": ":"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 60,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-28 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 61,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 28,
        "key": ":"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 61,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 62,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 28,
        "endLine": 3,
        "endOffset": 28,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 62,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-29 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 63,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 29,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 63,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 64,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 29,
        "endLine": 3,
        "endOffset": 29,
        "insertString": "t"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 64,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-30 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 65,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 30,
        "key": "t"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 65,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 66,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 30,
        "endLine": 3,
        "endOffset": 30,
        "insertString": "r"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 66,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-31 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 67,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 31,
        "key": "r"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 67,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 68,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 31,
        "endLine": 3,
        "endOffset": 31,
        "insertString": "u"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 68,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-32 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 69,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 32,
        "key": "u"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 69,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 70,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 32,
        "endLine": 3,
        "endOffset": 32,
        "insertString": "e"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 70,
      "success": true
    }
After Request
ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-2-33 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/node_modules/@types/react/index.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 71,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 3,
        "offset": 33,
        "key": "e"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 71,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 72,
      "type": "request",
      "arguments": {
        "preferences": {
          "includeCompletionsForModuleExports": true,
          "includeInsertTextCompletions": true
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 72,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 73,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 6,
        "offset": 4
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/@types/react/index.d.ts Text-1 "export function useState(): void;"
	/a.ts SVC-2-33 "import 'react';\ndeclare module 'react' {\n  export function useYes(): true\n}\n0;\nuse"
	/lib.d.ts Text-1 lib.d.ts-Text

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
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
      "request_seq": 73,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "optionalReplacementSpan": {
          "start": {
            "line": 6,
            "offset": 1
          },
          "end": {
            "line": 6,
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
            "name": "declare",
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
            "name": "enum",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "Int8Array",
            "kind": "var",
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
            "name": "Int32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "interface",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "Math",
            "kind": "var",
            "kindModifiers": "declare",
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
            "name": "NaN",
            "kind": "var",
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
            "name": "Number",
            "kind": "var",
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
            "name": "readonly",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "type",
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
            "name": "URIError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "using",
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
            "name": "useState",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "/node_modules/@types/react/index",
            "hasAction": true,
            "data": {
              "exportName": "useState",
              "exportMapKey": "8 * useState ",
              "fileName": "/node_modules/@types/react/index.d.ts"
            }
          },
          {
            "name": "useYes",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "/node_modules/@types/react/index",
            "hasAction": true,
            "data": {
              "exportName": "useYes",
              "exportMapKey": "6 * useYes ",
              "fileName": "/node_modules/@types/react/index.d.ts"
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
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
        ]
      }
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 74,
      "type": "request",
      "arguments": {
        "preferences": {
          "includeCompletionsForModuleExports": true,
          "includeInsertTextCompletions": true
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 74,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 75,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "line": 6,
        "offset": 4
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache hit
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
      "request_seq": 75,
      "success": true,
      "body": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "optionalReplacementSpan": {
          "start": {
            "line": 6,
            "offset": 1
          },
          "end": {
            "line": 6,
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
            "name": "declare",
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
            "name": "enum",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "Int8Array",
            "kind": "var",
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
            "name": "Int32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "interface",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "Math",
            "kind": "var",
            "kindModifiers": "declare",
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
            "name": "NaN",
            "kind": "var",
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
            "name": "Number",
            "kind": "var",
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
            "name": "readonly",
            "kind": "keyword",
            "kindModifiers": "",
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
            "name": "type",
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
            "name": "URIError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "using",
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
            "name": "useState",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "/node_modules/@types/react/index",
            "hasAction": true,
            "data": {
              "exportName": "useState",
              "exportMapKey": "8 * useState ",
              "fileName": "/node_modules/@types/react/index.d.ts"
            }
          },
          {
            "name": "useYes",
            "kind": "function",
            "kindModifiers": "export,declare",
            "sortText": "16",
            "source": "/node_modules/@types/react/index",
            "hasAction": true,
            "data": {
              "exportName": "useYes",
              "exportMapKey": "6 * useYes ",
              "fileName": "/node_modules/@types/react/index.d.ts"
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
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
        ]
      }
    }