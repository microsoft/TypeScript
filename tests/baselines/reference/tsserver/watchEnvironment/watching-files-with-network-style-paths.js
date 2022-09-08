Info 0    [00:00:15.000] For files of style c:/myprojects/project/x.js
Info 1    [00:00:16.000] Provided types map file "c:/a/lib/typesMap.json" doesn't exist
Info 2    [00:00:17.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "c:/myprojects/project/x.js"
      }
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
Info 5    [00:00:20.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 6    [00:00:21.000] FileWatcher:: Added:: WatchInfo: c:/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:22.000] FileWatcher:: Added:: WatchInfo: c:/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [00:00:23.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 9    [00:00:24.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:27.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:28.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:29.000] 	Files (2)
	c:/a/lib/lib.d.ts
	c:/myprojects/project/x.js


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 15   [00:00:30.000] -----------------------------------------------
Info 16   [00:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:32.000] 	Files (2)

Info 16   [00:00:33.000] -----------------------------------------------
Info 16   [00:00:34.000] Open files: 
Info 16   [00:00:35.000] 	FileName: c:/myprojects/project/x.js ProjectRootPath: undefined
Info 16   [00:00:36.000] 		Projects: /dev/null/inferredProject1*
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

Info 16   [00:00:37.000] response:
    {
      "responseRequired": false
    }
Info 17   [00:00:17.000] For files of style //vda1cs4850/myprojects/project/x.js
Info 18   [00:00:18.000] Provided types map file "//vda1cs4850/a/lib/typesMap.json" doesn't exist
Info 19   [00:00:19.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/myprojects/project/x.js"
      }
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

Info 20   [00:00:20.000] Search path: //vda1cs4850/myprojects/project
Info 21   [00:00:21.000] For info: //vda1cs4850/myprojects/project/x.js :: No config files found.
Info 22   [00:00:22.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 23   [00:00:23.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 24   [00:00:24.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 25   [00:00:25.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 26   [00:00:26.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 27   [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 28   [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 29   [00:00:29.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:00:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:00:31.000] 	Files (2)
	//vda1cs4850/a/lib/lib.d.ts
	//vda1cs4850/myprojects/project/x.js


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 32   [00:00:32.000] -----------------------------------------------
Info 33   [00:00:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 33   [00:00:34.000] 	Files (2)

Info 33   [00:00:35.000] -----------------------------------------------
Info 33   [00:00:36.000] Open files: 
Info 33   [00:00:37.000] 	FileName: //vda1cs4850/myprojects/project/x.js ProjectRootPath: undefined
Info 33   [00:00:38.000] 		Projects: /dev/null/inferredProject1*
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

Info 33   [00:00:39.000] response:
    {
      "responseRequired": false
    }
Info 34   [00:00:19.000] For files of style //vda1cs4850/c$/myprojects/project/x.js
Info 35   [00:00:20.000] Provided types map file "//vda1cs4850/a/lib/typesMap.json" doesn't exist
Info 36   [00:00:21.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/c$/myprojects/project/x.js"
      }
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

Info 37   [00:00:22.000] Search path: //vda1cs4850/c$/myprojects/project
Info 38   [00:00:23.000] For info: //vda1cs4850/c$/myprojects/project/x.js :: No config files found.
Info 39   [00:00:24.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 40   [00:00:25.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 41   [00:00:26.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 42   [00:00:27.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 43   [00:00:28.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 44   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 45   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 46   [00:00:31.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 47   [00:00:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 48   [00:00:33.000] 	Files (2)
	//vda1cs4850/a/lib/lib.d.ts
	//vda1cs4850/c$/myprojects/project/x.js


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 49   [00:00:34.000] -----------------------------------------------
Info 50   [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 50   [00:00:36.000] 	Files (2)

Info 50   [00:00:37.000] -----------------------------------------------
Info 50   [00:00:38.000] Open files: 
Info 50   [00:00:39.000] 	FileName: //vda1cs4850/c$/myprojects/project/x.js ProjectRootPath: undefined
Info 50   [00:00:40.000] 		Projects: /dev/null/inferredProject1*
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

Info 50   [00:00:41.000] response:
    {
      "responseRequired": false
    }
Info 51   [00:00:19.000] For files of style c:/users/username/myprojects/project/x.js
Info 52   [00:00:20.000] Provided types map file "c:/a/lib/typesMap.json" doesn't exist
Info 53   [00:00:21.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "c:/users/username/myprojects/project/x.js"
      }
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

Info 54   [00:00:22.000] Search path: c:/users/username/myprojects/project
Info 55   [00:00:23.000] For info: c:/users/username/myprojects/project/x.js :: No config files found.
Info 56   [00:00:24.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 57   [00:00:25.000] FileWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 58   [00:00:26.000] FileWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 59   [00:00:27.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 60   [00:00:28.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 61   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 62   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 63   [00:00:31.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 64   [00:00:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 65   [00:00:33.000] 	Files (2)
	c:/a/lib/lib.d.ts
	c:/users/username/myprojects/project/x.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 66   [00:00:34.000] -----------------------------------------------
Info 67   [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 67   [00:00:36.000] 	Files (2)

Info 67   [00:00:37.000] -----------------------------------------------
Info 67   [00:00:38.000] Open files: 
Info 67   [00:00:39.000] 	FileName: c:/users/username/myprojects/project/x.js ProjectRootPath: undefined
Info 67   [00:00:40.000] 		Projects: /dev/null/inferredProject1*
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

Info 67   [00:00:41.000] response:
    {
      "responseRequired": false
    }
Info 68   [00:00:23.000] For files of style //vda1cs4850/c$/users/username/myprojects/project/x.js
Info 69   [00:00:24.000] Provided types map file "//vda1cs4850/a/lib/typesMap.json" doesn't exist
Info 70   [00:00:25.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/c$/users/username/myprojects/project/x.js"
      }
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

Info 71   [00:00:26.000] Search path: //vda1cs4850/c$/users/username/myprojects/project
Info 72   [00:00:27.000] For info: //vda1cs4850/c$/users/username/myprojects/project/x.js :: No config files found.
Info 73   [00:00:28.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 74   [00:00:29.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 75   [00:00:30.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 76   [00:00:31.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 77   [00:00:32.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 78   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 79   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 80   [00:00:35.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 81   [00:00:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 82   [00:00:37.000] 	Files (2)
	//vda1cs4850/a/lib/lib.d.ts
	//vda1cs4850/c$/users/username/myprojects/project/x.js


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 83   [00:00:38.000] -----------------------------------------------
Info 84   [00:00:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 84   [00:00:40.000] 	Files (2)

Info 84   [00:00:41.000] -----------------------------------------------
Info 84   [00:00:42.000] Open files: 
Info 84   [00:00:43.000] 	FileName: //vda1cs4850/c$/users/username/myprojects/project/x.js ProjectRootPath: undefined
Info 84   [00:00:44.000] 		Projects: /dev/null/inferredProject1*
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

Info 84   [00:00:45.000] response:
    {
      "responseRequired": false
    }