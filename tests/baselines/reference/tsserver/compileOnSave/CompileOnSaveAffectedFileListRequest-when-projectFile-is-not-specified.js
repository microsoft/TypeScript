Info 0    [00:00:33.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
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

//// [/user/username/projects/myproject/core/core.ts]
let z = 10;

//// [/user/username/projects/myproject/app1/app.ts]
let x = 10;

//// [/user/username/projects/myproject/app2/app.ts]
let y = 10;

//// [/user/username/projects/myproject/app1/tsconfig.json]
{"files":["app.ts","../core/core.ts"],"compilerOptions":{"outFile":"build/output.js"},"compileOnSave":true}

//// [/user/username/projects/myproject/app2/tsconfig.json]
{"files":["app.ts","../core/core.ts"],"compilerOptions":{"outFile":"build/output.js"},"compileOnSave":true}


Info 1    [00:00:34.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/app1/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:35.000] Search path: /user/username/projects/myproject/app1
Info 3    [00:00:36.000] For info: /user/username/projects/myproject/app1/app.ts :: Config file name: /user/username/projects/myproject/app1/tsconfig.json
Info 4    [00:00:37.000] Creating configuration project /user/username/projects/myproject/app1/tsconfig.json
Info 5    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Config file
Info 6    [00:00:39.000] Config: /user/username/projects/myproject/app1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app1/app.ts",
  "/user/username/projects/myproject/core/core.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/myproject/app1/build/output.js",
  "configFilePath": "/user/username/projects/myproject/app1/tsconfig.json"
 }
}
Info 7    [00:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/core.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:41.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/app1/tsconfig.json
Info 9    [00:00:42.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info 11   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info 12   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info 13   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info 14   [00:00:47.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:48.000] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info 16   [00:00:49.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/app1/app.ts SVC-1-0 "let x = 10;"
	/user/username/projects/myproject/core/core.ts Text-1 "let z = 10;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Part of 'files' list in tsconfig.json
	../core/core.ts
	  Part of 'files' list in tsconfig.json

Info 17   [00:00:50.000] -----------------------------------------------
Info 18   [00:00:51.000] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info 18   [00:00:52.000] 	Files (3)

Info 18   [00:00:53.000] -----------------------------------------------
Info 18   [00:00:54.000] Open files: 
Info 18   [00:00:55.000] 	FileName: /user/username/projects/myproject/app1/app.ts ProjectRootPath: undefined
Info 18   [00:00:56.000] 		Projects: /user/username/projects/myproject/app1/tsconfig.json
Info 18   [00:00:57.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/app1/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/app1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/core/core.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 19   [00:00:58.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/app2/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:59.000] Search path: /user/username/projects/myproject/app2
Info 21   [00:01:00.000] For info: /user/username/projects/myproject/app2/app.ts :: Config file name: /user/username/projects/myproject/app2/tsconfig.json
Info 22   [00:01:01.000] Creating configuration project /user/username/projects/myproject/app2/tsconfig.json
Info 23   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Config file
Info 24   [00:01:03.000] Config: /user/username/projects/myproject/app2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app2/app.ts",
  "/user/username/projects/myproject/core/core.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/myproject/app2/build/output.js",
  "configFilePath": "/user/username/projects/myproject/app2/tsconfig.json"
 }
}
Info 25   [00:01:04.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/app2/tsconfig.json
Info 26   [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info 27   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info 28   [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info 29   [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info 30   [00:01:09.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 31   [00:01:10.000] Project '/user/username/projects/myproject/app2/tsconfig.json' (Configured)
Info 32   [00:01:11.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/app2/app.ts SVC-1-0 "let y = 10;"
	/user/username/projects/myproject/core/core.ts Text-1 "let z = 10;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Part of 'files' list in tsconfig.json
	../core/core.ts
	  Part of 'files' list in tsconfig.json

Info 33   [00:01:12.000] -----------------------------------------------
Info 34   [00:01:13.000] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info 34   [00:01:14.000] 	Files (3)

Info 34   [00:01:15.000] -----------------------------------------------
Info 34   [00:01:16.000] Project '/user/username/projects/myproject/app2/tsconfig.json' (Configured)
Info 34   [00:01:17.000] 	Files (3)

Info 34   [00:01:18.000] -----------------------------------------------
Info 34   [00:01:19.000] Open files: 
Info 34   [00:01:20.000] 	FileName: /user/username/projects/myproject/app1/app.ts ProjectRootPath: undefined
Info 34   [00:01:21.000] 		Projects: /user/username/projects/myproject/app1/tsconfig.json
Info 34   [00:01:22.000] 	FileName: /user/username/projects/myproject/app2/app.ts ProjectRootPath: undefined
Info 34   [00:01:23.000] 		Projects: /user/username/projects/myproject/app2/tsconfig.json
Info 34   [00:01:24.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/app1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app2/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/app1/tsconfig.json:
  {}
/user/username/projects/myproject/core/core.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/app2/tsconfig.json: *new*
  {}

Before request

Info 35   [00:01:25.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/core/core.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 36   [00:01:26.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/core/core.ts 500 undefined WatchType: Closed Script info
Info 37   [00:01:27.000] Search path: /user/username/projects/myproject/core
Info 38   [00:01:28.000] For info: /user/username/projects/myproject/core/core.ts :: No config files found.
Info 39   [00:01:29.000] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info 39   [00:01:30.000] 	Files (3)

Info 39   [00:01:31.000] -----------------------------------------------
Info 39   [00:01:32.000] Project '/user/username/projects/myproject/app2/tsconfig.json' (Configured)
Info 39   [00:01:33.000] 	Files (3)

Info 39   [00:01:34.000] -----------------------------------------------
Info 39   [00:01:35.000] Open files: 
Info 39   [00:01:36.000] 	FileName: /user/username/projects/myproject/app1/app.ts ProjectRootPath: undefined
Info 39   [00:01:37.000] 		Projects: /user/username/projects/myproject/app1/tsconfig.json
Info 39   [00:01:38.000] 	FileName: /user/username/projects/myproject/app2/app.ts ProjectRootPath: undefined
Info 39   [00:01:39.000] 		Projects: /user/username/projects/myproject/app2/tsconfig.json
Info 39   [00:01:40.000] 	FileName: /user/username/projects/myproject/core/core.ts ProjectRootPath: undefined
Info 39   [00:01:41.000] 		Projects: /user/username/projects/myproject/app1/tsconfig.json,/user/username/projects/myproject/app2/tsconfig.json
Info 39   [00:01:42.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/app1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app2/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/app1/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/app2/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/core/core.ts:
  {}

Before request

Info 40   [00:01:43.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/user/username/projects/myproject/app1/app.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "let k = 1"
      },
      "seq": 4,
      "type": "request"
    }
Info 41   [00:01:44.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 42   [00:01:45.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/user/username/projects/myproject/app2/app.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "let k = 1"
      },
      "seq": 5,
      "type": "request"
    }
Info 43   [00:01:46.000] response:
    {
      "responseRequired": false
    }
After request

Project1 is dirty: true
Project2 is dirty: true
Before request

Info 44   [00:01:47.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/core/core.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info 45   [00:01:48.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/app1/tsconfig.json
Info 46   [00:01:49.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app1/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 47   [00:01:50.000] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info 48   [00:01:51.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/app1/app.ts SVC-1-1 "let k = 1let x = 10;"
	/user/username/projects/myproject/core/core.ts Text-1 "let z = 10;"

Info 49   [00:01:52.000] -----------------------------------------------
Info 50   [00:01:53.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/app2/tsconfig.json
Info 51   [00:01:54.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app2/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 52   [00:01:55.000] Project '/user/username/projects/myproject/app2/tsconfig.json' (Configured)
Info 53   [00:01:56.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/app2/app.ts SVC-1-1 "let k = 1let y = 10;"
	/user/username/projects/myproject/core/core.ts Text-1 "let z = 10;"

Info 54   [00:01:57.000] -----------------------------------------------
Info 55   [00:01:58.000] Before ensureProjectForOpenFiles:
Info 56   [00:01:59.000] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info 56   [00:02:00.000] 	Files (3)

Info 56   [00:02:01.000] -----------------------------------------------
Info 56   [00:02:02.000] Project '/user/username/projects/myproject/app2/tsconfig.json' (Configured)
Info 56   [00:02:03.000] 	Files (3)

Info 56   [00:02:04.000] -----------------------------------------------
Info 56   [00:02:05.000] Open files: 
Info 56   [00:02:06.000] 	FileName: /user/username/projects/myproject/app1/app.ts ProjectRootPath: undefined
Info 56   [00:02:07.000] 		Projects: /user/username/projects/myproject/app1/tsconfig.json
Info 56   [00:02:08.000] 	FileName: /user/username/projects/myproject/app2/app.ts ProjectRootPath: undefined
Info 56   [00:02:09.000] 		Projects: /user/username/projects/myproject/app2/tsconfig.json
Info 56   [00:02:10.000] 	FileName: /user/username/projects/myproject/core/core.ts ProjectRootPath: undefined
Info 56   [00:02:11.000] 		Projects: /user/username/projects/myproject/app1/tsconfig.json,/user/username/projects/myproject/app2/tsconfig.json
Info 56   [00:02:12.000] After ensureProjectForOpenFiles:
Info 57   [00:02:13.000] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info 57   [00:02:14.000] 	Files (3)

Info 57   [00:02:15.000] -----------------------------------------------
Info 57   [00:02:16.000] Project '/user/username/projects/myproject/app2/tsconfig.json' (Configured)
Info 57   [00:02:17.000] 	Files (3)

Info 57   [00:02:18.000] -----------------------------------------------
Info 57   [00:02:19.000] Open files: 
Info 57   [00:02:20.000] 	FileName: /user/username/projects/myproject/app1/app.ts ProjectRootPath: undefined
Info 57   [00:02:21.000] 		Projects: /user/username/projects/myproject/app1/tsconfig.json
Info 57   [00:02:22.000] 	FileName: /user/username/projects/myproject/app2/app.ts ProjectRootPath: undefined
Info 57   [00:02:23.000] 		Projects: /user/username/projects/myproject/app2/tsconfig.json
Info 57   [00:02:24.000] 	FileName: /user/username/projects/myproject/core/core.ts ProjectRootPath: undefined
Info 57   [00:02:25.000] 		Projects: /user/username/projects/myproject/app1/tsconfig.json,/user/username/projects/myproject/app2/tsconfig.json
Info 57   [00:02:26.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/app1/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/core/core.ts"
          ],
          "projectUsesOutFile": true
        },
        {
          "projectFileName": "/user/username/projects/myproject/app2/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/core/core.ts"
          ],
          "projectUsesOutFile": true
        }
      ],
      "responseRequired": true
    }
After request

Project1 is dirty: false
Project2 is dirty: false