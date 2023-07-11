currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
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


Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/c
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/c/index.ts :: Config file name: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/c/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/b/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/refs/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 3
1: /user/username/projects/myproject/c/tsconfig.json
2: *ensureProjectForOpenFiles*
3: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
//// [/user/username/projects/myproject/b/tsconfig.json] deleted

PolledWatches::
/user/username/projects/myproject/c/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/a/index.ts: *new*
  {}
/user/username/projects/myproject/a/tsconfig.json: *new*
  {}
/user/username/projects/myproject/b/index.ts: *new*
  {}
/user/username/projects/myproject/b/tsconfig.json: *new*
  {}
/user/username/projects/myproject/c/tsconfig.json: *new*
  {}
/user/username/projects/myproject/refs/a.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/a: *new*
  {}
/user/username/projects/myproject/b: *new*
  {}
/user/username/projects/myproject/refs: *new*
  {}

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/refs/a.d.ts Text-1 "export class X {}\nexport class A {}"
	/user/username/projects/myproject/b/index.ts Text-1 "import {A} from '@ref/a';\nexport const b = new A();"
	/user/username/projects/myproject/c/index.ts SVC-1-0 "import {b} from '../b';\nimport {X} from \"@ref/a\";\nb;\nX;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../refs/a.d.ts
	  Imported via '@ref/a' from file '../b/index.ts'
	  Imported via "@ref/a" from file 'index.ts'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/c/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/a/index.ts:
  {}
/user/username/projects/myproject/b/index.ts:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject/c/tsconfig.json:
  {}
/user/username/projects/myproject/refs/a.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/a/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/refs:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/a:
  {}

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json :: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 3
4: /user/username/projects/myproject/c/tsconfig.json
5: *ensureProjectForOpenFiles*
6: /user/username/projects/myproject/c/tsconfig.jsonFailedLookupInvalidation
//// [/user/username/projects/myproject/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../*"]}},"files":["index.ts"],"references":[{"path":"../a"}]}


Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/b/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Project: /user/username/projects/myproject/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/c/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/c/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/c/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/c/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/a/index.ts:
  {}
/user/username/projects/myproject/a/tsconfig.json: *new*
  {}
/user/username/projects/myproject/b/index.ts:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject/c/tsconfig.json:
  {}
/user/username/projects/myproject/refs/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/a: *new*
  {}
/user/username/projects/myproject/b:
  {}
/user/username/projects/myproject/refs:
  {}
