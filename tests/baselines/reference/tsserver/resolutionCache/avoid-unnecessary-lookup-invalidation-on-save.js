Info 0    [00:00:35.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/src/node_modules/module1/index.ts]
export function module1() {}

//// [/user/username/projects/myproject/node_modules/module2/index.ts]
export function module2() {}

//// [/user/username/projects/myproject/src/file1.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"traceResolution":true}}

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

Info 1    [00:00:36.000] Search path: /user/username/projects/myproject/src
Info 2    [00:00:37.000] For info: /user/username/projects/myproject/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:00:38.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:40.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/file1.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [00:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:43.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 9    [00:00:44.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/src/file1.ts'. ========
Info 10   [00:00:45.000] Module resolution kind is not specified, using 'Node10'.
Info 11   [00:00:46.000] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 12   [00:00:47.000] File '/user/username/projects/myproject/src/node_modules/module1/package.json' does not exist.
Info 13   [00:00:48.000] File '/user/username/projects/myproject/src/node_modules/module1.ts' does not exist.
Info 14   [00:00:49.000] File '/user/username/projects/myproject/src/node_modules/module1.tsx' does not exist.
Info 15   [00:00:50.000] File '/user/username/projects/myproject/src/node_modules/module1.d.ts' does not exist.
Info 16   [00:00:51.000] File '/user/username/projects/myproject/src/node_modules/module1/index.ts' exists - use it as a name resolution result.
Info 17   [00:00:52.000] Resolving real path for '/user/username/projects/myproject/src/node_modules/module1/index.ts', result '/user/username/projects/myproject/src/node_modules/module1/index.ts'.
Info 18   [00:00:53.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'. ========
Info 19   [00:00:54.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/src/file1.ts'. ========
Info 20   [00:00:55.000] Module resolution kind is not specified, using 'Node10'.
Info 21   [00:00:56.000] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 22   [00:00:57.000] File '/user/username/projects/myproject/src/node_modules/module2.ts' does not exist.
Info 23   [00:00:58.000] File '/user/username/projects/myproject/src/node_modules/module2.tsx' does not exist.
Info 24   [00:00:59.000] File '/user/username/projects/myproject/src/node_modules/module2.d.ts' does not exist.
Info 25   [00:01:00.000] Directory '/user/username/projects/myproject/src/node_modules/@types' does not exist, skipping all lookups in it.
Info 26   [00:01:01.000] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist.
Info 27   [00:01:02.000] File '/user/username/projects/myproject/node_modules/module2.ts' does not exist.
Info 28   [00:01:03.000] File '/user/username/projects/myproject/node_modules/module2.tsx' does not exist.
Info 29   [00:01:04.000] File '/user/username/projects/myproject/node_modules/module2.d.ts' does not exist.
Info 30   [00:01:05.000] File '/user/username/projects/myproject/node_modules/module2/index.ts' exists - use it as a name resolution result.
Info 31   [00:01:06.000] Resolving real path for '/user/username/projects/myproject/node_modules/module2/index.ts', result '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 32   [00:01:07.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 33   [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 34   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 35   [00:01:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 36   [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 37   [00:01:12.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 38   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 39   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 40   [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 41   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 42   [00:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 43   [00:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 44   [00:01:19.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 45   [00:01:20.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 46   [00:01:21.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/node_modules/module1/index.ts
	/user/username/projects/myproject/node_modules/module2/index.ts
	/user/username/projects/myproject/src/file1.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/node_modules/module1/index.ts
	  Imported via "module1" from file 'src/file1.ts'
	node_modules/module2/index.ts
	  Imported via "module2" from file 'src/file1.ts'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info 47   [00:01:22.000] -----------------------------------------------
Info 48   [00:01:23.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 48   [00:01:24.000] 	Files (4)

Info 48   [00:01:25.000] -----------------------------------------------
Info 48   [00:01:26.000] Open files: 
Info 48   [00:01:27.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 48   [00:01:28.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 48   [00:01:30.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 49   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 50   [00:01:32.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 51   [00:01:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 52   [00:01:36.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 53   [00:01:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 54   [00:01:38.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 55   [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (0) and running
//// [/user/username/projects/myproject/src/file1.ts] file changed its modified time

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/src/node_modules:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/src:
  {}

After checking timeout queue length (0) and running

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/src/node_modules:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/src:
  {}
