currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.ts]
import { Foo } from "a";

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/a/dist/index.d.ts]
export declare class Foo {
    bar: any;
}
//# sourceMappingURL=index.d.ts.map

//// [/node_modules/a/dist/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../src/index.ts"],"names":[],"mappings":"AAAA,qBAAa,GAAG;IACZ,GAAG,MAAC;CACP"}

//// [/node_modules/a/package.json]
{
    "name": "a",
    "version": "0.0.0",
    "private": true,
    "main": "dist",
    "types": "dist"
}

//// [/node_modules/a/src/index.ts]
export class Foo {
}



Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/node_modules/a/dist/index.d.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /node_modules/a/dist/index.d.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/a/dist/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules/a/dist/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules/a/dist/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/a/dist/index.d.ts SVC-1-0 "export declare class Foo {\n    bar: any;\n}\n//# sourceMappingURL=index.d.ts.map"


	../../../lib.d.ts
	  Default library for target 'es5'
	../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../lib.d.ts'
	../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../lib.d.ts'
	index.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/a/dist/index.d.ts ProjectRootPath: undefined
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
/node_modules/a/dist/package.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/node_modules/a/dist/node_modules/@types: *new*
  {}

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
/node_modules/a/dist/index.d.ts (Open) *new*
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/a/dist/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/a/dist/index.d.ts SVC-1-0 "export declare class Foo {\n    bar: any;\n}\n//# sourceMappingURL=index.d.ts.map"
	/index.ts SVC-1-0 "import { Foo } from \"a\";"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	node_modules/a/dist/index.d.ts
	  Imported via "a" from file 'index.ts' with packageId 'a/dist/index.d.ts@0.0.0'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts
	/lib.decorators.d.ts
	/lib.decorators.legacy.d.ts
	/node_modules/a/dist/index.d.ts


	../../../lib.d.ts
	  Default library for target 'es5'
	../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../lib.d.ts'
	../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../lib.d.ts'
	index.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /node_modules/a/dist/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /node_modules/a/dist/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /node_modules/a/dist/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/a/dist/index.d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
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
/node_modules/a/dist/package.json:
  {"pollingInterval":2000} *new*

watchedFiles *deleted*::
/node_modules/a/dist/package.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive *deleted*::
/node_modules/a/dist/node_modules/@types:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *deleted*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isClosed: true *changed*
    isOrphan: true *changed*
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
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *new*
        /dev/null/inferredProject1* *deleted*
/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *new*
        /dev/null/inferredProject1* *deleted*
/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *new*
        /dev/null/inferredProject1* *deleted*
/node_modules/a/dist/index.d.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *default* *new*
        /dev/null/inferredProject1* *deleted*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "line": 1,
        "offset": 13
      },
      "command": "definition"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/a/dist/index.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/a/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "definition",
      "request_seq": 2,
      "success": true,
      "body": [
        {
          "file": "/node_modules/a/src/index.ts",
          "start": {
            "line": 1,
            "offset": 14
          },
          "end": {
            "line": 1,
            "offset": 17
          },
          "contextStart": {
            "line": 1,
            "offset": 1
          },
          "contextEnd": {
            "line": 3,
            "offset": 1
          }
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
/node_modules/a/dist/index.d.ts.map: *new*
  {"pollingInterval":500}
/node_modules/a/dist/package.json:
  {"pollingInterval":2000}
/node_modules/a/src/index.ts: *new*
  {"pollingInterval":500}

Projects::
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /node_modules/a/dist/index.d.ts: DocumentPositionMapper1 *new*

ScriptInfos::
/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
/node_modules/a/dist/index.d.ts (Open) *changed*
    version: SVC-1-0
    sourceMapFilePath: /node_modules/a/dist/index.d.ts.map *changed*
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/node_modules/a/dist/index.d.ts.map *new*
    version: Text-1
    declarationInfoPath: /node_modules/a/dist/index.d.ts
    sourceInfos: 1
        /node_modules/a/src/index.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/node_modules/a/src/index.ts *new*
    version: Text-1
    containingProjects: 0

DocumentPositionMappers::
DocumentPositionMapper1 *new*
