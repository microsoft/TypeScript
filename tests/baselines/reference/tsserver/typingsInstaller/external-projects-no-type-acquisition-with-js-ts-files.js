TI:: Creating typing installer
//// [/a/b/jquery.js]


//// [/a/b/file2.ts]



TI:: [00:00:11.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:12.000] Processing cache location '/a/data'
TI:: [00:00:13.000] Trying to find '/a/data/package.json'...
TI:: [00:00:14.000] Finished processing cache location '/a/data'
TI:: [00:00:15.000] Npm config file: /a/data/package.json
TI:: [00:00:16.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:21.000] Updating types-registry npm package...
TI:: [00:00:22.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:29.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {
  "jquery": {
   "latest": "1.3.0",
   "ts2.0": "1.0.0",
   "ts2.1": "1.0.0",
   "ts2.2": "1.2.0",
   "ts2.3": "1.3.0",
   "ts2.4": "1.3.0",
   "ts2.5": "1.3.0",
   "ts2.6": "1.3.0",
   "ts2.7": "1.3.0"
  }
 }
}


Info 0    [00:00:30.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service

Info 1    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/jquery.js 500 undefined WatchType: Closed Script info
Info 2    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:33.000] Starting updateGraphWorker: Project: /a/app/test.csproj
Info 4    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info 5    [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 6    [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 7    [00:00:37.000] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:38.000] Project '/a/app/test.csproj' (External)
Info 9    [00:00:39.000] 	Files (2)
	/a/b/jquery.js
	/a/b/file2.ts


	../b/jquery.js
	  Root file specified for compilation
	../b/file2.ts
	  Root file specified for compilation

Info 10   [00:00:40.000] -----------------------------------------------