currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/test.js]
/**
 * @param {string} type
 */
function test(type) {
    type.
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/test.js"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/test.js :: No config files found.
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
	/tests/cases/fourslash/server/test.js SVC-1-0 "/**\n * @param {string} type\n */\nfunction test(type) {\n    type.\n}"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	test.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/test.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/test.js","line":5,"offset":10},"command":"completionInfo"}
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
        "name": "test",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "type",
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