currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/a.ts]
export function fnA() {}
export interface IfaceA {}
export const instanceA: IfaceA = {};

//// [/a/bin/a.d.ts.map]
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

//// [/a/bin/a.d.ts]
export declare function fnA(): void;
export interface IfaceA {
}
export declare const instanceA: IfaceA;
//# sourceMappingURL=a.d.ts.map

//// [/b/b.ts]
export function fnB() {}

//// [/b/bin/b.d.ts.map]
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

//// [/b/bin/b.d.ts]
export declare function fnB(): void;
//# sourceMappingURL=b.d.ts.map

//// [/user/user.ts]
import * as a from "../a/bin/a";
import * as b from "../b/bin/b";
export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }

//// [/dummy/dummy.ts]
let a = 10;


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/user.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user
Info seq  [hh:mm:ss:mss] For info: /user/user.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/bin/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/bin/b.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/bin/a.d.ts Text-1 "export declare function fnA(): void;\nexport interface IfaceA {\n}\nexport declare const instanceA: IfaceA;\n//# sourceMappingURL=a.d.ts.map"
	/b/bin/b.d.ts Text-1 "export declare function fnB(): void;\n//# sourceMappingURL=b.d.ts.map"
	/user/user.ts SVC-1-0 "import * as a from \"../a/bin/a\";\nimport * as b from \"../b/bin/b\";\nexport function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"


	../a/bin/a.d.ts
	  Imported via "../a/bin/a" from file 'user.ts'
	../b/bin/b.d.ts
	  Imported via "../b/bin/b" from file 'user.ts'
	user.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/user.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts: *new*
  {}
/b/bin/b.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/bin/a.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/b/bin/b.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/user.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/user.ts",
        "line": 3,
        "offset": 30
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/bin/a.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/a/bin/a.d.ts",
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
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/a/bin/a.d.ts.map: *new*
  {}
/b/bin/b.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /a/bin/a.d.ts: identitySourceMapConsumer *new*

ScriptInfos::
/a/bin/a.d.ts *changed*
    version: Text-1
    sourceMapFilePath: /a/bin/a.d.ts.map *changed*
    containingProjects: 1
        /dev/null/inferredProject1*
/a/bin/a.d.ts.map *new*
    version: Text-1
    declarationInfoPath: /a/bin/a.d.ts
    documentPositionMapper: false
    containingProjects: 0
/b/bin/b.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/user.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/user.ts",
        "line": 3,
        "offset": 39
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/bin/b.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/b/b.ts",
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
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/b/b.ts: *new*
  {}
/b/bin/b.d.ts:
  {}
/b/bin/b.d.ts.map: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 2 *changed*
        /a/bin/a.d.ts: identitySourceMapConsumer
        /b/bin/b.d.ts: DocumentPositionMapper1 *new*

ScriptInfos::
/a/bin/a.d.ts
    version: Text-1
    sourceMapFilePath: /a/bin/a.d.ts.map
    containingProjects: 1
        /dev/null/inferredProject1*
/a/bin/a.d.ts.map
    version: Text-1
    declarationInfoPath: /a/bin/a.d.ts
    documentPositionMapper: false
    containingProjects: 0
/b/b.ts *new*
    version: Text-1
    containingProjects: 0
/b/bin/b.d.ts *changed*
    version: Text-1
    sourceMapFilePath: /b/bin/b.d.ts.map *changed*
    containingProjects: 1
        /dev/null/inferredProject1*
/b/bin/b.d.ts.map *new*
    version: Text-1
    declarationInfoPath: /b/bin/b.d.ts
    sourceInfos: 1
        /b/b.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/user/user.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

DocumentPositionMappers::
DocumentPositionMapper1 *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/user.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/user.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/b/b.ts:
  {}
/b/bin/b.d.ts:
  {}
/b/bin/b.d.ts.map:
  {}
/user/user.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*

ScriptInfos::
/a/bin/a.d.ts
    version: Text-1
    sourceMapFilePath: /a/bin/a.d.ts.map
    containingProjects: 1
        /dev/null/inferredProject1*
/a/bin/a.d.ts.map
    version: Text-1
    declarationInfoPath: /a/bin/a.d.ts
    documentPositionMapper: false
    containingProjects: 0
/b/b.ts
    version: Text-1
    containingProjects: 0
/b/bin/b.d.ts
    version: Text-1
    sourceMapFilePath: /b/bin/b.d.ts.map
    containingProjects: 1
        /dev/null/inferredProject1*
/b/bin/b.d.ts.map
    version: Text-1
    declarationInfoPath: /b/bin/b.d.ts
    sourceInfos: 1
        /b/b.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/user/user.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/dummy/dummy.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /dummy
Info seq  [hh:mm:ss:mss] For info: /dummy/dummy.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/dummy/dummy.ts SVC-1-0 "let a = 10;"


	dummy.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/bin/a.d.ts
	/b/bin/b.d.ts
	/user/user.ts


	../a/bin/a.d.ts
	  Imported via "../a/bin/a" from file 'user.ts'
	../b/bin/b.d.ts
	  Imported via "../b/bin/b" from file 'user.ts'
	user.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/user.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/bin/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /b/bin/b.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/bin/a.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /b/bin/b.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /b/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/bin/a.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/b/b.ts:
  {}
/b/bin/b.d.ts:
  {}
/b/bin/b.d.ts.map:
  {}
/user/user.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true
    documentPositionMappers: 0 *changed*
        /a/bin/a.d.ts: identitySourceMapConsumer *deleted*
        /b/bin/b.d.ts: DocumentPositionMapper1 *deleted*
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/bin/a.d.ts *deleted*
    version: Text-1
    sourceMapFilePath: /a/bin/a.d.ts.map
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/a/bin/a.d.ts.map *deleted*
    version: Text-1
    declarationInfoPath: /a/bin/a.d.ts
    documentPositionMapper: false
    containingProjects: 0
/b/b.ts *deleted*
    version: Text-1
    containingProjects: 0
/b/bin/b.d.ts *deleted*
    version: Text-1
    sourceMapFilePath: /b/bin/b.d.ts.map
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/b/bin/b.d.ts.map *deleted*
    version: Text-1
    declarationInfoPath: /b/bin/b.d.ts
    sourceInfos: 1
        /b/b.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/dummy/dummy.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/user/user.ts *deleted*
    version: SVC-1-0
    containingProjects: 0

DocumentPositionMappers::
DocumentPositionMapper1 *deleted*
