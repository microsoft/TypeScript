TI:: [00:00:09.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:10.000] Processing cache location '/a/data/'
TI:: [00:00:11.000] Trying to find '/a/data/package.json'...
TI:: [00:00:12.000] Finished processing cache location '/a/data/'
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/jsconfig.json]
{"compilerOptions":{"checkJs":true,"skipLibCheck":true}}

//// [/a/jsFile.js]
let x = 1;
                x === "string";


Info 2    [00:00:15.000] Search path: /a
Info 3    [00:00:16.000] For info: /a/jsFile.js :: Config file name: /a/jsconfig.json
Info 4    [00:00:17.000] Creating configuration project /a/jsconfig.json
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info 6    [00:00:19.000] Config: /a/jsconfig.json : {
 "rootNames": [
  "/a/jsFile.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "checkJs": true,
  "configFilePath": "/a/jsconfig.json"
 }
}
Info 7    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 9    [00:00:22.000] Starting updateGraphWorker: Project: /a/jsconfig.json
Info 10   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/jsconfig.json WatchType: Missing file
Info 11   [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/jsconfig.json WatchType: Type roots
Info 12   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/jsconfig.json WatchType: Type roots
Info 13   [00:00:26.000] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:27.000] Project '/a/jsconfig.json' (Configured)
Info 15   [00:00:28.000] 	Files (1)
	/a/jsFile.js


	jsFile.js
	  Matched by default include pattern '**/*'

Info 16   [00:00:29.000] -----------------------------------------------
TI:: [00:00:30.000] Got install request {"projectName":"/a/jsconfig.json","fileNames":["/a/jsFile.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"checkJs":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:31.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:32.000] Processing cache location '/a/data/'
TI:: [00:00:33.000] Cache location was already processed...
TI:: [00:00:34.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:35.000] Explicitly included types: []
TI:: [00:00:36.000] Inferred typings from unresolved imports: []
TI:: [00:00:37.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:00:38.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components
TI:: [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules
TI:: [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:00:45.000] Sending response:
    {"projectName":"/a/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"checkJs":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:00:46.000] No new typings were requested as a result of typings discovery
Info 17   [00:00:47.000] Project '/a/jsconfig.json' (Configured)
Info 17   [00:00:48.000] 	Files (1)

Info 17   [00:00:49.000] -----------------------------------------------
Info 17   [00:00:50.000] Open files: 
Info 17   [00:00:51.000] 	FileName: /a/jsFile.js ProjectRootPath: undefined
Info 17   [00:00:52.000] 		Projects: /a/jsconfig.json
After request

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
/a/jsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Info 17   [00:00:53.000] response:
    {
      "responseRequired": false
    }
Info 18   [00:00:54.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request

Info 19   [00:00:55.000] response:
    {
      "response": [
        {
          "start": {
            "line": 2,
            "offset": 17
          },
          "end": {
            "line": 2,
            "offset": 31
          },
          "text": "This comparison appears to be unintentional because the types 'number' and 'string' have no overlap.",
          "code": 2367,
          "category": "error"
        }
      ],
      "responseRequired": true
    }