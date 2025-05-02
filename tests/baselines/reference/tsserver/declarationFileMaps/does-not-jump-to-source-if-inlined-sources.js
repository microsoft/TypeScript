Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/a.ts]
export function fnA() {}
export interface IfaceA {}
export const instanceA: IfaceA = {};

//// [/home/src/projects/project/a/bin/a.d.ts.map]
{
  "version": 3,
  "file": "a.d.ts",
  "sourceRoot": "",
  "sources": [
    "../a.ts"
  ],
  "names": [],
  "mappings": "AAAA,wBAAgB,GAAG,SAAK;AACxB,MAAM,WAAW,MAAM;CAAG;AAC1B,eAAO,MAAM,SAAS,EAAE,MAAW,CAAC",
  "sourcesContent": [
    "export function fnA() {}\nexport interface IfaceA {}\nexport const instanceA: IfaceA = {};"
  ]
}

//// [/home/src/projects/project/a/bin/a.d.ts]
export declare function fnA(): void;
export interface IfaceA {
}
export declare const instanceA: IfaceA;
//# sourceMappingURL=a.d.ts.map

//// [/home/src/projects/project/b/b.ts]
export function fnB() {}

//// [/home/src/projects/project/b/bin/b.d.ts.map]
{
  "version": 3,
  "file": "b.d.ts",
  "sourceRoot": "",
  "sources": [
    "../b.ts"
  ],
  "names": [],
  "mappings": "AAAA,wBAAgB,GAAG,SAAK"
}

//// [/home/src/projects/project/b/bin/b.d.ts]
export declare function fnB(): void;
//# sourceMappingURL=b.d.ts.map

//// [/home/src/projects/project/user/user.ts]
import * as a from "../a/bin/a";
import * as b from "../b/bin/b";
export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }

//// [/home/src/projects/project/dummy/dummy.ts]
let a = 10;

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
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/user/user.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/user/user.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/projects/project/user
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/user/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/user/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/bin/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/b/bin/b.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/bin/a.d.ts Text-1 "export declare function fnA(): void;\nexport interface IfaceA {\n}\nexport declare const instanceA: IfaceA;\n//# sourceMappingURL=a.d.ts.map"
	/home/src/projects/project/b/bin/b.d.ts Text-1 "export declare function fnB(): void;\n//# sourceMappingURL=b.d.ts.map"
	/home/src/projects/project/user/user.ts SVC-1-0 "import * as a from \"../a/bin/a\";\nimport * as b from \"../b/bin/b\";\nexport function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../a/bin/a.d.ts
	  Imported via "../a/bin/a" from file 'user.ts'
	../b/bin/b.d.ts
	  Imported via "../b/bin/b" from file 'user.ts'
	user.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/user/user.ts ProjectRootPath: undefined
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
After request

PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/user/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/user/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/user/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/a/bin/a.d.ts: *new*
  {}
/home/src/projects/project/b/bin/b.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/a: *new*
  {}
/home/src/projects/project/b: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/bin/a.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/projects/project/b/bin/b.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/projects/project/user/user.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/home/src/projects/project/user/user.ts",
        "line": 3,
        "offset": 30
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/bin/a.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/home/src/projects/project/a/bin/a.d.ts",
            "start": {
              "line": 1,
              "offset": 25
            },
            "end": {
              "line": 1,
              "offset": 28
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 37
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 3,
            "offset": 30
          },
          "end": {
            "line": 3,
            "offset": 33
          }
        }
      },
      "responseRequired": true
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/tsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/user/jsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/user/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/user/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/a/bin/a.d.ts:
  {}
/home/src/projects/project/a/bin/a.d.ts.map: *new*
  {}
/home/src/projects/project/b/bin/b.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/a:
  {}
/home/src/projects/project/b:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /home/src/projects/project/a/bin/a.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/bin/a.d.ts *changed*
    version: Text-1
    sourceMapFilePath: /home/src/projects/project/a/bin/a.d.ts.map *changed*
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/projects/project/a/bin/a.d.ts.map *new*
    version: Text-1
    declarationInfoPath: /home/src/projects/project/a/bin/a.d.ts
    documentPositionMapper: false
    containingProjects: 0
/home/src/projects/project/b/bin/b.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/projects/project/user/user.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/home/src/projects/project/user/user.ts",
        "line": 3,
        "offset": 39
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/b/bin/b.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/b/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/home/src/projects/project/b/b.ts",
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 20
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 25
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 3,
            "offset": 39
          },
          "end": {
            "line": 3,
            "offset": 42
          }
        }
      },
      "responseRequired": true
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/tsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/user/jsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/user/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/user/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/a/bin/a.d.ts:
  {}
/home/src/projects/project/a/bin/a.d.ts.map:
  {}
/home/src/projects/project/b/b.ts: *new*
  {}
/home/src/projects/project/b/bin/b.d.ts:
  {}
/home/src/projects/project/b/bin/b.d.ts.map: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/a:
  {}
