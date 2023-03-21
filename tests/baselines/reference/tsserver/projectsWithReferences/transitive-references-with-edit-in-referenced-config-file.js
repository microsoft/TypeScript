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
{"compilerOptions":{"composite":true},"files":["index.ts"]}

//// [/user/username/projects/myproject/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../*"]}},"files":["index.ts"],"references":[{"path":"../a"}]}

//// [/user/username/projects/myproject/c/tsconfig.json]
{"compilerOptions":{"baseUrl":"./","paths":{"@ref/*":["../refs/*"]}},"files":["index.ts"],"references":[{"path":"../b"}]}

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
Info 6    [00:00:45.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info 7    [00:00:46.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
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
Info 8    [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 9    [00:00:48.000] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info 10   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 11   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/index.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/index.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:56.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs/a.d.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:57.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 22   [00:01:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 23   [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 24   [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 25   [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 26   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 27   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 28   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info 29   [00:01:08.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:01:09.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 31   [00:01:10.000] 	Files (5)
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
	  Part of 'files' list in tsconfig.json

Info 32   [00:01:11.000] -----------------------------------------------
Info 33   [00:01:12.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 33   [00:01:13.000] 	Files (5)

Info 33   [00:01:14.000] -----------------------------------------------
Info 33   [00:01:15.000] Open files: 
Info 33   [00:01:16.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 33   [00:01:17.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info 33   [00:01:21.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/nrefs :: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 34   [00:01:22.000] Scheduled: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Info 35   [00:01:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/nrefs :: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 36   [00:01:28.000] FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 37   [00:01:29.000] Scheduled: /user/username/projects/myproject/c/tsconfig.json
Info 38   [00:01:30.000] Scheduled: *ensureProjectForOpenFiles*
Info 39   [00:01:31.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Before running timeout callbacks
//// [/user/username/projects/myproject/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../nrefs/*"]}},"files":["index.ts"],"references":[{"path":"../a"}]}

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
/user/username/projects/myproject/b: *new*
  {}
/user/username/projects/myproject/refs: *new*
  {}
/user/username/projects/myproject/a: *new*
  {}

Info 40   [00:01:32.000] Running: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Info 41   [00:01:33.000] Running: /user/username/projects/myproject/c/tsconfig.json
Info 42   [00:01:34.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info 43   [00:01:35.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/index.ts"
 ],
 "options": {
  "composite": true,
  "baseUrl": "/user/username/projects/myproject/b",
  "paths": {
   "@ref/*": [
    "../nrefs/*"
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
Info 44   [00:01:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/nrefs/a.d.ts 500 undefined WatchType: Closed Script info
Info 45   [00:01:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/nrefs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [00:01:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/nrefs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 47   [00:01:39.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 48   [00:01:40.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 49   [00:01:41.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 50   [00:01:42.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 51   [00:01:43.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/nrefs/a.d.ts Text-1 "export class X {}\nexport class A {}"
	/user/username/projects/myproject/b/index.ts Text-1 "import {A} from '@ref/a';\nexport const b = new A();"
	/user/username/projects/myproject/refs/a.d.ts Text-1 "export class X {}\nexport class A {}"
	/user/username/projects/myproject/c/index.ts SVC-1-0 "import {b} from '../b';\nimport {X} from \"@ref/a\";\nb;\nX;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../nrefs/a.d.ts
	  Imported via '@ref/a' from file '../b/index.ts'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	../refs/a.d.ts
	  Imported via "@ref/a" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 52   [00:01:44.000] -----------------------------------------------
Info 53   [00:01:45.000] Running: *ensureProjectForOpenFiles*
Info 54   [00:01:46.000] Before ensureProjectForOpenFiles:
Info 55   [00:01:47.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 55   [00:01:48.000] 	Files (5)

Info 55   [00:01:49.000] -----------------------------------------------
Info 55   [00:01:50.000] Open files: 
Info 55   [00:01:51.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 55   [00:01:52.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info 55   [00:01:53.000] After ensureProjectForOpenFiles:
Info 56   [00:01:54.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 56   [00:01:55.000] 	Files (5)

Info 56   [00:01:56.000] -----------------------------------------------
Info 56   [00:01:57.000] Open files: 
Info 56   [00:01:58.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 56   [00:01:59.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
After running timeout callbacks

PolledWatches::
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
/user/username/projects/myproject/nrefs/a.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/refs:
  {}
/user/username/projects/myproject/nrefs: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/a:
  {}

Info 56   [00:02:03.000] FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info 57   [00:02:04.000] Scheduled: /user/username/projects/myproject/c/tsconfig.json
Info 58   [00:02:05.000] Scheduled: *ensureProjectForOpenFiles*
Info 59   [00:02:06.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Before checking timeout queue length (2) and running
//// [/user/username/projects/myproject/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../*"]}},"files":["index.ts"],"references":[{"path":"../a"}]}


Info 60   [00:02:07.000] Running: /user/username/projects/myproject/c/tsconfig.json
Info 61   [00:02:08.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info 62   [00:02:09.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
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
Info 63   [00:02:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 64   [00:02:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 65   [00:02:12.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/nrefs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 66   [00:02:13.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/nrefs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info 67   [00:02:14.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 68   [00:02:15.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 69   [00:02:16.000] 	Files (5)
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
	  Part of 'files' list in tsconfig.json

Info 70   [00:02:17.000] -----------------------------------------------
Info 71   [00:02:18.000] Running: *ensureProjectForOpenFiles*
Info 72   [00:02:19.000] Before ensureProjectForOpenFiles:
Info 73   [00:02:20.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 73   [00:02:21.000] 	Files (5)

Info 73   [00:02:22.000] -----------------------------------------------
Info 73   [00:02:23.000] Open files: 
Info 73   [00:02:24.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 73   [00:02:25.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info 73   [00:02:26.000] After ensureProjectForOpenFiles:
Info 74   [00:02:27.000] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info 74   [00:02:28.000] 	Files (5)

Info 74   [00:02:29.000] -----------------------------------------------
Info 74   [00:02:30.000] Open files: 
Info 74   [00:02:31.000] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info 74   [00:02:32.000] 		Projects: /user/username/projects/myproject/c/tsconfig.json
After checking timeout queue length (2) and running

PolledWatches::
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
/user/username/projects/myproject/nrefs/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/refs:
  {}
/user/username/projects/myproject/a: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/nrefs:
  {}
