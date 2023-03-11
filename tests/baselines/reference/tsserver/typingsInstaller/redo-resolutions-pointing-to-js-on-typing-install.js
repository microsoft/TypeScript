Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/a/b/app.js]

                import * as commander from "commander";

//// [/user/username/projects/node_modules/commander/index.js]
module.exports = 0


Info 1    [00:00:22.000] Search path: /user/username/projects/a/b
Info 2    [00:00:23.000] For info: /user/username/projects/a/b/app.js :: No config files found.
Info 3    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:28.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 8    [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 9    [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 10   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 11   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 12   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 13   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 14   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 15   [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 16   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 17   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 18   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 19   [00:00:40.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:00:41.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 21   [00:00:42.000] 	Files (2)
	/user/username/projects/node_modules/commander/index.js Text-1 "module.exports = 0"
	/user/username/projects/a/b/app.js SVC-1-0 "\n                import * as commander from \"commander\";"


	../../node_modules/commander/index.js
	  Imported via "commander" from file 'app.js'
	app.js
	  Root file specified for compilation

Info 22   [00:00:43.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/user/username/projects/a/b/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/a/b/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/a/b/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/a/node_modules: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/user/username/projects/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatchesRecursive::
/user/username/projects/node_modules: *new*
  {}

TI:: [00:00:44.000] Global cache location '/user/username/projects/a/cache', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:45.000] Processing cache location '/user/username/projects/a/cache'
TI:: [00:00:46.000] Trying to find '/user/username/projects/a/cache/package.json'...
TI:: [00:00:47.000] Finished processing cache location '/user/username/projects/a/cache'
TI:: [00:00:48.000] Npm config file: /user/username/projects/a/cache/package.json
TI:: [00:00:49.000] Npm config file: '/user/username/projects/a/cache/package.json' is missing, creating new one...
TI:: [00:00:54.000] Updating types-registry npm package...
TI:: [00:00:55.000] npm install --ignore-scripts types-registry@latest
TI:: [00:01:02.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/user/username/projects/a/cache/package.json]
{ "private": true }

//// [/user/username/projects/a/cache/node_modules/types-registry/index.json]
{
 "entries": {
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


TI:: [00:01:03.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/user/username/projects/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":["commander"],"projectRootPath":"/user/username/projects/a/b","cachePath":"/user/username/projects/a/cache","kind":"discover"}
TI:: [00:01:04.000] Request specifies cache path '/user/username/projects/a/cache', loading cached information...
TI:: [00:01:05.000] Processing cache location '/user/username/projects/a/cache'
TI:: [00:01:06.000] Cache location was already processed...
TI:: [00:01:07.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:08.000] Explicitly included types: []
TI:: [00:01:09.000] Inferred typings from unresolved imports: ["commander"]
TI:: [00:01:10.000] Result: {"cachedTypingPaths":[],"newTypingNames":["commander"],"filesToWatch":["/user/username/projects/a/b/bower_components","/user/username/projects/a/b/node_modules"]}
TI:: [00:01:11.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["commander"],"filesToWatch":["/user/username/projects/a/b/bower_components","/user/username/projects/a/b/node_modules"]}
TI:: [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/bower_components
TI:: [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules
TI:: [00:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:18.000] Installing typings ["commander"]
TI:: [00:01:19.000] Npm config file: /user/username/projects/a/cache/package.json
TI:: [00:01:20.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/dev/null/inferredProject1*"}
TI:: [00:01:21.000] #1 with arguments'["@types/commander@tsFakeMajor.Minor"]'.
Info 23   [00:01:22.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:01:23.000] 	Files (2)

Info 23   [00:01:24.000] -----------------------------------------------
Info 23   [00:01:25.000] Open files: 
Info 23   [00:01:26.000] 	FileName: /user/username/projects/a/b/app.js ProjectRootPath: undefined
Info 23   [00:01:27.000] 		Projects: /dev/null/inferredProject1*
TI:: [00:01:28.000] #1 with arguments'["@types/commander@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

PolledWatches::
/user/username/projects/a/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/username/projects/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/a/b/bower_components: *new*
  {"pollingInterval":500}

FsWatchesRecursive::
/user/username/projects/node_modules:
  {}

TI:: After installWorker
//// [/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts]



TI:: [00:01:35.000] Installed typings ["@types/commander@tsFakeMajor.Minor"]
TI:: [00:01:36.000] Installed typing files ["/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts"]
TI:: [00:01:37.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":["/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts"],"unresolvedImports":["commander"],"kind":"action::set"}
Info 23   [00:01:38.000] Scheduled: /dev/null/inferredProject1*
Info 24   [00:01:39.000] Scheduled: *ensureProjectForOpenFiles*
TI:: [00:01:40.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/dev/null/inferredProject1*","packagesToInstall":["@types/commander@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before checking timeout queue length (2) and running

Info 25   [00:01:41.000] Running: /dev/null/inferredProject1*
Info 26   [00:01:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 27   [00:01:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/cache/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 28   [00:01:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/cache/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 29   [00:01:45.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:01:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:01:47.000] 	Files (2)
	/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts Text-1 ""
	/user/username/projects/a/b/app.js SVC-1-0 "\n                import * as commander from \"commander\";"


	../cache/node_modules/@types/commander/index.d.ts
	  Imported via "commander" from file 'app.js'
	  Root file specified for compilation
	app.js
	  Root file specified for compilation

Info 32   [00:01:48.000] -----------------------------------------------
TI:: [00:01:49.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts","/user/username/projects/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/a/b","cachePath":"/user/username/projects/a/cache","kind":"discover"}
TI:: [00:01:50.000] Request specifies cache path '/user/username/projects/a/cache', loading cached information...
TI:: [00:01:51.000] Processing cache location '/user/username/projects/a/cache'
TI:: [00:01:52.000] Cache location was already processed...
TI:: [00:01:53.000] Explicitly included types: []
TI:: [00:01:54.000] Inferred typings from unresolved imports: []
TI:: [00:01:55.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/a/b/bower_components","/user/username/projects/a/b/node_modules"]}
TI:: [00:01:56.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/a/b/bower_components","/user/username/projects/a/b/node_modules"]}
TI:: [00:01:57.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
Info 33   [00:01:58.000] Scheduled: /dev/null/inferredProject1*
Info 34   [00:01:59.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
TI:: [00:02:00.000] No new typings were requested as a result of typings discovery
After checking timeout queue length (2) and running

PolledWatches::
/user/username/projects/a/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/a/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/username/projects/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/a/b/bower_components:
  {"pollingInterval":500}

FsWatchesRecursive::
/user/username/projects/node_modules:
  {}
/user/username/projects/a/cache/node_modules: *new*
  {}
