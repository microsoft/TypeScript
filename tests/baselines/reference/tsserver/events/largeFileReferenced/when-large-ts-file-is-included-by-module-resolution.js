Info 0    [00:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/src/file.ts]
export var y = 10;import {x} from "./large"

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

//// [/user/username/projects/myproject/src/large.ts]
export var x = 10;


Info 1    [00:00:24.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/file.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:25.000] Search path: /user/username/projects/myproject/src
Info 3    [00:00:26.000] For info: /user/username/projects/myproject/src/file.ts :: No config files found.
Info 4    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [00:00:31.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 9    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/large.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 13   [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 14   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 15   [00:00:38.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 17   [00:00:40.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/large.ts Text-1 "export var x = 10;"
	/user/username/projects/myproject/src/file.ts SVC-1-0 "export var y = 10;import {x} from \"./large\""


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	large.ts
	  Imported via "./large" from file 'file.ts'
	file.ts
	  Root file specified for compilation

Info 18   [00:00:41.000] -----------------------------------------------
Info 19   [00:00:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 19   [00:00:43.000] 	Files (3)

Info 19   [00:00:44.000] -----------------------------------------------
Info 19   [00:00:45.000] Open files: 
Info 19   [00:00:46.000] 	FileName: /user/username/projects/myproject/src/file.ts ProjectRootPath: undefined
Info 19   [00:00:47.000] 		Projects: /dev/null/inferredProject1*
Info 19   [00:00:48.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/src/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/large.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
