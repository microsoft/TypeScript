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

//// [/home/src/workspaces/project/index.ts]
import _, { foo } from 'lodash';
_.add

//// [/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts]
import _ = require("../index");
declare module "../index" {
    interface LoDashStatic {
        add(augend: number, addend: number): number;
    }
}

//// [/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts]
/// <reference path="./common/math.d.ts" />
export = _;
export as namespace _;
declare const _: _.LoDashStatic;
declare namespace _ {
    interface LoDashStatic {}
}

//// [/home/src/workspaces/project/node_modules/@types/lodash/package.json]
{ "name": "@types/lodash", "version": "4.14.97", "types": "index.d.ts" }

//// [/home/src/workspaces/project/node_modules/lodash/lodash.js]
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

//// [/home/src/workspaces/project/node_modules/lodash/package.json]
{ "name": "lodash", "version": "4.17.15", "main": "./lodash.js" }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/node_modules/lodash/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/node_modules/lodash/package.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project/node_modules/lodash
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/lodash/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/lodash/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/lodash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/lodash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/lodash/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/lodash/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/lodash/common/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/lodash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/lodash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/node_modules/lodash/package.json SVC-1-0 "{ \"name\": \"lodash\", \"version\": \"4.17.15\", \"main\": \"./lodash.js\" }"
	/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts Text-1 "import _ = require(\"../index\");\ndeclare module \"../index\" {\n    interface LoDashStatic {\n        add(augend: number, addend: number): number;\n    }\n}"
	/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts Text-1 "/// <reference path=\"./common/math.d.ts\" />\nexport = _;\nexport as namespace _;\ndeclare const _: _.LoDashStatic;\ndeclare namespace _ {\n    interface LoDashStatic {}\n}"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.d.ts'
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
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/node_modules/lodash/package.json ProjectRootPath: undefined
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
/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/lodash/common/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/lodash/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/lodash/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/lodash/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules: *new*
  {}
/home/src/workspaces/node_modules/@types: *new*
  {}
/home/src/workspaces/project/node_modules: *new*
  {}
/home/src/workspaces/project/node_modules/@types: *new*
  {}
/home/src/workspaces/project/node_modules/lodash/node_modules: *new*
  {}
/home/src/workspaces/project/node_modules/lodash/node_modules/@types: *new*
  {}
/home/src/workspaces/project/node_modules/node_modules/@types: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

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
/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/node_modules/lodash/package.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/index.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject2*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/lodash/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/lodash/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/lodash/common/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts Text-1 "import _ = require(\"../index\");\ndeclare module \"../index\" {\n    interface LoDashStatic {\n        add(augend: number, addend: number): number;\n    }\n}"
	/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts Text-1 "/// <reference path=\"./common/math.d.ts\" />\nexport = _;\nexport as namespace _;\ndeclare const _: _.LoDashStatic;\ndeclare namespace _ {\n    interface LoDashStatic {}\n}"
	/home/src/workspaces/project/index.ts SVC-1-0 "import _, { foo } from 'lodash';\n_.add"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.d.ts'
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
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/node_modules/lodash/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/index.ts ProjectRootPath: undefined
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
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/lodash/common/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/lodash/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/home/src/workspaces/project/node_modules/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/lodash/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/lodash/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/lodash/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {} *new*
/home/src/workspaces/node_modules/@types:
  {}
  {} *new*
/home/src/workspaces/project/node_modules:
  {}
  {} *new*
/home/src/workspaces/project/node_modules/@types:
  {}
  {} *new*
/home/src/workspaces/project/node_modules/lodash/node_modules:
  {}
/home/src/workspaces/project/node_modules/lodash/node_modules/@types:
  {}
/home/src/workspaces/project/node_modules/node_modules/@types:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/home/src/workspaces/project/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/home/src/workspaces/project/node_modules/lodash/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 1,
        "offset": 8
      },
      "command": "findSourceDefinition"
    }
Info seq  [hh:mm:ss:mss] Creating AuxiliaryProject: /dev/null/auxiliaryProject1*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/lodash/lodash.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/lodash/package.json 2000 undefined Project: /dev/null/auxiliaryProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/workspaces/project/node_modules/lodash/lodash.js Text-1 ";(function() {\n    /**\n     * Adds two numbers.\n     *\n     * @static\n     * @memberOf _\n     * @since 3.4.0\n     * @category Math\n     * @param {number} augend The first number in an addition.\n     * @param {number} addend The second number in an addition.\n     * @returns {number} Returns the total.\n     * @example\n     *\n     * _.add(6, 4);\n     * // => 10\n     */\n    var add = createMathOperation(function(augend, addend) {\n     return augend + addend;\n    }, 0);\n\n    function lodash(value) {}\n    lodash.add = add;\n\n    /** Detect free variable `global` from Node.js. */\n    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n    /** Detect free variable `self`. */\n    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n    /** Used as a reference to the global object. */\n    var root = freeGlobal || freeSelf || Function('return this')();\n    /** Detect free variable `exports`. */\n    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;////     \n    /** Detect free variable `module`. */\n    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n    if (freeModule) {\n      // Export for Node.js.\n      (freeModule.exports = _)._ = _;\n      // Export for CommonJS support.\n      freeExports._ = _;\n    }\n    else {\n      // Export to the global object.\n      root._ = _;\n    }\n}.call(this));"
	/home/src/workspaces/project/index.ts SVC-1-0 "import _, { foo } from 'lodash';\n_.add"


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
          "file": "/home/src/workspaces/project/node_modules/lodash/lodash.js",
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
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/lodash/common/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/lodash/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/lodash/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/lodash/lodash.js: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/lodash/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/home/src/workspaces/project/node_modules/lodash/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
  {} *new*
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
  {} *new*
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/node_modules/lodash/node_modules:
  {}
/home/src/workspaces/project/node_modules/lodash/node_modules/@types:
  {}
/home/src/workspaces/project/node_modules/node_modules/@types:
  {}

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
    autoImportProviderHost: false
    noDtsResolutionProject: /dev/null/auxiliaryProject1* *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 2 *changed*
        /dev/null/inferredProject2* *default*
        /dev/null/auxiliaryProject1* *new*
/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/workspaces/project/node_modules/lodash/lodash.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
/home/src/workspaces/project/node_modules/lodash/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
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
          "file": "/home/src/workspaces/project/node_modules/lodash/lodash.js",
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
        "file": "/home/src/workspaces/project/index.ts",
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
          "file": "/home/src/workspaces/project/node_modules/lodash/lodash.js",
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
        /home/src/workspaces/project/node_modules/@types/lodash/index.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false
    noDtsResolutionProject: /dev/null/auxiliaryProject1*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/workspaces/project/index.ts (Open)
    version: SVC-1-0
    containingProjects: 2
        /dev/null/inferredProject2* *default*
        /dev/null/auxiliaryProject1*
/home/src/workspaces/project/node_modules/@types/lodash/common/math.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/workspaces/project/node_modules/@types/lodash/index.d.ts *changed*
    version: Text-1
    sourceMapFilePath: false *changed*
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/workspaces/project/node_modules/lodash/lodash.js
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
/home/src/workspaces/project/node_modules/lodash/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
