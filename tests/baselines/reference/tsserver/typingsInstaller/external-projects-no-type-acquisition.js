currentDirectory:: / useCaseSensitiveFileNames: false
Creating project service
//// [/a/b/lodash.js]


//// [/a/b/file2.jsx]


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


Info 0    [00:00:15.000] Excluded '/a/b/lodash.js' because it matched lodash from the legacy safelist
Info 1    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.jsx 500 undefined WatchType: Closed Script info
Info 2    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/file3.d.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:18.000] Starting updateGraphWorker: Project: /a/app/test.csproj
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info 5    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 6    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 7    [00:00:22.000] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:23.000] Project '/a/app/test.csproj' (External)
Info 9    [00:00:24.000] 	Files (2)
	/a/b/file2.jsx Text-1 ""
	/a/b/file3.d.ts Text-1 ""


	../b/file2.jsx
	  Root file specified for compilation
	../b/file3.d.ts
	  Root file specified for compilation

Info 10   [00:00:25.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/app/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file2.jsx: *new*
  {}
/a/b/file3.d.ts: *new*
  {}

TI:: [00:00:26.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:27.000] Processing cache location '/a/data'
TI:: [00:00:28.000] Trying to find '/a/data/package.json'...
TI:: [00:00:29.000] Finished processing cache location '/a/data'
TI:: [00:00:30.000] Npm config file: /a/data/package.json
TI:: [00:00:31.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:36.000] Updating types-registry npm package...
TI:: [00:00:37.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:44.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {
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
  },
  "react": {
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


TI:: [00:00:45.000] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/file2.jsx","/a/b/file3.d.ts","/a/b/lodash.js"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["lodash"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:00:46.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:00:47.000] Processing cache location '/a/data'
TI:: [00:00:48.000] Cache location was already processed...
TI:: [00:00:49.000] Loaded safelist from types map file '/typesMap.json'
TI:: [00:00:50.000] Explicitly included types: ["lodash"]
TI:: [00:00:51.000] Inferred typings from file names: ["lodash"]
TI:: [00:00:52.000] Inferred 'react' typings due to presence of '.jsx' extension
TI:: [00:00:53.000] Inferred typings from unresolved imports: []
TI:: [00:00:54.000] Result: {"cachedTypingPaths":[],"newTypingNames":["lodash","react"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:55.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["lodash","react"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules
TI:: [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:08.000] Installing typings ["lodash","react"]
TI:: [00:01:09.000] Npm config file: /a/data/package.json
TI:: [00:01:10.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/a/app/test.csproj"}
TI:: [00:01:11.000] #1 with arguments'["@types/lodash@tsFakeMajor.Minor","@types/react@tsFakeMajor.Minor"]'.
TI:: [00:01:12.000] #1 with arguments'["@types/lodash@tsFakeMajor.Minor","@types/react@tsFakeMajor.Minor"]':: true
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
/a/b/file2.jsx:
  {}
/a/b/file3.d.ts:
  {}

TI:: After installWorker
//// [/a/data/node_modules/@types/lodash/index.d.ts]
declare const lodash: { x: number }

//// [/a/data/node_modules/@types/react/index.d.ts]
declare const react: { x: number }


TI:: [00:01:23.000] Installed typings ["@types/lodash@tsFakeMajor.Minor","@types/react@tsFakeMajor.Minor"]
TI:: [00:01:24.000] Installed typing files ["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"]
TI:: [00:01:25.000] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"include":["lodash"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info 11   [00:01:26.000] Scheduled: /a/app/test.csproj
TI:: [00:01:27.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/a/app/test.csproj","packagesToInstall":["@types/lodash@tsFakeMajor.Minor","@types/react@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before checking timeout queue length (1) and running

Info 12   [00:01:28.000] Running: /a/app/test.csproj
Info 13   [00:01:29.000] Starting updateGraphWorker: Project: /a/app/test.csproj
Info 14   [00:01:30.000] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:01:31.000] Project '/a/app/test.csproj' (External)
Info 16   [00:01:32.000] 	Files (4)
	/a/b/file2.jsx Text-1 ""
	/a/b/file3.d.ts Text-1 ""
	/a/data/node_modules/@types/lodash/index.d.ts Text-1 "declare const lodash: { x: number }"
	/a/data/node_modules/@types/react/index.d.ts Text-1 "declare const react: { x: number }"


	../b/file2.jsx
	  Root file specified for compilation
	../b/file3.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/lodash/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/react/index.d.ts
	  Root file specified for compilation

Info 17   [00:01:33.000] -----------------------------------------------
TI:: [00:01:34.000] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/file2.jsx","/a/b/file3.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts","/a/b/lodash.js"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["lodash"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:01:35.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:01:36.000] Processing cache location '/a/data'
TI:: [00:01:37.000] Cache location was already processed...
TI:: [00:01:38.000] Explicitly included types: ["lodash"]
TI:: [00:01:39.000] Inferred typings from file names: ["lodash"]
TI:: [00:01:40.000] Inferred 'react' typings due to presence of '.jsx' extension
TI:: [00:01:41.000] Inferred typings from unresolved imports: []
TI:: [00:01:42.000] Result: {"cachedTypingPaths":["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:01:43.000] Finished typings discovery: {"cachedTypingPaths":["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:01:44.000] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"include":["lodash"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:45.000] No new typings were requested as a result of typings discovery
After checking timeout queue length (1) and running
