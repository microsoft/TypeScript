currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/Users/username/dev/project/index.ts]
import {x} from "file2";

//// [/Users/username/dev/project/file2.js]


//// [/Users/username/dev/project/types/file2/index.d.ts]
export declare const x: string;

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

//// [/Users/username/dev/project/tsconfig.json]
{"extends":"./tsconfig.all.json"}

//// [/Users/username/dev/project/tsconfig.all.json]
{"compilerOptions":{"baseUrl":".","paths":{"file2":["./file2.js"]},"typeRoots":["./types"],"forceConsistentCasingInFileNames":true}}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/Users/username/dev/project/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /Users/username/dev/project
Info seq  [hh:mm:ss:mss] For info: /Users/username/dev/project/index.ts :: Config file name: /Users/username/dev/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /Users/username/dev/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Users/username/dev/project/tsconfig.json 2000 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /Users/username/dev/project/tsconfig.json : {
 "rootNames": [
  "/Users/username/dev/project/index.ts",
  "/Users/username/dev/project/types/file2/index.d.ts"
 ],
 "options": {
  "baseUrl": "/Users/username/dev/project",
  "paths": {
   "file2": [
    "./file2.js"
   ]
  },
  "typeRoots": [
   "/Users/username/dev/project/types"
  ],
  "forceConsistentCasingInFileNames": true,
  "pathsBasePath": "/Users/username/dev/project",
  "configFilePath": "/Users/username/dev/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Users/username/dev/project/tsconfig.all.json 2000 undefined Config: /Users/username/dev/project/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/dev/project 1 undefined Config: /Users/username/dev/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/dev/project 1 undefined Config: /Users/username/dev/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Users/username/dev/project/types/file2/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Users/username/dev/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Users/username/dev/project/types 1 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/username/dev/project/types 1 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Users/username/dev/project/types 1 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/username/dev/project/types 1 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Users/username/dev/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Users/username/dev/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/Users/username/dev/project/index.ts SVC-1-0 "import {x} from \"file2\";"
	/Users/username/dev/project/types/file2/index.d.ts Text-1 "export declare const x: string;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by default include pattern '**/*'
	types/file2/index.d.ts
	  Matched by default include pattern '**/*'
	  Entry point for implicit type library 'file2'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/Users/username/dev/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Users/username/dev/project/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/username/dev/project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/dev/project/tsconfig.all.json: *new*
  {}
/users/username/dev/project/tsconfig.json: *new*
  {}
/users/username/dev/project/types/file2/index.d.ts: *new*
  {}

FsWatchesRecursive::
/users/username/dev/project: *new*
  {}
/users/username/dev/project/types: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/Users/username/dev/project/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
