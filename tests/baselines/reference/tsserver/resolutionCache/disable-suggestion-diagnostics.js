Info 0    [16:00:05.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:06.000] request:{"command":"open","arguments":{"file":"/a.js","fileContent":"require(\"b\")"},"seq":1,"type":"request"}
//// [/a.js]
require("b")


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:07.000] Search path: /
Info 3    [16:00:08.000] For info: /a.js :: No config files found.
Info 4    [16:00:09.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 5    [16:00:10.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 6    [16:00:11.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 7    [16:00:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 8    [16:00:13.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 9    [16:00:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [16:00:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [16:00:16.000] 	Files (1)
	/a.js


	a.js
	  Root file specified for compilation

Info 12   [16:00:17.000] -----------------------------------------------
Info 13   [16:00:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [16:00:19.000] 	Files (1)

Info 13   [16:00:20.000] -----------------------------------------------
Info 13   [16:00:21.000] Open files: 
Info 13   [16:00:22.000] 	FileName: /a.js ProjectRootPath: undefined
Info 13   [16:00:23.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 13   [16:00:24.000] response:{"responseRequired":false}
Info 14   [16:00:25.000] request:{"command":"configure","arguments":{"preferences":{"disableSuggestions":true}},"seq":2,"type":"request"}

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 15   [16:00:26.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":2,"success":true,"performanceData":{"updateGraphDurationMs":*}}

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 16   [16:00:27.000] response:{"responseRequired":false}
Info 17   [16:00:28.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/a.js"]},"seq":3,"type":"request"}

PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::


PolledWatches::
/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 18   [16:00:29.000] response:{"responseRequired":false}
Info 19   [16:00:30.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a.js","diagnostics":[]}}
Info 20   [16:00:31.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a.js","diagnostics":[]}}
Info 21   [16:00:32.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}