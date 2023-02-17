TI:: [00:00:09.000] Global cache location '/tmp', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:10.000] Processing cache location '/tmp'
TI:: [00:00:11.000] Trying to find '/tmp/package.json'...
TI:: [00:00:12.000] Finished processing cache location '/tmp'
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]

                import * as a from "foo/a/a";
                import * as b from "foo/a/b";
                import * as c from "foo/a/c";
                import * as d from "@bar/router/";
                import * as e from "@bar/common/shared";
                import * as e from "@bar/common/apps";
                import * as f from "./lib"
                


Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/app.js :: No config files found.
Info 3    [00:00:16.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/lib 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 5    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/lib 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 6    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 7    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 8    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 9    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 10   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 11   [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 13   [00:00:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:00:28.000] 	Files (1)
	/a/b/app.js


	app.js
	  Root file specified for compilation

Info 16   [00:00:29.000] -----------------------------------------------
TI:: [00:00:30.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":["@bar/common","@bar/router","foo"],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:00:31.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:00:32.000] Processing cache location '/tmp'
TI:: [00:00:33.000] Cache location was already processed...
TI:: [00:00:34.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:35.000] Explicitly included types: []
TI:: [00:00:36.000] Inferred typings from unresolved imports: ["@bar/common","@bar/router","foo"]
TI:: [00:00:37.000] Result: {"cachedTypingPaths":[],"newTypingNames":["@bar/common","@bar/router","foo"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:38.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["@bar/common","@bar/router","foo"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:45.000] Installing typings ["@bar/common","@bar/router","foo"]
TI:: [00:00:46.000] '@bar/common':: Entry for package 'bar__common' does not exist in local types registry - skipping...
TI:: [00:00:47.000] '@bar/router':: Entry for package 'bar__router' does not exist in local types registry - skipping...
TI:: [00:00:48.000] Npm config file: /tmp/package.json
TI:: [00:00:49.000] Npm config file: '/tmp/package.json' is missing, creating new one...
TI:: [00:00:54.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/dev/null/inferredProject1*"}
TI:: [00:00:55.000] #1 with arguments'["@types/foo@tsFakeMajor.Minor"]'.
Info 17   [00:00:56.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 17   [00:00:57.000] 	Files (1)

Info 17   [00:00:58.000] -----------------------------------------------
Info 17   [00:00:59.000] Open files: 
Info 17   [00:01:00.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 17   [00:01:01.000] 		Projects: /dev/null/inferredProject1*
Info 17   [00:01:02.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 18   [00:01:03.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: false structureIsReused:: Not Elapsed:: *ms
TI:: [00:01:04.000] #1 with arguments'["@types/foo@tsFakeMajor.Minor"]':: true
TI:: Before installWorker
//// [/tmp/package.json]
{ "private": true }


PolledWatches::
/a/b/lib: *new*
  {"pollingInterval":500}
/a/b/node_modules: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}

FsWatches::
/a/b: *new*
  {}

TI:: After installWorker

TI:: [00:01:05.000] Installed typings ["@types/foo@tsFakeMajor.Minor"]
TI:: [00:01:06.000] Installed typing files []
TI:: [00:01:07.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":["@bar/common","@bar/router","foo"],"kind":"action::set"}
TI:: [00:01:08.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/dev/null/inferredProject1*","packagesToInstall":["@types/foo@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}