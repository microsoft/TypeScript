currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:27.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
export const foo = 0;

//// [/b.ts]
foo

//// [/ambient.d.ts]
declare module 'ambient' {}

//// [/tsconfig.json]
{}

//// [/package.json]
{ "dependencies": { "mobx": "*" } }

//// [/node_modules/mobx/package.json]
{ "name": "mobx", "version": "1.0.0" }

//// [/node_modules/mobx/index.d.ts]
export declare function observable(): unknown;

//// [/lib/foo/constants.d.ts]

            type Signals = "SIGINT" | "SIGABRT";
            declare const exp: {} & { [K in Signals]: K };
            export = exp;


Info 1    [00:00:28.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:29.000] Search path: /
Info 3    [00:00:30.000] For info: /a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:31.000] Creating configuration project /tsconfig.json
Info 5    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:33.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts",
  "/ambient.d.ts",
  "/b.ts",
  "/lib/foo/constants.d.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /ambient.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /lib/foo/constants.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:39.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 13   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 14   [00:00:41.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:42.000] Project '/tsconfig.json' (Configured)
Info 16   [00:00:43.000] 	Files (4)
	/a.ts SVC-1-0 "export const foo = 0;"
	/ambient.d.ts Text-1 "declare module 'ambient' {}"
	/b.ts Text-1 "foo"
	/lib/foo/constants.d.ts Text-1 "\n            type Signals = \"SIGINT\" | \"SIGABRT\";\n            declare const exp: {} & { [K in Signals]: K };\n            export = exp;"


	a.ts
	  Matched by default include pattern '**/*'
	ambient.d.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'
	lib/foo/constants.d.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:44.000] -----------------------------------------------
Info 18   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 19   [00:00:46.000] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info 20   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 21   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 22   [00:00:49.000] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info 23   [00:00:50.000] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:51.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 25   [00:00:52.000] 	Files (1)
	/node_modules/mobx/index.d.ts Text-1 "export declare function observable(): unknown;"


	node_modules/mobx/index.d.ts
	  Root file specified for compilation

Info 26   [00:00:53.000] -----------------------------------------------
Info 27   [00:00:54.000] Project '/tsconfig.json' (Configured)
Info 27   [00:00:55.000] 	Files (4)

