currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:25.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/app.js]


//// [/jsconfig.json]
{}

//// [/package.json]
{"dependencies":{"@zkat/cacache":"1.0.0"}}

//// [/node_modules/commander/index.js]


//// [/node_modules/commander/package.json]
{"name":"commander"}

//// [/node_modules/@zkat/cacache/index.js]


//// [/node_modules/@zkat/cacache/package.json]
{"name":"@zkat/cacache"}


Info 1    [00:00:26.000] Search path: /
Info 2    [00:00:27.000] For info: /app.js :: Config file name: /jsconfig.json
Info 3    [00:00:28.000] Creating configuration project /jsconfig.json
Info 4    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /jsconfig.json 2000 undefined Project: /jsconfig.json WatchType: Config file
Info 5    [00:00:30.000] Config: /jsconfig.json : {
 "rootNames": [
  "/app.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/jsconfig.json"
 }
}
Info 6    [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 7    [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 8    [00:00:33.000] Starting updateGraphWorker: Project: /jsconfig.json
Info 9    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /jsconfig.json WatchType: Missing file
Info 10   [00:00:35.000] Finishing updateGraphWorker: Project: /jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 11   [00:00:36.000] Project '/jsconfig.json' (Configured)
Info 12   [00:00:37.000] 	Files (1)
	/app.js SVC-1-0 ""


	app.js
	  Matched by default include pattern '**/*'

Info 13   [00:00:38.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/jsconfig.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

TI:: [00:00:39.000] Global cache location '/tmp', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:40.000] Processing cache location '/tmp'
TI:: [00:00:41.000] Trying to find '/tmp/package.json'...
TI:: [00:00:42.000] Finished processing cache location '/tmp'
TI:: [00:00:43.000] Npm config file: /tmp/package.json
TI:: [00:00:44.000] Npm config file: '/tmp/package.json' is missing, creating new one...
Info 14   [00:00:47.000] DirectoryWatcher:: Triggered with tmp :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 15   [00:00:48.000] Scheduled: /jsconfig.json
Info 16   [00:00:49.000] Scheduled: *ensureProjectForOpenFiles*
Info 17   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 18   [00:00:53.000] DirectoryWatcher:: Triggered with tmp/package.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 19   [00:00:54.000] Config: /jsconfig.json Detected new package.json: tmp/package.json
Info 20   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /tmp/package.json 250 undefined WatchType: package.json file
Info 21   [00:00:56.000] Project: /jsconfig.json Detected file add/remove of non supported extension: tmp/package.json
Info 22   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/package.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
TI:: [00:00:58.000] Updating types-registry npm package...
TI:: [00:00:59.000] npm install --ignore-scripts types-registry@latest
Info 23   [00:01:04.000] DirectoryWatcher:: Triggered with tmp/node_modules :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 24   [00:01:05.000] Scheduled: /jsconfig.json, Cancelled earlier one
Info 25   [00:01:06.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 26   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 27   [00:01:09.000] DirectoryWatcher:: Triggered with tmp/node_modules/types-registry :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 28   [00:01:10.000] Scheduled: /jsconfig.json, Cancelled earlier one
Info 29   [00:01:11.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 30   [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/types-registry :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 31   [00:01:14.000] DirectoryWatcher:: Triggered with tmp/node_modules/types-registry/index.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 32   [00:01:15.000] Project: /jsconfig.json Detected file add/remove of non supported extension: tmp/node_modules/types-registry/index.json
Info 33   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/types-registry/index.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
TI:: [00:01:17.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/tmp/package.json]
{ "private": true }

//// [/tmp/node_modules/types-registry/index.json]
{
 "entries": {
  "zkat__cacache": {
   "latest": "1.3.0",
   "ts2.0": "1.0.0",
   "ts2.1": "1.0.0",
   "ts2.2": "1.2.0",
   "ts2.3": "1.3.0",
   "ts2.4": "1.3.0",
   "ts2.5": "1.3.0",
   "ts2.6": "1.3.0",
   "ts2.7": "1.3.0"
  },
  "nested": {
   "latest": "1.3.0",
   "ts2.0": "1.0.0",
   "ts2.1": "1.0.0",
   "ts2.2": "1.2.0",
   "ts2.3": "1.3.0",
   "ts2.4": "1.3.0",
   "ts2.5": "1.3.0",
   "ts2.6": "1.3.0",
   "ts2.7": "1.3.0"
  },
  "commander": {
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


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/jsconfig.json:
  {}
/tmp/package.json: *new*
  {}

FsWatchesRecursive::
/:
  {}

TI:: [00:01:18.000] Got install request {"projectName":"/jsconfig.json","fileNames":["/app.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/tmp","kind":"discover"}
TI:: [00:01:19.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:01:20.000] Processing cache location '/tmp'
TI:: [00:01:21.000] Cache location was already processed...
TI:: [00:01:22.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:23.000] Explicitly included types: []
TI:: [00:01:24.000] Typing names in '/package.json' dependencies: ["@zkat/cacache"]
TI:: [00:01:25.000] Searching for typing names in /node_modules; all files: ["/node_modules/@zkat/cacache/package.json"]
TI:: [00:01:26.000]     Found package names: ["@zkat/cacache"]
TI:: [00:01:27.000] Inferred typings from unresolved imports: []
TI:: [00:01:28.000] Result: {"cachedTypingPaths":[],"newTypingNames":["@zkat/cacache"],"filesToWatch":["/bower_components","/package.json","/node_modules"]}
TI:: [00:01:29.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["@zkat/cacache"],"filesToWatch":["/bower_components","/package.json","/node_modules"]}
TI:: [00:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:01:31.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /jsconfig.json watcher already invoked: false
TI:: [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /jsconfig.json watcher already invoked: false
TI:: [00:01:33.000] FileWatcher:: Added:: WatchInfo: /package.json
TI:: [00:01:34.000] FileWatcher:: Added:: WatchInfo: /package.json 2000 undefined Project: /jsconfig.json watcher already invoked: false
TI:: [00:01:35.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:01:36.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /jsconfig.json watcher already invoked: false
TI:: [00:01:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /jsconfig.json watcher already invoked: false
TI:: [00:01:38.000] Installing typings ["@zkat/cacache"]
TI:: [00:01:39.000] Npm config file: /tmp/package.json
TI:: [00:01:40.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/jsconfig.json"}
TI:: [00:01:41.000] #1 with arguments'["@types/zkat__cacache@tsFakeMajor.Minor"]'.
Info 34   [00:01:42.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 35   [00:01:43.000] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info 36   [00:01:44.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 37   [00:01:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 38   [00:01:46.000] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info 39   [00:01:47.000] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 40   [00:01:48.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 41   [00:01:49.000] 	Files (1)
	/node_modules/@zkat/cacache/index.js Text-1 ""


	node_modules/@zkat/cacache/index.js
	  Root file specified for compilation

Info 42   [00:01:50.000] -----------------------------------------------
Info 43   [00:01:51.000] Starting updateGraphWorker: Project: /jsconfig.json
Info 44   [00:01:52.000] Finishing updateGraphWorker: Project: /jsconfig.json Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 45   [00:01:53.000] Same program as before
Info 46   [00:01:54.000] Project '/jsconfig.json' (Configured)
Info 46   [00:01:55.000] 	Files (1)

Info 46   [00:01:56.000] -----------------------------------------------
Info 46   [00:01:57.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 46   [00:01:58.000] 	Files (1)

Info 46   [00:01:59.000] -----------------------------------------------
Info 46   [00:02:00.000] Open files: 
Info 46   [00:02:01.000] 	FileName: /app.js ProjectRootPath: undefined
Info 46   [00:02:02.000] 		Projects: /jsconfig.json
TI:: [00:02:03.000] #1 with arguments'["@types/zkat__cacache@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}

FsWatches::
/jsconfig.json:
  {}
/tmp/package.json:
  {}
/package.json: *new*
  {}

FsWatchesRecursive::
/:
  {}
/node_modules: *new*
  {}

Info 46   [00:02:08.000] DirectoryWatcher:: Triggered with tmp/node_modules/@types :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 47   [00:02:09.000] Scheduled: /jsconfig.json, Cancelled earlier one
Info 48   [00:02:10.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 49   [00:02:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/@types :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 50   [00:02:13.000] DirectoryWatcher:: Triggered with tmp/node_modules/@types/zkat__cacache :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 51   [00:02:14.000] Scheduled: /jsconfig.json, Cancelled earlier one
Info 52   [00:02:15.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 53   [00:02:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/@types/zkat__cacache :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 54   [00:02:18.000] DirectoryWatcher:: Triggered with tmp/node_modules/@types/zkat__cacache/index.d.ts :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info 55   [00:02:19.000] Scheduled: /jsconfig.json, Cancelled earlier one
Info 56   [00:02:20.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 57   [00:02:21.000] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/@types/zkat__cacache/index.d.ts :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
TI:: After installWorker
//// [/tmp/node_modules/@types/zkat__cacache/index.d.ts]



TI:: [00:02:22.000] Installed typings ["@types/zkat__cacache@tsFakeMajor.Minor"]
TI:: [00:02:23.000] Installed typing files ["/tmp/node_modules/@types/zkat__cacache/index.d.ts"]
TI:: [00:02:24.000] Sending response:
    {"projectName":"/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/jsconfig.json","allowNonTsExtensions":true},"typings":["/tmp/node_modules/@types/zkat__cacache/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info 58   [00:02:25.000] Scheduled: /jsconfig.json, Cancelled earlier one
Info 59   [00:02:26.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
TI:: [00:02:27.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/jsconfig.json","packagesToInstall":["@types/zkat__cacache@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before running Timeout callback:: count: 2
13: /jsconfig.json
14: *ensureProjectForOpenFiles*

Info 60   [00:02:28.000] Running: /jsconfig.json
Info 61   [00:02:29.000] Starting updateGraphWorker: Project: /jsconfig.json
Info 62   [00:02:30.000] Finishing updateGraphWorker: Project: /jsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 63   [00:02:31.000] Project '/jsconfig.json' (Configured)
Info 64   [00:02:32.000] 	Files (2)
	/app.js SVC-1-0 ""
	/tmp/node_modules/@types/zkat__cacache/index.d.ts Text-1 ""


	app.js
	  Matched by default include pattern '**/*'
	tmp/node_modules/@types/zkat__cacache/index.d.ts
	  Matched by default include pattern '**/*'

Info 65   [00:02:33.000] -----------------------------------------------
Info 66   [00:02:34.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 67   [00:02:35.000] 	Files (1)

Info 68   [00:02:36.000] -----------------------------------------------
TI:: [00:02:37.000] Got install request {"projectName":"/jsconfig.json","fileNames":["/app.js","/tmp/node_modules/@types/zkat__cacache/index.d.ts"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/tmp","kind":"discover"}
TI:: [00:02:38.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:02:39.000] Processing cache location '/tmp'
TI:: [00:02:40.000] Cache location was already processed...
TI:: [00:02:41.000] Explicitly included types: []
TI:: [00:02:42.000] Typing names in '/package.json' dependencies: ["@zkat/cacache"]
TI:: [00:02:43.000] Searching for typing names in /node_modules; all files: ["/node_modules/@zkat/cacache/package.json"]
TI:: [00:02:44.000]     Found package names: ["@zkat/cacache"]
TI:: [00:02:45.000] Inferred typings from unresolved imports: []
TI:: [00:02:46.000] Result: {"cachedTypingPaths":[],"newTypingNames":["@zkat/cacache"],"filesToWatch":["/bower_components","/package.json","/node_modules"]}
TI:: [00:02:47.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["@zkat/cacache"],"filesToWatch":["/bower_components","/package.json","/node_modules"]}
TI:: [00:02:48.000] Installing typings ["@zkat/cacache"]
TI:: [00:02:49.000] '@zkat/cacache':: 'zkat__cacache' already has an up-to-date typing - skipping...
TI:: [00:02:50.000] All typings are known to be missing or invalid - no need to install more typings
TI:: [00:02:51.000] Sending response:
    {"projectName":"/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/jsconfig.json","allowNonTsExtensions":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
Info 69   [00:02:52.000] Scheduled: /jsconfig.json
Info 70   [00:02:53.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After running Timeout callback:: count: 2
15: /jsconfig.json
16: *ensureProjectForOpenFiles*
