Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: undefined
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/replay/axios-src/test/module/ts-require/index.js]
export const a = 10;



//// [/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts]
export const x = 10;


//// [/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts]
/// <reference types="node" />
export const z = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts/index.js]
export const y = 10;


//// [/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts]
export const x = 10;


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "traceResolution": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/replay/axios-src/test/module/ts-require/index.js"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/username/projects/replay/axios-src/test/module/ts-require/index.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /users/username/projects/replay/axios-src/test/module/ts-require
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/test/module/ts-require/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts', result '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'responselike', containing file '/users/username/projects/replay/axios-src/test/module/ts-require/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/users/username/projects/replay/axios-src/test/module/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/users/username/projects/replay/axios-src/test/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', result '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'responselike' was successfully resolved to '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Resolution for type reference directive 'node' was found in cache from location '/users/username/projects/replay/axios-src/test/module/ts-require'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/node_modules/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/node_modules/@types/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/node_modules/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/replay/axios-src/test/module/ts-require/index.js SVC-1-0 "export const a = 10;\n\n"
	/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts Text-1 "export const x = 10;\n"
	/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts Text-1 "/// <reference types=\"node\" />\nexport const z = 10;\n"


	../../../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	index.js
	  Root file specified for compilation
	node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'
	  Type library referenced via 'node' from file '../../../node_modules/@types/responselike/index.d.ts'
	../../../node_modules/@types/responselike/index.d.ts
	  Entry point for implicit type library 'responselike'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/replay/axios-src/test/module/ts-require/index.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/jsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/node_modules/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/jsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/jsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/replay/axios-src/test/module/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/replay/axios-src/test/module/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/jsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/tsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/tsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/replay/axios-src/test/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/replay/axios-src/test/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/tsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/tsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/jsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/replay/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects/replay/axios-src/node_modules: *new*
  {}
/users/username/projects/replay/axios-src/node_modules/@types: *new*
  {}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules: *new*
  {}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types: *new*
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
/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/users/username/projects/replay/axios-src/test/module/ts-require/index.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/users/username/projects/replay/axios-src/test/module/ts-require/index.js",
            "textChanges": [
              {
                "newText": "//comment",
                "start": {
                  "line": 2,
                  "offset": 1
                },
                "end": {
                  "line": 2,
                  "offset": 1
                }
              }
            ]
          }
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/users/username/projects/replay/axios-src/test/module/ts-require/index.js (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/replay/axios-src/test/module/ts/index.js"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/username/projects/replay/axios-src/test/module/ts/index.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject2*, currentDirectory: /users/username/projects/replay/axios-src/test/module/ts
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/test/module/ts/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts', result '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'responselike', containing file '/users/username/projects/replay/axios-src/test/module/ts/__inferred type names__.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/users/username/projects/replay/axios-src/test/module/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/users/username/projects/replay/axios-src/test/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', result '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'responselike' was successfully resolved to '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'node', containing file '/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts', root directory '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types,/users/username/projects/replay/axios-src/test/module/node_modules/@types,/users/username/projects/replay/axios-src/test/node_modules/@types,/users/username/projects/replay/axios-src/node_modules/@types,/users/username/projects/replay/node_modules/@types,/users/username/projects/node_modules/@types,/users/username/node_modules/@types,/users/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types, /users/username/projects/replay/axios-src/test/module/node_modules/@types, /users/username/projects/replay/axios-src/test/node_modules/@types, /users/username/projects/replay/axios-src/node_modules/@types, /users/username/projects/replay/node_modules/@types, /users/username/projects/node_modules/@types, /users/username/node_modules/@types, /users/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Resolution for type reference directive 'node' was found in cache from location '/users/username/projects/replay/axios-src/test/module/ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'node' was successfully resolved to '/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/node_modules/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/replay/axios-src/test/module/ts/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/replay/axios-src/test/module/ts/index.js SVC-1-0 "export const y = 10;\n"
	/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts Text-1 "export const x = 10;\n"
	/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts Text-1 "/// <reference types=\"node\" />\nexport const z = 10;\n"


	../../../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	index.js
	  Root file specified for compilation
	node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'
	  Type library referenced via 'node' from file '../../../node_modules/@types/responselike/index.d.ts'
	../../../node_modules/@types/responselike/index.d.ts
	  Entry point for implicit type library 'responselike'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/replay/axios-src/test/module/ts-require/index.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/replay/axios-src/test/module/ts/index.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/node_modules/@types/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/node_modules/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/node_modules:
  {"pollingInterval":500}
/users/username/projects/replay/axios-src/test/module/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/replay/axios-src/test/module/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts-require/tsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts/jsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts/node_modules/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts/package.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/ts/tsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/module/tsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/node_modules:
  {"pollingInterval":500}
/users/username/projects/replay/axios-src/test/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/replay/axios-src/test/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/test/tsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/replay/axios-src/tsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/replay/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/replay/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/replay/package.json:
  {"pollingInterval":2000}
/users/username/projects/replay/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/replay/axios-src/node_modules:
  {}
/users/username/projects/replay/axios-src/node_modules/@types:
  {}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules:
  {}
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types:
  {}
/users/username/projects/replay/axios-src/test/module/ts/node_modules: *new*
  {}
/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    autoImportProviderHost: false
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
/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/users/username/projects/replay/axios-src/test/module/ts-require/index.js (Open)
    version: SVC-1-1
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/users/username/projects/replay/axios-src/test/module/ts/index.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/users/username/projects/replay/axios-src/test/module/ts/node_modules/@types/node/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "navto",
      "arguments": {
        "searchValue": "a",
        "maxResultCount": 256
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/ts-require/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/module/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/test/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/axios-src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/replay/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/users/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/replay/axios-src/test/module/ts-require/index.js SVC-1-1 "export const a = 10;\n//comment\n"
	/users/username/projects/replay/axios-src/test/module/ts-require/node_modules/@types/node/index.d.ts Text-1 "export const x = 10;\n"
	/users/username/projects/replay/axios-src/node_modules/@types/responselike/index.d.ts Text-1 "/// <reference types=\"node\" />\nexport const z = 10;\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "name": "a",
          "kind": "const",
          "kindModifiers": "export",
          "isCaseSensitive": true,
          "matchKind": "exact",
          "file": "/users/username/projects/replay/axios-src/test/module/ts-require/index.js",
          "start": {
            "line": 1,
            "offset": 14
          },
          "end": {
            "line": 1,
            "offset": 20
          }
        }
      ],
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
