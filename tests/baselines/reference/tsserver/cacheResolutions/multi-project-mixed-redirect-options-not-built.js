Info 0    [00:00:46.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:47.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/cRandomFileForImport.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/src/project/tsconfig.a.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["aFileWithImports.ts","aRandomFileForImport.ts","aRandomFileForImport2.ts"]}

//// [/src/project/aFileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
export { x } from "./aRandomFileForImport";
export { x as x2 } from "./aRandomFileForImport2";
export const y = 10;


//// [/src/project/aRandomFileForImport.ts]
export const x = 10;

//// [/src/project/aRandomFileForImport2.ts]
export const x = 10;

//// [/src/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/src/project/tsconfig.b.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["bFileWithImports.ts","bRandomFileForImport.ts","bRandomFileForImport2.ts"],"references":[{"path":"./tsconfig.a.json"}]}

//// [/src/project/bFileWithImports.ts]
export { y } from "./aFileWithImports";
export { x } from "./bRandomFileForImport";
import type { ImportInterface0 } from "pkg0";


//// [/src/project/bRandomFileForImport.ts]
export const x = 10;

//// [/src/project/bRandomFileForImport2.ts]
export const x = 10;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true,"module":"amd"},"files":["cFileWithImports.ts","cRandomFileForImport.ts","cRandomFileForImport2.ts"],"references":[{"path":"./tsconfig.a.json"},{"path":"./tsconfig.b.json"}]}

//// [/src/project/cFileWithImports.ts]
import { y } from "./bFileWithImports";
import type { ImportInterface0 } from "pkg0";


//// [/src/project/cRandomFileForImport.ts]
export const x = 10;

//// [/src/project/cRandomFileForImport2.ts]
export const x = 10;

//// [/src/project/pkg0.d.ts]
export interface ImportInterface0 {}

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

