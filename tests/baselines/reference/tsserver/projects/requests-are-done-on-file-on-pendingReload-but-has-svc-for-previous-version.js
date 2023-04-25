currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/src/file1.ts]
import { y } from "./file2"; let x = 10;

//// [/user/username/projects/myproject/src/file2.ts]
export let y = 10;

//// [/a/lib/lib.d.ts]
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

//// [/user/username/projects/myproject/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/file2.ts",
        "fileContent": "export let y = 10;"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/file2.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/file2.ts SVC-1-0 "export let y = 10;"
	/user/username/projects/myproject/src/file1.ts Text-1 "import { y } from \"./file2\"; let x = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/file2.ts
	  Imported via "./file2" from file 'src/file1.ts'
	  Matched by default include pattern '**/*'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/src/file1.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/src/file1.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/src/file2.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/file2.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Before request
//// [/user/username/projects/myproject/src/file2.ts]
export let y = 10;export let z = 10;


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getApplicableRefactors",
      "arguments": {
        "file": "/user/username/projects/myproject/src/file2.ts",
        "startLine": 1,
        "startOffset": 12,
        "endLine": 1,
        "endOffset": 13
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/file2.ts Text-2 "export let y = 10;export let z = 10;"
	/user/username/projects/myproject/src/file1.ts Text-1 "import { y } from \"./file2\"; let x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
