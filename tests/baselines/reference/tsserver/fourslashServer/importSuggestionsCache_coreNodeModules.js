currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/a.js]

readF

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/@types/node/index.d.ts]
declare module 'fs' {
  export function readFile(): void;
}
declare module 'util' {
  export function promisify(): void;
}

//// [/package.json]
{}

//// [/tsconfig.json]
{
  "compilerOptions": {
    "module": "esnext",
    "allowJs": true,
    "checkJs": true,
    "typeRoots": [
      "node_modules/@types"
    ]
  },
  "include": ["**/*"],
  "typeAcquisition": {
    "enable": true
  }
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
  "/a.js",
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts"
 ],
 "options": {
  "module": 99,
  "allowJs": true,
  "checkJs": true,
  "typeRoots": [
   "/node_modules/@types"
  ],
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/node/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types 1 undefined Project: /tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types 1 undefined Project: /tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/a.js Text-1 "\nreadF"
	/lib.d.ts Text-1 lib.d.ts-Text
	/node_modules/@types/node/index.d.ts Text-1 "declare module 'fs' {\n  export function readFile(): void;\n}\ndeclare module 'util' {\n  export function promisify(): void;\n}"


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by include pattern '**/*' in 'tsconfig.json'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by include pattern '**/*' in 'tsconfig.json'
	a.js
	  Matched by include pattern '**/*' in 'tsconfig.json'
	lib.d.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'
	node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'

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
      "diagnostics": [
       {
        "text": "Cannot write file '/a.js' because it would overwrite input file.",
        "code": 5055,
        "category": "error"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tsconfig.json SVC-1-0 "{\n  \"compilerOptions\": {\n    \"module\": \"esnext\",\n    \"allowJs\": true,\n    \"checkJs\": true,\n    \"typeRoots\": [\n      \"node_modules/@types\"\n    ]\n  },\n  \"include\": [\"**/*\"],\n  \"typeAcquisition\": {\n    \"enable\": true\n  }\n}"
	/node_modules/@types/node/index.d.ts Text-1 "declare module 'fs' {\n  export function readFile(): void;\n}\ndeclare module 'util' {\n  export function promisify(): void;\n}"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	tsconfig.json
	  Root file specified for compilation
	node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/a.js"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /a.js :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
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
    {"seq":3,"type":"request","arguments":{"file":"/a.js","line":2,"offset":6},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 0 from cache
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
      "flags": 1,
      "isGlobalCompletion": true,
      "isMemberCompletion": false,
      "isNewIdentifierLocation": false,
      "optionalReplacementSpan": {
       "start": {
        "line": 2,
        "offset": 1
       },
       "end": {
        "line": 2,
        "offset": 6
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
    {"seq":4,"type":"request","arguments":{"file":"/a.js"},"command":"open"}
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/a.js","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":""},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/a.js","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"i"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"file":"/a.js","line":1,"offset":2,"key":"i"},"command":"formatonkey"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "formatonkey",
     "request_seq": 7,
     "success": true,
     "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":8,"type":"request","arguments":{"file":"/a.js","line":1,"offset":2,"endLine":1,"endOffset":2,"insertString":"m"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":9,"type":"request","arguments":{"file":"/a.js","line":1,"offset":3,"key":"m"},"command":"formatonkey"}
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
    {"seq":10,"type":"request","arguments":{"file":"/a.js","line":1,"offset":3,"endLine":1,"endOffset":3,"insertString":"p"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":11,"type":"request","arguments":{"file":"/a.js","line":1,"offset":4,"key":"p"},"command":"formatonkey"}
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
    {"seq":12,"type":"request","arguments":{"file":"/a.js","line":1,"offset":4,"endLine":1,"endOffset":4,"insertString":"o"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":13,"type":"request","arguments":{"file":"/a.js","line":1,"offset":5,"key":"o"},"command":"formatonkey"}
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
    {"seq":14,"type":"request","arguments":{"file":"/a.js","line":1,"offset":5,"endLine":1,"endOffset":5,"insertString":"r"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":15,"type":"request","arguments":{"file":"/a.js","line":1,"offset":6,"key":"r"},"command":"formatonkey"}
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
    {"seq":16,"type":"request","arguments":{"file":"/a.js","line":1,"offset":6,"endLine":1,"endOffset":6,"insertString":"t"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":17,"type":"request","arguments":{"file":"/a.js","line":1,"offset":7,"key":"t"},"command":"formatonkey"}
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
    {"seq":18,"type":"request","arguments":{"file":"/a.js","line":1,"offset":7,"endLine":1,"endOffset":7,"insertString":" "},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":19,"type":"request","arguments":{"file":"/a.js","line":1,"offset":8,"key":" "},"command":"formatonkey"}
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
    {"seq":20,"type":"request","arguments":{"file":"/a.js","line":1,"offset":8,"endLine":1,"endOffset":8,"insertString":"{"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":21,"type":"request","arguments":{"file":"/a.js","line":1,"offset":9,"key":"{"},"command":"formatonkey"}
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
    {"seq":22,"type":"request","arguments":{"file":"/a.js","line":1,"offset":9,"endLine":1,"endOffset":9,"insertString":" "},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":23,"type":"request","arguments":{"file":"/a.js","line":1,"offset":10,"key":" "},"command":"formatonkey"}
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
    {"seq":24,"type":"request","arguments":{"file":"/a.js","line":1,"offset":10,"endLine":1,"endOffset":10,"insertString":"p"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":25,"type":"request","arguments":{"file":"/a.js","line":1,"offset":11,"key":"p"},"command":"formatonkey"}
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
    {"seq":26,"type":"request","arguments":{"file":"/a.js","line":1,"offset":11,"endLine":1,"endOffset":11,"insertString":"r"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":27,"type":"request","arguments":{"file":"/a.js","line":1,"offset":12,"key":"r"},"command":"formatonkey"}
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
    {"seq":28,"type":"request","arguments":{"file":"/a.js","line":1,"offset":12,"endLine":1,"endOffset":12,"insertString":"o"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":29,"type":"request","arguments":{"file":"/a.js","line":1,"offset":13,"key":"o"},"command":"formatonkey"}
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
    {"seq":30,"type":"request","arguments":{"file":"/a.js","line":1,"offset":13,"endLine":1,"endOffset":13,"insertString":"m"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":31,"type":"request","arguments":{"file":"/a.js","line":1,"offset":14,"key":"m"},"command":"formatonkey"}
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
    {"seq":32,"type":"request","arguments":{"file":"/a.js","line":1,"offset":14,"endLine":1,"endOffset":14,"insertString":"i"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":33,"type":"request","arguments":{"file":"/a.js","line":1,"offset":15,"key":"i"},"command":"formatonkey"}
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
    {"seq":34,"type":"request","arguments":{"file":"/a.js","line":1,"offset":15,"endLine":1,"endOffset":15,"insertString":"s"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":35,"type":"request","arguments":{"file":"/a.js","line":1,"offset":16,"key":"s"},"command":"formatonkey"}
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
    {"seq":36,"type":"request","arguments":{"file":"/a.js","line":1,"offset":16,"endLine":1,"endOffset":16,"insertString":"i"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":37,"type":"request","arguments":{"file":"/a.js","line":1,"offset":17,"key":"i"},"command":"formatonkey"}
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
    {"seq":38,"type":"request","arguments":{"file":"/a.js","line":1,"offset":17,"endLine":1,"endOffset":17,"insertString":"f"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":39,"type":"request","arguments":{"file":"/a.js","line":1,"offset":18,"key":"f"},"command":"formatonkey"}
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
    {"seq":40,"type":"request","arguments":{"file":"/a.js","line":1,"offset":18,"endLine":1,"endOffset":18,"insertString":"y"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":41,"type":"request","arguments":{"file":"/a.js","line":1,"offset":19,"key":"y"},"command":"formatonkey"}
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
    {"seq":42,"type":"request","arguments":{"file":"/a.js","line":1,"offset":19,"endLine":1,"endOffset":19,"insertString":" "},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":43,"type":"request","arguments":{"file":"/a.js","line":1,"offset":20,"key":" "},"command":"formatonkey"}
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
    {"seq":44,"type":"request","arguments":{"file":"/a.js","line":1,"offset":20,"endLine":1,"endOffset":20,"insertString":"}"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":45,"type":"request","arguments":{"file":"/a.js","line":1,"offset":21,"key":"}"},"command":"formatonkey"}
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
    {"seq":46,"type":"request","arguments":{"file":"/a.js","line":1,"offset":21,"endLine":1,"endOffset":21,"insertString":" "},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":47,"type":"request","arguments":{"file":"/a.js","line":1,"offset":22,"key":" "},"command":"formatonkey"}
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
    {"seq":48,"type":"request","arguments":{"file":"/a.js","line":1,"offset":22,"endLine":1,"endOffset":22,"insertString":"f"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":49,"type":"request","arguments":{"file":"/a.js","line":1,"offset":23,"key":"f"},"command":"formatonkey"}
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
    {"seq":50,"type":"request","arguments":{"file":"/a.js","line":1,"offset":23,"endLine":1,"endOffset":23,"insertString":"r"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":51,"type":"request","arguments":{"file":"/a.js","line":1,"offset":24,"key":"r"},"command":"formatonkey"}
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
    {"seq":52,"type":"request","arguments":{"file":"/a.js","line":1,"offset":24,"endLine":1,"endOffset":24,"insertString":"o"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":53,"type":"request","arguments":{"file":"/a.js","line":1,"offset":25,"key":"o"},"command":"formatonkey"}
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
    {"seq":54,"type":"request","arguments":{"file":"/a.js","line":1,"offset":25,"endLine":1,"endOffset":25,"insertString":"m"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":55,"type":"request","arguments":{"file":"/a.js","line":1,"offset":26,"key":"m"},"command":"formatonkey"}
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
    {"seq":56,"type":"request","arguments":{"file":"/a.js","line":1,"offset":26,"endLine":1,"endOffset":26,"insertString":" "},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":57,"type":"request","arguments":{"file":"/a.js","line":1,"offset":27,"key":" "},"command":"formatonkey"}
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
    {"seq":58,"type":"request","arguments":{"file":"/a.js","line":1,"offset":27,"endLine":1,"endOffset":27,"insertString":"'"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":59,"type":"request","arguments":{"file":"/a.js","line":1,"offset":28,"key":"'"},"command":"formatonkey"}
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
    {"seq":60,"type":"request","arguments":{"file":"/a.js","line":1,"offset":28,"endLine":1,"endOffset":28,"insertString":"u"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":61,"type":"request","arguments":{"file":"/a.js","line":1,"offset":29,"key":"u"},"command":"formatonkey"}
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
    {"seq":62,"type":"request","arguments":{"file":"/a.js","line":1,"offset":29,"endLine":1,"endOffset":29,"insertString":"t"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":63,"type":"request","arguments":{"file":"/a.js","line":1,"offset":30,"key":"t"},"command":"formatonkey"}
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
    {"seq":64,"type":"request","arguments":{"file":"/a.js","line":1,"offset":30,"endLine":1,"endOffset":30,"insertString":"i"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":65,"type":"request","arguments":{"file":"/a.js","line":1,"offset":31,"key":"i"},"command":"formatonkey"}
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
    {"seq":66,"type":"request","arguments":{"file":"/a.js","line":1,"offset":31,"endLine":1,"endOffset":31,"insertString":"l"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":67,"type":"request","arguments":{"file":"/a.js","line":1,"offset":32,"key":"l"},"command":"formatonkey"}
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
    {"seq":68,"type":"request","arguments":{"file":"/a.js","line":1,"offset":32,"endLine":1,"endOffset":32,"insertString":"'"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":69,"type":"request","arguments":{"file":"/a.js","line":1,"offset":33,"key":"'"},"command":"formatonkey"}
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
    {"seq":70,"type":"request","arguments":{"file":"/a.js","line":1,"offset":33,"endLine":1,"endOffset":33,"insertString":";"},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":71,"type":"request","arguments":{"file":"/a.js","line":1,"offset":34,"key":";"},"command":"formatonkey"}
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
    {"seq":72,"type":"request","arguments":{"preferences":{"includeCompletionsForModuleExports":true,"includeInsertTextCompletions":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 72,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":73,"type":"request","arguments":{"file":"/a.js","line":2,"offset":6},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/a.js SVC-2-34 "import { promisify } from 'util';\nreadF"
	/lib.d.ts Text-1 lib.d.ts-Text
	/node_modules/@types/node/index.d.ts Text-1 "declare module 'fs' {\n  export function readFile(): void;\n}\ndeclare module 'util' {\n  export function promisify(): void;\n}"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 1 ambient and 0 from cache
Info seq  [hh:mm:ss:mss] collectAutoImports: response is complete
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
        "line": 2,
        "offset": 1
       },
       "end": {
        "line": 2,
        "offset": 6
       }
      },
      "entries": [
       {
        "name": "promisify",
        "kind": "alias",
        "kindModifiers": "export,declare",
        "sortText": "11"
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
        "name": "readFile",
        "kind": "function",
        "kindModifiers": "export,declare",
        "sortText": "16",
        "hasAction": true,
        "source": "fs",
        "sourceDisplay": [
         {
          "text": "fs",
          "kind": "text"
         }
        ],
        "data": {
         "exportName": "readFile",
         "exportMapKey": "readFile|*|fs",
         "moduleSpecifier": "fs",
         "ambientModuleName": "fs"
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
    {"seq":74,"type":"request","arguments":{"file":"/a.js","line":1,"offset":1,"endLine":2,"endOffset":1,"insertString":""},"command":"change"}
Info seq  [hh:mm:ss:mss] request:
    {"seq":75,"type":"request","arguments":{"preferences":{"includeCompletionsForModuleExports":true,"includeInsertTextCompletions":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 75,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":76,"type":"request","arguments":{"file":"/a.js","line":1,"offset":6},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/a.js SVC-2-35 "readF"
	/lib.d.ts Text-1 lib.d.ts-Text
	/node_modules/@types/node/index.d.ts Text-1 "declare module 'fs' {\n  export function readFile(): void;\n}\ndeclare module 'util' {\n  export function promisify(): void;\n}"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 0 from cache
Info seq  [hh:mm:ss:mss] collectAutoImports: response is complete
Info seq  [hh:mm:ss:mss] collectAutoImports: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionInfo",
     "request_seq": 76,
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
        "line": 1,
        "offset": 1
       },
       "end": {
        "line": 1,
        "offset": 6
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