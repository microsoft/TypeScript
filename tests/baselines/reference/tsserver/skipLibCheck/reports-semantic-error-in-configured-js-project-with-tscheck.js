Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:10.000] request:
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:11.000] Search path: /a
Info 3    [00:00:12.000] For info: /a/jsFile.js :: Config file name: /a/jsconfig.json
Info 4    [00:00:13.000] Creating configuration project /a/jsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /a/jsconfig.json : {
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
Info 7    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 8    [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 9    [00:00:18.000] Starting updateGraphWorker: Project: /a/jsconfig.json
Info 10   [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/jsconfig.json WatchType: Missing file
Info 11   [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/jsconfig.json WatchType: Type roots
Info 12   [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/jsconfig.json WatchType: Type roots
Info 13   [00:00:22.000] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:23.000] Project '/a/jsconfig.json' (Configured)
Info 15   [00:00:24.000] 	Files (1)
	/a/jsFile.js


	jsFile.js
	  Matched by default include pattern '**/*'

Info 16   [00:00:25.000] -----------------------------------------------
Info 17   [00:00:26.000] Project '/a/jsconfig.json' (Configured)
Info 17   [00:00:27.000] 	Files (1)

Info 17   [00:00:28.000] -----------------------------------------------
Info 17   [00:00:29.000] Open files: 
Info 17   [00:00:30.000] 	FileName: /a/jsFile.js ProjectRootPath: undefined
Info 17   [00:00:31.000] 		Projects: /a/jsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Info 17   [00:00:32.000] response:
    {
      "responseRequired": false
    }
Info 18   [00:00:33.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Info 19   [00:00:34.000] response:
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