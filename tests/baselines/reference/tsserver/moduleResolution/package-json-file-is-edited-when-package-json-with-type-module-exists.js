Info 0    [00:00:27.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:28.000] request:
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

Info 2    [00:00:29.000] Search path: /user/username/projects/myproject/src
Info 3    [00:00:30.000] For info: /user/username/projects/myproject/src/fileA.ts :: Config file name: /user/username/projects/myproject/src/tsconfig.json
Info 4    [00:00:31.000] Creating configuration project /user/username/projects/myproject/src/tsconfig.json
Info 5    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Config file
Info 6    [00:00:33.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/src/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/fileA.ts to open"}}
Info 7    [00:00:34.000] Config: /user/username/projects/myproject/src/tsconfig.json : {
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
Info 8    [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileB.mts 500 undefined WatchType: Closed Script info
Info 11   [00:00:38.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 12   [00:00:39.000] File '/user/username/projects/myproject/src/package.json' does not exist.
Info 13   [00:00:40.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 14   [00:00:41.000] 'package.json' does not have a 'typesVersions' field.
Info 15   [00:00:42.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 16   [00:00:43.000] Module resolution kind is not specified, using 'Node16'.
Info 17   [00:00:44.000] Resolving in ESM mode with conditions 'node', 'import', 'types'.
Info 18   [00:00:45.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 19   [00:00:46.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 20   [00:00:47.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 21   [00:00:48.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 22   [00:00:49.000] File '/a/lib/package.json' does not exist.
Info 23   [00:00:50.000] File '/a/package.json' does not exist.
Info 24   [00:00:51.000] File '/package.json' does not exist.
Info 25   [00:00:52.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info 26   [00:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 27   [00:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 28   [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 29   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 30   [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 31   [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 32   [00:00:59.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 33   [00:01:00.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 34   [00:01:01.000] 	Files (3)
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

Info 35   [00:01:02.000] -----------------------------------------------
Info 36   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 37   [00:01:04.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/src/tsconfig.json"}}
Info 38   [00:01:05.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"f026568af42c61ce0537de8ee0fa07c9359a76dcfb046248ed49dc76c91e4a37","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":68,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"target":"es2016","module":"node16","outDir":"","traceResolution":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 39   [00:01:06.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/fileA.ts","configFile":"/user/username/projects/myproject/src/tsconfig.json","diagnostics":[]}}
Info 40   [00:01:07.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 40   [00:01:08.000] 	Files (3)

Info 40   [00:01:09.000] -----------------------------------------------
Info 40   [00:01:10.000] Open files: 
Info 40   [00:01:11.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 40   [00:01:12.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
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

Info 40   [00:01:13.000] response:
    {
      "responseRequired": false
    }
Info 41   [00:01:14.000] Modify package json file to remove type module
Info 42   [00:01:18.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 43   [00:01:19.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 44   [00:01:20.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 45   [00:01:21.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 46   [00:01:22.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
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

Info 47   [00:01:23.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 48   [00:01:24.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 49   [00:01:25.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 50   [00:01:26.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 51   [00:01:27.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 52   [00:01:28.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 53   [00:01:29.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 54   [00:01:30.000] File '/package.json' does not exist according to earlier cached lookups.
Info 55   [00:01:31.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 56   [00:01:32.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 57   [00:01:33.000] 'package.json' does not have a 'typesVersions' field.
Info 58   [00:01:34.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 59   [00:01:35.000] File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Info 60   [00:01:36.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 61   [00:01:37.000] Module resolution kind is not specified, using 'Node16'.
Info 62   [00:01:38.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 63   [00:01:39.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 64   [00:01:40.000] File '/user/username/projects/myproject/src/fileB.mjs.ts' does not exist.
Info 65   [00:01:41.000] File '/user/username/projects/myproject/src/fileB.mjs.tsx' does not exist.
Info 66   [00:01:42.000] File '/user/username/projects/myproject/src/fileB.mjs.d.ts' does not exist.
Info 67   [00:01:43.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 68   [00:01:44.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 69   [00:01:45.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 70   [00:01:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 71   [00:01:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 72   [00:01:48.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 73   [00:01:49.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 74   [00:01:50.000] File '/package.json' does not exist according to earlier cached lookups.
Info 75   [00:01:51.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 76   [00:01:52.000] Different program with same set of files
Info 77   [00:01:53.000] Running: *ensureProjectForOpenFiles*
Info 78   [00:01:54.000] Before ensureProjectForOpenFiles:
Info 79   [00:01:55.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 79   [00:01:56.000] 	Files (3)

Info 79   [00:01:57.000] -----------------------------------------------
Info 79   [00:01:58.000] Open files: 
Info 79   [00:01:59.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 79   [00:02:00.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 79   [00:02:01.000] After ensureProjectForOpenFiles:
Info 80   [00:02:02.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 80   [00:02:03.000] 	Files (3)

Info 80   [00:02:04.000] -----------------------------------------------
Info 80   [00:02:05.000] Open files: 
Info 80   [00:02:06.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 80   [00:02:07.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 80   [00:02:08.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 81   [00:02:09.000] event:
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

Info 82   [00:02:10.000] request:
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

Info 83   [00:02:11.000] response:
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

Info 84   [00:02:12.000] event:
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

Info 85   [00:02:13.000] event:
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

Info 86   [00:02:14.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 87   [00:02:15.000] event:
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

Info 88   [00:02:16.000] Modify package json file to add type module
Info 89   [00:02:20.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 90   [00:02:21.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 91   [00:02:22.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 92   [00:02:23.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 93   [00:02:24.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 1:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
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

Info 94   [00:02:25.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 95   [00:02:26.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 96   [00:02:27.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 97   [00:02:28.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 98   [00:02:29.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 99   [00:02:30.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 100  [00:02:31.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 101  [00:02:32.000] File '/package.json' does not exist according to earlier cached lookups.
Info 102  [00:02:33.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 103  [00:02:34.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 104  [00:02:35.000] 'package.json' does not have a 'typesVersions' field.
Info 105  [00:02:36.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 106  [00:02:37.000] File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Info 107  [00:02:38.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 108  [00:02:39.000] Module resolution kind is not specified, using 'Node16'.
Info 109  [00:02:40.000] Resolving in ESM mode with conditions 'node', 'import', 'types'.
Info 110  [00:02:41.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 111  [00:02:42.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 112  [00:02:43.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 113  [00:02:44.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 114  [00:02:45.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 115  [00:02:46.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 116  [00:02:47.000] File '/package.json' does not exist according to earlier cached lookups.
Info 117  [00:02:48.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 118  [00:02:49.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 119  [00:02:50.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 120  [00:02:51.000] Different program with same set of files
Info 121  [00:02:52.000] Running: *ensureProjectForOpenFiles*
Info 122  [00:02:53.000] Before ensureProjectForOpenFiles:
Info 123  [00:02:54.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 123  [00:02:55.000] 	Files (3)

Info 123  [00:02:56.000] -----------------------------------------------
Info 123  [00:02:57.000] Open files: 
Info 123  [00:02:58.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 123  [00:02:59.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 123  [00:03:00.000] After ensureProjectForOpenFiles:
Info 124  [00:03:01.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 124  [00:03:02.000] 	Files (3)

Info 124  [00:03:03.000] -----------------------------------------------
Info 124  [00:03:04.000] Open files: 
Info 124  [00:03:05.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 124  [00:03:06.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 124  [00:03:07.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 125  [00:03:08.000] event:
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

Info 126  [00:03:09.000] request:
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

Info 127  [00:03:10.000] response:
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

Info 128  [00:03:11.000] event:
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

Info 129  [00:03:12.000] event:
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

Info 130  [00:03:13.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 131  [00:03:14.000] event:
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

Info 132  [00:03:15.000] Delete package.json
Info 133  [00:03:17.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 134  [00:03:18.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 135  [00:03:19.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 136  [00:03:20.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 137  [00:03:21.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
Info 138  [00:03:22.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 250 undefined WatchType: package.json file
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

Info 139  [00:03:23.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 140  [00:03:24.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 141  [00:03:25.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 142  [00:03:26.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 143  [00:03:27.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 144  [00:03:28.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 145  [00:03:29.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 146  [00:03:30.000] File '/package.json' does not exist according to earlier cached lookups.
Info 147  [00:03:31.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 148  [00:03:32.000] File '/user/username/projects/myproject/package.json' does not exist.
Info 149  [00:03:33.000] File '/user/username/projects/package.json' does not exist.
Info 150  [00:03:34.000] File '/user/username/package.json' does not exist.
Info 151  [00:03:35.000] File '/user/package.json' does not exist.
Info 152  [00:03:36.000] File '/package.json' does not exist according to earlier cached lookups.
Info 153  [00:03:37.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 154  [00:03:38.000] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info 155  [00:03:39.000] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info 156  [00:03:40.000] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info 157  [00:03:41.000] File '/user/package.json' does not exist according to earlier cached lookups.
Info 158  [00:03:42.000] File '/package.json' does not exist according to earlier cached lookups.
Info 159  [00:03:43.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 160  [00:03:44.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 161  [00:03:45.000] File '/package.json' does not exist according to earlier cached lookups.
Info 162  [00:03:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 163  [00:03:47.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 164  [00:03:48.000] Different program with same set of files
Info 165  [00:03:49.000] Running: *ensureProjectForOpenFiles*
Info 166  [00:03:50.000] Before ensureProjectForOpenFiles:
Info 167  [00:03:51.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 167  [00:03:52.000] 	Files (3)

Info 167  [00:03:53.000] -----------------------------------------------
Info 167  [00:03:54.000] Open files: 
Info 167  [00:03:55.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 167  [00:03:56.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 167  [00:03:57.000] After ensureProjectForOpenFiles:
Info 168  [00:03:58.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 168  [00:03:59.000] 	Files (3)

Info 168  [00:04:00.000] -----------------------------------------------
Info 168  [00:04:01.000] Open files: 
Info 168  [00:04:02.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 168  [00:04:03.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 168  [00:04:04.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 169  [00:04:05.000] event:
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

Info 170  [00:04:06.000] request:
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

Info 171  [00:04:07.000] response:
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

Info 172  [00:04:08.000] event:
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

Info 173  [00:04:09.000] event:
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

Info 174  [00:04:10.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 175  [00:04:11.000] event:
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

Info 176  [00:04:12.000] Modify package json file to without type module
Info 177  [00:04:15.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 0:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 178  [00:04:16.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 179  [00:04:17.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 0:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
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

Info 180  [00:04:18.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 181  [00:04:19.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 182  [00:04:20.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 183  [00:04:21.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 184  [00:04:22.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 185  [00:04:23.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 186  [00:04:24.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 187  [00:04:25.000] File '/package.json' does not exist according to earlier cached lookups.
Info 188  [00:04:26.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 189  [00:04:27.000] Found 'package.json' at '/user/username/projects/myproject/package.json'.
Info 190  [00:04:28.000] 'package.json' does not have a 'typesVersions' field.
Info 191  [00:04:29.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 192  [00:04:30.000] File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
Info 193  [00:04:31.000] ======== Resolving module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts'. ========
Info 194  [00:04:32.000] Module resolution kind is not specified, using 'Node16'.
Info 195  [00:04:33.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 196  [00:04:34.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileB.mjs', target file type 'TypeScript'.
Info 197  [00:04:35.000] File '/user/username/projects/myproject/src/fileB.mjs.ts' does not exist.
Info 198  [00:04:36.000] File '/user/username/projects/myproject/src/fileB.mjs.tsx' does not exist.
Info 199  [00:04:37.000] File '/user/username/projects/myproject/src/fileB.mjs.d.ts' does not exist.
Info 200  [00:04:38.000] File name '/user/username/projects/myproject/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 201  [00:04:39.000] File '/user/username/projects/myproject/src/fileB.mts' exist - use it as a name resolution result.
Info 202  [00:04:40.000] ======== Module name './fileB.mjs' was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'. ========
Info 203  [00:04:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 204  [00:04:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 205  [00:04:43.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 206  [00:04:44.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 207  [00:04:45.000] File '/package.json' does not exist according to earlier cached lookups.
Info 208  [00:04:46.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 209  [00:04:47.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 210  [00:04:48.000] Different program with same set of files
Info 211  [00:04:49.000] Running: *ensureProjectForOpenFiles*
Info 212  [00:04:50.000] Before ensureProjectForOpenFiles:
Info 213  [00:04:51.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 213  [00:04:52.000] 	Files (3)

Info 213  [00:04:53.000] -----------------------------------------------
Info 213  [00:04:54.000] Open files: 
Info 213  [00:04:55.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 213  [00:04:56.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 213  [00:04:57.000] After ensureProjectForOpenFiles:
Info 214  [00:04:58.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 214  [00:04:59.000] 	Files (3)

Info 214  [00:05:00.000] -----------------------------------------------
Info 214  [00:05:01.000] Open files: 
Info 214  [00:05:02.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 214  [00:05:03.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 214  [00:05:04.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 215  [00:05:05.000] event:
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

Info 216  [00:05:06.000] request:
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

Info 217  [00:05:07.000] response:
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

Info 218  [00:05:08.000] event:
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

Info 219  [00:05:09.000] event:
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

Info 220  [00:05:10.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 221  [00:05:11.000] event:
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

Info 222  [00:05:12.000] Delete package.json
Info 223  [00:05:14.000] FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 224  [00:05:15.000] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 225  [00:05:16.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/package.json 2:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
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

Info 226  [00:05:17.000] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info 227  [00:05:18.000] Scheduled: /user/username/projects/myproject/src/tsconfig.json
Info 228  [00:05:19.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 229  [00:05:20.000] Running: /user/username/projects/myproject/src/tsconfig.json
Info 230  [00:05:21.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 231  [00:05:22.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 232  [00:05:23.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 233  [00:05:24.000] File '/package.json' does not exist according to earlier cached lookups.
Info 234  [00:05:25.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 235  [00:05:26.000] File '/user/username/projects/myproject/package.json' does not exist.
Info 236  [00:05:27.000] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info 237  [00:05:28.000] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info 238  [00:05:29.000] File '/user/package.json' does not exist according to earlier cached lookups.
Info 239  [00:05:30.000] File '/package.json' does not exist according to earlier cached lookups.
Info 240  [00:05:31.000] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info 241  [00:05:32.000] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info 242  [00:05:33.000] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info 243  [00:05:34.000] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info 244  [00:05:35.000] File '/user/package.json' does not exist according to earlier cached lookups.
Info 245  [00:05:36.000] File '/package.json' does not exist according to earlier cached lookups.
Info 246  [00:05:37.000] Reusing resolution of module './fileB.mjs' from '/user/username/projects/myproject/src/fileA.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileB.mts'.
Info 247  [00:05:38.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 248  [00:05:39.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 249  [00:05:40.000] File '/package.json' does not exist according to earlier cached lookups.
Info 250  [00:05:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: File location affecting resolution
Info 251  [00:05:42.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 252  [00:05:43.000] Different program with same set of files
Info 253  [00:05:44.000] Running: *ensureProjectForOpenFiles*
Info 254  [00:05:45.000] Before ensureProjectForOpenFiles:
Info 255  [00:05:46.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 255  [00:05:47.000] 	Files (3)

Info 255  [00:05:48.000] -----------------------------------------------
Info 255  [00:05:49.000] Open files: 
Info 255  [00:05:50.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 255  [00:05:51.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 255  [00:05:52.000] After ensureProjectForOpenFiles:
Info 256  [00:05:53.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 256  [00:05:54.000] 	Files (3)

Info 256  [00:05:55.000] -----------------------------------------------
Info 256  [00:05:56.000] Open files: 
Info 256  [00:05:57.000] 	FileName: /user/username/projects/myproject/src/fileA.ts ProjectRootPath: undefined
Info 256  [00:05:58.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json
Info 256  [00:05:59.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/fileA.ts
Info 257  [00:06:00.000] event:
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

Info 258  [00:06:01.000] request:
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

Info 259  [00:06:02.000] response:
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

Info 260  [00:06:03.000] event:
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

Info 261  [00:06:04.000] event:
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

Info 262  [00:06:05.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/fileA.ts","diagnostics":[]}}
Info 263  [00:06:06.000] event:
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
