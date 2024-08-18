currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.ts]
import _, { foo } from 'lodash';
_.add

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/@types/lodash/common/math.d.ts]
import _ = require("../index");
declare module "../index" {
    interface LoDashStatic {
        add(augend: number, addend: number): number;
    }
}

//// [/node_modules/@types/lodash/index.d.ts]
/// <reference path="./common/math.d.ts" />
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
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/node_modules/lodash/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /node_modules/lodash/package.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/lodash/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/lodash/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/lodash/common/math.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/lodash/common/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/lodash/package.json SVC-1-0 "{ \"name\": \"lodash\", \"version\": \"4.17.15\", \"main\": \"./lodash.js\" }"
	/node_modules/@types/lodash/common/math.d.ts Text-1 "import _ = require(\"../index\");\ndeclare module \"../index\" {\n    interface LoDashStatic {\n        add(augend: number, addend: number): number;\n    }\n}"
	/node_modules/@types/lodash/index.d.ts Text-1 "/// <reference path=\"./common/math.d.ts\" />\nexport = _;\nexport as namespace _;\ndeclare const _: _.LoDashStatic;\ndeclare namespace _ {\n    interface LoDashStatic {}\n}"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	package.json
	  Root file specified for compilation
	../@types/lodash/common/math.d.ts
	  Referenced via './common/math.d.ts' from file '../@types/lodash/index.d.ts'
	../@types/lodash/index.d.ts
	  Entry point for implicit type library 'lodash' with packageId '@types/lodash/index.d.ts@4.14.97'
	  Imported via "../index" from file '../@types/lodash/common/math.d.ts' with packageId '@types/lodash/index.d.ts@4.14.97'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/lodash/package.json ProjectRootPath: undefined
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
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types/lodash/common/math.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types/lodash/common/package.json: *new*
  {"pollingInterval":2000}
/node_modules/@types/lodash/index.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types/lodash/package.json: *new*
  {"pollingInterval":2000}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/node_modules/@types/lodash/common/math.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/node_modules/@types/lodash/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/node_modules/lodash/package.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /index.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/lodash/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/lodash/common/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/@types/lodash/common/math.d.ts Text-1 "import _ = require(\"../index\");\ndeclare module \"../index\" {\n    interface LoDashStatic {\n        add(augend: number, addend: number): number;\n    }\n}"
	/node_modules/@types/lodash/index.d.ts Text-1 "/// <reference path=\"./common/math.d.ts\" />\nexport = _;\nexport as namespace _;\ndeclare const _: _.LoDashStatic;\ndeclare namespace _ {\n    interface LoDashStatic {}\n}"
	/index.ts SVC-1-0 "import _, { foo } from 'lodash';\n_.add"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	node_modules/@types/lodash/common/math.d.ts
	  Referenced via './common/math.d.ts' from file 'node_modules/@types/lodash/index.d.ts'
	node_modules/@types/lodash/index.d.ts
	  Imported via 'lodash' from file 'index.ts' with packageId '@types/lodash/index.d.ts@4.14.97'
	  Imported via "../index" from file 'node_modules/@types/lodash/common/math.d.ts' with packageId '@types/lodash/index.d.ts@4.14.97'
	  Entry point for implicit type library 'lodash' with packageId '@types/lodash/index.d.ts@4.14.97'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/lodash/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
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
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/node_modules/@types/lodash/common/math.d.ts:
  {"pollingInterval":500}
/node_modules/@types/lodash/common/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/node_modules/@types/lodash/index.d.ts:
  {"pollingInterval":500}
/node_modules/@types/lodash/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/node_modules/@types/lodash/common/math.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/node_modules/@types/lodash/index.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/node_modules/lodash/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "line": 1,
        "offset": 8
      },
      "command": "findSourceDefinition"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/lodash/lodash.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/node_modules/lodash/lodash.js Text-1 ";(function() {\n    /**\n     * Adds two numbers.\n     *\n     * @static\n     * @memberOf _\n     * @since 3.4.0\n     * @category Math\n     * @param {number} augend The first number in an addition.\n     * @param {number} addend The second number in an addition.\n     * @returns {number} Returns the total.\n     * @example\n     *\n     * _.add(6, 4);\n     * // => 10\n     */\n    var add = createMathOperation(function(augend, addend) {\n     return augend + addend;\n    }, 0);\n\n    function lodash(value) {}\n    lodash.add = add;\n\n    /** Detect free variable `global` from Node.js. */\n    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n    /** Detect free variable `self`. */\n    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n    /** Used as a reference to the global object. */\n    var root = freeGlobal || freeSelf || Function('return this')();\n    /** Detect free variable `exports`. */\n    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;////     \n    /** Detect free variable `module`. */\n    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n    if (freeModule) {\n      // Export for Node.js.\n      (freeModule.exports = _)._ = _;\n      // Export for CommonJS support.\n      freeExports._ = _;\n    }\n    else {\n      // Export to the global object.\n      root._ = _;\n    }\n}.call(this));"
	/index.ts SVC-1-0 "import _, { foo } from 'lodash';\n_.add"


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
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 1
          },
          "unverified": true
        }
      ]
    }
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/node_modules/@types/lodash/common/math.d.ts:
  {"pollingInterval":500}
/node_modules/@types/lodash/common/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/node_modules/@types/lodash/index.d.ts:
  {"pollingInterval":500}
/node_modules/@types/lodash/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/node_modules/lodash/lodash.js: *new*
  {"pollingInterval":500}

Projects::
/dev/null/auxiliaryProject1* (Auxiliary) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noDtsResolutionProject: /dev/null/auxiliaryProject1* *changed*

ScriptInfos::
/index.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 2 *changed*
        /dev/null/inferredProject2* *default*
        /dev/null/auxiliaryProject1* *new*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/node_modules/@types/lodash/common/math.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/node_modules/@types/lodash/index.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/node_modules/lodash/lodash.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
/node_modules/lodash/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "line": 1,
        "offset": 13
      },
      "command": "findSourceDefinition"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "findSourceDefinition",
      "request_seq": 3,
      "success": true,
      "body": [
        {
          "file": "/node_modules/lodash/lodash.js",
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 1
          },
          "unverified": true
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "line": 1,
        "offset": 24
      },
      "command": "findSourceDefinition"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "findSourceDefinition",
      "request_seq": 4,
      "success": true,
      "body": [
        {
          "file": "/node_modules/lodash/lodash.js",
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 1
          }
        }
      ]
    }
After Request
Projects::
/dev/null/auxiliaryProject1* (Auxiliary)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /node_modules/@types/lodash/index.d.ts: identitySourceMapConsumer *new*
    noDtsResolutionProject: /dev/null/auxiliaryProject1*

ScriptInfos::
/index.ts (Open)
    version: SVC-1-0
    containingProjects: 2
        /dev/null/inferredProject2* *default*
        /dev/null/auxiliaryProject1*
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/node_modules/@types/lodash/common/math.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/node_modules/@types/lodash/index.d.ts *changed*
    version: Text-1
    sourceMapFilePath: false *changed*
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/node_modules/lodash/lodash.js
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
/node_modules/lodash/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
