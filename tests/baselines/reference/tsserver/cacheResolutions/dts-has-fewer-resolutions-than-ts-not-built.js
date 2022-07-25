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
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true}}

//// [/user/username/projects/sample1/core/index.ts]
export function bar() { return 10; }

//// [/user/username/projects/sample1/core/myClass.ts]
export class myClass { }

//// [/user/username/projects/sample1/core/anotherClass.ts]
export class anotherClass { }

//// [/user/username/projects/sample1/logic/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"references":[{"path":"../core"}]}

//// [/user/username/projects/sample1/logic/index.ts]
import { myClass } from "../core/myClass";
import { bar } from "../core";
import { anotherClass } from "../core/anotherClass";
export function returnMyClass() {
    bar();
    return new myClass();
}
export function returnAnotherClass() {
    return new anotherClass();
}


//// [/user/username/projects/sample1/tests/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"references":[{"path":"../logic"}]}

//// [/user/username/projects/sample1/tests/index.ts]
import { returnMyClass } from "../logic";
returnMyClass();



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
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/tests/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/logic",
   "originalPath": "../logic"
  }
 ]
}
Info 7    [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests 1 undefined Config: /user/username/projects/sample1/tests/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests 1 undefined Config: /user/username/projects/sample1/tests/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:48.000] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info 10   [00:00:49.000] Config: /user/username/projects/sample1/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/logic/index.ts"
 ],
 "options": {
  "composite": true,
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
Info 11   [00:00:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 12   [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:53.000] Config: /user/username/projects/sample1/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/core/anotherClass.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/myClass.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
 }
}
Info 15   [00:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 16   [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info 17   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info 18   [00:00:57.000] ======== Resolving module '../logic' from '/user/username/projects/sample1/tests/index.ts'. ========
Info 19   [00:00:58.000] Module resolution kind is not specified, using 'NodeJs'.
Info 20   [00:00:59.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/logic', target file types: TypeScript, Declaration.
Info 21   [00:01:00.000] File '/user/username/projects/sample1/logic.ts' does not exist.
Info 22   [00:01:01.000] File '/user/username/projects/sample1/logic.tsx' does not exist.
Info 23   [00:01:02.000] File '/user/username/projects/sample1/logic.d.ts' does not exist.
Info 24   [00:01:03.000] File '/user/username/projects/sample1/logic/package.json' does not exist.
Info 25   [00:01:04.000] File '/user/username/projects/sample1/logic/index.ts' exist - use it as a name resolution result.
Info 26   [00:01:05.000] ======== Module name '../logic' was successfully resolved to '/user/username/projects/sample1/logic/index.ts'. ========
Info 27   [00:01:06.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Info 28   [00:01:07.000] ======== Resolving module '../core/myClass' from '/user/username/projects/sample1/logic/index.ts'. ========
Info 29   [00:01:08.000] Using compiler options of project reference redirect '/user/username/projects/sample1/logic/tsconfig.json'.
Info 30   [00:01:09.000] Module resolution kind is not specified, using 'NodeJs'.
Info 31   [00:01:10.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/myClass', target file types: TypeScript, Declaration.
Info 32   [00:01:11.000] File '/user/username/projects/sample1/core/myClass.ts' exist - use it as a name resolution result.
Info 33   [00:01:12.000] ======== Module name '../core/myClass' was successfully resolved to '/user/username/projects/sample1/core/myClass.ts'. ========
Info 34   [00:01:13.000] ======== Resolving module '../core' from '/user/username/projects/sample1/logic/index.ts'. ========
Info 35   [00:01:14.000] Using compiler options of project reference redirect '/user/username/projects/sample1/logic/tsconfig.json'.
Info 36   [00:01:15.000] Module resolution kind is not specified, using 'NodeJs'.
Info 37   [00:01:16.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/core', target file types: TypeScript, Declaration.
Info 38   [00:01:17.000] File '/user/username/projects/sample1/core.ts' does not exist.
Info 39   [00:01:18.000] File '/user/username/projects/sample1/core.tsx' does not exist.
Info 40   [00:01:19.000] File '/user/username/projects/sample1/core.d.ts' does not exist.
Info 41   [00:01:20.000] File '/user/username/projects/sample1/core/package.json' does not exist.
Info 42   [00:01:21.000] File '/user/username/projects/sample1/core/index.ts' exist - use it as a name resolution result.
Info 43   [00:01:22.000] ======== Module name '../core' was successfully resolved to '/user/username/projects/sample1/core/index.ts'. ========
Info 44   [00:01:23.000] ======== Resolving module '../core/anotherClass' from '/user/username/projects/sample1/logic/index.ts'. ========
Info 45   [00:01:24.000] Using compiler options of project reference redirect '/user/username/projects/sample1/logic/tsconfig.json'.
Info 46   [00:01:25.000] Module resolution kind is not specified, using 'NodeJs'.
Info 47   [00:01:26.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/anotherClass', target file types: TypeScript, Declaration.
Info 48   [00:01:27.000] File '/user/username/projects/sample1/core/anotherClass.ts' exist - use it as a name resolution result.
Info 49   [00:01:28.000] ======== Module name '../core/anotherClass' was successfully resolved to '/user/username/projects/sample1/core/anotherClass.ts'. ========
Info 50   [00:01:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/myClass.ts 500 undefined WatchType: Closed Script info
Info 51   [00:01:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/index.ts 500 undefined WatchType: Closed Script info
Info 52   [00:01:31.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/anotherClass.ts 500 undefined WatchType: Closed Script info
Info 53   [00:01:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 54   [00:01:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 55   [00:01:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 56   [00:01:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 57   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 58   [00:01:37.000] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [00:01:38.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 60   [00:01:39.000] 	Files (6)
	/a/lib/lib.d.ts
	/user/username/projects/sample1/core/myClass.ts
	/user/username/projects/sample1/core/index.ts
	/user/username/projects/sample1/core/anotherClass.ts
	/user/username/projects/sample1/logic/index.ts
	/user/username/projects/sample1/tests/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../core/myClass.ts
	  Imported via "../core/myClass" from file '../logic/index.ts'
	../core/index.ts
	  Imported via "../core" from file '../logic/index.ts'
	../core/anotherClass.ts
	  Imported via "../core/anotherClass" from file '../logic/index.ts'
	../logic/index.ts
	  Imported via "../logic" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 61   [00:01:40.000] -----------------------------------------------
Info 62   [00:01:41.000] Search path: /user/username/projects/sample1/tests
Info 63   [00:01:42.000] For info: /user/username/projects/sample1/tests/tsconfig.json :: No config files found.
Info 64   [00:01:43.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 64   [00:01:44.000] 	Files (6)

Info 64   [00:01:45.000] -----------------------------------------------
Info 64   [00:01:46.000] Open files: 
Info 64   [00:01:47.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 64   [00:01:48.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
After request

PolledWatches::
/user/username/projects/sample1/tests/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/sample1/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/sample1/tests/tsconfig.json:
  {}
/user/username/projects/sample1/logic/tsconfig.json:
  {}
/user/username/projects/sample1/core/tsconfig.json:
  {}
/user/username/projects/sample1/logic/index.ts:
  {}
/user/username/projects/sample1/core/myclass.ts:
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/core/anotherclass.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/tests:
  {}
/user/username/projects/sample1/logic:
  {}
/user/username/projects/sample1/core:
  {}

Info 64   [00:01:49.000] response:
    {
      "responseRequired": false
    }