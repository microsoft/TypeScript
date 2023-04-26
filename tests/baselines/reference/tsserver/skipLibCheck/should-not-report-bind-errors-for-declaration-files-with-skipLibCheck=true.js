currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/jsconfig.json]
{}

//// [/a/jsFile.js]
let x = 1;

//// [/a/dTsFile1.d.ts]

                declare var x: number;

//// [/a/dTsFile2.d.ts]

                declare var x: string;


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/jsFile.js :: Config file name: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /a/jsconfig.json : {
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
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/dTsFile1.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/dTsFile2.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/jsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/dTsFile1.d.ts Text-1 "\n                declare var x: number;"
	/a/dTsFile2.d.ts Text-1 "\n                declare var x: string;"
	/a/jsFile.js SVC-1-0 "let x = 1;"


	dTsFile1.d.ts
	  Matched by default include pattern '**/*'
	dTsFile2.d.ts
	  Matched by default include pattern '**/*'
	jsFile.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
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

TI:: [hh:mm:ss:mss] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/a/data/'
TI:: [hh:mm:ss:mss] Trying to find '/a/data/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/a/data/'
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/a/data/package.json' is missing, creating new one...
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /a/jsconfig.json Detected new package.json: /a/data/package.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/data/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project: /a/jsconfig.json Detected file add/remove of non supported extension: /a/data/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry/index.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /a/jsconfig.json Detected file add/remove of non supported extension: /a/data/node_modules/types-registry/index.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry/index.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
TI:: [hh:mm:ss:mss] TI:: Updated types-registry npm package
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

TI:: [hh:mm:ss:mss] Got install request {"projectName":"/a/jsconfig.json","fileNames":["/a/dTsFile1.d.ts","/a/dTsFile2.d.ts","/a/jsFile.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [hh:mm:ss:mss] Request specifies cache path '/a/data/', loading cached information...
TI:: [hh:mm:ss:mss] Processing cache location '/a/data/'
TI:: [hh:mm:ss:mss] Cache location was already processed...
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [hh:mm:ss:mss] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [hh:mm:ss:mss] Sending response:
    {"projectName":"/a/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] Project '/a/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/jsFile.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
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

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/dTsFile1.d.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/dTsFile2.d.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
