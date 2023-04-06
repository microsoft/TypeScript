currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/node_modules/@angular/forms/forms.d.ts]
export declare class PatternValidator {}

//// [/node_modules/@angular/forms/package.json]
{ "name": "@angular/forms", "typings": "./forms.d.ts" }

//// [/tsconfig.json]
{ "references": [{ "path": "packages/a" }, { "path": "packages/b" }] }

//// [/package.json]
{ "private": true }

//// [/packages/a/package.json]
{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }

//// [/packages/a/tsconfig.json]
{ "compilerOptions": { "composite": true }, "references": [{ "path": "../b" }] }

//// [/packages/a/index.ts]
import { B } from '../b';

//// [/packages/b/package.json]
{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }

//// [/packages/b/tsconfig.json]
{ "compilerOptions": { "composite": true } }

//// [/packages/b/index.ts]
export class B {}


Info 1    [00:00:36.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/packages/b/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:37.000] Search path: /packages/b
Info 3    [00:00:38.000] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info 4    [00:00:39.000] Creating configuration project /packages/b/tsconfig.json
Info 5    [00:00:40.000] FileWatcher:: Added:: WatchInfo: /packages/b/tsconfig.json 2000 undefined Project: /packages/b/tsconfig.json WatchType: Config file
Info 6    [00:00:41.000] Config: /packages/b/tsconfig.json : {
 "rootNames": [
  "/packages/b/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/packages/b/tsconfig.json"
 }
}
Info 7    [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /packages/b 1 undefined Config: /packages/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/b 1 undefined Config: /packages/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:44.000] Starting updateGraphWorker: Project: /packages/b/tsconfig.json
Info 10   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /packages/b/tsconfig.json WatchType: Missing file
Info 11   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /packages/b/node_modules/@types 1 undefined Project: /packages/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/b/node_modules/@types 1 undefined Project: /packages/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:48.000] Finishing updateGraphWorker: Project: /packages/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:49.000] Project '/packages/b/tsconfig.json' (Configured)
Info 15   [00:00:50.000] 	Files (1)
	/packages/b/index.ts SVC-1-0 "export class B {}"


	index.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:51.000] -----------------------------------------------
