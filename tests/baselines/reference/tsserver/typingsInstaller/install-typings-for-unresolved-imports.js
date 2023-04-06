currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]

                import * as fs from "fs";
                import * as commander from "commander";
                import * as component from "@ember/component";


Info 1    [00:00:10.000] Search path: /a/b
Info 2    [00:00:11.000] For info: /a/b/app.js :: No config files found.
Info 3    [00:00:12.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:13.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 5    [00:00:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 6    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:18.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:20.000] 	Files (1)
	/a/b/app.js SVC-1-0 "\n                import * as fs from \"fs\";\n                import * as commander from \"commander\";\n                import * as component from \"@ember/component\";"


	app.js
	  Root file specified for compilation

Info 12   [00:00:21.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/b/node_modules: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

TI:: [00:00:22.000] Global cache location '/a/cache', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:23.000] Processing cache location '/a/cache'
TI:: [00:00:24.000] Trying to find '/a/cache/package.json'...
TI:: [00:00:25.000] Finished processing cache location '/a/cache'
TI:: [00:00:26.000] Npm config file: /a/cache/package.json
TI:: [00:00:27.000] Npm config file: '/a/cache/package.json' is missing, creating new one...
TI:: [00:00:32.000] Updating types-registry npm package...
TI:: [00:00:33.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:40.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/cache/package.json]
{ "private": true }

//// [/a/cache/node_modules/types-registry/index.json]
{
 "entries": {
  "node": {
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


TI:: [00:00:41.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":["@ember/component","commander","fs"],"projectRootPath":"/a/b","cachePath":"/a/cache","kind":"discover"}
TI:: [00:00:42.000] Request specifies cache path '/a/cache', loading cached information...
TI:: [00:00:43.000] Processing cache location '/a/cache'
TI:: [00:00:44.000] Cache location was already processed...
TI:: [00:00:45.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:46.000] Explicitly included types: []
TI:: [00:00:47.000] Inferred typings from unresolved imports: ["@ember/component","commander","node"]
TI:: [00:00:48.000] Result: {"cachedTypingPaths":[],"newTypingNames":["@ember/component","commander","node"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:49.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["@ember/component","commander","node"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:56.000] Installing typings ["@ember/component","commander","node"]
TI:: [00:00:57.000] '@ember/component':: Entry for package 'ember__component' does not exist in local types registry - skipping...
TI:: [00:00:58.000] Npm config file: /a/cache/package.json
TI:: [00:00:59.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/dev/null/inferredProject1*"}
TI:: [00:01:00.000] #1 with arguments'["@types/commander@tsFakeMajor.Minor","@types/node@tsFakeMajor.Minor"]'.
Info 13   [00:01:01.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:01:02.000] 	Files (1)

Info 13   [00:01:03.000] -----------------------------------------------
Info 13   [00:01:04.000] Open files: 
Info 13   [00:01:05.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 13   [00:01:06.000] 		Projects: /dev/null/inferredProject1*
TI:: [00:01:07.000] #1 with arguments'["@types/commander@tsFakeMajor.Minor","@types/node@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

PolledWatches::
/a/b/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}

TI:: After installWorker
//// [/a/cache/node_modules/@types/node/index.d.ts]
export let x: number

//// [/a/cache/node_modules/@types/commander/index.d.ts]
export let y: string

//// [/a/cache/node_modules/@types/ember__component/index.d.ts]
export let x: number


TI:: [00:01:22.000] Installed typings ["@types/commander@tsFakeMajor.Minor","@types/node@tsFakeMajor.Minor"]
TI:: [00:01:23.000] Installed typing files ["/a/cache/node_modules/@types/commander/index.d.ts","/a/cache/node_modules/@types/node/index.d.ts"]
TI:: [00:01:24.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":["/a/cache/node_modules/@types/commander/index.d.ts","/a/cache/node_modules/@types/node/index.d.ts"],"unresolvedImports":["@ember/component","commander","fs"],"kind":"action::set"}
Info 13   [00:01:25.000] Scheduled: /dev/null/inferredProject1*
Info 14   [00:01:26.000] Scheduled: *ensureProjectForOpenFiles*
TI:: [00:01:27.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/dev/null/inferredProject1*","packagesToInstall":["@types/commander@tsFakeMajor.Minor","@types/node@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before running Timeout callback:: count: 2
1: /dev/null/inferredProject1*
2: *ensureProjectForOpenFiles*

Info 15   [00:01:28.000] Running: /dev/null/inferredProject1*
Info 16   [00:01:29.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 17   [00:01:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:01:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 19   [00:01:32.000] 	Files (4)
	/a/cache/node_modules/@types/node/index.d.ts Text-1 "export let x: number"
	/a/cache/node_modules/@types/commander/index.d.ts Text-1 "export let y: string"
	/a/cache/node_modules/@types/ember__component/index.d.ts Text-1 "export let x: number"
	/a/b/app.js SVC-1-0 "\n                import * as fs from \"fs\";\n                import * as commander from \"commander\";\n                import * as component from \"@ember/component\";"


	../cache/node_modules/@types/node/index.d.ts
	  Imported via "fs" from file 'app.js'
	  Root file specified for compilation
	../cache/node_modules/@types/commander/index.d.ts
	  Imported via "commander" from file 'app.js'
	  Root file specified for compilation
	../cache/node_modules/@types/ember__component/index.d.ts
	  Imported via "@ember/component" from file 'app.js'
	app.js
	  Root file specified for compilation

Info 20   [00:01:33.000] -----------------------------------------------
TI:: [00:01:34.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/cache/node_modules/@types/node/index.d.ts","/a/cache/node_modules/@types/commander/index.d.ts","/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/cache","kind":"discover"}
TI:: [00:01:35.000] Request specifies cache path '/a/cache', loading cached information...
TI:: [00:01:36.000] Processing cache location '/a/cache'
TI:: [00:01:37.000] Cache location was already processed...
TI:: [00:01:38.000] Explicitly included types: []
TI:: [00:01:39.000] Inferred typings from unresolved imports: []
TI:: [00:01:40.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:41.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:42.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
Info 21   [00:01:43.000] Scheduled: /dev/null/inferredProject1*
Info 22   [00:01:44.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
TI:: [00:01:45.000] No new typings were requested as a result of typings discovery
After running Timeout callback:: count: 2
3: /dev/null/inferredProject1*
4: *ensureProjectForOpenFiles*
