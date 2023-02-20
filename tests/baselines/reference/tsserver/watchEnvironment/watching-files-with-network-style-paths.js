Info 0    [00:00:15.000] For files of style c:/myprojects/project/x.js
Info 1    [00:00:16.000] Provided types map file "c:/a/lib/typesMap.json" doesn't exist
Info 2    [00:00:17.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [c:/a/lib/lib.d.ts]
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

//// [c:/myprojects/project/x.js]
const x = 10


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 3    [00:00:18.000] Search path: c:/myprojects/project
Info 4    [00:00:19.000] For info: c:/myprojects/project/x.js :: No config files found.
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: c:/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:21.000] FileWatcher:: Added:: WatchInfo: c:/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 8    [00:00:23.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 10   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:28.000] 	Files (2)
	c:/a/lib/lib.d.ts
	c:/myprojects/project/x.js


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 14   [00:00:29.000] -----------------------------------------------
Info 15   [00:00:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:00:31.000] 	Files (2)

Info 15   [00:00:32.000] -----------------------------------------------
Info 15   [00:00:33.000] Open files: 
Info 15   [00:00:34.000] 	FileName: c:/myprojects/project/x.js ProjectRootPath: undefined
Info 15   [00:00:35.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
c:/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
c:/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
c:/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
c:/myprojects/project/bower_components:
  {"pollingInterval":500}
c:/myprojects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
c:/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 15   [00:00:36.000] response:
    {
      "responseRequired": false
    }
Info 16   [00:00:17.000] For files of style //vda1cs4850/myprojects/project/x.js
Info 17   [00:00:18.000] Provided types map file "//vda1cs4850/a/lib/typesMap.json" doesn't exist
Info 18   [00:00:19.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [//vda1cs4850/a/lib/lib.d.ts]
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

//// [//vda1cs4850/vda1cs4850/myprojects/project/x.js]
const x = 10


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 19   [00:00:20.000] Search path: //vda1cs4850/myprojects/project
Info 20   [00:00:21.000] For info: //vda1cs4850/myprojects/project/x.js :: No config files found.
Info 21   [00:00:22.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 22   [00:00:23.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 23   [00:00:24.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 24   [00:00:25.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 25   [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 26   [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 27   [00:00:28.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:29.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:00:30.000] 	Files (2)
	//vda1cs4850/a/lib/lib.d.ts
	//vda1cs4850/myprojects/project/x.js


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 30   [00:00:31.000] -----------------------------------------------
Info 31   [00:00:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:00:33.000] 	Files (2)

Info 31   [00:00:34.000] -----------------------------------------------
Info 31   [00:00:35.000] Open files: 
Info 31   [00:00:36.000] 	FileName: //vda1cs4850/myprojects/project/x.js ProjectRootPath: undefined
Info 31   [00:00:37.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
//vda1cs4850/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/myprojects/project/bower_components:
  {"pollingInterval":500}
//vda1cs4850/myprojects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
//vda1cs4850/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 31   [00:00:38.000] response:
    {
      "responseRequired": false
    }
Info 32   [00:00:19.000] For files of style //vda1cs4850/c$/myprojects/project/x.js
Info 33   [00:00:20.000] Provided types map file "//vda1cs4850/a/lib/typesMap.json" doesn't exist
Info 34   [00:00:21.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/c$/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [//vda1cs4850/a/lib/lib.d.ts]
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

//// [//vda1cs4850/vda1cs4850/c$/myprojects/project/x.js]
const x = 10


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 35   [00:00:22.000] Search path: //vda1cs4850/c$/myprojects/project
Info 36   [00:00:23.000] For info: //vda1cs4850/c$/myprojects/project/x.js :: No config files found.
Info 37   [00:00:24.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 38   [00:00:25.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 39   [00:00:26.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 40   [00:00:27.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 41   [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 42   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 43   [00:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [00:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 45   [00:00:32.000] 	Files (2)
	//vda1cs4850/a/lib/lib.d.ts
	//vda1cs4850/c$/myprojects/project/x.js


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 46   [00:00:33.000] -----------------------------------------------
Info 47   [00:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 47   [00:00:35.000] 	Files (2)

Info 47   [00:00:36.000] -----------------------------------------------
Info 47   [00:00:37.000] Open files: 
Info 47   [00:00:38.000] 	FileName: //vda1cs4850/c$/myprojects/project/x.js ProjectRootPath: undefined
Info 47   [00:00:39.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
//vda1cs4850/c$/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/bower_components:
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
//vda1cs4850/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 47   [00:00:40.000] response:
    {
      "responseRequired": false
    }
Info 48   [00:00:19.000] For files of style c:/users/username/myprojects/project/x.js
Info 49   [00:00:20.000] Provided types map file "c:/a/lib/typesMap.json" doesn't exist
Info 50   [00:00:21.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/users/username/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [c:/a/lib/lib.d.ts]
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

//// [c:/users/username/myprojects/project/x.js]
const x = 10


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 51   [00:00:22.000] Search path: c:/users/username/myprojects/project
Info 52   [00:00:23.000] For info: c:/users/username/myprojects/project/x.js :: No config files found.
Info 53   [00:00:24.000] FileWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 54   [00:00:25.000] FileWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 55   [00:00:26.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 56   [00:00:27.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 57   [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 58   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 59   [00:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 60   [00:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 61   [00:00:32.000] 	Files (2)
	c:/a/lib/lib.d.ts
	c:/users/username/myprojects/project/x.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 62   [00:00:33.000] -----------------------------------------------
Info 63   [00:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 63   [00:00:35.000] 	Files (2)

Info 63   [00:00:36.000] -----------------------------------------------
Info 63   [00:00:37.000] Open files: 
Info 63   [00:00:38.000] 	FileName: c:/users/username/myprojects/project/x.js ProjectRootPath: undefined
Info 63   [00:00:39.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
c:/users/username/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
c:/users/username/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
c:/users/username/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
c:/users/username/myprojects/project/bower_components:
  {"pollingInterval":500}
c:/users/username/myprojects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
c:/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 63   [00:00:40.000] response:
    {
      "responseRequired": false
    }
Info 64   [00:00:23.000] For files of style //vda1cs4850/c$/users/username/myprojects/project/x.js
Info 65   [00:00:24.000] Provided types map file "//vda1cs4850/a/lib/typesMap.json" doesn't exist
Info 66   [00:00:25.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/c$/users/username/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [//vda1cs4850/a/lib/lib.d.ts]
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

//// [//vda1cs4850/vda1cs4850/c$/users/username/myprojects/project/x.js]
const x = 10


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 67   [00:00:26.000] Search path: //vda1cs4850/c$/users/username/myprojects/project
Info 68   [00:00:27.000] For info: //vda1cs4850/c$/users/username/myprojects/project/x.js :: No config files found.
Info 69   [00:00:28.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 70   [00:00:29.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 71   [00:00:30.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 72   [00:00:31.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 73   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 74   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 75   [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 76   [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 77   [00:00:36.000] 	Files (2)
	//vda1cs4850/a/lib/lib.d.ts
	//vda1cs4850/c$/users/username/myprojects/project/x.js


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 78   [00:00:37.000] -----------------------------------------------
Info 79   [00:00:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 79   [00:00:39.000] 	Files (2)

Info 79   [00:00:40.000] -----------------------------------------------
Info 79   [00:00:41.000] Open files: 
Info 79   [00:00:42.000] 	FileName: //vda1cs4850/c$/users/username/myprojects/project/x.js ProjectRootPath: undefined
Info 79   [00:00:43.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
//vda1cs4850/c$/users/username/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/users/username/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/users/username/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/bower_components:
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
//vda1cs4850/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 79   [00:00:44.000] response:
    {
      "responseRequired": false
    }