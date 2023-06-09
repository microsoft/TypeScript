currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.ts]
import { add } from 'lodash';

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/@types/lodash/index.d.ts]
export = _;
export as namespace _;
declare const _: _.LoDashStatic;
declare namespace _ {
    interface LoDashStatic {}
}

//// [/node_modules/@types/lodash/package.json]
{ "name": "@types/lodash", "version": "4.14.97", "types": "index.d.ts" }

//// [/node_modules/lodash/lodash.js]
;(function() {
    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
     return augend + addend;
    }, 0);

    function lodash(value) {}
    lodash.add = add;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();
    /** Detect free variable `exports`. */
    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;////     
    /** Detect free variable `module`. */
    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
    if (freeModule) {
      // Export for Node.js.
      (freeModule.exports = _)._ = _;
      // Export for CommonJS support.
      freeExports._ = _;
    }
    else {
      // Export to the global object.
      root._ = _;
    }
}.call(this));

//// [/node_modules/lodash/package.json]
{ "name": "lodash", "version": "4.17.15", "main": "./lodash.js" }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/node_modules/lodash/package.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /node_modules/lodash
Info seq  [hh:mm:ss:mss] For info: /node_modules/lodash/package.json :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/lodash/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/lodash/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/lodash/package.json SVC-1-0 "{ \"name\": \"lodash\", \"version\": \"4.17.15\", \"main\": \"./lodash.js\" }"
	/node_modules/@types/lodash/index.d.ts Text-1 "export = _;\nexport as namespace _;\ndeclare const _: _.LoDashStatic;\ndeclare namespace _ {\n    interface LoDashStatic {}\n}"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	package.json
	  Root file specified for compilation
	../@types/lodash/index.d.ts
	  Entry point for implicit type library 'lodash' with packageId '@types/lodash/index.d.ts@4.14.97'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/lodash/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /index.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/lodash/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/@types/lodash/index.d.ts Text-1 "export = _;\nexport as namespace _;\ndeclare const _: _.LoDashStatic;\ndeclare namespace _ {\n    interface LoDashStatic {}\n}"
	/index.ts SVC-1-0 "import { add } from 'lodash';"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	node_modules/@types/lodash/index.d.ts
	  Imported via 'lodash' from file 'index.ts' with packageId '@types/lodash/index.d.ts@4.14.97'
	  Entry point for implicit type library 'lodash' with packageId '@types/lodash/index.d.ts@4.14.97'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/lodash/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/index.ts","line":1,"offset":10},"command":"findSourceDefinition"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/lodash/lodash.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/node_modules/lodash/lodash.js Text-1 ";(function() {\n    /**\n     * Adds two numbers.\n     *\n     * @static\n     * @memberOf _\n     * @since 3.4.0\n     * @category Math\n     * @param {number} augend The first number in an addition.\n     * @param {number} addend The second number in an addition.\n     * @returns {number} Returns the total.\n     * @example\n     *\n     * _.add(6, 4);\n     * // => 10\n     */\n    var add = createMathOperation(function(augend, addend) {\n     return augend + addend;\n    }, 0);\n\n    function lodash(value) {}\n    lodash.add = add;\n\n    /** Detect free variable `global` from Node.js. */\n    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n    /** Detect free variable `self`. */\n    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n    /** Used as a reference to the global object. */\n    var root = freeGlobal || freeSelf || Function('return this')();\n    /** Detect free variable `exports`. */\n    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;////     \n    /** Detect free variable `module`. */\n    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n    if (freeModule) {\n      // Export for Node.js.\n      (freeModule.exports = _)._ = _;\n      // Export for CommonJS support.\n      freeExports._ = _;\n    }\n    else {\n      // Export to the global object.\n      root._ = _;\n    }\n}.call(this));"
	/index.ts SVC-1-0 "import { add } from 'lodash';"


	node_modules/lodash/lodash.js
	  Imported via 'lodash' from file 'index.ts' with packageId 'lodash/lodash.js@4.17.15'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "findSourceDefinition",
     "request_seq": 2,
     "success": true,
     "performanceData": {
      "updateGraphDurationMs": *
     },
     "body": [
      {
       "file": "/node_modules/lodash/lodash.js",
       "start": {
        "line": 17,
        "offset": 9
       },
       "end": {
        "line": 17,
        "offset": 12
       },
       "contextStart": {
        "line": 17,
        "offset": 5
       },
       "contextEnd": {
        "line": 19,
        "offset": 11
       },
       "unverified": true
      },
      {
       "file": "/node_modules/lodash/lodash.js",
       "start": {
        "line": 22,
        "offset": 12
       },
       "end": {
        "line": 22,
        "offset": 15
       },
       "contextStart": {
        "line": 22,
        "offset": 5
       },
       "contextEnd": {
        "line": 22,
        "offset": 22
       },
       "unverified": true
      }
     ]
    }