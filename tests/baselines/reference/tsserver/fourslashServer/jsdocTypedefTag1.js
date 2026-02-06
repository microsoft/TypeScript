Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "options": {
          "target": "es2025",
          "newLine": "crlf",
          "lib": [
            "es6"
          ],
          "skipDefaultLibCheck": true
        }
      },
      "command": "compilerOptionsForInferredProjects"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "compilerOptionsForInferredProjects",
      "request_seq": 0,
      "success": true,
      "body": true
    }
//// [/tests/cases/fourslash/server/jsdocCompletion_typedef.js]
/**
 * @typedef {Object} MyType
 * @property {string} yes
 */
function foo() { }
/**
 * @param {MyType} my
 */
function a(my) {
    my.yes.
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.core.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (14)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.d.ts Text-1 lib.es2015.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.core.d.ts Text-1 lib.es2015.core.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts Text-1 lib.es2015.collection.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts Text-1 lib.es2015.generator.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts Text-1 lib.es2015.iterable.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts Text-1 lib.es2015.promise.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts Text-1 lib.es2015.proxy.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts Text-1 lib.es2015.reflect.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts Text-1 lib.es2015.symbol.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts Text-1 lib.es2015.symbol.wellknown.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/jsdocCompletion_typedef.js SVC-1-0 "/**\n * @typedef {Object} MyType\n * @property {string} yes\n */\nfunction foo() { }\n/**\n * @param {MyType} my\n */\nfunction a(my) {\n    my.yes.\n}"


	../../../../home/src/tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts
	  Library 'lib.es2015.d.ts' specified in compilerOptions
	../../../../home/src/tslibs/TS/Lib/lib.es2015.core.d.ts
	  Library referenced via 'es2015.core' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts
	  Library referenced via 'es2015.collection' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts
	  Library referenced via 'es2015.generator' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts
	  Library referenced via 'es2015.iterable' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	  Library referenced via 'es2015.iterable' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts
	  Library referenced via 'es2015.promise' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts
	  Library referenced via 'es2015.proxy' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts
	  Library referenced via 'es2015.reflect' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts
	  Library referenced via 'es2015.symbol' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts'
	  Library referenced via 'es2015.symbol' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	  Library referenced via 'es2015.symbol' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts
	  Library referenced via 'es2015.symbol.wellknown' from file '../../../../home/src/tslibs/TS/Lib/lib.es2015.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.es5.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.es5.d.ts'
	jsdocCompletion_typedef.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (14)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/jsdocCompletion_typedef.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.core.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json: *new*
  {"pollingInterval":2000}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.core.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tests/cases/fourslash/server/jsdocCompletion_typedef.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
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
      "request_seq": 2,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsdocCompletion_typedef.js",
        "line": 10,
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
      "request_seq": 3,
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
            "name": "codePointAt",
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
            "name": "endsWith",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "includes",
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
            "name": "normalize",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "repeat",
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
            "name": "startsWith",
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
            "name": "foo",
            "kind": "warning",
            "kindModifiers": "",
            "sortText": "18",
            "isFromUncheckedFile": true,
            "commitCharacters": []
          },
          {
            "name": "my",
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
            "name": "anchor",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "big",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "blink",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "bold",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "fixed",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "fontcolor",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "fontsize",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "italics",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "link",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "small",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "strike",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "sub",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "substr",
            "kind": "method",
            "kindModifiers": "deprecated,declare",
            "sortText": "z11"
          },
          {
            "name": "sup",
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