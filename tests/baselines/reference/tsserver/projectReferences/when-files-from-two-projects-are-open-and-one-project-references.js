Info 0    [00:01:53.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:54.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/main/src/file1.ts"
      }
    }
Before request
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

//// [/user/username/projects/myproject/main/src/file1.ts]
export const mainConst = 10;

//// [/user/username/projects/myproject/main/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../core"},{"path":"../indirect"},{"path":"../noCoreRef1"},{"path":"../indirectDisabledChildLoad1"},{"path":"../indirectDisabledChildLoad2"},{"path":"../refToCoreRef3"},{"path":"../indirectNoCoreRef"}]}

//// [/user/username/projects/myproject/core/src/file1.ts]
export const coreConst = 10;

//// [/user/username/projects/myproject/core/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/user/username/projects/myproject/noCoreRef1/src/file1.ts]
export const noCoreRef1Const = 10;

//// [/user/username/projects/myproject/noCoreRef1/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/user/username/projects/myproject/indirect/src/file1.ts]
export const indirectConst = 10;

//// [/user/username/projects/myproject/indirect/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../coreRef1"}]}

//// [/user/username/projects/myproject/coreRef1/src/file1.ts]
export const coreRef1Const = 10;

//// [/user/username/projects/myproject/coreRef1/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../core"}]}

//// [/user/username/projects/myproject/indirectDisabledChildLoad1/src/file1.ts]
export const indirectDisabledChildLoad1Const = 10;

//// [/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json]
{"compilerOptions":{"composite":true,"disableReferencedProjectLoad":true},"references":[{"path":"../coreRef2"}]}

//// [/user/username/projects/myproject/coreRef2/src/file1.ts]
export const coreRef2Const = 10;

//// [/user/username/projects/myproject/coreRef2/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../core"}]}

//// [/user/username/projects/myproject/indirectDisabledChildLoad2/src/file1.ts]
export const indirectDisabledChildLoad2Const = 10;

//// [/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json]
{"compilerOptions":{"composite":true,"disableReferencedProjectLoad":true},"references":[{"path":"../coreRef3"}]}

//// [/user/username/projects/myproject/coreRef3/src/file1.ts]
export const coreRef3Const = 10;

//// [/user/username/projects/myproject/coreRef3/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../core"}]}

//// [/user/username/projects/myproject/refToCoreRef3/src/file1.ts]
export const refToCoreRef3Const = 10;

//// [/user/username/projects/myproject/refToCoreRef3/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../coreRef3"}]}

//// [/user/username/projects/myproject/indirectNoCoreRef/src/file1.ts]
export const indirectNoCoreRefConst = 10;

//// [/user/username/projects/myproject/indirectNoCoreRef/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../noCoreRef2"}]}

//// [/user/username/projects/myproject/noCoreRef2/src/file1.ts]
export const noCoreRef2Const = 10;

