Info 0    [16:00:39.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
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

//// [/user/username/projects/myproject/a/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/user/username/projects/myproject/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../*"]}},"references":[{"path":"../a"}]}

//// [/user/username/projects/myproject/c/tsconfig.json]
{"compilerOptions":{"baseUrl":"./","paths":{"@ref/*":["../refs/*"]}},"references":[{"path":"../b"}]}

//// [/user/username/projects/myproject/a/index.ts]
export class A {}

//// [/user/username/projects/myproject/b/index.ts]
import {A} from '@ref/a';
export const b = new A();

//// [/user/username/projects/myproject/c/index.ts]
import {b} from '../b';
import {X} from "@ref/a";
b;
X;

//// [/user/username/projects/myproject/refs/a.d.ts]
export class X {}
export class A {}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [16:00:40.000] Search path: /user/username/projects/myproject/c
Info 2    [16:00:41.000] For info: /user/username/projects/myproject/c/index.ts :: Config file name: /user/username/projects/myproject/c/tsconfig.json
Info 3    [16:00:42.000] Creating configuration project /user/username/projects/myproject/c/tsconfig.json
Info 4    [16:00:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 5    [16:00:44.000] Config: /user/username/projects/myproject/c/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/c/index.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/c",
  "paths": {
   "@ref/*": [
    "../refs/*"
   ]
  },
  "pathsBasePath": "/user/username/projects/myproject/c",
  "configFilePath": "/user/username/projects/myproject/c/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/b",
   "originalPath": "../b"
  }
 ]
}
Info 6    [16:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c 1 undefined Config: /user/username/projects/myproject/c/tsconfig.json WatchType: Wild card directory
Info 7    [16:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c 1 undefined Config: /user/username/projects/myproject/c/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:47.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [16:00:48.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info 10   [16:00:49.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/index.ts"
 ],
 "options": {
  "composite": true,
  "baseUrl": "/user/username/projects/myproject/b",
  "paths": {
   "@ref/*": [
    "../*"
   ]
  },
  "pathsBasePath": "/user/username/projects/myproject/b",
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/a",
   "originalPath": "../a"
  }
 ]
}
Info 11   [16:00:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 12   [16:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 13   [16:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 14   [16:00:53.000] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info 15   [16:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 16   [16:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 17   [16:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 18   [16:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [16:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [16:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [16:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 22   [16:01:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/index.ts 500 undefined WatchType: Closed Script info
Info 23   [16:01:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/index.ts 500 undefined WatchType: Closed Script info
Info 24   [16:01:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs/a.d.ts 500 undefined WatchType: Closed Script info
Info 25   [16:01:04.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 26   [16:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [16:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 28   [16:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 29   [16:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 30   [16:01:09.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 31   [16:01:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 32   [16:01:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 33   [16:01:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 34   [16:01:13.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 35   [16:01:14.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 36   [16:01:15.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/a/index.ts
	/user/username/projects/myproject/b/index.ts
	/user/username/projects/myproject/refs/a.d.ts
	/user/username/projects/myproject/c/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../a/index.ts
	  Imported via '@ref/a' from file '../b/index.ts'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	../refs/a.d.ts
	  Imported via "@ref/a" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 37   [16:01:16.000] -----------------------------------------------
Info 38   [16:01:17.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 38   [16:01:18.000] 	Files (5)

Info 38   [16:01:19.000] -----------------------------------------------
Info 38   [16:01:20.000] Open files: 
Info 38   [16:01:21.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 38   [16:01:22.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info 38   [16:01:24.000] FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 39   [16:01:25.000] Scheduled: /user/username/projects/myproject/c/tsconfig.json
Info 40   [16:01:26.000] Scheduled: *ensureProjectForOpenFiles*
Info 41   [16:01:27.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 42   [16:01:28.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 43   [16:01:29.000] Project: /user/username/projects/myproject/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/b/tsconfig.json
Info 44   [16:01:30.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 45   [16:01:31.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [16:01:32.000] Scheduled: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Info 47   [16:01:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Before checking timeout queue length (3) and running
//// [/user/username/projects/myproject/b/tsconfig.json] deleted

PolledWatches::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/c/tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject/a/tsconfig.json:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/b/index.ts:
  {}
/user/username/projects/myproject/a/index.ts:
  {}
/user/username/projects/myproject/refs/a.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/c:
  {}
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/a:
  {}
/user/username/projects/myproject/refs:
  {}

Info 48   [16:01:34.000] Running: /user/username/projects/myproject/c/tsconfig.json
Info 49   [16:01:35.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info 50   [16:01:36.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 }
}
Info 51   [16:01:37.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 52   [16:01:38.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 53   [16:01:39.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 54   [16:01:40.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 55   [16:01:41.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 56   [16:01:42.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 57   [16:01:43.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 58   [16:01:44.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [16:01:45.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 60   [16:01:46.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/refs/a.d.ts
	/user/username/projects/myproject/b/index.ts
	/user/username/projects/myproject/c/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../refs/a.d.ts
	  Imported via '@ref/a' from file '../b/index.ts'
	  Imported via "@ref/a" from file 'index.ts'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 61   [16:01:47.000] -----------------------------------------------
Info 62   [16:01:48.000] Running: *ensureProjectForOpenFiles*
Info 63   [16:01:49.000] Before ensureProjectForOpenFiles:
Info 64   [16:01:50.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 64   [16:01:51.000] 	Files (4)

Info 64   [16:01:52.000] -----------------------------------------------
Info 64   [16:01:53.000] Open files: 
Info 64   [16:01:54.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 64   [16:01:55.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info 64   [16:01:56.000] After ensureProjectForOpenFiles:
Info 65   [16:01:57.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 65   [16:01:58.000] 	Files (4)

Info 65   [16:01:59.000] -----------------------------------------------
Info 65   [16:02:00.000] Open files: 
Info 65   [16:02:01.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 65   [16:02:02.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
After checking timeout queue length (3) and running

PolledWatches::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/c/tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/b/index.ts:
  {}
/user/username/projects/myproject/a/index.ts:
  {}
/user/username/projects/myproject/refs/a.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/c:
  {}
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/refs:
  {}

Info 65   [16:02:05.000] FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 66   [16:02:06.000] Scheduled: /user/username/projects/myproject/c/tsconfig.json
Info 67   [16:02:07.000] Scheduled: *ensureProjectForOpenFiles*
Info 68   [16:02:08.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 69   [16:02:09.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 70   [16:02:10.000] Scheduled: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Info 71   [16:02:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Before checking timeout queue length (3) and running
//// [/user/username/projects/myproject/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../*"]}},"references":[{"path":"../a"}]}


PolledWatches::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/c/tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/b/index.ts:
  {}
/user/username/projects/myproject/a/index.ts:
  {}
/user/username/projects/myproject/refs/a.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/c:
  {}
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/refs:
  {}

Info 72   [16:02:12.000] Running: /user/username/projects/myproject/c/tsconfig.json
Info 73   [16:02:13.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info 74   [16:02:14.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/index.ts"
 ],
 "options": {
  "composite": true,
  "baseUrl": "/user/username/projects/myproject/b",
  "paths": {
   "@ref/*": [
    "../*"
   ]
  },
  "pathsBasePath": "/user/username/projects/myproject/b",
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/a",
   "originalPath": "../a"
  }
 ]
}
Info 75   [16:02:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 76   [16:02:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 77   [16:02:17.000] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info 78   [16:02:18.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 79   [16:02:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 80   [16:02:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 81   [16:02:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 82   [16:02:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 83   [16:02:23.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 84   [16:02:24.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 85   [16:02:25.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/a/index.ts
	/user/username/projects/myproject/b/index.ts
	/user/username/projects/myproject/refs/a.d.ts
	/user/username/projects/myproject/c/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../a/index.ts
	  Imported via '@ref/a' from file '../b/index.ts'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	../refs/a.d.ts
	  Imported via "@ref/a" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 86   [16:02:26.000] -----------------------------------------------
Info 87   [16:02:27.000] Running: *ensureProjectForOpenFiles*
Info 88   [16:02:28.000] Before ensureProjectForOpenFiles:
Info 89   [16:02:29.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 89   [16:02:30.000] 	Files (5)

Info 89   [16:02:31.000] -----------------------------------------------
Info 89   [16:02:32.000] Open files: 
Info 89   [16:02:33.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 89   [16:02:34.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info 89   [16:02:35.000] After ensureProjectForOpenFiles:
Info 90   [16:02:36.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 90   [16:02:37.000] 	Files (5)

Info 90   [16:02:38.000] -----------------------------------------------
Info 90   [16:02:39.000] Open files: 
Info 90   [16:02:40.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 90   [16:02:41.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
After checking timeout queue length (3) and running

PolledWatches::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/c/tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/b/index.ts:
  {}
/user/username/projects/myproject/a/index.ts:
  {}
/user/username/projects/myproject/refs/a.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/a/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/c:
  {}
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/refs:
  {}
/user/username/projects/myproject/a:
  {}
