Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/jsFile.js]

                // @ts-check
                let x = 1;
                x === "string";


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:09.000] Search path: /a
Info 3    [00:00:10.000] For info: /a/jsFile.js :: No config files found.
Info 4    [00:00:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:13.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:17.000] 	Files (1)
	/a/jsFile.js


	jsFile.js
	  Root file specified for compilation

Info 11   [00:00:18.000] -----------------------------------------------
Info 12   [00:00:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:20.000] 	Files (1)

Info 12   [00:00:21.000] -----------------------------------------------
Info 12   [00:00:22.000] Open files: 
Info 12   [00:00:23.000] 	FileName: /a/jsFile.js ProjectRootPath: undefined
Info 12   [00:00:24.000] 		Projects: /dev/null/inferredProject1*
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

FsWatchesRecursive::

Info 12   [00:00:25.000] response:
    {
      "responseRequired": false
    }
Info 13   [00:00:26.000] request:
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

FsWatchesRecursive::

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

FsWatchesRecursive::

Info 14   [00:00:27.000] response:
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