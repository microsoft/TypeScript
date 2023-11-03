currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/jsdocCompletion_typedef.js]
/**
 * @typedef {string | number} T.NumberLike
 * @typedef {{age: number}} T.People
 * @typedef {string | number} T.O.Q.NumberLike
 * @type {T.NumberLike}
 */
var x; x.;
/** @type {T.O.Q.NumberLike} */
var x1; x1.;
/** @type {T.People} */
var x1; x1.;


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsdocCompletion_typedef.js"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/jsdocCompletion_typedef.js :: No config files found.
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
	/tests/cases/fourslash/server/jsdocCompletion_typedef.js SVC-1-0 "/**\n * @typedef {string | number} T.NumberLike\n * @typedef {{age: number}} T.People\n * @typedef {string | number} T.O.Q.NumberLike\n * @type {T.NumberLike}\n */\nvar x; x.;\n/** @type {T.O.Q.NumberLike} */\nvar x1; x1.;\n/** @type {T.People} */\nvar x1; x1.;"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	jsdocCompletion_typedef.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/jsdocCompletion_typedef.js ProjectRootPath: undefined
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
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsdocCompletion_typedef.js",
        "line": 7,
        "offset": 10
      },
      "command": "completionInfo"
    }
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
        "isGlobalCompletion": false,
        "isMemberCompletion": true,
        "isNewIdentifierLocation": false,
        "entries": [
          {
            "name": "charAt",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "charCodeAt",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "concat",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "indexOf",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "lastIndexOf",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "length",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "localeCompare",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "match",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "replace",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "search",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "slice",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "split",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "substring",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toExponential",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toFixed",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLocaleLowerCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLocaleString",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLocaleUpperCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLowerCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toPrecision",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toString",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toUpperCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "trim",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "valueOf",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "age",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "NumberLike",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "O",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "People",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "Q",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "T",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "x",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "x1",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "substr",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 3,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsdocCompletion_typedef.js",
        "line": 11,
        "offset": 12
      },
      "command": "completionInfo"
    }
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
      "request_seq": 4,
      "success": true,
      "body": {
        "flags": 0,
        "isGlobalCompletion": false,
        "isMemberCompletion": true,
        "isNewIdentifierLocation": false,
        "entries": [
          {
            "name": "charAt",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "charCodeAt",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "concat",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "indexOf",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "lastIndexOf",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "length",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "localeCompare",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "match",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "replace",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "search",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "slice",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "split",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "substring",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toExponential",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toFixed",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLocaleLowerCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLocaleString",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLocaleUpperCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLowerCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toPrecision",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toString",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toUpperCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "trim",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "valueOf",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "age",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "NumberLike",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "O",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "People",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "Q",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "T",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "x",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "x1",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "substr",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 5,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsdocCompletion_typedef.js",
        "line": 9,
        "offset": 12
      },
      "command": "completionInfo"
    }
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
        "entries": [
          {
            "name": "charAt",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "charCodeAt",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "concat",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "indexOf",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "lastIndexOf",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "length",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "localeCompare",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "match",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "replace",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "search",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "slice",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "split",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "substring",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toExponential",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toFixed",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLocaleLowerCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLocaleString",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLocaleUpperCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toLowerCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toPrecision",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toString",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "toUpperCase",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "trim",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "valueOf",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "age",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "NumberLike",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "O",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "People",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "Q",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "T",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "x",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "x1",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18"
          },
          {
            "name": "substr",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          }
        ]
      }
    }