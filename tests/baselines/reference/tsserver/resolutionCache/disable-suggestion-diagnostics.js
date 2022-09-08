Info 0    [00:00:05.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:06.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.js",
        "fileContent": "require(\"b\")"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a.js]
require("b")


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:07.000] Search path: /
Info 3    [00:00:08.000] For info: /a.js :: No config files found.
Info 4    [00:00:09.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 5    [00:00:10.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 6    [00:00:11.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 7    [00:00:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 8    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 9    [00:00:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:16.000] 	Files (1)
	/a.js


	a.js
	  Root file specified for compilation

Info 12   [00:00:17.000] -----------------------------------------------
Info 13   [00:00:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:19.000] 	Files (1)

Info 13   [00:00:20.000] -----------------------------------------------
Info 13   [00:00:21.000] Open files: 
Info 13   [00:00:22.000] 	FileName: /a.js ProjectRootPath: undefined
Info 13   [00:00:23.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 13   [00:00:24.000] response:
    {
      "responseRequired": false
    }
Info 14   [00:00:25.000] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "disableSuggestions": true
        }
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 15   [00:00:26.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":2,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 16   [00:00:27.000] response:
    {
      "responseRequired": false
    }
Info 17   [00:00:28.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/a.js"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

After request

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 18   [00:00:29.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 19   [00:00:30.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a.js","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Before running immediate callbacks and checking length (1)

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 20   [00:00:31.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a.js","diagnostics":[]}}
Info 21   [00:00:32.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::
