Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:18.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a/b/file1.ts"
          },
          {
            "fileName": "/a/b/file2.js"
          }
        ],
        "options": {
          "allowJs": true,
          "outFile": "dist.js",
          "compileOnSave": true
        },
        "projectFileName": "/a/b/externalproject"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/file1.ts]
consonle.log('file1');

//// [/a/b/file2.js]
console.log'file2');

//// [/a/b/file3.js]
console.log('file3');

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

Info 2    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/b/file1.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.js 500 undefined WatchType: Closed Script info
Info 4    [00:00:21.000] Starting updateGraphWorker: Project: /a/b/externalproject
Info 5    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/externalproject WatchType: Type roots
Info 7    [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/externalproject WatchType: Type roots
Info 8    [00:00:25.000] Finishing updateGraphWorker: Project: /a/b/externalproject Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:26.000] Project '/a/b/externalproject' (External)
Info 10   [00:00:27.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/file1.ts
	/a/b/file2.js


	../lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Root file specified for compilation
	file2.js
	  Root file specified for compilation

Info 11   [00:00:28.000] -----------------------------------------------
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.ts:
  {}
/a/b/file2.js:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 12   [00:00:29.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 13   [00:00:30.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.ts:
  {}
/a/b/file2.js:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

After request
//// [/a/b/dist.js]
consonle.log('file1');



PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.ts:
  {}
/a/b/file2.js:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 14   [00:00:33.000] response:
    {
      "response": true,
      "responseRequired": true
    }