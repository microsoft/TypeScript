currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info 1    [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/Users/username/dev/project/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:33.000] Search path: /Users/username/dev/project
Info 3    [00:00:34.000] For info: /Users/username/dev/project/index.ts :: Config file name: /Users/username/dev/project/tsconfig.json
Info 4    [00:00:35.000] Creating configuration project /Users/username/dev/project/tsconfig.json
Info 5    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /Users/username/dev/project/tsconfig.json 2000 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Config file
Info 6    [00:00:37.000] Config: /Users/username/dev/project/tsconfig.json : {
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
Info 7    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /Users/username/dev/project/tsconfig.all.json 2000 undefined Config: /Users/username/dev/project/tsconfig.json WatchType: Extended config file
Info 8    [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/dev/project 1 undefined Config: /Users/username/dev/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/dev/project 1 undefined Config: /Users/username/dev/project/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /Users/username/dev/project/types/file2/index.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:42.000] Starting updateGraphWorker: Project: /Users/username/dev/project/tsconfig.json
Info 12   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /Users/username/dev/project/types 1 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/username/dev/project/types 1 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /Users/username/dev/project/types 1 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Type roots
Info 16   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/username/dev/project/types 1 undefined Project: /Users/username/dev/project/tsconfig.json WatchType: Type roots
Info 17   [00:00:48.000] Finishing updateGraphWorker: Project: /Users/username/dev/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:00:49.000] Project '/Users/username/dev/project/tsconfig.json' (Configured)
Info 19   [00:00:50.000] 	Files (3)
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

Info 20   [00:00:51.000] -----------------------------------------------
Info 21   [00:00:52.000] Project '/Users/username/dev/project/tsconfig.json' (Configured)
Info 21   [00:00:53.000] 	Files (3)

Info 21   [00:00:54.000] -----------------------------------------------
Info 21   [00:00:55.000] Open files: 
Info 21   [00:00:56.000] 	FileName: /Users/username/dev/project/index.ts ProjectRootPath: undefined
Info 21   [00:00:57.000] 		Projects: /Users/username/dev/project/tsconfig.json
Info 21   [00:00:58.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/users/username/dev/project/tsconfig.json: *new*
  {}
/users/username/dev/project/tsconfig.all.json: *new*
  {}
/users/username/dev/project/types/file2/index.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/users/username/dev/project: *new*
  {}
/users/username/dev/project/types: *new*
  {}

Before request

Info 22   [00:00:59.000] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/Users/username/dev/project/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Info 23   [00:01:00.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
