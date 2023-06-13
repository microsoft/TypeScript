currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/a.js]
/**
 * Modify the parameter
 * @param {string} p1
 */
var foo = function (p1) { }
module.exports.foo = foo;
fo

//// [/tests/cases/fourslash/server/b.ts]
import a = require("./a");
a.fo


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/a.js"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/a.js :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/a.js SVC-1-0 "/**\n * Modify the parameter\n * @param {string} p1\n */\nvar foo = function (p1) { }\nmodule.exports.foo = foo;\nfo"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	a.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules: *new*
  {}
/tests/cases/fourslash/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/node_modules: *new*
  {}
/tests/cases/fourslash/server/node_modules/@types: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 1,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/a.js","line":7,"offset":3},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionInfo",
     "request_seq": 2,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": true,
      "isMemberCompletion": false,
      "isNewIdentifierLocation": false,
      "optionalReplacementSpan": {
       "start": {
        "line": 7,
        "offset": 1
       },
       "end": {
        "line": 7,
        "offset": 3
       }
      },
      "entries": [
       {
        "name": "foo",
        "kind": "var",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "module",
        "kind": "var",
        "kindModifiers": "",
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
        "name": "exports",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "p1",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
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
    {"seq":3,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/a.js","line":7,"offset":3,"entryNames":[{"name":"foo"}]},"command":"completionEntryDetails-full"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionEntryDetails-full",
     "request_seq": 3,
     "success": true,
     "body": [
      {
       "name": "foo",
       "kindModifiers": "",
       "kind": "var",
       "displayParts": [
        {
         "text": "var",
         "kind": "keyword"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "foo",
         "kind": "localName"
        },
        {
         "text": ":",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "(",
         "kind": "punctuation"
        },
        {
         "text": "p1",
         "kind": "parameterName"
        },
        {
         "text": ":",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "string",
         "kind": "keyword"
        },
        {
         "text": ")",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "=>",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "void",
         "kind": "keyword"
        }
       ],
       "documentation": [
        {
         "text": "Modify the parameter",
         "kind": "text"
        }
       ],
       "tags": [
        {
         "name": "param",
         "text": "p1"
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/b.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/b.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/a 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/a 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/a.js SVC-1-0 "/**\n * Modify the parameter\n * @param {string} p1\n */\nvar foo = function (p1) { }\nmodule.exports.foo = foo;\nfo"
	/tests/cases/fourslash/server/b.ts SVC-1-0 "import a = require(\"./a\");\na.fo"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	a.js
	  Imported via "./a" from file 'b.ts'
	b.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts
	/lib.decorators.d.ts
	/lib.decorators.legacy.d.ts
	/tests/cases/fourslash/server/a.js


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	a.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tests/cases/fourslash/server/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectories::
/tests/cases/fourslash/server: *new*
  {}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules:
  {} *new*
/tests/cases/fourslash/node_modules/@types:
  {} *new*
/tests/cases/fourslash/server/a: *new*
  {}
/tests/cases/fourslash/server/node_modules:
  {} *new*
/tests/cases/fourslash/server/node_modules/@types:
  {} *new*

watchedDirectoriesRecursive *deleted*::
/tests/cases/fourslash/node_modules:
  {}
/tests/cases/fourslash/node_modules/@types:
  {}
/tests/cases/fourslash/server/node_modules:
  {}
/tests/cases/fourslash/server/node_modules/@types:
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 5,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/b.ts","line":2,"offset":5},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionInfo",
     "request_seq": 6,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": false,
      "optionalReplacementSpan": {
       "start": {
        "line": 2,
        "offset": 3
       },
       "end": {
        "line": 2,
        "offset": 5
       }
      },
      "entries": [
       {
        "name": "foo",
        "kind": "alias",
        "kindModifiers": "",
        "sortText": "11"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/b.ts","line":2,"offset":5,"entryNames":[{"name":"foo"}]},"command":"completionEntryDetails-full"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionEntryDetails-full",
     "request_seq": 7,
     "success": true,
     "body": [
      {
       "name": "foo",
       "kindModifiers": "",
       "kind": "alias",
       "displayParts": [
        {
         "text": "(",
         "kind": "punctuation"
        },
        {
         "text": "alias",
         "kind": "text"
        },
        {
         "text": ")",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "var",
         "kind": "keyword"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "foo",
         "kind": "aliasName"
        },
        {
         "text": ":",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "(",
         "kind": "punctuation"
        },
        {
         "text": "p1",
         "kind": "parameterName"
        },
        {
         "text": ":",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "string",
         "kind": "keyword"
        },
        {
         "text": ")",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "=>",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "void",
         "kind": "keyword"
        },
        {
         "text": "\n",
         "kind": "lineBreak"
        },
        {
         "text": "import",
         "kind": "keyword"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "a",
         "kind": "aliasName"
        },
        {
         "text": ".",
         "kind": "punctuation"
        },
        {
         "text": "foo",
         "kind": "aliasName"
        }
       ],
       "documentation": [
        {
         "text": "Modify the parameter",
         "kind": "text"
        }
       ],
       "tags": [
        {
         "name": "param",
         "text": "p1"
        }
       ]
      }
     ]
    }