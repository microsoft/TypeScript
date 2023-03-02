Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/project/a.ts]
export const a = 10;

//// [/project/b.ts]
export const b = 10;

//// [/project/tsconfig.json]
{}

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


Info 1    [00:00:18.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:19.000] Search path: /project
Info 3    [00:00:20.000] For info: /project/a.ts :: Config file name: /project/tsconfig.json
Info 4    [00:00:21.000] Creating configuration project /project/tsconfig.json
Info 5    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /project/tsconfig.json 2000 undefined Project: /project/tsconfig.json WatchType: Config file
Info 6    [00:00:23.000] Config: /project/tsconfig.json : {
 "rootNames": [
  "/project/a.ts",
  "/project/b.ts"
 ],
 "options": {
  "configFilePath": "/project/tsconfig.json"
 }
}
Info 7    [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:27.000] Starting updateGraphWorker: Project: /project/tsconfig.json
Info 11   [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /project/node_modules/@types 1 undefined Project: /project/tsconfig.json WatchType: Type roots
Info 13   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/node_modules/@types 1 undefined Project: /project/tsconfig.json WatchType: Type roots
Info 14   [00:00:31.000] Finishing updateGraphWorker: Project: /project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:32.000] Project '/project/tsconfig.json' (Configured)
Info 16   [00:00:33.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/project/a.ts SVC-1-0 "export const a = 10;"
	/project/b.ts Text-1 "export const b = 10;"


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:34.000] -----------------------------------------------
Info 18   [00:00:35.000] Project '/project/tsconfig.json' (Configured)
Info 18   [00:00:36.000] 	Files (3)

Info 18   [00:00:37.000] -----------------------------------------------
Info 18   [00:00:38.000] Open files: 
Info 18   [00:00:39.000] 	FileName: /project/a.ts ProjectRootPath: undefined
Info 18   [00:00:40.000] 		Projects: /project/tsconfig.json
Info 18   [00:00:41.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/project/tsconfig.json: *new*
  {}
/project/b.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/project: *new*
  {}

Before request

Info 19   [00:00:42.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:43.000] FileWatcher:: Close:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:44.000] Search path: /project
Info 22   [00:00:45.000] For info: /project/b.ts :: Config file name: /project/tsconfig.json
Info 23   [00:00:46.000] Project '/project/tsconfig.json' (Configured)
Info 23   [00:00:47.000] 	Files (3)

Info 23   [00:00:48.000] -----------------------------------------------
Info 23   [00:00:49.000] Open files: 
Info 23   [00:00:50.000] 	FileName: /project/a.ts ProjectRootPath: undefined
Info 23   [00:00:51.000] 		Projects: /project/tsconfig.json
Info 23   [00:00:52.000] 	FileName: /project/b.ts ProjectRootPath: undefined
Info 23   [00:00:53.000] 		Projects: /project/tsconfig.json
Info 23   [00:00:54.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/project/b.ts:
  {}

FsWatchesRecursive::
/project:
  {}

Before request

Info 24   [00:00:55.000] request:
    {
      "command": "applyChangedToOpenFiles",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/project/a.ts",
            "changes": [
              {
                "span": {
                  "start": 0,
                  "length": 0
                },
                "newText": "export const y = 10;"
              }
            ]
          }
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 25   [00:00:56.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Info 26   [00:00:57.000] Starting updateGraphWorker: Project: /project/tsconfig.json
Info 27   [00:00:58.000] Finishing updateGraphWorker: Project: /project/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 28   [00:00:59.000] Project '/project/tsconfig.json' (Configured)
Info 29   [00:01:00.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/project/a.ts SVC-1-1 "export const y = 10;export const a = 10;"
	/project/b.ts Text-1 "export const b = 10;"

Info 30   [00:01:01.000] -----------------------------------------------
Before request

Info 31   [00:01:02.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/project/b.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 32   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Info 33   [00:01:04.000] Project '/project/tsconfig.json' (Configured)
Info 33   [00:01:05.000] 	Files (3)

Info 33   [00:01:06.000] -----------------------------------------------
Info 33   [00:01:07.000] Open files: 
Info 33   [00:01:08.000] 	FileName: /project/a.ts ProjectRootPath: undefined
Info 33   [00:01:09.000] 		Projects: /project/tsconfig.json
Info 33   [00:01:10.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/project/b.ts: *new*
  {}

FsWatchesRecursive::
/project:
  {}

Info 34   [00:01:11.000] Starting updateGraphWorker: Project: /project/tsconfig.json
Info 35   [00:01:12.000] Finishing updateGraphWorker: Project: /project/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 36   [00:01:13.000] Same program as before
Info 37   [00:01:16.000] FileWatcher:: Triggered with /project/b.ts 1:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Info 38   [00:01:17.000] Scheduled: /project/tsconfig.json
Info 39   [00:01:18.000] Scheduled: *ensureProjectForOpenFiles*
Info 40   [00:01:19.000] Elapsed:: *ms FileWatcher:: Triggered with /project/b.ts 1:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Before running timeout callbacks
//// [/project/b.ts]
export const b = 10;export const x = 10;


Info 41   [00:01:20.000] Running: /project/tsconfig.json
Info 42   [00:01:21.000] Starting updateGraphWorker: Project: /project/tsconfig.json
Info 43   [00:01:22.000] Finishing updateGraphWorker: Project: /project/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 44   [00:01:23.000] Project '/project/tsconfig.json' (Configured)
Info 45   [00:01:24.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/project/a.ts SVC-1-1 "export const y = 10;export const a = 10;"
	/project/b.ts Text-2 "export const b = 10;export const x = 10;"

Info 46   [00:01:25.000] -----------------------------------------------
Info 47   [00:01:26.000] Running: *ensureProjectForOpenFiles*
Info 48   [00:01:27.000] Before ensureProjectForOpenFiles:
Info 49   [00:01:28.000] Project '/project/tsconfig.json' (Configured)
Info 49   [00:01:29.000] 	Files (3)

Info 49   [00:01:30.000] -----------------------------------------------
Info 49   [00:01:31.000] Open files: 
Info 49   [00:01:32.000] 	FileName: /project/a.ts ProjectRootPath: undefined
Info 49   [00:01:33.000] 		Projects: /project/tsconfig.json
Info 49   [00:01:34.000] After ensureProjectForOpenFiles:
Info 50   [00:01:35.000] Project '/project/tsconfig.json' (Configured)
Info 50   [00:01:36.000] 	Files (3)

Info 50   [00:01:37.000] -----------------------------------------------
Info 50   [00:01:38.000] Open files: 
Info 50   [00:01:39.000] 	FileName: /project/a.ts ProjectRootPath: undefined
Info 50   [00:01:40.000] 		Projects: /project/tsconfig.json
After running timeout callbacks
