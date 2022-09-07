Info 0    [16:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/projects/config/file.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/projects/config/tsconfig.json]


//// [/a/b/projects/config/file.ts]
import {a} from "../files/file1"; export let b = a;

//// [/a/b/projects/files/file1.ts]
export let a = 10;

//// [/a/b/projects/files/file2.ts]
export let aa = 10;

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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:27.000] Search path: /a/b/projects/config
Info 3    [16:00:28.000] For info: /a/b/projects/config/file.ts :: Config file name: /a/b/projects/config/tsconfig.json
Info 4    [16:00:29.000] Creating configuration project /a/b/projects/config/tsconfig.json
Info 5    [16:00:30.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/config/tsconfig.json 2000 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Config file
Info 6    [16:00:31.000] Config: /a/b/projects/config/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/config/file.ts"
 ],
 "options": {
  "configFilePath": "/a/b/projects/config/tsconfig.json"
 }
}
Info 7    [16:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/config 1 undefined Config: /a/b/projects/config/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/config 1 undefined Config: /a/b/projects/config/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:34.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:35.000] Starting updateGraphWorker: Project: /a/b/projects/config/tsconfig.json
Info 11   [16:00:36.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/files/file1.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [16:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/config/node_modules/@types 1 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Type roots
Info 14   [16:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/config/node_modules/@types 1 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Type roots
Info 15   [16:00:40.000] Finishing updateGraphWorker: Project: /a/b/projects/config/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [16:00:41.000] Project '/a/b/projects/config/tsconfig.json' (Configured)
Info 17   [16:00:42.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/projects/files/file1.ts
	/a/b/projects/config/file.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	../files/file1.ts
	  Imported via "../files/file1" from file 'file.ts'
	file.ts
	  Matched by default include pattern '**/*'

Info 18   [16:00:43.000] -----------------------------------------------
Info 19   [16:00:44.000] Project '/a/b/projects/config/tsconfig.json' (Configured)
Info 19   [16:00:45.000] 	Files (3)

Info 19   [16:00:46.000] -----------------------------------------------
Info 19   [16:00:47.000] Open files: 
Info 19   [16:00:48.000] 	FileName: /a/b/projects/config/file.ts ProjectRootPath: undefined
Info 19   [16:00:49.000] 		Projects: /a/b/projects/config/tsconfig.json
After request

PolledWatches::
/a/b/projects/config/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/projects/config/tsconfig.json:
  {}
/a/b/projects/files/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/config:
  {}

Info 19   [16:00:50.000] response:
    {
      "responseRequired": false
    }
Info 20   [16:00:51.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/projects/files/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/projects/config/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/projects/config/tsconfig.json:
  {}
/a/b/projects/files/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/config:
  {}

Info 21   [16:00:52.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/files/file1.ts 500 undefined WatchType: Closed Script info
Info 22   [16:00:53.000] Search path: /a/b/projects/files
Info 23   [16:00:54.000] For info: /a/b/projects/files/file1.ts :: No config files found.
Info 24   [16:00:55.000] Project '/a/b/projects/config/tsconfig.json' (Configured)
Info 24   [16:00:56.000] 	Files (3)

Info 24   [16:00:57.000] -----------------------------------------------
Info 24   [16:00:58.000] Open files: 
Info 24   [16:00:59.000] 	FileName: /a/b/projects/config/file.ts ProjectRootPath: undefined
Info 24   [16:01:00.000] 		Projects: /a/b/projects/config/tsconfig.json
Info 24   [16:01:01.000] 	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
Info 24   [16:01:02.000] 		Projects: /a/b/projects/config/tsconfig.json
After request

PolledWatches::
/a/b/projects/config/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/projects/config/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/config:
  {}

Info 24   [16:01:03.000] response:
    {
      "responseRequired": false
    }
Info 25   [16:01:04.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/projects/config/file.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/projects/config/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/projects/config/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/config:
  {}

Info 26   [16:01:05.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/config/file.ts 500 undefined WatchType: Closed Script info
Info 27   [16:01:06.000] Project '/a/b/projects/config/tsconfig.json' (Configured)
Info 27   [16:01:07.000] 	Files (3)

Info 27   [16:01:08.000] -----------------------------------------------
Info 27   [16:01:09.000] Open files: 
Info 27   [16:01:10.000] 	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
Info 27   [16:01:11.000] 		Projects: /a/b/projects/config/tsconfig.json
After request

PolledWatches::
/a/b/projects/config/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/projects/config/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/projects/config/file.ts:
  {}

FsWatchesRecursive::
/a/b/projects/config:
  {}

Info 27   [16:01:12.000] response:
    {
      "responseRequired": false
    }
Info 28   [16:01:13.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/projects/files/file2.ts"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/projects/config/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/projects/config/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/projects/config/file.ts:
  {}

FsWatchesRecursive::
/a/b/projects/config:
  {}

Info 29   [16:01:14.000] Search path: /a/b/projects/files
Info 30   [16:01:15.000] For info: /a/b/projects/files/file2.ts :: No config files found.
Info 31   [16:01:16.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 32   [16:01:17.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/files/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 33   [16:01:18.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/files/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 34   [16:01:19.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 35   [16:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 36   [16:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 37   [16:01:22.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 38   [16:01:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 39   [16:01:24.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/files/file2.ts


	../../../lib/lib.d.ts
	  Default library for target 'es5'
	file2.ts
	  Root file specified for compilation

Info 40   [16:01:25.000] -----------------------------------------------
Info 41   [16:01:26.000] `remove Project::
Info 42   [16:01:27.000] Project '/a/b/projects/config/tsconfig.json' (Configured)
Info 43   [16:01:28.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/projects/files/file1.ts
	/a/b/projects/config/file.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	../files/file1.ts
	  Imported via "../files/file1" from file 'file.ts'
	file.ts
	  Matched by default include pattern '**/*'

Info 44   [16:01:29.000] -----------------------------------------------
Info 45   [16:01:30.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/config 1 undefined Config: /a/b/projects/config/tsconfig.json WatchType: Wild card directory
Info 46   [16:01:31.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/config 1 undefined Config: /a/b/projects/config/tsconfig.json WatchType: Wild card directory
Info 47   [16:01:32.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/config/tsconfig.json 2000 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Config file
Info 48   [16:01:33.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/config/node_modules/@types 1 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Type roots
Info 49   [16:01:34.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/config/node_modules/@types 1 undefined Project: /a/b/projects/config/tsconfig.json WatchType: Type roots
Info 50   [16:01:35.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/config/file.ts 500 undefined WatchType: Closed Script info
Info 51   [16:01:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 51   [16:01:37.000] 	Files (2)

Info 51   [16:01:38.000] -----------------------------------------------
Info 51   [16:01:39.000] Open files: 
Info 51   [16:01:40.000] 	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
Info 51   [16:01:41.000] 		Projects: 
Info 51   [16:01:42.000] 	FileName: /a/b/projects/files/file2.ts ProjectRootPath: undefined
Info 51   [16:01:43.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/b/projects/files/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/files/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/files/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 51   [16:01:44.000] response:
    {
      "responseRequired": false
    }
Info 52   [16:01:45.000] request:
    {
      "command": "occurrences",
      "arguments": {
        "file": "/a/b/projects/files/file1.ts",
        "line": 1,
        "offset": 11
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/projects/files/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/files/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/files/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 53   [16:01:46.000] Before ensureProjectForOpenFiles:
Info 54   [16:01:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 54   [16:01:48.000] 	Files (2)

Info 54   [16:01:49.000] -----------------------------------------------
Info 54   [16:01:50.000] Open files: 
Info 54   [16:01:51.000] 	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
Info 54   [16:01:52.000] 		Projects: 
Info 54   [16:01:53.000] 	FileName: /a/b/projects/files/file2.ts ProjectRootPath: undefined
Info 54   [16:01:54.000] 		Projects: /dev/null/inferredProject1*
Info 54   [16:01:55.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 55   [16:01:56.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 56   [16:01:57.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 57   [16:01:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 58   [16:01:59.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [16:02:00.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 60   [16:02:01.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/files/file1.ts


	../../../lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Root file specified for compilation

Info 61   [16:02:02.000] -----------------------------------------------
Info 62   [16:02:03.000] After ensureProjectForOpenFiles:
Info 63   [16:02:04.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 63   [16:02:05.000] 	Files (2)

Info 63   [16:02:06.000] -----------------------------------------------
Info 63   [16:02:07.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 63   [16:02:08.000] 	Files (2)

Info 63   [16:02:09.000] -----------------------------------------------
Info 63   [16:02:10.000] Open files: 
Info 63   [16:02:11.000] 	FileName: /a/b/projects/files/file1.ts ProjectRootPath: undefined
Info 63   [16:02:12.000] 		Projects: /dev/null/inferredProject2*
Info 63   [16:02:13.000] 	FileName: /a/b/projects/files/file2.ts ProjectRootPath: undefined
Info 63   [16:02:14.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/b/projects/files/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/files/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/files/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 63   [16:02:15.000] response:
    {
      "response": [],
      "responseRequired": true
    }