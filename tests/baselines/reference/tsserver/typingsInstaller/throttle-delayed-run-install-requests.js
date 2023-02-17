TI:: [00:00:15.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:16.000] Processing cache location '/a/data'
TI:: [00:00:17.000] Trying to find '/a/data/package.json'...
TI:: [00:00:18.000] Finished processing cache location '/a/data'
Creating project service
//// [/a/b/lodash.js]


//// [/a/b/commander.js]


//// [/a/b/file3.d.ts]


//// [/typesMap.json]
{
            "typesMap": {
                "jquery": {
                    "match": "jquery(-(\\.?\\d+)+)?(\\.intellisense)?(\\.min)?\\.js$",
                    "types": ["jquery"]
                },
                "quack": {
                    "match": "/duckquack-(\\d+)\\.min\\.js",
                    "types": ["duck-types"]
                }
            },
            "simpleMap": {
                "Bacon": "baconjs",
                "bliss": "blissfuljs",
                "commander": "commander",
                "cordova": "cordova",
                "react": "react",
                "lodash": "lodash"
            }
        }


Info 0    [00:00:19.000] Excluded '/a/b/lodash.js' because it matched lodash from the legacy safelist
Info 1    [00:00:20.000] Excluded '/a/b/commander.js' because it matched commander from the legacy safelist
Info 2    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/file3.d.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:22.000] Starting updateGraphWorker: Project: /a/app/test1.csproj
Info 4    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test1.csproj WatchType: Missing file
Info 5    [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test1.csproj WatchType: Type roots
Info 6    [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test1.csproj WatchType: Type roots
Info 7    [00:00:26.000] Finishing updateGraphWorker: Project: /a/app/test1.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:27.000] Project '/a/app/test1.csproj' (External)
Info 9    [00:00:28.000] 	Files (1)
	/a/b/file3.d.ts


	../b/file3.d.ts
	  Root file specified for compilation

Info 10   [00:00:29.000] -----------------------------------------------
TI:: [00:00:30.000] Got install request {"projectName":"/a/app/test1.csproj","fileNames":["/a/b/file3.d.ts","/a/b/lodash.js","/a/b/commander.js"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["jquery","cordova","lodash","commander"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:00:31.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:00:32.000] Processing cache location '/a/data'
TI:: [00:00:33.000] Cache location was already processed...
TI:: [00:00:34.000] Loaded safelist from types map file '/typesMap.json'
TI:: [00:00:35.000] Explicitly included types: ["jquery","cordova","lodash","commander"]
TI:: [00:00:36.000] Inferred typings from file names: ["lodash","commander"]
TI:: [00:00:37.000] Inferred typings from unresolved imports: []
TI:: [00:00:38.000] Result: {"cachedTypingPaths":[],"newTypingNames":["jquery","cordova","lodash","commander"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:39.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["jquery","cordova","lodash","commander"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test1.csproj watcher already invoked: false
TI:: [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test1.csproj watcher already invoked: false
TI:: [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test1.csproj watcher already invoked: false
TI:: [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test1.csproj watcher already invoked: false
TI:: [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components
TI:: [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test1.csproj watcher already invoked: false
TI:: [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test1.csproj watcher already invoked: false
TI:: [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules
TI:: [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test1.csproj watcher already invoked: false
TI:: [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test1.csproj watcher already invoked: false
TI:: [00:00:52.000] Installing typings ["jquery","cordova","lodash","commander"]
TI:: [00:00:53.000] Npm config file: /a/data/package.json
TI:: [00:00:54.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:59.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/a/app/test1.csproj"}
TI:: [00:01:00.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor","@types/cordova@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor"]'.
Info 11   [00:01:01.000] Starting updateGraphWorker: Project: /a/app/test2.csproj
Info 12   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test2.csproj WatchType: Missing file
Info 13   [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test2.csproj WatchType: Type roots
Info 14   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test2.csproj WatchType: Type roots
Info 15   [00:01:05.000] Finishing updateGraphWorker: Project: /a/app/test2.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:01:06.000] Project '/a/app/test2.csproj' (External)
Info 17   [00:01:07.000] 	Files (1)
	/a/b/file3.d.ts


	../b/file3.d.ts
	  Root file specified for compilation

Info 18   [00:01:08.000] -----------------------------------------------
TI:: [00:01:09.000] Got install request {"projectName":"/a/app/test2.csproj","fileNames":["/a/b/file3.d.ts"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["grunt","gulp"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:01:10.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:01:11.000] Processing cache location '/a/data'
TI:: [00:01:12.000] Cache location was already processed...
TI:: [00:01:13.000] Explicitly included types: ["grunt","gulp"]
TI:: [00:01:14.000] Inferred typings from unresolved imports: []
TI:: [00:01:15.000] Result: {"cachedTypingPaths":[],"newTypingNames":["grunt","gulp"],"filesToWatch":["/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:01:16.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["grunt","gulp"],"filesToWatch":["/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components
TI:: [00:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test2.csproj watcher already invoked: false
TI:: [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test2.csproj watcher already invoked: false
TI:: [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules
TI:: [00:01:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test2.csproj watcher already invoked: false
TI:: [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test2.csproj watcher already invoked: false
TI:: [00:01:23.000] Installing typings ["grunt","gulp"]
TI:: [00:01:24.000] Npm config file: /a/data/package.json
TI:: [00:01:25.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":2,"typingsInstallerVersion":"FakeVersion","projectName":"/a/app/test2.csproj"}
TI:: [00:01:26.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor","@types/cordova@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor"]':: true
TI:: Before installWorker
//// [/a/data/package.json]
{ "private": true }


PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/app/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}
/a/b/node_modules: *new*
  {"pollingInterval":500}
/a/app/bower_components: *new*
  {"pollingInterval":500}
/a/app/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file3.d.ts: *new*
  {}

TI:: After installWorker
//// [/a/data/node_modules/@types/commander/index.d.ts]
declare const commander: { x: number }

//// [/a/data/node_modules/@types/jquery/index.d.ts]
declare const jquery: { x: number }

//// [/a/data/node_modules/@types/lodash/index.d.ts]
declare const lodash: { x: number }

//// [/a/data/node_modules/@types/cordova/index.d.ts]
declare const cordova: { x: number }


TI:: [00:01:47.000] Installed typings ["@types/jquery@tsFakeMajor.Minor","@types/cordova@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor"]
TI:: [00:01:48.000] Installed typing files ["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/cordova/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts"]
TI:: [00:01:49.000] Sending response:
    {"projectName":"/a/app/test1.csproj","typeAcquisition":{"include":["jquery","cordova","lodash","commander"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/cordova/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info 19   [00:01:50.000] Scheduled: /a/app/test1.csproj
TI:: [00:01:51.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/a/app/test1.csproj","packagesToInstall":["@types/jquery@tsFakeMajor.Minor","@types/cordova@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
TI:: [00:01:52.000] #2 with arguments'["@types/grunt@tsFakeMajor.Minor","@types/gulp@tsFakeMajor.Minor"]'.
TI:: [00:01:53.000] #2 with arguments'["@types/grunt@tsFakeMajor.Minor","@types/gulp@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

TI:: After installWorker
//// [/a/data/node_modules/@types/grunt/index.d.ts]
declare const grunt: { x: number }

//// [/a/data/node_modules/@types/gulp/index.d.ts]
declare const gulp: { x: number }


TI:: [00:02:02.000] Installed typings ["@types/grunt@tsFakeMajor.Minor","@types/gulp@tsFakeMajor.Minor"]
TI:: [00:02:03.000] Installed typing files ["/a/data/node_modules/@types/grunt/index.d.ts","/a/data/node_modules/@types/gulp/index.d.ts"]
TI:: [00:02:04.000] Sending response:
    {"projectName":"/a/app/test2.csproj","typeAcquisition":{"include":["grunt","gulp"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/grunt/index.d.ts","/a/data/node_modules/@types/gulp/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info 20   [00:02:05.000] Scheduled: /a/app/test2.csproj
TI:: [00:02:06.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":2,"projectName":"/a/app/test2.csproj","packagesToInstall":["@types/grunt@tsFakeMajor.Minor","@types/gulp@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before checking timeout queue length (2) and running

Info 21   [00:02:07.000] Running: /a/app/test1.csproj
Info 22   [00:02:08.000] Starting updateGraphWorker: Project: /a/app/test1.csproj
Info 23   [00:02:09.000] Finishing updateGraphWorker: Project: /a/app/test1.csproj Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:02:10.000] Project '/a/app/test1.csproj' (External)
Info 25   [00:02:11.000] 	Files (5)
	/a/b/file3.d.ts
	/a/data/node_modules/@types/commander/index.d.ts
	/a/data/node_modules/@types/cordova/index.d.ts
	/a/data/node_modules/@types/jquery/index.d.ts
	/a/data/node_modules/@types/lodash/index.d.ts


	../b/file3.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/commander/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/cordova/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/jquery/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/lodash/index.d.ts
	  Root file specified for compilation

Info 26   [00:02:12.000] -----------------------------------------------
TI:: [00:02:13.000] Got install request {"projectName":"/a/app/test1.csproj","fileNames":["/a/b/file3.d.ts","/a/data/node_modules/@types/commander/index.d.ts","/a/data/node_modules/@types/cordova/index.d.ts","/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/b/lodash.js","/a/b/commander.js"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["jquery","cordova","lodash","commander"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:02:14.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:02:15.000] Processing cache location '/a/data'
TI:: [00:02:16.000] Cache location was already processed...
TI:: [00:02:17.000] Explicitly included types: ["jquery","cordova","lodash","commander"]
TI:: [00:02:18.000] Inferred typings from file names: ["lodash","commander"]
TI:: [00:02:19.000] Inferred typings from unresolved imports: []
TI:: [00:02:20.000] Result: {"cachedTypingPaths":["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/cordova/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:02:21.000] Finished typings discovery: {"cachedTypingPaths":["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/cordova/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:02:22.000] Sending response:
    {"projectName":"/a/app/test1.csproj","typeAcquisition":{"include":["jquery","cordova","lodash","commander"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/cordova/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:23.000] No new typings were requested as a result of typings discovery
Info 27   [00:02:24.000] Running: /a/app/test2.csproj
Info 28   [00:02:25.000] Starting updateGraphWorker: Project: /a/app/test2.csproj
Info 29   [00:02:26.000] Finishing updateGraphWorker: Project: /a/app/test2.csproj Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:02:27.000] Project '/a/app/test2.csproj' (External)
Info 31   [00:02:28.000] 	Files (3)
	/a/b/file3.d.ts
	/a/data/node_modules/@types/grunt/index.d.ts
	/a/data/node_modules/@types/gulp/index.d.ts


	../b/file3.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/grunt/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/gulp/index.d.ts
	  Root file specified for compilation

Info 32   [00:02:29.000] -----------------------------------------------
TI:: [00:02:30.000] Got install request {"projectName":"/a/app/test2.csproj","fileNames":["/a/b/file3.d.ts","/a/data/node_modules/@types/grunt/index.d.ts","/a/data/node_modules/@types/gulp/index.d.ts"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["grunt","gulp"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:02:31.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:02:32.000] Processing cache location '/a/data'
TI:: [00:02:33.000] Cache location was already processed...
TI:: [00:02:34.000] Explicitly included types: ["grunt","gulp"]
TI:: [00:02:35.000] Inferred typings from unresolved imports: []
TI:: [00:02:36.000] Result: {"cachedTypingPaths":["/a/data/node_modules/@types/grunt/index.d.ts","/a/data/node_modules/@types/gulp/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:02:37.000] Finished typings discovery: {"cachedTypingPaths":["/a/data/node_modules/@types/grunt/index.d.ts","/a/data/node_modules/@types/gulp/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:02:38.000] Sending response:
    {"projectName":"/a/app/test2.csproj","typeAcquisition":{"include":["grunt","gulp"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/grunt/index.d.ts","/a/data/node_modules/@types/gulp/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:39.000] No new typings were requested as a result of typings discovery
After checking timeout queue length (2) and running
