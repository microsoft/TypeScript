TI:: [00:00:11.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:12.000] Processing cache location '/a/data'
TI:: [00:00:13.000] Trying to find '/a/data/package.json'...
TI:: [00:00:14.000] Finished processing cache location '/a/data'
Info 0    [00:00:15.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]


//// [/a/b/package.json]
{"name":"test","dependencies":{"jquery":"^3.1.0"}}


Info 1    [00:00:16.000] Search path: /a/b
Info 2    [00:00:17.000] For info: /a/b/app.js :: No config files found.
Info 3    [00:00:18.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 5    [00:00:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 6    [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 7    [00:00:22.000] 	Files (1)
	/a/b/app.js


	a/b/app.js
	  Root file specified for compilation

Info 8    [00:00:23.000] -----------------------------------------------
TI:: [00:00:24.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data","kind":"discover"}
TI:: [00:00:25.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:00:26.000] Processing cache location '/a/data'
TI:: [00:00:27.000] Cache location was already processed...
TI:: [00:00:28.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:29.000] Explicitly included types: []
TI:: [00:00:30.000] Typing names in '/a/b/package.json' dependencies: ["jquery"]
TI:: [00:00:31.000] Inferred typings from unresolved imports: []
TI:: [00:00:32.000] Result: {"cachedTypingPaths":[],"newTypingNames":["jquery"],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:00:33.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["jquery"],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a
TI:: [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/b/package.json
TI:: [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/b/package.json 2000 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:45.000] Installing typings ["jquery"]
TI:: [00:00:46.000] Npm config file: /a/data/package.json
TI:: [00:00:47.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:50.000] DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:54.000] DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:56.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/dev/null/inferredProject1*"}
TI:: [00:00:57.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor"]'.
Info 9    [00:00:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:59.000] 	Files (1)

Info 9    [00:01:00.000] -----------------------------------------------
Info 9    [00:01:01.000] Open files: 
Info 9    [00:01:02.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 9    [00:01:03.000] 		Projects: /dev/null/inferredProject1*
TI:: [00:01:04.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor"]':: true
TI:: Before installWorker
//// [/a/data/package.json]
{ "private": true }


PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/package.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

TI:: [00:01:10.000] DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:13.000] DirectoryWatcher:: Triggered with /a/data/node_modules/@types :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/@types :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:16.000] DirectoryWatcher:: Triggered with /a/data/node_modules/@types/jquery :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/@types/jquery :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:19.000] DirectoryWatcher:: Triggered with /a/data/node_modules/@types/jquery/index.d.ts :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/@types/jquery/index.d.ts :: WatchInfo: /a 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: After installWorker
//// [/a/data/node_modules/@types/jquery/index.d.ts]
declare const $: { x: number }


TI:: [00:01:21.000] Installed typings ["@types/jquery@tsFakeMajor.Minor"]
TI:: [00:01:22.000] Installed typing files ["/a/data/node_modules/@types/jquery/index.d.ts"]
TI:: [00:01:23.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":["/a/data/node_modules/@types/jquery/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info 9    [00:01:24.000] Scheduled: /dev/null/inferredProject1*
Info 10   [00:01:25.000] Scheduled: *ensureProjectForOpenFiles*
TI:: [00:01:26.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/dev/null/inferredProject1*","packagesToInstall":["@types/jquery@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before checking timeout queue length (2) and running

Info 11   [00:01:27.000] Running: /dev/null/inferredProject1*
Info 12   [00:01:28.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 13   [00:01:29.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:01:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:01:31.000] 	Files (2)
	/a/b/app.js
	/a/data/node_modules/@types/jquery/index.d.ts


	a/b/app.js
	  Root file specified for compilation
	a/data/node_modules/@types/jquery/index.d.ts
	  Root file specified for compilation

Info 16   [00:01:32.000] -----------------------------------------------
TI:: [00:01:33.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js","/a/data/node_modules/@types/jquery/index.d.ts"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data","kind":"discover"}
TI:: [00:01:34.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:01:35.000] Processing cache location '/a/data'
TI:: [00:01:36.000] Cache location was already processed...
TI:: [00:01:37.000] Explicitly included types: []
TI:: [00:01:38.000] Typing names in '/a/b/package.json' dependencies: ["jquery"]
TI:: [00:01:39.000] Inferred typings from unresolved imports: []
TI:: [00:01:40.000] Result: {"cachedTypingPaths":["/a/data/node_modules/@types/jquery/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:01:41.000] Finished typings discovery: {"cachedTypingPaths":["/a/data/node_modules/@types/jquery/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:01:42.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":["/a/data/node_modules/@types/jquery/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:43.000] No new typings were requested as a result of typings discovery
Info 17   [00:01:44.000] Running: *ensureProjectForOpenFiles*
Info 18   [00:01:45.000] Before ensureProjectForOpenFiles:
Info 19   [00:01:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 19   [00:01:47.000] 	Files (2)

Info 19   [00:01:48.000] -----------------------------------------------
Info 19   [00:01:49.000] Open files: 
Info 19   [00:01:50.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 19   [00:01:51.000] 		Projects: /dev/null/inferredProject1*
Info 19   [00:01:52.000] After ensureProjectForOpenFiles:
Info 20   [00:01:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 20   [00:01:54.000] 	Files (2)

Info 20   [00:01:55.000] -----------------------------------------------
Info 20   [00:01:56.000] Open files: 
Info 20   [00:01:57.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 20   [00:01:58.000] 		Projects: /dev/null/inferredProject1*
After checking timeout queue length (2) and running
