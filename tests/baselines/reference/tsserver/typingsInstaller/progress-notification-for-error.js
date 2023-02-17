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
TI:: [00:00:58.000] #1 with arguments'["@types/commander@tsFakeMajor.Minor"]':: false
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

TI:: [00:00:59.000] install request failed, marking packages as missing to prevent repeated requests: ["commander"]
TI:: [00:01:00.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/dev/null/inferredProject1*","packagesToInstall":["@types/commander@tsFakeMajor.Minor"],"installSuccess":false,"typingsInstallerVersion":"FakeVersion"}