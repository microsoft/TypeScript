Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/a/b/app.js]

                import * as commander from "commander";

//// [/user/username/projects/node_modules/commander/index.js]
module.exports = 0


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [00:00:22.000] Search path: /user/username/projects/a/b
Info 2    [00:00:23.000] For info: /user/username/projects/a/b/app.js :: No config files found.
Info 3    [00:00:24.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [00:00:29.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 9    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 10   [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 11   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 12   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 13   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 14   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 15   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 16   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 17   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 18   [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 19   [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 20   [00:00:41.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:00:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 22   [00:00:43.000] 	Files (2)
	/user/username/projects/node_modules/commander/index.js
	/user/username/projects/a/b/app.js


	../../node_modules/commander/index.js
	  Imported via "commander" from file 'app.js'
	app.js
	  Root file specified for compilation

Info 23   [00:00:44.000] -----------------------------------------------
Info 24   [00:00:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 24   [00:00:50.000] 	Files (2)

Info 24   [00:00:51.000] -----------------------------------------------
Info 24   [00:00:52.000] Open files: 
Info 24   [00:00:53.000] 	FileName: /user/username/projects/a/b/app.js ProjectRootPath: undefined
Info 24   [00:00:54.000] 		Projects: /dev/null/inferredProject1*
Info 24   [00:01:03.000] Scheduled: /dev/null/inferredProject1*
Info 25   [00:01:04.000] Scheduled: *ensureProjectForOpenFiles*
Before checking timeout queue length (2) and running
//// [/user/username/projects/a/cache/package.json]
{ "private": true }

//// [/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts]



PolledWatches::
/user/username/projects/a/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/username/projects/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/a/b/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/user/username/projects/node_modules:
  {}

Info 26   [00:01:05.000] Running: /dev/null/inferredProject1*
Info 27   [00:01:06.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 28   [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/cache/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 29   [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/cache/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 30   [00:01:09.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 31   [00:01:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:11.000] 	Files (2)
	/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts
	/user/username/projects/a/b/app.js


	../cache/node_modules/@types/commander/index.d.ts
	  Imported via "commander" from file 'app.js'
	  Root file specified for compilation
	app.js
	  Root file specified for compilation

Info 33   [00:01:12.000] -----------------------------------------------
Info 34   [00:01:13.000] Scheduled: /dev/null/inferredProject1*
Info 35   [00:01:14.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After checking timeout queue length (2) and running

PolledWatches::
/user/username/projects/a/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/username/projects/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/a/b/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/user/username/projects/node_modules:
  {}
/user/username/projects/a/cache/node_modules:
  {}