/home/src/projects/project/b:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 2 *changed*
        /home/src/projects/project/a/bin/a.d.ts: identitySourceMapConsumer
        /home/src/projects/project/b/bin/b.d.ts: DocumentPositionMapper1 *new*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/bin/a.d.ts
    version: Text-1
    sourceMapFilePath: /home/src/projects/project/a/bin/a.d.ts.map
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/projects/project/a/bin/a.d.ts.map
    version: Text-1
    declarationInfoPath: /home/src/projects/project/a/bin/a.d.ts
    documentPositionMapper: false
    containingProjects: 0
/home/src/projects/project/b/b.ts *new*
    version: Text-1
    containingProjects: 0
/home/src/projects/project/b/bin/b.d.ts *changed*
    version: Text-1
    sourceMapFilePath: /home/src/projects/project/b/bin/b.d.ts.map *changed*
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/projects/project/b/bin/b.d.ts.map *new*
    version: Text-1
    declarationInfoPath: /home/src/projects/project/b/bin/b.d.ts
    sourceInfos: 1
        /home/src/projects/project/b/b.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/home/src/projects/project/user/user.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

DocumentPositionMappers::
DocumentPositionMapper1 *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/home/src/projects/project/user/user.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/user/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/user/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/user/user.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 4,
      "success": true
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/user/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/tsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/user/jsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/user/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/a/bin/a.d.ts:
  {}
/home/src/projects/project/a/bin/a.d.ts.map:
  {}
/home/src/projects/project/b/b.ts:
  {}
/home/src/projects/project/b/bin/b.d.ts:
  {}
/home/src/projects/project/b/bin/b.d.ts.map:
  {}
/home/src/projects/project/user/user.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/a:
  {}
/home/src/projects/project/b:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/bin/a.d.ts
    version: Text-1
    sourceMapFilePath: /home/src/projects/project/a/bin/a.d.ts.map
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/projects/project/a/bin/a.d.ts.map
    version: Text-1
    declarationInfoPath: /home/src/projects/project/a/bin/a.d.ts
    documentPositionMapper: false
    containingProjects: 0
/home/src/projects/project/b/b.ts
    version: Text-1
    containingProjects: 0
/home/src/projects/project/b/bin/b.d.ts
    version: Text-1
    sourceMapFilePath: /home/src/projects/project/b/bin/b.d.ts.map
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/projects/project/b/bin/b.d.ts.map
    version: Text-1
    declarationInfoPath: /home/src/projects/project/b/bin/b.d.ts
    sourceInfos: 1
        /home/src/projects/project/b/b.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/home/src/projects/project/user/user.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/dummy/dummy.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/dummy/dummy.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject2*, currentDirectory: /home/src/projects/project/dummy
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/dummy/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/dummy/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/dummy/dummy.ts SVC-1-0 "let a = 10;"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/home/src/projects/project/a/bin/a.d.ts
	/home/src/projects/project/b/bin/b.d.ts
	/home/src/projects/project/user/user.ts


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../a/bin/a.d.ts
	  Imported via "../a/bin/a" from file 'user.ts'
	../b/bin/b.d.ts
	  Imported via "../b/bin/b" from file 'user.ts'
	user.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/a 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/a 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/b 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/b 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/user/user.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/a/bin/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/b/bin/b.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/a/bin/a.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/b/bin/b.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/b/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 5,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/dummy/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/dummy/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/dummy/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

PolledWatches *deleted*::
/home/src/projects/project/user/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project/a/bin/a.d.ts:
  {}
/home/src/projects/project/a/bin/a.d.ts.map:
  {}
/home/src/projects/project/b/b.ts:
  {}
/home/src/projects/project/b/bin/b.d.ts:
  {}
/home/src/projects/project/b/bin/b.d.ts.map:
  {}
/home/src/projects/project/user/user.ts:
  {}

FsWatchesRecursive *deleted*::
/home/src/projects/project/a:
  {}
/home/src/projects/project/b:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true
    documentPositionMappers: 0 *changed*
        /home/src/projects/project/a/bin/a.d.ts: identitySourceMapConsumer *deleted*
        /home/src/projects/project/b/bin/b.d.ts: DocumentPositionMapper1 *deleted*
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/bin/a.d.ts *deleted*
    version: Text-1
    sourceMapFilePath: /home/src/projects/project/a/bin/a.d.ts.map
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/home/src/projects/project/a/bin/a.d.ts.map *deleted*
    version: Text-1
    declarationInfoPath: /home/src/projects/project/a/bin/a.d.ts
    documentPositionMapper: false
    containingProjects: 0
/home/src/projects/project/b/b.ts *deleted*
    version: Text-1
    containingProjects: 0
/home/src/projects/project/b/bin/b.d.ts *deleted*
    version: Text-1
    sourceMapFilePath: /home/src/projects/project/b/bin/b.d.ts.map
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/home/src/projects/project/b/bin/b.d.ts.map *deleted*
    version: Text-1
    declarationInfoPath: /home/src/projects/project/b/bin/b.d.ts
    sourceInfos: 1
        /home/src/projects/project/b/b.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/home/src/projects/project/dummy/dummy.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/home/src/projects/project/user/user.ts *deleted*
    version: SVC-1-0
    containingProjects: 0
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *new*
        /dev/null/inferredProject1* *deleted*

DocumentPositionMappers::
DocumentPositionMapper1 *deleted*