Info 17   [00:00:52.000] FileWatcher:: Added:: WatchInfo: /packages/b/package.json 250 undefined WatchType: package.json file
Info 18   [00:00:53.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 19   [00:00:54.000] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info 20   [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 21   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 22   [00:00:57.000] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info 23   [00:00:58.000] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:59.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 25   [00:01:00.000] 	Files (1)
	/node_modules/@angular/forms/forms.d.ts Text-1 "export declare class PatternValidator {}"


	../../node_modules/@angular/forms/forms.d.ts
	  Root file specified for compilation

Info 26   [00:01:01.000] -----------------------------------------------
Info 27   [00:01:02.000] Search path: /packages/b
Info 28   [00:01:03.000] For info: /packages/b/tsconfig.json :: Config file name: /tsconfig.json
Info 29   [00:01:04.000] Creating configuration project /tsconfig.json
Info 30   [00:01:05.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 31   [00:01:06.000] Search path: /
Info 32   [00:01:07.000] For info: /tsconfig.json :: No config files found.
Info 33   [00:01:08.000] Project '/packages/b/tsconfig.json' (Configured)
Info 33   [00:01:09.000] 	Files (1)

Info 33   [00:01:10.000] -----------------------------------------------
Info 33   [00:01:11.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 33   [00:01:12.000] 	Files (1)

Info 33   [00:01:13.000] -----------------------------------------------
Info 33   [00:01:14.000] Project '/tsconfig.json' (Configured)
Info 33   [00:01:15.000] 	Files (0) InitialLoadPending

Info 33   [00:01:16.000] -----------------------------------------------
Info 33   [00:01:17.000] Open files: 
Info 33   [00:01:18.000] 	FileName: /packages/b/index.ts ProjectRootPath: undefined
Info 33   [00:01:19.000] 		Projects: /packages/b/tsconfig.json
Info 33   [00:01:20.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/packages/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/packages/b/tsconfig.json: *new*
  {}
/packages/b/package.json: *new*
  {}
/package.json: *new*
  {}
/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/packages/b: *new*
  {}
/node_modules: *new*
  {}

Before request

Info 34   [00:01:21.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/packages/b/index.ts",
        "line": 1,
        "offset": 13
      },
      "seq": 2,
      "type": "request"
    }
Info 35   [00:01:22.000] Finding references to /packages/b/index.ts position 12 in project /packages/b/tsconfig.json
Info 36   [00:01:23.000] Loading configured project /tsconfig.json
Info 37   [00:01:24.000] Config: /tsconfig.json : {
 "rootNames": [
  "/packages/a/index.ts",
  "/packages/b/index.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/a",
   "originalPath": "packages/a"
  },
  {
   "path": "/packages/b",
   "originalPath": "packages/b"
  }
 ]
}
Info 38   [00:01:25.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 39   [00:01:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 40   [00:01:27.000] FileWatcher:: Added:: WatchInfo: /packages/a/index.ts 500 undefined WatchType: Closed Script info
Info 41   [00:01:28.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 42   [00:01:29.000] Config: /packages/a/tsconfig.json : {
 "rootNames": [
  "/packages/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/packages/a/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/b",
   "originalPath": "../b"
  }
 ]
}
Info 43   [00:01:30.000] FileWatcher:: Added:: WatchInfo: /packages/a/tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 44   [00:01:31.000] DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info 45   [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info 46   [00:01:33.000] DirectoryWatcher:: Added:: WatchInfo: /packages 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 47   [00:01:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 48   [00:01:35.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 49   [00:01:36.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 50   [00:01:37.000] Project '/tsconfig.json' (Configured)
Info 51   [00:01:38.000] 	Files (2)
	/packages/b/index.ts SVC-1-0 "export class B {}"
	/packages/a/index.ts Text-1 "import { B } from '../b';"


	packages/b/index.ts
	  Imported via '../b' from file 'packages/a/index.ts'
	  Matched by default include pattern '**/*'
	packages/a/index.ts
	  Matched by default include pattern '**/*'

Info 52   [00:01:39.000] -----------------------------------------------
Info 53   [00:01:40.000] Creating configuration project /packages/a/tsconfig.json
Info 54   [00:01:41.000] Starting updateGraphWorker: Project: /packages/a/tsconfig.json
Info 55   [00:01:42.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /packages/a/tsconfig.json WatchType: Missing file
Info 56   [00:01:43.000] DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/@types 1 undefined Project: /packages/a/tsconfig.json WatchType: Type roots
Info 57   [00:01:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/@types 1 undefined Project: /packages/a/tsconfig.json WatchType: Type roots
Info 58   [00:01:45.000] Finishing updateGraphWorker: Project: /packages/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [00:01:46.000] Project '/packages/a/tsconfig.json' (Configured)
Info 60   [00:01:47.000] 	Files (2)
	/packages/b/index.ts SVC-1-0 "export class B {}"
	/packages/a/index.ts Text-1 "import { B } from '../b';"


	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 61   [00:01:48.000] -----------------------------------------------
Info 62   [00:01:49.000] Finding references to /packages/b/index.ts position 13 in project /tsconfig.json
Info 63   [00:01:50.000] Search path: /packages/b
Info 64   [00:01:51.000] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info 65   [00:01:52.000] Search path: /packages/b
Info 66   [00:01:53.000] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info 67   [00:01:54.000] Search path: /packages/a
Info 68   [00:01:55.000] For info: /packages/a/index.ts :: Config file name: /packages/a/tsconfig.json
Info 69   [00:01:56.000] Search path: /packages/a
Info 70   [00:01:57.000] For info: /packages/a/index.ts :: Config file name: /packages/a/tsconfig.json
Info 71   [00:01:58.000] Finding references to /packages/b/index.ts position 13 in project /packages/a/tsconfig.json
Info 72   [00:01:59.000] Search path: /packages/b
Info 73   [00:02:00.000] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info 74   [00:02:01.000] Search path: /packages/b
Info 75   [00:02:02.000] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info 76   [00:02:03.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/packages/b/index.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 15
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 18
            },
            "lineText": "export class B {}",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/packages/a/index.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 11
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 26
            },
            "lineText": "import { B } from '../b';",
            "isWriteAccess": true,
            "isDefinition": false
          }
        ],
        "symbolName": "class",
        "symbolStartOffset": 8,
        "symbolDisplayString": "class B"
      },
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/packages/b/node_modules/@types:
  {"pollingInterval":500}
/packages/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/packages/b/tsconfig.json:
  {}
/packages/b/package.json:
  {}
/package.json:
  {}
/tsconfig.json:
  {}
/packages/a/index.ts: *new*
  {}
/packages/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/packages/b:
  {}
/node_modules:
  {}
/: *new*
  {}
/packages/a: *new*
  {}
/packages: *new*
  {}
