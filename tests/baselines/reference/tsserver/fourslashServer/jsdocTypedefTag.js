currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/jsdocCompletion_typedef.js]
/** @typedef {(string | number)} NumberLike */

/**
 * @typedef Animal - think Giraffes
 * @type {Object}
 * @property {string} animalName
 * @property {number} animalAge
 */

/**
 * @typedef {Object} Person
 * @property {string} personName
 * @property {number} personAge
 */

/**
 * @typedef {Object}
 * @property {string} catName
 * @property {number} catAge
 */
var Cat;

/** @typedef {{ dogName: string, dogAge: number }} */
var Dog;

/** @type {NumberLike} */
var numberLike; numberLike.

/** @type {Person} */
var p;p.;
p.personName.;
p.personAge.;

/** @type {Animal} */
var a;a.;
a.animalName.;
a.animalAge.;

/** @type {Cat} */
var c;c.;
c.catName.;
c.catAge.;

/** @type {Dog} */
var d;d.;
d.dogName.;
d.dogAge.;


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js"},"command":"open"}
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
	/tests/cases/fourslash/server/jsdocCompletion_typedef.js SVC-1-0 "/** @typedef {(string | number)} NumberLike */\n\n/**\n * @typedef Animal - think Giraffes\n * @type {Object}\n * @property {string} animalName\n * @property {number} animalAge\n */\n\n/**\n * @typedef {Object} Person\n * @property {string} personName\n * @property {number} personAge\n */\n\n/**\n * @typedef {Object}\n * @property {string} catName\n * @property {number} catAge\n */\nvar Cat;\n\n/** @typedef {{ dogName: string, dogAge: number }} */\nvar Dog;\n\n/** @type {NumberLike} */\nvar numberLike; numberLike.\n\n/** @type {Person} */\nvar p;p.;\np.personName.;\np.personAge.;\n\n/** @type {Animal} */\nvar a;a.;\na.animalName.;\na.animalAge.;\n\n/** @type {Cat} */\nvar c;c.;\nc.catName.;\nc.catAge.;\n\n/** @type {Dog} */\nvar d;d.;\nd.dogName.;\nd.dogAge.;"


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
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":27,"offset":28},"command":"completionInfo"}
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
        "name": "a",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
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
    {"seq":3,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 3,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":30,"offset":9},"command":"completionInfo"}
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
        "name": "personAge",
        "kind": "property",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "personName",
        "kind": "property",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "a",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       }
      ]
     }
    }
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
    {"seq":6,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":31,"offset":14},"command":"completionInfo"}
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
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
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
    {"seq":7,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 7,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":8,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":32,"offset":13},"command":"completionInfo"}
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
     "request_seq": 8,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": false,
      "entries": [
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
        "name": "toLocaleString",
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
        "name": "valueOf",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       },
       {
        "name": "a",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":9,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 9,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":10,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":35,"offset":9},"command":"completionInfo"}
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
     "request_seq": 10,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": false,
      "entries": [
       {
        "name": "animalAge",
        "kind": "property",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "animalName",
        "kind": "property",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "a",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":11,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 11,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":12,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":36,"offset":14},"command":"completionInfo"}
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
     "request_seq": 12,
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
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
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
    {"seq":13,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 13,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":14,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":37,"offset":13},"command":"completionInfo"}
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
     "request_seq": 14,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": false,
      "entries": [
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
        "name": "toLocaleString",
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
        "name": "valueOf",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       },
       {
        "name": "a",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":15,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 15,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":16,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":45,"offset":9},"command":"completionInfo"}
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
     "request_seq": 16,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": false,
      "entries": [
       {
        "name": "dogAge",
        "kind": "property",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "dogName",
        "kind": "property",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "a",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":17,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 17,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":18,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":46,"offset":11},"command":"completionInfo"}
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
     "request_seq": 18,
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
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
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
    {"seq":19,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 19,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":20,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":47,"offset":10},"command":"completionInfo"}
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
     "request_seq": 20,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": false,
      "entries": [
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
        "name": "toLocaleString",
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
        "name": "valueOf",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       },
       {
        "name": "a",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":21,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 21,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":22,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":40,"offset":9},"command":"completionInfo"}
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
     "request_seq": 22,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": false,
      "entries": [
       {
        "name": "catAge",
        "kind": "property",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "catName",
        "kind": "property",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "a",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":23,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 23,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":24,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":41,"offset":11},"command":"completionInfo"}
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
     "request_seq": 24,
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
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
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
    {"seq":25,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 25,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":26,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":42,"offset":10},"command":"completionInfo"}
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
     "request_seq": 26,
     "success": true,
     "body": {
      "flags": 0,
      "isGlobalCompletion": false,
      "isMemberCompletion": true,
      "isNewIdentifierLocation": false,
      "entries": [
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
        "name": "toLocaleString",
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
        "name": "valueOf",
        "kind": "method",
        "kindModifiers": "declare",
        "sortText": "11"
       },
       {
        "name": "a",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Animal",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "animalName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "c",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Cat",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "catName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "d",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Dog",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "dogName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "numberLike",
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
        "name": "p",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "Person",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personAge",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       },
       {
        "name": "personName",
        "kind": "warning",
        "kindModifiers": "",
        "sortText": "18"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":27,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/jsdocCompletion_typedef.js","line":34,"offset":12},"command":"quickinfo"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "quickinfo",
     "request_seq": 27,
     "success": true,
     "body": {
      "kind": "type",
      "kindModifiers": "",
      "start": {
       "line": 34,
       "offset": 12
      },
      "end": {
       "line": 34,
       "offset": 18
      },
      "displayString": "type Animal = {\n    animalName: string;\n    animalAge: number;\n}",
      "documentation": "- think Giraffes",
      "tags": []
     }
    }