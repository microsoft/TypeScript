currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
export async function foo() { return 100; }

//// [/a/node_modules/tslib/index.d.ts]



Info 1    [00:00:14.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "p",
        "rootFiles": [
          {
            "fileName": "/a/app.ts"
          }
        ],
        "options": {
          "importHelpers": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/app.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:16.000] Starting updateGraphWorker: Project: p
Info 4    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 5    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 6    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: p WatchType: Failed Lookup Locations
Info 7    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: p WatchType: Failed Lookup Locations
Info 8    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: p WatchType: Missing file
Info 9    [00:00:22.000] Finishing updateGraphWorker: Project: p Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:23.000] Project 'p' (External)
Info 11   [00:00:24.000] 	Files (2)
	/a/node_modules/tslib/index.d.ts Text-1 ""
	/a/app.ts Text-1 "export async function foo() { return 100; }"


	a/node_modules/tslib/index.d.ts
	  Imported via "tslib" from file 'a/app.ts' to import 'importHelpers' as specified in compilerOptions
	a/app.ts
	  Root file specified for compilation

Info 12   [00:00:25.000] -----------------------------------------------
Info 13   [00:00:26.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/app.ts: *new*
  {}

FsWatchesRecursive::
/a/node_modules: *new*
  {}
/a: *new*
  {}
