currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]


//// [/a/b/tsconfig.json]
{"files":["app.ts","applib.ts"]}

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


Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] Search path: /a/b
Info 3    [00:00:18.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:19.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:21.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts",
  "/a/b/applib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:22.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 8    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 10   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:27.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:28.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:29.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 ""


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Part of 'files' list in tsconfig.json

Info 15   [00:00:30.000] -----------------------------------------------
Info 16   [00:00:31.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:32.000] 	Files (2)

Info 16   [00:00:33.000] -----------------------------------------------
Info 16   [00:00:34.000] Open files: 
Info 16   [00:00:35.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 16   [00:00:36.000] 		Projects: /a/b/tsconfig.json
Info 16   [00:00:37.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/applib.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 17   [00:00:38.000] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Info 18   [00:00:39.000] response:
    {
      "response": [
        {
          "message": "File '/a/b/applib.ts' not found.\n  The file is in the program because:\n    Part of 'files' list in tsconfig.json",
          "category": "error",
          "code": 6053,
          "relatedInformation": [
            {
              "span": {
                "start": {
                  "line": 1,
                  "offset": 20
                },
                "end": {
                  "line": 1,
                  "offset": 31
                },
                "file": "/a/b/tsconfig.json"
              },
              "message": "File is matched by 'files' list specified here.",
              "category": "message",
              "code": 1410
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Info 19   [00:00:42.000] FileWatcher:: Triggered with /a/b/applib.ts 0:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 20   [00:00:43.000] FileWatcher:: Close:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 21   [00:00:44.000] Scheduled: /a/b/tsconfig.json
Info 22   [00:00:45.000] Scheduled: *ensureProjectForOpenFiles*
Info 23   [00:00:46.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/applib.ts 0:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Before request
//// [/a/b/applib.ts]



PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/applib.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

Info 24   [00:00:47.000] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info 25   [00:00:48.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 26   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /a/b/applib.ts 500 undefined WatchType: Closed Script info
Info 27   [00:00:50.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:51.000] Project '/a/b/tsconfig.json' (Configured)
Info 29   [00:00:52.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 ""
	/a/b/applib.ts Text-1 ""


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Part of 'files' list in tsconfig.json
	applib.ts
	  Part of 'files' list in tsconfig.json

Info 30   [00:00:53.000] -----------------------------------------------
Info 31   [00:00:54.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/applib.ts: *new*
  {}
