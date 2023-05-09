currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.ts]



Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/app.ts Text-1 ""


	../b/app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}

TI:: [hh:mm:ss:mss] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Trying to find '/a/data/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] TI:: Updated types-registry npm package
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


TI:: [hh:mm:ss:mss] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/app.ts"],"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":["jquery"],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [hh:mm:ss:mss] Request specifies cache path '/a/data', loading cached information...
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Cache location was already processed...
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: ["jquery"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Result: {"cachedTypingPaths":[],"newTypingNames":["jquery"],"filesToWatch":["/a/app/bower_components","/a/app/node_modules"]}
TI:: [hh:mm:ss:mss] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["jquery"],"filesToWatch":["/a/app/bower_components","/a/app/node_modules"]}
TI:: [hh:mm:ss:mss] Sending response:
    {"kind":"action::watchTypingLocations","projectName":"/a/app/test.csproj","files":["/a/app/bower_components","/a/app/node_modules"]}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["jquery"]
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/a/app/test.csproj"}
TI:: [hh:mm:ss:mss] #1 with arguments'["@types/jquery@tsFakeMajor.Minor"]'.
TI:: [hh:mm:ss:mss] #1 with arguments'["@types/jquery@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/app/bower_components: *new*
  {"pollingInterval":500}
/a/app/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts:
  {}

TI:: After installWorker
//// [/a/data/node_modules/@types/jquery/index.d.ts]
declare const $: { x: number }


TI:: [hh:mm:ss:mss] Installed typings ["@types/jquery@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/a/data/node_modules/@types/jquery/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"enable":true,"include":["jquery"],"exclude":[]},"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/jquery/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info seq  [hh:mm:ss:mss] Scheduled: /a/app/test.csproj
TI:: [hh:mm:ss:mss] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/a/app/test.csproj","packagesToInstall":["@types/jquery@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}