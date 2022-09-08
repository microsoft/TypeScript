Info 0    [00:00:27.000] Provided types map file "/typesMap.json" doesn't exist
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

Info 1    [00:00:28.000] Search path: /user/username/rootfolder/otherfolder/a/b
Info 2    [00:00:29.000] For info: /user/username/rootfolder/otherfolder/a/b/app.ts :: Config file name: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 3    [00:00:30.000] Creating configuration project /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 4    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/tsconfig.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:32.000] Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json : {
 "rootNames": [
  "/user/username/rootfolder/otherfolder/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/user/username/rootfolder/otherfolder/a/b/tsconfig.json"
 }
}
Info 6    [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:35.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [00:00:36.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 10   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 18   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 19   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 20   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 21   [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 22   [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 23   [00:00:50.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:51.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 25   [00:00:52.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/rootfolder/otherfolder/a/b/app.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	app.ts
	  Matched by default include pattern '**/*'

Info 26   [00:00:53.000] -----------------------------------------------
Info 27   [00:00:54.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 27   [00:00:55.000] 	Files (2)

Info 27   [00:00:56.000] -----------------------------------------------
Info 27   [00:00:57.000] Open files: 
Info 27   [00:00:58.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 27   [00:00:59.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 27   [00:01:02.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 28   [00:01:03.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation
Info 29   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 30   [00:01:05.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 31   [00:01:06.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 32   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 33   [00:01:08.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 34   [00:01:09.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 35   [00:01:10.000] Scheduled: *ensureProjectForOpenFiles*
Info 36   [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 37   [00:01:14.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 38   [00:01:15.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 39   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 40   [00:01:17.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 41   [00:01:18.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 42   [00:01:19.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 43   [00:01:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 44   [00:01:23.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 45   [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [00:01:25.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 47   [00:01:26.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types
Info 48   [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 49   [00:01:30.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 50   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 51   [00:01:32.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 52   [00:01:33.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa
Info 53   [00:01:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 54   [00:01:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 55   [00:01:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 56   [00:01:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 57   [00:01:40.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7
Info 58   [00:01:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 59   [00:01:44.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 60   [00:01:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 61   [00:01:46.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 62   [00:01:47.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff
Info 63   [00:01:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 64   [00:01:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 65   [00:01:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 66   [00:01:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 67   [00:01:54.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61
Info 68   [00:01:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 69   [00:01:58.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 70   [00:01:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 71   [00:02:00.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 72   [00:02:01.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d
Info 73   [00:02:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 74   [00:02:05.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 75   [00:02:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 76   [00:02:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 77   [00:02:08.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json
Info 78   [00:02:09.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 79   [00:02:12.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 80   [00:02:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 81   [00:02:14.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 82   [00:02:15.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json
Info 83   [00:02:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 84   [00:02:19.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 85   [00:02:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 86   [00:02:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 87   [00:02:22.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json
Info 88   [00:02:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 89   [00:02:26.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 90   [00:02:27.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 91   [00:02:28.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 92   [00:02:29.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json
Info 93   [00:02:30.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 94   [00:02:33.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 95   [00:02:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 96   [00:02:35.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 97   [00:02:36.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js
Info 98   [00:02:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 99   [00:02:40.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 100  [00:02:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 101  [00:02:42.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 102  [00:02:43.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts
Info 103  [00:02:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 104  [00:02:47.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 105  [00:02:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 106  [00:02:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 107  [00:02:50.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib
Info 108  [00:02:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 109  [00:02:54.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 110  [00:02:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 111  [00:02:56.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 112  [00:02:57.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js
Info 113  [00:02:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Checking timeout queue length: 3
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

Info 114  [00:03:08.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 115  [00:03:09.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 116  [00:03:10.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 117  [00:03:11.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib
Info 118  [00:03:12.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 119  [00:03:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 120  [00:03:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 121  [00:03:17.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 122  [00:03:18.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add
Info 123  [00:03:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 124  [00:03:22.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 125  [00:03:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 126  [00:03:24.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 127  [00:03:25.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator
Info 128  [00:03:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 129  [00:03:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 130  [00:03:30.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 131  [00:03:31.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 132  [00:03:32.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json
Info 133  [00:03:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 134  [00:03:36.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 135  [00:03:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 136  [00:03:38.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 137  [00:03:39.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js
Info 138  [00:03:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 139  [00:03:43.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 140  [00:03:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 141  [00:03:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 142  [00:03:46.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594
Info 143  [00:03:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Checking timeout queue length: 3
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

Info 144  [00:03:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 145  [00:03:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 146  [00:03:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 147  [00:03:52.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594
Info 148  [00:03:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Checking timeout queue length: 3
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

Info 149  [00:04:14.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 150  [00:04:15.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 151  [00:04:16.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 152  [00:04:17.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles
Info 153  [00:04:18.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 154  [00:04:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 155  [00:04:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 156  [00:04:23.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 157  [00:04:24.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator
Info 158  [00:04:25.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 159  [00:04:30.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 160  [00:04:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 161  [00:04:32.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 162  [00:04:33.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src
Info 163  [00:04:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 164  [00:04:36.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 165  [00:04:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 166  [00:04:38.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 167  [00:04:39.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add
Info 168  [00:04:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 169  [00:04:42.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 170  [00:04:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 171  [00:04:44.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 172  [00:04:45.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable
Info 173  [00:04:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 174  [00:04:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 175  [00:04:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 176  [00:04:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 177  [00:04:52.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom
Info 178  [00:04:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 179  [00:04:56.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 180  [00:04:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 181  [00:04:58.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 182  [00:04:59.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts
Info 183  [00:05:00.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Checking timeout queue length: 3
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

Info 184  [00:05:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 185  [00:05:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 186  [00:05:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 187  [00:05:16.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler
Info 188  [00:05:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 189  [00:05:20.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 190  [00:05:21.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 191  [00:05:22.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 192  [00:05:23.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util
Info 193  [00:05:24.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 194  [00:05:27.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 195  [00:05:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 196  [00:05:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 197  [00:05:30.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol
Info 198  [00:05:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 199  [00:05:34.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 200  [00:05:35.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 201  [00:05:36.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 202  [00:05:37.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing
Info 203  [00:05:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 204  [00:05:41.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 205  [00:05:42.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 206  [00:05:43.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 207  [00:05:44.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041
Info 208  [00:05:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Checking timeout queue length: 3
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

Info 209  [00:05:47.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 210  [00:05:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 211  [00:05:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 212  [00:05:50.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041
Info 213  [00:05:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 214  [00:06:04.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 215  [00:06:05.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 216  [00:06:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 217  [00:06:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 218  [00:06:08.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 219  [00:06:09.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 220  [00:06:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 221  [00:06:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 222  [00:06:14.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 223  [00:06:15.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 224  [00:06:16.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 225  [00:06:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 226  [00:06:18.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 227  [00:06:19.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 228  [00:06:20.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 229  [00:06:21.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 230  [00:06:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 231  [00:06:23.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 232  [00:06:24.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 233  [00:06:25.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 234  [00:06:26.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 235  [00:06:27.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 236  [00:06:28.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 237  [00:06:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 238  [00:06:32.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 239  [00:06:33.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 240  [00:06:34.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 241  [00:06:35.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 242  [00:06:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 243  [00:06:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 244  [00:06:38.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 245  [00:06:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 246  [00:06:40.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 247  [00:06:41.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 248  [00:06:42.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 249  [00:06:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 250  [00:06:46.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 251  [00:06:47.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 252  [00:06:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 253  [00:06:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 254  [00:06:50.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 255  [00:06:51.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 256  [00:06:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 257  [00:06:55.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 258  [00:06:56.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 259  [00:06:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 260  [00:06:58.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 261  [00:06:59.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 262  [00:07:00.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 263  [00:07:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 264  [00:07:04.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 265  [00:07:05.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 266  [00:07:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 267  [00:07:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 268  [00:07:08.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 269  [00:07:09.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 270  [00:07:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 271  [00:07:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 272  [00:07:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 273  [00:07:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 274  [00:07:16.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.bin
Info 275  [00:07:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Checking timeout queue length: 3
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

Info 276  [00:07:19.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 277  [00:07:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 278  [00:07:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 279  [00:07:22.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts
Info 280  [00:07:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 281  [00:07:25.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 282  [00:07:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 283  [00:07:27.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 284  [00:07:28.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json
Info 285  [00:07:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 286  [00:07:31.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 287  [00:07:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 288  [00:07:33.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 289  [00:07:34.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7
Info 290  [00:07:35.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 291  [00:07:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 292  [00:07:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 293  [00:07:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 294  [00:07:40.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types
Info 295  [00:07:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 296  [00:07:43.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 297  [00:07:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 298  [00:07:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 299  [00:07:46.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js
Info 300  [00:07:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 301  [00:07:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 302  [00:07:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 303  [00:07:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 304  [00:07:52.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json
Info 305  [00:07:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 306  [00:07:55.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 307  [00:07:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 308  [00:07:57.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 309  [00:07:58.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa
Info 310  [00:07:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 311  [00:08:01.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 312  [00:08:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 313  [00:08:03.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 314  [00:08:04.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator
Info 315  [00:08:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 316  [00:08:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 317  [00:08:08.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 318  [00:08:09.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 319  [00:08:10.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add
Info 320  [00:08:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 321  [00:08:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 322  [00:08:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 323  [00:08:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 324  [00:08:16.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles
Info 325  [00:08:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 326  [00:08:19.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 327  [00:08:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 328  [00:08:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 329  [00:08:22.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator
Info 330  [00:08:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 331  [00:08:25.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 332  [00:08:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 333  [00:08:27.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 334  [00:08:28.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json
Info 335  [00:08:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 336  [00:08:31.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 337  [00:08:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 338  [00:08:33.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 339  [00:08:34.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom
Info 340  [00:08:35.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 341  [00:08:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 342  [00:08:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 343  [00:08:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 344  [00:08:40.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable
Info 345  [00:08:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 346  [00:08:43.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 347  [00:08:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 348  [00:08:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 349  [00:08:46.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add
Info 350  [00:08:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 351  [00:08:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 352  [00:08:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 353  [00:08:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 354  [00:08:52.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler
Info 355  [00:08:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 356  [00:08:55.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 357  [00:08:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 358  [00:08:57.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 359  [00:08:58.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util
Info 360  [00:08:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 361  [00:09:01.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 362  [00:09:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 363  [00:09:03.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 364  [00:09:04.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src
Info 365  [00:09:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 366  [00:09:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 367  [00:09:08.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 368  [00:09:09.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 369  [00:09:10.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol
Info 370  [00:09:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 371  [00:09:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 372  [00:09:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 373  [00:09:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 374  [00:09:16.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing
Info 375  [00:09:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 376  [00:09:19.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 377  [00:09:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 378  [00:09:21.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 379  [00:09:22.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61
Info 380  [00:09:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 381  [00:09:25.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 382  [00:09:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 383  [00:09:27.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 384  [00:09:28.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts
Info 385  [00:09:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 386  [00:09:31.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 387  [00:09:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 388  [00:09:33.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 389  [00:09:34.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js
Info 390  [00:09:35.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 391  [00:09:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 392  [00:09:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 393  [00:09:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 394  [00:09:40.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js
Info 395  [00:09:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 396  [00:09:43.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 397  [00:09:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 398  [00:09:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 399  [00:09:46.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib
Info 400  [00:09:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 401  [00:09:49.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 402  [00:09:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 403  [00:09:51.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 404  [00:09:52.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json
Info 405  [00:09:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 406  [00:09:55.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 407  [00:09:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 408  [00:09:57.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 409  [00:09:58.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff
Info 410  [00:09:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 411  [00:10:01.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 412  [00:10:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 413  [00:10:03.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 414  [00:10:04.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib
Info 415  [00:10:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 416  [00:10:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 417  [00:10:08.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 418  [00:10:09.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 419  [00:10:10.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json
Info 420  [00:10:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 421  [00:10:13.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 422  [00:10:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 423  [00:10:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 424  [00:10:16.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d
Info 425  [00:10:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 426  [00:10:19.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 427  [00:10:20.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 428  [00:10:21.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 429  [00:10:22.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 430  [00:10:23.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 431  [00:10:24.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 432  [00:10:25.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 433  [00:10:28.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 434  [00:10:29.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 435  [00:10:30.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 436  [00:10:31.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 437  [00:10:32.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 438  [00:10:33.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 439  [00:10:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 440  [00:10:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 441  [00:10:38.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 442  [00:10:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 443  [00:10:40.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 444  [00:10:41.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json
Info 445  [00:10:42.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 446  [00:10:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 447  [00:10:46.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 448  [00:10:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 449  [00:10:48.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 450  [00:10:49.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json
Info 451  [00:10:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 452  [00:10:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 453  [00:10:54.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 454  [00:10:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 455  [00:10:56.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 456  [00:10:57.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json
Info 457  [00:10:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 458  [00:11:01.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 459  [00:11:02.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 460  [00:11:03.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 461  [00:11:04.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 462  [00:11:05.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json
Info 463  [00:11:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 464  [00:11:09.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 465  [00:11:10.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 466  [00:11:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 467  [00:11:12.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 468  [00:11:13.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js
Info 469  [00:11:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 470  [00:11:17.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 471  [00:11:18.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 472  [00:11:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 473  [00:11:20.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 474  [00:11:21.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 475  [00:11:22.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 476  [00:11:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 477  [00:11:26.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 478  [00:11:27.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 479  [00:11:28.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 480  [00:11:29.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 481  [00:11:30.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 482  [00:11:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 483  [00:11:34.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 484  [00:11:35.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 485  [00:11:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 486  [00:11:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 487  [00:11:38.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js
Info 488  [00:11:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 489  [00:11:42.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 490  [00:11:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 491  [00:11:44.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 492  [00:11:45.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 493  [00:11:46.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 494  [00:11:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 495  [00:11:50.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 496  [00:11:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 497  [00:11:52.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 498  [00:11:53.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 499  [00:11:54.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 500  [00:11:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 501  [00:11:58.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 502  [00:11:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 503  [00:12:00.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 504  [00:12:01.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 505  [00:12:02.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 506  [00:12:03.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 507  [00:12:06.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 508  [00:12:07.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 509  [00:12:08.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 510  [00:12:09.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 511  [00:12:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 512  [00:12:11.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 513  [00:12:12.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 514  [00:12:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 515  [00:12:14.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 516  [00:12:15.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json
Info 517  [00:12:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 518  [00:12:19.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 519  [00:12:20.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 520  [00:12:21.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 521  [00:12:22.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 522  [00:12:23.000] Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js
Info 523  [00:12:24.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 524  [00:12:27.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 525  [00:12:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 526  [00:12:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 527  [00:12:30.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 528  [00:12:31.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 529  [00:12:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 530  [00:12:35.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 531  [00:12:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 532  [00:12:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 533  [00:12:38.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 534  [00:12:39.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 535  [00:12:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 536  [00:12:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 537  [00:12:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 538  [00:12:47.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 539  [00:12:48.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 540  [00:12:49.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 541  [00:12:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 542  [00:12:52.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 543  [00:12:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 544  [00:12:54.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 545  [00:12:55.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 546  [00:12:56.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 547  [00:12:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 548  [00:12:59.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 549  [00:13:00.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 550  [00:13:01.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 551  [00:13:02.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 552  [00:13:03.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 553  [00:13:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 554  [00:13:07.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 555  [00:13:08.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 556  [00:13:09.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 557  [00:13:10.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 558  [00:13:11.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 559  [00:13:12.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 560  [00:13:15.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 561  [00:13:16.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 562  [00:13:17.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 563  [00:13:18.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 564  [00:13:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Type roots
Info 565  [00:13:20.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 566  [00:13:21.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 567  [00:13:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 568  [00:13:23.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 569  [00:13:24.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 570  [00:13:25.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 571  [00:13:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 572  [00:13:29.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 573  [00:13:30.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 574  [00:13:31.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 575  [00:13:32.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 576  [00:13:33.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 577  [00:13:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 578  [00:13:37.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 579  [00:13:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 580  [00:13:39.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 581  [00:13:40.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 582  [00:13:41.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 583  [00:13:42.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 584  [00:13:45.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 585  [00:13:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 586  [00:13:47.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 587  [00:13:48.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 588  [00:13:49.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 589  [00:13:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 590  [00:13:53.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 591  [00:13:54.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 592  [00:13:55.000] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
Info 593  [00:13:56.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 594  [00:13:57.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 595  [00:13:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Wild card directory
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

Info 596  [00:13:59.000] Running: /user/username/rootfolder/otherfolder/a/b/tsconfig.jsonFailedLookupInvalidation
Info 597  [00:14:00.000] Scheduled: /user/username/rootfolder/otherfolder/a/b/tsconfig.json, Cancelled earlier one
Info 598  [00:14:01.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
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

Info 599  [00:14:02.000] Running: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 600  [00:14:03.000] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 601  [00:14:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 602  [00:14:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 603  [00:14:06.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/lodash/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: File location affecting resolution
Info 604  [00:14:07.000] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/@types/lodash/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: File location affecting resolution
Info 605  [00:14:08.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 606  [00:14:09.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 607  [00:14:10.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 608  [00:14:11.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 609  [00:14:12.000] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 610  [00:14:13.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 611  [00:14:14.000] 	Files (3)
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

Info 612  [00:14:15.000] -----------------------------------------------
Info 613  [00:14:16.000] Running: *ensureProjectForOpenFiles*
Info 614  [00:14:17.000] Before ensureProjectForOpenFiles:
Info 615  [00:14:18.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 615  [00:14:19.000] 	Files (3)

Info 615  [00:14:20.000] -----------------------------------------------
Info 615  [00:14:21.000] Open files: 
Info 615  [00:14:22.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 615  [00:14:23.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
Info 615  [00:14:24.000] After ensureProjectForOpenFiles:
Info 616  [00:14:25.000] Project '/user/username/rootfolder/otherfolder/a/b/tsconfig.json' (Configured)
Info 616  [00:14:26.000] 	Files (3)

Info 616  [00:14:27.000] -----------------------------------------------
Info 616  [00:14:28.000] Open files: 
Info 616  [00:14:29.000] 	FileName: /user/username/rootfolder/otherfolder/a/b/app.ts ProjectRootPath: undefined
Info 616  [00:14:30.000] 		Projects: /user/username/rootfolder/otherfolder/a/b/tsconfig.json
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
