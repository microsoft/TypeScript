currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/file1.ts]
import { T } from "module1";

//// [/a/b/node_modules/module1.ts]
export interface T {}

//// [/a/module1.ts]
export interface T {}

//// [/a/b/tsconfig.json]
{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["/a/b/file1.ts"]
                }

//// [/a/file1.ts]
export interface T {}


Info 1    [00:00:20.000] Search path: /a/b
Info 2    [00:00:21.000] For info: /a/b/file1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:22.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:24.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1.ts"
 ],
 "options": {
  "moduleResolution": 2,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:25.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 7    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 8    [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 9    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 10   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 12   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:33.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:34.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:35.000] 	Files (2)
	/a/b/node_modules/module1.ts Text-1 "export interface T {}"
	/a/b/file1.ts SVC-1-0 "import { T } from \"module1\";"


	node_modules/module1.ts
	  Imported via "module1" from file 'file1.ts'
	file1.ts
	  Part of 'files' list in tsconfig.json

Info 17   [00:00:36.000] -----------------------------------------------
Info 18   [00:00:37.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:38.000] 	Files (2)

Info 18   [00:00:39.000] -----------------------------------------------
Info 18   [00:00:40.000] Open files: 
Info 18   [00:00:41.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 18   [00:00:42.000] 		Projects: /a/b/tsconfig.json
Info 18   [00:00:43.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 19   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 20   [00:00:45.000] Search path: /a/b/node_modules
Info 21   [00:00:46.000] For info: /a/b/node_modules/module1.ts :: No config files found.
Info 22   [00:00:47.000] Project '/a/b/tsconfig.json' (Configured)
Info 22   [00:00:48.000] 	Files (2)

Info 22   [00:00:49.000] -----------------------------------------------
Info 22   [00:00:50.000] Open files: 
Info 22   [00:00:51.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 22   [00:00:52.000] 		Projects: /a/b/tsconfig.json
Info 22   [00:00:53.000] 	FileName: /a/b/node_modules/module1.ts ProjectRootPath: undefined
Info 22   [00:00:54.000] 		Projects: /a/b/tsconfig.json
Info 22   [00:00:55.000] Search path: /a
Info 23   [00:00:56.000] For info: /a/module1.ts :: No config files found.
Info 24   [00:00:57.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 25   [00:00:58.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 26   [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 27   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 28   [00:01:01.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 29   [00:01:02.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:01:03.000] 	Files (1)
	/a/module1.ts SVC-1-0 "export interface T {}"


	module1.ts
	  Root file specified for compilation

Info 31   [00:01:04.000] -----------------------------------------------
Info 32   [00:01:05.000] Project '/a/b/tsconfig.json' (Configured)
Info 32   [00:01:06.000] 	Files (2)

Info 32   [00:01:07.000] -----------------------------------------------
Info 32   [00:01:08.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:09.000] 	Files (1)

Info 32   [00:01:10.000] -----------------------------------------------
Info 32   [00:01:11.000] Open files: 
Info 32   [00:01:12.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 32   [00:01:13.000] 		Projects: /a/b/tsconfig.json
Info 32   [00:01:14.000] 	FileName: /a/b/node_modules/module1.ts ProjectRootPath: undefined
Info 32   [00:01:15.000] 		Projects: /a/b/tsconfig.json
Info 32   [00:01:16.000] 	FileName: /a/module1.ts ProjectRootPath: undefined
Info 32   [00:01:17.000] 		Projects: /dev/null/inferredProject1*
Info 32   [00:01:21.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 33   [00:01:22.000] Scheduled: /a/b/tsconfig.json
Info 34   [00:01:23.000] Scheduled: *ensureProjectForOpenFiles*
Info 35   [00:01:24.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /a/b/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/a/b/tsconfig.json]
{
                "compilerOptions": {
                    "moduleResolution": "classic"
                },
                "files": ["/a/b/file1.ts"]
            }


PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b/node_modules: *new*
  {}

Info 36   [00:01:25.000] Running: /a/b/tsconfig.json
Info 37   [00:01:26.000] Reloading configured project /a/b/tsconfig.json
Info 38   [00:01:27.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1.ts"
 ],
 "options": {
  "moduleResolution": 1,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 39   [00:01:28.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 40   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 41   [00:01:30.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 42   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 43   [00:01:32.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 44   [00:01:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 45   [00:01:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [00:01:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 47   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 48   [00:01:37.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 49   [00:01:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 50   [00:01:39.000] 	Files (2)
	/a/module1.ts SVC-1-0 "export interface T {}"
	/a/b/file1.ts SVC-1-0 "import { T } from \"module1\";"


	../module1.ts
	  Imported via "module1" from file 'file1.ts'
	file1.ts
	  Part of 'files' list in tsconfig.json

Info 51   [00:01:40.000] -----------------------------------------------
Info 52   [00:01:41.000] Running: *ensureProjectForOpenFiles*
Info 53   [00:01:42.000] Before ensureProjectForOpenFiles:
Info 54   [00:01:43.000] Project '/a/b/tsconfig.json' (Configured)
Info 54   [00:01:44.000] 	Files (2)

Info 54   [00:01:45.000] -----------------------------------------------
Info 54   [00:01:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 54   [00:01:47.000] 	Files (1)

Info 54   [00:01:48.000] -----------------------------------------------
Info 54   [00:01:49.000] Open files: 
Info 54   [00:01:50.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 54   [00:01:51.000] 		Projects: /a/b/tsconfig.json
Info 54   [00:01:52.000] 	FileName: /a/b/node_modules/module1.ts ProjectRootPath: undefined
Info 54   [00:01:53.000] 		Projects: 
Info 54   [00:01:54.000] 	FileName: /a/module1.ts ProjectRootPath: undefined
Info 54   [00:01:55.000] 		Projects: /dev/null/inferredProject1*,/a/b/tsconfig.json
Info 54   [00:01:56.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 55   [00:01:57.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 56   [00:01:58.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 57   [00:01:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 58   [00:02:00.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [00:02:01.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 60   [00:02:02.000] 	Files (1)
	/a/b/node_modules/module1.ts Text-1 "export interface T {}"


	module1.ts
	  Root file specified for compilation

Info 61   [00:02:03.000] -----------------------------------------------
Info 62   [00:02:04.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 63   [00:02:05.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 64   [00:02:06.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 65   [00:02:07.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 66   [00:02:08.000] 	Files (0)



Info 67   [00:02:09.000] -----------------------------------------------
Info 68   [00:02:10.000] After ensureProjectForOpenFiles:
Info 69   [00:02:11.000] Project '/a/b/tsconfig.json' (Configured)
Info 69   [00:02:12.000] 	Files (2)

Info 69   [00:02:13.000] -----------------------------------------------
Info 69   [00:02:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 69   [00:02:15.000] 	Files (0)

Info 69   [00:02:16.000] -----------------------------------------------
Info 69   [00:02:17.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 69   [00:02:18.000] 	Files (1)

Info 69   [00:02:19.000] -----------------------------------------------
Info 69   [00:02:20.000] Open files: 
Info 69   [00:02:21.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 69   [00:02:22.000] 		Projects: /a/b/tsconfig.json
Info 69   [00:02:23.000] 	FileName: /a/b/node_modules/module1.ts ProjectRootPath: undefined
Info 69   [00:02:24.000] 		Projects: /dev/null/inferredProject2*
Info 69   [00:02:25.000] 	FileName: /a/module1.ts ProjectRootPath: undefined
Info 69   [00:02:26.000] 		Projects: /a/b/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500} *new*
/a/b/node_modules/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b: *new*
  {}

FsWatchesRecursive *deleted*::
/a/b/node_modules:
  {}

Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
Inferred project: /dev/null/inferredProject2* isOrphan:: false isClosed: false
Info 69   [00:02:27.000] Search path: /a
Info 70   [00:02:28.000] For info: /a/file1.ts :: No config files found.
Info 71   [00:02:29.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 72   [00:02:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 73   [00:02:31.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 74   [00:02:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 75   [00:02:33.000] 	Files (1)
	/a/file1.ts SVC-1-0 "export interface T {}"


	file1.ts
	  Root file specified for compilation

Info 76   [00:02:34.000] -----------------------------------------------
Info 77   [00:02:35.000] Project '/a/b/tsconfig.json' (Configured)
Info 77   [00:02:36.000] 	Files (2)

Info 77   [00:02:37.000] -----------------------------------------------
Info 77   [00:02:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 77   [00:02:39.000] 	Files (1)

Info 77   [00:02:40.000] -----------------------------------------------
Info 77   [00:02:41.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 77   [00:02:42.000] 	Files (1)

Info 77   [00:02:43.000] -----------------------------------------------
Info 77   [00:02:44.000] Open files: 
Info 77   [00:02:45.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 77   [00:02:46.000] 		Projects: /a/b/tsconfig.json
Info 77   [00:02:47.000] 	FileName: /a/b/node_modules/module1.ts ProjectRootPath: undefined
Info 77   [00:02:48.000] 		Projects: /dev/null/inferredProject2*
Info 77   [00:02:49.000] 	FileName: /a/module1.ts ProjectRootPath: undefined
Info 77   [00:02:50.000] 		Projects: /a/b/tsconfig.json
Info 77   [00:02:51.000] 	FileName: /a/file1.ts ProjectRootPath: undefined
Info 77   [00:02:52.000] 		Projects: /dev/null/inferredProject1*