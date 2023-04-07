currentDirectory:: / useCaseSensitiveFileNames: false
Creating project service
//// [/a/b/lodash.js]


//// [/a/b/commander.js]


//// [/a/b/file3.d.ts]


//// [/a/b/package.json]
{"name":"test","dependencies":{"express":"^3.1.0"}}

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


Info 0    [00:00:17.000] Excluded '/a/b/lodash.js' because it matched lodash from the legacy safelist
Info 1    [00:00:18.000] Excluded '/a/b/commander.js' because it matched commander from the legacy safelist
Info 2    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/b/file3.d.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:20.000] Starting updateGraphWorker: Project: /a/app/test.csproj
Info 4    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info 5    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 6    [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 7    [00:00:24.000] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:25.000] Project '/a/app/test.csproj' (External)
Info 9    [00:00:26.000] 	Files (1)
	/a/b/file3.d.ts Text-1 ""


	../b/file3.d.ts
	  Root file specified for compilation

Info 10   [00:00:27.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/app/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file3.d.ts: *new*
  {}

TI:: [00:00:28.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:29.000] Processing cache location '/a/data'
TI:: [00:00:30.000] Trying to find '/a/data/package.json'...
TI:: [00:00:31.000] Finished processing cache location '/a/data'
TI:: [00:00:32.000] Npm config file: /a/data/package.json
TI:: [00:00:33.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:38.000] Updating types-registry npm package...
TI:: [00:00:39.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:46.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
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
  },
  "express": {
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
  },
  "moment": {
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
  "lodash": {
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


TI:: [00:00:47.000] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/file3.d.ts","/a/b/lodash.js","/a/b/commander.js"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["jquery","moment","lodash","commander"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:00:48.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:00:49.000] Processing cache location '/a/data'
TI:: [00:00:50.000] Cache location was already processed...
TI:: [00:00:51.000] Loaded safelist from types map file '/typesMap.json'
TI:: [00:00:52.000] Explicitly included types: ["jquery","moment","lodash","commander"]
TI:: [00:00:53.000] Typing names in '/a/b/package.json' dependencies: ["express"]
TI:: [00:00:54.000] Inferred typings from file names: ["lodash","commander"]
TI:: [00:00:55.000] Inferred typings from unresolved imports: []
TI:: [00:00:56.000] Result: {"cachedTypingPaths":[],"newTypingNames":["jquery","moment","lodash","commander","express"],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:57.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["jquery","moment","lodash","commander","express"],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:01.000] FileWatcher:: Added:: WatchInfo: /a/b/package.json
TI:: [00:01:02.000] FileWatcher:: Added:: WatchInfo: /a/b/package.json 2000 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components
TI:: [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:09.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules
TI:: [00:01:10.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:12.000] Installing typings ["jquery","moment","lodash","commander","express"]
TI:: [00:01:13.000] Npm config file: /a/data/package.json
TI:: [00:01:14.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/a/app/test.csproj"}
TI:: [00:01:15.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor","@types/moment@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor","@types/express@tsFakeMajor.Minor"]'.
TI:: [00:01:16.000] #1 with arguments'["@types/jquery@tsFakeMajor.Minor","@types/moment@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor","@types/express@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/app/node_modules/@types:
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
/a/b/file3.d.ts:
  {}
/a/b/package.json: *new*
  {}

TI:: After installWorker
//// [/a/data/node_modules/@types/commander/index.d.ts]
declare const commander: { x: number }

//// [/a/data/node_modules/@types/express/index.d.ts]
declare const express: { x: number }

//// [/a/data/node_modules/@types/jquery/index.d.ts]
declare const jquery: { x: number }

//// [/a/data/node_modules/@types/moment/index.d.ts]
declare const moment: { x: number }

//// [/a/data/node_modules/@types/lodash/index.d.ts]
declare const lodash: { x: number }


TI:: [00:01:39.000] Installed typings ["@types/jquery@tsFakeMajor.Minor","@types/moment@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor","@types/express@tsFakeMajor.Minor"]
TI:: [00:01:40.000] Installed typing files ["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/moment/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts","/a/data/node_modules/@types/express/index.d.ts"]
TI:: [00:01:41.000] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"include":["jquery","moment","lodash","commander"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/moment/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts","/a/data/node_modules/@types/express/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info 11   [00:01:42.000] Scheduled: /a/app/test.csproj
TI:: [00:01:43.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/a/app/test.csproj","packagesToInstall":["@types/jquery@tsFakeMajor.Minor","@types/moment@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor","@types/express@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before running Timeout callback:: count: 1
1: /a/app/test.csproj

Info 12   [00:01:44.000] Running: /a/app/test.csproj
Info 13   [00:01:45.000] Starting updateGraphWorker: Project: /a/app/test.csproj
Info 14   [00:01:46.000] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:01:47.000] Project '/a/app/test.csproj' (External)
Info 16   [00:01:48.000] 	Files (6)
	/a/b/file3.d.ts Text-1 ""
	/a/data/node_modules/@types/commander/index.d.ts Text-1 "declare const commander: { x: number }"
	/a/data/node_modules/@types/express/index.d.ts Text-1 "declare const express: { x: number }"
	/a/data/node_modules/@types/jquery/index.d.ts Text-1 "declare const jquery: { x: number }"
	/a/data/node_modules/@types/lodash/index.d.ts Text-1 "declare const lodash: { x: number }"
	/a/data/node_modules/@types/moment/index.d.ts Text-1 "declare const moment: { x: number }"


	../b/file3.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/commander/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/express/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/jquery/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/lodash/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/moment/index.d.ts
	  Root file specified for compilation

Info 17   [00:01:49.000] -----------------------------------------------
TI:: [00:01:50.000] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/file3.d.ts","/a/data/node_modules/@types/commander/index.d.ts","/a/data/node_modules/@types/express/index.d.ts","/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/moment/index.d.ts","/a/b/lodash.js","/a/b/commander.js"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["jquery","moment","lodash","commander"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:01:51.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:01:52.000] Processing cache location '/a/data'
TI:: [00:01:53.000] Cache location was already processed...
TI:: [00:01:54.000] Explicitly included types: ["jquery","moment","lodash","commander"]
TI:: [00:01:55.000] Typing names in '/a/b/package.json' dependencies: ["express"]
TI:: [00:01:56.000] Inferred typings from file names: ["lodash","commander"]
TI:: [00:01:57.000] Inferred typings from unresolved imports: []
TI:: [00:01:58.000] Result: {"cachedTypingPaths":["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/moment/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts","/a/data/node_modules/@types/express/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:01:59.000] Finished typings discovery: {"cachedTypingPaths":["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/moment/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts","/a/data/node_modules/@types/express/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:02:00.000] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"include":["jquery","moment","lodash","commander"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/moment/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts","/a/data/node_modules/@types/express/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:01.000] No new typings were requested as a result of typings discovery
After running Timeout callback:: count: 0
