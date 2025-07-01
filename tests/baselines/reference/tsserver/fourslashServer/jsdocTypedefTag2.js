Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
//// [/home/src/tslibs/TS/Lib/lib.d.ts]
lib.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/jsdocCompletion_typedef.js]
/**
 * @typedef {Object} A.B.MyType
 * @property {string} yes
 */
function foo() {}
/**
 * @param {A.B.MyType} my2
 */
function a(my2) {
    my2.yes.
}
/**
 * @param {MyType} my2
 */
function b(my2) {
    my2.yes.
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsdocCompletion_typedef.js"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/jsdocCompletion_typedef.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/jsdocCompletion_typedef.js SVC-1-0 "/**\n * @typedef {Object} A.B.MyType\n * @property {string} yes\n */\nfunction foo() {}\n/**\n * @param {A.B.MyType} my2\n */\nfunction a(my2) {\n    my2.yes.\n}\n/**\n * @param {MyType} my2\n */\nfunction b(my2) {\n    my2.yes.\n}"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	jsdocCompletion_typedef.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/jsdocCompletion_typedef.js ProjectRootPath: undefined
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
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
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

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tests/cases/fourslash/server/jsdocCompletion_typedef.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

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
        "line": 10,
        "offset": 13
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
            "name": "toLocaleLowerCase",
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
            "name": "a",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "A",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "b",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "B",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "foo",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "my2",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "MyType",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "yes",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "substr",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
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
        "line": 16,
        "offset": 13
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
            "name": "a",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "A",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "b",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "B",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "foo",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "my2",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "MyType",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "yes",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          }
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
        ]
      }
    }