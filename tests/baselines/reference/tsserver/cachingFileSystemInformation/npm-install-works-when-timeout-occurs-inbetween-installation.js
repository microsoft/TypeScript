Info 0    [16:00:27.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/rootfolder/otherfolder/a/b/app.ts]
import _ from 'lodash';

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

//// [/user/username/rootfolder/otherfolder/a/b/tsconfig.json]
{ "compilerOptions": { } }

//// [/user/username/rootfolder/otherfolder/a/b/package.json]

{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "lodash",
    "rxjs"
  },
  "devDependencies": {
    "@types/lodash",
    "typescript"
  },
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}



PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [16:00:28.000] Search path: /user/username/rootfolder/otherfolder/a/b
Info 2    [16:00:29.000] For info: /user/username/rootfolder/otherfolder/a/b/app.ts :: Config file name: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 3    [16:00:30.000] Creating configuration project /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 4    [16:00:31.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/tsconfig.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Config file
Info 5    [16:00:32.000] Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json : {
 "rootNames": [
  "/user/username/rootfolder/otherfolder/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/user/username/rootfolder/otherfolder/a/b/tsconfig.json"
 }
}
Info 6    [16:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 7    [16:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:35.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [16:00:36.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 10   [16:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [16:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [16:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [16:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [16:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [16:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [16:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [16:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 18   [16:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 19   [16:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 20   [16:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 21   [16:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 22   [16:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 23   [16:00:50.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [16:00:51.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 25   [16:00:52.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/rootfolder/otherfolder/a/b/app.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	app.ts
	  Matched by default include pattern '**/*'

Info 26   [16:00:53.000] -----------------------------------------------
Info 27   [16:00:54.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 27   [16:00:55.000] 	Files (2)

Info 27   [16:00:56.000] -----------------------------------------------
Info 27   [16:00:57.000] Open files: 
Info 27   [16:00:58.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 27   [16:00:59.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 27   [16:01:02.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 28   [16:01:03.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation
Info 29   [16:01:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 30   [16:01:05.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 31   [16:01:06.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 32   [16:01:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 33   [16:01:08.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 34   [16:01:09.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 35   [16:01:10.000] Scheduled: *ensureProjectForOpenFiles*
Info 36   [16:01:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 37   [16:01:14.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 38   [16:01:15.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 39   [16:01:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 40   [16:01:17.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 41   [16:01:18.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 42   [16:01:19.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 43   [16:01:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 44   [16:01:23.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 45   [16:01:24.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [16:01:25.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 47   [16:01:26.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types
Info 48   [16:01:27.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 49   [16:01:30.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 50   [16:01:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 51   [16:01:32.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 52   [16:01:33.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa
Info 53   [16:01:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 54   [16:01:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 55   [16:01:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 56   [16:01:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 57   [16:01:40.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7
Info 58   [16:01:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 59   [16:01:44.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 60   [16:01:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 61   [16:01:46.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 62   [16:01:47.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff
Info 63   [16:01:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 64   [16:01:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 65   [16:01:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 66   [16:01:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 67   [16:01:54.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61
Info 68   [16:01:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 69   [16:01:58.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 70   [16:01:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 71   [16:02:00.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 72   [16:02:01.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d
Info 73   [16:02:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 74   [16:02:05.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 75   [16:02:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 76   [16:02:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 77   [16:02:08.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json
Info 78   [16:02:09.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 79   [16:02:12.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 80   [16:02:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 81   [16:02:14.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 82   [16:02:15.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json
Info 83   [16:02:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 84   [16:02:19.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 85   [16:02:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 86   [16:02:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 87   [16:02:22.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json
Info 88   [16:02:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 89   [16:02:26.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 90   [16:02:27.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 91   [16:02:28.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 92   [16:02:29.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json
Info 93   [16:02:30.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 94   [16:02:33.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 95   [16:02:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 96   [16:02:35.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 97   [16:02:36.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js
Info 98   [16:02:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 99   [16:02:40.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 100  [16:02:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 101  [16:02:42.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 102  [16:02:43.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts
Info 103  [16:02:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 104  [16:02:47.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 105  [16:02:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 106  [16:02:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 107  [16:02:50.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib
Info 108  [16:02:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 109  [16:02:54.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 110  [16:02:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 111  [16:02:56.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 112  [16:02:57.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js
Info 113  [16:02:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (3) and running
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json]
{
  "name": "symbol-observable",
  "version": "1.0.4",
  "description": "Symbol.observable ponyfill",
  "license": "MIT",
  "repository": "blesh/symbol-observable",
  "author": {
    "name": "Ben Lesh",
    "email": "ben@benlesh.com"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "test": "npm run build && mocha && tsc ./ts-test/test.ts && node ./ts-test/test.js && check-es3-syntax -p lib/ --kill",
    "build": "babel es --out-dir lib",
    "prepublish": "npm test"
  },
  "files": [
    "

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json]
{
  "name": "lodash",
  "version": "4.17.4",
  "description": "Lodash modular utilities.",
  "keywords": "modules, stdlib, util",
  "homepage": "https://lodash.com/",
  "repository": "lodash/lodash",
  "icon": "https://lodash.com/icon.svg",
  "license": "MIT",
  "main": "lodash.js",
  "author": "John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)",
  "contributors": [
    "John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)",
    "Mathias Bynens <mathias@qiwi.

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json]
{
  "name": "rxjs",
  "version": "5.4.3",
  "description": "Reactive Extensions for modern JavaScript",
  "main": "Rx.js",
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "lint-staged": {
    "*.@(js)": [
      "eslint --fix",
      "git add"
    ],
    "*.@(ts)": [
      "eslint -c .eslintrc --ext .ts . --fix",
      "git add"
    ]
  },
  "scripts-info": {
    "info": "List available script",
    "build_all": "Build all packages (ES6, CJS, UMD) and generate packages",
    "build_cjs": "Build CJS package with clean up existing build, copy source into dist",
    "build_es6": "Build ES6 package with clean up existing build, copy source into dist",
    "build_closure_core": "Minify Global core build using closure compiler",
    "build_global": "Build Global package, then minify build",
    "build_perf": "Build CJS & Global build, run macro performance test",
    "build_test": "Build CJS package & test spec, execute mocha test runner",
    "build_cover": "Run lint to current code, build CJS & test spec, execute test coverage",
    "build_docs": "Build ES6 & global package, create documentation using it",
    "build_spec": "Build test specs",
    "check_circular_dependencies": "Check codebase has circular dependencies",
    "clean_spec": "Clean up existing test spec build output",
    "clean_dist_cjs": "Clean up existing CJS package output",
    "clean_dist_es6": "Clean up existing ES6 package output",
    "clean_dist_global": "Clean up existing Global package output",
    "commit": "Run git commit wizard",
    "compile_dist_cjs": "Compile codebase into CJS module",
    "compile_module_es6": "Compile codebase into ES6",
    "cover": "Execute test coverage",
    "lint_perf": "Run lint against performance test suite",
    "lint_spec": "Run lint against test spec",
    "lint_src": "Run lint against source",
    "lint": "Run lint against everything",
    "perf": "Run macro performance benchmark",
    "perf_micro": "Run micro performance benchmark",
    "test_mocha": "Execute mocha test runner against existing test spec build",
    "test_browser": "Execute mocha test runner on browser against existing test spec build",
    "test": "Clean up existing test spec build, build test spec and execute mocha test runner",
    "tests2png": "Generate marble diagram image from test spec",
    "watch": "Watch codebase, trigger compile when source code changes"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:ReactiveX/RxJS.git"
  },
  "keywords": [
    "Rx",
    "RxJS",
    "ReactiveX",
    "ReactiveExtensions",
    "Streams",
    "Observables",
    "Observable",
    "Stream",
    "ES6",
    "ES2015"
  ],
  "author": "Ben Lesh <ben@benlesh.com>",
  "contributors": [
    {
      "name": "Ben Lesh",
      "email": "ben@benlesh.com"
    },
    {
      "name": "Paul Taylor",
      "email": "paul.e.taylor@me.com"
    },
    {
      "name": "Jeff Cross",
      "email": "crossj@google.com"
    },
    {
      "name": "Matthew Podwysocki",
      "email": "matthewp@microsoft.com"
    },
    {
      "name": "OJ Kwon",
      "email": "kwon.ohjoong@gmail.com"
    },
    {
      "name": "Andre Staltz",
      "email": "andre@staltz.com"
    }
  ],
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/ReactiveX/RxJS/issues"
  },
  "homepage": "https://github.com/ReactiveX/RxJS",
  "devDependencies": {
    "babel-polyfill": "^6.23.0",
    "benchmark": "^2.1.0",
    "benchpress": "2.0.0-beta.1",
    "chai": "^3.5.0",
    "color": "^0.11.1",
    "colors": "1.1.2",
    "commitizen": "^2.8.6",
    "coveralls": "^2.11.13",
    "cz-conventional-changelog": "^1.2.0",
    "danger": "^1.1.0",
    "doctoc": "^1.0.0",
    "escape-string-regexp": "^1.0.5 ",
    "esdoc": "^0.4.7",
    "eslint": "^3.8.0",
    "fs-extra": "^2.1.2",
    "get-folder-size": "^1.0.0",
    "glob": "^7.0.3",
    "gm": "^1.22.0",
    "google-closure-compiler-js": "^20170218.0.0",
    "gzip-size": "^3.0.0",
    "http-server": "^0.9.0",
    "husky": "^0.13.3",
    "lint-staged": "3.2.5",
    "lodash": "^4.15.0",
    "madge": "^1.4.3",
    "markdown-doctest": "^0.9.1",
    "minimist": "^1.2.0",
    "mkdirp": "^0.5.1",
    "mocha": "^3.0.2",
    "mocha-in-sauce": "0.0.1",
    "npm-run-all": "^4.0.2",
    "npm-scripts-info": "^0.3.4",
    "nyc": "^10.2.0",
    "opn-cli": "^3.1.0",
    "platform": "^1.3.1",
    "promise": "^7.1.1",
    "protractor": "^3.1.1",
    "rollup": "0.36.3",
    "rollup-plugin-inject": "^2.0.0",
    "rollup-plugin-node-resolve": "^2.0.0",
    "rx": "latest",
    "rxjs": "latest",
    "shx": "^0.2.2",
    "sinon": "^2.1.0",
    "sinon-chai": "^2.9.0",
    "source-map-support": "^0.4.0",
    "tslib": "^1.5.0",
    "eslint": "^4.4.2",
    "typescript": "~2.0.6",
    "typings": "^2.0.0",
    "validate-commit-msg": "^2.14.0",
    "watch": "^1.0.1",
    "webpack": "^1.13.1",
    "xmlhttprequest": "1.8.0"
  },
  "engines": {
    "npm": ">=2.0.0"
  },
  "typings": "Rx.d.ts",
  "dependencies": {
    "symbol-observable": "^1.0.1"
  }
}

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json]
{
    "name": "typescript",
    "author": "Microsoft Corp.",
    "homepage": "http://typescriptlang.org/",
    "version": "2.4.2",
    "license": "Apache-2.0",
    "description": "TypeScript is a language for application scale JavaScript development",
    "keywords": [
        "TypeScript",
        "Microsoft",
        "compiler",
        "language",
        "javascript"
    ],
    "bugs": {
        "url": "https://github.com/Microsoft/TypeScript/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/Microsoft/TypeScript.git"
    },
    "main": "./lib/typescript.js",
    "typings": "./lib/typescript.d.ts",
    "bin": {
        "tsc": "./bin/tsc",
        "tsserver": "./bin/tsserver"
    },
    "engines": {
        "node": ">=4.2.0"
    },
    "devDependencies": {
        "@types/browserify": "latest",
        "@types/chai": "latest",
        "@types/convert-source-map": "latest",
        "@types/del": "latest",
        "@types/glob": "latest",
        "@types/gulp": "latest",
        "@types/gulp-concat": "latest",
        "@types/gulp-help": "latest",
        "@types/gulp-newer": "latest",
        "@types/gulp-sourcemaps": "latest",
        "@types/merge2": "latest",
        "@types/minimatch": "latest",
        "@types/minimist": "latest",
        "@types/mkdirp": "latest",
        "@types/mocha": "latest",
        "@types/node": "latest",
        "@types/q": "latest",
        "@types/run-sequence": "latest",
        "@types/through2": "latest",
        "browserify": "latest",
        "chai": "latest",
        "convert-source-map": "latest",
        "del": "latest",
        "gulp": "latest",
        "gulp-clone": "latest",
        "gulp-concat": "latest",
        "gulp-help": "latest",
        "gulp-insert": "latest",
        "gulp-newer": "latest",
        "gulp-sourcemaps": "latest",
        "gulp-typescript": "latest",
        "into-stream": "latest",
        "istanbul": "latest",
        "jake": "latest",
        "merge2": "latest",
        "minimist": "latest",
        "mkdirp": "latest",
        "mocha": "latest",
        "mocha-fivemat-progress-reporter": "latest",
        "q": "latest",
        "run-sequence": "latest",
        "sorcery": "latest",
        "through2": "latest",
        "travis-fold": "latest",
        "ts-node": "latest",
        "eslint": "5.16.0",
        "typescript": "^2.4"
    },
    "scripts": {
        "pretest": "jake tests",
        "test": "jake runtests-parallel",
        "build": "npm run build:compiler && npm run build:tests",
        "build:compiler": "jake local",
        "build:tests": "jake tests",
        "start": "node lib/tsc",
        "clean": "jake clean",
        "gulp": "gulp",
        "jake": "jake",
        "lint": "jake lint",
        "setup-hooks": "node scripts/link-hooks.js"
    },
    "browser": {
        "buffer": false,
        "fs": false,
        "os": false,
        "path": false
    }
}

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js]
module.exports = require('./lib/index');


//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts]
declare const observableSymbol: symbol;
export default observableSymbol;


//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js]
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;


PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

Info 114  [16:02:59.000] Running: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation
Info 115  [16:03:00.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 116  [16:03:01.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After checking timeout queue length (3) and running

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

Before running timeout callbacks

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

Info 117  [16:03:02.000] Running: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 118  [16:03:03.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 119  [16:03:04.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 120  [16:03:05.000] Different program with same set of files
Info 121  [16:03:06.000] Running: *ensureProjectForOpenFiles*
Info 122  [16:03:07.000] Before ensureProjectForOpenFiles:
Info 123  [16:03:08.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 123  [16:03:09.000] 	Files (2)

Info 123  [16:03:10.000] -----------------------------------------------
Info 123  [16:03:11.000] Open files: 
Info 123  [16:03:12.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 123  [16:03:13.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 123  [16:03:14.000] After ensureProjectForOpenFiles:
Info 124  [16:03:15.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 124  [16:03:16.000] 	Files (2)

Info 124  [16:03:17.000] -----------------------------------------------
Info 124  [16:03:18.000] Open files: 
Info 124  [16:03:19.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 124  [16:03:20.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

Info 124  [16:03:30.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 125  [16:03:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 126  [16:03:32.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 127  [16:03:33.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib
Info 128  [16:03:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 129  [16:03:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 130  [16:03:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 131  [16:03:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 132  [16:03:40.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add
Info 133  [16:03:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 134  [16:03:44.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 135  [16:03:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 136  [16:03:46.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 137  [16:03:47.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator
Info 138  [16:03:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 139  [16:03:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 140  [16:03:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 141  [16:03:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 142  [16:03:54.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json
Info 143  [16:03:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 144  [16:03:58.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 145  [16:03:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 146  [16:04:00.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 147  [16:04:01.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js
Info 148  [16:04:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 149  [16:04:05.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 150  [16:04:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 151  [16:04:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 152  [16:04:08.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594
Info 153  [16:04:09.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (0) and running
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json]
{
    "name": "@types/lodash",
    "version": "4.14.74",
    "description": "TypeScript definitions for Lo-Dash",
    "license": "MIT",
    "contributors": [
        {
            "name": "Brian Zengel",
            "url": "https://github.com/bczengel"
        },
        {
            "name": "Ilya Mochalov",
            "url": "https://github.com/chrootsu"
        },
        {
            "name": "Stepan Mikhaylyuk",
            "url": "https://github.com/stepancar"
        },
        {
            "name": "Eric L Anderson",
            "url": "https://github.com/ericanderson"
        },
        {
            "name": "AJ Richardson",
            "url": "https://github.com/aj-r"
        },
        {
            "name": "Junyoung Clare Jang",
            "url": "https://github.com/ailrun"
        }
    ],
    "main": "",
    "repository": {
        "type": "git",
        "url": "https://www.github.com/DefinitelyTyped/DefinitelyTyped.git"
    },
    "scripts": {},
    "dependencies": {},
    "typesPublisherContentHash": "12af578ffaf8d86d2df37e591857906a86b983fa9258414326544a0fe6af0de8",
    "typeScriptVersion": "2.2"
}

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js]
module.exports = require('./lodash');

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594]



PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

After checking timeout queue length (0) and running

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

Info 154  [16:04:11.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 155  [16:04:12.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 156  [16:04:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 157  [16:04:14.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594
Info 158  [16:04:15.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (0) and running
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594] deleted

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

After checking timeout queue length (0) and running

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

Info 159  [16:04:36.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 160  [16:04:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 161  [16:04:38.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 162  [16:04:39.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles
Info 163  [16:04:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 164  [16:04:43.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 165  [16:04:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 166  [16:04:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 167  [16:04:46.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator
Info 168  [16:04:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 169  [16:04:52.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 170  [16:04:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 171  [16:04:54.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 172  [16:04:55.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src
Info 173  [16:04:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 174  [16:04:58.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 175  [16:04:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 176  [16:05:00.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 177  [16:05:01.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add
Info 178  [16:05:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 179  [16:05:04.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 180  [16:05:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 181  [16:05:06.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 182  [16:05:07.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable
Info 183  [16:05:08.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 184  [16:05:11.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 185  [16:05:12.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 186  [16:05:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 187  [16:05:14.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom
Info 188  [16:05:15.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 189  [16:05:18.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 190  [16:05:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 191  [16:05:20.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 192  [16:05:21.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts
Info 193  [16:05:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (0) and running
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts]

// Stub for lodash
export = _;
export as namespace _;
declare var _: _.LoDashStatic;
declare namespace _ {
    interface LoDashStatic {
        someProp: string;
    }
    class SomeClass {
        someMethod(): void;
    }
}


PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

After checking timeout queue length (0) and running

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

Info 194  [16:05:35.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 195  [16:05:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 196  [16:05:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 197  [16:05:38.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler
Info 198  [16:05:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 199  [16:05:42.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 200  [16:05:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 201  [16:05:44.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 202  [16:05:45.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util
Info 203  [16:05:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 204  [16:05:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 205  [16:05:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 206  [16:05:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 207  [16:05:52.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol
Info 208  [16:05:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 209  [16:05:56.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 210  [16:05:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 211  [16:05:58.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 212  [16:05:59.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing
Info 213  [16:06:00.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 214  [16:06:03.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 215  [16:06:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 216  [16:06:05.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 217  [16:06:06.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041
Info 218  [16:06:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (0) and running
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041]
{
  "_args": [
    [
      {
        "raw": "rxjs@^5.4.2",
        "scope": null,
        "escapedName": "rxjs",
        "name": "rxjs",
        "rawSpec": "^5.4.2",
        "spec": ">=5.4.2 <6.0.0",
        "type": "range"
      },
      "C:\\Users\\shkamat\\Desktop\\app"
    ]
  ],
  "_from": "rxjs@>=5.4.2 <6.0.0",
  "_id": "rxjs@5.4.3",
  "_inCache": true,
  "_location": "/rxjs",
  "_nodeVersion": "7.7.2",
  "_npmOperationalInternal": {
    "host": "s3://npm-registry-packages",
    "tmp": "tmp/rxjs-5.4.3.tgz_1502407898166_0.6800217325799167"
  },
  "_npmUser": {
    "name": "blesh",
    "email": "ben@benlesh.com"
  },
  "_npmVersion": "5.3.0",
  "_phantomChildren": {},
  "_requested": {
    "raw": "rxjs@^5.4.2",
    "scope": null,
    "escapedName": "rxjs",
    "name": "rxjs",
    "rawSpec": "^5.4.2",
    "spec": ">=5.4.2 <6.0.0",
    "type": "range"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/rxjs/-/rxjs-5.4.3.tgz",
  "_shasum": "0758cddee6033d68e0fd53676f0f3596ce3d483f",
  "_shrinkwrap": null,
  "_spec": "rxjs@^5.4.2",
  "_where": "C:\\Users\\shkamat\\Desktop\\app",
  "author": {
    "name": "Ben Lesh",
    "email": "ben@benlesh.com"
  },
  "bugs": {
    "url": "https://github.com/ReactiveX/RxJS/issues"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "contributors": [
    {
      "name": "Ben Lesh",
      "email": "ben@benlesh.com"
    },
    {
      "name": "Paul Taylor",
      "email": "paul.e.taylor@me.com"
    },
    {
      "name": "Jeff Cross",
      "email": "crossj@google.com"
    },
    {
      "name": "Matthew Podwysocki",
      "email": "matthewp@microsoft.com"
    },
    {
      "name": "OJ Kwon",
      "email": "kwon.ohjoong@gmail.com"
    },
    {
      "name": "Andre Staltz",
      "email": "andre@staltz.com"
    }
  ],
  "dependencies": {
    "symbol-observable": "^1.0.1"
  },
  "description": "Reactive Extensions for modern JavaScript",
  "devDependencies": {
    "babel-polyfill": "^6.23.0",
    "benchmark": "^2.1.0",
    "benchpress": "2.0.0-beta.1",
    "chai": "^3.5.0",
    "color": "^0.11.1",
    "colors": "1.1.2",
    "commitizen": "^2.8.6",
    "coveralls": "^2.11.13",
    "cz-conventional-changelog": "^1.2.0",
    "danger": "^1.1.0",
    "doctoc": "^1.0.0",
    "escape-string-regexp": "^1.0.5 ",
    "esdoc": "^0.4.7",
    "eslint": "^3.8.0",
    "fs-extra": "^2.1.2",
    "get-folder-size": "^1.0.0",
    "glob": "^7.0.3",
    "gm": "^1.22.0",
    "google-closure-compiler-js": "^20170218.0.0",
    "gzip-size": "^3.0.0",
    "http-server": "^0.9.0",
    "husky": "^0.13.3",
    "lint-staged": "3.2.5",
    "lodash": "^4.15.0",
    "madge": "^1.4.3",
    "markdown-doctest": "^0.9.1",
    "minimist": "^1.2.0",
    "mkdirp": "^0.5.1",
    "mocha": "^3.0.2",
    "mocha-in-sauce": "0.0.1",
    "npm-run-all": "^4.0.2",
    "npm-scripts-info": "^0.3.4",
    "nyc": "^10.2.0",
    "opn-cli": "^3.1.0",
    "platform": "^1.3.1",
    "promise": "^7.1.1",
    "protractor": "^3.1.1",
    "rollup": "0.36.3",
    "rollup-plugin-inject": "^2.0.0",
    "rollup-plugin-node-resolve": "^2.0.0",
    "rx": "latest",
    "rxjs": "latest",
    "shx": "^0.2.2",
    "sinon": "^2.1.0",
    "sinon-chai": "^2.9.0",
    "source-map-support": "^0.4.0",
    "tslib": "^1.5.0",
    "eslint": "^5.16.0",
    "typescript": "~2.0.6",
    "typings": "^2.0.0",
    "validate-commit-msg": "^2.14.0",
    "watch": "^1.0.1",
    "webpack": "^1.13.1",
    "xmlhttprequest": "1.8.0"
  },
  "directories": {},
  "dist": {
    "integrity": "sha512-fSNi+y+P9ss+EZuV0GcIIqPUK07DEaMRUtLJvdcvMyFjc9dizuDjere+A4V7JrLGnm9iCc+nagV/4QdMTkqC4A==",
    "shasum": "0758cddee6033d68e0fd53676f0f3596ce3d483f",
    "tarball": "https://registry.npmjs.org/rxjs/-/rxjs-5.4.3.tgz"
  },
  "engines": {
    "npm": ">=2.0.0"
  },
  "homepage": "https://github.com/ReactiveX/RxJS",
  "keywords": [
    "Rx",
    "RxJS",
    "ReactiveX",
    "ReactiveExtensions",
    "Streams",
    "Observables",
    "Observable",
    "Stream",
    "ES6",
    "ES2015"
  ],
  "license": "Apache-2.0",
  "lint-staged": {
    "*.@(js)": [
      "eslint --fix",
      "git add"
    ],
    "*.@(ts)": [
      "eslint -c .eslintrc --ext .ts . --fix",
      "git add"
    ]
  },
  "main": "Rx.js",
  "maintainers": [
    {
      "name": "blesh",
      "email": "ben@benlesh.com"
    }
  ],
  "name": "rxjs",
  "optionalDependencies": {},
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/ReactiveX/RxJS.git"
  },
  "scripts-info": {
    "info": "List available script",
    "build_all": "Build all packages (ES6, CJS, UMD) and generate packages",
    "build_cjs": "Build CJS package with clean up existing build, copy source into dist",
    "build_es6": "Build ES6 package with clean up existing build, copy source into dist",
    "build_closure_core": "Minify Global core build using closure compiler",
    "build_global": "Build Global package, then minify build",
    "build_perf": "Build CJS & Global build, run macro performance test",
    "build_test": "Build CJS package & test spec, execute mocha test runner",
    "build_cover": "Run lint to current code, build CJS & test spec, execute test coverage",
    "build_docs": "Build ES6 & global package, create documentation using it",
    "build_spec": "Build test specs",
    "check_circular_dependencies": "Check codebase has circular dependencies",
    "clean_spec": "Clean up existing test spec build output",
    "clean_dist_cjs": "Clean up existing CJS package output",
    "clean_dist_es6": "Clean up existing ES6 package output",
    "clean_dist_global": "Clean up existing Global package output",
    "commit": "Run git commit wizard",
    "compile_dist_cjs": "Compile codebase into CJS module",
    "compile_module_es6": "Compile codebase into ES6",
    "cover": "Execute test coverage",
    "lint_perf": "Run lint against performance test suite",
    "lint_spec": "Run lint against test spec",
    "lint_src": "Run lint against source",
    "lint": "Run lint against everything",
    "perf": "Run macro performance benchmark",
    "perf_micro": "Run micro performance benchmark",
    "test_mocha": "Execute mocha test runner against existing test spec build",
    "test_browser": "Execute mocha test runner on browser against existing test spec build",
    "test": "Clean up existing test spec build, build test spec and execute mocha test runner",
    "tests2png": "Generate marble diagram image from test spec",
    "watch": "Watch codebase, trigger compile when source code changes"
  },
  "typings": "Rx.d.ts",
  "version": "5.4.3"
}



PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

After checking timeout queue length (0) and running

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}

Info 219  [16:06:09.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 220  [16:06:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 221  [16:06:11.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 222  [16:06:12.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041
Info 223  [16:06:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 224  [16:06:26.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 225  [16:06:27.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation
Info 226  [16:06:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 227  [16:06:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 228  [16:06:30.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 229  [16:06:31.000] Scheduled: *ensureProjectForOpenFiles*
Info 230  [16:06:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 231  [16:06:35.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 232  [16:06:36.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 233  [16:06:37.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 234  [16:06:38.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 235  [16:06:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 236  [16:06:40.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 237  [16:06:41.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 238  [16:06:42.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 239  [16:06:43.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 240  [16:06:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 241  [16:06:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 242  [16:06:46.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 243  [16:06:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 244  [16:06:48.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 245  [16:06:49.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 246  [16:06:50.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 247  [16:06:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 248  [16:06:54.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 249  [16:06:55.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 250  [16:06:56.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 251  [16:06:57.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 252  [16:06:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 253  [16:06:59.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 254  [16:07:00.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 255  [16:07:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 256  [16:07:02.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 257  [16:07:03.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 258  [16:07:04.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 259  [16:07:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 260  [16:07:08.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 261  [16:07:09.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 262  [16:07:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 263  [16:07:11.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 264  [16:07:12.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 265  [16:07:13.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 266  [16:07:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 267  [16:07:17.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 268  [16:07:18.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 269  [16:07:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 270  [16:07:20.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 271  [16:07:21.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 272  [16:07:22.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 273  [16:07:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 274  [16:07:26.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 275  [16:07:27.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 276  [16:07:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 277  [16:07:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 278  [16:07:30.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 279  [16:07:31.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 280  [16:07:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 281  [16:07:35.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 282  [16:07:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 283  [16:07:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 284  [16:07:38.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.bin
Info 285  [16:07:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (3) and running
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041] deleted

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {}

Info 286  [16:07:40.000] Running: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation
Info 287  [16:07:41.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 288  [16:07:42.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After checking timeout queue length (3) and running

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {}

Info 289  [16:07:43.000] Running: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 290  [16:07:44.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 291  [16:07:45.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 292  [16:07:46.000] Different program with same set of files
Info 293  [16:07:47.000] Running: *ensureProjectForOpenFiles*
Info 294  [16:07:48.000] Before ensureProjectForOpenFiles:
Info 295  [16:07:49.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 295  [16:07:50.000] 	Files (2)

Info 295  [16:07:51.000] -----------------------------------------------
Info 295  [16:07:52.000] Open files: 
Info 295  [16:07:53.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 295  [16:07:54.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 295  [16:07:55.000] After ensureProjectForOpenFiles:
Info 296  [16:07:56.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 296  [16:07:57.000] 	Files (2)

Info 296  [16:07:58.000] -----------------------------------------------
Info 296  [16:07:59.000] Open files: 
Info 296  [16:08:00.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 296  [16:08:01.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {}

Info 296  [16:08:03.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 297  [16:08:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 298  [16:08:05.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 299  [16:08:06.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts
Info 300  [16:08:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 301  [16:08:09.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 302  [16:08:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 303  [16:08:11.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 304  [16:08:12.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json
Info 305  [16:08:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 306  [16:08:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 307  [16:08:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 308  [16:08:17.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 309  [16:08:18.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7
Info 310  [16:08:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 311  [16:08:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 312  [16:08:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 313  [16:08:23.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 314  [16:08:24.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types
Info 315  [16:08:25.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 316  [16:08:27.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 317  [16:08:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 318  [16:08:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 319  [16:08:30.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js
Info 320  [16:08:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 321  [16:08:33.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 322  [16:08:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 323  [16:08:35.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 324  [16:08:36.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json
Info 325  [16:08:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 326  [16:08:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 327  [16:08:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 328  [16:08:41.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 329  [16:08:42.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa
Info 330  [16:08:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 331  [16:08:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 332  [16:08:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 333  [16:08:47.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 334  [16:08:48.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator
Info 335  [16:08:49.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 336  [16:08:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 337  [16:08:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 338  [16:08:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 339  [16:08:54.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add
Info 340  [16:08:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 341  [16:08:57.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 342  [16:08:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 343  [16:08:59.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 344  [16:09:00.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles
Info 345  [16:09:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 346  [16:09:03.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 347  [16:09:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 348  [16:09:05.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 349  [16:09:06.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator
Info 350  [16:09:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 351  [16:09:09.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 352  [16:09:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 353  [16:09:11.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 354  [16:09:12.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json
Info 355  [16:09:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 356  [16:09:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 357  [16:09:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 358  [16:09:17.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 359  [16:09:18.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom
Info 360  [16:09:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 361  [16:09:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 362  [16:09:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 363  [16:09:23.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 364  [16:09:24.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable
Info 365  [16:09:25.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 366  [16:09:27.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 367  [16:09:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 368  [16:09:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 369  [16:09:30.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add
Info 370  [16:09:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 371  [16:09:33.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 372  [16:09:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 373  [16:09:35.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 374  [16:09:36.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler
Info 375  [16:09:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 376  [16:09:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 377  [16:09:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 378  [16:09:41.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 379  [16:09:42.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util
Info 380  [16:09:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 381  [16:09:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 382  [16:09:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 383  [16:09:47.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 384  [16:09:48.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src
Info 385  [16:09:49.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 386  [16:09:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 387  [16:09:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 388  [16:09:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 389  [16:09:54.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol
Info 390  [16:09:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 391  [16:09:57.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 392  [16:09:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 393  [16:09:59.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 394  [16:10:00.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing
Info 395  [16:10:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 396  [16:10:03.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 397  [16:10:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 398  [16:10:05.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 399  [16:10:06.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61
Info 400  [16:10:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 401  [16:10:09.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 402  [16:10:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 403  [16:10:11.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 404  [16:10:12.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts
Info 405  [16:10:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 406  [16:10:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 407  [16:10:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 408  [16:10:17.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 409  [16:10:18.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js
Info 410  [16:10:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 411  [16:10:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 412  [16:10:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 413  [16:10:23.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 414  [16:10:24.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js
Info 415  [16:10:25.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 416  [16:10:27.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 417  [16:10:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 418  [16:10:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 419  [16:10:30.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib
Info 420  [16:10:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 421  [16:10:33.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 422  [16:10:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 423  [16:10:35.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 424  [16:10:36.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json
Info 425  [16:10:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 426  [16:10:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 427  [16:10:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 428  [16:10:41.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 429  [16:10:42.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff
Info 430  [16:10:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 431  [16:10:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 432  [16:10:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 433  [16:10:47.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 434  [16:10:48.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib
Info 435  [16:10:49.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 436  [16:10:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 437  [16:10:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 438  [16:10:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 439  [16:10:54.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json
Info 440  [16:10:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 441  [16:10:57.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 442  [16:10:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 443  [16:10:59.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 444  [16:11:00.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d
Info 445  [16:11:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 446  [16:11:03.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 447  [16:11:04.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation
Info 448  [16:11:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 449  [16:11:06.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 450  [16:11:07.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 451  [16:11:08.000] Scheduled: *ensureProjectForOpenFiles*
Info 452  [16:11:09.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 453  [16:11:12.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 454  [16:11:13.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 455  [16:11:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 456  [16:11:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 457  [16:11:16.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 458  [16:11:17.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 459  [16:11:18.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 460  [16:11:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 461  [16:11:22.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 462  [16:11:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 463  [16:11:24.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 464  [16:11:25.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json
Info 465  [16:11:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 466  [16:11:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 467  [16:11:30.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 468  [16:11:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 469  [16:11:32.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 470  [16:11:33.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json
Info 471  [16:11:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 472  [16:11:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 473  [16:11:38.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 474  [16:11:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 475  [16:11:40.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 476  [16:11:41.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json
Info 477  [16:11:42.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 478  [16:11:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 479  [16:11:46.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 480  [16:11:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 481  [16:11:48.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 482  [16:11:49.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json
Info 483  [16:11:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 484  [16:11:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 485  [16:11:54.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 486  [16:11:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 487  [16:11:56.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 488  [16:11:57.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js
Info 489  [16:11:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 490  [16:12:01.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 491  [16:12:02.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 492  [16:12:03.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 493  [16:12:04.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 494  [16:12:05.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 495  [16:12:06.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 496  [16:12:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 497  [16:12:10.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 498  [16:12:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 499  [16:12:12.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 500  [16:12:13.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 501  [16:12:14.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 502  [16:12:15.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 503  [16:12:18.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 504  [16:12:19.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 505  [16:12:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 506  [16:12:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 507  [16:12:22.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js
Info 508  [16:12:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 509  [16:12:26.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 510  [16:12:27.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 511  [16:12:28.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 512  [16:12:29.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 513  [16:12:30.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 514  [16:12:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 515  [16:12:34.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 516  [16:12:35.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 517  [16:12:36.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 518  [16:12:37.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 519  [16:12:38.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 520  [16:12:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 521  [16:12:42.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 522  [16:12:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 523  [16:12:44.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 524  [16:12:45.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 525  [16:12:46.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 526  [16:12:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 527  [16:12:50.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 528  [16:12:51.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 529  [16:12:52.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 530  [16:12:53.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 531  [16:12:54.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 532  [16:12:55.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 533  [16:12:56.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 534  [16:12:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 535  [16:12:58.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 536  [16:12:59.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json
Info 537  [16:13:00.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 538  [16:13:03.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 539  [16:13:04.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 540  [16:13:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 541  [16:13:06.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 542  [16:13:07.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js
Info 543  [16:13:08.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 544  [16:13:11.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 545  [16:13:12.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 546  [16:13:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 547  [16:13:14.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 548  [16:13:15.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 549  [16:13:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 550  [16:13:19.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 551  [16:13:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 552  [16:13:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 553  [16:13:22.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 554  [16:13:23.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 555  [16:13:24.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 556  [16:13:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 557  [16:13:30.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 558  [16:13:31.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 559  [16:13:32.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 560  [16:13:33.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 561  [16:13:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 562  [16:13:36.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 563  [16:13:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 564  [16:13:38.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 565  [16:13:39.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 566  [16:13:40.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 567  [16:13:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 568  [16:13:43.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 569  [16:13:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 570  [16:13:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 571  [16:13:46.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 572  [16:13:47.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 573  [16:13:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 574  [16:13:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 575  [16:13:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 576  [16:13:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 577  [16:13:54.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 578  [16:13:55.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 579  [16:13:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 580  [16:13:59.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 581  [16:14:00.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 582  [16:14:01.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 583  [16:14:02.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 584  [16:14:03.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 585  [16:14:04.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 586  [16:14:05.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 587  [16:14:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 588  [16:14:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 589  [16:14:08.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 590  [16:14:09.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 591  [16:14:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 592  [16:14:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 593  [16:14:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 594  [16:14:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 595  [16:14:16.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 596  [16:14:17.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 597  [16:14:18.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 598  [16:14:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 599  [16:14:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 600  [16:14:23.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 601  [16:14:24.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 602  [16:14:25.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 603  [16:14:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 604  [16:14:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 605  [16:14:30.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 606  [16:14:31.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 607  [16:14:32.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 608  [16:14:33.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 609  [16:14:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 610  [16:14:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 611  [16:14:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 612  [16:14:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 613  [16:14:40.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 614  [16:14:41.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 615  [16:14:42.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (3) and running
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json]
{
  "name": "symbol-observable",
  "version": "1.0.4",
  "description": "Symbol.observable ponyfill",
  "license": "MIT",
  "repository": "blesh/symbol-observable",
  "author": {
    "name": "Ben Lesh",
    "email": "ben@benlesh.com"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "test": "npm run build && mocha && tsc ./ts-test/test.ts && node ./ts-test/test.js && check-es3-syntax -p lib/ --kill",
    "build": "babel es --out-dir lib",
    "prepublish": "npm test"
  },
  "files": [
    "

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json]
{
  "name": "lodash",
  "version": "4.17.4",
  "description": "Lodash modular utilities.",
  "keywords": "modules, stdlib, util",
  "homepage": "https://lodash.com/",
  "repository": "lodash/lodash",
  "icon": "https://lodash.com/icon.svg",
  "license": "MIT",
  "main": "lodash.js",
  "author": "John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)",
  "contributors": [
    "John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)",
    "Mathias Bynens <mathias@qiwi.

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json]
{
  "name": "rxjs",
  "version": "5.4.3",
  "description": "Reactive Extensions for modern JavaScript",
  "main": "Rx.js",
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "lint-staged": {
    "*.@(js)": [
      "eslint --fix",
      "git add"
    ],
    "*.@(ts)": [
      "eslint -c .eslintrc --ext .ts . --fix",
      "git add"
    ]
  },
  "scripts-info": {
    "info": "List available script",
    "build_all": "Build all packages (ES6, CJS, UMD) and generate packages",
    "build_cjs": "Build CJS package with clean up existing build, copy source into dist",
    "build_es6": "Build ES6 package with clean up existing build, copy source into dist",
    "build_closure_core": "Minify Global core build using closure compiler",
    "build_global": "Build Global package, then minify build",
    "build_perf": "Build CJS & Global build, run macro performance test",
    "build_test": "Build CJS package & test spec, execute mocha test runner",
    "build_cover": "Run lint to current code, build CJS & test spec, execute test coverage",
    "build_docs": "Build ES6 & global package, create documentation using it",
    "build_spec": "Build test specs",
    "check_circular_dependencies": "Check codebase has circular dependencies",
    "clean_spec": "Clean up existing test spec build output",
    "clean_dist_cjs": "Clean up existing CJS package output",
    "clean_dist_es6": "Clean up existing ES6 package output",
    "clean_dist_global": "Clean up existing Global package output",
    "commit": "Run git commit wizard",
    "compile_dist_cjs": "Compile codebase into CJS module",
    "compile_module_es6": "Compile codebase into ES6",
    "cover": "Execute test coverage",
    "lint_perf": "Run lint against performance test suite",
    "lint_spec": "Run lint against test spec",
    "lint_src": "Run lint against source",
    "lint": "Run lint against everything",
    "perf": "Run macro performance benchmark",
    "perf_micro": "Run micro performance benchmark",
    "test_mocha": "Execute mocha test runner against existing test spec build",
    "test_browser": "Execute mocha test runner on browser against existing test spec build",
    "test": "Clean up existing test spec build, build test spec and execute mocha test runner",
    "tests2png": "Generate marble diagram image from test spec",
    "watch": "Watch codebase, trigger compile when source code changes"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:ReactiveX/RxJS.git"
  },
  "keywords": [
    "Rx",
    "RxJS",
    "ReactiveX",
    "ReactiveExtensions",
    "Streams",
    "Observables",
    "Observable",
    "Stream",
    "ES6",
    "ES2015"
  ],
  "author": "Ben Lesh <ben@benlesh.com>",
  "contributors": [
    {
      "name": "Ben Lesh",
      "email": "ben@benlesh.com"
    },
    {
      "name": "Paul Taylor",
      "email": "paul.e.taylor@me.com"
    },
    {
      "name": "Jeff Cross",
      "email": "crossj@google.com"
    },
    {
      "name": "Matthew Podwysocki",
      "email": "matthewp@microsoft.com"
    },
    {
      "name": "OJ Kwon",
      "email": "kwon.ohjoong@gmail.com"
    },
    {
      "name": "Andre Staltz",
      "email": "andre@staltz.com"
    }
  ],
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/ReactiveX/RxJS/issues"
  },
  "homepage": "https://github.com/ReactiveX/RxJS",
  "devDependencies": {
    "babel-polyfill": "^6.23.0",
    "benchmark": "^2.1.0",
    "benchpress": "2.0.0-beta.1",
    "chai": "^3.5.0",
    "color": "^0.11.1",
    "colors": "1.1.2",
    "commitizen": "^2.8.6",
    "coveralls": "^2.11.13",
    "cz-conventional-changelog": "^1.2.0",
    "danger": "^1.1.0",
    "doctoc": "^1.0.0",
    "escape-string-regexp": "^1.0.5 ",
    "esdoc": "^0.4.7",
    "eslint": "^3.8.0",
    "fs-extra": "^2.1.2",
    "get-folder-size": "^1.0.0",
    "glob": "^7.0.3",
    "gm": "^1.22.0",
    "google-closure-compiler-js": "^20170218.0.0",
    "gzip-size": "^3.0.0",
    "http-server": "^0.9.0",
    "husky": "^0.13.3",
    "lint-staged": "3.2.5",
    "lodash": "^4.15.0",
    "madge": "^1.4.3",
    "markdown-doctest": "^0.9.1",
    "minimist": "^1.2.0",
    "mkdirp": "^0.5.1",
    "mocha": "^3.0.2",
    "mocha-in-sauce": "0.0.1",
    "npm-run-all": "^4.0.2",
    "npm-scripts-info": "^0.3.4",
    "nyc": "^10.2.0",
    "opn-cli": "^3.1.0",
    "platform": "^1.3.1",
    "promise": "^7.1.1",
    "protractor": "^3.1.1",
    "rollup": "0.36.3",
    "rollup-plugin-inject": "^2.0.0",
    "rollup-plugin-node-resolve": "^2.0.0",
    "rx": "latest",
    "rxjs": "latest",
    "shx": "^0.2.2",
    "sinon": "^2.1.0",
    "sinon-chai": "^2.9.0",
    "source-map-support": "^0.4.0",
    "tslib": "^1.5.0",
    "eslint": "^4.4.2",
    "typescript": "~2.0.6",
    "typings": "^2.0.0",
    "validate-commit-msg": "^2.14.0",
    "watch": "^1.0.1",
    "webpack": "^1.13.1",
    "xmlhttprequest": "1.8.0"
  },
  "engines": {
    "npm": ">=2.0.0"
  },
  "typings": "Rx.d.ts",
  "dependencies": {
    "symbol-observable": "^1.0.1"
  }
}

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json]
{
    "name": "typescript",
    "author": "Microsoft Corp.",
    "homepage": "http://typescriptlang.org/",
    "version": "2.4.2",
    "license": "Apache-2.0",
    "description": "TypeScript is a language for application scale JavaScript development",
    "keywords": [
        "TypeScript",
        "Microsoft",
        "compiler",
        "language",
        "javascript"
    ],
    "bugs": {
        "url": "https://github.com/Microsoft/TypeScript/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/Microsoft/TypeScript.git"
    },
    "main": "./lib/typescript.js",
    "typings": "./lib/typescript.d.ts",
    "bin": {
        "tsc": "./bin/tsc",
        "tsserver": "./bin/tsserver"
    },
    "engines": {
        "node": ">=4.2.0"
    },
    "devDependencies": {
        "@types/browserify": "latest",
        "@types/chai": "latest",
        "@types/convert-source-map": "latest",
        "@types/del": "latest",
        "@types/glob": "latest",
        "@types/gulp": "latest",
        "@types/gulp-concat": "latest",
        "@types/gulp-help": "latest",
        "@types/gulp-newer": "latest",
        "@types/gulp-sourcemaps": "latest",
        "@types/merge2": "latest",
        "@types/minimatch": "latest",
        "@types/minimist": "latest",
        "@types/mkdirp": "latest",
        "@types/mocha": "latest",
        "@types/node": "latest",
        "@types/q": "latest",
        "@types/run-sequence": "latest",
        "@types/through2": "latest",
        "browserify": "latest",
        "chai": "latest",
        "convert-source-map": "latest",
        "del": "latest",
        "gulp": "latest",
        "gulp-clone": "latest",
        "gulp-concat": "latest",
        "gulp-help": "latest",
        "gulp-insert": "latest",
        "gulp-newer": "latest",
        "gulp-sourcemaps": "latest",
        "gulp-typescript": "latest",
        "into-stream": "latest",
        "istanbul": "latest",
        "jake": "latest",
        "merge2": "latest",
        "minimist": "latest",
        "mkdirp": "latest",
        "mocha": "latest",
        "mocha-fivemat-progress-reporter": "latest",
        "q": "latest",
        "run-sequence": "latest",
        "sorcery": "latest",
        "through2": "latest",
        "travis-fold": "latest",
        "ts-node": "latest",
        "eslint": "5.16.0",
        "typescript": "^2.4"
    },
    "scripts": {
        "pretest": "jake tests",
        "test": "jake runtests-parallel",
        "build": "npm run build:compiler && npm run build:tests",
        "build:compiler": "jake local",
        "build:tests": "jake tests",
        "start": "node lib/tsc",
        "clean": "jake clean",
        "gulp": "gulp",
        "jake": "jake",
        "lint": "jake lint",
        "setup-hooks": "node scripts/link-hooks.js"
    },
    "browser": {
        "buffer": false,
        "fs": false,
        "os": false,
        "path": false
    }
}

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js]
module.exports = require('./lib/index');


//// [/user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.d.ts]
declare const observableSymbol: symbol;
export default observableSymbol;


//// [/user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js]
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json]
{
    "name": "@types/lodash",
    "version": "4.14.74",
    "description": "TypeScript definitions for Lo-Dash",
    "license": "MIT",
    "contributors": [
        {
            "name": "Brian Zengel",
            "url": "https://github.com/bczengel"
        },
        {
            "name": "Ilya Mochalov",
            "url": "https://github.com/chrootsu"
        },
        {
            "name": "Stepan Mikhaylyuk",
            "url": "https://github.com/stepancar"
        },
        {
            "name": "Eric L Anderson",
            "url": "https://github.com/ericanderson"
        },
        {
            "name": "AJ Richardson",
            "url": "https://github.com/aj-r"
        },
        {
            "name": "Junyoung Clare Jang",
            "url": "https://github.com/ailrun"
        }
    ],
    "main": "",
    "repository": {
        "type": "git",
        "url": "https://www.github.com/DefinitelyTyped/DefinitelyTyped.git"
    },
    "scripts": {},
    "dependencies": {},
    "typesPublisherContentHash": "12af578ffaf8d86d2df37e591857906a86b983fa9258414326544a0fe6af0de8",
    "typeScriptVersion": "2.2"
}

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js]
module.exports = require('./lodash');

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts]

// Stub for lodash
export = _;
export as namespace _;
declare var _: _.LoDashStatic;
declare namespace _ {
    interface LoDashStatic {
        someProp: string;
    }
    class SomeClass {
        someMethod(): void;
    }
}

//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json] deleted
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json] deleted
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json] deleted
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json] deleted
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js] deleted
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts] deleted
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js] deleted
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json] deleted
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js] deleted
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts] deleted

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {}

Info 616  [16:14:43.000] Running: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation
Info 617  [16:14:44.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 618  [16:14:45.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After checking timeout queue length (3) and running

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {}

Info 619  [16:14:46.000] Running: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 620  [16:14:47.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 621  [16:14:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 622  [16:14:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 623  [16:14:50.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: File location affecting resolution
Info 624  [16:14:51.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: File location affecting resolution
Info 625  [16:14:52.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 626  [16:14:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 627  [16:14:54.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 628  [16:14:55.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 629  [16:14:56.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 630  [16:14:57.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 631  [16:14:58.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts
	/user/username/rootfolder/otherfolder/a/b/app.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	node_modules/@types/lodash/index.d.ts
	  Imported via 'lodash' from file 'app.ts' with packageId '@types/lodash/index.d.ts@4.14.74'
	  Entry point for implicit type library 'lodash' with packageId '@types/lodash/index.d.ts@4.14.74'
	app.ts
	  Matched by default include pattern '**/*'

Info 632  [16:14:59.000] -----------------------------------------------
Info 633  [16:15:00.000] Running: *ensureProjectForOpenFiles*
Info 634  [16:15:01.000] Before ensureProjectForOpenFiles:
Info 635  [16:15:02.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 635  [16:15:03.000] 	Files (3)

Info 635  [16:15:04.000] -----------------------------------------------
Info 635  [16:15:05.000] Open files: 
Info 635  [16:15:06.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 635  [16:15:07.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 635  [16:15:08.000] After ensureProjectForOpenFiles:
Info 636  [16:15:09.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 636  [16:15:10.000] 	Files (3)

Info 636  [16:15:11.000] -----------------------------------------------
Info 636  [16:15:12.000] Open files: 
Info 636  [16:15:13.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 636  [16:15:14.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/rootfolder/otherfolder/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/rootfolder/otherfolder/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/a/b/node_modules/@types:
  {}
