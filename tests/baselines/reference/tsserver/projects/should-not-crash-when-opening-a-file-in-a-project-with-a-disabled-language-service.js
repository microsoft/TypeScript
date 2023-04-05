currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.js]
let x =1;

//// [/a/b/f2.js]
let x =1;


Info 1    [00:00:12.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a/b/f1.js"
          },
          {
            "fileName": "/a/b/f2.js"
          }
        ],
        "options": {},
        "projectFileName": "proj1"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] Non TS file size exceeded limit (52428800). Largest files: /a/b/f1.js:52428800, /a/b/f2.js:100
Info 3    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.js 500 undefined WatchType: Closed Script info
Info 4    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.js 500 undefined WatchType: Closed Script info
Info 5    [00:00:16.000] Starting updateGraphWorker: Project: proj1
Info 6    [00:00:17.000] Finishing updateGraphWorker: Project: proj1 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:18.000] Project 'proj1' (External)
Info 8    [00:00:19.000] 	Files (0)



Info 9    [00:00:20.000] -----------------------------------------------
Info 10   [00:00:21.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

FsWatches::
/a/b/f1.js: *new*
  {}
/a/b/f2.js: *new*
  {}

Before request

Info 11   [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/f2.js"
      },
      "seq": 2,
      "type": "request"
    }
Info 12   [00:00:23.000] FileWatcher:: Close:: WatchInfo: /a/b/f2.js 500 undefined WatchType: Closed Script info
Info 13   [00:00:24.000] Project 'proj1' (External)
Info 13   [00:00:25.000] 	Files (0)

Info 13   [00:00:26.000] -----------------------------------------------
Info 13   [00:00:27.000] Open files: 
Info 13   [00:00:28.000] 	FileName: /a/b/f2.js ProjectRootPath: undefined
Info 13   [00:00:29.000] 		Projects: proj1
Info 13   [00:00:30.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/b/f1.js:
  {}

FsWatches *deleted*::
/a/b/f2.js:
  {}
