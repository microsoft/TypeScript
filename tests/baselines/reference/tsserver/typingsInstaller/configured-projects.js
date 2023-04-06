currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]


//// [/a/b/tsconfig.json]
{"compilerOptions":{"allowJs":true},"typeAcquisition":{"enable":true}}

//// [/a/b/package.json]
{"name":"test","dependencies":{"jquery":"^3.1.0"}}


Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/app.js :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:16.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:18.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.js"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 10   [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:25.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:26.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:27.000] 	Files (1)
	/a/b/app.js SVC-1-0 ""


	app.js
	  Matched by default include pattern '**/*'

Info 15   [00:00:28.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

TI:: [00:00:29.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:30.000] Processing cache location '/a/data'
TI:: [00:00:31.000] Trying to find '/a/data/package.json'...
TI:: [00:00:32.000] Finished processing cache location '/a/data'
TI:: [00:00:33.000] Npm config file: /a/data/package.json
TI:: [00:00:34.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:39.000] Updating types-registry npm package...
TI:: [00:00:40.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:47.000] TI:: Updated types-registry npm package
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


TI:: [00:00:48.000] Got install request {"projectName":"/a/b/tsconfig.json","fileNames":["/a/b/app.js"],"compilerOptions":{"allowJs":true,"configFilePath":"/a/b/tsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/data","kind":"discover"}
TI:: [00:00:49.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:00:50.000] Processing cache location '/a/data'
TI:: [00:00:51.000] Cache location was already processed...
TI:: [00:00:52.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:53.000] Explicitly included types: []
TI:: [00:00:54.000] Typing names in '/a/b/package.json' dependencies: ["jquery"]
TI:: [00:00:55.000] Inferred typings from unresolved imports: []
TI:: [00:00:56.000] Result: {"cachedTypingPaths":[],"newTypingNames":["jquery"],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules"]}
TI:: [00:00:57.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["jquery"],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules"]}
TI:: [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/b/tsconfig.json watcher already invoked: false
TI:: [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/b/tsconfig.json watcher already invoked: false
TI:: [00:01:01.000] FileWatcher:: Added:: WatchInfo: /a/b/package.json
TI:: [00:01:02.000] FileWatcher:: Added:: WatchInfo: /a/b/package.json 2000 undefined Project: /a/b/tsconfig.json watcher already invoked: false
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json watcher already invoked: false
TI:: [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json watcher already invoked: false
TI:: [00:01:06.000] Installing typings ["jquery"]
TI:: [00:01:07.000] Npm config file: /a/data/package.json
TI:: [00:01:08.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/a/b/tsconfig.json"}
TI:: [00:01:09.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor"]'.
Info 16   [00:01:10.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:01:11.000] 	Files (1)

Info 16   [00:01:12.000] -----------------------------------------------
Info 16   [00:01:13.000] Open files: 
Info 16   [00:01:14.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 16   [00:01:15.000] 		Projects: /a/b/tsconfig.json
TI:: [00:01:16.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}
/a/b/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/package.json: *new*
  {}

FsWatchesRecursive::
/a/b:
  {}

TI:: After installWorker
//// [/a/data/node_modules/@types/jquery/index.d.ts]
declare const $: { x: number }


TI:: [00:01:23.000] Installed typings ["@types/jquery@tsFakeMajor.Minor"]
TI:: [00:01:24.000] Installed typing files ["/a/data/node_modules/@types/jquery/index.d.ts"]
TI:: [00:01:25.000] Sending response:
    {"projectName":"/a/b/tsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"configFilePath":"/a/b/tsconfig.json","allowNonTsExtensions":true},"typings":["/a/data/node_modules/@types/jquery/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info 16   [00:01:26.000] Scheduled: /a/b/tsconfig.json
Info 17   [00:01:27.000] Scheduled: *ensureProjectForOpenFiles*
TI:: [00:01:28.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/a/b/tsconfig.json","packagesToInstall":["@types/jquery@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before running Timeout callback:: count: 2
1: /a/b/tsconfig.json
2: *ensureProjectForOpenFiles*

Info 18   [00:01:29.000] Running: /a/b/tsconfig.json
Info 19   [00:01:30.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 20   [00:01:31.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:01:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 22   [00:01:33.000] 	Files (2)
	/a/b/app.js SVC-1-0 ""
	/a/data/node_modules/@types/jquery/index.d.ts Text-1 "declare const $: { x: number }"


	app.js
	  Matched by default include pattern '**/*'
	../data/node_modules/@types/jquery/index.d.ts
	  Matched by default include pattern '**/*'

Info 23   [00:01:34.000] -----------------------------------------------
TI:: [00:01:35.000] Got install request {"projectName":"/a/b/tsconfig.json","fileNames":["/a/b/app.js","/a/data/node_modules/@types/jquery/index.d.ts"],"compilerOptions":{"allowJs":true,"configFilePath":"/a/b/tsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/data","kind":"discover"}
TI:: [00:01:36.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:01:37.000] Processing cache location '/a/data'
TI:: [00:01:38.000] Cache location was already processed...
TI:: [00:01:39.000] Explicitly included types: []
TI:: [00:01:40.000] Typing names in '/a/b/package.json' dependencies: ["jquery"]
TI:: [00:01:41.000] Inferred typings from unresolved imports: []
TI:: [00:01:42.000] Result: {"cachedTypingPaths":["/a/data/node_modules/@types/jquery/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules"]}
TI:: [00:01:43.000] Finished typings discovery: {"cachedTypingPaths":["/a/data/node_modules/@types/jquery/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules"]}
TI:: [00:01:44.000] Sending response:
    {"projectName":"/a/b/tsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"configFilePath":"/a/b/tsconfig.json","allowNonTsExtensions":true},"typings":["/a/data/node_modules/@types/jquery/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:45.000] No new typings were requested as a result of typings discovery
Info 24   [00:01:46.000] Running: *ensureProjectForOpenFiles*
Info 25   [00:01:47.000] Before ensureProjectForOpenFiles:
Info 26   [00:01:48.000] Project '/a/b/tsconfig.json' (Configured)
Info 26   [00:01:49.000] 	Files (2)

Info 26   [00:01:50.000] -----------------------------------------------
Info 26   [00:01:51.000] Open files: 
Info 26   [00:01:52.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 26   [00:01:53.000] 		Projects: /a/b/tsconfig.json
Info 26   [00:01:54.000] After ensureProjectForOpenFiles:
Info 27   [00:01:55.000] Project '/a/b/tsconfig.json' (Configured)
Info 27   [00:01:56.000] 	Files (2)

Info 27   [00:01:57.000] -----------------------------------------------
Info 27   [00:01:58.000] Open files: 
Info 27   [00:01:59.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 27   [00:02:00.000] 		Projects: /a/b/tsconfig.json
After running Timeout callback:: count: 0