//// [/user/username/projects/myproject/noCoreRef2/tsconfig.json]
{"compilerOptions":{"composite":true}}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:55.000] Search path: /user/username/projects/myproject/main/src
Info 3    [00:01:56.000] For info: /user/username/projects/myproject/main/src/file1.ts :: Config file name: /user/username/projects/myproject/main/tsconfig.json
Info 4    [00:01:57.000] Creating configuration project /user/username/projects/myproject/main/tsconfig.json
Info 5    [00:01:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 6    [00:01:59.000] Config: /user/username/projects/myproject/main/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/main/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/main/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  },
  {
   "path": "/user/username/projects/myproject/indirect",
   "originalPath": "../indirect"
  },
  {
   "path": "/user/username/projects/myproject/noCoreRef1",
   "originalPath": "../noCoreRef1"
  },
  {
   "path": "/user/username/projects/myproject/indirectDisabledChildLoad1",
   "originalPath": "../indirectDisabledChildLoad1"
  },
  {
   "path": "/user/username/projects/myproject/indirectDisabledChildLoad2",
   "originalPath": "../indirectDisabledChildLoad2"
  },
  {
   "path": "/user/username/projects/myproject/refToCoreRef3",
   "originalPath": "../refToCoreRef3"
  },
  {
   "path": "/user/username/projects/myproject/indirectNoCoreRef",
   "originalPath": "../indirectNoCoreRef"
  }
 ]
}
Info 7    [00:02:00.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 8    [00:02:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 9    [00:02:02.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [00:02:03.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json
Info 11   [00:02:04.000] Config: /user/username/projects/myproject/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/core/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/core/tsconfig.json"
 }
}
Info 12   [00:02:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 13   [00:02:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core 1 undefined Config: /user/username/projects/myproject/core/tsconfig.json WatchType: Wild card directory
Info 14   [00:02:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core 1 undefined Config: /user/username/projects/myproject/core/tsconfig.json WatchType: Wild card directory
Info 15   [00:02:08.000] Config: /user/username/projects/myproject/indirect/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/indirect/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/coreRef1",
   "originalPath": "../coreRef1"
  }
 ]
}
Info 16   [00:02:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 17   [00:02:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect 1 undefined Config: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Wild card directory
Info 18   [00:02:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect 1 undefined Config: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Wild card directory
Info 19   [00:02:12.000] Config: /user/username/projects/myproject/coreRef1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/coreRef1/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/coreRef1/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  }
 ]
}
Info 20   [00:02:13.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 21   [00:02:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1 1 undefined Config: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Wild card directory
Info 22   [00:02:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1 1 undefined Config: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Wild card directory
Info 23   [00:02:16.000] Config: /user/username/projects/myproject/noCoreRef1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/noCoreRef1/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/noCoreRef1/tsconfig.json"
 }
}
Info 24   [00:02:17.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 25   [00:02:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef1 1 undefined Config: /user/username/projects/myproject/noCoreRef1/tsconfig.json WatchType: Wild card directory
Info 26   [00:02:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef1 1 undefined Config: /user/username/projects/myproject/noCoreRef1/tsconfig.json WatchType: Wild card directory
Info 27   [00:02:20.000] Config: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirectDisabledChildLoad1/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/coreRef2",
   "originalPath": "../coreRef2"
  }
 ]
}
Info 28   [00:02:21.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 29   [00:02:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1 1 undefined Config: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Wild card directory
Info 30   [00:02:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1 1 undefined Config: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Wild card directory
Info 31   [00:02:24.000] Config: /user/username/projects/myproject/coreRef2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/coreRef2/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/coreRef2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  }
 ]
}
Info 32   [00:02:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 33   [00:02:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef2 1 undefined Config: /user/username/projects/myproject/coreRef2/tsconfig.json WatchType: Wild card directory
Info 34   [00:02:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef2 1 undefined Config: /user/username/projects/myproject/coreRef2/tsconfig.json WatchType: Wild card directory
Info 35   [00:02:28.000] Config: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirectDisabledChildLoad2/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/coreRef3",
   "originalPath": "../coreRef3"
  }
 ]
}
Info 36   [00:02:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 37   [00:02:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2 1 undefined Config: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Wild card directory
Info 38   [00:02:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2 1 undefined Config: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Wild card directory
Info 39   [00:02:32.000] Config: /user/username/projects/myproject/coreRef3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/coreRef3/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/coreRef3/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  }
 ]
}
Info 40   [00:02:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 41   [00:02:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3 1 undefined Config: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Wild card directory
Info 42   [00:02:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3 1 undefined Config: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Wild card directory
Info 43   [00:02:36.000] Config: /user/username/projects/myproject/refToCoreRef3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/refToCoreRef3/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/refToCoreRef3/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/coreRef3",
   "originalPath": "../coreRef3"
  }
 ]
}
Info 44   [00:02:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 45   [00:02:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3 1 undefined Config: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Wild card directory
Info 46   [00:02:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3 1 undefined Config: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Wild card directory
Info 47   [00:02:40.000] Config: /user/username/projects/myproject/indirectNoCoreRef/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirectNoCoreRef/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/indirectNoCoreRef/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/noCoreRef2",
   "originalPath": "../noCoreRef2"
  }
 ]
}
Info 48   [00:02:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectNoCoreRef/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 49   [00:02:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectNoCoreRef 1 undefined Config: /user/username/projects/myproject/indirectNoCoreRef/tsconfig.json WatchType: Wild card directory
Info 50   [00:02:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectNoCoreRef 1 undefined Config: /user/username/projects/myproject/indirectNoCoreRef/tsconfig.json WatchType: Wild card directory
Info 51   [00:02:44.000] Config: /user/username/projects/myproject/noCoreRef2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/noCoreRef2/src/file1.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/noCoreRef2/tsconfig.json"
 }
}
Info 52   [00:02:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 53   [00:02:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef2 1 undefined Config: /user/username/projects/myproject/noCoreRef2/tsconfig.json WatchType: Wild card directory
Info 54   [00:02:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/noCoreRef2 1 undefined Config: /user/username/projects/myproject/noCoreRef2/tsconfig.json WatchType: Wild card directory
Info 55   [00:02:48.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 56   [00:02:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 57   [00:02:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 58   [00:02:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 59   [00:02:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 60   [00:02:53.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 61   [00:02:54.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 62   [00:02:55.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/main/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info 63   [00:02:56.000] -----------------------------------------------
Info 64   [00:02:57.000] Search path: /user/username/projects/myproject/main
Info 65   [00:02:58.000] For info: /user/username/projects/myproject/main/tsconfig.json :: No config files found.
Info 66   [00:02:59.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 66   [00:03:00.000] 	Files (2)

Info 66   [00:03:01.000] -----------------------------------------------
Info 66   [00:03:02.000] Open files: 
Info 66   [00:03:03.000] 	FileName: /user/username/projects/myproject/main/src/file1.ts ProjectRootPath: undefined
Info 66   [00:03:04.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/core/tsconfig.json:
  {}
/user/username/projects/myproject/indirect/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef2/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/refToCoreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/indirectNoCoreRef/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef2/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/core:
  {}
/user/username/projects/myproject/indirect:
  {}
/user/username/projects/myproject/coreRef1:
  {}
/user/username/projects/myproject/noCoreRef1:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1:
  {}
/user/username/projects/myproject/coreRef2:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2:
  {}
/user/username/projects/myproject/coreRef3:
  {}
/user/username/projects/myproject/refToCoreRef3:
  {}
/user/username/projects/myproject/indirectNoCoreRef:
  {}
/user/username/projects/myproject/noCoreRef2:
  {}

Info 66   [00:03:05.000] response:
    {
      "responseRequired": false
    }
Info 67   [00:03:06.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/core/src/file1.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/core/tsconfig.json:
  {}
/user/username/projects/myproject/indirect/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef2/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/refToCoreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/indirectNoCoreRef/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef2/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/core:
  {}
/user/username/projects/myproject/indirect:
  {}
/user/username/projects/myproject/coreRef1:
  {}
/user/username/projects/myproject/noCoreRef1:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1:
  {}
/user/username/projects/myproject/coreRef2:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2:
  {}
/user/username/projects/myproject/coreRef3:
  {}
/user/username/projects/myproject/refToCoreRef3:
  {}
/user/username/projects/myproject/indirectNoCoreRef:
  {}
/user/username/projects/myproject/noCoreRef2:
  {}

Info 68   [00:03:07.000] Search path: /user/username/projects/myproject/core/src
Info 69   [00:03:08.000] For info: /user/username/projects/myproject/core/src/file1.ts :: Config file name: /user/username/projects/myproject/core/tsconfig.json
Info 70   [00:03:09.000] Creating configuration project /user/username/projects/myproject/core/tsconfig.json
Info 71   [00:03:10.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 72   [00:03:11.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/core/tsconfig.json
Info 73   [00:03:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/node_modules/@types 1 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Type roots
Info 74   [00:03:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/node_modules/@types 1 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Type roots
Info 75   [00:03:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Type roots
Info 76   [00:03:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Type roots
Info 77   [00:03:16.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/core/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 78   [00:03:17.000] Project '/user/username/projects/myproject/core/tsconfig.json' (Configured)
Info 79   [00:03:18.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/core/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info 80   [00:03:19.000] -----------------------------------------------
Info 81   [00:03:20.000] Search path: /user/username/projects/myproject/core
Info 82   [00:03:21.000] For info: /user/username/projects/myproject/core/tsconfig.json :: No config files found.
Info 83   [00:03:22.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 83   [00:03:23.000] 	Files (2)

Info 83   [00:03:24.000] -----------------------------------------------
Info 83   [00:03:25.000] Project '/user/username/projects/myproject/core/tsconfig.json' (Configured)
Info 83   [00:03:26.000] 	Files (2)

Info 83   [00:03:27.000] -----------------------------------------------
Info 83   [00:03:28.000] Open files: 
Info 83   [00:03:29.000] 	FileName: /user/username/projects/myproject/main/src/file1.ts ProjectRootPath: undefined
Info 83   [00:03:30.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 83   [00:03:31.000] 	FileName: /user/username/projects/myproject/core/src/file1.ts ProjectRootPath: undefined
Info 83   [00:03:32.000] 		Projects: /user/username/projects/myproject/core/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/core/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/core/tsconfig.json:
  {}
/user/username/projects/myproject/indirect/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef2/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/refToCoreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/indirectNoCoreRef/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef2/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/core:
  {}
/user/username/projects/myproject/indirect:
  {}
/user/username/projects/myproject/coreRef1:
  {}
/user/username/projects/myproject/noCoreRef1:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1:
  {}
/user/username/projects/myproject/coreRef2:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2:
  {}
/user/username/projects/myproject/coreRef3:
  {}
/user/username/projects/myproject/refToCoreRef3:
  {}
/user/username/projects/myproject/indirectNoCoreRef:
  {}
/user/username/projects/myproject/noCoreRef2:
  {}

Info 83   [00:03:33.000] response:
    {
      "responseRequired": false
    }
Info 84   [00:03:34.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/myproject/core/src/file1.ts",
        "line": 1,
        "offset": 14
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/core/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/core/tsconfig.json:
  {}
/user/username/projects/myproject/indirect/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef2/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/refToCoreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/indirectNoCoreRef/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef2/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/core:
  {}
/user/username/projects/myproject/indirect:
  {}
/user/username/projects/myproject/coreRef1:
  {}
/user/username/projects/myproject/noCoreRef1:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1:
  {}
/user/username/projects/myproject/coreRef2:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2:
  {}
/user/username/projects/myproject/coreRef3:
  {}
/user/username/projects/myproject/refToCoreRef3:
  {}
/user/username/projects/myproject/indirectNoCoreRef:
  {}
/user/username/projects/myproject/noCoreRef2:
  {}

Info 85   [00:03:35.000] Finding references to /user/username/projects/myproject/core/src/file1.ts position 13 in project /user/username/projects/myproject/core/tsconfig.json
Info 86   [00:03:36.000] Creating configuration project /user/username/projects/myproject/indirect/tsconfig.json
Info 87   [00:03:37.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 88   [00:03:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect/src/file1.ts 500 undefined WatchType: Closed Script info
Info 89   [00:03:39.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/indirect/tsconfig.json
Info 90   [00:03:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Type roots
Info 91   [00:03:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Type roots
Info 92   [00:03:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Type roots
Info 93   [00:03:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect/tsconfig.json WatchType: Type roots
Info 94   [00:03:44.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirect/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 95   [00:03:45.000] Project '/user/username/projects/myproject/indirect/tsconfig.json' (Configured)
Info 96   [00:03:46.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/indirect/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info 97   [00:03:47.000] -----------------------------------------------
Info 98   [00:03:48.000] Creating configuration project /user/username/projects/myproject/coreRef1/tsconfig.json
Info 99   [00:03:49.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 100  [00:03:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1/src/file1.ts 500 undefined WatchType: Closed Script info
Info 101  [00:03:51.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/coreRef1/tsconfig.json
Info 102  [00:03:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Type roots
Info 103  [00:03:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Type roots
Info 104  [00:03:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Type roots
Info 105  [00:03:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef1/tsconfig.json WatchType: Type roots
Info 106  [00:03:56.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/coreRef1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 107  [00:03:57.000] Project '/user/username/projects/myproject/coreRef1/tsconfig.json' (Configured)
Info 108  [00:03:58.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/coreRef1/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info 109  [00:03:59.000] -----------------------------------------------
Info 110  [00:04:00.000] Creating configuration project /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json
Info 111  [00:04:01.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 112  [00:04:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1/src/file1.ts 500 undefined WatchType: Closed Script info
Info 113  [00:04:03.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json
Info 114  [00:04:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Type roots
Info 115  [00:04:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Type roots
Info 116  [00:04:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Type roots
Info 117  [00:04:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json WatchType: Type roots
Info 118  [00:04:08.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 119  [00:04:09.000] Project '/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json' (Configured)
Info 120  [00:04:10.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/indirectDisabledChildLoad1/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info 121  [00:04:11.000] -----------------------------------------------
Info 122  [00:04:12.000] Creating configuration project /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json
Info 123  [00:04:13.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 124  [00:04:14.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2/src/file1.ts 500 undefined WatchType: Closed Script info
Info 125  [00:04:15.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json
Info 126  [00:04:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Type roots
Info 127  [00:04:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirectDisabledChildLoad2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Type roots
Info 128  [00:04:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Type roots
Info 129  [00:04:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json WatchType: Type roots
Info 130  [00:04:20.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 131  [00:04:21.000] Project '/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json' (Configured)
Info 132  [00:04:22.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/indirectDisabledChildLoad2/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info 133  [00:04:23.000] -----------------------------------------------
Info 134  [00:04:24.000] Creating configuration project /user/username/projects/myproject/refToCoreRef3/tsconfig.json
Info 135  [00:04:25.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 136  [00:04:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3/src/file1.ts 500 undefined WatchType: Closed Script info
Info 137  [00:04:27.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json
Info 138  [00:04:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Type roots
Info 139  [00:04:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refToCoreRef3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Type roots
Info 140  [00:04:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Type roots
Info 141  [00:04:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json WatchType: Type roots
Info 142  [00:04:32.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/refToCoreRef3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 143  [00:04:33.000] Project '/user/username/projects/myproject/refToCoreRef3/tsconfig.json' (Configured)
Info 144  [00:04:34.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/refToCoreRef3/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info 145  [00:04:35.000] -----------------------------------------------
Info 146  [00:04:36.000] Creating configuration project /user/username/projects/myproject/coreRef3/tsconfig.json
Info 147  [00:04:37.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 148  [00:04:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3/src/file1.ts 500 undefined WatchType: Closed Script info
Info 149  [00:04:39.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/coreRef3/tsconfig.json
Info 150  [00:04:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Type roots
Info 151  [00:04:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/coreRef3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Type roots
Info 152  [00:04:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Type roots
Info 153  [00:04:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/coreRef3/tsconfig.json WatchType: Type roots
Info 154  [00:04:44.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/coreRef3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 155  [00:04:45.000] Project '/user/username/projects/myproject/coreRef3/tsconfig.json' (Configured)
Info 156  [00:04:46.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/coreRef3/src/file1.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info 157  [00:04:47.000] -----------------------------------------------
Info 158  [00:04:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/src/file1.d.ts 2000 undefined Project: /user/username/projects/myproject/core/tsconfig.json WatchType: Missing generated file
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/core/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/indirect/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/coreRef1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/indirectDisabledChildLoad1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/indirectDisabledChildLoad2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/refToCoreRef3/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/coreRef3/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/core/src/file1.d.ts:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/main/tsconfig.json:
  {}
/user/username/projects/myproject/core/tsconfig.json:
  {}
/user/username/projects/myproject/indirect/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef1/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef2/tsconfig.json:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2/tsconfig.json:
  {}
/user/username/projects/myproject/coreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/refToCoreRef3/tsconfig.json:
  {}
/user/username/projects/myproject/indirectNoCoreRef/tsconfig.json:
  {}
/user/username/projects/myproject/noCoreRef2/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/indirect/src/file1.ts:
  {}
/user/username/projects/myproject/coreRef1/src/file1.ts:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1/src/file1.ts:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2/src/file1.ts:
  {}
/user/username/projects/myproject/refToCoreRef3/src/file1.ts:
  {}
/user/username/projects/myproject/coreRef3/src/file1.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/main:
  {}
/user/username/projects/myproject/core:
  {}
/user/username/projects/myproject/indirect:
  {}
/user/username/projects/myproject/coreRef1:
  {}
/user/username/projects/myproject/noCoreRef1:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad1:
  {}
/user/username/projects/myproject/coreRef2:
  {}
/user/username/projects/myproject/indirectDisabledChildLoad2:
  {}
/user/username/projects/myproject/coreRef3:
  {}
/user/username/projects/myproject/refToCoreRef3:
  {}
/user/username/projects/myproject/indirectNoCoreRef:
  {}
/user/username/projects/myproject/noCoreRef2:
  {}

Info 159  [00:04:49.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/myproject/core/src/file1.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 29
            },
            "lineText": "export const coreConst = 10;",
            "isWriteAccess": true,
            "isDefinition": true
          }
        ],
        "symbolName": "coreConst",
        "symbolStartOffset": 14,
        "symbolDisplayString": "const coreConst: 10"
      },
      "responseRequired": true
    }