Info 27   [00:00:56.000] -----------------------------------------------
Info 27   [00:00:57.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 27   [00:00:58.000] 	Files (1)

Info 27   [00:00:59.000] -----------------------------------------------
Info 27   [00:01:00.000] Open files: 
Info 27   [00:01:01.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 27   [00:01:02.000] 		Projects: /tsconfig.json
Info 27   [00:01:03.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/ambient.d.ts: *new*
  {}
/b.ts: *new*
  {}
/lib/foo/constants.d.ts: *new*
  {}
/package.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}
/node_modules: *new*
  {}

Before request

Info 28   [00:01:04.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 29   [00:01:05.000] FileWatcher:: Close:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info 30   [00:01:06.000] Search path: /
Info 31   [00:01:07.000] For info: /b.ts :: Config file name: /tsconfig.json
Info 32   [00:01:08.000] Project '/tsconfig.json' (Configured)
Info 32   [00:01:09.000] 	Files (4)

Info 32   [00:01:10.000] -----------------------------------------------
Info 32   [00:01:11.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 32   [00:01:12.000] 	Files (1)

Info 32   [00:01:13.000] -----------------------------------------------
Info 32   [00:01:14.000] Open files: 
Info 32   [00:01:15.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 32   [00:01:16.000] 		Projects: /tsconfig.json
Info 32   [00:01:17.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 32   [00:01:18.000] 		Projects: /tsconfig.json
Info 32   [00:01:19.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/ambient.d.ts:
  {}
/lib/foo/constants.d.ts:
  {}
/package.json:
  {}

FsWatches *deleted*::
/b.ts:
  {}

FsWatchesRecursive::
/:
  {}
/node_modules:
  {}

Before request

Info 33   [00:01:20.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/b.ts",
        "line": 1,
        "offset": 3,
        "includeExternalModuleExports": true,
        "prefix": "foo"
      },
      "seq": 3,
      "type": "request"
    }
Info 34   [00:01:21.000] getCompletionData: Get current token: *
Info 35   [00:01:22.000] getCompletionData: Is inside comment: *
Info 36   [00:01:23.000] getCompletionData: Get previous token: *
Info 37   [00:01:24.000] getExportInfoMap: cache miss or empty; calculating new results
Info 38   [00:01:25.000] forEachExternalModuleToImportFrom autoImportProvider: *
Info 39   [00:01:26.000] getExportInfoMap: done in * ms
Info 40   [00:01:27.000] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 1 from cache
Info 41   [00:01:28.000] collectAutoImports: response is incomplete
Info 42   [00:01:29.000] collectAutoImports: *
Info 43   [00:01:30.000] getCompletionData: Semantic work: *
Info 44   [00:01:31.000] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info 45   [00:01:32.000] response:
    {
      "response": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "optionalReplacementSpan": {
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 4
          }
        },
        "entries": [
          {
            "name": "foo",
            "kind": "const",
            "kindModifiers": "export",
            "sortText": "16",
            "hasAction": true,
            "source": "/a",
            "data": {
              "exportName": "foo",
              "exportMapKey": "foo|*|",
              "fileName": "/a.ts"
            }
          }
        ]
      },
      "responseRequired": true
    }
After request

Info 46   [00:01:36.000] DirectoryWatcher:: Triggered with src :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 47   [00:01:37.000] Scheduled: /tsconfig.json
Info 48   [00:01:38.000] Scheduled: *ensureProjectForOpenFiles*
Info 49   [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with src :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 50   [00:01:42.000] DirectoryWatcher:: Triggered with src/a2.ts :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 51   [00:01:43.000] Scheduled: /tsconfig.json, Cancelled earlier one
Info 52   [00:01:44.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 53   [00:01:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with src/a2.ts :: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
3: /tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/src/a2.ts]
export const foo = 0;


Info 54   [00:01:46.000] Running: /tsconfig.json
Info 55   [00:01:47.000] FileWatcher:: Added:: WatchInfo: /src/a2.ts 500 undefined WatchType: Closed Script info
Info 56   [00:01:48.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 57   [00:01:49.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 58   [00:01:50.000] Project '/tsconfig.json' (Configured)
Info 59   [00:01:51.000] 	Files (5)
	/a.ts SVC-1-0 "export const foo = 0;"
	/ambient.d.ts Text-1 "declare module 'ambient' {}"
	/b.ts Text-1 "foo"
	/lib/foo/constants.d.ts Text-1 "\n            type Signals = \"SIGINT\" | \"SIGABRT\";\n            declare const exp: {} & { [K in Signals]: K };\n            export = exp;"
	/src/a2.ts Text-1 "export const foo = 0;"


	a.ts
	  Matched by default include pattern '**/*'
	ambient.d.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'
	lib/foo/constants.d.ts
	  Matched by default include pattern '**/*'
	src/a2.ts
	  Matched by default include pattern '**/*'

Info 60   [00:01:52.000] -----------------------------------------------
Info 61   [00:01:53.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 62   [00:01:54.000] 	Files (1)

Info 63   [00:01:55.000] -----------------------------------------------
Info 64   [00:01:56.000] Running: *ensureProjectForOpenFiles*
Info 65   [00:01:57.000] Before ensureProjectForOpenFiles:
Info 66   [00:01:58.000] Project '/tsconfig.json' (Configured)
Info 66   [00:01:59.000] 	Files (5)

Info 66   [00:02:00.000] -----------------------------------------------
Info 66   [00:02:01.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 66   [00:02:02.000] 	Files (1)

Info 66   [00:02:03.000] -----------------------------------------------
Info 66   [00:02:04.000] Open files: 
Info 66   [00:02:05.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 66   [00:02:06.000] 		Projects: /tsconfig.json
Info 66   [00:02:07.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 66   [00:02:08.000] 		Projects: /tsconfig.json
Info 66   [00:02:09.000] After ensureProjectForOpenFiles:
Info 67   [00:02:10.000] Project '/tsconfig.json' (Configured)
Info 67   [00:02:11.000] 	Files (5)

Info 67   [00:02:12.000] -----------------------------------------------
Info 67   [00:02:13.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 67   [00:02:14.000] 	Files (1)

Info 67   [00:02:15.000] -----------------------------------------------
Info 67   [00:02:16.000] Open files: 
Info 67   [00:02:17.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 67   [00:02:18.000] 		Projects: /tsconfig.json
Info 67   [00:02:19.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 67   [00:02:20.000] 		Projects: /tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/ambient.d.ts:
  {}
/lib/foo/constants.d.ts:
  {}
/package.json:
  {}
/src/a2.ts: *new*
  {}

FsWatchesRecursive::
/:
  {}
/node_modules:
  {}
