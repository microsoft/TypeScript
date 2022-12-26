Info 0    [00:00:47.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:48.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/app/src/program/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/user/username/projects/myproject/tsconfig.json]
{"files":[],"references":[{"path":"shared/src/library"},{"path":"app/src/program"}]}

//// [/user/username/projects/myproject/shared/src/library/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"../../bld/library"}}

//// [/user/username/projects/myproject/shared/src/library/index.ts]
export function foo() {}

//// [/user/username/projects/myproject/shared/package.json]
{"name":"shared","version":"1.0.0","main":"bld/library/index.js","types":"bld/library/index.d.ts"}

//// [/user/username/projects/myproject/app/src/program/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"../../bld/program"},"references":[{"path":"../../../shared/src/library"}]}

//// [/user/username/projects/myproject/app/src/program/bar.ts]
import {foo} from "shared";

//// [/user/username/projects/myproject/app/src/program/index.ts]
foo

//// [/user/username/projects/myproject/node_modules/shared] symlink(/user/username/projects/myproject/shared)
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

Info 2    [00:00:49.000] Search path: /user/username/projects/myproject/app/src/program
Info 3    [00:00:50.000] For info: /user/username/projects/myproject/app/src/program/index.ts :: Config file name: /user/username/projects/myproject/app/src/program/tsconfig.json
Info 4    [00:00:51.000] Creating configuration project /user/username/projects/myproject/app/src/program/tsconfig.json
Info 5    [00:00:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Config file
Info 6    [00:00:53.000] Config: /user/username/projects/myproject/app/src/program/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app/src/program/bar.ts",
  "/user/username/projects/myproject/app/src/program/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/app/bld/program",
  "configFilePath": "/user/username/projects/myproject/app/src/program/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/shared/src/library",
   "originalPath": "../../../shared/src/library"
  }
 ]
}
Info 7    [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program 1 undefined Config: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program 1 undefined Config: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:56.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/bar.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:57.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/app/src/program/tsconfig.json
Info 11   [00:00:58.000] Config: /user/username/projects/myproject/shared/src/library/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/shared/src/library/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/shared/bld/library",
  "configFilePath": "/user/username/projects/myproject/shared/src/library/tsconfig.json"
 }
}
Info 12   [00:00:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Config file
Info 13   [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library 1 undefined Config: /user/username/projects/myproject/shared/src/library/tsconfig.json WatchType: Wild card directory
Info 14   [00:01:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library 1 undefined Config: /user/username/projects/myproject/shared/src/library/tsconfig.json WatchType: Wild card directory
Info 15   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library/index.ts 500 undefined WatchType: Closed Script info
Info 16   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 17   [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 22   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 23   [00:01:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 24   [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info 25   [00:01:12.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/package.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: File location affecting resolution
Info 26   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 27   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 28   [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 29   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 30   [00:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 31   [00:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 32   [00:01:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 33   [00:01:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info 34   [00:01:21.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app/src/program/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 35   [00:01:22.000] Project '/user/username/projects/myproject/app/src/program/tsconfig.json' (Configured)
Info 36   [00:01:23.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/shared/src/library/index.ts
	/user/username/projects/myproject/app/src/program/bar.ts
	/user/username/projects/myproject/app/src/program/index.ts


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../../../shared/src/library/index.ts
	  Imported via "shared" from file 'bar.ts' with packageId 'shared/bld/library/index.d.ts@1.0.0'
	bar.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'

Info 37   [00:01:24.000] -----------------------------------------------
Info 38   [00:01:25.000] Search path: /user/username/projects/myproject/app/src/program
Info 39   [00:01:26.000] For info: /user/username/projects/myproject/app/src/program/tsconfig.json :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 40   [00:01:27.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 41   [00:01:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 42   [00:01:29.000] Search path: /user/username/projects/myproject
Info 43   [00:01:30.000] For info: /user/username/projects/myproject/tsconfig.json :: No config files found.
Info 44   [00:01:31.000] Project '/user/username/projects/myproject/app/src/program/tsconfig.json' (Configured)
Info 44   [00:01:32.000] 	Files (4)

Info 44   [00:01:33.000] -----------------------------------------------
Info 44   [00:01:34.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 44   [00:01:35.000] 	Files (0) InitialLoadPending

Info 44   [00:01:36.000] -----------------------------------------------
Info 44   [00:01:37.000] Open files: 
Info 44   [00:01:38.000] 	FileName: /user/username/projects/myproject/app/src/program/index.ts ProjectRootPath: undefined
Info 44   [00:01:39.000] 		Projects: /user/username/projects/myproject/app/src/program/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/app/src/program/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/app/src/program/tsconfig.json:
  {}
/user/username/projects/myproject/app/src/program/bar.ts:
  {}
/user/username/projects/myproject/shared/src/library/tsconfig.json:
  {}
/user/username/projects/myproject/shared/src/library/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/shared/package.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/app/src/program:
  {}
/user/username/projects/myproject/shared/src/library:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 44   [00:01:40.000] response:
    {
      "responseRequired": false
    }
Info 45   [00:01:41.000] request:
    {
      "command": "getCodeFixes",
      "arguments": {
        "file": "/user/username/projects/myproject/app/src/program/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 4,
        "errorCodes": [
          2304
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/app/src/program/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/app/src/program/tsconfig.json:
  {}
/user/username/projects/myproject/app/src/program/bar.ts:
  {}
/user/username/projects/myproject/shared/src/library/tsconfig.json:
  {}
/user/username/projects/myproject/shared/src/library/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/shared/package.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/app/src/program:
  {}
/user/username/projects/myproject/shared/src/library:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 46   [00:01:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 47   [00:01:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
After request

PolledWatches::
/user/username/projects/myproject/app/src/program/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/app/src/program/tsconfig.json:
  {}
/user/username/projects/myproject/app/src/program/bar.ts:
  {}
/user/username/projects/myproject/shared/src/library/tsconfig.json:
  {}
/user/username/projects/myproject/shared/src/library/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/shared/package.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/app/src/program:
  {}
/user/username/projects/myproject/shared/src/library:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 48   [00:01:44.000] response:
    {
      "response": [
        {
          "fixName": "import",
          "description": "Add import from \"shared\"",
          "changes": [
            {
              "fileName": "/user/username/projects/myproject/app/src/program/index.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { foo } from \"shared\";\n\n"
                }
              ]
            }
          ]
        }
      ],
      "responseRequired": true
    }