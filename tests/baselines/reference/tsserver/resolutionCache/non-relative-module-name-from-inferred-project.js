Info 0    [00:00:47.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/product/node_modules/module1/index.ts]
export function module1() {}

//// [/user/username/projects/myproject/node_modules/module2/index.ts]
export function module2() {}

//// [/user/username/projects/myproject/product/src/file1.ts]
import "./feature/file2"; import "../test/file4"; import "../test/src/file3"; import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/src/feature/file2.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/test/src/file3.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/test/file4.ts]
import { module1 } from "module1";import { module2 } from "module2";

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

Info 1    [00:00:48.000] Search path: /user/username/projects/myproject/product/src
Info 2    [00:00:49.000] For info: /user/username/projects/myproject/product/src/file1.ts :: No config files found.
Info 3    [00:00:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 4    [00:00:51.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [00:00:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 9    [00:00:56.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 10   [00:00:57.000] ======== Resolving module './feature/file2' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 11   [00:00:58.000] Module resolution kind is not specified, using 'Node10'.
Info 12   [00:00:59.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/src/feature/file2', target file types: TypeScript, Declaration.
Info 13   [00:01:00.000] File '/user/username/projects/myproject/product/src/feature/file2.ts' exist - use it as a name resolution result.
Info 14   [00:01:01.000] ======== Module name './feature/file2' was successfully resolved to '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Info 15   [00:01:02.000] ======== Resolving module '../test/file4' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 16   [00:01:03.000] Module resolution kind is not specified, using 'Node10'.
Info 17   [00:01:04.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/test/file4', target file types: TypeScript, Declaration.
Info 18   [00:01:05.000] File '/user/username/projects/myproject/product/test/file4.ts' exist - use it as a name resolution result.
Info 19   [00:01:06.000] ======== Module name '../test/file4' was successfully resolved to '/user/username/projects/myproject/product/test/file4.ts'. ========
Info 20   [00:01:07.000] ======== Resolving module '../test/src/file3' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 21   [00:01:08.000] Module resolution kind is not specified, using 'Node10'.
Info 22   [00:01:09.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/test/src/file3', target file types: TypeScript, Declaration.
Info 23   [00:01:10.000] File '/user/username/projects/myproject/product/test/src/file3.ts' exist - use it as a name resolution result.
Info 24   [00:01:11.000] ======== Module name '../test/src/file3' was successfully resolved to '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Info 25   [00:01:12.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 26   [00:01:13.000] Module resolution kind is not specified, using 'Node10'.
Info 27   [00:01:14.000] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 28   [00:01:15.000] Directory '/user/username/projects/myproject/product/src/node_modules' does not exist, skipping all lookups in it.
Info 29   [00:01:16.000] File '/user/username/projects/myproject/product/node_modules/module1/package.json' does not exist.
Info 30   [00:01:17.000] File '/user/username/projects/myproject/product/node_modules/module1.ts' does not exist.
Info 31   [00:01:18.000] File '/user/username/projects/myproject/product/node_modules/module1.tsx' does not exist.
Info 32   [00:01:19.000] File '/user/username/projects/myproject/product/node_modules/module1.d.ts' does not exist.
Info 33   [00:01:20.000] File '/user/username/projects/myproject/product/node_modules/module1/index.ts' exist - use it as a name resolution result.
Info 34   [00:01:21.000] Resolving real path for '/user/username/projects/myproject/product/node_modules/module1/index.ts', result '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 35   [00:01:22.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 36   [00:01:23.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 37   [00:01:24.000] Module resolution kind is not specified, using 'Node10'.
Info 38   [00:01:25.000] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 39   [00:01:26.000] Directory '/user/username/projects/myproject/product/src/node_modules' does not exist, skipping all lookups in it.
Info 40   [00:01:27.000] File '/user/username/projects/myproject/product/node_modules/module2.ts' does not exist.
Info 41   [00:01:28.000] File '/user/username/projects/myproject/product/node_modules/module2.tsx' does not exist.
Info 42   [00:01:29.000] File '/user/username/projects/myproject/product/node_modules/module2.d.ts' does not exist.
Info 43   [00:01:30.000] Directory '/user/username/projects/myproject/product/node_modules/@types' does not exist, skipping all lookups in it.
Info 44   [00:01:31.000] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist.
Info 45   [00:01:32.000] File '/user/username/projects/myproject/node_modules/module2.ts' does not exist.
Info 46   [00:01:33.000] File '/user/username/projects/myproject/node_modules/module2.tsx' does not exist.
Info 47   [00:01:34.000] File '/user/username/projects/myproject/node_modules/module2.d.ts' does not exist.
Info 48   [00:01:35.000] File '/user/username/projects/myproject/node_modules/module2/index.ts' exist - use it as a name resolution result.
Info 49   [00:01:36.000] Resolving real path for '/user/username/projects/myproject/node_modules/module2/index.ts', result '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 50   [00:01:37.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 51   [00:01:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 52   [00:01:39.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Info 53   [00:01:40.000] Module resolution kind is not specified, using 'Node10'.
Info 54   [00:01:41.000] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 55   [00:01:42.000] Directory '/user/username/projects/myproject/product/src/feature/node_modules' does not exist, skipping all lookups in it.
Info 56   [00:01:43.000] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product/src'.
Info 57   [00:01:44.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 58   [00:01:45.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Info 59   [00:01:46.000] Module resolution kind is not specified, using 'Node10'.
Info 60   [00:01:47.000] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 61   [00:01:48.000] Directory '/user/username/projects/myproject/product/src/feature/node_modules' does not exist, skipping all lookups in it.
Info 62   [00:01:49.000] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product/src'.
Info 63   [00:01:50.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 64   [00:01:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 65   [00:01:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 66   [00:01:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 67   [00:01:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 68   [00:01:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Info 69   [00:01:56.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Info 70   [00:01:57.000] Module resolution kind is not specified, using 'Node10'.
Info 71   [00:01:58.000] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 72   [00:01:59.000] Directory '/user/username/projects/myproject/product/test/node_modules' does not exist, skipping all lookups in it.
Info 73   [00:02:00.000] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product'.
Info 74   [00:02:01.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 75   [00:02:02.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Info 76   [00:02:03.000] Module resolution kind is not specified, using 'Node10'.
Info 77   [00:02:04.000] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 78   [00:02:05.000] Directory '/user/username/projects/myproject/product/test/node_modules' does not exist, skipping all lookups in it.
Info 79   [00:02:06.000] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product'.
Info 80   [00:02:07.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 81   [00:02:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 82   [00:02:09.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Info 83   [00:02:10.000] Module resolution kind is not specified, using 'Node10'.
Info 84   [00:02:11.000] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 85   [00:02:12.000] Directory '/user/username/projects/myproject/product/test/src/node_modules' does not exist, skipping all lookups in it.
Info 86   [00:02:13.000] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product/test'.
Info 87   [00:02:14.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 88   [00:02:15.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Info 89   [00:02:16.000] Module resolution kind is not specified, using 'Node10'.
Info 90   [00:02:17.000] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 91   [00:02:18.000] Directory '/user/username/projects/myproject/product/test/src/node_modules' does not exist, skipping all lookups in it.
Info 92   [00:02:19.000] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product/test'.
Info 93   [00:02:20.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 94   [00:02:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 95   [00:02:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 96   [00:02:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 97   [00:02:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 98   [00:02:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 99   [00:02:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 100  [00:02:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 101  [00:02:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 102  [00:02:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 103  [00:02:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 104  [00:02:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 105  [00:02:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 106  [00:02:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 107  [00:02:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 108  [00:02:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 109  [00:02:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 110  [00:02:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 111  [00:02:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 112  [00:02:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 113  [00:02:40.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 114  [00:02:41.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 115  [00:02:42.000] 	Files (7)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/product/node_modules/module1/index.ts
	/user/username/projects/myproject/node_modules/module2/index.ts
	/user/username/projects/myproject/product/src/feature/file2.ts
	/user/username/projects/myproject/product/test/file4.ts
	/user/username/projects/myproject/product/test/src/file3.ts
	/user/username/projects/myproject/product/src/file1.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../node_modules/module1/index.ts
	  Imported via "module1" from file 'feature/file2.ts'
	  Imported via "module1" from file '../test/file4.ts'
	  Imported via "module1" from file '../test/src/file3.ts'
	  Imported via "module1" from file 'file1.ts'
	../../node_modules/module2/index.ts
	  Imported via "module2" from file 'feature/file2.ts'
	  Imported via "module2" from file '../test/file4.ts'
	  Imported via "module2" from file '../test/src/file3.ts'
	  Imported via "module2" from file 'file1.ts'
	feature/file2.ts
	  Imported via "./feature/file2" from file 'file1.ts'
	../test/file4.ts
	  Imported via "../test/file4" from file 'file1.ts'
	../test/src/file3.ts
	  Imported via "../test/src/file3" from file 'file1.ts'
	file1.ts
	  Root file specified for compilation

Info 116  [00:02:43.000] -----------------------------------------------
Info 117  [00:02:44.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 117  [00:02:45.000] 	Files (7)

Info 117  [00:02:46.000] -----------------------------------------------
Info 117  [00:02:47.000] Open files: 
Info 117  [00:02:48.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 117  [00:02:49.000] 		Projects: /dev/null/inferredProject1*
Info 117  [00:02:56.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 118  [00:02:57.000] Scheduled: /dev/null/inferredProject1*
Info 119  [00:02:58.000] Scheduled: *ensureProjectForOpenFiles*
Info 120  [00:02:59.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 121  [00:03:03.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 122  [00:03:04.000] Scheduled: /dev/null/inferredProject1*, Cancelled earlier one
Info 123  [00:03:05.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 124  [00:03:06.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 125  [00:03:10.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Info 126  [00:03:11.000] Scheduled: /dev/null/inferredProject1*, Cancelled earlier one
Info 127  [00:03:12.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 128  [00:03:13.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Before running timeout callbacks
//// [/user/username/projects/myproject/product/src/file1.ts]
import "./feature/file2"; import "../test/file4"; import "../test/src/file3"; import { module1 } from "module1";import { module2 } from "module2";import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/src/feature/file2.ts]
import { module1 } from "module1";import { module2 } from "module2";import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/test/src/file3.ts]
import { module1 } from "module1";import { module2 } from "module2";import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/test/file4.ts]
import { module1 } from "module1";import { module2 } from "module2";import { module1 } from "module1";import { module2 } from "module2";


PolledWatches::
/user/username/projects/myproject/product/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/product/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/product/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/product/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/product/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/product/test/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/product/test/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/product/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/product/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/product/src/feature/file2.ts:
  {}
/user/username/projects/myproject/product/test/file4.ts:
  {}
/user/username/projects/myproject/product/test/src/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/product/node_modules:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/product/src/feature:
  {}

Info 129  [00:03:14.000] Running: /dev/null/inferredProject1*
Info 130  [00:03:15.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 131  [00:03:16.000] Reusing resolution of module './feature/file2' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/src/feature/file2.ts'.
Info 132  [00:03:17.000] Reusing resolution of module '../test/file4' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/test/file4.ts'.
Info 133  [00:03:18.000] Reusing resolution of module '../test/src/file3' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/test/src/file3.ts'.
Info 134  [00:03:19.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 135  [00:03:20.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 136  [00:03:21.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 137  [00:03:22.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 138  [00:03:23.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 139  [00:03:24.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 140  [00:03:25.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 141  [00:03:26.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 142  [00:03:27.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 143  [00:03:28.000] Different program with same set of files
Info 144  [00:03:29.000] Running: *ensureProjectForOpenFiles*
Info 145  [00:03:30.000] Before ensureProjectForOpenFiles:
Info 146  [00:03:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 146  [00:03:32.000] 	Files (7)

Info 146  [00:03:33.000] -----------------------------------------------
Info 146  [00:03:34.000] Open files: 
Info 146  [00:03:35.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 146  [00:03:36.000] 		Projects: /dev/null/inferredProject1*
Info 146  [00:03:37.000] After ensureProjectForOpenFiles:
Info 147  [00:03:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 147  [00:03:39.000] 	Files (7)

Info 147  [00:03:40.000] -----------------------------------------------
Info 147  [00:03:41.000] Open files: 
Info 147  [00:03:42.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 147  [00:03:43.000] 		Projects: /dev/null/inferredProject1*
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/product/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/product/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/product/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/product/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/product/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/product/test/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/product/test/src/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/product/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/product/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/product/src/feature/file2.ts:
  {}
/user/username/projects/myproject/product/test/file4.ts:
  {}
/user/username/projects/myproject/product/test/src/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/product/node_modules:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/product/src/feature:
  {}
