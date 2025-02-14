Info seq  [hh:mm:ss:mss] currentDirectory:: C:\home\src\Vscode\Projects\bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: C:/home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: undefined
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [C:/temp/replay/axios-src/lib/core/AxiosHeaders.js]
export const b = 10;



//// [C:/temp/replay/axios-src/lib/core/dispatchRequest.js]
import { b } from "./AxiosHeaders.js";
import { b2 } from "./settle.js";
import { x } from "follow-redirects";
export const y = 10;


//// [C:/temp/replay/axios-src/lib/core/mergeConfig.js]
import { b } from "./AxiosHeaders.js";
export const y = 10;


//// [C:/temp/replay/axios-src/lib/core/settle.js]
export const b2 = 10;


//// [C:/temp/replay/axios-src/package.json]
{
  "name": "axios",
  "version": "1.4.0",
  "dependencies": {
    "follow-redirects": "^1.15.0"
  }
}

//// [C:/temp/replay/axios-src/node_modules/follow-redirects/package.json]
{
  "name": "follow-redirects",
  "version": "1.15.0"
}

//// [C:/temp/replay/axios-src/node_modules/follow-redirects/index.js]
export const x = 10;

//// [C:/home/src/tslibs/TS/Lib/lib.d.ts]
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
      "command": "open",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/AxiosHeaders.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: c:/temp/replay/axios-src/lib/core
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	C:/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js SVC-1-0 "export const b = 10;\n\n"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	AxiosHeaders.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Creating AutoImportProviderProject: /dev/null/autoImportProviderProject1*, currentDirectory: c:/temp/replay/axios-src/lib/core
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/temp/replay/axios-src/node_modules/follow-redirects/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	c:/temp/replay/axios-src/node_modules/follow-redirects/index.js Text-1 "export const x = 10;"


	../../node_modules/follow-redirects/index.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After request

PolledWatches::
c:/temp/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/tsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/tsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/tsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
C:/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
C:/temp/replay/axios-src/node_modules/follow-redirects/package.json: *new*
  {}
c:/temp/replay/axios-src/package.json: *new*
  {}

FsWatchesRecursive::
c:/temp/replay/axios-src/node_modules: *new*
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
C:/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
c:/temp/replay/axios-src/node_modules/follow-redirects/index.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "c:/temp/replay/axios-src/lib/core/AxiosHeaders.js",
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
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
C:/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /dev/null/inferredProject1* *default*
c:/temp/replay/axios-src/node_modules/follow-redirects/index.js
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/dispatchRequest.js"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: c:/temp/replay/axios-src/lib/core/dispatchRequest.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject2*, currentDirectory: c:/temp/replay/axios-src/lib/core
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/settle.js 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/settle.js 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/settle.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/temp/replay/axios-src/node_modules/follow-redirects/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	C:/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js SVC-1-1 "export const b = 10;\n//comment\n"
	c:/temp/replay/axios-src/lib/core/settle.js Text-1 "export const b2 = 10;\n"
	c:/temp/replay/axios-src/node_modules/follow-redirects/index.js Text-1 "export const x = 10;"
	c:/temp/replay/axios-src/lib/core/dispatchRequest.js SVC-1-0 "import { b } from \"./AxiosHeaders.js\";\nimport { b2 } from \"./settle.js\";\nimport { x } from \"follow-redirects\";\nexport const y = 10;\n"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	AxiosHeaders.js
	  Imported via "./AxiosHeaders.js" from file 'dispatchRequest.js'
	settle.js
	  Imported via "./settle.js" from file 'dispatchRequest.js'
	../../node_modules/follow-redirects/index.js
	  Imported via "follow-redirects" from file 'dispatchRequest.js' with packageId 'follow-redirects/index.js@1.15.0'
	dispatchRequest.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	C:/home/src/tslibs/TS/Lib/lib.d.ts
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	AxiosHeaders.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: C:/temp/replay/axios-src/node_modules/follow-redirects/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: C:/temp/replay/axios-src/node_modules/follow-redirects/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/dispatchRequest.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
c:/temp/node_modules: *new*
  {"pollingInterval":500}
c:/temp/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/node_modules: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/settle.js: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/node_modules: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/node_modules: *new*
  {"pollingInterval":500}
c:/temp/replay/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
C:/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
C:/temp/replay/axios-src/node_modules/follow-redirects/package.json:
  {}
c:/temp/replay/axios-src/lib/core: *new*
  {}
c:/temp/replay/axios-src/lib/core/settle.js: *new*
  {}
c:/temp/replay/axios-src/package.json:
  {}

FsWatchesRecursive::
c:/temp/replay/axios-src/node_modules:
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
/dev/null/inferredProject1* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
C:/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *new*
        /dev/null/inferredProject1* *deleted*
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js (Open) *changed*
    version: SVC-1-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *default* *new*
        /dev/null/inferredProject1* *deleted*
