Info 0    [16:00:27.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:28.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/fileA.ts"
      }
    }
Before request
//// [/user/username/projects/myproject/src/tsconfig.json]
{"compilerOptions":{"target":"es2016","module":"Node16","outDir":"../out","traceResolution":true}}

//// [/user/username/projects/myproject/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/user/username/projects/myproject/src/fileB.mts]
export function foo() {
}


//// [/user/username/projects/myproject/package.json]
{"name":"app","version":"1.0.0"}

//// [/a/lib/lib.es2016.full.d.ts]
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

Info 2    [16:00:29.000] Search path: /user/username/projects/myproject/src
Info 3    [16:00:30.000] For info: /user/username/projects/myproject/src/fileA.ts :: Config file name: /user/username/projects/myproject/src/tsconfig.json
Info 4    [16:00:31.000] Creating configuration project /user/username/projects/myproject/src/tsconfig.json
Info 5    [16:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Config file
Info 6    [16:00:33.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/src/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/fileA.ts to open"}}
Info 7    [16:00:34.000] Config: /user/username/projects/myproject/src/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/fileA.ts",
  "/user/username/projects/myproject/src/fileB.mts"
 ],
 "options": {
  "target": 3,
  "module": 100,
  "outDir": "/user/username/projects/myproject/out",
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
 }
}
Info 8    [16:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:37.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileB.mts 500 undefined WatchType: Closed Script info
Info 12   [16:00:39.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 13   [16:00:40.000] File '/user/username/projects/myproject/src/package.json' does not exist.
Info 14   [16:00:41.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 15   [16:00:42.000] 'package.json' does not have a 'typesVersions' field.
Info 16   [16:00:43.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 17   [16:00:44.000] Module resolution kind is not specified, using 'Node16'.
Info 18   [16:00:45.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 19   [16:00:46.000] File '/user/username/projects/myproject/src/fileB.mjs.ts' does not exist.
Info 20   [16:00:47.000] File '/user/username/projects/myproject/src/fileB.mjs.tsx' does not exist.
Info 21   [16:00:48.000] File '/user/username/projects/myproject/src/fileB.mjs.d.ts' does not exist.
Info 22   [16:00:49.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 23   [16:00:50.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 24   [16:00:51.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 25   [16:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 26   [16:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [16:00:54.000] File '/a/lib/package.json' does not exist.
Info 28   [16:00:55.000] File '/a/package.json' does not exist.
Info 29   [16:00:56.000] File '/package.json' does not exist.
Info 30   [16:00:57.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info 31   [16:00:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 32   [16:00:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 33   [16:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 34   [16:01:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 35   [16:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 36   [16:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 37   [16:01:04.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 38   [16:01:05.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 39   [16:01:06.000] 	Files (3)
	/a/lib/lib.es2016.full.d.ts
	/user/username/projects/myproject/src/fileB.mts
	/user/username/projects/myproject/src/fileA.ts


	../../../../../a/lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	fileB.mts
	  Imported via "./fileB.mjs" from file 'fileA.ts'
	  Matched by default include pattern '**/*'
	fileA.ts
	  Matched by default include pattern '**/*'
	  File is CommonJS module because '../package.json' does not have field "type"

Info 40   [16:01:07.000] -----------------------------------------------
Info 41   [16:01:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 42   [16:01:09.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/src/tsconfig.json"}}
Info 43   [16:01:10.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"f026568af42c61ce0537de8ee0fa07c9359a76dcfb046248ed49dc76c91e4a37","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":68,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"target":"es2016","module":"node16","outDir":"","traceResolution":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 44   [16:01:11.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/fileA.ts","configFile":"/user/username/projects/myproject/src/tsconfig.json","diagnostics":[]}}
Info 45   [16:01:12.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 45   [16:01:13.000] 	Files (3)

Info 45   [16:01:14.000] -----------------------------------------------
Info 45   [16:01:15.000] Open files: 
Info 45   [16:01:16.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 45   [16:01:17.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/user/username/projects/myproject/src:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 45   [16:01:18.000] response:
    {
      "responseRequired": false
    }
Info 46   [16:01:19.000] Modify package json file to add type module
Info 47   [16:01:23.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 48   [16:01:24.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 49   [16:01:25.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 50   [16:01:26.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 51   [16:01:27.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Before running timeout callbacks
//// [/user/username/projects/myproject/package.json]
{"name":"app","version":"1.0.0","type":"module"}


PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/user/username/projects/myproject/src:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 52   [16:01:28.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 53   [16:01:29.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 54   [16:01:30.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/user/username/projects/myproject/src:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/user/username/projects/myproject/src:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 55   [16:01:31.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 56   [16:01:32.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 57   [16:01:33.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 58   [16:01:34.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 59   [16:01:35.000] File '/package.json' does not exist according to earlier cached lookups.
Info 60   [16:01:36.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 61   [16:01:37.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 62   [16:01:38.000] 'package.json' does not have a 'typesVersions' field.
Info 63   [16:01:39.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 64   [16:01:40.000] File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Info 65   [16:01:41.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 66   [16:01:42.000] Module resolution kind is not specified, using 'Node16'.
Info 67   [16:01:43.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 68   [16:01:44.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 69   [16:01:45.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 70   [16:01:46.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 71   [16:01:47.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 72   [16:01:48.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 73   [16:01:49.000] File '/package.json' does not exist according to earlier cached lookups.
Info 74   [16:01:50.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 75   [16:01:51.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 76   [16:01:52.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 77   [16:01:53.000] Different program with same set of files
Info 78   [16:01:54.000] Running: *ensureProjectForOpenFiles*
Info 79   [16:01:55.000] Before ensureProjectForOpenFiles:
Info 80   [16:01:56.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 80   [16:01:57.000] 	Files (3)

Info 80   [16:01:58.000] -----------------------------------------------
Info 80   [16:01:59.000] Open files: 
Info 80   [16:02:00.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 80   [16:02:01.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 80   [16:02:02.000] After ensureProjectForOpenFiles:
Info 81   [16:02:03.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 81   [16:02:04.000] 	Files (3)

Info 81   [16:02:05.000] -----------------------------------------------
Info 81   [16:02:06.000] Open files: 
Info 81   [16:02:07.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 81   [16:02:08.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 81   [16:02:09.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 82   [16:02:10.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/myproject/src/fileA.ts"]}}
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 83   [16:02:11.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/fileA.ts"
        ]
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

After request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 84   [16:02:12.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 85   [16:02:13.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 86   [16:02:14.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 87   [16:02:15.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 88   [16:02:16.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 89   [16:02:17.000] Modify package json file to remove type module
Info 90   [16:02:21.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 91   [16:02:22.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 92   [16:02:23.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 93   [16:02:24.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 94   [16:02:25.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Before running timeout callbacks
//// [/user/username/projects/myproject/package.json]
{"name":"app","version":"1.0.0"}


PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 95   [16:02:26.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 96   [16:02:27.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 97   [16:02:28.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 98   [16:02:29.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 99   [16:02:30.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 100  [16:02:31.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 101  [16:02:32.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 102  [16:02:33.000] File '/package.json' does not exist according to earlier cached lookups.
Info 103  [16:02:34.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 104  [16:02:35.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 105  [16:02:36.000] 'package.json' does not have a 'typesVersions' field.
Info 106  [16:02:37.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 107  [16:02:38.000] File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Info 108  [16:02:39.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 109  [16:02:40.000] Module resolution kind is not specified, using 'Node16'.
Info 110  [16:02:41.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 111  [16:02:42.000] File '/user/username/projects/myproject/src/fileB.mjs.ts' does not exist.
Info 112  [16:02:43.000] File '/user/username/projects/myproject/src/fileB.mjs.tsx' does not exist.
Info 113  [16:02:44.000] File '/user/username/projects/myproject/src/fileB.mjs.d.ts' does not exist.
Info 114  [16:02:45.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 115  [16:02:46.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 116  [16:02:47.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 117  [16:02:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 118  [16:02:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 119  [16:02:50.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 120  [16:02:51.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 121  [16:02:52.000] File '/package.json' does not exist according to earlier cached lookups.
Info 122  [16:02:53.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 123  [16:02:54.000] Different program with same set of files
Info 124  [16:02:55.000] Running: *ensureProjectForOpenFiles*
Info 125  [16:02:56.000] Before ensureProjectForOpenFiles:
Info 126  [16:02:57.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 126  [16:02:58.000] 	Files (3)

Info 126  [16:02:59.000] -----------------------------------------------
Info 126  [16:03:00.000] Open files: 
Info 126  [16:03:01.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 126  [16:03:02.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 126  [16:03:03.000] After ensureProjectForOpenFiles:
Info 127  [16:03:04.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 127  [16:03:05.000] 	Files (3)

Info 127  [16:03:06.000] -----------------------------------------------
Info 127  [16:03:07.000] Open files: 
Info 127  [16:03:08.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 127  [16:03:09.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 127  [16:03:10.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 128  [16:03:11.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/myproject/src/fileA.ts"]}}
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 129  [16:03:12.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/fileA.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

After request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 130  [16:03:13.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 131  [16:03:14.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 132  [16:03:15.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":34},"text":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.\n  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/user/username/projects/myproject/package.json'.","code":1479,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 133  [16:03:16.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 134  [16:03:17.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 135  [16:03:18.000] Delete package.json
Info 136  [16:03:20.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 137  [16:03:21.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 138  [16:03:22.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 139  [16:03:23.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 140  [16:03:24.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 141  [16:03:25.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Before running timeout callbacks
//// [/user/username/projects/myproject/package.json] deleted

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 142  [16:03:26.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 143  [16:03:27.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 144  [16:03:28.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 145  [16:03:29.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 146  [16:03:30.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 147  [16:03:31.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 148  [16:03:32.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 149  [16:03:33.000] File '/package.json' does not exist according to earlier cached lookups.
Info 150  [16:03:34.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 151  [16:03:35.000] File '/user/username/projects/myproject/package.json' does not exist.
Info 152  [16:03:36.000] File '/user/username/projects/package.json' does not exist.
Info 153  [16:03:37.000] File '/user/username/package.json' does not exist.
Info 154  [16:03:38.000] File '/user/package.json' does not exist.
Info 155  [16:03:39.000] File '/package.json' does not exist according to earlier cached lookups.
Info 156  [16:03:40.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 157  [16:03:41.000] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info 158  [16:03:42.000] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info 159  [16:03:43.000] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info 160  [16:03:44.000] File '/user/package.json' does not exist according to earlier cached lookups.
Info 161  [16:03:45.000] File '/package.json' does not exist according to earlier cached lookups.
Info 162  [16:03:46.000] Reusing resolution of module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'.
Info 163  [16:03:47.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 164  [16:03:48.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 165  [16:03:49.000] File '/package.json' does not exist according to earlier cached lookups.
Info 166  [16:03:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 167  [16:03:51.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 168  [16:03:52.000] Different program with same set of files
Info 169  [16:03:53.000] Running: *ensureProjectForOpenFiles*
Info 170  [16:03:54.000] Before ensureProjectForOpenFiles:
Info 171  [16:03:55.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 171  [16:03:56.000] 	Files (3)

Info 171  [16:03:57.000] -----------------------------------------------
Info 171  [16:03:58.000] Open files: 
Info 171  [16:03:59.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 171  [16:04:00.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 171  [16:04:01.000] After ensureProjectForOpenFiles:
Info 172  [16:04:02.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 172  [16:04:03.000] 	Files (3)

Info 172  [16:04:04.000] -----------------------------------------------
Info 172  [16:04:05.000] Open files: 
Info 172  [16:04:06.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 172  [16:04:07.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 172  [16:04:08.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 173  [16:04:09.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/myproject/src/fileA.ts"]}}
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 174  [16:04:10.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/fileA.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

After request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 175  [16:04:11.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 176  [16:04:12.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 177  [16:04:13.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":34},"text":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.\n  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ \"type\": \"module\" }`.","code":1479,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 178  [16:04:14.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 179  [16:04:15.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 180  [16:04:16.000] Modify package json file to add type module
Info 181  [16:04:19.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 0:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 182  [16:04:20.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 183  [16:04:21.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 0:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Before running timeout callbacks
//// [/user/username/projects/myproject/package.json]
{"name":"app","version":"1.0.0","type":"module"}


PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 184  [16:04:22.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 185  [16:04:23.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 186  [16:04:24.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 187  [16:04:25.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 188  [16:04:26.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 189  [16:04:27.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 190  [16:04:28.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 191  [16:04:29.000] File '/package.json' does not exist according to earlier cached lookups.
Info 192  [16:04:30.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 193  [16:04:31.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 194  [16:04:32.000] 'package.json' does not have a 'typesVersions' field.
Info 195  [16:04:33.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 196  [16:04:34.000] File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Info 197  [16:04:35.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 198  [16:04:36.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 199  [16:04:37.000] File '/package.json' does not exist according to earlier cached lookups.
Info 200  [16:04:38.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 201  [16:04:39.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 202  [16:04:40.000] Different program with same set of files
Info 203  [16:04:41.000] Running: *ensureProjectForOpenFiles*
Info 204  [16:04:42.000] Before ensureProjectForOpenFiles:
Info 205  [16:04:43.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 205  [16:04:44.000] 	Files (3)

Info 205  [16:04:45.000] -----------------------------------------------
Info 205  [16:04:46.000] Open files: 
Info 205  [16:04:47.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 205  [16:04:48.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 205  [16:04:49.000] After ensureProjectForOpenFiles:
Info 206  [16:04:50.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 206  [16:04:51.000] 	Files (3)

Info 206  [16:04:52.000] -----------------------------------------------
Info 206  [16:04:53.000] Open files: 
Info 206  [16:04:54.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 206  [16:04:55.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 206  [16:04:56.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 207  [16:04:57.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/myproject/src/fileA.ts"]}}
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 208  [16:04:58.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/fileA.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

After request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 209  [16:04:59.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 210  [16:05:00.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 211  [16:05:01.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 212  [16:05:02.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 213  [16:05:03.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":4}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 214  [16:05:04.000] Delete package.json
Info 215  [16:05:06.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 216  [16:05:07.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 217  [16:05:08.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Before running timeout callbacks
//// [/user/username/projects/myproject/package.json] deleted

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 218  [16:05:09.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 219  [16:05:10.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 220  [16:05:11.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 221  [16:05:12.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 222  [16:05:13.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 223  [16:05:14.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 224  [16:05:15.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 225  [16:05:16.000] File '/package.json' does not exist according to earlier cached lookups.
Info 226  [16:05:17.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 227  [16:05:18.000] File '/user/username/projects/myproject/package.json' does not exist.
Info 228  [16:05:19.000] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info 229  [16:05:20.000] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info 230  [16:05:21.000] File '/user/package.json' does not exist according to earlier cached lookups.
Info 231  [16:05:22.000] File '/package.json' does not exist according to earlier cached lookups.
Info 232  [16:05:23.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 233  [16:05:24.000] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info 234  [16:05:25.000] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info 235  [16:05:26.000] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info 236  [16:05:27.000] File '/user/package.json' does not exist according to earlier cached lookups.
Info 237  [16:05:28.000] File '/package.json' does not exist according to earlier cached lookups.
Info 238  [16:05:29.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 239  [16:05:30.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 240  [16:05:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 241  [16:05:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 242  [16:05:33.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 243  [16:05:34.000] Different program with same set of files
Info 244  [16:05:35.000] Running: *ensureProjectForOpenFiles*
Info 245  [16:05:36.000] Before ensureProjectForOpenFiles:
Info 246  [16:05:37.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 246  [16:05:38.000] 	Files (3)

Info 246  [16:05:39.000] -----------------------------------------------
Info 246  [16:05:40.000] Open files: 
Info 246  [16:05:41.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 246  [16:05:42.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 246  [16:05:43.000] After ensureProjectForOpenFiles:
Info 247  [16:05:44.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 247  [16:05:45.000] 	Files (3)

Info 247  [16:05:46.000] -----------------------------------------------
Info 247  [16:05:47.000] Open files: 
Info 247  [16:05:48.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 247  [16:05:49.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 247  [16:05:50.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 248  [16:05:51.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/myproject/src/fileA.ts"]}}
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 249  [16:05:52.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/fileA.ts"
        ]
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

After request

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 250  [16:05:53.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 251  [16:05:54.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 252  [16:05:55.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":34},"text":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.\n  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ \"type\": \"module\" }`.","code":1479,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 253  [16:05:56.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 254  [16:05:57.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":5}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/src/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {}
/user/username/projects/myproject/src/fileb.mts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
