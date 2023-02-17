TI:: Creating typing installer
//// [/a/app.ts]
var x = 1;
var y = 2;


TI:: [00:00:07.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:08.000] Processing cache location '/a/data/'
TI:: [00:00:09.000] Trying to find '/a/data/package.json'...
TI:: [00:00:10.000] Finished processing cache location '/a/data/'
TI:: [00:00:11.000] Npm config file: /a/data/package.json
TI:: [00:00:12.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:17.000] Updating types-registry npm package...
TI:: [00:00:18.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:25.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:26.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:28.000] Search path: /a
Info 3    [00:00:29.000] For info: /a/app.ts :: No config files found.
Info 4    [00:00:30.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:36.000] 	Files (1)
	/a/app.ts


	app.ts
	  Root file specified for compilation

Info 11   [00:00:37.000] -----------------------------------------------
Info 12   [00:00:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:39.000] 	Files (1)

Info 12   [00:00:40.000] -----------------------------------------------
Info 12   [00:00:41.000] Open files: 
Info 12   [00:00:42.000] 	FileName: /a/app.ts ProjectRootPath: undefined
Info 12   [00:00:43.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

Info 12   [00:00:44.000] response:
    {
      "responseRequired": false
    }
Info 13   [00:00:45.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request
//// [/a/app.js]
var x = 1;
var y = 2;



Info 14   [00:00:48.000] response:
    {
      "response": true,
      "responseRequired": true
    }
TI:: Creating typing installer
//// [/a/app.ts]
var x = 1;
var y = 2;


TI:: [00:00:07.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:08.000] Processing cache location '/a/data/'
TI:: [00:00:09.000] Trying to find '/a/data/package.json'...
TI:: [00:00:10.000] Finished processing cache location '/a/data/'
TI:: [00:00:11.000] Npm config file: /a/data/package.json
TI:: [00:00:12.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:17.000] Updating types-registry npm package...
TI:: [00:00:18.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:25.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 15   [00:00:26.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 16   [00:00:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 17   [00:00:28.000] Search path: /a
Info 18   [00:00:29.000] For info: /a/app.ts :: No config files found.
Info 19   [00:00:30.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 21   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:36.000] 	Files (1)
	/a/app.ts


	app.ts
	  Root file specified for compilation

Info 26   [00:00:37.000] -----------------------------------------------
Info 27   [00:00:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:00:39.000] 	Files (1)

Info 27   [00:00:40.000] -----------------------------------------------
Info 27   [00:00:41.000] Open files: 
Info 27   [00:00:42.000] 	FileName: /a/app.ts ProjectRootPath: undefined
Info 27   [00:00:43.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

Info 27   [00:00:44.000] response:
    {
      "responseRequired": false
    }
Info 28   [00:00:45.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request
//// [/a/app.js]
var x = 1;
var y = 2;



Info 29   [00:00:48.000] response:
    {
      "response": true,
      "responseRequired": true
    }