Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/jsFile.js]

                // @ts-check
                let x = 1;
                x === "string";


Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:09.000] Search path: /a
Info 3    [00:00:10.000] For info: /a/jsFile.js :: No config files found.
Info 4    [00:00:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:13.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:17.000] 	Files (1)
	/a/jsFile.js SVC-1-0 "\n                // @ts-check\n                let x = 1;\n                x === \"string\";"


	jsFile.js
	  Root file specified for compilation

Info 11   [00:00:18.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

TI:: [00:00:19.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:20.000] Processing cache location '/a/data/'
TI:: [00:00:21.000] Trying to find '/a/data/package.json'...
TI:: [00:00:22.000] Finished processing cache location '/a/data/'
TI:: [00:00:23.000] Npm config file: /a/data/package.json
TI:: [00:00:24.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:29.000] Updating types-registry npm package...
TI:: [00:00:30.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:37.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:38.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/jsFile.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:39.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:40.000] Processing cache location '/a/data/'
TI:: [00:00:41.000] Cache location was already processed...
TI:: [00:00:42.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:43.000] Explicitly included types: []
TI:: [00:00:44.000] Inferred typings from unresolved imports: []
TI:: [00:00:45.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:00:46.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components
TI:: [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules
TI:: [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:53.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:00:54.000] No new typings were requested as a result of typings discovery
Info 12   [00:00:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:56.000] 	Files (1)

Info 12   [00:00:57.000] -----------------------------------------------
Info 12   [00:00:58.000] Open files: 
Info 12   [00:00:59.000] 	FileName: /a/jsFile.js ProjectRootPath: undefined
Info 12   [00:01:00.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:01:01.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components: *new*
  {"pollingInterval":500}
/a/node_modules: *new*
  {"pollingInterval":500}

Before request

Info 13   [00:01:02.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:01:03.000] response:
    {
      "response": [
        {
          "start": {
            "line": 4,
            "offset": 17
          },
          "end": {
            "line": 4,
            "offset": 31
          },
          "text": "This comparison appears to be unintentional because the types 'number' and 'string' have no overlap.",
          "code": 2367,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
After request
