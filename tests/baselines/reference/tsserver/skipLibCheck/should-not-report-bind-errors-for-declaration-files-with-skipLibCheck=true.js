currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/jsconfig.json]
{}

//// [/a/jsFile.js]
let x = 1;

//// [/a/dTsFile1.d.ts]

                declare var x: number;

//// [/a/dTsFile2.d.ts]

                declare var x: string;


Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] Search path: /a
Info 3    [00:00:16.000] For info: /a/jsFile.js :: Config file name: /a/jsconfig.json
Info 4    [00:00:17.000] Creating configuration project /a/jsconfig.json
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info 6    [00:00:19.000] Config: /a/jsconfig.json : {
 "rootNames": [
  "/a/dTsFile1.d.ts",
  "/a/dTsFile2.d.ts",
  "/a/jsFile.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/a/jsconfig.json"
 }
}
Info 7    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 9    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/dTsFile1.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/dTsFile2.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:24.000] Starting updateGraphWorker: Project: /a/jsconfig.json
Info 12   [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/jsconfig.json WatchType: Missing file
Info 13   [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/jsconfig.json WatchType: Type roots
Info 14   [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/jsconfig.json WatchType: Type roots
Info 15   [00:00:28.000] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:29.000] Project '/a/jsconfig.json' (Configured)
Info 17   [00:00:30.000] 	Files (3)
	/a/dTsFile1.d.ts Text-1 "\n                declare var x: number;"
	/a/dTsFile2.d.ts Text-1 "\n                declare var x: string;"
	/a/jsFile.js SVC-1-0 "let x = 1;"


	dTsFile1.d.ts
	  Matched by default include pattern '**/*'
	dTsFile2.d.ts
	  Matched by default include pattern '**/*'
	jsFile.js
	  Matched by default include pattern '**/*'

Info 18   [00:00:31.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json: *new*
  {}
/a/dtsfile1.d.ts: *new*
  {}
/a/dtsfile2.d.ts: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

TI:: [00:00:32.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:33.000] Processing cache location '/a/data/'
TI:: [00:00:34.000] Trying to find '/a/data/package.json'...
TI:: [00:00:35.000] Finished processing cache location '/a/data/'
TI:: [00:00:36.000] Npm config file: /a/data/package.json
TI:: [00:00:37.000] Npm config file: '/a/data/package.json' is missing, creating new one...
Info 19   [00:00:40.000] DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 20   [00:00:41.000] Scheduled: /a/jsconfig.json
Info 21   [00:00:42.000] Scheduled: *ensureProjectForOpenFiles*
Info 22   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 23   [00:00:46.000] DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 24   [00:00:47.000] Config: /a/jsconfig.json Detected new package.json: /a/data/package.json
Info 25   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /a/data/package.json 250 undefined WatchType: package.json file
Info 26   [00:00:49.000] Project: /a/jsconfig.json Detected file add/remove of non supported extension: /a/data/package.json
Info 27   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
TI:: [00:00:51.000] Updating types-registry npm package...
TI:: [00:00:52.000] npm install --ignore-scripts types-registry@latest
Info 28   [00:00:57.000] DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 29   [00:00:58.000] Scheduled: /a/jsconfig.json, Cancelled earlier one
Info 30   [00:00:59.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 31   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 32   [00:01:02.000] DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 33   [00:01:03.000] Scheduled: /a/jsconfig.json, Cancelled earlier one
Info 34   [00:01:04.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 35   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 36   [00:01:07.000] DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry/index.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 37   [00:01:08.000] Project: /a/jsconfig.json Detected file add/remove of non supported extension: /a/data/node_modules/types-registry/index.json
Info 38   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry/index.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
TI:: [00:01:10.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json:
  {}
/a/dtsfile1.d.ts:
  {}
/a/dtsfile2.d.ts:
  {}
/a/data/package.json: *new*
  {}

FsWatchesRecursive::
/a:
  {}

TI:: [00:01:11.000] Got install request {"projectName":"/a/jsconfig.json","fileNames":["/a/dTsFile1.d.ts","/a/dTsFile2.d.ts","/a/jsFile.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:12.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:13.000] Processing cache location '/a/data/'
TI:: [00:01:14.000] Cache location was already processed...
TI:: [00:01:15.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:16.000] Explicitly included types: []
TI:: [00:01:17.000] Inferred typings from unresolved imports: []
TI:: [00:01:18.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:19.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components
TI:: [00:01:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules
TI:: [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:26.000] Sending response:
    {"projectName":"/a/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:27.000] No new typings were requested as a result of typings discovery
Info 39   [00:01:28.000] Starting updateGraphWorker: Project: /a/jsconfig.json
Info 40   [00:01:29.000] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 41   [00:01:30.000] Same program as before
Info 42   [00:01:31.000] Project '/a/jsconfig.json' (Configured)
Info 42   [00:01:32.000] 	Files (3)

Info 42   [00:01:33.000] -----------------------------------------------
Info 42   [00:01:34.000] Open files: 
Info 42   [00:01:35.000] 	FileName: /a/jsFile.js ProjectRootPath: undefined
Info 42   [00:01:36.000] 		Projects: /a/jsconfig.json
Info 42   [00:01:37.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components: *new*
  {"pollingInterval":500}
/a/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json:
  {}
/a/dtsfile1.d.ts:
  {}
/a/dtsfile2.d.ts:
  {}
/a/data/package.json:
  {}

FsWatchesRecursive::
/a:
  {}

Before request

Info 43   [00:01:38.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/dTsFile1.d.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 44   [00:01:39.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 45   [00:01:40.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/dTsFile2.d.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 46   [00:01:41.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
