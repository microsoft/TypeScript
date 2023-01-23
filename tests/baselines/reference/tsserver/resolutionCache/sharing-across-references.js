Info 0    [00:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:30.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/projects/app/appB.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/src/projects/node_modules/moduleX/index.d.ts]
export const x = 10;

//// [/src/projects/common/tsconfig.json]
{"compilerOptions":{"composite":true,"traceResolution":true}}

//// [/src/projects/common/moduleA.ts]
export const a = 10;

//// [/src/projects/common/moduleB.ts]
import { x } from "moduleX";
export const b = x;


//// [/src/projects/app/tsconfig.json]
{"compilerOptions":{"composite":true,"traceResolution":true},"references":[{"path":"../common"}]}

//// [/src/projects/app/appA.ts]
import { x } from "moduleX";
export const y = x;


//// [/src/projects/app/appB.ts]
import { x } from "../common/moduleB";
export const y = x;



PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:31.000] Search path: /src/projects/app
Info 3    [00:00:32.000] For info: /src/projects/app/appB.ts :: Config file name: /src/projects/app/tsconfig.json
Info 4    [00:00:33.000] Creating configuration project /src/projects/app/tsconfig.json
Info 5    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /src/projects/app/tsconfig.json 2000 undefined Project: /src/projects/app/tsconfig.json WatchType: Config file
Info 6    [00:00:35.000] Config: /src/projects/app/tsconfig.json : {
 "rootNames": [
  "/src/projects/app/appA.ts",
  "/src/projects/app/appB.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/src/projects/app/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/src/projects/common",
   "originalPath": "../common"
  }
 ]
}
Info 7    [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /src/projects/app 1 undefined Config: /src/projects/app/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/app 1 undefined Config: /src/projects/app/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /src/projects/app/appA.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:39.000] Starting updateGraphWorker: Project: /src/projects/app/tsconfig.json
Info 11   [00:00:40.000] Config: /src/projects/common/tsconfig.json : {
 "rootNames": [
  "/src/projects/common/moduleA.ts",
  "/src/projects/common/moduleB.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/src/projects/common/tsconfig.json"
 }
}
Info 12   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /src/projects/common/tsconfig.json 2000 undefined Project: /src/projects/app/tsconfig.json WatchType: Config file
Info 13   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /src/projects/common 1 undefined Config: /src/projects/common/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/common 1 undefined Config: /src/projects/common/tsconfig.json WatchType: Wild card directory
Info 15   [00:00:44.000] ======== Resolving module 'moduleX' from '/src/projects/app/appA.ts'. ========
Info 16   [00:00:45.000] Module resolution kind is not specified, using 'Node10'.
Info 17   [00:00:46.000] Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 18   [00:00:47.000] Directory '/src/projects/app/node_modules' does not exist, skipping all lookups in it.
Info 19   [00:00:48.000] File '/src/projects/node_modules/moduleX/package.json' does not exist.
Info 20   [00:00:49.000] File '/src/projects/node_modules/moduleX.ts' does not exist.
Info 21   [00:00:50.000] File '/src/projects/node_modules/moduleX.tsx' does not exist.
Info 22   [00:00:51.000] File '/src/projects/node_modules/moduleX.d.ts' does not exist.
Info 23   [00:00:52.000] File '/src/projects/node_modules/moduleX/index.ts' does not exist.
Info 24   [00:00:53.000] File '/src/projects/node_modules/moduleX/index.tsx' does not exist.
Info 25   [00:00:54.000] File '/src/projects/node_modules/moduleX/index.d.ts' exist - use it as a name resolution result.
Info 26   [00:00:55.000] Resolving real path for '/src/projects/node_modules/moduleX/index.d.ts', result '/src/projects/node_modules/moduleX/index.d.ts'.
Info 27   [00:00:56.000] ======== Module name 'moduleX' was successfully resolved to '/src/projects/node_modules/moduleX/index.d.ts'. ========
Info 28   [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 29   [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 30   [00:00:59.000] ======== Resolving module '../common/moduleB' from '/src/projects/app/appB.ts'. ========
Info 31   [00:01:00.000] Module resolution kind is not specified, using 'Node10'.
Info 32   [00:01:01.000] Loading module as file / folder, candidate module location '/src/projects/common/moduleB', target file types: TypeScript, Declaration.
Info 33   [00:01:02.000] File '/src/projects/common/moduleB.ts' exist - use it as a name resolution result.
Info 34   [00:01:03.000] ======== Module name '../common/moduleB' was successfully resolved to '/src/projects/common/moduleB.ts'. ========
Info 35   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /src/projects/common/moduleB.ts 500 undefined WatchType: Closed Script info
Info 36   [00:01:05.000] ======== Resolving module 'moduleX' from '/src/projects/common/moduleB.ts'. ========
Info 37   [00:01:06.000] Using compiler options of project reference redirect '/src/projects/common/tsconfig.json'.
Info 38   [00:01:07.000] Module resolution kind is not specified, using 'Node10'.
Info 39   [00:01:08.000] Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 40   [00:01:09.000] Directory '/src/projects/common/node_modules' does not exist, skipping all lookups in it.
Info 41   [00:01:10.000] Resolution for module 'moduleX' was found in cache from location '/src/projects'.
Info 42   [00:01:11.000] ======== Module name 'moduleX' was successfully resolved to '/src/projects/node_modules/moduleX/index.d.ts'. ========
Info 43   [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /src/projects/app/node_modules 1 undefined Project: /src/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info 44   [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/app/node_modules 1 undefined Project: /src/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info 45   [00:01:14.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /src/projects/app/tsconfig.json WatchType: Missing file
Info 46   [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /src/projects/app/node_modules/@types 1 undefined Project: /src/projects/app/tsconfig.json WatchType: Type roots
Info 47   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/app/node_modules/@types 1 undefined Project: /src/projects/app/tsconfig.json WatchType: Type roots
Info 48   [00:01:17.000] Finishing updateGraphWorker: Project: /src/projects/app/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 49   [00:01:18.000] Project '/src/projects/app/tsconfig.json' (Configured)
Info 50   [00:01:19.000] 	Files (4)
	/src/projects/node_modules/moduleX/index.d.ts
	/src/projects/app/appA.ts
	/src/projects/common/moduleB.ts
	/src/projects/app/appB.ts


	../node_modules/moduleX/index.d.ts
	  Imported via "moduleX" from file 'appA.ts'
	  Imported via "moduleX" from file '../common/moduleB.ts'
	appA.ts
	  Matched by default include pattern '**/*'
	../common/moduleB.ts
	  Imported via "../common/moduleB" from file 'appB.ts'
	appB.ts
	  Matched by default include pattern '**/*'

Info 51   [00:01:20.000] -----------------------------------------------
Info 52   [00:01:21.000] Search path: /src/projects/app
Info 53   [00:01:22.000] For info: /src/projects/app/tsconfig.json :: No config files found.
Info 54   [00:01:23.000] Project '/src/projects/app/tsconfig.json' (Configured)
Info 54   [00:01:24.000] 	Files (4)

Info 54   [00:01:25.000] -----------------------------------------------
Info 54   [00:01:26.000] Open files: 
Info 54   [00:01:27.000] 	FileName: /src/projects/app/appB.ts ProjectRootPath: undefined
Info 54   [00:01:28.000] 		Projects: /src/projects/app/tsconfig.json
After request

PolledWatches::
/src/projects/app/node_modules:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/src/projects/app/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/app/tsconfig.json:
  {}
/src/projects/app/appa.ts:
  {}
/src/projects/common/tsconfig.json:
  {}
/src/projects/common/moduleb.ts:
  {}

FsWatchesRecursive::
/src/projects/app:
  {}
/src/projects/common:
  {}
/src/projects/node_modules:
  {}

Info 54   [00:01:29.000] response:
    {
      "responseRequired": false
    }