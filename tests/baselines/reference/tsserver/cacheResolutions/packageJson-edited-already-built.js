Info 0    [00:01:59.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:02:00.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/projects/project/src/randomFile.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/src/projects/project/src/tsconfig.json]
{"compilerOptions":{"target":"es2016","composite":true,"module":"node16","outDir":"../out","cacheResolutions":true,"traceResolution":true},"files":["fileA.ts","fileB.mts","randomFile.ts","a/randomFile.ts","b/ba/randomFile.ts","b/randomFile.ts","c/ca/randomFile.ts","c/ca/caa/randomFile.ts","c/ca/caa/caaa/randomFile.ts","c/cb/randomFile.ts","d/da/daa/daaa/x/y/z/randomFile.ts","d/da/daa/daaa/randomFile.ts","d/da/daa/randomFile.ts","d/da/randomFile.ts","e/ea/randomFile.ts","e/ea/eaa/randomFile.ts","e/ea/eaa/eaaa/randomFile.ts","e/ea/eaa/eaaa/x/y/z/randomFile.ts","f/fa/faa/x/y/z/randomFile.ts","f/fa/faa/faaa/randomFile.ts"]}

//// [/src/projects/project/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/src/projects/project/src/fileB.mts]
export function foo() {}

//// [/src/projects/project/src/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/a/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/b/ba/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/b/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/ca/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/ca/caa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/ca/caa/caaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/cb/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/daa/daaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/daa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/eaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/f/fa/faa/faaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts]
export const x = 10;

//// [/src/projects/project/package.json]
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

