TI:: [00:00:09.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:10.000] Processing cache location '/a/data'
TI:: [00:00:11.000] Trying to find '/a/data/package.json'...
TI:: [00:00:12.000] Finished processing cache location '/a/data'
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.ts]



Info 1    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 2    [00:00:15.000] Starting updateGraphWorker: Project: /a/app/test.csproj
Info 3    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info 4    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 5    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 6    [00:00:19.000] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:20.000] Project '/a/app/test.csproj' (External)
Info 8    [00:00:21.000] 	Files (1)
	/a/b/app.ts


	../b/app.ts
	  Root file specified for compilation

Info 9    [00:00:22.000] -----------------------------------------------
TI:: [00:00:23.000] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/app.ts"],"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":["jquery"],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:00:24.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:00:25.000] Processing cache location '/a/data'
TI:: [00:00:26.000] Cache location was already processed...
TI:: [00:00:27.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:28.000] Explicitly included types: ["jquery"]
TI:: [00:00:29.000] Inferred typings from unresolved imports: []
TI:: [00:00:30.000] Result: {"cachedTypingPaths":[],"newTypingNames":["jquery"],"filesToWatch":["/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:31.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["jquery"],"filesToWatch":["/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components
TI:: [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules
TI:: [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:38.000] Installing typings ["jquery"]
TI:: [00:00:39.000] Npm config file: /a/data/package.json
TI:: [00:00:40.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:45.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/a/app/test.csproj"}
TI:: [00:00:46.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor"]'.
TI:: [00:00:47.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor"]':: true
TI:: Before installWorker
//// [/a/data/package.json]
{ "private": true }


PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/app/node_modules/@types: *new*
  {"pollingInterval":500}
/a/app/bower_components: *new*
  {"pollingInterval":500}
/a/app/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}

TI:: After installWorker
//// [/a/data/node_modules/@types/jquery/index.d.ts]
declare const $: { x: number }


TI:: [00:00:56.000] Installed typings ["@types/jquery@tsFakeMajor.Minor"]
TI:: [00:00:57.000] Installed typing files ["/a/data/node_modules/@types/jquery/index.d.ts"]
TI:: [00:00:58.000] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"enable":true,"include":["jquery"],"exclude":[]},"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/jquery/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info 10   [00:00:59.000] Scheduled: /a/app/test.csproj
TI:: [00:01:00.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/a/app/test.csproj","packagesToInstall":["@types/jquery@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}