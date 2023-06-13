currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.ts]


//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tsconfig.json]
{ "compilerOptions": { "module": "esnext" } }

//// [/undefined.ts]
export = undefined;

//// [/undefinedAlias.ts]
const x = undefined;
export = x;


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
  "/index.ts",
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts",
  "/undefined.ts",
  "/undefinedAlias.ts"
 ],
 "options": {
  "module": 99,
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /undefined.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /undefinedAlias.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/index.ts Text-1 ""
	/lib.d.ts Text-1 lib.d.ts-Text
	/undefined.ts Text-1 "export = undefined;"
	/undefinedAlias.ts Text-1 "const x = undefined;\nexport = x;"


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
	undefined.ts
	  Matched by default include pattern '**/*'
	undefinedAlias.ts
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
	/tsconfig.json SVC-1-0 "{ \"compilerOptions\": { \"module\": \"esnext\" } }"


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
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/index.ts: *new*
  {"pollingInterval":500}
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tsconfig.json: *new*
  {"pollingInterval":2000}
/undefined.ts: *new*
  {"pollingInterval":500}
/undefinedAlias.ts: *new*
  {"pollingInterval":500}

watchedDirectoriesRecursive::
: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /index.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
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
/undefined.ts:
  {"pollingInterval":500}
/undefinedAlias.ts:
  {"pollingInterval":500}

watchedFiles *deleted*::
/index.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
:
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"preferences":{"includeCompletionsForModuleExports":true,"includeInsertTextCompletions":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 2,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/index.ts","line":1,"offset":1},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 1 from cache
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
        "name": "x",
        "kind": "const",
        "kindModifiers": "",
        "sortText": "16",
        "hasAction": true,
        "source": "/undefinedAlias",
        "data": {
         "exportName": "export=",
         "exportMapKey": "x|*|",
         "fileName": "/undefinedAlias.ts"
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
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"preferences":{"includeCompletionsForModuleExports":true,"includeInsertTextCompletions":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 4,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/index.ts","line":1,"offset":1},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache hit
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 1 from cache
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
        "name": "x",
        "kind": "const",
        "kindModifiers": "",
        "sortText": "16",
        "hasAction": true,
        "source": "/undefinedAlias",
        "data": {
         "exportName": "export=",
         "exportMapKey": "x|*|",
         "fileName": "/undefinedAlias.ts"
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