Info 2    [00:02:01.000] Search path: /src/projects/project/src
Info 3    [00:02:02.000] For info: /src/projects/project/src/randomFile.ts :: Config file name: /src/projects/project/src/tsconfig.json
Info 4    [00:02:03.000] Creating configuration project /src/projects/project/src/tsconfig.json
Info 5    [00:02:04.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/tsconfig.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: Config file
Info 6    [00:02:05.000] Config: /src/projects/project/src/tsconfig.json : {
 "rootNames": [
  "/src/projects/project/src/fileA.ts",
  "/src/projects/project/src/fileB.mts",
  "/src/projects/project/src/randomFile.ts",
  "/src/projects/project/src/a/randomFile.ts",
  "/src/projects/project/src/b/ba/randomFile.ts",
  "/src/projects/project/src/b/randomFile.ts",
  "/src/projects/project/src/c/ca/randomFile.ts",
  "/src/projects/project/src/c/ca/caa/randomFile.ts",
  "/src/projects/project/src/c/ca/caa/caaa/randomFile.ts",
  "/src/projects/project/src/c/cb/randomFile.ts",
  "/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts",
  "/src/projects/project/src/d/da/daa/daaa/randomFile.ts",
  "/src/projects/project/src/d/da/daa/randomFile.ts",
  "/src/projects/project/src/d/da/randomFile.ts",
  "/src/projects/project/src/e/ea/randomFile.ts",
  "/src/projects/project/src/e/ea/eaa/randomFile.ts",
  "/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts",
  "/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts",
  "/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts",
  "/src/projects/project/src/f/fa/faa/faaa/randomFile.ts"
 ],
 "options": {
  "target": 3,
  "composite": true,
  "module": 100,
  "outDir": "/src/projects/project/out",
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/projects/project/src/tsconfig.json"
 }
}
Info 7    [00:02:06.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/fileA.ts 500 undefined WatchType: Closed Script info
Info 8    [00:02:07.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/fileB.mts 500 undefined WatchType: Closed Script info
Info 9    [00:02:08.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/a/randomFile.ts 500 undefined WatchType: Closed Script info
Info 10   [00:02:09.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/ba/randomFile.ts 500 undefined WatchType: Closed Script info
Info 11   [00:02:10.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/randomFile.ts 500 undefined WatchType: Closed Script info
Info 12   [00:02:11.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/randomFile.ts 500 undefined WatchType: Closed Script info
Info 13   [00:02:12.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/randomFile.ts 500 undefined WatchType: Closed Script info
Info 14   [00:02:13.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/caaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info 15   [00:02:14.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/cb/randomFile.ts 500 undefined WatchType: Closed Script info
Info 16   [00:02:15.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts 500 undefined WatchType: Closed Script info
Info 17   [00:02:16.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info 18   [00:02:17.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/randomFile.ts 500 undefined WatchType: Closed Script info
Info 19   [00:02:18.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/randomFile.ts 500 undefined WatchType: Closed Script info
Info 20   [00:02:19.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/randomFile.ts 500 undefined WatchType: Closed Script info
Info 21   [00:02:20.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info 22   [00:02:21.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info 23   [00:02:22.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts 500 undefined WatchType: Closed Script info
Info 24   [00:02:23.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts 500 undefined WatchType: Closed Script info
Info 25   [00:02:24.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/faaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info 26   [00:02:25.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 27   [00:02:26.000] File '/src/projects/project/src/package.json' does not exist.
Info 28   [00:02:27.000] Found 'package.json' at '/src/projects/project/package.json'.
Info 29   [00:02:28.000] ======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Info 30   [00:02:29.000] Module resolution kind is not specified, using 'Node16'.
Info 31   [00:02:30.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 32   [00:02:31.000] Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info 33   [00:02:32.000] File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 34   [00:02:33.000] File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
Info 35   [00:02:34.000] ======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Info 36   [00:02:35.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 37   [00:02:36.000] File '/src/projects/project/src/a/package.json' does not exist.
Info 38   [00:02:37.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 39   [00:02:38.000] File '/src/projects/project/src/b/ba/package.json' does not exist.
Info 40   [00:02:39.000] File '/src/projects/project/src/b/package.json' does not exist.
Info 41   [00:02:40.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 42   [00:02:41.000] Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Info 43   [00:02:42.000] File '/src/projects/project/src/c/ca/package.json' does not exist.
Info 44   [00:02:43.000] File '/src/projects/project/src/c/package.json' does not exist.
Info 45   [00:02:44.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 46   [00:02:45.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
Info 47   [00:02:46.000] Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Info 48   [00:02:47.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
Info 49   [00:02:48.000] Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 50   [00:02:49.000] File '/src/projects/project/src/c/cb/package.json' does not exist.
Info 51   [00:02:50.000] Directory '/src/projects/project/src/c' resolves to '/src/projects/project/package.json' scope according to cache.
Info 52   [00:02:51.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
Info 53   [00:02:52.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
Info 54   [00:02:53.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
Info 55   [00:02:54.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
Info 56   [00:02:55.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist.
Info 57   [00:02:56.000] File '/src/projects/project/src/d/da/package.json' does not exist.
Info 58   [00:02:57.000] File '/src/projects/project/src/d/package.json' does not exist.
Info 59   [00:02:58.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 60   [00:02:59.000] Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 61   [00:03:00.000] Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 62   [00:03:01.000] Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Info 63   [00:03:02.000] File '/src/projects/project/src/e/ea/package.json' does not exist.
Info 64   [00:03:03.000] File '/src/projects/project/src/e/package.json' does not exist.
Info 65   [00:03:04.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 66   [00:03:05.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
Info 67   [00:03:06.000] Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Info 68   [00:03:07.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
Info 69   [00:03:08.000] Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 70   [00:03:09.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
Info 71   [00:03:10.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
Info 72   [00:03:11.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
Info 73   [00:03:12.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 74   [00:03:13.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
Info 75   [00:03:14.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
Info 76   [00:03:15.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
Info 77   [00:03:16.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
Info 78   [00:03:17.000] File '/src/projects/project/src/f/fa/package.json' does not exist.
Info 79   [00:03:18.000] File '/src/projects/project/src/f/package.json' does not exist.
Info 80   [00:03:19.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 81   [00:03:20.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
Info 82   [00:03:21.000] Directory '/src/projects/project/src/f/fa/faa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 83   [00:03:22.000] File '/a/lib/package.json' does not exist.
Info 84   [00:03:23.000] File '/a/package.json' does not exist.
Info 85   [00:03:24.000] File '/package.json' does not exist.
Info 86   [00:03:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info 87   [00:03:26.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 88   [00:03:27.000] DirectoryWatcher:: Added:: WatchInfo: /src/projects/project/src/node_modules/@types 1 undefined Project: /src/projects/project/src/tsconfig.json WatchType: Type roots
Info 89   [00:03:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/project/src/node_modules/@types 1 undefined Project: /src/projects/project/src/tsconfig.json WatchType: Type roots
Info 90   [00:03:29.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 91   [00:03:30.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 92   [00:03:31.000] 	Files (21)
	/a/lib/lib.es2016.full.d.ts
	/src/projects/project/src/fileB.mts
	/src/projects/project/src/fileA.ts
	/src/projects/project/src/randomFile.ts
	/src/projects/project/src/a/randomFile.ts
	/src/projects/project/src/b/ba/randomFile.ts
	/src/projects/project/src/b/randomFile.ts
	/src/projects/project/src/c/ca/randomFile.ts
	/src/projects/project/src/c/ca/caa/randomFile.ts
	/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
	/src/projects/project/src/c/cb/randomFile.ts
	/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
	/src/projects/project/src/d/da/daa/daaa/randomFile.ts
	/src/projects/project/src/d/da/daa/randomFile.ts
	/src/projects/project/src/d/da/randomFile.ts
	/src/projects/project/src/e/ea/randomFile.ts
	/src/projects/project/src/e/ea/eaa/randomFile.ts
	/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
	/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
	/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
	/src/projects/project/src/f/fa/faa/faaa/randomFile.ts


	../../../../a/lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	fileB.mts
	  Imported via "./fileB.mjs" from file 'fileA.ts'
	  Part of 'files' list in tsconfig.json
	fileA.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	a/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	b/ba/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	b/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	c/ca/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	c/ca/caa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	c/ca/caa/caaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	c/cb/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	d/da/daa/daaa/x/y/z/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	d/da/daa/daaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	d/da/daa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	d/da/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	e/ea/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	e/ea/eaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	e/ea/eaa/eaaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	e/ea/eaa/eaaa/x/y/z/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	f/fa/faa/x/y/z/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	f/fa/faa/faaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"

Info 93   [00:03:32.000] -----------------------------------------------
Info 94   [00:03:33.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 95   [00:03:34.000] Search path: /src/projects/project/src
Info 96   [00:03:35.000] For info: /src/projects/project/src/tsconfig.json :: No config files found.
Info 97   [00:03:36.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 97   [00:03:37.000] 	Files (21)

Info 97   [00:03:38.000] -----------------------------------------------
Info 97   [00:03:39.000] Open files: 
Info 97   [00:03:40.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 97   [00:03:41.000] 		Projects: /src/projects/project/src/tsconfig.json
After request

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 97   [00:03:42.000] response:
    {
      "responseRequired": false
    }
Info 98   [00:03:43.000] random edit
Info 99   [00:03:44.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/projects/project/src/randomFile.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "export cont y = 10;\n"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 100  [00:03:45.000] response:
    {
      "responseRequired": false
    }
Info 101  [00:03:46.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 102  [00:03:47.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 103  [00:03:48.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 104  [00:03:49.000] File '/package.json' does not exist according to earlier cached lookups.
Info 105  [00:03:50.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 106  [00:03:51.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 107  [00:03:52.000] Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Info 108  [00:03:53.000] Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Info 109  [00:03:54.000] Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Info 110  [00:03:55.000] Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Info 111  [00:03:56.000] Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 112  [00:03:57.000] Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 113  [00:03:58.000] Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Info 114  [00:03:59.000] Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 115  [00:04:00.000] Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 116  [00:04:01.000] Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 117  [00:04:02.000] Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Info 118  [00:04:03.000] Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Info 119  [00:04:04.000] Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 120  [00:04:05.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 121  [00:04:06.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 122  [00:04:07.000] Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 123  [00:04:08.000] Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 124  [00:04:09.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 125  [00:04:10.000] Different program with same set of files
Info 126  [00:04:11.000] Modify package json file to add type module
Info 127  [00:04:15.000] FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 128  [00:04:16.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 129  [00:04:17.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 130  [00:04:18.000] FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 131  [00:04:19.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Before running timeout callbacks
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}


PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 132  [00:04:20.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 133  [00:04:21.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 134  [00:04:22.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Before running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 135  [00:04:23.000] Running: /src/projects/project/src/tsconfig.json
Info 136  [00:04:24.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 137  [00:04:25.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 138  [00:04:26.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 139  [00:04:27.000] File '/package.json' does not exist according to earlier cached lookups.
Info 140  [00:04:28.000] Found 'package.json' at '/src/projects/project/package.json'.
Info 141  [00:04:29.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 142  [00:04:30.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 143  [00:04:31.000] Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Info 144  [00:04:32.000] Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Info 145  [00:04:33.000] Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Info 146  [00:04:34.000] Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Info 147  [00:04:35.000] Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 148  [00:04:36.000] Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 149  [00:04:37.000] Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Info 150  [00:04:38.000] Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 151  [00:04:39.000] Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 152  [00:04:40.000] Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 153  [00:04:41.000] Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Info 154  [00:04:42.000] Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Info 155  [00:04:43.000] Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 156  [00:04:44.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 157  [00:04:45.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 158  [00:04:46.000] Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 159  [00:04:47.000] Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 160  [00:04:48.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 161  [00:04:49.000] ======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Info 162  [00:04:50.000] Module resolution kind is not specified, using 'Node16'.
Info 163  [00:04:51.000] Resolving in ESM mode with conditions 'node', 'import', 'types'.
Info 164  [00:04:52.000] Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info 165  [00:04:53.000] File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 166  [00:04:54.000] File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
Info 167  [00:04:55.000] ======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Info 168  [00:04:56.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 169  [00:04:57.000] Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Info 170  [00:04:58.000] Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Info 171  [00:04:59.000] Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Info 172  [00:05:00.000] Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Info 173  [00:05:01.000] Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 174  [00:05:02.000] Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 175  [00:05:03.000] Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Info 176  [00:05:04.000] Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 177  [00:05:05.000] Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 178  [00:05:06.000] Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 179  [00:05:07.000] Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Info 180  [00:05:08.000] Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Info 181  [00:05:09.000] Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 182  [00:05:10.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 183  [00:05:11.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 184  [00:05:12.000] Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 185  [00:05:13.000] Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 186  [00:05:14.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 187  [00:05:15.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 188  [00:05:16.000] Different program with same set of files
Info 189  [00:05:17.000] Running: *ensureProjectForOpenFiles*
Info 190  [00:05:18.000] Before ensureProjectForOpenFiles:
Info 191  [00:05:19.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 191  [00:05:20.000] 	Files (21)

Info 191  [00:05:21.000] -----------------------------------------------
Info 191  [00:05:22.000] Open files: 
Info 191  [00:05:23.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 191  [00:05:24.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 191  [00:05:25.000] After ensureProjectForOpenFiles:
Info 192  [00:05:26.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 192  [00:05:27.000] 	Files (21)

Info 192  [00:05:28.000] -----------------------------------------------
Info 192  [00:05:29.000] Open files: 
Info 192  [00:05:30.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 192  [00:05:31.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 192  [00:05:32.000] Modify package.json file to remove type module
Info 193  [00:05:36.000] FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 194  [00:05:37.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 195  [00:05:38.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 196  [00:05:39.000] FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 197  [00:05:40.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Before running timeout callbacks
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0"}


PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 198  [00:05:41.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 199  [00:05:42.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 200  [00:05:43.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Before running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 201  [00:05:44.000] Running: /src/projects/project/src/tsconfig.json
Info 202  [00:05:45.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 203  [00:05:46.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 204  [00:05:47.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 205  [00:05:48.000] File '/package.json' does not exist according to earlier cached lookups.
Info 206  [00:05:49.000] Found 'package.json' at '/src/projects/project/package.json'.
Info 207  [00:05:50.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 208  [00:05:51.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 209  [00:05:52.000] Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Info 210  [00:05:53.000] Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Info 211  [00:05:54.000] Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Info 212  [00:05:55.000] Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Info 213  [00:05:56.000] Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 214  [00:05:57.000] Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 215  [00:05:58.000] Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Info 216  [00:05:59.000] Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 217  [00:06:00.000] Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 218  [00:06:01.000] Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 219  [00:06:02.000] Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Info 220  [00:06:03.000] Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Info 221  [00:06:04.000] Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 222  [00:06:05.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 223  [00:06:06.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 224  [00:06:07.000] Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 225  [00:06:08.000] Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 226  [00:06:09.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 227  [00:06:10.000] ======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Info 228  [00:06:11.000] Module resolution kind is not specified, using 'Node16'.
Info 229  [00:06:12.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 230  [00:06:13.000] Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info 231  [00:06:14.000] File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 232  [00:06:15.000] File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
Info 233  [00:06:16.000] ======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Info 234  [00:06:17.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 235  [00:06:18.000] Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Info 236  [00:06:19.000] Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Info 237  [00:06:20.000] Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Info 238  [00:06:21.000] Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Info 239  [00:06:22.000] Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 240  [00:06:23.000] Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 241  [00:06:24.000] Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Info 242  [00:06:25.000] Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 243  [00:06:26.000] Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 244  [00:06:27.000] Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 245  [00:06:28.000] Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Info 246  [00:06:29.000] Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Info 247  [00:06:30.000] Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 248  [00:06:31.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 249  [00:06:32.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 250  [00:06:33.000] Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 251  [00:06:34.000] Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 252  [00:06:35.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 253  [00:06:36.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 254  [00:06:37.000] Different program with same set of files
Info 255  [00:06:38.000] Running: *ensureProjectForOpenFiles*
Info 256  [00:06:39.000] Before ensureProjectForOpenFiles:
Info 257  [00:06:40.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 257  [00:06:41.000] 	Files (21)

Info 257  [00:06:42.000] -----------------------------------------------
Info 257  [00:06:43.000] Open files: 
Info 257  [00:06:44.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 257  [00:06:45.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 257  [00:06:46.000] After ensureProjectForOpenFiles:
Info 258  [00:06:47.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 258  [00:06:48.000] 	Files (21)

Info 258  [00:06:49.000] -----------------------------------------------
Info 258  [00:06:50.000] Open files: 
Info 258  [00:06:51.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 258  [00:06:52.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 258  [00:06:53.000] Delete package.json
Info 259  [00:06:55.000] FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 260  [00:06:56.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 261  [00:06:57.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 262  [00:06:58.000] FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 263  [00:06:59.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 264  [00:07:00.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Before running timeout callbacks
//// [/src/projects/project/package.json] deleted

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 265  [00:07:01.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 266  [00:07:02.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 267  [00:07:03.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Before running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 268  [00:07:04.000] Running: /src/projects/project/src/tsconfig.json
Info 269  [00:07:05.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 270  [00:07:06.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 271  [00:07:07.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 272  [00:07:08.000] File '/package.json' does not exist according to earlier cached lookups.
Info 273  [00:07:09.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 274  [00:07:10.000] File '/src/projects/project/package.json' does not exist.
Info 275  [00:07:11.000] File '/src/projects/package.json' does not exist.
Info 276  [00:07:12.000] File '/src/package.json' does not exist.
Info 277  [00:07:13.000] Directory '/' has no containing package.json scope according to cache.
Info 278  [00:07:14.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 279  [00:07:15.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 280  [00:07:16.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 281  [00:07:17.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 282  [00:07:18.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 283  [00:07:19.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 284  [00:07:20.000] Directory '/src/projects/project/src/b' has no containing package.json scope according to cache.
Info 285  [00:07:21.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 286  [00:07:22.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 287  [00:07:23.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 288  [00:07:24.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 289  [00:07:25.000] Directory '/src/projects/project/src/c/ca' has no containing package.json scope according to cache.
Info 290  [00:07:26.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 291  [00:07:27.000] Directory '/src/projects/project/src/c/ca/caa' has no containing package.json scope according to cache.
Info 292  [00:07:28.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 293  [00:07:29.000] Directory '/src/projects/project/src/c' has no containing package.json scope according to cache.
Info 294  [00:07:30.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 295  [00:07:31.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 296  [00:07:32.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 297  [00:07:33.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 298  [00:07:34.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 299  [00:07:35.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 300  [00:07:36.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 301  [00:07:37.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 302  [00:07:38.000] Directory '/src/projects/project/src/d/da/daa/daaa' has no containing package.json scope according to cache.
Info 303  [00:07:39.000] Directory '/src/projects/project/src/d/da/daa' has no containing package.json scope according to cache.
Info 304  [00:07:40.000] Directory '/src/projects/project/src/d/da' has no containing package.json scope according to cache.
Info 305  [00:07:41.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 306  [00:07:42.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 307  [00:07:43.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 308  [00:07:44.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 309  [00:07:45.000] Directory '/src/projects/project/src/e/ea' has no containing package.json scope according to cache.
Info 310  [00:07:46.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 311  [00:07:47.000] Directory '/src/projects/project/src/e/ea/eaa' has no containing package.json scope according to cache.
Info 312  [00:07:48.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 313  [00:07:49.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 314  [00:07:50.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 315  [00:07:51.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' has no containing package.json scope according to cache.
Info 316  [00:07:52.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 317  [00:07:53.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 318  [00:07:54.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 319  [00:07:55.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 320  [00:07:56.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 321  [00:07:57.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 322  [00:07:58.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 323  [00:07:59.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 324  [00:08:00.000] Directory '/src/projects/project/src/f/fa/faa' has no containing package.json scope according to cache.
Info 325  [00:08:01.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 326  [00:08:02.000] Reusing resolution of module './fileB.mjs' from '/src/projects/project/src/fileA.ts' of old program, it was successfully resolved to '/src/projects/project/src/fileB.mts'.
Info 327  [00:08:03.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 328  [00:08:04.000] Directory '/src/projects/project/src/a' has no containing package.json scope according to cache.
Info 329  [00:08:05.000] Directory '/src/projects/project/src/b/ba' has no containing package.json scope according to cache.
Info 330  [00:08:06.000] Directory '/src/projects/project/src/b' has no containing package.json scope according to cache.
Info 331  [00:08:07.000] Directory '/src/projects/project/src/c/ca' has no containing package.json scope according to cache.
Info 332  [00:08:08.000] Directory '/src/projects/project/src/c/ca/caa' has no containing package.json scope according to cache.
Info 333  [00:08:09.000] Directory '/src/projects/project/src/c/ca/caa/caaa' has no containing package.json scope according to cache.
Info 334  [00:08:10.000] Directory '/src/projects/project/src/c/cb' has no containing package.json scope according to cache.
Info 335  [00:08:11.000] Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' has no containing package.json scope according to cache.
Info 336  [00:08:12.000] Directory '/src/projects/project/src/d/da/daa/daaa' has no containing package.json scope according to cache.
Info 337  [00:08:13.000] Directory '/src/projects/project/src/d/da/daa' has no containing package.json scope according to cache.
Info 338  [00:08:14.000] Directory '/src/projects/project/src/d/da' has no containing package.json scope according to cache.
Info 339  [00:08:15.000] Directory '/src/projects/project/src/e/ea' has no containing package.json scope according to cache.
Info 340  [00:08:16.000] Directory '/src/projects/project/src/e/ea/eaa' has no containing package.json scope according to cache.
Info 341  [00:08:17.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' has no containing package.json scope according to cache.
Info 342  [00:08:18.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' has no containing package.json scope according to cache.
Info 343  [00:08:19.000] Directory '/src/projects/project/src/f/fa/faa/x/y/z' has no containing package.json scope according to cache.
Info 344  [00:08:20.000] Directory '/src/projects/project/src/f/fa/faa/faaa' has no containing package.json scope according to cache.
Info 345  [00:08:21.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 346  [00:08:22.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 347  [00:08:23.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/a/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 348  [00:08:24.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/ba/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 349  [00:08:25.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 350  [00:08:26.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 351  [00:08:27.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 352  [00:08:28.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 353  [00:08:29.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/caaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 354  [00:08:30.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/cb/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 355  [00:08:31.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 356  [00:08:32.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 357  [00:08:33.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 358  [00:08:34.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 359  [00:08:35.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 360  [00:08:36.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 361  [00:08:37.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 362  [00:08:38.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 363  [00:08:39.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 364  [00:08:40.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 365  [00:08:41.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 366  [00:08:42.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 367  [00:08:43.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 368  [00:08:44.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 369  [00:08:45.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 370  [00:08:46.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 371  [00:08:47.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 372  [00:08:48.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 373  [00:08:49.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 374  [00:08:50.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 375  [00:08:51.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/faaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 376  [00:08:52.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 377  [00:08:53.000] Different program with same set of files
Info 378  [00:08:54.000] Running: *ensureProjectForOpenFiles*
Info 379  [00:08:55.000] Before ensureProjectForOpenFiles:
Info 380  [00:08:56.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 380  [00:08:57.000] 	Files (21)

Info 380  [00:08:58.000] -----------------------------------------------
Info 380  [00:08:59.000] Open files: 
Info 380  [00:09:00.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 380  [00:09:01.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 380  [00:09:02.000] After ensureProjectForOpenFiles:
Info 381  [00:09:03.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 381  [00:09:04.000] 	Files (21)

Info 381  [00:09:05.000] -----------------------------------------------
Info 381  [00:09:06.000] Open files: 
Info 381  [00:09:07.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 381  [00:09:08.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/src/projects/project/src/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/a/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/ba/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/cb/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 381  [00:09:09.000] Add package json file with type module
Info 382  [00:09:12.000] FileWatcher:: Triggered with /src/projects/project/package.json 0:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 383  [00:09:13.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 384  [00:09:14.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 0:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Before running timeout callbacks
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}


PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/src/projects/project/src/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/a/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/ba/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/cb/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 385  [00:09:15.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 386  [00:09:16.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 387  [00:09:17.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/src/projects/project/src/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/a/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/ba/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/cb/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Before running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/src/projects/project/src/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/a/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/ba/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/cb/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 388  [00:09:18.000] Running: /src/projects/project/src/tsconfig.json
Info 389  [00:09:19.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 390  [00:09:20.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 391  [00:09:21.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 392  [00:09:22.000] File '/package.json' does not exist according to earlier cached lookups.
Info 393  [00:09:23.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 394  [00:09:24.000] Found 'package.json' at '/src/projects/project/package.json'.
Info 395  [00:09:25.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 396  [00:09:26.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 397  [00:09:27.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 398  [00:09:28.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 399  [00:09:29.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 400  [00:09:30.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 401  [00:09:31.000] Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Info 402  [00:09:32.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 403  [00:09:33.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 404  [00:09:34.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 405  [00:09:35.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 406  [00:09:36.000] Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Info 407  [00:09:37.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 408  [00:09:38.000] Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 409  [00:09:39.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 410  [00:09:40.000] Directory '/src/projects/project/src/c' resolves to '/src/projects/project/package.json' scope according to cache.
Info 411  [00:09:41.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 412  [00:09:42.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 413  [00:09:43.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 414  [00:09:44.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 415  [00:09:45.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 416  [00:09:46.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 417  [00:09:47.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 418  [00:09:48.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 419  [00:09:49.000] Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 420  [00:09:50.000] Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 421  [00:09:51.000] Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Info 422  [00:09:52.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 423  [00:09:53.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 424  [00:09:54.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 425  [00:09:55.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 426  [00:09:56.000] Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Info 427  [00:09:57.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 428  [00:09:58.000] Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 429  [00:09:59.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 430  [00:10:00.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 431  [00:10:01.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 432  [00:10:02.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 433  [00:10:03.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 434  [00:10:04.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 435  [00:10:05.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 436  [00:10:06.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 437  [00:10:07.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 438  [00:10:08.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 439  [00:10:09.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 440  [00:10:10.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 441  [00:10:11.000] Directory '/src/projects/project/src/f/fa/faa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 442  [00:10:12.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 443  [00:10:13.000] Directory '/src/projects/project/src' resolves to '/src/projects/project/package.json' scope according to cache.
Info 444  [00:10:14.000] Directory '/src/projects/project/src/a' resolves to '/src/projects/project/package.json' scope according to cache.
Info 445  [00:10:15.000] Directory '/src/projects/project/src/b/ba' resolves to '/src/projects/project/package.json' scope according to cache.
Info 446  [00:10:16.000] Directory '/src/projects/project/src/b' resolves to '/src/projects/project/package.json' scope according to cache.
Info 447  [00:10:17.000] Directory '/src/projects/project/src/c/ca' resolves to '/src/projects/project/package.json' scope according to cache.
Info 448  [00:10:18.000] Directory '/src/projects/project/src/c/ca/caa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 449  [00:10:19.000] Directory '/src/projects/project/src/c/ca/caa/caaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 450  [00:10:20.000] Directory '/src/projects/project/src/c/cb' resolves to '/src/projects/project/package.json' scope according to cache.
Info 451  [00:10:21.000] Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 452  [00:10:22.000] Directory '/src/projects/project/src/d/da/daa/daaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 453  [00:10:23.000] Directory '/src/projects/project/src/d/da/daa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 454  [00:10:24.000] Directory '/src/projects/project/src/d/da' resolves to '/src/projects/project/package.json' scope according to cache.
Info 455  [00:10:25.000] Directory '/src/projects/project/src/e/ea' resolves to '/src/projects/project/package.json' scope according to cache.
Info 456  [00:10:26.000] Directory '/src/projects/project/src/e/ea/eaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 457  [00:10:27.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 458  [00:10:28.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 459  [00:10:29.000] Directory '/src/projects/project/src/f/fa/faa/x/y/z' resolves to '/src/projects/project/package.json' scope according to cache.
Info 460  [00:10:30.000] Directory '/src/projects/project/src/f/fa/faa/faaa' resolves to '/src/projects/project/package.json' scope according to cache.
Info 461  [00:10:31.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 462  [00:10:32.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 463  [00:10:33.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/a/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 464  [00:10:34.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/b/ba/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 465  [00:10:35.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/b/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 466  [00:10:36.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/c/ca/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 467  [00:10:37.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/c/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 468  [00:10:38.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/c/ca/caa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 469  [00:10:39.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/c/ca/caa/caaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 470  [00:10:40.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/c/cb/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 471  [00:10:41.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 472  [00:10:42.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 473  [00:10:43.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 474  [00:10:44.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 475  [00:10:45.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/d/da/daa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 476  [00:10:46.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/d/da/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 477  [00:10:47.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/d/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 478  [00:10:48.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/e/ea/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 479  [00:10:49.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/e/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 480  [00:10:50.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/e/ea/eaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 481  [00:10:51.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 482  [00:10:52.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 483  [00:10:53.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 484  [00:10:54.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 485  [00:10:55.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 486  [00:10:56.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 487  [00:10:57.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/f/fa/faa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 488  [00:10:58.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/f/fa/faa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 489  [00:10:59.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/f/fa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 490  [00:11:00.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/f/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 491  [00:11:01.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/src/f/fa/faa/faaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 492  [00:11:02.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 493  [00:11:03.000] Different program with same set of files
Info 494  [00:11:04.000] Running: *ensureProjectForOpenFiles*
Info 495  [00:11:05.000] Before ensureProjectForOpenFiles:
Info 496  [00:11:06.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 496  [00:11:07.000] 	Files (21)

Info 496  [00:11:08.000] -----------------------------------------------
Info 496  [00:11:09.000] Open files: 
Info 496  [00:11:10.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 496  [00:11:11.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 496  [00:11:12.000] After ensureProjectForOpenFiles:
Info 497  [00:11:13.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 497  [00:11:14.000] 	Files (21)

Info 497  [00:11:15.000] -----------------------------------------------
Info 497  [00:11:16.000] Open files: 
Info 497  [00:11:17.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 497  [00:11:18.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 497  [00:11:19.000] Delete package.json
Info 498  [00:11:21.000] FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 499  [00:11:22.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 500  [00:11:23.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Before running timeout callbacks
//// [/src/projects/project/package.json] deleted

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 501  [00:11:24.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 502  [00:11:25.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 503  [00:11:26.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Before running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::

Info 504  [00:11:27.000] Running: /src/projects/project/src/tsconfig.json
Info 505  [00:11:28.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 506  [00:11:29.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 507  [00:11:30.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 508  [00:11:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 509  [00:11:32.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 510  [00:11:33.000] File '/src/projects/project/package.json' does not exist.
Info 511  [00:11:34.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 512  [00:11:35.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 513  [00:11:36.000] Directory '/' has no containing package.json scope according to cache.
Info 514  [00:11:37.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 515  [00:11:38.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 516  [00:11:39.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 517  [00:11:40.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 518  [00:11:41.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 519  [00:11:42.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 520  [00:11:43.000] Directory '/src/projects/project/src/b' has no containing package.json scope according to cache.
Info 521  [00:11:44.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 522  [00:11:45.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 523  [00:11:46.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 524  [00:11:47.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 525  [00:11:48.000] Directory '/src/projects/project/src/c/ca' has no containing package.json scope according to cache.
Info 526  [00:11:49.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 527  [00:11:50.000] Directory '/src/projects/project/src/c/ca/caa' has no containing package.json scope according to cache.
Info 528  [00:11:51.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 529  [00:11:52.000] Directory '/src/projects/project/src/c' has no containing package.json scope according to cache.
Info 530  [00:11:53.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 531  [00:11:54.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 532  [00:11:55.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 533  [00:11:56.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 534  [00:11:57.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 535  [00:11:58.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 536  [00:11:59.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 537  [00:12:00.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 538  [00:12:01.000] Directory '/src/projects/project/src/d/da/daa/daaa' has no containing package.json scope according to cache.
Info 539  [00:12:02.000] Directory '/src/projects/project/src/d/da/daa' has no containing package.json scope according to cache.
Info 540  [00:12:03.000] Directory '/src/projects/project/src/d/da' has no containing package.json scope according to cache.
Info 541  [00:12:04.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 542  [00:12:05.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 543  [00:12:06.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 544  [00:12:07.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 545  [00:12:08.000] Directory '/src/projects/project/src/e/ea' has no containing package.json scope according to cache.
Info 546  [00:12:09.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 547  [00:12:10.000] Directory '/src/projects/project/src/e/ea/eaa' has no containing package.json scope according to cache.
Info 548  [00:12:11.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 549  [00:12:12.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 550  [00:12:13.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 551  [00:12:14.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' has no containing package.json scope according to cache.
Info 552  [00:12:15.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 553  [00:12:16.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 554  [00:12:17.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 555  [00:12:18.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 556  [00:12:19.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 557  [00:12:20.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 558  [00:12:21.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 559  [00:12:22.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 560  [00:12:23.000] Directory '/src/projects/project/src/f/fa/faa' has no containing package.json scope according to cache.
Info 561  [00:12:24.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 562  [00:12:25.000] Directory '/src/projects/project/src' has no containing package.json scope according to cache.
Info 563  [00:12:26.000] Directory '/src/projects/project/src/a' has no containing package.json scope according to cache.
Info 564  [00:12:27.000] Directory '/src/projects/project/src/b/ba' has no containing package.json scope according to cache.
Info 565  [00:12:28.000] Directory '/src/projects/project/src/b' has no containing package.json scope according to cache.
Info 566  [00:12:29.000] Directory '/src/projects/project/src/c/ca' has no containing package.json scope according to cache.
Info 567  [00:12:30.000] Directory '/src/projects/project/src/c/ca/caa' has no containing package.json scope according to cache.
Info 568  [00:12:31.000] Directory '/src/projects/project/src/c/ca/caa/caaa' has no containing package.json scope according to cache.
Info 569  [00:12:32.000] Directory '/src/projects/project/src/c/cb' has no containing package.json scope according to cache.
Info 570  [00:12:33.000] Directory '/src/projects/project/src/d/da/daa/daaa/x/y/z' has no containing package.json scope according to cache.
Info 571  [00:12:34.000] Directory '/src/projects/project/src/d/da/daa/daaa' has no containing package.json scope according to cache.
Info 572  [00:12:35.000] Directory '/src/projects/project/src/d/da/daa' has no containing package.json scope according to cache.
Info 573  [00:12:36.000] Directory '/src/projects/project/src/d/da' has no containing package.json scope according to cache.
Info 574  [00:12:37.000] Directory '/src/projects/project/src/e/ea' has no containing package.json scope according to cache.
Info 575  [00:12:38.000] Directory '/src/projects/project/src/e/ea/eaa' has no containing package.json scope according to cache.
Info 576  [00:12:39.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa' has no containing package.json scope according to cache.
Info 577  [00:12:40.000] Directory '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z' has no containing package.json scope according to cache.
Info 578  [00:12:41.000] Directory '/src/projects/project/src/f/fa/faa/x/y/z' has no containing package.json scope according to cache.
Info 579  [00:12:42.000] Directory '/src/projects/project/src/f/fa/faa/faaa' has no containing package.json scope according to cache.
Info 580  [00:12:43.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 581  [00:12:44.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 582  [00:12:45.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/a/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 583  [00:12:46.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/ba/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 584  [00:12:47.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 585  [00:12:48.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 586  [00:12:49.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 587  [00:12:50.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 588  [00:12:51.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/caaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 589  [00:12:52.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/cb/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 590  [00:12:53.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 591  [00:12:54.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 592  [00:12:55.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 593  [00:12:56.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 594  [00:12:57.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 595  [00:12:58.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 596  [00:12:59.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 597  [00:13:00.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 598  [00:13:01.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 599  [00:13:02.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 600  [00:13:03.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 601  [00:13:04.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 602  [00:13:05.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 603  [00:13:06.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 604  [00:13:07.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 605  [00:13:08.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 606  [00:13:09.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 607  [00:13:10.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 608  [00:13:11.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 609  [00:13:12.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 610  [00:13:13.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/faaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 611  [00:13:14.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 7 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 612  [00:13:15.000] Different program with same set of files
Info 613  [00:13:16.000] Running: *ensureProjectForOpenFiles*
Info 614  [00:13:17.000] Before ensureProjectForOpenFiles:
Info 615  [00:13:18.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 615  [00:13:19.000] 	Files (21)

Info 615  [00:13:20.000] -----------------------------------------------
Info 615  [00:13:21.000] Open files: 
Info 615  [00:13:22.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 615  [00:13:23.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 615  [00:13:24.000] After ensureProjectForOpenFiles:
Info 616  [00:13:25.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 616  [00:13:26.000] 	Files (21)

Info 616  [00:13:27.000] -----------------------------------------------
Info 616  [00:13:28.000] Open files: 
Info 616  [00:13:29.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 616  [00:13:30.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/src/projects/project/src/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/a/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/ba/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/b/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/c/cb/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/daa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/da/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/d/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/package.json:
  {"pollingInterval":2000}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/projects/project/src/tsconfig.json:
  {}
/src/projects/project/src/filea.ts:
  {}
/src/projects/project/src/fileb.mts:
  {}
/src/projects/project/src/a/randomfile.ts:
  {}
/src/projects/project/src/b/ba/randomfile.ts:
  {}
/src/projects/project/src/b/randomfile.ts:
  {}
/src/projects/project/src/c/ca/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {}
/src/projects/project/src/c/cb/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {}
/src/projects/project/src/d/da/randomfile.ts:
  {}
/src/projects/project/src/e/ea/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/src/projects/project/package.json:
  {}

FsWatchesRecursive::