c:/temp/replay/axios-src/lib/core/dispatchRequest.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
c:/temp/replay/axios-src/lib/core/settle.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
c:/temp/replay/axios-src/node_modules/follow-redirects/index.js *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *new*
        /dev/null/autoImportProviderProject1* *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/mergeConfig.js"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: c:/temp/replay/axios-src/lib/core/mergeConfig.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject3*, currentDirectory: c:/temp/replay/axios-src/lib/core
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core 0 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core 0 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)
	C:/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js SVC-1-1 "export const b = 10;\n//comment\n"
	c:/temp/replay/axios-src/lib/core/mergeConfig.js SVC-1-0 "import { b } from \"./AxiosHeaders.js\";\nexport const y = 10;\n"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	AxiosHeaders.js
	  Imported via "./AxiosHeaders.js" from file 'mergeConfig.js'
	mergeConfig.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Creating AutoImportProviderProject: /dev/null/autoImportProviderProject2*, currentDirectory: c:/temp/replay/axios-src/lib/core
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/temp/replay/axios-src/node_modules/follow-redirects/package.json 2000 undefined Project: /dev/null/autoImportProviderProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	c:/temp/replay/axios-src/node_modules/follow-redirects/index.js Text-1 "export const x = 10;"


	../../node_modules/follow-redirects/index.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*,/dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/dispatchRequest.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/mergeConfig.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After request

Projects::
/dev/null/autoImportProviderProject2* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject3* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject2*

ScriptInfos::
C:/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject2*
        /dev/null/inferredProject3* *new*
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js (Open) *changed*
    version: SVC-1-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject2* *default*
        /dev/null/inferredProject3* *new*
c:/temp/replay/axios-src/lib/core/dispatchRequest.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
c:/temp/replay/axios-src/lib/core/mergeConfig.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
c:/temp/replay/axios-src/lib/core/settle.js
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
c:/temp/replay/axios-src/node_modules/follow-redirects/index.js *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject2*
        /dev/null/autoImportProviderProject2* *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/AxiosHeaders.js"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/dispatchRequest.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/mergeConfig.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 5,
      "success": true
    }
After request

PolledWatches::
c:/temp/node_modules:
  {"pollingInterval":500}
c:/temp/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/node_modules:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/settle.js:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/node_modules:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/node_modules:
  {"pollingInterval":500}
c:/temp/replay/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
C:/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
C:/temp/replay/axios-src/node_modules/follow-redirects/package.json:
  {}
c:/temp/replay/axios-src/lib/core:
  {}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js: *new*
  {}
c:/temp/replay/axios-src/lib/core/settle.js:
  {}
c:/temp/replay/axios-src/package.json:
  {}

FsWatchesRecursive::
c:/temp/replay/axios-src/node_modules:
  {}

Projects::
/dev/null/autoImportProviderProject2* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false
/dev/null/inferredProject3* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: /dev/null/autoImportProviderProject2*

ScriptInfos::
C:/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/inferredProject3*
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js *changed*
    open: false *changed*
    version: SVC-1-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/inferredProject3*
c:/temp/replay/axios-src/lib/core/dispatchRequest.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
c:/temp/replay/axios-src/lib/core/mergeConfig.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
c:/temp/replay/axios-src/lib/core/settle.js
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
c:/temp/replay/axios-src/node_modules/follow-redirects/index.js
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/autoImportProviderProject2*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/settle.js"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/core/settle.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: c:/temp/replay/axios-src/lib/core/settle.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	C:/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js Text-2 "export const b = 10;\n\n"
	c:/temp/replay/axios-src/lib/core/settle.js Text-1 "export const b2 = 10;\n"
	c:/temp/replay/axios-src/node_modules/follow-redirects/index.js Text-1 "export const x = 10;"
	c:/temp/replay/axios-src/lib/core/dispatchRequest.js SVC-1-0 "import { b } from \"./AxiosHeaders.js\";\nimport { b2 } from \"./settle.js\";\nimport { x } from \"follow-redirects\";\nexport const y = 10;\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/dispatchRequest.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/mergeConfig.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/settle.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 6,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
c:/temp/node_modules:
  {"pollingInterval":500}
c:/temp/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/node_modules:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/settle.js:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/node_modules:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/node_modules:
  {"pollingInterval":500}
c:/temp/replay/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
C:/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
C:/temp/replay/axios-src/node_modules/follow-redirects/package.json:
  {}
c:/temp/replay/axios-src/lib/core:
  {}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js:
  {}
c:/temp/replay/axios-src/package.json:
  {}

FsWatches *deleted*::
c:/temp/replay/axios-src/lib/core/settle.js:
  {}

FsWatchesRecursive::
c:/temp/replay/axios-src/node_modules:
  {}

Projects::
/dev/null/autoImportProviderProject2* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false
/dev/null/inferredProject3* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    autoImportProviderHost: /dev/null/autoImportProviderProject2*

ScriptInfos::
C:/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/inferredProject3*
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/inferredProject3*
c:/temp/replay/axios-src/lib/core/dispatchRequest.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
c:/temp/replay/axios-src/lib/core/mergeConfig.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
c:/temp/replay/axios-src/lib/core/settle.js (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2* *default*
c:/temp/replay/axios-src/node_modules/follow-redirects/index.js
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/autoImportProviderProject2*
