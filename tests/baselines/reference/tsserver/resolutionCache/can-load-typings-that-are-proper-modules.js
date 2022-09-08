Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]
var x = require("lib")

//// [/a/cache/node_modules/@types/lib/index.d.ts]
export let x = 1


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [00:00:20.000] Search path: /a/b
Info 2    [00:00:21.000] For info: /a/b/app.js :: No config files found.
Info 3    [00:00:22.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 4    [00:00:23.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:24.000] ======== Resolving module 'lib' from '/a/b/app.js'. ========
Info 6    [00:00:25.000] Module resolution kind is not specified, using 'NodeJs'.
Info 7    [00:00:26.000] Loading module 'lib' from 'node_modules' folder, target file type 'TypeScript'.
Info 8    [00:00:27.000] Directory '/a/b/node_modules' does not exist, skipping all lookups in it.
Info 9    [00:00:28.000] Directory '/a/node_modules' does not exist, skipping all lookups in it.
Info 10   [00:00:29.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 11   [00:00:30.000] Loading module 'lib' from 'node_modules' folder, target file type 'JavaScript'.
Info 12   [00:00:31.000] Directory '/a/b/node_modules' does not exist, skipping all lookups in it.
Info 13   [00:00:32.000] Directory '/a/node_modules' does not exist, skipping all lookups in it.
Info 14   [00:00:33.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 15   [00:00:34.000] ======== Module name 'lib' was not resolved. ========
Info 16   [00:00:35.000] Auto discovery for typings is enabled in project '/dev/null/inferredProject1*'. Running extra resolution pass for module 'lib' using cache location '/a/cache'.
Info 17   [00:00:36.000] File '/a/cache/node_modules/lib.d.ts' does not exist.
Info 18   [00:00:37.000] File '/a/cache/node_modules/@types/lib/package.json' does not exist.
Info 19   [00:00:38.000] File '/a/cache/node_modules/@types/lib.d.ts' does not exist.
Info 20   [00:00:39.000] File '/a/cache/node_modules/@types/lib/index.d.ts' exist - use it as a name resolution result.
Info 21   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 22   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 23   [00:00:42.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 24   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 25   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 26   [00:00:45.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 27   [00:00:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 28   [00:00:47.000] 	Files (2)
	/a/cache/node_modules/@types/lib/index.d.ts
	/a/b/app.js


	../cache/node_modules/@types/lib/index.d.ts
	  Imported via "lib" from file 'app.js'
	app.js
	  Root file specified for compilation

Info 29   [00:00:48.000] -----------------------------------------------
Info 30   [00:00:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:00:50.000] 	Files (2)

Info 30   [00:00:51.000] -----------------------------------------------
Info 30   [00:00:52.000] Open files: 
Info 30   [00:00:53.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 30   [00:00:54.000] 		Projects: /dev/null/inferredProject1*