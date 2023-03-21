Info 0    [00:00:39.000] Provided types map file "/typesMap.json" doesn't exist
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


Info 1    [00:00:40.000] Search path: /user/username/projects/myproject/c
Info 2    [00:00:41.000] For info: /user/username/projects/myproject/c/index.ts :: Config file name: /user/username/projects/myproject/c/tsconfig.json
Info 3    [00:00:42.000] Creating configuration project /user/username/projects/myproject/c/tsconfig.json
Info 4    [00:00:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 5    [00:00:44.000] Config: /user/username/projects/myproject/c/tsconfig.json : {
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
Info 6    [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c 1 undefined Config: /user/username/projects/myproject/c/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c 1 undefined Config: /user/username/projects/myproject/c/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:47.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info 9    [00:00:48.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
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
Info 10   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 11   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 12   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:52.000] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info 14   [00:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 15   [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 16   [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 17   [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:01:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/index.ts 500 undefined WatchType: Closed Script info
Info 22   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/index.ts 500 undefined WatchType: Closed Script info
Info 23   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs/a.d.ts 500 undefined WatchType: Closed Script info
Info 24   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 25   [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 26   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 28   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 29   [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 30   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 31   [00:01:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 32   [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 33   [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 34   [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 35   [00:01:14.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [00:01:15.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 37   [00:01:16.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a/index.ts Text-1 "export class A {}"
	/user/username/projects/myproject/b/index.ts Text-1 "import {A} from '@ref/a';\nexport const b = new A();"
	/user/username/projects/myproject/refs/a.d.ts Text-1 "export class X {}\nexport class A {}"
	/user/username/projects/myproject/c/index.ts SVC-1-0 "import {b} from '../b';\nimport {X} from \"@ref/a\";\nb;\nX;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../a/index.ts
	  Imported via '@ref/a' from file '../b/index.ts'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	../refs/a.d.ts
	  Imported via "@ref/a" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 38   [00:01:17.000] -----------------------------------------------
Info 39   [00:01:18.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 39   [00:01:19.000] 	Files (5)

Info 39   [00:01:20.000] -----------------------------------------------
Info 39   [00:01:21.000] Open files: 
Info 39   [00:01:22.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 39   [00:01:23.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info 39   [00:01:27.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/nrefs :: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 40   [00:01:28.000] Scheduled: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Info 41   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/nrefs :: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 42   [00:01:34.000] FileWatcher:: Triggered with /user/username/projects/myproject/c/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/c/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 43   [00:01:35.000] Scheduled: /user/username/projects/myproject/c/tsconfig.json
Info 44   [00:01:36.000] Scheduled: *ensureProjectForOpenFiles*
Info 45   [00:01:37.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/c/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/c/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Before running timeout callbacks
//// [/user/username/projects/myproject/c/tsconfig.json]
{"compilerOptions":{"baseUrl":"./","paths":{"@ref/*":["../nrefs/*"]}},"references":[{"path":"../b"}]}

//// [/user/username/projects/myproject/nrefs/a.d.ts]
export class X {}
export class A {}


PolledWatches::
/user/username/projects/myproject/c/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/c/tsconfig.json: *new*
  {}
/user/username/projects/myproject/b/tsconfig.json: *new*
  {}
/user/username/projects/myproject/a/tsconfig.json: *new*
  {}
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/b/index.ts: *new*
  {}
/user/username/projects/myproject/a/index.ts: *new*
  {}
/user/username/projects/myproject/refs/a.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/c: *new*
  {}
/user/username/projects/myproject/b: *new*
  {}
/user/username/projects/myproject/a: *new*
  {}
/user/username/projects/myproject/refs: *new*
  {}

Info 46   [00:01:38.000] Running: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Info 47   [00:01:39.000] Running: /user/username/projects/myproject/c/tsconfig.json
Info 48   [00:01:40.000] Reloading configured project /user/username/projects/myproject/c/tsconfig.json
Info 49   [00:01:41.000] Config: /user/username/projects/myproject/c/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/c/index.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/c",
  "paths": {
   "@ref/*": [
    "../nrefs/*"
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
Info 50   [00:01:42.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 51   [00:01:43.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 52   [00:01:44.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 53   [00:01:45.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 54   [00:01:46.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 55   [00:01:47.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 56   [00:01:48.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 57   [00:01:49.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 58   [00:01:50.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 59   [00:01:51.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 60   [00:01:52.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 61   [00:01:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 62   [00:01:54.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 63   [00:01:55.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 64   [00:01:56.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info 65   [00:01:57.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 66   [00:01:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 67   [00:01:59.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 68   [00:02:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 69   [00:02:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/nrefs/a.d.ts 500 undefined WatchType: Closed Script info
Info 70   [00:02:02.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/nrefs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 71   [00:02:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/nrefs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 72   [00:02:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 73   [00:02:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 74   [00:02:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 75   [00:02:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 76   [00:02:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 77   [00:02:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 78   [00:02:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 79   [00:02:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 80   [00:02:12.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 81   [00:02:13.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 82   [00:02:14.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a/index.ts Text-1 "export class A {}"
	/user/username/projects/myproject/b/index.ts Text-1 "import {A} from '@ref/a';\nexport const b = new A();"
	/user/username/projects/myproject/nrefs/a.d.ts Text-1 "export class X {}\nexport class A {}"
	/user/username/projects/myproject/c/index.ts SVC-1-0 "import {b} from '../b';\nimport {X} from \"@ref/a\";\nb;\nX;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../a/index.ts
	  Imported via '@ref/a' from file '../b/index.ts'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	../nrefs/a.d.ts
	  Imported via "@ref/a" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 83   [00:02:15.000] -----------------------------------------------
Info 84   [00:02:16.000] Running: *ensureProjectForOpenFiles*
Info 85   [00:02:17.000] Before ensureProjectForOpenFiles:
Info 86   [00:02:18.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 86   [00:02:19.000] 	Files (5)

Info 86   [00:02:20.000] -----------------------------------------------
Info 86   [00:02:21.000] Open files: 
Info 86   [00:02:22.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 86   [00:02:23.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info 86   [00:02:24.000] After ensureProjectForOpenFiles:
Info 87   [00:02:25.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 87   [00:02:26.000] 	Files (5)

Info 87   [00:02:27.000] -----------------------------------------------
Info 87   [00:02:28.000] Open files: 
Info 87   [00:02:29.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 87   [00:02:30.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500} *new*
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500} *new*
/user/username/projects/node_modules/@types:
  {"pollingInterval":500} *new*

PolledWatches *deleted*::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/c/tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject/a/tsconfig.json:
  {}
/user/username/projects/myproject/b/index.ts:
  {}
/user/username/projects/myproject/a/index.ts:
  {}
/user/username/projects/myproject/refs/a.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject:
  {} *new*
/user/username/projects/myproject/nrefs/a.d.ts: *new*
  {}

FsWatches *deleted*::
/user/username/projects/myproject:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/c:
  {}
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/a:
  {}
/user/username/projects/myproject/nrefs: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/refs:
  {}

Info 87   [00:02:34.000] FileWatcher:: Triggered with /user/username/projects/myproject/c/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/c/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 88   [00:02:35.000] Scheduled: /user/username/projects/myproject/c/tsconfig.json
Info 89   [00:02:36.000] Scheduled: *ensureProjectForOpenFiles*
Info 90   [00:02:37.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/c/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/c/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Before checking timeout queue length (2) and running
//// [/user/username/projects/myproject/c/tsconfig.json]
{"compilerOptions":{"baseUrl":"./","paths":{"@ref/*":["../refs/*"]}},"references":[{"path":"../b"}]}


Info 91   [00:02:38.000] Running: /user/username/projects/myproject/c/tsconfig.json
Info 92   [00:02:39.000] Reloading configured project /user/username/projects/myproject/c/tsconfig.json
Info 93   [00:02:40.000] Config: /user/username/projects/myproject/c/tsconfig.json : {
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
Info 94   [00:02:41.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 95   [00:02:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 96   [00:02:43.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 97   [00:02:44.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 98   [00:02:45.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/nrefs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 99   [00:02:46.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/nrefs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 100  [00:02:47.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 101  [00:02:48.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 102  [00:02:49.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 103  [00:02:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 104  [00:02:51.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 105  [00:02:52.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 106  [00:02:53.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 107  [00:02:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 108  [00:02:55.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info 109  [00:02:56.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 110  [00:02:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 111  [00:02:58.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 112  [00:02:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 113  [00:03:00.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 114  [00:03:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 115  [00:03:02.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 116  [00:03:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 117  [00:03:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 118  [00:03:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 119  [00:03:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 120  [00:03:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 121  [00:03:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 122  [00:03:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 123  [00:03:10.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 124  [00:03:11.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 125  [00:03:12.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a/index.ts Text-1 "export class A {}"
	/user/username/projects/myproject/b/index.ts Text-1 "import {A} from '@ref/a';\nexport const b = new A();"
	/user/username/projects/myproject/refs/a.d.ts Text-1 "export class X {}\nexport class A {}"
	/user/username/projects/myproject/c/index.ts SVC-1-0 "import {b} from '../b';\nimport {X} from \"@ref/a\";\nb;\nX;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../a/index.ts
	  Imported via '@ref/a' from file '../b/index.ts'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	../refs/a.d.ts
	  Imported via "@ref/a" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 126  [00:03:13.000] -----------------------------------------------
Info 127  [00:03:14.000] Running: *ensureProjectForOpenFiles*
Info 128  [00:03:15.000] Before ensureProjectForOpenFiles:
Info 129  [00:03:16.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 129  [00:03:17.000] 	Files (5)

Info 129  [00:03:18.000] -----------------------------------------------
Info 129  [00:03:19.000] Open files: 
Info 129  [00:03:20.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 129  [00:03:21.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info 129  [00:03:22.000] After ensureProjectForOpenFiles:
Info 130  [00:03:23.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 130  [00:03:24.000] 	Files (5)

Info 130  [00:03:25.000] -----------------------------------------------
Info 130  [00:03:26.000] Open files: 
Info 130  [00:03:27.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 130  [00:03:28.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
After checking timeout queue length (2) and running

PolledWatches::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500} *new*
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500} *new*
/user/username/projects/node_modules/@types:
  {"pollingInterval":500} *new*

PolledWatches *deleted*::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/c/tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject/a/tsconfig.json:
  {}
/user/username/projects/myproject/b/index.ts:
  {}
/user/username/projects/myproject/a/index.ts:
  {}
/user/username/projects/myproject/refs/a.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/nrefs/a.d.ts:
  {}
/user/username/projects/myproject:
  {} *new*

FsWatches *deleted*::
/user/username/projects/myproject:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/c:
  {}
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/a:
  {}
/user/username/projects/myproject/refs: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/nrefs:
  {}
