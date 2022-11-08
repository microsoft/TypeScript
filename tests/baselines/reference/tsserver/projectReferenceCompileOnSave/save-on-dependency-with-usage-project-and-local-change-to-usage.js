Info 0    [00:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:30.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      }
    }
Before request
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

Info 2    [00:00:31.000] Search path: /user/username/projects/myproject/usage
Info 3    [00:00:32.000] For info: /user/username/projects/myproject/usage/usage.ts :: Config file name: /user/username/projects/myproject/usage/tsconfig.json
Info 4    [00:00:33.000] Creating configuration project /user/username/projects/myproject/usage/tsconfig.json
Info 5    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Config file
Info 6    [00:00:35.000] Config: /user/username/projects/myproject/usage/tsconfig.json : {
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
Info 7    [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage 1 undefined Config: /user/username/projects/myproject/usage/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage 1 undefined Config: /user/username/projects/myproject/usage/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:38.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json
Info 10   [00:00:39.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/dependency/fns.ts"
 ],
 "options": {
  "composite": true,
  "declarationDir": "/user/username/projects/myproject/decls",
  "configFilePath": "/user/username/projects/myproject/dependency/tsconfig.json"
 }
}
Info 11   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Config file
Info 12   [00:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/fns.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 19   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 20   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 21   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 22   [00:00:51.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:52.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 24   [00:00:53.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/fns.ts
	/user/username/projects/myproject/usage/usage.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../dependency/fns.ts
	  Imported via '../decls/fns' from file 'usage.ts'
	usage.ts
	  Matched by default include pattern '**/*'

Info 25   [00:00:54.000] -----------------------------------------------
Info 26   [00:00:55.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 26   [00:00:56.000] 	Files (3)

Info 26   [00:00:57.000] -----------------------------------------------
Info 26   [00:00:58.000] Open files: 
Info 26   [00:00:59.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 26   [00:01:00.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
After request

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

Info 26   [00:01:01.000] response:
    {
      "responseRequired": false
    }
Info 27   [00:01:02.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      }
    }
Before request

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

Info 28   [00:01:03.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/fns.ts 500 undefined WatchType: Closed Script info
Info 29   [00:01:04.000] Search path: /user/username/projects/myproject/dependency
Info 30   [00:01:05.000] For info: /user/username/projects/myproject/dependency/fns.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 31   [00:01:06.000] Creating configuration project /user/username/projects/myproject/dependency/tsconfig.json
Info 32   [00:01:07.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
Info 33   [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 34   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 35   [00:01:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 36   [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 37   [00:01:12.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 38   [00:01:13.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 39   [00:01:14.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/fns.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	fns.ts
	  Matched by default include pattern '**/*'

Info 40   [00:01:15.000] -----------------------------------------------
Info 41   [00:01:16.000] Search path: /user/username/projects/myproject/dependency
Info 42   [00:01:17.000] For info: /user/username/projects/myproject/dependency/tsconfig.json :: No config files found.
Info 43   [00:01:18.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 43   [00:01:19.000] 	Files (3)

Info 43   [00:01:20.000] -----------------------------------------------
Info 43   [00:01:21.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 43   [00:01:22.000] 	Files (2)

Info 43   [00:01:23.000] -----------------------------------------------
Info 43   [00:01:24.000] Open files: 
Info 43   [00:01:25.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 43   [00:01:26.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
Info 43   [00:01:27.000] 	FileName: /user/username/projects/myproject/dependency/fns.ts ProjectRootPath: undefined
Info 43   [00:01:28.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
After request

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

Info 43   [00:01:29.000] response:
    {
      "responseRequired": false
    }
Info 44   [00:01:30.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

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

Info 45   [00:01:31.000] Before ensureProjectForOpenFiles:
Info 46   [00:01:32.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 46   [00:01:33.000] 	Files (3)

Info 46   [00:01:34.000] -----------------------------------------------
Info 46   [00:01:35.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 46   [00:01:36.000] 	Files (2)

Info 46   [00:01:37.000] -----------------------------------------------
Info 46   [00:01:38.000] Open files: 
Info 46   [00:01:39.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 46   [00:01:40.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
Info 46   [00:01:41.000] 	FileName: /user/username/projects/myproject/dependency/fns.ts ProjectRootPath: undefined
Info 46   [00:01:42.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
Info 46   [00:01:43.000] After ensureProjectForOpenFiles:
Info 47   [00:01:44.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 47   [00:01:45.000] 	Files (3)

Info 47   [00:01:46.000] -----------------------------------------------
Info 47   [00:01:47.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 47   [00:01:48.000] 	Files (2)

Info 47   [00:01:49.000] -----------------------------------------------
Info 47   [00:01:50.000] Open files: 
Info 47   [00:01:51.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 47   [00:01:52.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
Info 47   [00:01:53.000] 	FileName: /user/username/projects/myproject/dependency/fns.ts ProjectRootPath: undefined
Info 47   [00:01:54.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
After request

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

Info 47   [00:01:55.000] response:
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
Info 48   [00:01:56.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts",
        "line": 7,
        "offset": 1,
        "endLine": 7,
        "endOffset": 1,
        "insertString": "function fn3() { }"
      },
      "seq": 2,
      "type": "request"
    }
Before request

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

After request

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

Info 49   [00:01:57.000] response:
    {
      "responseRequired": false
    }
Info 50   [00:01:58.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Before request

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

Info 51   [00:01:59.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json
Info 52   [00:02:00.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 53   [00:02:01.000] Different program with same set of files
After request

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

Info 54   [00:02:02.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json",
          "fileNames": [],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
Info 55   [00:02:03.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 4,
      "type": "request"
    }
Before request

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

After request

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

Info 56   [00:02:04.000] response:
    {
      "response": false,
      "responseRequired": true
    }
Info 57   [00:02:05.000] request:
    {
      "command": "emit-output",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 5,
      "type": "request"
    }
Before request

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

After request

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

Info 58   [00:02:06.000] response:
    {
      "response": {
        "emitSkipped": true,
        "outputFiles": [],
        "diagnostics": []
      },
      "responseRequired": true
    }