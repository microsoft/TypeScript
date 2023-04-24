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


Info seq  [hh:mm:ss:mss] Excluded '/a/b/lodash.js' because it matched lodash from the legacy safelist
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/file2.jsx 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/file3.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/b/file2.jsx Text-1 ""
	/a/b/file3.d.ts Text-1 ""


	../b/file2.jsx
	  Root file specified for compilation
	../b/file3.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file2.jsx: *new*
  {}
/a/b/file3.d.ts: *new*
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


TI:: [hh:mm:ss:mss] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/file2.jsx","/a/b/file3.d.ts","/a/b/lodash.js"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["lodash"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [hh:mm:ss:mss] Request specifies cache path '/a/data', loading cached information...
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Cache location was already processed...
TI:: [hh:mm:ss:mss] Loaded safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: ["lodash"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["lodash"]
TI:: [hh:mm:ss:mss] Inferred 'react' typings due to presence of '.jsx' extension
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Result: {"cachedTypingPaths":[],"newTypingNames":["lodash","react"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [hh:mm:ss:mss] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["lodash","react"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules
TI:: [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [hh:mm:ss:mss] Installing typings ["lodash","react"]
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/a/app/test.csproj"}
TI:: [hh:mm:ss:mss] #1 with arguments'["@types/lodash@tsFakeMajor.Minor","@types/react@tsFakeMajor.Minor"]'.
TI:: [hh:mm:ss:mss] #1 with arguments'["@types/lodash@tsFakeMajor.Minor","@types/react@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

PolledWatches::
/a/lib/lib.d.ts:
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


TI:: [hh:mm:ss:mss] Installed typings ["@types/lodash@tsFakeMajor.Minor","@types/react@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"include":["lodash"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
Info seq  [hh:mm:ss:mss] Scheduled: /a/app/test.csproj
TI:: [hh:mm:ss:mss] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/a/app/test.csproj","packagesToInstall":["@types/lodash@tsFakeMajor.Minor","@types/react@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before running Timeout callback:: count: 1
1: /a/app/test.csproj

Info seq  [hh:mm:ss:mss] Running: /a/app/test.csproj
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app/test.csproj
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (4)
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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/file2.jsx","/a/b/file3.d.ts","/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts","/a/b/lodash.js"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":["lodash"],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [hh:mm:ss:mss] Request specifies cache path '/a/data', loading cached information...
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Cache location was already processed...
TI:: [hh:mm:ss:mss] Explicitly included types: ["lodash"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["lodash"]
TI:: [hh:mm:ss:mss] Inferred 'react' typings due to presence of '.jsx' extension
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Result: {"cachedTypingPaths":["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [hh:mm:ss:mss] Finished typings discovery: {"cachedTypingPaths":["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [hh:mm:ss:mss] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"include":["lodash"],"exclude":[],"enable":true},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"],"unresolvedImports":[],"kind":"action::set"}
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
After running Timeout callback:: count: 0
