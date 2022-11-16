Info 0    [00:00:37.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:38.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/src/project/tsconfig.json]
{"compilerOptions":{"module":"amd","composite":true,"cacheResolutions":true,"traceResolution":true,"out":"./out.js"},"include":["*.ts"],"exclude":["*.d.ts"]}

//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { RequireInterface1 } from "pkg1";


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/pkg0.d.ts]
export interface ImportInterface0 {}

//// [/src/project/fileWithTypeRefs.ts]
/// <reference types="pkg2"/>
/// <reference types="pkg3"/>
interface LocalInterface extends ImportInterface2, RequireInterface3 {}
export {}


//// [/src/project/randomFileForTypeRef.ts]
export const x = 10;

//// [/src/project/node_modules/pkg2/index.d.ts]
export {};
declare global {
    interface ImportInterface2 {}
}


//// [/src/project/node_modules/@types/pkg4/index.d.ts]
export const x = 10;

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:39.000] Search path: /src/project
Info 3    [00:00:40.000] For info: /src/project/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 4    [00:00:41.000] Creating configuration project /src/project/tsconfig.json
Info 5    [00:00:42.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 6    [00:00:43.000] Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/fileWithImports.ts",
  "/src/project/fileWithTypeRefs.ts",
  "/src/project/randomFileForImport.ts",
  "/src/project/randomFileForTypeRef.ts"
 ],
 "options": {
  "module": 2,
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "out": "./out.js",
  "configFilePath": "/src/project/tsconfig.json"
 }
}
Info 7    [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:46.000] FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /src/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:49.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 13   [00:00:50.000] ======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Info 14   [00:00:51.000] Module resolution kind is not specified, using 'Classic'.
Info 15   [00:00:52.000] File '/src/project/pkg0.ts' does not exist.
Info 16   [00:00:53.000] File '/src/project/pkg0.tsx' does not exist.
Info 17   [00:00:54.000] File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
Info 18   [00:00:55.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
Info 19   [00:00:56.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 20   [00:00:57.000] Module resolution kind is not specified, using 'Classic'.
Info 21   [00:00:58.000] File '/src/project/pkg1.ts' does not exist.
Info 22   [00:00:59.000] File '/src/project/pkg1.tsx' does not exist.
Info 23   [00:01:00.000] File '/src/project/pkg1.d.ts' does not exist.
Info 24   [00:01:01.000] File '/src/pkg1.ts' does not exist.
Info 25   [00:01:02.000] File '/src/pkg1.tsx' does not exist.
Info 26   [00:01:03.000] File '/src/pkg1.d.ts' does not exist.
Info 27   [00:01:04.000] File '/pkg1.ts' does not exist.
Info 28   [00:01:05.000] File '/pkg1.tsx' does not exist.
Info 29   [00:01:06.000] File '/pkg1.d.ts' does not exist.
Info 30   [00:01:07.000] File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Info 31   [00:01:08.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 32   [00:01:09.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 33   [00:01:10.000] File '/src/project/pkg1.js' does not exist.
Info 34   [00:01:11.000] File '/src/project/pkg1.jsx' does not exist.
Info 35   [00:01:12.000] File '/src/pkg1.js' does not exist.
Info 36   [00:01:13.000] File '/src/pkg1.jsx' does not exist.
Info 37   [00:01:14.000] File '/pkg1.js' does not exist.
Info 38   [00:01:15.000] File '/pkg1.jsx' does not exist.
Info 39   [00:01:16.000] ======== Module name 'pkg1' was not resolved. ========
Info 40   [00:01:17.000] FileWatcher:: Added:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
Info 41   [00:01:18.000] ======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Info 42   [00:01:19.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 43   [00:01:20.000] Looking up in 'node_modules' folder, initial location '/src/project'.
Info 44   [00:01:21.000] File '/src/project/node_modules/pkg2/package.json' does not exist.
Info 45   [00:01:22.000] File '/src/project/node_modules/pkg2.d.ts' does not exist.
Info 46   [00:01:23.000] File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Info 47   [00:01:24.000] Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
Info 48   [00:01:25.000] ======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
Info 49   [00:01:26.000] ======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Info 50   [00:01:27.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 51   [00:01:28.000] Looking up in 'node_modules' folder, initial location '/src/project'.
Info 52   [00:01:29.000] File '/src/project/node_modules/pkg3.d.ts' does not exist.
Info 53   [00:01:30.000] File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Info 54   [00:01:31.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 55   [00:01:32.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 56   [00:01:33.000] ======== Type reference directive 'pkg3' was not resolved. ========
Info 57   [00:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 58   [00:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 59   [00:01:36.000] ======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Info 60   [00:01:37.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 61   [00:01:38.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
Info 62   [00:01:39.000] File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Info 63   [00:01:40.000] Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 64   [00:01:41.000] ======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
Info 65   [00:01:42.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 66   [00:01:43.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 67   [00:01:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 68   [00:01:45.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 69   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 70   [00:01:47.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 71   [00:01:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 72   [00:01:49.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 73   [00:01:50.000] Project '/src/project/tsconfig.json' (Configured)
Info 74   [00:01:51.000] 	Files (8)
	/a/lib/lib.d.ts
	/src/project/pkg0.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	pkg0.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

Info 75   [00:01:52.000] -----------------------------------------------
Info 76   [00:01:53.000] Search path: /src/project
Info 77   [00:01:54.000] For info: /src/project/tsconfig.json :: No config files found.
Info 78   [00:01:55.000] Project '/src/project/tsconfig.json' (Configured)
Info 78   [00:01:56.000] 	Files (8)

Info 78   [00:01:57.000] -----------------------------------------------
Info 78   [00:01:58.000] Open files: 
Info 78   [00:01:59.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 78   [00:02:00.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 78   [00:02:01.000] response:
    {
      "responseRequired": false
    }
Info 79   [00:02:02.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/randomFileForTypeRef.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 80   [00:02:03.000] FileWatcher:: Close:: WatchInfo: /src/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Info 81   [00:02:04.000] Search path: /src/project
Info 82   [00:02:05.000] For info: /src/project/randomFileForTypeRef.ts :: Config file name: /src/project/tsconfig.json
Info 83   [00:02:06.000] Search path: /src/project
Info 84   [00:02:07.000] For info: /src/project/tsconfig.json :: No config files found.
Info 85   [00:02:08.000] Project '/src/project/tsconfig.json' (Configured)
Info 85   [00:02:09.000] 	Files (8)

Info 85   [00:02:10.000] -----------------------------------------------
Info 85   [00:02:11.000] Open files: 
Info 85   [00:02:12.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 85   [00:02:13.000] 		Projects: /src/project/tsconfig.json
Info 85   [00:02:14.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 85   [00:02:15.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 85   [00:02:16.000] response:
    {
      "responseRequired": false
    }
Info 86   [00:02:17.000] modify randomFileForImport by adding import
Info 87   [00:02:18.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

After request

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 88   [00:02:19.000] response:
    {
      "responseRequired": false
    }
Info 89   [00:02:20.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 90   [00:02:21.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 91   [00:02:22.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 92   [00:02:23.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 93   [00:02:24.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info 94   [00:02:25.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 95   [00:02:26.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 96   [00:02:27.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
Info 97   [00:02:28.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 98   [00:02:29.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 99   [00:02:30.000] Different program with same set of files
Info 100  [00:02:31.000] modify randomFileForTypeRef by adding typeRef
Info 101  [00:02:32.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/randomFileForTypeRef.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "/// <reference types=\"pkg2\"/>\n"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

After request

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 102  [00:02:33.000] response:
    {
      "responseRequired": false
    }
Info 103  [00:02:34.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 104  [00:02:35.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 105  [00:02:36.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 106  [00:02:37.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 107  [00:02:38.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info 108  [00:02:39.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 109  [00:02:40.000] ======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts'. ========
Info 110  [00:02:41.000] Resolution for type reference directive 'pkg2' was found in cache from location '/src/project'.
Info 111  [00:02:42.000] ======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
Info 112  [00:02:43.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 113  [00:02:44.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 114  [00:02:45.000] Different program with same set of files
Info 115  [00:02:46.000] write file not resolved by import
Info 116  [00:02:49.000] DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 117  [00:02:50.000] Project: /src/project/tsconfig.json Detected excluded file: /src/project/pkg1.d.ts
Info 118  [00:02:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 119  [00:02:52.000] DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 120  [00:02:53.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 121  [00:02:54.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/src/project/pkg1.d.ts]
export interface RequireInterface1 {}


PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 122  [00:02:55.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 123  [00:02:56.000] Scheduled: /src/project/tsconfig.json
Info 124  [00:02:57.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 125  [00:02:58.000] Running: /src/project/tsconfig.json
Info 126  [00:02:59.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 127  [00:03:00.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 128  [00:03:01.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 129  [00:03:02.000] Module resolution kind is not specified, using 'Classic'.
Info 130  [00:03:03.000] File '/src/project/pkg1.ts' does not exist.
Info 131  [00:03:04.000] File '/src/project/pkg1.tsx' does not exist.
Info 132  [00:03:05.000] File '/src/project/pkg1.d.ts' exist - use it as a name resolution result.
Info 133  [00:03:06.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/pkg1.d.ts'. ========
Info 134  [00:03:07.000] FileWatcher:: Added:: WatchInfo: /src/project/pkg1.d.ts 500 undefined WatchType: Closed Script info
Info 135  [00:03:08.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 136  [00:03:09.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info 137  [00:03:10.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 138  [00:03:11.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 139  [00:03:12.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 140  [00:03:13.000] DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 141  [00:03:14.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 142  [00:03:15.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 143  [00:03:16.000] Project '/src/project/tsconfig.json' (Configured)
Info 144  [00:03:17.000] 	Files (9)
	/a/lib/lib.d.ts
	/src/project/pkg0.d.ts
	/src/project/pkg1.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	pkg0.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	pkg1.d.ts
	  Imported via "pkg1" from file 'fileWithImports.ts'
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

Info 145  [00:03:18.000] -----------------------------------------------
Info 146  [00:03:19.000] Running: *ensureProjectForOpenFiles*
Info 147  [00:03:20.000] Before ensureProjectForOpenFiles:
Info 148  [00:03:21.000] Project '/src/project/tsconfig.json' (Configured)
Info 148  [00:03:22.000] 	Files (9)

Info 148  [00:03:23.000] -----------------------------------------------
Info 148  [00:03:24.000] Open files: 
Info 148  [00:03:25.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 148  [00:03:26.000] 		Projects: /src/project/tsconfig.json
Info 148  [00:03:27.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 148  [00:03:28.000] 		Projects: /src/project/tsconfig.json
Info 148  [00:03:29.000] After ensureProjectForOpenFiles:
Info 149  [00:03:30.000] Project '/src/project/tsconfig.json' (Configured)
Info 149  [00:03:31.000] 	Files (9)

Info 149  [00:03:32.000] -----------------------------------------------
Info 149  [00:03:33.000] Open files: 
Info 149  [00:03:34.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 149  [00:03:35.000] 		Projects: /src/project/tsconfig.json
Info 149  [00:03:36.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 149  [00:03:37.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 149  [00:03:38.000] write file not resolved by typeRef
Info 150  [00:03:42.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 151  [00:03:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 152  [00:03:44.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 153  [00:03:45.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 154  [00:03:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 155  [00:03:48.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 156  [00:03:49.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 157  [00:03:50.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 158  [00:03:51.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 159  [00:03:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/src/project/node_modules/pkg3/index.d.ts]
export interface RequireInterface3 {}


PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 160  [00:03:53.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 161  [00:03:54.000] Scheduled: /src/project/tsconfig.json
Info 162  [00:03:55.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 163  [00:03:56.000] Running: /src/project/tsconfig.json
Info 164  [00:03:57.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 165  [00:03:58.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 166  [00:03:59.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg1.d.ts'.
Info 167  [00:04:00.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 168  [00:04:01.000] ======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Info 169  [00:04:02.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 170  [00:04:03.000] Looking up in 'node_modules' folder, initial location '/src/project'.
Info 171  [00:04:04.000] File '/src/project/node_modules/pkg3/package.json' does not exist.
Info 172  [00:04:05.000] File '/src/project/node_modules/pkg3.d.ts' does not exist.
Info 173  [00:04:06.000] File '/src/project/node_modules/pkg3/index.d.ts' exist - use it as a name resolution result.
Info 174  [00:04:07.000] Resolving real path for '/src/project/node_modules/pkg3/index.d.ts', result '/src/project/node_modules/pkg3/index.d.ts'.
Info 175  [00:04:08.000] ======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts', primary: false. ========
Info 176  [00:04:09.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 177  [00:04:10.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 178  [00:04:11.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 179  [00:04:12.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 180  [00:04:13.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 181  [00:04:14.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 182  [00:04:15.000] Project '/src/project/tsconfig.json' (Configured)
Info 183  [00:04:16.000] 	Files (10)
	/a/lib/lib.d.ts
	/src/project/pkg0.d.ts
	/src/project/pkg1.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/node_modules/pkg3/index.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	pkg0.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	pkg1.d.ts
	  Imported via "pkg1" from file 'fileWithImports.ts'
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
	node_modules/pkg3/index.d.ts
	  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts'
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

Info 184  [00:04:17.000] -----------------------------------------------
Info 185  [00:04:18.000] Running: *ensureProjectForOpenFiles*
Info 186  [00:04:19.000] Before ensureProjectForOpenFiles:
Info 187  [00:04:20.000] Project '/src/project/tsconfig.json' (Configured)
Info 187  [00:04:21.000] 	Files (10)

Info 187  [00:04:22.000] -----------------------------------------------
Info 187  [00:04:23.000] Open files: 
Info 187  [00:04:24.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 187  [00:04:25.000] 		Projects: /src/project/tsconfig.json
Info 187  [00:04:26.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 187  [00:04:27.000] 		Projects: /src/project/tsconfig.json
Info 187  [00:04:28.000] After ensureProjectForOpenFiles:
Info 188  [00:04:29.000] Project '/src/project/tsconfig.json' (Configured)
Info 188  [00:04:30.000] 	Files (10)

Info 188  [00:04:31.000] -----------------------------------------------
Info 188  [00:04:32.000] Open files: 
Info 188  [00:04:33.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 188  [00:04:34.000] 		Projects: /src/project/tsconfig.json
Info 188  [00:04:35.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 188  [00:04:36.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 188  [00:04:37.000] delete file with imports
Info 189  [00:04:39.000] FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 190  [00:04:40.000] FileWatcher:: Close:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 191  [00:04:41.000] Scheduled: /src/project/tsconfig.json
Info 192  [00:04:42.000] Scheduled: *ensureProjectForOpenFiles*
Info 193  [00:04:43.000] Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 194  [00:04:44.000] DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 195  [00:04:45.000] Scheduled: /src/project/tsconfig.json, Cancelled earlier one
Info 196  [00:04:46.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 197  [00:04:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/src/project/fileWithImports.ts] deleted

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 198  [00:04:48.000] Running: /src/project/tsconfig.json
Info 199  [00:04:49.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 200  [00:04:50.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 201  [00:04:51.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts'.
Info 202  [00:04:52.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 203  [00:04:53.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 204  [00:04:54.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 205  [00:04:55.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 206  [00:04:56.000] Project '/src/project/tsconfig.json' (Configured)
Info 207  [00:04:57.000] 	Files (8)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/node_modules/pkg3/index.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/pkg0.d.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
	node_modules/pkg3/index.d.ts
	  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts'
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	pkg0.d.ts
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

Info 208  [00:04:58.000] -----------------------------------------------
Info 209  [00:04:59.000] Running: *ensureProjectForOpenFiles*
Info 210  [00:05:00.000] Before ensureProjectForOpenFiles:
Info 211  [00:05:01.000] Project '/src/project/tsconfig.json' (Configured)
Info 211  [00:05:02.000] 	Files (8)

Info 211  [00:05:03.000] -----------------------------------------------
Info 211  [00:05:04.000] Open files: 
Info 211  [00:05:05.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 211  [00:05:06.000] 		Projects: /src/project/tsconfig.json
Info 211  [00:05:07.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 211  [00:05:08.000] 		Projects: /src/project/tsconfig.json
Info 211  [00:05:09.000] After ensureProjectForOpenFiles:
Info 212  [00:05:10.000] Project '/src/project/tsconfig.json' (Configured)
Info 212  [00:05:11.000] 	Files (8)

Info 212  [00:05:12.000] -----------------------------------------------
Info 212  [00:05:13.000] Open files: 
Info 212  [00:05:14.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 212  [00:05:15.000] 		Projects: /src/project/tsconfig.json
Info 212  [00:05:16.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 212  [00:05:17.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 212  [00:05:18.000] delete file with typeRefs
Info 213  [00:05:20.000] FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 214  [00:05:21.000] FileWatcher:: Close:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 215  [00:05:22.000] Scheduled: /src/project/tsconfig.json
Info 216  [00:05:23.000] Scheduled: *ensureProjectForOpenFiles*
Info 217  [00:05:24.000] Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 218  [00:05:25.000] DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 219  [00:05:26.000] Scheduled: /src/project/tsconfig.json, Cancelled earlier one
Info 220  [00:05:27.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 221  [00:05:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/src/project/fileWithTypeRefs.ts] deleted

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 222  [00:05:29.000] Running: /src/project/tsconfig.json
Info 223  [00:05:30.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 224  [00:05:31.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 225  [00:05:32.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 226  [00:05:33.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 227  [00:05:34.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 7 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 228  [00:05:35.000] Project '/src/project/tsconfig.json' (Configured)
Info 229  [00:05:36.000] 	Files (6)
	/a/lib/lib.d.ts
	/src/project/pkg0.d.ts
	/src/project/randomFileForImport.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	pkg0.d.ts
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

Info 230  [00:05:37.000] -----------------------------------------------
Info 231  [00:05:38.000] Running: *ensureProjectForOpenFiles*
Info 232  [00:05:39.000] Before ensureProjectForOpenFiles:
Info 233  [00:05:40.000] Project '/src/project/tsconfig.json' (Configured)
Info 233  [00:05:41.000] 	Files (6)

Info 233  [00:05:42.000] -----------------------------------------------
Info 233  [00:05:43.000] Open files: 
Info 233  [00:05:44.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 233  [00:05:45.000] 		Projects: /src/project/tsconfig.json
Info 233  [00:05:46.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 233  [00:05:47.000] 		Projects: /src/project/tsconfig.json
Info 233  [00:05:48.000] After ensureProjectForOpenFiles:
Info 234  [00:05:49.000] Project '/src/project/tsconfig.json' (Configured)
Info 234  [00:05:50.000] 	Files (6)

Info 234  [00:05:51.000] -----------------------------------------------
Info 234  [00:05:52.000] Open files: 
Info 234  [00:05:53.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 234  [00:05:54.000] 		Projects: /src/project/tsconfig.json
Info 234  [00:05:55.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 234  [00:05:56.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 234  [00:05:57.000] delete resolved import file
Info 235  [00:05:59.000] FileWatcher:: Triggered with /src/project/pkg0.d.ts 2:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
Info 236  [00:06:00.000] FileWatcher:: Close:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
Info 237  [00:06:01.000] Scheduled: /src/project/tsconfig.json
Info 238  [00:06:02.000] Scheduled: *ensureProjectForOpenFiles*
Info 239  [00:06:03.000] Elapsed:: *ms FileWatcher:: Triggered with /src/project/pkg0.d.ts 2:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
Info 240  [00:06:04.000] DirectoryWatcher:: Triggered with /src/project/pkg0.d.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 241  [00:06:05.000] Project: /src/project/tsconfig.json Detected excluded file: /src/project/pkg0.d.ts
Info 242  [00:06:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg0.d.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/src/project/pkg0.d.ts] deleted

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 243  [00:06:07.000] Running: /src/project/tsconfig.json
Info 244  [00:06:08.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 245  [00:06:09.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 246  [00:06:10.000] Module resolution kind is not specified, using 'Classic'.
Info 247  [00:06:11.000] File '/src/project/pkg0.ts' does not exist.
Info 248  [00:06:12.000] File '/src/project/pkg0.tsx' does not exist.
Info 249  [00:06:13.000] File '/src/project/pkg0.d.ts' does not exist.
Info 250  [00:06:14.000] File '/src/pkg0.ts' does not exist.
Info 251  [00:06:15.000] File '/src/pkg0.tsx' does not exist.
Info 252  [00:06:16.000] File '/src/pkg0.d.ts' does not exist.
Info 253  [00:06:17.000] File '/pkg0.ts' does not exist.
Info 254  [00:06:18.000] File '/pkg0.tsx' does not exist.
Info 255  [00:06:19.000] File '/pkg0.d.ts' does not exist.
Info 256  [00:06:20.000] File '/src/project/node_modules/@types/pkg0.d.ts' does not exist.
Info 257  [00:06:21.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 258  [00:06:22.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 259  [00:06:23.000] File '/src/project/pkg0.js' does not exist.
Info 260  [00:06:24.000] File '/src/project/pkg0.jsx' does not exist.
Info 261  [00:06:25.000] File '/src/pkg0.js' does not exist.
Info 262  [00:06:26.000] File '/src/pkg0.jsx' does not exist.
Info 263  [00:06:27.000] File '/pkg0.js' does not exist.
Info 264  [00:06:28.000] File '/pkg0.jsx' does not exist.
Info 265  [00:06:29.000] ======== Module name 'pkg0' was not resolved. ========
Info 266  [00:06:30.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Info 267  [00:06:31.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 268  [00:06:32.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 269  [00:06:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 270  [00:06:34.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 271  [00:06:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 272  [00:06:36.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 8 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 273  [00:06:37.000] Project '/src/project/tsconfig.json' (Configured)
Info 274  [00:06:38.000] 	Files (5)
	/a/lib/lib.d.ts
	/src/project/randomFileForImport.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

Info 275  [00:06:39.000] -----------------------------------------------
Info 276  [00:06:40.000] Running: *ensureProjectForOpenFiles*
Info 277  [00:06:41.000] Before ensureProjectForOpenFiles:
Info 278  [00:06:42.000] Project '/src/project/tsconfig.json' (Configured)
Info 278  [00:06:43.000] 	Files (5)

Info 278  [00:06:44.000] -----------------------------------------------
Info 278  [00:06:45.000] Open files: 
Info 278  [00:06:46.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 278  [00:06:47.000] 		Projects: /src/project/tsconfig.json
Info 278  [00:06:48.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 278  [00:06:49.000] 		Projects: /src/project/tsconfig.json
Info 278  [00:06:50.000] After ensureProjectForOpenFiles:
Info 279  [00:06:51.000] Project '/src/project/tsconfig.json' (Configured)
Info 279  [00:06:52.000] 	Files (5)

Info 279  [00:06:53.000] -----------------------------------------------
Info 279  [00:06:54.000] Open files: 
Info 279  [00:06:55.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 279  [00:06:56.000] 		Projects: /src/project/tsconfig.json
Info 279  [00:06:57.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 279  [00:06:58.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 279  [00:06:59.000] delete resolved typeRef file
Info 280  [00:07:01.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 281  [00:07:02.000] Scheduled: /src/project/tsconfig.json
Info 282  [00:07:03.000] Scheduled: *ensureProjectForOpenFiles*
Info 283  [00:07:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 284  [00:07:05.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 285  [00:07:06.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 286  [00:07:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/src/project/node_modules/pkg2/index.d.ts] deleted

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 287  [00:07:08.000] Running: /src/project/tsconfig.json
Info 288  [00:07:09.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 289  [00:07:10.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Info 290  [00:07:11.000] ======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts', root directory '/src/project/node_modules/@types'. ========
Info 291  [00:07:12.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 292  [00:07:13.000] Looking up in 'node_modules' folder, initial location '/src/project'.
Info 293  [00:07:14.000] File '/src/project/node_modules/pkg2/package.json' does not exist.
Info 294  [00:07:15.000] File '/src/project/node_modules/pkg2.d.ts' does not exist.
Info 295  [00:07:16.000] File '/src/project/node_modules/pkg2/index.d.ts' does not exist.
Info 296  [00:07:17.000] File '/src/project/node_modules/@types/pkg2.d.ts' does not exist.
Info 297  [00:07:18.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 298  [00:07:19.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 299  [00:07:20.000] ======== Type reference directive 'pkg2' was not resolved. ========
Info 300  [00:07:21.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 301  [00:07:22.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 9 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 302  [00:07:23.000] Project '/src/project/tsconfig.json' (Configured)
Info 303  [00:07:24.000] 	Files (4)
	/a/lib/lib.d.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

Info 304  [00:07:25.000] -----------------------------------------------
Info 305  [00:07:26.000] Running: *ensureProjectForOpenFiles*
Info 306  [00:07:27.000] Before ensureProjectForOpenFiles:
Info 307  [00:07:28.000] Project '/src/project/tsconfig.json' (Configured)
Info 307  [00:07:29.000] 	Files (4)

Info 307  [00:07:30.000] -----------------------------------------------
Info 307  [00:07:31.000] Open files: 
Info 307  [00:07:32.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 307  [00:07:33.000] 		Projects: /src/project/tsconfig.json
Info 307  [00:07:34.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 307  [00:07:35.000] 		Projects: /src/project/tsconfig.json
Info 307  [00:07:36.000] After ensureProjectForOpenFiles:
Info 308  [00:07:37.000] Project '/src/project/tsconfig.json' (Configured)
Info 308  [00:07:38.000] 	Files (4)

Info 308  [00:07:39.000] -----------------------------------------------
Info 308  [00:07:40.000] Open files: 
Info 308  [00:07:41.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 308  [00:07:42.000] 		Projects: /src/project/tsconfig.json
Info 308  [00:07:43.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 308  [00:07:44.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/pkg1.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}
