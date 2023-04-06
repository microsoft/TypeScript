currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/node_modules/@angular/forms/forms.d.ts]
export declare class PatternValidator {}

//// [/node_modules/@angular/forms/package.json]
{ "name": "@angular/forms", "typings": "./forms.d.ts" }

//// [/tsconfig.json]
{ "compilerOptions": { "module": "commonjs" } }

//// [/package.json]
{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }

//// [/index.ts]



Info 1    [00:00:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/node_modules/@angular/forms/forms.d.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:21.000] Search path: /node_modules/@angular/forms
Info 3    [00:00:22.000] For info: /node_modules/@angular/forms/forms.d.ts :: No config files found.
Info 4    [00:00:23.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:27.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:28.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:29.000] 	Files (1)
	/node_modules/@angular/forms/forms.d.ts SVC-1-0 "export declare class PatternValidator {}"


	forms.d.ts
	  Root file specified for compilation

Info 11   [00:00:30.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@angular/forms/node_modules/@types: *new*
  {"pollingInterval":500}

TI:: [00:00:31.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:32.000] Processing cache location '/a/data/'
TI:: [00:00:33.000] Trying to find '/a/data/package.json'...
TI:: [00:00:34.000] Finished processing cache location '/a/data/'
TI:: [00:00:35.000] Npm config file: /a/data/package.json
TI:: [00:00:36.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:43.000] Updating types-registry npm package...
TI:: [00:00:44.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:51.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:52.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/node_modules/@angular/forms/forms.d.ts"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/node_modules/@angular/forms","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:53.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:54.000] Processing cache location '/a/data/'
TI:: [00:00:55.000] Cache location was already processed...
TI:: [00:00:56.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:57.000] Explicitly included types: []
TI:: [00:00:58.000] Typing names in '/node_modules/@angular/forms/package.json' dependencies: []
TI:: [00:00:59.000] Inferred typings from unresolved imports: []
TI:: [00:01:00.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/node_modules/@angular/forms/bower_components","/node_modules/@angular/forms/package.json","/node_modules/@angular/forms/node_modules"]}
TI:: [00:01:01.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/node_modules/@angular/forms/bower_components","/node_modules/@angular/forms/package.json","/node_modules/@angular/forms/node_modules"]}
TI:: [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/bower_components
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:05.000] FileWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/package.json
TI:: [00:01:06.000] FileWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/package.json 2000 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/node_modules
TI:: [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:10.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:11.000] No new typings were requested as a result of typings discovery
Info 12   [00:01:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:01:13.000] 	Files (1)

Info 12   [00:01:14.000] -----------------------------------------------
Info 12   [00:01:15.000] Open files: 
Info 12   [00:01:16.000] 	FileName: /node_modules/@angular/forms/forms.d.ts ProjectRootPath: undefined
Info 12   [00:01:17.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:01:18.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/node_modules/@angular/forms/node_modules/@types:
  {"pollingInterval":500}
/node_modules/@angular/forms/bower_components: *new*
  {"pollingInterval":500}
/node_modules/@angular/forms/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/node_modules/@angular/forms/package.json: *new*
  {}

Default Project for /node_modules/@angular/forms/forms.d.ts:: /dev/null/inferredProject1*
Before request

Info 13   [00:01:19.000] request:
    {
      "command": "applyChangedToOpenFiles",
      "arguments": {
        "openFiles": [
          {
            "fileName": "/index.ts",
            "content": "import '@angular/forms'"
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:01:20.000] Search path: /
Info 15   [00:01:21.000] For info: /index.ts :: Config file name: /tsconfig.json
Info 16   [00:01:22.000] Creating configuration project /tsconfig.json
Info 17   [00:01:23.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 18   [00:01:24.000] Config: /tsconfig.json : {
 "rootNames": [
  "/index.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/tsconfig.json"
 }
}
Info 19   [00:01:25.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 20   [00:01:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 21   [00:01:27.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 22   [00:01:28.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 23   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 24   [00:01:30.000] FileWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/package.json 2000 undefined Project: /tsconfig.json WatchType: File location affecting resolution
Info 25   [00:01:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 26   [00:01:32.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 27   [00:01:33.000] Project '/tsconfig.json' (Configured)
Info 28   [00:01:34.000] 	Files (2)
	/node_modules/@angular/forms/forms.d.ts SVC-1-0 "export declare class PatternValidator {}"
	/index.ts SVC-1-0 "import '@angular/forms'"


	node_modules/@angular/forms/forms.d.ts
	  Imported via '@angular/forms' from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 29   [00:01:35.000] -----------------------------------------------
Info 30   [00:01:36.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 31   [00:01:37.000] Project '/tsconfig.json' (Configured)
Info 31   [00:01:38.000] 	Files (2)

Info 31   [00:01:39.000] -----------------------------------------------
Info 31   [00:01:40.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:01:41.000] 	Files (1)

Info 31   [00:01:42.000] -----------------------------------------------
Info 31   [00:01:43.000] Open files: 
Info 31   [00:01:44.000] 	FileName: /node_modules/@angular/forms/forms.d.ts ProjectRootPath: undefined
Info 31   [00:01:45.000] 		Projects: /dev/null/inferredProject1*,/tsconfig.json
Info 31   [00:01:46.000] 	FileName: /index.ts ProjectRootPath: undefined
Info 31   [00:01:47.000] 		Projects: /tsconfig.json
Info 31   [00:01:48.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/node_modules/@angular/forms/node_modules/@types:
  {"pollingInterval":500}
/node_modules/@angular/forms/bower_components:
  {"pollingInterval":500}
/node_modules/@angular/forms/node_modules:
  {"pollingInterval":500}

FsWatches::
/node_modules/@angular/forms/package.json:
  {}
/tsconfig.json: *new*
  {}
/package.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}
/node_modules: *new*
  {}

Default Project for /node_modules/@angular/forms/forms.d.ts:: /tsconfig.json