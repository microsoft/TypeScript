Info 0    [16:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:30.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      }
    }
//// [/user/username/projects/myproject/dependency/fns.ts]
export function fn1() { }
export function fn2() { }


//// [/user/username/projects/myproject/dependency/tsconfig.json]
{"compilerOptions":{"composite":true,"declarationDir":"../decls"},"compileOnSave":true}

//// [/user/username/projects/myproject/usage/usage.ts]
import {
    fn1,
    fn2,
} from '../decls/fns'
fn1();
fn2();


//// [/user/username/projects/myproject/usage/tsconfig.json]
{"compileOnSave":true,"references":[{"path":"../dependency"}]}

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

Info 2    [16:00:31.000] Search path: /user/username/projects/myproject/usage
Info 3    [16:00:32.000] For info: /user/username/projects/myproject/usage/usage.ts :: Config file name: /user/username/projects/myproject/usage/tsconfig.json
Info 4    [16:00:33.000] Creating configuration project /user/username/projects/myproject/usage/tsconfig.json
Info 5    [16:00:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Config file
Info 6    [16:00:35.000] Config: /user/username/projects/myproject/usage/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/usage/usage.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/usage/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/dependency",
   "originalPath": "../dependency"
  }
 ]
}
Info 7    [16:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage 1 undefined Config: /user/username/projects/myproject/usage/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage 1 undefined Config: /user/username/projects/myproject/usage/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:38.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:39.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json
Info 11   [16:00:40.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/dependency/fns.ts"
 ],
 "options": {
  "composite": true,
  "declarationDir": "/user/username/projects/myproject/decls",
  "configFilePath": "/user/username/projects/myproject/dependency/tsconfig.json"
 }
}
Info 12   [16:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Config file
Info 13   [16:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 14   [16:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 15   [16:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [16:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [16:00:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/fns.ts 500 undefined WatchType: Closed Script info
Info 18   [16:00:47.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 19   [16:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 20   [16:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 21   [16:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 22   [16:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 23   [16:00:52.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [16:00:53.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 25   [16:00:54.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/fns.ts
	/user/username/projects/myproject/usage/usage.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../dependency/fns.ts
	  Imported via '../decls/fns' from file 'usage.ts'
	usage.ts
	  Matched by default include pattern '**/*'

Info 26   [16:00:55.000] -----------------------------------------------
Info 27   [16:00:56.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 27   [16:00:57.000] 	Files (3)

Info 27   [16:00:58.000] -----------------------------------------------
Info 27   [16:00:59.000] Open files: 
Info 27   [16:01:00.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 27   [16:01:01.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 27   [16:01:02.000] response:
    {
      "responseRequired": false
    }
Info 28   [16:01:03.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      }
    }

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/fns.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 29   [16:01:04.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/fns.ts 500 undefined WatchType: Closed Script info
Info 30   [16:01:05.000] Search path: /user/username/projects/myproject/dependency
Info 31   [16:01:06.000] For info: /user/username/projects/myproject/dependency/fns.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 32   [16:01:07.000] Creating configuration project /user/username/projects/myproject/dependency/tsconfig.json
Info 33   [16:01:08.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 34   [16:01:09.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
Info 35   [16:01:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 36   [16:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 37   [16:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 38   [16:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 39   [16:01:14.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 40   [16:01:15.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 41   [16:01:16.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/fns.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	fns.ts
	  Matched by default include pattern '**/*'

Info 42   [16:01:17.000] -----------------------------------------------
Info 43   [16:01:18.000] Search path: /user/username/projects/myproject/dependency
Info 44   [16:01:19.000] For info: /user/username/projects/myproject/dependency/tsconfig.json :: No config files found.
Info 45   [16:01:20.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 45   [16:01:21.000] 	Files (3)

Info 45   [16:01:22.000] -----------------------------------------------
Info 45   [16:01:23.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 45   [16:01:24.000] 	Files (2)

Info 45   [16:01:25.000] -----------------------------------------------
Info 45   [16:01:26.000] Open files: 
Info 45   [16:01:27.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 45   [16:01:28.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
Info 45   [16:01:29.000] 	FileName: /user/username/projects/myproject/dependency/fns.ts ProjectRootPath: undefined
Info 45   [16:01:30.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 45   [16:01:31.000] response:
    {
      "responseRequired": false
    }
Info 46   [16:01:32.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 1,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 47   [16:01:33.000] Before ensureProjectForOpenFiles:
Info 48   [16:01:34.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 48   [16:01:35.000] 	Files (3)

Info 48   [16:01:36.000] -----------------------------------------------
Info 48   [16:01:37.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 48   [16:01:38.000] 	Files (2)

Info 48   [16:01:39.000] -----------------------------------------------
Info 48   [16:01:40.000] Open files: 
Info 48   [16:01:41.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 48   [16:01:42.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
Info 48   [16:01:43.000] 	FileName: /user/username/projects/myproject/dependency/fns.ts ProjectRootPath: undefined
Info 48   [16:01:44.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
Info 48   [16:01:45.000] After ensureProjectForOpenFiles:
Info 49   [16:01:46.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 49   [16:01:47.000] 	Files (3)

Info 49   [16:01:48.000] -----------------------------------------------
Info 49   [16:01:49.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 49   [16:01:50.000] 	Files (2)

Info 49   [16:01:51.000] -----------------------------------------------
Info 49   [16:01:52.000] Open files: 
Info 49   [16:01:53.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 49   [16:01:54.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
Info 49   [16:01:55.000] 	FileName: /user/username/projects/myproject/dependency/fns.ts ProjectRootPath: undefined
Info 49   [16:01:56.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 49   [16:01:57.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/usage/usage.ts"
          ],
          "projectUsesOutFile": false
        },
        {
          "projectFileName": "/user/username/projects/myproject/dependency/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/dependency/fns.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
Info 50   [16:01:58.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "line": 3,
        "offset": 1,
        "endLine": 3,
        "endOffset": 1,
        "insertString": "export function fn3() { }"
      },
      "seq": 2,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}


PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 51   [16:01:59.000] response:
    {
      "responseRequired": false
    }
Info 52   [16:02:00.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 3,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 53   [16:02:01.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json
Info 54   [16:02:02.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 55   [16:02:03.000] Different program with same set of files
Info 56   [16:02:04.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
Info 57   [16:02:05.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 58   [16:02:06.000] Different program with same set of files
Info 59   [16:02:07.000] Before ensureProjectForOpenFiles:
Info 60   [16:02:08.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 60   [16:02:09.000] 	Files (3)

Info 60   [16:02:10.000] -----------------------------------------------
Info 60   [16:02:11.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 60   [16:02:12.000] 	Files (2)

Info 60   [16:02:13.000] -----------------------------------------------
Info 60   [16:02:14.000] Open files: 
Info 60   [16:02:15.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 60   [16:02:16.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
Info 60   [16:02:17.000] 	FileName: /user/username/projects/myproject/dependency/fns.ts ProjectRootPath: undefined
Info 60   [16:02:18.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
Info 60   [16:02:19.000] After ensureProjectForOpenFiles:
Info 61   [16:02:20.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 61   [16:02:21.000] 	Files (3)

Info 61   [16:02:22.000] -----------------------------------------------
Info 61   [16:02:23.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 61   [16:02:24.000] 	Files (2)

Info 61   [16:02:25.000] -----------------------------------------------
Info 61   [16:02:26.000] Open files: 
Info 61   [16:02:27.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 61   [16:02:28.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
Info 61   [16:02:29.000] 	FileName: /user/username/projects/myproject/dependency/fns.ts ProjectRootPath: undefined
Info 61   [16:02:30.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 61   [16:02:31.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/usage/usage.ts"
          ],
          "projectUsesOutFile": false
        },
        {
          "projectFileName": "/user/username/projects/myproject/dependency/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/dependency/fns.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
Info 62   [16:02:32.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 4,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/decls:
  {"pollingInterval":500}
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}

Info 63   [16:02:35.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/dependency/fns.js :: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 64   [16:02:36.000] Project: /user/username/projects/myproject/dependency/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/dependency/fns.js
Info 65   [16:02:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/dependency/fns.js :: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 66   [16:02:41.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/decls :: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
Info 67   [16:02:42.000] Scheduled: /user/username/projects/myproject/usage/tsconfig.jsonFailedLookupInvalidation
Info 68   [16:02:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/decls :: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
Info 69   [16:02:44.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/decls :: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
Info 70   [16:02:45.000] Scheduled: /user/username/projects/myproject/usage/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 71   [16:02:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/decls :: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
Info 72   [16:02:49.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/decls/fns.d.ts :: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
Info 73   [16:02:50.000] Scheduled: /user/username/projects/myproject/usage/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 74   [16:02:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/decls/fns.d.ts :: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
//// [/user/username/projects/myproject/dependency/fns.js]
"use strict";
exports.__esModule = true;
exports.fn3 = exports.fn2 = exports.fn1 = void 0;
function fn1() { }
exports.fn1 = fn1;
function fn2() { }
exports.fn2 = fn2;
function fn3() { }
exports.fn3 = fn3;


//// [/user/username/projects/myproject/decls/fns.d.ts]
export declare function fn1(): void;
export declare function fn2(): void;
export declare function fn3(): void;



PolledWatches::
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}

Info 75   [16:02:52.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 76   [16:02:53.000] request:
    {
      "command": "emit-output",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 5,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}


PolledWatches::
/user/username/projects/myproject/usage/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/dependency/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json:
  {}
/user/username/projects/myproject/dependency/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage:
  {}
/user/username/projects/myproject/dependency:
  {}
/user/username/projects/myproject/decls:
  {}

Info 77   [16:02:54.000] response:
    {
      "response": {
        "outputFiles": [
          {
            "name": "/user/username/projects/myproject/dependency/fns.js",
            "writeByteOrderMark": false,
            "text": "\"use strict\";\nexports.__esModule = true;\nexports.fn3 = exports.fn2 = exports.fn1 = void 0;\nfunction fn1() { }\nexports.fn1 = fn1;\nfunction fn2() { }\nexports.fn2 = fn2;\nfunction fn3() { }\nexports.fn3 = fn3;\n"
          },
          {
            "name": "/user/username/projects/myproject/decls/fns.d.ts",
            "writeByteOrderMark": false,
            "text": "export declare function fn1(): void;\nexport declare function fn2(): void;\nexport declare function fn3(): void;\n"
          }
        ],
        "emitSkipped": false,
        "diagnostics": []
      },
      "responseRequired": true
    }