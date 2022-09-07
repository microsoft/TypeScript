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
{"name":"app","version":"1.0.0","type":"module"}

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
Info 19   [16:00:46.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 20   [16:00:47.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 21   [16:00:48.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 22   [16:00:49.000] File '/a/lib/package.json' does not exist.
Info 23   [16:00:50.000] File '/a/package.json' does not exist.
Info 24   [16:00:51.000] File '/package.json' does not exist.
Info 25   [16:00:52.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info 26   [16:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 27   [16:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 28   [16:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 29   [16:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 30   [16:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 31   [16:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 32   [16:00:59.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 33   [16:01:00.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 34   [16:01:01.000] 	Files (3)
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
	  File is ECMAScript module because '../package.json' has field "type" with value "module"

Info 35   [16:01:02.000] -----------------------------------------------
Info 36   [16:01:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 37   [16:01:04.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/src/tsconfig.json"}}
Info 38   [16:01:05.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"f026568af42c61ce0537de8ee0fa07c9359a76dcfb046248ed49dc76c91e4a37","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":68,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"target":"es2016","module":"node16","outDir":"","traceResolution":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 39   [16:01:06.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/fileA.ts","configFile":"/user/username/projects/myproject/src/tsconfig.json","diagnostics":[]}}
Info 40   [16:01:07.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 40   [16:01:08.000] 	Files (3)

Info 40   [16:01:09.000] -----------------------------------------------
Info 40   [16:01:10.000] Open files: 
Info 40   [16:01:11.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 40   [16:01:12.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
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

Info 40   [16:01:13.000] response:
    {
      "responseRequired": false
    }
Info 41   [16:01:14.000] Modify package json file to remove type module
Info 42   [16:01:18.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 43   [16:01:19.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 44   [16:01:20.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 45   [16:01:21.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 46   [16:01:22.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
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

Info 47   [16:01:23.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 48   [16:01:24.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 49   [16:01:25.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 50   [16:01:26.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 51   [16:01:27.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 52   [16:01:28.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 53   [16:01:29.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 54   [16:01:30.000] File '/package.json' does not exist according to earlier cached lookups.
Info 55   [16:01:31.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 56   [16:01:32.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 57   [16:01:33.000] 'package.json' does not have a 'typesVersions' field.
Info 58   [16:01:34.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 59   [16:01:35.000] File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Info 60   [16:01:36.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 61   [16:01:37.000] Module resolution kind is not specified, using 'Node16'.
Info 62   [16:01:38.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 63   [16:01:39.000] File '/user/username/projects/myproject/src/fileB.mjs.ts' does not exist.
Info 64   [16:01:40.000] File '/user/username/projects/myproject/src/fileB.mjs.tsx' does not exist.
Info 65   [16:01:41.000] File '/user/username/projects/myproject/src/fileB.mjs.d.ts' does not exist.
Info 66   [16:01:42.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 67   [16:01:43.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 68   [16:01:44.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 69   [16:01:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 70   [16:01:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 71   [16:01:47.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 72   [16:01:48.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 73   [16:01:49.000] File '/package.json' does not exist according to earlier cached lookups.
Info 74   [16:01:50.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 75   [16:01:51.000] Different program with same set of files
Info 76   [16:01:52.000] Running: *ensureProjectForOpenFiles*
Info 77   [16:01:53.000] Before ensureProjectForOpenFiles:
Info 78   [16:01:54.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 78   [16:01:55.000] 	Files (3)

Info 78   [16:01:56.000] -----------------------------------------------
Info 78   [16:01:57.000] Open files: 
Info 78   [16:01:58.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 78   [16:01:59.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 78   [16:02:00.000] After ensureProjectForOpenFiles:
Info 79   [16:02:01.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 79   [16:02:02.000] 	Files (3)

Info 79   [16:02:03.000] -----------------------------------------------
Info 79   [16:02:04.000] Open files: 
Info 79   [16:02:05.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 79   [16:02:06.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 79   [16:02:07.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 80   [16:02:08.000] event:
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

Info 81   [16:02:09.000] request:
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

Info 82   [16:02:10.000] response:
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

Info 83   [16:02:11.000] event:
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

Info 84   [16:02:12.000] event:
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

Info 85   [16:02:13.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 86   [16:02:14.000] event:
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
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 87   [16:02:15.000] Modify package json file to add type module
Info 88   [16:02:19.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 89   [16:02:20.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 90   [16:02:21.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 91   [16:02:22.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 92   [16:02:23.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
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
/a/lib/lib.es2016.full.d.ts:
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 93   [16:02:24.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 94   [16:02:25.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 95   [16:02:26.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 96   [16:02:27.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 97   [16:02:28.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 98   [16:02:29.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 99   [16:02:30.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 100  [16:02:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 101  [16:02:32.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 102  [16:02:33.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 103  [16:02:34.000] 'package.json' does not have a 'typesVersions' field.
Info 104  [16:02:35.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 105  [16:02:36.000] File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Info 106  [16:02:37.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 107  [16:02:38.000] Module resolution kind is not specified, using 'Node16'.
Info 108  [16:02:39.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 109  [16:02:40.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 110  [16:02:41.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 111  [16:02:42.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 112  [16:02:43.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 113  [16:02:44.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 114  [16:02:45.000] File '/package.json' does not exist according to earlier cached lookups.
Info 115  [16:02:46.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 116  [16:02:47.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 117  [16:02:48.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 118  [16:02:49.000] Different program with same set of files
Info 119  [16:02:50.000] Running: *ensureProjectForOpenFiles*
Info 120  [16:02:51.000] Before ensureProjectForOpenFiles:
Info 121  [16:02:52.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 121  [16:02:53.000] 	Files (3)

Info 121  [16:02:54.000] -----------------------------------------------
Info 121  [16:02:55.000] Open files: 
Info 121  [16:02:56.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 121  [16:02:57.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 121  [16:02:58.000] After ensureProjectForOpenFiles:
Info 122  [16:02:59.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 122  [16:03:00.000] 	Files (3)

Info 122  [16:03:01.000] -----------------------------------------------
Info 122  [16:03:02.000] Open files: 
Info 122  [16:03:03.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 122  [16:03:04.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 122  [16:03:05.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 123  [16:03:06.000] event:
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

Info 124  [16:03:07.000] request:
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

Info 125  [16:03:08.000] response:
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

Info 126  [16:03:09.000] event:
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

Info 127  [16:03:10.000] event:
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

Info 128  [16:03:11.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 129  [16:03:12.000] event:
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 130  [16:03:13.000] Delete package.json
Info 131  [16:03:15.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 132  [16:03:16.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 133  [16:03:17.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 134  [16:03:18.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 135  [16:03:19.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 136  [16:03:20.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 137  [16:03:21.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 138  [16:03:22.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 139  [16:03:23.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 140  [16:03:24.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 141  [16:03:25.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 142  [16:03:26.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 143  [16:03:27.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 144  [16:03:28.000] File '/package.json' does not exist according to earlier cached lookups.
Info 145  [16:03:29.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 146  [16:03:30.000] File '/user/username/projects/myproject/package.json' does not exist.
Info 147  [16:03:31.000] File '/user/username/projects/package.json' does not exist.
Info 148  [16:03:32.000] File '/user/username/package.json' does not exist.
Info 149  [16:03:33.000] File '/user/package.json' does not exist.
Info 150  [16:03:34.000] File '/package.json' does not exist according to earlier cached lookups.
Info 151  [16:03:35.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 152  [16:03:36.000] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info 153  [16:03:37.000] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info 154  [16:03:38.000] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info 155  [16:03:39.000] File '/user/package.json' does not exist according to earlier cached lookups.
Info 156  [16:03:40.000] File '/package.json' does not exist according to earlier cached lookups.
Info 157  [16:03:41.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 158  [16:03:42.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 159  [16:03:43.000] File '/package.json' does not exist according to earlier cached lookups.
Info 160  [16:03:44.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 161  [16:03:45.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 162  [16:03:46.000] Different program with same set of files
Info 163  [16:03:47.000] Running: *ensureProjectForOpenFiles*
Info 164  [16:03:48.000] Before ensureProjectForOpenFiles:
Info 165  [16:03:49.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 165  [16:03:50.000] 	Files (3)

Info 165  [16:03:51.000] -----------------------------------------------
Info 165  [16:03:52.000] Open files: 
Info 165  [16:03:53.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 165  [16:03:54.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 165  [16:03:55.000] After ensureProjectForOpenFiles:
Info 166  [16:03:56.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 166  [16:03:57.000] 	Files (3)

Info 166  [16:03:58.000] -----------------------------------------------
Info 166  [16:03:59.000] Open files: 
Info 166  [16:04:00.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 166  [16:04:01.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 166  [16:04:02.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 167  [16:04:03.000] event:
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 168  [16:04:04.000] request:
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 169  [16:04:05.000] response:
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 170  [16:04:06.000] event:
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 171  [16:04:07.000] event:
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 172  [16:04:08.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 173  [16:04:09.000] event:
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 174  [16:04:10.000] Modify package json file to without type module
Info 175  [16:04:13.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 0:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 176  [16:04:14.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 177  [16:04:15.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 0:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 178  [16:04:16.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 179  [16:04:17.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 180  [16:04:18.000] Scheduled: *ensureProjectForOpenFiles*
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

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 181  [16:04:19.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 182  [16:04:20.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 183  [16:04:21.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 184  [16:04:22.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 185  [16:04:23.000] File '/package.json' does not exist according to earlier cached lookups.
Info 186  [16:04:24.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 187  [16:04:25.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 188  [16:04:26.000] 'package.json' does not have a 'typesVersions' field.
Info 189  [16:04:27.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 190  [16:04:28.000] File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Info 191  [16:04:29.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 192  [16:04:30.000] Module resolution kind is not specified, using 'Node16'.
Info 193  [16:04:31.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 194  [16:04:32.000] File '/user/username/projects/myproject/src/fileB.mjs.ts' does not exist.
Info 195  [16:04:33.000] File '/user/username/projects/myproject/src/fileB.mjs.tsx' does not exist.
Info 196  [16:04:34.000] File '/user/username/projects/myproject/src/fileB.mjs.d.ts' does not exist.
Info 197  [16:04:35.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 198  [16:04:36.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 199  [16:04:37.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 200  [16:04:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 201  [16:04:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 202  [16:04:40.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 203  [16:04:41.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 204  [16:04:42.000] File '/package.json' does not exist according to earlier cached lookups.
Info 205  [16:04:43.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 206  [16:04:44.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 207  [16:04:45.000] Different program with same set of files
Info 208  [16:04:46.000] Running: *ensureProjectForOpenFiles*
Info 209  [16:04:47.000] Before ensureProjectForOpenFiles:
Info 210  [16:04:48.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 210  [16:04:49.000] 	Files (3)

Info 210  [16:04:50.000] -----------------------------------------------
Info 210  [16:04:51.000] Open files: 
Info 210  [16:04:52.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 210  [16:04:53.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 210  [16:04:54.000] After ensureProjectForOpenFiles:
Info 211  [16:04:55.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 211  [16:04:56.000] 	Files (3)

Info 211  [16:04:57.000] -----------------------------------------------
Info 211  [16:04:58.000] Open files: 
Info 211  [16:04:59.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 211  [16:05:00.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 211  [16:05:01.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 212  [16:05:02.000] event:
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

Info 213  [16:05:03.000] request:
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

Info 214  [16:05:04.000] response:
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

Info 215  [16:05:05.000] event:
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

Info 216  [16:05:06.000] event:
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

Info 217  [16:05:07.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 218  [16:05:08.000] event:
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

Info 219  [16:05:09.000] Delete package.json
Info 220  [16:05:11.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 221  [16:05:12.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 222  [16:05:13.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
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

Info 223  [16:05:14.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 224  [16:05:15.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 225  [16:05:16.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 226  [16:05:17.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 227  [16:05:18.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 228  [16:05:19.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 229  [16:05:20.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 230  [16:05:21.000] File '/package.json' does not exist according to earlier cached lookups.
Info 231  [16:05:22.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 232  [16:05:23.000] File '/user/username/projects/myproject/package.json' does not exist.
Info 233  [16:05:24.000] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info 234  [16:05:25.000] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info 235  [16:05:26.000] File '/user/package.json' does not exist according to earlier cached lookups.
Info 236  [16:05:27.000] File '/package.json' does not exist according to earlier cached lookups.
Info 237  [16:05:28.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 238  [16:05:29.000] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info 239  [16:05:30.000] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info 240  [16:05:31.000] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info 241  [16:05:32.000] File '/user/package.json' does not exist according to earlier cached lookups.
Info 242  [16:05:33.000] File '/package.json' does not exist according to earlier cached lookups.
Info 243  [16:05:34.000] Reusing resolution of module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'.
Info 244  [16:05:35.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 245  [16:05:36.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 246  [16:05:37.000] File '/package.json' does not exist according to earlier cached lookups.
Info 247  [16:05:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 248  [16:05:39.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 249  [16:05:40.000] Different program with same set of files
Info 250  [16:05:41.000] Running: *ensureProjectForOpenFiles*
Info 251  [16:05:42.000] Before ensureProjectForOpenFiles:
Info 252  [16:05:43.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 252  [16:05:44.000] 	Files (3)

Info 252  [16:05:45.000] -----------------------------------------------
Info 252  [16:05:46.000] Open files: 
Info 252  [16:05:47.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 252  [16:05:48.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 252  [16:05:49.000] After ensureProjectForOpenFiles:
Info 253  [16:05:50.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 253  [16:05:51.000] 	Files (3)

Info 253  [16:05:52.000] -----------------------------------------------
Info 253  [16:05:53.000] Open files: 
Info 253  [16:05:54.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 253  [16:05:55.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 253  [16:05:56.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 254  [16:05:57.000] event:
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

Info 255  [16:05:58.000] request:
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

Info 256  [16:05:59.000] response:
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

Info 257  [16:06:00.000] event:
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

Info 258  [16:06:01.000] event:
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

Info 259  [16:06:02.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 260  [16:06:03.000] event:
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