Info 2    [00:00:48.000] Search path: /src/project
Info 3    [00:00:49.000] For info: /src/project/cRandomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 4    [00:00:50.000] Creating configuration project /src/project/tsconfig.json
Info 5    [00:00:51.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 6    [00:00:52.000] Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/cFileWithImports.ts",
  "/src/project/cRandomFileForImport.ts",
  "/src/project/cRandomFileForImport2.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "module": 2,
  "configFilePath": "/src/project/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/src/project/tsconfig.a.json",
   "originalPath": "./tsconfig.a.json"
  },
  {
   "path": "/src/project/tsconfig.b.json",
   "originalPath": "./tsconfig.b.json"
  }
 ]
}
Info 7    [00:00:53.000] FileWatcher:: Added:: WatchInfo: /src/project/cFileWithImports.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:54.000] FileWatcher:: Added:: WatchInfo: /src/project/cRandomFileForImport2.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:55.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 10   [00:00:56.000] Config: /src/project/tsconfig.a.json : {
 "rootNames": [
  "/src/project/aFileWithImports.ts",
  "/src/project/aRandomFileForImport.ts",
  "/src/project/aRandomFileForImport2.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.a.json"
 }
}
Info 11   [00:00:57.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.a.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 12   [00:00:58.000] Config: /src/project/tsconfig.b.json : {
 "rootNames": [
  "/src/project/bFileWithImports.ts",
  "/src/project/bRandomFileForImport.ts",
  "/src/project/bRandomFileForImport2.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.b.json"
 },
 "projectReferences": [
  {
   "path": "/src/project/tsconfig.a.json",
   "originalPath": "./tsconfig.a.json"
  }
 ]
}
Info 13   [00:00:59.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.b.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 14   [00:01:00.000] ======== Resolving module './bFileWithImports' from '/src/project/cFileWithImports.ts'. ========
Info 15   [00:01:01.000] Module resolution kind is not specified, using 'Classic'.
Info 16   [00:01:02.000] File '/src/project/bFileWithImports.ts' exist - use it as a name resolution result.
Info 17   [00:01:03.000] ======== Module name './bFileWithImports' was successfully resolved to '/src/project/bFileWithImports.ts'. ========
Info 18   [00:01:04.000] ======== Resolving module 'pkg0' from '/src/project/cFileWithImports.ts'. ========
Info 19   [00:01:05.000] Module resolution kind is not specified, using 'Classic'.
Info 20   [00:01:06.000] File '/src/project/pkg0.ts' does not exist.
Info 21   [00:01:07.000] File '/src/project/pkg0.tsx' does not exist.
Info 22   [00:01:08.000] File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
Info 23   [00:01:09.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
Info 24   [00:01:10.000] FileWatcher:: Added:: WatchInfo: /src/project/bFileWithImports.ts 500 undefined WatchType: Closed Script info
Info 25   [00:01:11.000] ======== Resolving module './aFileWithImports' from '/src/project/bFileWithImports.ts'. ========
Info 26   [00:01:12.000] Using compiler options of project reference redirect '/src/project/tsconfig.b.json'.
Info 27   [00:01:13.000] Module resolution kind is not specified, using 'NodeJs'.
Info 28   [00:01:14.000] Loading module as file / folder, candidate module location '/src/project/aFileWithImports', target file types: TypeScript, Declaration.
Info 29   [00:01:15.000] File '/src/project/aFileWithImports.ts' exist - use it as a name resolution result.
Info 30   [00:01:16.000] ======== Module name './aFileWithImports' was successfully resolved to '/src/project/aFileWithImports.ts'. ========
Info 31   [00:01:17.000] ======== Resolving module './bRandomFileForImport' from '/src/project/bFileWithImports.ts'. ========
Info 32   [00:01:18.000] Using compiler options of project reference redirect '/src/project/tsconfig.b.json'.
Info 33   [00:01:19.000] Module resolution kind is not specified, using 'NodeJs'.
Info 34   [00:01:20.000] Loading module as file / folder, candidate module location '/src/project/bRandomFileForImport', target file types: TypeScript, Declaration.
Info 35   [00:01:21.000] File '/src/project/bRandomFileForImport.ts' exist - use it as a name resolution result.
Info 36   [00:01:22.000] ======== Module name './bRandomFileForImport' was successfully resolved to '/src/project/bRandomFileForImport.ts'. ========
Info 37   [00:01:23.000] ======== Resolving module 'pkg0' from '/src/project/bFileWithImports.ts'. ========
Info 38   [00:01:24.000] Using compiler options of project reference redirect '/src/project/tsconfig.b.json'.
Info 39   [00:01:25.000] Module resolution kind is not specified, using 'NodeJs'.
Info 40   [00:01:26.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 41   [00:01:27.000] File '/src/project/node_modules/pkg0/package.json' does not exist.
Info 42   [00:01:28.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 43   [00:01:29.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 44   [00:01:30.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 45   [00:01:31.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 46   [00:01:32.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 47   [00:01:33.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 48   [00:01:34.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 49   [00:01:35.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 50   [00:01:36.000] FileWatcher:: Added:: WatchInfo: /src/project/aFileWithImports.ts 500 undefined WatchType: Closed Script info
Info 51   [00:01:37.000] ======== Resolving module 'pkg0' from '/src/project/aFileWithImports.ts'. ========
Info 52   [00:01:38.000] Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Info 53   [00:01:39.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 54   [00:01:40.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 55   [00:01:41.000] ======== Resolving module './aRandomFileForImport' from '/src/project/aFileWithImports.ts'. ========
Info 56   [00:01:42.000] Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Info 57   [00:01:43.000] Module resolution kind is not specified, using 'NodeJs'.
Info 58   [00:01:44.000] Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport', target file types: TypeScript, Declaration.
Info 59   [00:01:45.000] File '/src/project/aRandomFileForImport.ts' exist - use it as a name resolution result.
Info 60   [00:01:46.000] ======== Module name './aRandomFileForImport' was successfully resolved to '/src/project/aRandomFileForImport.ts'. ========
Info 61   [00:01:47.000] ======== Resolving module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts'. ========
Info 62   [00:01:48.000] Using compiler options of project reference redirect '/src/project/tsconfig.a.json'.
Info 63   [00:01:49.000] Module resolution kind is not specified, using 'NodeJs'.
Info 64   [00:01:50.000] Loading module as file / folder, candidate module location '/src/project/aRandomFileForImport2', target file types: TypeScript, Declaration.
Info 65   [00:01:51.000] File '/src/project/aRandomFileForImport2.ts' exist - use it as a name resolution result.
Info 66   [00:01:52.000] ======== Module name './aRandomFileForImport2' was successfully resolved to '/src/project/aRandomFileForImport2.ts'. ========
Info 67   [00:01:53.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 68   [00:01:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 69   [00:01:55.000] FileWatcher:: Added:: WatchInfo: /src/project/aRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 70   [00:01:56.000] FileWatcher:: Added:: WatchInfo: /src/project/aRandomFileForImport2.ts 500 undefined WatchType: Closed Script info
Info 71   [00:01:57.000] FileWatcher:: Added:: WatchInfo: /src/project/bRandomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 72   [00:01:58.000] FileWatcher:: Added:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
Info 73   [00:01:59.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 74   [00:02:00.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 75   [00:02:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 76   [00:02:02.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 77   [00:02:03.000] Project '/src/project/tsconfig.json' (Configured)
Info 78   [00:02:04.000] 	Files (11)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/index.d.ts
	/src/project/aRandomFileForImport.ts
	/src/project/aRandomFileForImport2.ts
	/src/project/aFileWithImports.ts
	/src/project/bRandomFileForImport.ts
	/src/project/bFileWithImports.ts
	/src/project/pkg0.d.ts
	/src/project/cFileWithImports.ts
	/src/project/cRandomFileForImport.ts
	/src/project/cRandomFileForImport2.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'aFileWithImports.ts'
	  Imported via "pkg0" from file 'bFileWithImports.ts'
	aRandomFileForImport.ts
	  Imported via "./aRandomFileForImport" from file 'aFileWithImports.ts'
	aRandomFileForImport2.ts
	  Imported via "./aRandomFileForImport2" from file 'aFileWithImports.ts'
	aFileWithImports.ts
	  Imported via "./aFileWithImports" from file 'bFileWithImports.ts'
	bRandomFileForImport.ts
	  Imported via "./bRandomFileForImport" from file 'bFileWithImports.ts'
	bFileWithImports.ts
	  Imported via "./bFileWithImports" from file 'cFileWithImports.ts'
	pkg0.d.ts
	  Imported via "pkg0" from file 'cFileWithImports.ts'
	cFileWithImports.ts
	  Part of 'files' list in tsconfig.json
	cRandomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	cRandomFileForImport2.ts
	  Part of 'files' list in tsconfig.json

Info 79   [00:02:05.000] -----------------------------------------------
Info 80   [00:02:06.000] Search path: /src/project
Info 81   [00:02:07.000] For info: /src/project/tsconfig.json :: No config files found.
Info 82   [00:02:08.000] Project '/src/project/tsconfig.json' (Configured)
Info 82   [00:02:09.000] 	Files (11)

Info 82   [00:02:10.000] -----------------------------------------------
Info 82   [00:02:11.000] Open files: 
Info 82   [00:02:12.000] 	FileName: /src/project/cRandomFileForImport.ts ProjectRootPath: undefined
Info 82   [00:02:13.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}
/src/project/tsconfig.a.json:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/brandomfileforimport.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 82   [00:02:14.000] response:
    {
      "responseRequired": false
    }
Info 83   [00:02:15.000] modify cRandomFileForImport by adding import
Info 84   [00:02:16.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/cRandomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "export type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}
/src/project/tsconfig.a.json:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/brandomfileforimport.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/cfilewithimports.ts:
  {}
/src/project/crandomfileforimport2.ts:
  {}
/src/project/tsconfig.a.json:
  {}
/src/project/tsconfig.b.json:
  {}
/src/project/bfilewithimports.ts:
  {}
/src/project/afilewithimports.ts:
  {}
/src/project/arandomfileforimport.ts:
  {}
/src/project/arandomfileforimport2.ts:
  {}
/src/project/brandomfileforimport.ts:
  {}
/src/project/pkg0.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 85   [00:02:17.000] response:
    {
      "responseRequired": false
    }
Info 86   [00:02:18.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 87   [00:02:19.000] Reusing resolution of module './bFileWithImports' from '/src/project/cFileWithImports.ts' of old program, it was successfully resolved to '/src/project/bFileWithImports.ts'.
Info 88   [00:02:20.000] Reusing resolution of module 'pkg0' from '/src/project/cFileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Info 89   [00:02:21.000] Reusing resolution of module './aFileWithImports' from '/src/project/bFileWithImports.ts' of old program, it was successfully resolved to '/src/project/aFileWithImports.ts'.
Info 90   [00:02:22.000] Reusing resolution of module './bRandomFileForImport' from '/src/project/bFileWithImports.ts' of old program, it was successfully resolved to '/src/project/bRandomFileForImport.ts'.
Info 91   [00:02:23.000] Reusing resolution of module 'pkg0' from '/src/project/bFileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 92   [00:02:24.000] Reusing resolution of module 'pkg0' from '/src/project/aFileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 93   [00:02:25.000] Reusing resolution of module './aRandomFileForImport' from '/src/project/aFileWithImports.ts' of old program, it was successfully resolved to '/src/project/aRandomFileForImport.ts'.
Info 94   [00:02:26.000] Reusing resolution of module './aRandomFileForImport2' from '/src/project/aFileWithImports.ts' of old program, it was successfully resolved to '/src/project/aRandomFileForImport2.ts'.
Info 95   [00:02:27.000] ======== Resolving module 'pkg0' from '/src/project/cRandomFileForImport.ts'. ========
Info 96   [00:02:28.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 97   [00:02:29.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
Info 98   [00:02:30.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 99   [00:02:31.000] Different program with same set of files