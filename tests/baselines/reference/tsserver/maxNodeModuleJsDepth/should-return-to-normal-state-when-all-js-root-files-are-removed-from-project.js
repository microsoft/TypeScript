currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/file1.ts]
let x =1;

//// [/a/file2.js]
let x =1;

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
      "command": "open",
      "arguments": {
        "file": "/a/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] Search path: /a
Info 3    [00:00:16.000] For info: /a/file1.ts :: No config files found.
Info 4    [00:00:17.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:19.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:20.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:21.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/file1.ts SVC-1-0 "let x =1;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	a/file1.ts
	  Root file specified for compilation

Info 9    [00:00:22.000] -----------------------------------------------
Info 10   [00:00:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:24.000] 	Files (2)

Info 10   [00:00:25.000] -----------------------------------------------
Info 10   [00:00:26.000] Open files: 
Info 10   [00:00:27.000] 	FileName: /a/file1.ts ProjectRootPath: undefined
Info 10   [00:00:28.000] 		Projects: /dev/null/inferredProject1*
Info 10   [00:00:29.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

maxNodeModuleJsDepth: undefined
Before request

Info 11   [00:00:30.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/file2.js"
      },
      "seq": 2,
      "type": "request"
    }
Info 12   [00:00:31.000] Search path: /a
Info 13   [00:00:32.000] For info: /a/file2.js :: No config files found.
Info 14   [00:00:33.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 15   [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 17   [00:00:36.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/file1.ts SVC-1-0 "let x =1;"
	/a/file2.js SVC-1-0 "let x =1;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	a/file1.ts
	  Root file specified for compilation
	a/file2.js
	  Root file specified for compilation

Info 18   [00:00:37.000] -----------------------------------------------
Info 19   [00:00:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 19   [00:00:39.000] 	Files (3)

Info 19   [00:00:40.000] -----------------------------------------------
Info 19   [00:00:41.000] Open files: 
Info 19   [00:00:42.000] 	FileName: /a/file1.ts ProjectRootPath: undefined
Info 19   [00:00:43.000] 		Projects: /dev/null/inferredProject1*
Info 19   [00:00:44.000] 	FileName: /a/file2.js ProjectRootPath: undefined
Info 19   [00:00:45.000] 		Projects: /dev/null/inferredProject1*
Info 19   [00:00:46.000] response:
    {
      "responseRequired": false
    }
After request

maxNodeModuleJsDepth: 2
Before request

Info 20   [00:00:47.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file2.js"
      },
      "seq": 3,
      "type": "request"
    }
Info 21   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /a/file2.js 500 undefined WatchType: Closed Script info
Info 22   [00:00:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 22   [00:00:50.000] 	Files (3)

Info 22   [00:00:51.000] -----------------------------------------------
Info 22   [00:00:52.000] Open files: 
Info 22   [00:00:53.000] 	FileName: /a/file1.ts ProjectRootPath: undefined
Info 22   [00:00:54.000] 		Projects: /dev/null/inferredProject1*
Info 22   [00:00:55.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/file2.js: *new*
  {}

maxNodeModuleJsDepth: undefined