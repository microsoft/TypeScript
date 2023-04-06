currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/tsconfig.json]
{}

//// [/package.json]



Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/tsconfig.json"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:09.000] Search path: /
Info 3    [00:00:10.000] For info: /tsconfig.json :: Config file name: /tsconfig.json
Info 4    [00:00:11.000] Creating configuration project /tsconfig.json
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:13.000] Config: /tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:14.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:16.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 10   [00:00:17.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 11   [00:00:18.000] Project '/tsconfig.json' (Configured)
Info 12   [00:00:19.000] 	Files (0)

Info 13   [00:00:20.000] -----------------------------------------------
Info 14   [00:00:21.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 15   [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 16   [00:00:23.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 18   [00:00:25.000] 	Files (1)
	/tsconfig.json SVC-1-0 "{}"


	tsconfig.json
	  Root file specified for compilation

Info 19   [00:00:26.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

TI:: [00:00:27.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:28.000] Processing cache location '/a/data/'
TI:: [00:00:29.000] Trying to find '/a/data/package.json'...
TI:: [00:00:30.000] Finished processing cache location '/a/data/'
TI:: [00:00:31.000] Npm config file: /a/data/package.json
TI:: [00:00:32.000] Npm config file: '/a/data/package.json' is missing, creating new one...
Info 20   [00:00:35.000] DirectoryWatcher:: Triggered with a :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 21   [00:00:36.000] Scheduled: /tsconfig.json
Info 22   [00:00:37.000] Scheduled: *ensureProjectForOpenFiles*
Info 23   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with a :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 24   [00:00:41.000] DirectoryWatcher:: Triggered with a/data :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 25   [00:00:42.000] Scheduled: /tsconfig.json, Cancelled earlier one
Info 26   [00:00:43.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 27   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 28   [00:00:47.000] DirectoryWatcher:: Triggered with a/data/package.json :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 29   [00:00:48.000] Config: /tsconfig.json Detected new package.json: a/data/package.json
Info 30   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /a/data/package.json 250 undefined WatchType: package.json file
Info 31   [00:00:50.000] Project: /tsconfig.json Detected file add/remove of non supported extension: a/data/package.json
Info 32   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data/package.json :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
TI:: [00:00:52.000] Updating types-registry npm package...
TI:: [00:00:53.000] npm install --ignore-scripts types-registry@latest
Info 33   [00:00:58.000] DirectoryWatcher:: Triggered with a/data/node_modules :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 34   [00:00:59.000] Scheduled: /tsconfig.json, Cancelled earlier one
Info 35   [00:01:00.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 36   [00:01:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data/node_modules :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 37   [00:01:03.000] DirectoryWatcher:: Triggered with a/data/node_modules/types-registry :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 38   [00:01:04.000] Scheduled: /tsconfig.json, Cancelled earlier one
Info 39   [00:01:05.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 40   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data/node_modules/types-registry :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 41   [00:01:08.000] DirectoryWatcher:: Triggered with a/data/node_modules/types-registry/index.json :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 42   [00:01:09.000] Project: /tsconfig.json Detected file add/remove of non supported extension: a/data/node_modules/types-registry/index.json
Info 43   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data/node_modules/types-registry/index.json :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
TI:: [00:01:11.000] TI:: Updated types-registry npm package
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
/tsconfig.json:
  {}
/a/data/package.json: *new*
  {}

FsWatchesRecursive::
/:
  {}

TI:: [00:01:12.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/tsconfig.json"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:13.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:14.000] Processing cache location '/a/data/'
TI:: [00:01:15.000] Cache location was already processed...
TI:: [00:01:16.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:17.000] Explicitly included types: []
TI:: [00:01:18.000] Typing names in '/package.json' dependencies: []
TI:: [00:01:19.000] Inferred typings from unresolved imports: []
TI:: [00:01:20.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/package.json","/node_modules"]}
TI:: [00:01:21.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/package.json","/node_modules"]}
TI:: [00:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:25.000] FileWatcher:: Added:: WatchInfo: /package.json
TI:: [00:01:26.000] FileWatcher:: Added:: WatchInfo: /package.json 2000 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:27.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:01:28.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:30.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:31.000] No new typings were requested as a result of typings discovery
Info 44   [00:01:32.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 45   [00:01:33.000] Project '/tsconfig.json' (Configured)
Info 45   [00:01:34.000] 	Files (0)

Info 45   [00:01:35.000] -----------------------------------------------
Info 45   [00:01:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 45   [00:01:37.000] 	Files (1)

Info 45   [00:01:38.000] -----------------------------------------------
Info 45   [00:01:39.000] Open files: 
Info 45   [00:01:40.000] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info 45   [00:01:41.000] 		Projects: /dev/null/inferredProject1*
Info 45   [00:01:42.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/a/data/package.json:
  {}
/package.json: *new*
  {}

FsWatchesRecursive::
/:
  {}

TI:: [00:01:46.000] FileWatcher:: Triggered with /package.json 1:: WatchInfo: /package.json 2000 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:47.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","kind":"action::invalidate"}
TI:: [00:01:48.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/tsconfig.json"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:49.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:50.000] Processing cache location '/a/data/'
TI:: [00:01:51.000] Cache location was already processed...
TI:: [00:01:52.000] Explicitly included types: []
TI:: [00:01:53.000] Typing names in '/package.json' dependencies: ["redux","webpack","typescript","react"]
TI:: [00:01:54.000] Inferred typings from unresolved imports: []
TI:: [00:01:55.000] Result: {"cachedTypingPaths":[],"newTypingNames":["redux","webpack","typescript","react"],"filesToWatch":["/bower_components","/package.json","/node_modules"]}
TI:: [00:01:56.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["redux","webpack","typescript","react"],"filesToWatch":["/bower_components","/package.json","/node_modules"]}
TI:: [00:01:57.000] Installing typings ["redux","webpack","typescript","react"]
TI:: [00:01:58.000] 'redux':: Entry for package 'redux' does not exist in local types registry - skipping...
TI:: [00:01:59.000] 'webpack':: Entry for package 'webpack' does not exist in local types registry - skipping...
TI:: [00:02:00.000] 'typescript':: Entry for package 'typescript' does not exist in local types registry - skipping...
TI:: [00:02:01.000] 'react':: Entry for package 'react' does not exist in local types registry - skipping...
TI:: [00:02:02.000] All typings are known to be missing or invalid - no need to install more typings
TI:: [00:02:03.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:04.000] Elapsed:: *ms FileWatcher:: Triggered with /package.json 1:: WatchInfo: /package.json 2000 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
Info 46   [00:02:05.000] FileWatcher:: Triggered with /package.json 1:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 47   [00:02:06.000] Elapsed:: *ms FileWatcher:: Triggered with /package.json 1:: WatchInfo: /package.json 250 undefined WatchType: package.json file
PackageJson
//// [/package.json]
{
  "dependencies": {
    "redux": "*"
  },
  "peerDependencies": {
    "react": "*"
  },
  "optionalDependencies": {
    "typescript": "*"
  },
  "devDependencies": {
    "webpack": "*"
  }
}

