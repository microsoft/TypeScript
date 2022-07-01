Info 0    [00:00:39.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:40.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/sample1/tests/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
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

//// [/user/username/projects/sample1/core/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "skipDefaultLibCheck": true,
        "cacheResolutions": true,
        "traceResolution": true
    }
}

//// [/user/username/projects/sample1/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


//// [/user/username/projects/sample1/core/anotherModule.ts]
export const World = "hello";


//// [/user/username/projects/sample1/core/some_decl.d.ts]
declare const dts: any;


//// [/user/username/projects/sample1/logic/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "sourceMap": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true,
        "cacheResolutions": true,
        "traceResolution": true
    },
    "references": [
        {
            "path": "../core"
        }
    ]
}

//// [/user/username/projects/sample1/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;


//// [/user/username/projects/sample1/tests/tsconfig.json]
{
    "references": [
        {
            "path": "../core"
        },
        {
            "path": "../logic"
        }
    ],
    "files": [
        "index.ts"
    ],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true,
        "cacheResolutions": true,
        "traceResolution": true
    }
}

//// [/user/username/projects/sample1/tests/index.ts]
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;



PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:41.000] Search path: /user/username/projects/sample1/tests
Info 3    [00:00:42.000] For info: /user/username/projects/sample1/tests/index.ts :: Config file name: /user/username/projects/sample1/tests/tsconfig.json
Info 4    [00:00:43.000] Creating configuration project /user/username/projects/sample1/tests/tsconfig.json
Info 5    [00:00:44.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 6    [00:00:45.000] Config: /user/username/projects/sample1/tests/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/tests/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/tests/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  },
  {
   "path": "/user/username/projects/sample1/logic",
   "originalPath": "../logic"
  }
 ]
}
Info 7    [00:00:46.000] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info 8    [00:00:47.000] Config: /user/username/projects/sample1/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/core/anotherModule.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/some_decl.d.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "declarationMap": true,
  "skipDefaultLibCheck": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
 }
}
Info 9    [00:00:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 10   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info 11   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info 12   [00:00:51.000] Config: /user/username/projects/sample1/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  }
 ]
}
Info 13   [00:00:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 14   [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info 15   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info 16   [00:00:55.000] ======== Resolving module '../core/index' from '/user/username/projects/sample1/tests/index.ts'. ========
Info 17   [00:00:56.000] Module resolution kind is not specified, using 'NodeJs'.
Info 18   [00:00:57.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/index', target file types: TypeScript, Declaration.
Info 19   [00:00:58.000] File '/user/username/projects/sample1/core/index.ts' exist - use it as a name resolution result.
Info 20   [00:00:59.000] ======== Module name '../core/index' was successfully resolved to '/user/username/projects/sample1/core/index.ts'. ========
Info 21   [00:01:00.000] ======== Resolving module '../logic/index' from '/user/username/projects/sample1/tests/index.ts'. ========
Info 22   [00:01:01.000] Module resolution kind is not specified, using 'NodeJs'.
Info 23   [00:01:02.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/logic/index', target file types: TypeScript, Declaration.
Info 24   [00:01:03.000] File '/user/username/projects/sample1/logic/index.ts' exist - use it as a name resolution result.
Info 25   [00:01:04.000] ======== Module name '../logic/index' was successfully resolved to '/user/username/projects/sample1/logic/index.ts'. ========
Info 26   [00:01:05.000] ======== Resolving module '../core/anotherModule' from '/user/username/projects/sample1/tests/index.ts'. ========
Info 27   [00:01:06.000] Module resolution kind is not specified, using 'NodeJs'.
Info 28   [00:01:07.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/anotherModule', target file types: TypeScript, Declaration.
Info 29   [00:01:08.000] File '/user/username/projects/sample1/core/anotherModule.ts' exist - use it as a name resolution result.
Info 30   [00:01:09.000] ======== Module name '../core/anotherModule' was successfully resolved to '/user/username/projects/sample1/core/anotherModule.ts'. ========
Info 31   [00:01:10.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/index.ts 500 undefined WatchType: Closed Script info
Info 32   [00:01:11.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Info 33   [00:01:12.000] ======== Resolving module '../core/index' from '/user/username/projects/sample1/logic/index.ts'. ========
Info 34   [00:01:13.000] Using compiler options of project reference redirect '/user/username/projects/sample1/logic/tsconfig.json'.
Info 35   [00:01:14.000] Module resolution kind is not specified, using 'NodeJs'.
Info 36   [00:01:15.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/index', target file types: TypeScript, Declaration.
Info 37   [00:01:16.000] File '/user/username/projects/sample1/core/index.ts' exist - use it as a name resolution result.
Info 38   [00:01:17.000] ======== Module name '../core/index' was successfully resolved to '/user/username/projects/sample1/core/index.ts'. ========
Info 39   [00:01:18.000] ======== Resolving module '../core/anotherModule' from '/user/username/projects/sample1/logic/index.ts'. ========
Info 40   [00:01:19.000] Using compiler options of project reference redirect '/user/username/projects/sample1/logic/tsconfig.json'.
Info 41   [00:01:20.000] Module resolution kind is not specified, using 'NodeJs'.
Info 42   [00:01:21.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/anotherModule', target file types: TypeScript, Declaration.
Info 43   [00:01:22.000] File '/user/username/projects/sample1/core/anotherModule.ts' exist - use it as a name resolution result.
Info 44   [00:01:23.000] ======== Module name '../core/anotherModule' was successfully resolved to '/user/username/projects/sample1/core/anotherModule.ts'. ========
Info 45   [00:01:24.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/anotherModule.ts 500 undefined WatchType: Closed Script info
Info 46   [00:01:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 47   [00:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 48   [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 49   [00:01:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 50   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 51   [00:01:30.000] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 52   [00:01:31.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 53   [00:01:32.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/sample1/core/index.ts
	/user/username/projects/sample1/core/anotherModule.ts
	/user/username/projects/sample1/logic/index.ts
	/user/username/projects/sample1/tests/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../core/index.ts
	  Imported via '../core/index' from file 'index.ts'
	  Imported via '../core/index' from file '../logic/index.ts'
	../core/anotherModule.ts
	  Imported via '../core/anotherModule' from file '../logic/index.ts'
	  Imported via '../core/anotherModule' from file 'index.ts'
	../logic/index.ts
	  Imported via '../logic/index' from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 54   [00:01:33.000] -----------------------------------------------
Info 55   [00:01:34.000] Search path: /user/username/projects/sample1/tests
Info 56   [00:01:35.000] For info: /user/username/projects/sample1/tests/tsconfig.json :: No config files found.
Info 57   [00:01:36.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 57   [00:01:37.000] 	Files (5)

Info 57   [00:01:38.000] -----------------------------------------------
Info 57   [00:01:39.000] Open files: 
Info 57   [00:01:40.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 57   [00:01:41.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
After request

PolledWatches::
/user/username/projects/sample1/tests/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/sample1/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/sample1/tests/tsconfig.json:
  {}
/user/username/projects/sample1/core/tsconfig.json:
  {}
/user/username/projects/sample1/logic/tsconfig.json:
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/logic/index.ts:
  {}
/user/username/projects/sample1/core/anothermodule.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {}
/user/username/projects/sample1/logic:
  {}

Info 57   [00:01:42.000] response:
    {
      "responseRequired": false
    }