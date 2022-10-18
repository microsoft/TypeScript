Info 0    [00:00:11.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/c/d/f0.ts]
import {x} from "f1"

//// [/c/f1.ts]
foo()


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [00:00:12.000] Search path: /c/d
Info 2    [00:00:13.000] For info: /c/d/f0.ts :: No config files found.
Info 3    [00:00:14.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /c/f1.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 6    [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 7    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:22.000] 	Files (2)
	/c/f1.ts
	/c/d/f0.ts


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

Info 12   [00:00:23.000] -----------------------------------------------
Info 13   [00:00:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:25.000] 	Files (2)

Info 13   [00:00:26.000] -----------------------------------------------
Info 13   [00:00:27.000] Open files: 
Info 13   [00:00:28.000] 	FileName: /c/d/f0.ts ProjectRootPath: undefined
Info 13   [00:00:29.000] 		Projects: /dev/null/inferredProject1*
Info 13   [00:00:30.000] getSemanticDiagnostics:: /c/f1.ts:: 1
Info 14   [00:00:31.000] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info 15   [00:00:32.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 16   [00:00:33.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 17   [00:00:34.000] Different program with same set of files
Info 18   [00:00:35.000] getSemanticDiagnostics:: /c/f1.ts:: 1
Info 19   [00:00:36.000] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info 20   [00:00:37.000] fileExists:: []
Info 21   [00:00:38.000] directoryExists:: []
Info 22   [00:00:39.000] getDirectories:: []
Info 23   [00:00:40.000] readFile:: []
Info 24   [00:00:41.000] readDirectory:: []
Info 25   [00:00:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 26   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 27   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 28   [00:00:45.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 29   [00:00:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:00:47.000] 	Files (1)
	/c/d/f0.ts


	f0.ts
	  Root file specified for compilation

Info 31   [00:00:48.000] -----------------------------------------------
Info 32   [00:00:49.000] Could not find source file: '/c/f1.ts'.
Info 33   [00:00:50.000] fileExists:: [{"key":"/c/d/f2.ts","count":1},{"key":"/c/d/f2.tsx","count":1},{"key":"/c/d/f2.d.ts","count":1},{"key":"/c/f2.ts","count":1},{"key":"/c/f2.tsx","count":1},{"key":"/c/f2.d.ts","count":1},{"key":"/f2.ts","count":1},{"key":"/f2.tsx","count":1},{"key":"/f2.d.ts","count":1},{"key":"/c/d/f2.js","count":1},{"key":"/c/d/f2.jsx","count":1},{"key":"/c/f2.js","count":1},{"key":"/c/f2.jsx","count":1},{"key":"/f2.js","count":1},{"key":"/f2.jsx","count":1}]
Info 34   [00:00:51.000] directoryExists:: [{"key":"/c/d","count":2},{"key":"/c","count":2},{"key":"/","count":2},{"key":"/c/d/node_modules","count":2},{"key":"/c/node_modules","count":1},{"key":"/node_modules","count":1},{"key":"/c/d/node_modules/@types","count":1},{"key":"/c/node_modules/@types","count":1},{"key":"/node_modules/@types","count":1}]
Info 35   [00:00:52.000] getDirectories:: []
Info 36   [00:00:53.000] readFile:: []
Info 37   [00:00:54.000] readDirectory:: []
Info 38   [00:00:55.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 39   [00:00:56.000] DirectoryWatcher:: Close:: WatchInfo: /c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 40   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 41   [00:00:58.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 42   [00:00:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 43   [00:01:00.000] 	Files (2)
	/c/f1.ts
	/c/d/f0.ts


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

Info 44   [00:01:01.000] -----------------------------------------------
Info 45   [00:01:02.000] getSemanticDiagnostics:: /c/f1.ts:: 1
Info 46   [00:01:03.000] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info 47   [00:01:04.000] fileExists:: [{"key":"/c/d/f1.ts","count":1},{"key":"/c/d/f1.tsx","count":1},{"key":"/c/d/f1.d.ts","count":1},{"key":"/c/f1.ts","count":1}]
Info 48   [00:01:05.000] directoryExists:: [{"key":"/c/d","count":1},{"key":"/c","count":1},{"key":"/c/d/node_modules/@types","count":1},{"key":"/c/node_modules/@types","count":1},{"key":"/node_modules/@types","count":1}]
Info 49   [00:01:06.000] getDirectories:: []
Info 50   [00:01:07.000] readFile:: []
Info 51   [00:01:08.000] readDirectory:: []
Info 52   [00:01:09.000] DirectoryWatcher:: Close:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 53   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 54   [00:01:11.000] DirectoryWatcher:: Close:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 55   [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 56   [00:01:13.000] Scheduled: /dev/null/inferredProject1*
Info 57   [00:01:14.000] Scheduled: *ensureProjectForOpenFiles*
Info 58   [00:01:15.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 59   [00:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 60   [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 61   [00:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 62   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 63   [00:01:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 64   [00:01:21.000] Different program with same set of files
Info 65   [00:01:22.000] getSemanticDiagnostics:: /c/f1.ts:: 1
Info 66   [00:01:23.000] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info 67   [00:01:24.000] fileExists:: [{"key":"/c/d/f1.ts","count":1},{"key":"/c/d/f1.tsx","count":1},{"key":"/c/d/f1.d.ts","count":1},{"key":"/c/f1.ts","count":1}]
Info 68   [00:01:25.000] directoryExists:: [{"key":"/c/d","count":2},{"key":"/c","count":1},{"key":"/c/d/node_modules/@types","count":2},{"key":"/c/node_modules/@types","count":1},{"key":"/node_modules/@types","count":1}]
Info 69   [00:01:26.000] getDirectories:: []
Info 70   [00:01:27.000] readFile:: []
Info 71   [00:01:28.000] readDirectory:: []