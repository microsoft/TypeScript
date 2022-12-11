Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:12.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "project1",
        "rootFiles": [
          {
            "fileName": "/a/b/file1.js"
          },
          {
            "fileName": "/a/b/file2.d.ts"
          }
        ],
        "options": {}
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/file1.js]
let x =1;

//// [/a/b/file2.d.ts]

                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/b/file1.js 500 undefined WatchType: Closed Script info
Info 3    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.d.ts 500 undefined WatchType: Closed Script info
Info 4    [00:00:15.000] Starting updateGraphWorker: Project: project1
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project1 WatchType: Missing file
Info 6    [00:00:17.000] Finishing updateGraphWorker: Project: project1 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:18.000] Project 'project1' (External)
Info 8    [00:00:19.000] 	Files (2)
	/a/b/file1.js
	/a/b/file2.d.ts


	a/b/file1.js
	  Root file specified for compilation
	a/b/file2.d.ts
	  Root file specified for compilation

Info 9    [00:00:20.000] -----------------------------------------------
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.js:
  {}
/a/b/file2.d.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Info 10   [00:00:21.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 11   [00:00:22.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.js:
  {}
/a/b/file2.d.ts:
  {}

FsWatchesRecursive::
/a:
  {}

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.js:
  {}
/a/b/file2.d.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Info 12   [00:00:23.000] response:
    {
      "response": [],
      "responseRequired": true
    }