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
Info 36   [00:02:35.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 37   [00:02:36.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 38   [00:02:37.000] File '/src/projects/project/src/a/package.json' does not exist.
Info 39   [00:02:38.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 40   [00:02:39.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 41   [00:02:40.000] File '/src/projects/project/src/b/ba/package.json' does not exist.
Info 42   [00:02:41.000] File '/src/projects/project/src/b/package.json' does not exist.
Info 43   [00:02:42.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 44   [00:02:43.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 45   [00:02:44.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 46   [00:02:45.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 47   [00:02:46.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 48   [00:02:47.000] File '/src/projects/project/src/c/ca/package.json' does not exist.
Info 49   [00:02:48.000] File '/src/projects/project/src/c/package.json' does not exist.
Info 50   [00:02:49.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 51   [00:02:50.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 52   [00:02:51.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
Info 53   [00:02:52.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 54   [00:02:53.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 55   [00:02:54.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 56   [00:02:55.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 57   [00:02:56.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
Info 58   [00:02:57.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 59   [00:02:58.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 60   [00:02:59.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 61   [00:03:00.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 62   [00:03:01.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 63   [00:03:02.000] File '/src/projects/project/src/c/cb/package.json' does not exist.
Info 64   [00:03:03.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 65   [00:03:04.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 66   [00:03:05.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 67   [00:03:06.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
Info 68   [00:03:07.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
Info 69   [00:03:08.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
Info 70   [00:03:09.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
Info 71   [00:03:10.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist.
Info 72   [00:03:11.000] File '/src/projects/project/src/d/da/package.json' does not exist.
Info 73   [00:03:12.000] File '/src/projects/project/src/d/package.json' does not exist.
Info 74   [00:03:13.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 75   [00:03:14.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 76   [00:03:15.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 77   [00:03:16.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 78   [00:03:17.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 79   [00:03:18.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 80   [00:03:19.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 81   [00:03:20.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 82   [00:03:21.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 83   [00:03:22.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 84   [00:03:23.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 85   [00:03:24.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 86   [00:03:25.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 87   [00:03:26.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 88   [00:03:27.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 89   [00:03:28.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 90   [00:03:29.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 91   [00:03:30.000] File '/src/projects/project/src/e/ea/package.json' does not exist.
Info 92   [00:03:31.000] File '/src/projects/project/src/e/package.json' does not exist.
Info 93   [00:03:32.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 94   [00:03:33.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 95   [00:03:34.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
Info 96   [00:03:35.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 97   [00:03:36.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 98   [00:03:37.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 99   [00:03:38.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 100  [00:03:39.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
Info 101  [00:03:40.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 102  [00:03:41.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 103  [00:03:42.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 104  [00:03:43.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 105  [00:03:44.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 106  [00:03:45.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
Info 107  [00:03:46.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
Info 108  [00:03:47.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
Info 109  [00:03:48.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 110  [00:03:49.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 111  [00:03:50.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 112  [00:03:51.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 113  [00:03:52.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 114  [00:03:53.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 115  [00:03:54.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
Info 116  [00:03:55.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
Info 117  [00:03:56.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
Info 118  [00:03:57.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
Info 119  [00:03:58.000] File '/src/projects/project/src/f/fa/package.json' does not exist.
Info 120  [00:03:59.000] File '/src/projects/project/src/f/package.json' does not exist.
Info 121  [00:04:00.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 122  [00:04:01.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 123  [00:04:02.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
Info 124  [00:04:03.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 125  [00:04:04.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 126  [00:04:05.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 127  [00:04:06.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 128  [00:04:07.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 129  [00:04:08.000] File '/a/lib/package.json' does not exist.
Info 130  [00:04:09.000] File '/a/package.json' does not exist.
Info 131  [00:04:10.000] File '/package.json' does not exist.
Info 132  [00:04:11.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info 133  [00:04:12.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 134  [00:04:13.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 135  [00:04:14.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/a/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 136  [00:04:15.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/ba/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 137  [00:04:16.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 138  [00:04:17.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 139  [00:04:18.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 140  [00:04:19.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 141  [00:04:20.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/caaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 142  [00:04:21.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/cb/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 143  [00:04:22.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 144  [00:04:23.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 145  [00:04:24.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 146  [00:04:25.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 147  [00:04:26.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 148  [00:04:27.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 149  [00:04:28.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 150  [00:04:29.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 151  [00:04:30.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 152  [00:04:31.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 153  [00:04:32.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 154  [00:04:33.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 155  [00:04:34.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 156  [00:04:35.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 157  [00:04:36.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/z/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 158  [00:04:37.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 159  [00:04:38.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 160  [00:04:39.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 161  [00:04:40.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 162  [00:04:41.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 163  [00:04:42.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/faaa/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 164  [00:04:43.000] DirectoryWatcher:: Added:: WatchInfo: /src/projects/project/src/node_modules/@types 1 undefined Project: /src/projects/project/src/tsconfig.json WatchType: Type roots
Info 165  [00:04:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/project/src/node_modules/@types 1 undefined Project: /src/projects/project/src/tsconfig.json WatchType: Type roots
Info 166  [00:04:45.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 167  [00:04:46.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 168  [00:04:47.000] 	Files (21)
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

Info 169  [00:04:48.000] -----------------------------------------------
Info 170  [00:04:49.000] FileWatcher:: Added:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 171  [00:04:50.000] Search path: /src/projects/project/src
Info 172  [00:04:51.000] For info: /src/projects/project/src/tsconfig.json :: No config files found.
Info 173  [00:04:52.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 173  [00:04:53.000] 	Files (21)

Info 173  [00:04:54.000] -----------------------------------------------
Info 173  [00:04:55.000] Open files: 
Info 173  [00:04:56.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 173  [00:04:57.000] 		Projects: /src/projects/project/src/tsconfig.json
After request

PolledWatches::
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

Info 173  [00:04:58.000] response:
    {
      "responseRequired": false
    }
Info 174  [00:04:59.000] random edit
Info 175  [00:05:00.000] request:
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

Info 176  [00:05:01.000] response:
    {
      "responseRequired": false
    }
Info 177  [00:05:02.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 178  [00:05:03.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 179  [00:05:04.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 180  [00:05:05.000] File '/package.json' does not exist according to earlier cached lookups.
Info 181  [00:05:06.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 182  [00:05:07.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 183  [00:05:08.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 184  [00:05:09.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 185  [00:05:10.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 186  [00:05:11.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 187  [00:05:12.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 188  [00:05:13.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 189  [00:05:14.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 190  [00:05:15.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 191  [00:05:16.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 192  [00:05:17.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 193  [00:05:18.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 194  [00:05:19.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 195  [00:05:20.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 196  [00:05:21.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 197  [00:05:22.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 198  [00:05:23.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 199  [00:05:24.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 200  [00:05:25.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 201  [00:05:26.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 202  [00:05:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 203  [00:05:28.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 204  [00:05:29.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 205  [00:05:30.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 206  [00:05:31.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 207  [00:05:32.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 208  [00:05:33.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 209  [00:05:34.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 210  [00:05:35.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 211  [00:05:36.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 212  [00:05:37.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 213  [00:05:38.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 214  [00:05:39.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 215  [00:05:40.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 216  [00:05:41.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 217  [00:05:42.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 218  [00:05:43.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 219  [00:05:44.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 220  [00:05:45.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 221  [00:05:46.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 222  [00:05:47.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 223  [00:05:48.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 224  [00:05:49.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 225  [00:05:50.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 226  [00:05:51.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 227  [00:05:52.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 228  [00:05:53.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 229  [00:05:54.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 230  [00:05:55.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 231  [00:05:56.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 232  [00:05:57.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 233  [00:05:58.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 234  [00:05:59.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 235  [00:06:00.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 236  [00:06:01.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 237  [00:06:02.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 238  [00:06:03.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 239  [00:06:04.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 240  [00:06:05.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 241  [00:06:06.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 242  [00:06:07.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 243  [00:06:08.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 244  [00:06:09.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 245  [00:06:10.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 246  [00:06:11.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 247  [00:06:12.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 248  [00:06:13.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 249  [00:06:14.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 250  [00:06:15.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 251  [00:06:16.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 252  [00:06:17.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 253  [00:06:18.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 254  [00:06:19.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 255  [00:06:20.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 256  [00:06:21.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 257  [00:06:22.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 258  [00:06:23.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 259  [00:06:24.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 260  [00:06:25.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 261  [00:06:26.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 262  [00:06:27.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 263  [00:06:28.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 264  [00:06:29.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 265  [00:06:30.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 266  [00:06:31.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 267  [00:06:32.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 268  [00:06:33.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 269  [00:06:34.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 270  [00:06:35.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 271  [00:06:36.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 272  [00:06:37.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 273  [00:06:38.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 274  [00:06:39.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 275  [00:06:40.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 276  [00:06:41.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 277  [00:06:42.000] Different program with same set of files
Info 278  [00:06:43.000] Modify package json file to add type module
Info 279  [00:06:47.000] FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 280  [00:06:48.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 281  [00:06:49.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 282  [00:06:50.000] FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 283  [00:06:51.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Before running timeout callbacks
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}


PolledWatches::
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

Info 284  [00:06:52.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 285  [00:06:53.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 286  [00:06:54.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
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

Info 287  [00:06:55.000] Running: /src/projects/project/src/tsconfig.json
Info 288  [00:06:56.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 289  [00:06:57.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 290  [00:06:58.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 291  [00:06:59.000] File '/package.json' does not exist according to earlier cached lookups.
Info 292  [00:07:00.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 293  [00:07:01.000] Found 'package.json' at '/src/projects/project/package.json'.
Info 294  [00:07:02.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 295  [00:07:03.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 296  [00:07:04.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 297  [00:07:05.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 298  [00:07:06.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 299  [00:07:07.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 300  [00:07:08.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 301  [00:07:09.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 302  [00:07:10.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 303  [00:07:11.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 304  [00:07:12.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 305  [00:07:13.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 306  [00:07:14.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 307  [00:07:15.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 308  [00:07:16.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 309  [00:07:17.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 310  [00:07:18.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 311  [00:07:19.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 312  [00:07:20.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 313  [00:07:21.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 314  [00:07:22.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 315  [00:07:23.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 316  [00:07:24.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 317  [00:07:25.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 318  [00:07:26.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 319  [00:07:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 320  [00:07:28.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 321  [00:07:29.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 322  [00:07:30.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 323  [00:07:31.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 324  [00:07:32.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 325  [00:07:33.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 326  [00:07:34.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 327  [00:07:35.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 328  [00:07:36.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 329  [00:07:37.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 330  [00:07:38.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 331  [00:07:39.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 332  [00:07:40.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 333  [00:07:41.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 334  [00:07:42.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 335  [00:07:43.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 336  [00:07:44.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 337  [00:07:45.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 338  [00:07:46.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 339  [00:07:47.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 340  [00:07:48.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 341  [00:07:49.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 342  [00:07:50.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 343  [00:07:51.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 344  [00:07:52.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 345  [00:07:53.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 346  [00:07:54.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 347  [00:07:55.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 348  [00:07:56.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 349  [00:07:57.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 350  [00:07:58.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 351  [00:07:59.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 352  [00:08:00.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 353  [00:08:01.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 354  [00:08:02.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 355  [00:08:03.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 356  [00:08:04.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 357  [00:08:05.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 358  [00:08:06.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 359  [00:08:07.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 360  [00:08:08.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 361  [00:08:09.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 362  [00:08:10.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 363  [00:08:11.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 364  [00:08:12.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 365  [00:08:13.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 366  [00:08:14.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 367  [00:08:15.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 368  [00:08:16.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 369  [00:08:17.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 370  [00:08:18.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 371  [00:08:19.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 372  [00:08:20.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 373  [00:08:21.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 374  [00:08:22.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 375  [00:08:23.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 376  [00:08:24.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 377  [00:08:25.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 378  [00:08:26.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 379  [00:08:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 380  [00:08:28.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 381  [00:08:29.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 382  [00:08:30.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 383  [00:08:31.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 384  [00:08:32.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 385  [00:08:33.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 386  [00:08:34.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 387  [00:08:35.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 388  [00:08:36.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 389  [00:08:37.000] ======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Info 390  [00:08:38.000] Module resolution kind is not specified, using 'Node16'.
Info 391  [00:08:39.000] Resolving in ESM mode with conditions 'node', 'import', 'types'.
Info 392  [00:08:40.000] Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info 393  [00:08:41.000] File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 394  [00:08:42.000] File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
Info 395  [00:08:43.000] ======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Info 396  [00:08:44.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 397  [00:08:45.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 398  [00:08:46.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 399  [00:08:47.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 400  [00:08:48.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 401  [00:08:49.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 402  [00:08:50.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 403  [00:08:51.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 404  [00:08:52.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 405  [00:08:53.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 406  [00:08:54.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 407  [00:08:55.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 408  [00:08:56.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 409  [00:08:57.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 410  [00:08:58.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 411  [00:08:59.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 412  [00:09:00.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 413  [00:09:01.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 414  [00:09:02.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 415  [00:09:03.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 416  [00:09:04.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 417  [00:09:05.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 418  [00:09:06.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 419  [00:09:07.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 420  [00:09:08.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 421  [00:09:09.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 422  [00:09:10.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 423  [00:09:11.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 424  [00:09:12.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 425  [00:09:13.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 426  [00:09:14.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 427  [00:09:15.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 428  [00:09:16.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 429  [00:09:17.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 430  [00:09:18.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 431  [00:09:19.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 432  [00:09:20.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 433  [00:09:21.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 434  [00:09:22.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 435  [00:09:23.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 436  [00:09:24.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 437  [00:09:25.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 438  [00:09:26.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 439  [00:09:27.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 440  [00:09:28.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 441  [00:09:29.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 442  [00:09:30.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 443  [00:09:31.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 444  [00:09:32.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 445  [00:09:33.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 446  [00:09:34.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 447  [00:09:35.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 448  [00:09:36.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 449  [00:09:37.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 450  [00:09:38.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 451  [00:09:39.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 452  [00:09:40.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 453  [00:09:41.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 454  [00:09:42.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 455  [00:09:43.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 456  [00:09:44.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 457  [00:09:45.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 458  [00:09:46.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 459  [00:09:47.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 460  [00:09:48.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 461  [00:09:49.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 462  [00:09:50.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 463  [00:09:51.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 464  [00:09:52.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 465  [00:09:53.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 466  [00:09:54.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 467  [00:09:55.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 468  [00:09:56.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 469  [00:09:57.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 470  [00:09:58.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 471  [00:09:59.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 472  [00:10:00.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 473  [00:10:01.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 474  [00:10:02.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 475  [00:10:03.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 476  [00:10:04.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 477  [00:10:05.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 478  [00:10:06.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 479  [00:10:07.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 480  [00:10:08.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 481  [00:10:09.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 482  [00:10:10.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 483  [00:10:11.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 484  [00:10:12.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 485  [00:10:13.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 486  [00:10:14.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 487  [00:10:15.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 488  [00:10:16.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 489  [00:10:17.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 490  [00:10:18.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 491  [00:10:19.000] File '/package.json' does not exist according to earlier cached lookups.
Info 492  [00:10:20.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 493  [00:10:21.000] Different program with same set of files
Info 494  [00:10:22.000] Running: *ensureProjectForOpenFiles*
Info 495  [00:10:23.000] Before ensureProjectForOpenFiles:
Info 496  [00:10:24.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 496  [00:10:25.000] 	Files (21)

Info 496  [00:10:26.000] -----------------------------------------------
Info 496  [00:10:27.000] Open files: 
Info 496  [00:10:28.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 496  [00:10:29.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 496  [00:10:30.000] After ensureProjectForOpenFiles:
Info 497  [00:10:31.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 497  [00:10:32.000] 	Files (21)

Info 497  [00:10:33.000] -----------------------------------------------
Info 497  [00:10:34.000] Open files: 
Info 497  [00:10:35.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 497  [00:10:36.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
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

Info 497  [00:10:37.000] Modify package.json file to remove type module
Info 498  [00:10:41.000] FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 499  [00:10:42.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 500  [00:10:43.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 501  [00:10:44.000] FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 502  [00:10:45.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Before running timeout callbacks
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0"}


PolledWatches::
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

Info 503  [00:10:46.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 504  [00:10:47.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 505  [00:10:48.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
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

Info 506  [00:10:49.000] Running: /src/projects/project/src/tsconfig.json
Info 507  [00:10:50.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 508  [00:10:51.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 509  [00:10:52.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 510  [00:10:53.000] File '/package.json' does not exist according to earlier cached lookups.
Info 511  [00:10:54.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 512  [00:10:55.000] Found 'package.json' at '/src/projects/project/package.json'.
Info 513  [00:10:56.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 514  [00:10:57.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 515  [00:10:58.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 516  [00:10:59.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 517  [00:11:00.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 518  [00:11:01.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 519  [00:11:02.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 520  [00:11:03.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 521  [00:11:04.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 522  [00:11:05.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 523  [00:11:06.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 524  [00:11:07.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 525  [00:11:08.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 526  [00:11:09.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 527  [00:11:10.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 528  [00:11:11.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 529  [00:11:12.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 530  [00:11:13.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 531  [00:11:14.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 532  [00:11:15.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 533  [00:11:16.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 534  [00:11:17.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 535  [00:11:18.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 536  [00:11:19.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 537  [00:11:20.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 538  [00:11:21.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 539  [00:11:22.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 540  [00:11:23.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 541  [00:11:24.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 542  [00:11:25.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 543  [00:11:26.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 544  [00:11:27.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 545  [00:11:28.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 546  [00:11:29.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 547  [00:11:30.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 548  [00:11:31.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 549  [00:11:32.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 550  [00:11:33.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 551  [00:11:34.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 552  [00:11:35.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 553  [00:11:36.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 554  [00:11:37.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 555  [00:11:38.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 556  [00:11:39.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 557  [00:11:40.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 558  [00:11:41.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 559  [00:11:42.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 560  [00:11:43.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 561  [00:11:44.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 562  [00:11:45.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 563  [00:11:46.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 564  [00:11:47.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 565  [00:11:48.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 566  [00:11:49.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 567  [00:11:50.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 568  [00:11:51.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 569  [00:11:52.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 570  [00:11:53.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 571  [00:11:54.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 572  [00:11:55.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 573  [00:11:56.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 574  [00:11:57.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 575  [00:11:58.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 576  [00:11:59.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 577  [00:12:00.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 578  [00:12:01.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 579  [00:12:02.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 580  [00:12:03.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 581  [00:12:04.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 582  [00:12:05.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 583  [00:12:06.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 584  [00:12:07.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 585  [00:12:08.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 586  [00:12:09.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 587  [00:12:10.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 588  [00:12:11.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 589  [00:12:12.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 590  [00:12:13.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 591  [00:12:14.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 592  [00:12:15.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 593  [00:12:16.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 594  [00:12:17.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 595  [00:12:18.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 596  [00:12:19.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 597  [00:12:20.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 598  [00:12:21.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 599  [00:12:22.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 600  [00:12:23.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 601  [00:12:24.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 602  [00:12:25.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 603  [00:12:26.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 604  [00:12:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 605  [00:12:28.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 606  [00:12:29.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 607  [00:12:30.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 608  [00:12:31.000] ======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Info 609  [00:12:32.000] Module resolution kind is not specified, using 'Node16'.
Info 610  [00:12:33.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 611  [00:12:34.000] Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info 612  [00:12:35.000] File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info 613  [00:12:36.000] File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
Info 614  [00:12:37.000] ======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
Info 615  [00:12:38.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 616  [00:12:39.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 617  [00:12:40.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 618  [00:12:41.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 619  [00:12:42.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 620  [00:12:43.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 621  [00:12:44.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 622  [00:12:45.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 623  [00:12:46.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 624  [00:12:47.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 625  [00:12:48.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 626  [00:12:49.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 627  [00:12:50.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 628  [00:12:51.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 629  [00:12:52.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 630  [00:12:53.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 631  [00:12:54.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 632  [00:12:55.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 633  [00:12:56.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 634  [00:12:57.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 635  [00:12:58.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 636  [00:12:59.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 637  [00:13:00.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 638  [00:13:01.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 639  [00:13:02.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 640  [00:13:03.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 641  [00:13:04.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 642  [00:13:05.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 643  [00:13:06.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 644  [00:13:07.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 645  [00:13:08.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 646  [00:13:09.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 647  [00:13:10.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 648  [00:13:11.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 649  [00:13:12.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 650  [00:13:13.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 651  [00:13:14.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 652  [00:13:15.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 653  [00:13:16.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 654  [00:13:17.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 655  [00:13:18.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 656  [00:13:19.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 657  [00:13:20.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 658  [00:13:21.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 659  [00:13:22.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 660  [00:13:23.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 661  [00:13:24.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 662  [00:13:25.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 663  [00:13:26.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 664  [00:13:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 665  [00:13:28.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 666  [00:13:29.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 667  [00:13:30.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 668  [00:13:31.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 669  [00:13:32.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 670  [00:13:33.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 671  [00:13:34.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 672  [00:13:35.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 673  [00:13:36.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 674  [00:13:37.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 675  [00:13:38.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 676  [00:13:39.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 677  [00:13:40.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 678  [00:13:41.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 679  [00:13:42.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 680  [00:13:43.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 681  [00:13:44.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 682  [00:13:45.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 683  [00:13:46.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 684  [00:13:47.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 685  [00:13:48.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 686  [00:13:49.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 687  [00:13:50.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 688  [00:13:51.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 689  [00:13:52.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 690  [00:13:53.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 691  [00:13:54.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 692  [00:13:55.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 693  [00:13:56.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 694  [00:13:57.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 695  [00:13:58.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 696  [00:13:59.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 697  [00:14:00.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 698  [00:14:01.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 699  [00:14:02.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 700  [00:14:03.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 701  [00:14:04.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 702  [00:14:05.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 703  [00:14:06.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 704  [00:14:07.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 705  [00:14:08.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 706  [00:14:09.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 707  [00:14:10.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 708  [00:14:11.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 709  [00:14:12.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 710  [00:14:13.000] File '/package.json' does not exist according to earlier cached lookups.
Info 711  [00:14:14.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 712  [00:14:15.000] Different program with same set of files
Info 713  [00:14:16.000] Running: *ensureProjectForOpenFiles*
Info 714  [00:14:17.000] Before ensureProjectForOpenFiles:
Info 715  [00:14:18.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 715  [00:14:19.000] 	Files (21)

Info 715  [00:14:20.000] -----------------------------------------------
Info 715  [00:14:21.000] Open files: 
Info 715  [00:14:22.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 715  [00:14:23.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 715  [00:14:24.000] After ensureProjectForOpenFiles:
Info 716  [00:14:25.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 716  [00:14:26.000] 	Files (21)

Info 716  [00:14:27.000] -----------------------------------------------
Info 716  [00:14:28.000] Open files: 
Info 716  [00:14:29.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 716  [00:14:30.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
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

Info 716  [00:14:31.000] Delete package.json
Info 717  [00:14:33.000] FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 718  [00:14:34.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 719  [00:14:35.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 720  [00:14:36.000] FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 721  [00:14:37.000] FileWatcher:: Close:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Info 722  [00:14:38.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 250 undefined WatchType: package.json file
Before running timeout callbacks
//// [/src/projects/project/package.json] deleted

PolledWatches::
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

Info 723  [00:14:39.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 724  [00:14:40.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 725  [00:14:41.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
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

Info 726  [00:14:42.000] Running: /src/projects/project/src/tsconfig.json
Info 727  [00:14:43.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 728  [00:14:44.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 729  [00:14:45.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 730  [00:14:46.000] File '/package.json' does not exist according to earlier cached lookups.
Info 731  [00:14:47.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 732  [00:14:48.000] File '/src/projects/project/package.json' does not exist.
Info 733  [00:14:49.000] File '/src/projects/package.json' does not exist.
Info 734  [00:14:50.000] File '/src/package.json' does not exist.
Info 735  [00:14:51.000] File '/package.json' does not exist according to earlier cached lookups.
Info 736  [00:14:52.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 737  [00:14:53.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 738  [00:14:54.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 739  [00:14:55.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 740  [00:14:56.000] File '/package.json' does not exist according to earlier cached lookups.
Info 741  [00:14:57.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 742  [00:14:58.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 743  [00:14:59.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 744  [00:15:00.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 745  [00:15:01.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 746  [00:15:02.000] File '/package.json' does not exist according to earlier cached lookups.
Info 747  [00:15:03.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 748  [00:15:04.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 749  [00:15:05.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 750  [00:15:06.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 751  [00:15:07.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 752  [00:15:08.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 753  [00:15:09.000] File '/package.json' does not exist according to earlier cached lookups.
Info 754  [00:15:10.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 755  [00:15:11.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 756  [00:15:12.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 757  [00:15:13.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 758  [00:15:14.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 759  [00:15:15.000] File '/package.json' does not exist according to earlier cached lookups.
Info 760  [00:15:16.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 761  [00:15:17.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 762  [00:15:18.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 763  [00:15:19.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 764  [00:15:20.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 765  [00:15:21.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 766  [00:15:22.000] File '/package.json' does not exist according to earlier cached lookups.
Info 767  [00:15:23.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 768  [00:15:24.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 769  [00:15:25.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 770  [00:15:26.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 771  [00:15:27.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 772  [00:15:28.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 773  [00:15:29.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 774  [00:15:30.000] File '/package.json' does not exist according to earlier cached lookups.
Info 775  [00:15:31.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 776  [00:15:32.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 777  [00:15:33.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 778  [00:15:34.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 779  [00:15:35.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 780  [00:15:36.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 781  [00:15:37.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 782  [00:15:38.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 783  [00:15:39.000] File '/package.json' does not exist according to earlier cached lookups.
Info 784  [00:15:40.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 785  [00:15:41.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 786  [00:15:42.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 787  [00:15:43.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 788  [00:15:44.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 789  [00:15:45.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 790  [00:15:46.000] File '/package.json' does not exist according to earlier cached lookups.
Info 791  [00:15:47.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 792  [00:15:48.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 793  [00:15:49.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 794  [00:15:50.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 795  [00:15:51.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 796  [00:15:52.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 797  [00:15:53.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 798  [00:15:54.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 799  [00:15:55.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 800  [00:15:56.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 801  [00:15:57.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 802  [00:15:58.000] File '/package.json' does not exist according to earlier cached lookups.
Info 803  [00:15:59.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 804  [00:16:00.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 805  [00:16:01.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 806  [00:16:02.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 807  [00:16:03.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 808  [00:16:04.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 809  [00:16:05.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 810  [00:16:06.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 811  [00:16:07.000] File '/package.json' does not exist according to earlier cached lookups.
Info 812  [00:16:08.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 813  [00:16:09.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 814  [00:16:10.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 815  [00:16:11.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 816  [00:16:12.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 817  [00:16:13.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 818  [00:16:14.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 819  [00:16:15.000] File '/package.json' does not exist according to earlier cached lookups.
Info 820  [00:16:16.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 821  [00:16:17.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 822  [00:16:18.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 823  [00:16:19.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 824  [00:16:20.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 825  [00:16:21.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 826  [00:16:22.000] File '/package.json' does not exist according to earlier cached lookups.
Info 827  [00:16:23.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 828  [00:16:24.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 829  [00:16:25.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 830  [00:16:26.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 831  [00:16:27.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 832  [00:16:28.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 833  [00:16:29.000] File '/package.json' does not exist according to earlier cached lookups.
Info 834  [00:16:30.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 835  [00:16:31.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 836  [00:16:32.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 837  [00:16:33.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 838  [00:16:34.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 839  [00:16:35.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 840  [00:16:36.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 841  [00:16:37.000] File '/package.json' does not exist according to earlier cached lookups.
Info 842  [00:16:38.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 843  [00:16:39.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 844  [00:16:40.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 845  [00:16:41.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 846  [00:16:42.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 847  [00:16:43.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 848  [00:16:44.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 849  [00:16:45.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 850  [00:16:46.000] File '/package.json' does not exist according to earlier cached lookups.
Info 851  [00:16:47.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 852  [00:16:48.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 853  [00:16:49.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 854  [00:16:50.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 855  [00:16:51.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 856  [00:16:52.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 857  [00:16:53.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 858  [00:16:54.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 859  [00:16:55.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 860  [00:16:56.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 861  [00:16:57.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 862  [00:16:58.000] File '/package.json' does not exist according to earlier cached lookups.
Info 863  [00:16:59.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 864  [00:17:00.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 865  [00:17:01.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 866  [00:17:02.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 867  [00:17:03.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 868  [00:17:04.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 869  [00:17:05.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 870  [00:17:06.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 871  [00:17:07.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 872  [00:17:08.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 873  [00:17:09.000] File '/package.json' does not exist according to earlier cached lookups.
Info 874  [00:17:10.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 875  [00:17:11.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 876  [00:17:12.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 877  [00:17:13.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 878  [00:17:14.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 879  [00:17:15.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 880  [00:17:16.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 881  [00:17:17.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 882  [00:17:18.000] File '/package.json' does not exist according to earlier cached lookups.
Info 883  [00:17:19.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 884  [00:17:20.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 885  [00:17:21.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 886  [00:17:22.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 887  [00:17:23.000] File '/package.json' does not exist according to earlier cached lookups.
Info 888  [00:17:24.000] Reusing resolution of module './fileB.mjs' from '/src/projects/project/src/fileA.ts' of old program, it was successfully resolved to '/src/projects/project/src/fileB.mts'.
Info 889  [00:17:25.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 890  [00:17:26.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 891  [00:17:27.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 892  [00:17:28.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 893  [00:17:29.000] File '/package.json' does not exist according to earlier cached lookups.
Info 894  [00:17:30.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 895  [00:17:31.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 896  [00:17:32.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 897  [00:17:33.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 898  [00:17:34.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 899  [00:17:35.000] File '/package.json' does not exist according to earlier cached lookups.
Info 900  [00:17:36.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 901  [00:17:37.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 902  [00:17:38.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 903  [00:17:39.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 904  [00:17:40.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 905  [00:17:41.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 906  [00:17:42.000] File '/package.json' does not exist according to earlier cached lookups.
Info 907  [00:17:43.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 908  [00:17:44.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 909  [00:17:45.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 910  [00:17:46.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 911  [00:17:47.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 912  [00:17:48.000] File '/package.json' does not exist according to earlier cached lookups.
Info 913  [00:17:49.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 914  [00:17:50.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 915  [00:17:51.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 916  [00:17:52.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 917  [00:17:53.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 918  [00:17:54.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 919  [00:17:55.000] File '/package.json' does not exist according to earlier cached lookups.
Info 920  [00:17:56.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 921  [00:17:57.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 922  [00:17:58.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 923  [00:17:59.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 924  [00:18:00.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 925  [00:18:01.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 926  [00:18:02.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 927  [00:18:03.000] File '/package.json' does not exist according to earlier cached lookups.
Info 928  [00:18:04.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 929  [00:18:05.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 930  [00:18:06.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 931  [00:18:07.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 932  [00:18:08.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 933  [00:18:09.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 934  [00:18:10.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 935  [00:18:11.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 936  [00:18:12.000] File '/package.json' does not exist according to earlier cached lookups.
Info 937  [00:18:13.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 938  [00:18:14.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 939  [00:18:15.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 940  [00:18:16.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 941  [00:18:17.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 942  [00:18:18.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 943  [00:18:19.000] File '/package.json' does not exist according to earlier cached lookups.
Info 944  [00:18:20.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 945  [00:18:21.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 946  [00:18:22.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 947  [00:18:23.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 948  [00:18:24.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 949  [00:18:25.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 950  [00:18:26.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 951  [00:18:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 952  [00:18:28.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 953  [00:18:29.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 954  [00:18:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 955  [00:18:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 956  [00:18:32.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 957  [00:18:33.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 958  [00:18:34.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 959  [00:18:35.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 960  [00:18:36.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 961  [00:18:37.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 962  [00:18:38.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 963  [00:18:39.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 964  [00:18:40.000] File '/package.json' does not exist according to earlier cached lookups.
Info 965  [00:18:41.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 966  [00:18:42.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 967  [00:18:43.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 968  [00:18:44.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 969  [00:18:45.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 970  [00:18:46.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 971  [00:18:47.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 972  [00:18:48.000] File '/package.json' does not exist according to earlier cached lookups.
Info 973  [00:18:49.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 974  [00:18:50.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 975  [00:18:51.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 976  [00:18:52.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 977  [00:18:53.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 978  [00:18:54.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 979  [00:18:55.000] File '/package.json' does not exist according to earlier cached lookups.
Info 980  [00:18:56.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 981  [00:18:57.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 982  [00:18:58.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 983  [00:18:59.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 984  [00:19:00.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 985  [00:19:01.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 986  [00:19:02.000] File '/package.json' does not exist according to earlier cached lookups.
Info 987  [00:19:03.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 988  [00:19:04.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 989  [00:19:05.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 990  [00:19:06.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 991  [00:19:07.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 992  [00:19:08.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 993  [00:19:09.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 994  [00:19:10.000] File '/package.json' does not exist according to earlier cached lookups.
Info 995  [00:19:11.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 996  [00:19:12.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 997  [00:19:13.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 998  [00:19:14.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 999  [00:19:15.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1000 [00:19:16.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1001 [00:19:17.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1002 [00:19:18.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1003 [00:19:19.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1004 [00:19:20.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1005 [00:19:21.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1006 [00:19:22.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 1007 [00:19:23.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 1008 [00:19:24.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1009 [00:19:25.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1010 [00:19:26.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1011 [00:19:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1012 [00:19:28.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1013 [00:19:29.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1014 [00:19:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1015 [00:19:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1016 [00:19:32.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1017 [00:19:33.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1018 [00:19:34.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 1019 [00:19:35.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1020 [00:19:36.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1021 [00:19:37.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1022 [00:19:38.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1023 [00:19:39.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1024 [00:19:40.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1025 [00:19:41.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1026 [00:19:42.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1027 [00:19:43.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 1028 [00:19:44.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1029 [00:19:45.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1030 [00:19:46.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1031 [00:19:47.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1032 [00:19:48.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1033 [00:19:49.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1034 [00:19:50.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1035 [00:19:51.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1036 [00:19:52.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 1037 [00:19:53.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 1038 [00:19:54.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1039 [00:19:55.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 1040 [00:19:56.000] Different program with same set of files
Info 1041 [00:19:57.000] Running: *ensureProjectForOpenFiles*
Info 1042 [00:19:58.000] Before ensureProjectForOpenFiles:
Info 1043 [00:19:59.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 1043 [00:20:00.000] 	Files (21)

Info 1043 [00:20:01.000] -----------------------------------------------
Info 1043 [00:20:02.000] Open files: 
Info 1043 [00:20:03.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 1043 [00:20:04.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 1043 [00:20:05.000] After ensureProjectForOpenFiles:
Info 1044 [00:20:06.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 1044 [00:20:07.000] 	Files (21)

Info 1044 [00:20:08.000] -----------------------------------------------
Info 1044 [00:20:09.000] Open files: 
Info 1044 [00:20:10.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 1044 [00:20:11.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
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

Info 1044 [00:20:12.000] Add package json file with type module
Info 1045 [00:20:15.000] FileWatcher:: Triggered with /src/projects/project/package.json 0:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 1046 [00:20:16.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 1047 [00:20:17.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 0:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Before running timeout callbacks
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}


PolledWatches::
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

Info 1048 [00:20:18.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 1049 [00:20:19.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 1050 [00:20:20.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
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

Info 1051 [00:20:21.000] Running: /src/projects/project/src/tsconfig.json
Info 1052 [00:20:22.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 1053 [00:20:23.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 1054 [00:20:24.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 1055 [00:20:25.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1056 [00:20:26.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1057 [00:20:27.000] Found 'package.json' at '/src/projects/project/package.json'.
Info 1058 [00:20:28.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1059 [00:20:29.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1060 [00:20:30.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 1061 [00:20:31.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1062 [00:20:32.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1063 [00:20:33.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 1064 [00:20:34.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 1065 [00:20:35.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1066 [00:20:36.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1067 [00:20:37.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 1068 [00:20:38.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1069 [00:20:39.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1070 [00:20:40.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1071 [00:20:41.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1072 [00:20:42.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1073 [00:20:43.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1074 [00:20:44.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 1075 [00:20:45.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1076 [00:20:46.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1077 [00:20:47.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1078 [00:20:48.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1079 [00:20:49.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 1080 [00:20:50.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 1081 [00:20:51.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1082 [00:20:52.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1083 [00:20:53.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1084 [00:20:54.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1085 [00:20:55.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 1086 [00:20:56.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1087 [00:20:57.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1088 [00:20:58.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1089 [00:20:59.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1090 [00:21:00.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1091 [00:21:01.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 1092 [00:21:02.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 1093 [00:21:03.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1094 [00:21:04.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1095 [00:21:05.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1096 [00:21:06.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1097 [00:21:07.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1098 [00:21:08.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 1099 [00:21:09.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1100 [00:21:10.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1101 [00:21:11.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1102 [00:21:12.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1103 [00:21:13.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1104 [00:21:14.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1105 [00:21:15.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1106 [00:21:16.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1107 [00:21:17.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1108 [00:21:18.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1109 [00:21:19.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1110 [00:21:20.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1111 [00:21:21.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1112 [00:21:22.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1113 [00:21:23.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1114 [00:21:24.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1115 [00:21:25.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1116 [00:21:26.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1117 [00:21:27.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1118 [00:21:28.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1119 [00:21:29.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1120 [00:21:30.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1121 [00:21:31.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1122 [00:21:32.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 1123 [00:21:33.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1124 [00:21:34.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1125 [00:21:35.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1126 [00:21:36.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1127 [00:21:37.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1128 [00:21:38.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1129 [00:21:39.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1130 [00:21:40.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 1131 [00:21:41.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 1132 [00:21:42.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1133 [00:21:43.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1134 [00:21:44.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1135 [00:21:45.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1136 [00:21:46.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1137 [00:21:47.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1138 [00:21:48.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1139 [00:21:49.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 1140 [00:21:50.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1141 [00:21:51.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1142 [00:21:52.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1143 [00:21:53.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1144 [00:21:54.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1145 [00:21:55.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 1146 [00:21:56.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1147 [00:21:57.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1148 [00:21:58.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1149 [00:21:59.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1150 [00:22:00.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1151 [00:22:01.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1152 [00:22:02.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1153 [00:22:03.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1154 [00:22:04.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1155 [00:22:05.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 1156 [00:22:06.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1157 [00:22:07.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1158 [00:22:08.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 1159 [00:22:09.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 1160 [00:22:10.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1161 [00:22:11.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1162 [00:22:12.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 1163 [00:22:13.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1164 [00:22:14.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1165 [00:22:15.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1166 [00:22:16.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1167 [00:22:17.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1168 [00:22:18.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1169 [00:22:19.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 1170 [00:22:20.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1171 [00:22:21.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1172 [00:22:22.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1173 [00:22:23.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1174 [00:22:24.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 1175 [00:22:25.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 1176 [00:22:26.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1177 [00:22:27.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1178 [00:22:28.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1179 [00:22:29.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1180 [00:22:30.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 1181 [00:22:31.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1182 [00:22:32.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1183 [00:22:33.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1184 [00:22:34.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1185 [00:22:35.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1186 [00:22:36.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 1187 [00:22:37.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 1188 [00:22:38.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1189 [00:22:39.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1190 [00:22:40.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1191 [00:22:41.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1192 [00:22:42.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1193 [00:22:43.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 1194 [00:22:44.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1195 [00:22:45.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1196 [00:22:46.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1197 [00:22:47.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1198 [00:22:48.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1199 [00:22:49.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1200 [00:22:50.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1201 [00:22:51.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1202 [00:22:52.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1203 [00:22:53.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1204 [00:22:54.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1205 [00:22:55.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1206 [00:22:56.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1207 [00:22:57.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1208 [00:22:58.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1209 [00:22:59.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1210 [00:23:00.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1211 [00:23:01.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1212 [00:23:02.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1213 [00:23:03.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1214 [00:23:04.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1215 [00:23:05.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1216 [00:23:06.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1217 [00:23:07.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 1218 [00:23:08.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1219 [00:23:09.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1220 [00:23:10.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1221 [00:23:11.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1222 [00:23:12.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1223 [00:23:13.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1224 [00:23:14.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1225 [00:23:15.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 1226 [00:23:16.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 1227 [00:23:17.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1228 [00:23:18.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1229 [00:23:19.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1230 [00:23:20.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1231 [00:23:21.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1232 [00:23:22.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1233 [00:23:23.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1234 [00:23:24.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 1235 [00:23:25.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1236 [00:23:26.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1237 [00:23:27.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1238 [00:23:28.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1239 [00:23:29.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1240 [00:23:30.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 1241 [00:23:31.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1242 [00:23:32.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1243 [00:23:33.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1244 [00:23:34.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1245 [00:23:35.000] File '/src/projects/project/package.json' exists according to earlier cached lookups.
Info 1246 [00:23:36.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 1247 [00:23:37.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 1248 [00:23:38.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1249 [00:23:39.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 1250 [00:23:40.000] Different program with same set of files
Info 1251 [00:23:41.000] Running: *ensureProjectForOpenFiles*
Info 1252 [00:23:42.000] Before ensureProjectForOpenFiles:
Info 1253 [00:23:43.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 1253 [00:23:44.000] 	Files (21)

Info 1253 [00:23:45.000] -----------------------------------------------
Info 1253 [00:23:46.000] Open files: 
Info 1253 [00:23:47.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 1253 [00:23:48.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 1253 [00:23:49.000] After ensureProjectForOpenFiles:
Info 1254 [00:23:50.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 1254 [00:23:51.000] 	Files (21)

Info 1254 [00:23:52.000] -----------------------------------------------
Info 1254 [00:23:53.000] Open files: 
Info 1254 [00:23:54.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 1254 [00:23:55.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
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

Info 1254 [00:23:56.000] Delete package.json
Info 1255 [00:23:58.000] FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Info 1256 [00:23:59.000] Scheduled: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 1257 [00:24:00.000] Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined Project: /src/projects/project/src/tsconfig.json WatchType: File location affecting resolution
Before running timeout callbacks
//// [/src/projects/project/package.json] deleted

PolledWatches::
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

Info 1258 [00:24:01.000] Running: /src/projects/project/src/tsconfig.jsonFailedLookupInvalidation
Info 1259 [00:24:02.000] Scheduled: /src/projects/project/src/tsconfig.json
Info 1260 [00:24:03.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
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

Info 1261 [00:24:04.000] Running: /src/projects/project/src/tsconfig.json
Info 1262 [00:24:05.000] Starting updateGraphWorker: Project: /src/projects/project/src/tsconfig.json
Info 1263 [00:24:06.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 1264 [00:24:07.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 1265 [00:24:08.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1266 [00:24:09.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1267 [00:24:10.000] File '/src/projects/project/package.json' does not exist.
Info 1268 [00:24:11.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1269 [00:24:12.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1270 [00:24:13.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1271 [00:24:14.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1272 [00:24:15.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1273 [00:24:16.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1274 [00:24:17.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1275 [00:24:18.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1276 [00:24:19.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 1277 [00:24:20.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1278 [00:24:21.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1279 [00:24:22.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1280 [00:24:23.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1281 [00:24:24.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1282 [00:24:25.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 1283 [00:24:26.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 1284 [00:24:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1285 [00:24:28.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1286 [00:24:29.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1287 [00:24:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1288 [00:24:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1289 [00:24:32.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 1290 [00:24:33.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1291 [00:24:34.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1292 [00:24:35.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1293 [00:24:36.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1294 [00:24:37.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1295 [00:24:38.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1296 [00:24:39.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1297 [00:24:40.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1298 [00:24:41.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1299 [00:24:42.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1300 [00:24:43.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1301 [00:24:44.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1302 [00:24:45.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 1303 [00:24:46.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1304 [00:24:47.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1305 [00:24:48.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1306 [00:24:49.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1307 [00:24:50.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1308 [00:24:51.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1309 [00:24:52.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1310 [00:24:53.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 1311 [00:24:54.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 1312 [00:24:55.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1313 [00:24:56.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1314 [00:24:57.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1315 [00:24:58.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1316 [00:24:59.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1317 [00:25:00.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1318 [00:25:01.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1319 [00:25:02.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 1320 [00:25:03.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1321 [00:25:04.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1322 [00:25:05.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1323 [00:25:06.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1324 [00:25:07.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1325 [00:25:08.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1326 [00:25:09.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1327 [00:25:10.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1328 [00:25:11.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 1329 [00:25:12.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 1330 [00:25:13.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1331 [00:25:14.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1332 [00:25:15.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1333 [00:25:16.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1334 [00:25:17.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1335 [00:25:18.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1336 [00:25:19.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1337 [00:25:20.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1338 [00:25:21.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 1339 [00:25:22.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1340 [00:25:23.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1341 [00:25:24.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1342 [00:25:25.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1343 [00:25:26.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1344 [00:25:27.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1345 [00:25:28.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1346 [00:25:29.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1347 [00:25:30.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1348 [00:25:31.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1349 [00:25:32.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1350 [00:25:33.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1351 [00:25:34.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1352 [00:25:35.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1353 [00:25:36.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1354 [00:25:37.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1355 [00:25:38.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1356 [00:25:39.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1357 [00:25:40.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1358 [00:25:41.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1359 [00:25:42.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1360 [00:25:43.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1361 [00:25:44.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1362 [00:25:45.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1363 [00:25:46.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1364 [00:25:47.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1365 [00:25:48.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1366 [00:25:49.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1367 [00:25:50.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1368 [00:25:51.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1369 [00:25:52.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1370 [00:25:53.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1371 [00:25:54.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1372 [00:25:55.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1373 [00:25:56.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1374 [00:25:57.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1375 [00:25:58.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1376 [00:25:59.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1377 [00:26:00.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 1378 [00:26:01.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1379 [00:26:02.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1380 [00:26:03.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1381 [00:26:04.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1382 [00:26:05.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1383 [00:26:06.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1384 [00:26:07.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1385 [00:26:08.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1386 [00:26:09.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1387 [00:26:10.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1388 [00:26:11.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 1389 [00:26:12.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 1390 [00:26:13.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1391 [00:26:14.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1392 [00:26:15.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1393 [00:26:16.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1394 [00:26:17.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1395 [00:26:18.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1396 [00:26:19.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1397 [00:26:20.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1398 [00:26:21.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1399 [00:26:22.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1400 [00:26:23.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 1401 [00:26:24.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1402 [00:26:25.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1403 [00:26:26.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1404 [00:26:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1405 [00:26:28.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1406 [00:26:29.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1407 [00:26:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1408 [00:26:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1409 [00:26:32.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 1410 [00:26:33.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1411 [00:26:34.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1412 [00:26:35.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1413 [00:26:36.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1414 [00:26:37.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1415 [00:26:38.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1416 [00:26:39.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1417 [00:26:40.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1418 [00:26:41.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1419 [00:26:42.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1420 [00:26:43.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1421 [00:26:44.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1422 [00:26:45.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1423 [00:26:46.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1424 [00:26:47.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1425 [00:26:48.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1426 [00:26:49.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1427 [00:26:50.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1428 [00:26:51.000] File '/src/projects/project/src/a/package.json' does not exist according to earlier cached lookups.
Info 1429 [00:26:52.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1430 [00:26:53.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1431 [00:26:54.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1432 [00:26:55.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1433 [00:26:56.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1434 [00:26:57.000] File '/src/projects/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info 1435 [00:26:58.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 1436 [00:26:59.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1437 [00:27:00.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1438 [00:27:01.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1439 [00:27:02.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1440 [00:27:03.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1441 [00:27:04.000] File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
Info 1442 [00:27:05.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1443 [00:27:06.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1444 [00:27:07.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1445 [00:27:08.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1446 [00:27:09.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1447 [00:27:10.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1448 [00:27:11.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1449 [00:27:12.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1450 [00:27:13.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1451 [00:27:14.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1452 [00:27:15.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1453 [00:27:16.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1454 [00:27:17.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 1455 [00:27:18.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1456 [00:27:19.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1457 [00:27:20.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1458 [00:27:21.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1459 [00:27:22.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1460 [00:27:23.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1461 [00:27:24.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1462 [00:27:25.000] File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info 1463 [00:27:26.000] File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info 1464 [00:27:27.000] File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info 1465 [00:27:28.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1466 [00:27:29.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1467 [00:27:30.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1468 [00:27:31.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1469 [00:27:32.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1470 [00:27:33.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1471 [00:27:34.000] File '/src/projects/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info 1472 [00:27:35.000] File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
Info 1473 [00:27:36.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1474 [00:27:37.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1475 [00:27:38.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1476 [00:27:39.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1477 [00:27:40.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1478 [00:27:41.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1479 [00:27:42.000] File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1480 [00:27:43.000] File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info 1481 [00:27:44.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 1482 [00:27:45.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1483 [00:27:46.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1484 [00:27:47.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1485 [00:27:48.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1486 [00:27:49.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1487 [00:27:50.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1488 [00:27:51.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1489 [00:27:52.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1490 [00:27:53.000] File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info 1491 [00:27:54.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1492 [00:27:55.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1493 [00:27:56.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1494 [00:27:57.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1495 [00:27:58.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1496 [00:27:59.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1497 [00:28:00.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1498 [00:28:01.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1499 [00:28:02.000] File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info 1500 [00:28:03.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1501 [00:28:04.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1502 [00:28:05.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1503 [00:28:06.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1504 [00:28:07.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1505 [00:28:08.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1506 [00:28:09.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1507 [00:28:10.000] File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info 1508 [00:28:11.000] File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
Info 1509 [00:28:12.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1510 [00:28:13.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1511 [00:28:14.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1512 [00:28:15.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1513 [00:28:16.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1514 [00:28:17.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1515 [00:28:18.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1516 [00:28:19.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1517 [00:28:20.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1518 [00:28:21.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1519 [00:28:22.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1520 [00:28:23.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1521 [00:28:24.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1522 [00:28:25.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1523 [00:28:26.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1524 [00:28:27.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1525 [00:28:28.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1526 [00:28:29.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1527 [00:28:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1528 [00:28:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1529 [00:28:32.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 1530 [00:28:33.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1531 [00:28:34.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1532 [00:28:35.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1533 [00:28:36.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1534 [00:28:37.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1535 [00:28:38.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1536 [00:28:39.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1537 [00:28:40.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1538 [00:28:41.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1539 [00:28:42.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1540 [00:28:43.000] File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info 1541 [00:28:44.000] File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info 1542 [00:28:45.000] File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info 1543 [00:28:46.000] File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info 1544 [00:28:47.000] File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
Info 1545 [00:28:48.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1546 [00:28:49.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1547 [00:28:50.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1548 [00:28:51.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1549 [00:28:52.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1550 [00:28:53.000] File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info 1551 [00:28:54.000] File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info 1552 [00:28:55.000] File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info 1553 [00:28:56.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1554 [00:28:57.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1555 [00:28:58.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1556 [00:28:59.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1557 [00:29:00.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1558 [00:29:01.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1559 [00:29:02.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1560 [00:29:03.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1561 [00:29:04.000] File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info 1562 [00:29:05.000] File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info 1563 [00:29:06.000] File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info 1564 [00:29:07.000] File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
Info 1565 [00:29:08.000] File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
Info 1566 [00:29:09.000] File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
Info 1567 [00:29:10.000] File '/src/projects/package.json' does not exist according to earlier cached lookups.
Info 1568 [00:29:11.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 1569 [00:29:12.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1570 [00:29:13.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 1571 [00:29:14.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 1572 [00:29:15.000] File '/package.json' does not exist according to earlier cached lookups.
Info 1573 [00:29:16.000] Finishing updateGraphWorker: Project: /src/projects/project/src/tsconfig.json Version: 7 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 1574 [00:29:17.000] Different program with same set of files
Info 1575 [00:29:18.000] Running: *ensureProjectForOpenFiles*
Info 1576 [00:29:19.000] Before ensureProjectForOpenFiles:
Info 1577 [00:29:20.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 1577 [00:29:21.000] 	Files (21)

Info 1577 [00:29:22.000] -----------------------------------------------
Info 1577 [00:29:23.000] Open files: 
Info 1577 [00:29:24.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 1577 [00:29:25.000] 		Projects: /src/projects/project/src/tsconfig.json
Info 1577 [00:29:26.000] After ensureProjectForOpenFiles:
Info 1578 [00:29:27.000] Project '/src/projects/project/src/tsconfig.json' (Configured)
Info 1578 [00:29:28.000] 	Files (21)

Info 1578 [00:29:29.000] -----------------------------------------------
Info 1578 [00:29:30.000] Open files: 
Info 1578 [00:29:31.000] 	FileName: /src/projects/project/src/randomFile.ts ProjectRootPath: undefined
Info 1578 [00:29:32.000] 		Projects: /src/projects/project/src/tsconfig.json
After running timeout callbacks

PolledWatches::
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
