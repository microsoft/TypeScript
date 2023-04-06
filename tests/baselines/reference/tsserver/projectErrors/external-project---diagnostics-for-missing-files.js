currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]


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


Info 1    [00:00:14.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/test.csproj",
        "options": {},
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          },
          {
            "fileName": "/a/b/applib.ts"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:16.000] Starting updateGraphWorker: Project: /a/b/test.csproj
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info 6    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/test.csproj WatchType: Type roots
Info 7    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/test.csproj WatchType: Type roots
Info 8    [00:00:21.000] Finishing updateGraphWorker: Project: /a/b/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:22.000] Project '/a/b/test.csproj' (External)
Info 10   [00:00:23.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts Text-1 ""


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation

Info 11   [00:00:24.000] -----------------------------------------------
Info 12   [00:00:25.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/applib.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 13   [00:00:26.000] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/test.csproj"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:27.000] response:
    {
      "response": [
        {
          "message": "File '/a/b/applib.ts' not found.\n  The file is in the program because:\n    Root file specified for compilation",
          "category": "error",
          "code": 6053
        }
      ],
      "responseRequired": true
    }
After request

Info 15   [00:00:29.000] FileWatcher:: Triggered with /a/b/app.ts 2:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:30.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:31.000] Scheduled: /a/b/test.csproj
Info 18   [00:00:32.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/app.ts 2:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:35.000] FileWatcher:: Triggered with /a/b/applib.ts 0:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info 20   [00:00:36.000] FileWatcher:: Close:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info 21   [00:00:37.000] Scheduled: /a/b/test.csproj, Cancelled earlier one
Info 22   [00:00:38.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/applib.ts 0:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Before request
//// [/a/b/applib.ts]


//// [/a/b/app.ts] deleted

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/applib.ts:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/app.ts:
  {}

Info 23   [00:00:39.000] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/test.csproj"
      },
      "seq": 3,
      "type": "request"
    }
Info 24   [00:00:40.000] Starting updateGraphWorker: Project: /a/b/test.csproj
Info 25   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/b/applib.ts 500 undefined WatchType: Closed Script info
Info 26   [00:00:42.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info 27   [00:00:43.000] Finishing updateGraphWorker: Project: /a/b/test.csproj Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:44.000] Project '/a/b/test.csproj' (External)
Info 29   [00:00:45.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/applib.ts Text-1 ""


	../lib/lib.d.ts
	  Default library for target 'es5'
	applib.ts
	  Root file specified for compilation

Info 30   [00:00:46.000] -----------------------------------------------
Info 31   [00:00:47.000] response:
    {
      "response": [
        {
          "message": "File '/a/b/app.ts' not found.\n  The file is in the program because:\n    Root file specified for compilation",
          "category": "error",
          "code": 6053
        }
      ],
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/app.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/b/applib.ts: *new*
  {}

Info 32   [00:00:50.000] FileWatcher:: Triggered with /a/b/app.ts 0:: WatchInfo: /a/b/app.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info 33   [00:00:51.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info 34   [00:00:52.000] Scheduled: /a/b/test.csproj, Cancelled earlier one
Info 35   [00:00:53.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/app.ts 0:: WatchInfo: /a/b/app.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Before request
//// [/a/b/app.ts]



PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/app.ts:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/b/applib.ts:
  {}

Info 36   [00:00:54.000] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/test.csproj"
      },
      "seq": 4,
      "type": "request"
    }
Info 37   [00:00:55.000] Starting updateGraphWorker: Project: /a/b/test.csproj
Info 38   [00:00:56.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 39   [00:00:57.000] Finishing updateGraphWorker: Project: /a/b/test.csproj Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 40   [00:00:58.000] Project '/a/b/test.csproj' (External)
Info 41   [00:00:59.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/applib.ts Text-1 ""
	/a/b/app.ts Text-2 ""


	../lib/lib.d.ts
	  Default library for target 'es5'
	applib.ts
	  Root file specified for compilation
	app.ts
	  Root file specified for compilation

Info 42   [00:01:00.000] -----------------------------------------------
Info 43   [00:01:01.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/b/applib.ts:
  {}
/a/b/app.ts: *new*
  {}
