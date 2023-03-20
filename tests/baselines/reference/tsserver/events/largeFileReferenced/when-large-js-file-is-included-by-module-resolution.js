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

//// [/user/username/projects/myproject/src/large.js]
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
Info 9    [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/large 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 10   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/large 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 11   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 12   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 13   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/large.js 500 undefined WatchType: Closed Script info
Info 14   [00:00:37.000] Skipped loading contents of large file /user/username/projects/myproject/src/large.js for info /user/username/projects/myproject/src/large.js: fileSize: 4194305
Info 15   [00:00:38.000] event:
    {"seq":0,"type":"event","event":"largeFileReferenced","body":{"file":"/user/username/projects/myproject/src/large.js","fileSize":4194305,"maxFileSize":4194304}}
Info 16   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 18   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 19   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 20   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 21   [00:00:44.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:45.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:00:46.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/large.js Text-1 ""
	/user/username/projects/myproject/src/file.ts SVC-1-0 "export var y = 10;import {x} from \"./large\""


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	large.js
	  Imported via "./large" from file 'file.ts'
	file.ts
	  Root file specified for compilation

Info 24   [00:00:47.000] -----------------------------------------------
Info 25   [00:00:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:49.000] 	Files (3)

Info 25   [00:00:50.000] -----------------------------------------------
Info 25   [00:00:51.000] Open files: 
Info 25   [00:00:52.000] 	FileName: /user/username/projects/myproject/src/file.ts ProjectRootPath: undefined
Info 25   [00:00:53.000] 		Projects: /dev/null/inferredProject1*
Info 25   [00:00:54.000] response:
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
/user/username/projects/myproject/src/large: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/src/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/src/large.js: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
