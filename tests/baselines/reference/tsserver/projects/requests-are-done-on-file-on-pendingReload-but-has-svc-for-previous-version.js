currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info 1    [00:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/file2.ts",
        "fileContent": "export let y = 10;"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:27.000] Search path: /user/username/projects/myproject/src
Info 3    [00:00:28.000] For info: /user/username/projects/myproject/src/file2.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:29.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:31.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/file1.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:35.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 11   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:39.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 16   [00:00:41.000] 	Files (3)
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

Info 17   [00:00:42.000] -----------------------------------------------
Info 18   [00:00:43.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 18   [00:00:44.000] 	Files (3)

Info 18   [00:00:45.000] -----------------------------------------------
Info 18   [00:00:46.000] Open files: 
Info 18   [00:00:47.000] 	FileName: /user/username/projects/myproject/src/file2.ts ProjectRootPath: undefined
Info 18   [00:00:48.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 18   [00:00:49.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
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

Info 19   [00:00:50.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:51.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/file1.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:52.000] Search path: /user/username/projects/myproject/src
Info 22   [00:00:53.000] For info: /user/username/projects/myproject/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 23   [00:00:54.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 23   [00:00:55.000] 	Files (3)

Info 23   [00:00:56.000] -----------------------------------------------
Info 23   [00:00:57.000] Open files: 
Info 23   [00:00:58.000] 	FileName: /user/username/projects/myproject/src/file2.ts ProjectRootPath: undefined
Info 23   [00:00:59.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 23   [00:01:00.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 23   [00:01:01.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 23   [00:01:02.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 24   [00:01:03.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/src/file2.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 25   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 26   [00:01:05.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 26   [00:01:06.000] 	Files (3)

Info 26   [00:01:07.000] -----------------------------------------------
Info 26   [00:01:08.000] Open files: 
Info 26   [00:01:09.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 26   [00:01:10.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 26   [00:01:11.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 27   [00:01:15.000] FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 28   [00:01:16.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 29   [00:01:17.000] Scheduled: *ensureProjectForOpenFiles*
Info 30   [00:01:18.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Before request
//// [/user/username/projects/myproject/src/file2.ts]
export let y = 10;export let z = 10;


Info 31   [00:01:19.000] request:
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
Info 32   [00:01:20.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 33   [00:01:21.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 34   [00:01:22.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 35   [00:01:23.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/file2.ts Text-2 "export let y = 10;export let z = 10;"
	/user/username/projects/myproject/src/file1.ts Text-1 "import { y } from \"./file2\"; let x = 10;"

Info 36   [00:01:24.000] -----------------------------------------------
Info 37   [00:01:25.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
