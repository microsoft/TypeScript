TI:: Creating typing installer
//// [/a.deferred]
const a = 1;

//// [/b.js]
const b = 1;

//// [/tsconfig.json]



TI:: [00:00:09.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:10.000] Processing cache location '/a/data/'
TI:: [00:00:11.000] Trying to find '/a/data/package.json'...
TI:: [00:00:12.000] Finished processing cache location '/a/data/'
TI:: [00:00:13.000] Npm config file: /a/data/package.json
TI:: [00:00:14.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:21.000] Updating types-registry npm package...
TI:: [00:00:22.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:29.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:30.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:31.000] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "lazyConfiguredProjectsFromExternalProject": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:32.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
After request

Info 3    [00:00:33.000] response:
    {
      "responseRequired": false
    }
Info 4    [00:00:34.000] request:
    {
      "command": "configure",
      "arguments": {
        "extraFileExtensions": [
          {
            "extension": ".deferred",
            "scriptKind": 7,
            "isMixedContent": true
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

Info 5    [00:00:35.000] reload projects.
Info 6    [00:00:36.000] Before ensureProjectForOpenFiles:
Info 7    [00:00:37.000] Open files: 
Info 7    [00:00:38.000] After ensureProjectForOpenFiles:
Info 8    [00:00:39.000] Open files: 
Info 8    [00:00:40.000] Host file extension mappings updated
Info 9    [00:00:41.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":2,"success":true}
After request

Info 10   [00:00:42.000] response:
    {
      "responseRequired": false
    }
Info 11   [00:00:43.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/proj1",
        "rootFiles": [
          {
            "fileName": "/a.deferred"
          },
          {
            "fileName": "/b.js"
          },
          {
            "fileName": "/tsconfig.json"
          }
        ],
        "options": {}
      },
      "seq": 3,
      "type": "request"
    }
Before request

Info 12   [00:00:44.000] Creating configuration project /tsconfig.json
Info 13   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
After request

FsWatches::
/tsconfig.json: *new*
  {}

Info 14   [00:00:46.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 15   [00:00:47.000] Calling ensureInferredProjectsUpToDate_TestOnly
Info 16   [00:00:48.000] Loading configured project /tsconfig.json
Info 17   [00:00:49.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.deferred"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 18   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 19   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 20   [00:00:52.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 21   [00:00:53.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 22   [00:00:54.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:55.000] Project '/tsconfig.json' (Configured)
Info 24   [00:00:56.000] 	Files (1)
	/a.deferred


	a.deferred
	  Matched by default include pattern '**/*'

Info 25   [00:00:57.000] -----------------------------------------------
Info 26   [00:00:58.000] Before ensureProjectForOpenFiles:
Info 27   [00:00:59.000] Project '/tsconfig.json' (Configured)
Info 27   [00:01:00.000] 	Files (1)

Info 27   [00:01:01.000] -----------------------------------------------
Info 27   [00:01:02.000] Open files: 
Info 27   [00:01:03.000] After ensureProjectForOpenFiles:
Info 28   [00:01:04.000] Project '/tsconfig.json' (Configured)
Info 28   [00:01:05.000] 	Files (1)

Info 28   [00:01:06.000] -----------------------------------------------
Info 28   [00:01:07.000] Open files: 
Info 28   [00:01:08.000] Has allowNonTsExtension: true