TI:: Creating typing installer
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


TI:: [00:00:17.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:18.000] Processing cache location '/a/data/'
TI:: [00:00:19.000] Trying to find '/a/data/package.json'...
TI:: [00:00:20.000] Finished processing cache location '/a/data/'
TI:: [00:00:21.000] Npm config file: /a/data/package.json
TI:: [00:00:22.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:27.000] Updating types-registry npm package...
TI:: [00:00:28.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:35.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:36.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:37.000] request:
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

Info 2    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/b/file1.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:39.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.js 500 undefined WatchType: Closed Script info
Info 4    [00:00:40.000] Starting updateGraphWorker: Project: /a/b/externalproject
Info 5    [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/externalproject WatchType: Type roots
Info 7    [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/externalproject WatchType: Type roots
Info 8    [00:00:44.000] Finishing updateGraphWorker: Project: /a/b/externalproject Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:45.000] Project '/a/b/externalproject' (External)
Info 10   [00:00:46.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/file1.ts
	/a/b/file2.js


	../lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Root file specified for compilation
	file2.js
	  Root file specified for compilation

Info 11   [00:00:47.000] -----------------------------------------------
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file1.ts: *new*
  {}
/a/b/file2.js: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Info 12   [00:00:48.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 13   [00:00:49.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request
//// [/a/b/dist.js]
consonle.log('file1');



Info 14   [00:00:52.000] response:
    {
      "response": true,
      "responseRequired": true
    }