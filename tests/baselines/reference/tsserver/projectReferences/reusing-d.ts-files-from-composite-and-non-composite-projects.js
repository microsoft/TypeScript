currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:43.000] Provided types map file "/typesMap.json" doesn't exist
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

//// [/user/username/projects/myproject/compositea/a.ts]
import { b } from "@ref/compositeb/b";

//// [/user/username/projects/myproject/compositea/a2.ts]
export const x = 10;

//// [/user/username/projects/myproject/compositea/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"../dist/","rootDir":"../","baseUrl":"../","paths":{"@ref/*":["./dist/*"]}}}

//// [/user/username/projects/myproject/dist/compositeb/b.d.ts]
export declare function b(): void;

//// [/user/username/projects/myproject/compositeb/b.ts]
export function b() {}

//// [/user/username/projects/myproject/compositeb/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"../dist/","rootDir":"../","baseUrl":"../","paths":{"@ref/*":["./dist/*"]}}}

//// [/user/username/projects/myproject/compositec/c.ts]
import { b } from "@ref/compositeb/b";

//// [/user/username/projects/myproject/compositec/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"../dist/","rootDir":"../","baseUrl":"../","paths":{"@ref/*":["./*"]}},"references":[{"path":"../compositeb"}]}


Info 1    [00:00:44.000] Search path: /user/username/projects/myproject/compositea
Info 2    [00:00:45.000] For info: /user/username/projects/myproject/compositea/a.ts :: Config file name: /user/username/projects/myproject/compositea/tsconfig.json
Info 3    [00:00:46.000] Creating configuration project /user/username/projects/myproject/compositea/tsconfig.json
Info 4    [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositea/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/compositea/tsconfig.json WatchType: Config file
Info 5    [00:00:48.000] Config: /user/username/projects/myproject/compositea/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/compositea/a.ts",
  "/user/username/projects/myproject/compositea/a2.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/dist",
  "rootDir": "/user/username/projects/myproject",
  "baseUrl": "/user/username/projects/myproject",
  "paths": {
   "@ref/*": [
    "./dist/*"
   ]
  },
  "pathsBasePath": "/user/username/projects/myproject/compositea",
  "configFilePath": "/user/username/projects/myproject/compositea/tsconfig.json"
 }
}
Info 6    [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositea 1 undefined Config: /user/username/projects/myproject/compositea/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositea 1 undefined Config: /user/username/projects/myproject/compositea/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:51.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositea/a2.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:52.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/compositea/tsconfig.json
Info 10   [00:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dist/compositeb/b.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:54.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dist 1 undefined Project: /user/username/projects/myproject/compositea/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dist 1 undefined Project: /user/username/projects/myproject/compositea/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositea/node_modules/@types 1 undefined Project: /user/username/projects/myproject/compositea/tsconfig.json WatchType: Type roots
Info 15   [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositea/node_modules/@types 1 undefined Project: /user/username/projects/myproject/compositea/tsconfig.json WatchType: Type roots
Info 16   [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/compositea/tsconfig.json WatchType: Type roots
Info 17   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/compositea/tsconfig.json WatchType: Type roots
Info 18   [00:01:01.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/compositea/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:01:02.000] Project '/user/username/projects/myproject/compositea/tsconfig.json' (Configured)
Info 20   [00:01:03.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/dist/compositeb/b.d.ts Text-1 "export declare function b(): void;"
	/user/username/projects/myproject/compositea/a.ts SVC-1-0 "import { b } from \"@ref/compositeb/b\";"
	/user/username/projects/myproject/compositea/a2.ts Text-1 "export const x = 10;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../dist/compositeb/b.d.ts
	  Imported via "@ref/compositeb/b" from file 'a.ts'
	a.ts
	  Matched by default include pattern '**/*'
	a2.ts
	  Matched by default include pattern '**/*'

Info 21   [00:01:04.000] -----------------------------------------------
Info 22   [00:01:05.000] Search path: /user/username/projects/myproject/compositea
Info 23   [00:01:06.000] For info: /user/username/projects/myproject/compositea/tsconfig.json :: No config files found.
Info 24   [00:01:07.000] Project '/user/username/projects/myproject/compositea/tsconfig.json' (Configured)
Info 24   [00:01:08.000] 	Files (4)

Info 24   [00:01:09.000] -----------------------------------------------
Info 24   [00:01:10.000] Open files: 
Info 24   [00:01:11.000] 	FileName: /user/username/projects/myproject/compositea/a.ts ProjectRootPath: undefined
Info 24   [00:01:12.000] 		Projects: /user/username/projects/myproject/compositea/tsconfig.json
Info 24   [00:01:13.000] Search path: /user/username/projects/myproject/compositec
Info 25   [00:01:14.000] For info: /user/username/projects/myproject/compositec/c.ts :: Config file name: /user/username/projects/myproject/compositec/tsconfig.json
Info 26   [00:01:15.000] Creating configuration project /user/username/projects/myproject/compositec/tsconfig.json
Info 27   [00:01:16.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositec/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/compositec/tsconfig.json WatchType: Config file
Info 28   [00:01:17.000] Config: /user/username/projects/myproject/compositec/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/compositec/c.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/dist",
  "rootDir": "/user/username/projects/myproject",
  "baseUrl": "/user/username/projects/myproject",
  "paths": {
   "@ref/*": [
    "./*"
   ]
  },
  "pathsBasePath": "/user/username/projects/myproject/compositec",
  "configFilePath": "/user/username/projects/myproject/compositec/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/compositeb",
   "originalPath": "../compositeb"
  }
 ]
}
Info 29   [00:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositec 1 undefined Config: /user/username/projects/myproject/compositec/tsconfig.json WatchType: Wild card directory
Info 30   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositec 1 undefined Config: /user/username/projects/myproject/compositec/tsconfig.json WatchType: Wild card directory
Info 31   [00:01:20.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/compositec/tsconfig.json
Info 32   [00:01:21.000] Config: /user/username/projects/myproject/compositeb/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/compositeb/b.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/dist",
  "rootDir": "/user/username/projects/myproject",
  "baseUrl": "/user/username/projects/myproject",
  "paths": {
   "@ref/*": [
    "./dist/*"
   ]
  },
  "pathsBasePath": "/user/username/projects/myproject/compositeb",
  "configFilePath": "/user/username/projects/myproject/compositeb/tsconfig.json"
 }
}
Info 33   [00:01:22.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositeb/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/compositec/tsconfig.json WatchType: Config file
Info 34   [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositeb 1 undefined Config: /user/username/projects/myproject/compositeb/tsconfig.json WatchType: Wild card directory
Info 35   [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositeb 1 undefined Config: /user/username/projects/myproject/compositeb/tsconfig.json WatchType: Wild card directory
Info 36   [00:01:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositeb/b.ts 500 undefined WatchType: Closed Script info
Info 37   [00:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositec/node_modules/@types 1 undefined Project: /user/username/projects/myproject/compositec/tsconfig.json WatchType: Type roots
Info 38   [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/compositec/node_modules/@types 1 undefined Project: /user/username/projects/myproject/compositec/tsconfig.json WatchType: Type roots
Info 39   [00:01:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/compositec/tsconfig.json WatchType: Type roots
Info 40   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/compositec/tsconfig.json WatchType: Type roots
Info 41   [00:01:30.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/compositec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 42   [00:01:31.000] Project '/user/username/projects/myproject/compositec/tsconfig.json' (Configured)
Info 43   [00:01:32.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/compositeb/b.ts Text-1 "export function b() {}"
	/user/username/projects/myproject/compositec/c.ts SVC-1-0 "import { b } from \"@ref/compositeb/b\";"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../compositeb/b.ts
	  Imported via "@ref/compositeb/b" from file 'c.ts'
	c.ts
	  Matched by default include pattern '**/*'

Info 44   [00:01:33.000] -----------------------------------------------
Info 45   [00:01:34.000] Search path: /user/username/projects/myproject/compositec
Info 46   [00:01:35.000] For info: /user/username/projects/myproject/compositec/tsconfig.json :: No config files found.
Info 47   [00:01:36.000] Project '/user/username/projects/myproject/compositea/tsconfig.json' (Configured)
Info 47   [00:01:37.000] 	Files (4)

Info 47   [00:01:38.000] -----------------------------------------------
Info 47   [00:01:39.000] Project '/user/username/projects/myproject/compositec/tsconfig.json' (Configured)
Info 47   [00:01:40.000] 	Files (3)

Info 47   [00:01:41.000] -----------------------------------------------
Info 47   [00:01:42.000] Open files: 
Info 47   [00:01:43.000] 	FileName: /user/username/projects/myproject/compositea/a.ts ProjectRootPath: undefined
Info 47   [00:01:44.000] 		Projects: /user/username/projects/myproject/compositea/tsconfig.json
Info 47   [00:01:45.000] 	FileName: /user/username/projects/myproject/compositec/c.ts ProjectRootPath: undefined
Info 47   [00:01:46.000] 		Projects: /user/username/projects/myproject/compositec/tsconfig.json
Info 47   [00:01:50.000] FileWatcher:: Triggered with /user/username/projects/myproject/compositea/a2.ts 1:: WatchInfo: /user/username/projects/myproject/compositea/a2.ts 500 undefined WatchType: Closed Script info
Info 48   [00:01:51.000] Scheduled: /user/username/projects/myproject/compositea/tsconfig.json
Info 49   [00:01:52.000] Scheduled: *ensureProjectForOpenFiles*
Info 50   [00:01:53.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/compositea/a2.ts 1:: WatchInfo: /user/username/projects/myproject/compositea/a2.ts 500 undefined WatchType: Closed Script info
a2Ts modified
//// [/user/username/projects/myproject/compositea/a2.ts]
export const x = 10;export const y = 30;


PolledWatches::
/user/username/projects/myproject/compositea/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/compositec/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/compositea/tsconfig.json: *new*
  {}
/user/username/projects/myproject/compositea/a2.ts: *new*
  {}
/user/username/projects/myproject/dist/compositeb/b.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/compositec/tsconfig.json: *new*
  {}
/user/username/projects/myproject/compositeb/tsconfig.json: *new*
  {}
/user/username/projects/myproject/compositeb/b.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/compositea: *new*
  {}
/user/username/projects/myproject/dist: *new*
  {}
/user/username/projects/myproject/compositec: *new*
  {}
/user/username/projects/myproject/compositeb: *new*
  {}

Info 51   [00:01:54.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/compositea/tsconfig.json
Info 52   [00:01:55.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/compositea/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 53   [00:01:56.000] Project '/user/username/projects/myproject/compositea/tsconfig.json' (Configured)
Info 54   [00:01:57.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/dist/compositeb/b.d.ts Text-1 "export declare function b(): void;"
	/user/username/projects/myproject/compositea/a.ts SVC-1-0 "import { b } from \"@ref/compositeb/b\";"
	/user/username/projects/myproject/compositea/a2.ts Text-2 "export const x = 10;export const y = 30;"

Info 55   [00:01:58.000] -----------------------------------------------