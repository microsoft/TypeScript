TI:: [00:00:09.000] Global cache location '/a/cache/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:10.000] Processing cache location '/a/cache/'
TI:: [00:00:11.000] Trying to find '/a/cache/package.json'...
TI:: [00:00:12.000] Finished processing cache location '/a/cache/'
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/app.js]


//// [/a/package.json]
{"dependencies":{"commander":"1.0.0"}}


Info 1    [00:00:14.000] Search path: /a
Info 2    [00:00:15.000] For info: /a/app.js :: No config files found.
Info 3    [00:00:16.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 5    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:22.000] 	Files (1)
	/a/app.js


	app.js
	  Root file specified for compilation

Info 10   [00:00:23.000] -----------------------------------------------
TI:: [00:00:24.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/cache/","kind":"discover"}
TI:: [00:00:25.000] Request specifies cache path '/a/cache/', loading cached information...
TI:: [00:00:26.000] Processing cache location '/a/cache/'
TI:: [00:00:27.000] Cache location was already processed...
TI:: [00:00:28.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:29.000] Explicitly included types: []
TI:: [00:00:30.000] Typing names in '/a/package.json' dependencies: ["commander"]
TI:: [00:00:31.000] Inferred typings from unresolved imports: []
TI:: [00:00:32.000] Result: {"cachedTypingPaths":[],"newTypingNames":["commander"],"filesToWatch":["/a/bower_components","/a/package.json","/a/node_modules"]}
TI:: [00:00:33.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["commander"],"filesToWatch":["/a/bower_components","/a/package.json","/a/node_modules"]}
TI:: [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components
TI:: [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/package.json
TI:: [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/package.json 2000 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules
TI:: [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:42.000] Installing typings ["commander"]
TI:: [00:00:43.000] Npm config file: /a/cache/package.json
TI:: [00:00:44.000] Npm config file: '/a/cache/package.json' is missing, creating new one...
TI:: [00:00:49.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/dev/null/inferredProject1*"}
TI:: [00:00:50.000] #1 with arguments'["@types/commander@tsFakeMajor.Minor"]'.
Info 11   [00:00:51.000] FileWatcher:: Added:: WatchInfo: /a/package.json 250 undefined WatchType: package.json file
Info 12   [00:00:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:53.000] 	Files (1)

Info 12   [00:00:54.000] -----------------------------------------------
Info 12   [00:00:55.000] Open files: 
Info 12   [00:00:56.000] 	FileName: /a/app.js ProjectRootPath: undefined
Info 12   [00:00:57.000] 		Projects: /dev/null/inferredProject1*
TI:: [00:00:58.000] #1 with arguments'["@types/commander@tsFakeMajor.Minor"]':: true
TI:: Before installWorker
//// [/a/cache/package.json]
{ "private": true }


PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}
/a/bower_components: *new*
  {"pollingInterval":500}
/a/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/package.json: *new*
  {}

TI:: After installWorker
//// [/a/cache/node_modules/@types/commander/index.d.ts]
export let x: number


TI:: [00:01:07.000] Installed typings ["@types/commander@tsFakeMajor.Minor"]
TI:: [00:01:08.000] Installed typing files ["/a/cache/node_modules/@types/commander/index.d.ts"]
TI:: [00:01:09.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":["/a/cache/node_modules/@types/commander/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info 12   [00:01:10.000] Scheduled: /dev/null/inferredProject1*
Info 13   [00:01:11.000] Scheduled: *ensureProjectForOpenFiles*
TI:: [00:01:12.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/dev/null/inferredProject1*","packagesToInstall":["@types/commander@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before checking timeout queue length (2) and running

Info 14   [00:01:13.000] Running: /dev/null/inferredProject1*
Info 15   [00:01:14.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 16   [00:01:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:01:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 18   [00:01:17.000] 	Files (2)
	/a/app.js
	/a/cache/node_modules/@types/commander/index.d.ts


	app.js
	  Root file specified for compilation
	cache/node_modules/@types/commander/index.d.ts
	  Root file specified for compilation

Info 19   [00:01:18.000] -----------------------------------------------
TI:: [00:01:19.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/app.js","/a/cache/node_modules/@types/commander/index.d.ts"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/cache/","kind":"discover"}
TI:: [00:01:20.000] Request specifies cache path '/a/cache/', loading cached information...
TI:: [00:01:21.000] Processing cache location '/a/cache/'
TI:: [00:01:22.000] Cache location was already processed...
TI:: [00:01:23.000] Explicitly included types: []
TI:: [00:01:24.000] Typing names in '/a/package.json' dependencies: ["commander"]
TI:: [00:01:25.000] Inferred typings from unresolved imports: []
TI:: [00:01:26.000] Result: {"cachedTypingPaths":["/a/cache/node_modules/@types/commander/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/package.json","/a/node_modules"]}
TI:: [00:01:27.000] Finished typings discovery: {"cachedTypingPaths":["/a/cache/node_modules/@types/commander/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/package.json","/a/node_modules"]}
TI:: [00:01:28.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":["/a/cache/node_modules/@types/commander/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:29.000] No new typings were requested as a result of typings discovery
Info 20   [00:01:30.000] Running: *ensureProjectForOpenFiles*
Info 21   [00:01:31.000] Before ensureProjectForOpenFiles:
Info 22   [00:01:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 22   [00:01:33.000] 	Files (2)

Info 22   [00:01:34.000] -----------------------------------------------
Info 22   [00:01:35.000] Open files: 
Info 22   [00:01:36.000] 	FileName: /a/app.js ProjectRootPath: undefined
Info 22   [00:01:37.000] 		Projects: /dev/null/inferredProject1*
Info 22   [00:01:38.000] After ensureProjectForOpenFiles:
Info 23   [00:01:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:01:40.000] 	Files (2)

Info 23   [00:01:41.000] -----------------------------------------------
Info 23   [00:01:42.000] Open files: 
Info 23   [00:01:43.000] 	FileName: /a/app.js ProjectRootPath: undefined
Info 23   [00:01:44.000] 		Projects: /dev/null/inferredProject1*
After checking timeout queue length (2) and running
