currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/packages/b/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/b
Info seq  [hh:mm:ss:mss] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/b/tsconfig.json 2000 undefined Project: /packages/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /packages/b/tsconfig.json : {
 "rootNames": [
  "/packages/b/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/packages/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/b 1 undefined Config: /packages/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/b 1 undefined Config: /packages/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /packages/b/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/b/node_modules/@types 1 undefined Project: /packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/b/node_modules/@types 1 undefined Project: /packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/packages/b/index.ts SVC-1-0 "export class B {}"


	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/b/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/node_modules/@angular/forms/forms.d.ts Text-1 "export declare class PatternValidator {}"


	../../node_modules/@angular/forms/forms.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Search path: /packages/b
Info seq  [hh:mm:ss:mss] For info: /packages/b/tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/packages/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/b/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
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

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] Finding references to /packages/b/index.ts position 12 in project /packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Loading configured project /tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/a/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /packages/a/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/a/tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/packages/b/index.ts SVC-1-0 "export class B {}"
	/packages/a/index.ts Text-1 "import { B } from '../b';"


	packages/b/index.ts
	  Imported via '../b' from file 'packages/a/index.ts'
	  Matched by default include pattern '**/*'
	packages/a/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /packages/a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/@types 1 undefined Project: /packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/@types 1 undefined Project: /packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/packages/b/index.ts SVC-1-0 "export class B {}"
	/packages/a/index.ts Text-1 "import { B } from '../b';"


	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Finding references to /packages/b/index.ts position 13 in project /tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /packages/b
Info seq  [hh:mm:ss:mss] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /packages/b
Info seq  [hh:mm:ss:mss] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /packages/a
Info seq  [hh:mm:ss:mss] For info: /packages/a/index.ts :: Config file name: /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /packages/a
Info seq  [hh:mm:ss:mss] For info: /packages/a/index.ts :: Config file name: /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /packages/b/index.ts position 13 in project /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /packages/b
Info seq  [hh:mm:ss:mss] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /packages/b
Info seq  [hh:mm:ss:mss] For info: /packages/b/index.ts :: Config file name: /packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
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
